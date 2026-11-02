"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { stopReadAloud } from "@/lib/read-aloud";
import Link from "next/link";
import { DrawingAnswer } from "@/components/drawing-answer";
import { ReadAloudButton } from "@/components/accessibility-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { questionTypeLabel } from "@/lib/marking";
import { downloadExamPack, examClock, saveExamProgress, startOrResumeExam, submitExam } from "@/app/actions/marking";
import { canOpenOfflinePack } from "@/lib/offline-pass";
import { readOfflinePack, saveOfflinePack } from "@/lib/offline-store";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, RefreshCw } from "lucide-react";

type LabelTarget = { id: string; x: number; y: number; prompt: string };
type Question = {
  id: string;
  type: string;
  prompt: string;
  stimulus?: string | null;
  imageUrl?: string | null;
  displayNumber?: string | null;
  unit?: string | null;
  options: string | null;
  labelTargets?: LabelTarget[];
  points: number;
};
type Result = { attemptId: string; score: number; maxScore: number; pendingCount: number; totalQuestions: number };

function parseOptions(raw: string | null) {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.map(String) : [];
  } catch {
    return [];
  }
}

function parseRecord(raw: string | null): Record<string, string> | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, String(item)]));
  } catch {
    return null;
  }
}

export default function ExamPlayer({
  paper,
  questions,
}: {
  paper: { id: string; title: string; kind: string; subject: string; className: string; topic: string | null; durationMinutes?: number | null; backHref: string };
  questions: Question[];
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [versions, setVersions] = useState<Record<string, number>>({});
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [deadlineAt, setDeadlineAt] = useState<string | null>(null);
  const [saveState, setSaveState] = useState("Starting");
  const [offline, setOffline] = useState(false);
  const [saver, setSaver] = useState(false);
  useEffect(() => setSaver(localStorage.getItem("schoolquest.dataSaver") === "1"), []);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const answersRef = useRef(answers);
  const versionsRef = useRef(versions);
  const attemptRef = useRef<string | null>(null);
  const hydrated = useRef(false);
  const submitted = useRef(false);
  const endsAt = useRef<number | null>(null);
  const skew = useRef(0);
  const adoptClock = (serverNow: string, deadline: string | null) => {
    skew.current = new Date(serverNow).getTime() - Date.now();
    endsAt.current = deadline ? new Date(deadline).getTime() : null;
    setDeadlineAt(deadline);
    setRemaining(endsAt.current == null ? null : Math.max(0, endsAt.current - (Date.now() + skew.current)));
  };
  answersRef.current = answers;
  versionsRef.current = versions;
  attemptRef.current = attemptId;

  useEffect(() => () => stopReadAloud(), [index, result]);
  useEffect(() => {
    if (!result) return;
    window.dispatchEvent(new Event("schoolquest:task"));
    const native = (window as Window & { SchoolQuestNative?: { log?: (name: string) => void } }).SchoolQuestNative;
    native?.log?.("sq_task");
  }, [result]);

  useEffect(() => {
    let cancel = false;
    startTransition(() => {
      void startOrResumeExam(paper.id).then((session) => {
        if (cancel) return;
        const local = readLocal(paper.id);
        const nextAnswers = { ...session.answers };
        const nextVersions = { ...session.versions };
        for (const [id, value] of Object.entries(local.answers)) {
          if ((local.versions[id] ?? 0) >= (session.versions[id] ?? 0) && value) {
            nextAnswers[id] = value;
            nextVersions[id] = session.versions[id] ?? 0;
          }
        }
        setAnswers(nextAnswers);
        setVersions(nextVersions);
        setAttemptId(session.attemptId);
        adoptClock(session.serverNow, session.deadlineAt);
        setSaveState(session.finalized ? "Submitted" : "Saved");
        hydrated.current = true;
        if (session.result) setResult(session.result);
      }).catch(async (error) => {
        const pack = await readOfflinePack(paper.id).catch(() => undefined);
        if (cancel || !pack) {
          if (!cancel) setSaveState(error instanceof Error ? error.message : "Could not open this paper");
          return;
        }
        if (!canOpenOfflinePack(pack.pass, new Date())) {
          if (!cancel) setSaveState("This saved paper has expired. Connect to refresh it.");
          return;
        }
        if (cancel) return;
        setAnswers(pack.answers);
        setVersions(pack.versions);
        setOffline(true);
        setSaveState("Saved on this device");
        hydrated.current = true;
      });
    });
    return () => { cancel = true; };
  }, [paper.id]);

  useEffect(() => {
    if (!hydrated.current) return;
    sessionStorage.setItem(`sq-exam-${paper.id}`, JSON.stringify({ answers, versions }));
  }, [answers, versions, paper.id]);

  useEffect(() => {
    if (!attemptId || result || !hydrated.current) return;
    const handle = window.setTimeout(() => {
      const writes = Object.entries(answersRef.current).map(([questionId, value]) => ({ questionId, value, version: versionsRef.current[questionId] ?? 0 }));
      setSaveState("Saving");
      startTransition(() => {
        void saveExamProgress({ attemptId, writes }).then((saved) => {
          setVersions((current) => ({ ...current, ...saved.versions }));
          setSaveState(saved.expired ? "Time is up" : "Saved");
          adoptClock(saved.serverNow, saved.deadlineAt);
          if (saved.result) setResult(saved.result);
        }).catch(() => {
          setSaveState("Saved on this device");
          setOffline(true);
          void readOfflinePack(paper.id).then((pack) => {
            if (!pack) return;
            return saveOfflinePack({ ...pack, answers: answersRef.current, versions: versionsRef.current, savedAt: new Date().toISOString() });
          }).catch(() => undefined);
        });
      });
    }, 700);
    return () => window.clearTimeout(handle);
  }, [answers, attemptId, result]);

  useEffect(() => {
    if (!deadlineAt || result) return;
    const timer = window.setInterval(() => {
      if (endsAt.current == null) return;
      setRemaining(Math.max(0, endsAt.current - (Date.now() + skew.current)));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [deadlineAt, result]);

  useEffect(() => {
    if (!attemptId || result) return;
    const timer = window.setInterval(() => {
      startTransition(() => {
        void examClock(attemptId).then((clock) => {
          adoptClock(clock.serverNow, clock.deadlineAt);
          if (clock.result) setResult(clock.result);
        }).catch(() => undefined);
      });
    }, 20000);
    return () => window.clearInterval(timer);
  }, [attemptId, result]);

  const question = questions[index];
  const options = useMemo(() => parseOptions(question?.options ?? null), [question]);
  const blanks = useMemo(() => question?.type === "FILL_BLANK" ? parseRecord(question.options) : null, [question]);

  async function keepCopy() {
    setSaveState("Saving offline");
    try {
      const pack = await downloadExamPack(paper.id);
      const existing = await readOfflinePack(paper.id).catch(() => undefined);
      await saveOfflinePack({
        paperId: paper.id,
        title: paper.title,
        version: pack.version,
        savedAt: new Date().toISOString(),
        pass: pack.pass,
        paper: pack.paper,
        questions: pack.questions,
        answers: { ...(existing?.answers || {}), ...answersRef.current },
        versions: { ...(existing?.versions || {}), ...versionsRef.current },
      });
      setSaveState("Saved on this device");
    } catch (error) {
      setSaveState(error instanceof Error ? error.message : "Could not save offline");
    }
  }

  async function send() {
    if (submitted.current || !attemptRef.current) return;
    submitted.current = true;
    setBusy(true);
    try {
      const res = await submitExam({ paperId: paper.id, attemptId: attemptRef.current, answers: answersRef.current, versions: versionsRef.current });
      setResult(res);
      setSaveState("Submitted");
    } catch (error) {
      submitted.current = false;
      alert(error instanceof Error ? error.message : "Could not submit.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (remaining === 0 && attemptId && !result) void send();
    // The timer reaches zero once per deadline. send() ignores a second call.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, attemptId, result]);

  if (!questions.length) {
    return (
      <div className="rounded-[1.8rem] border bg-white p-8 text-center">
        <p>This set has no questions yet.</p>
        <Link href={paper.backHref} className="font-bold text-primary">Back to subject</Link>
      </div>
    );
  }

  if (result) {
    const percent = result.maxScore ? Math.round((result.score / result.maxScore) * 100) : 0;
    return (
      <div className="max-w-2xl mx-auto rounded-[2rem] bg-white border p-8 text-center space-y-4">
        <CheckCircle2 className="h-14 w-14 text-primary mx-auto" />
        <h1 className="font-display text-4xl">Paper in.</h1>
        <p className="text-muted-foreground">{paper.title}</p>
        <p className={`font-display text-primary ${result.pendingCount ? "text-3xl" : "text-6xl"}`}>{result.pendingCount ? "Teacher review pending" : `${percent}%`}</p>
        <p className="font-bold">{result.pendingCount ? "Provisional: " : ""}{result.score} / {result.maxScore} marks</p>
        <p className="text-sm text-muted-foreground">Submitted. This result stays fixed unless a teacher reviews it.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`/dashboard/attempts/${result.attemptId}`} className="rounded-2xl bg-primary text-white px-5 py-3 font-bold">Results</Link>
          <Button variant="outline" className="rounded-2xl h-12" onClick={() => {
            setResult(null);
            setAnswers({});
            setVersions({});
            setIndex(0);
            submitted.current = false;
            hydrated.current = false;
            sessionStorage.removeItem(`sq-exam-${paper.id}`);
            void startOrResumeExam(paper.id).then((session) => {
              setAttemptId(session.attemptId);
              adoptClock(session.serverNow, session.deadlineAt);
              hydrated.current = true;
              setSaveState("Saved");
            });
          }}>
            <RefreshCw className="h-4 w-4" /> Try again
          </Button>
          <Link href={paper.backHref} className="rounded-2xl border px-5 py-3 font-bold">Subject</Link>
        </div>
      </div>
    );
  }

  const setAnswer = (value: string) => setAnswers((prev) => ({ ...prev, [question.id]: value }));
  const clockLabel = remaining == null ? null : `${Math.floor(remaining / 60000)}:${String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0")}`;

  return (
    <div className="exam-sheet max-w-3xl mx-auto space-y-5 rounded-[2rem] p-4 md:p-6">
      <div>
        <div className="flex items-start justify-between gap-3">
          <Link href={paper.backHref} className="text-sm font-bold text-primary">← {paper.className} {paper.subject}</Link>
          <span className="flex items-center gap-2">
            {offline && <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold">Offline</span>}
            {clockLabel && <p className="rounded-full bg-white border px-3 py-1 text-sm font-bold" aria-live="polite">Time left {clockLabel}</p>}
            <button type="button" className="rounded-full border bg-white px-3 py-1 text-sm font-bold" aria-pressed={saver} onClick={() => { const next = !saver; localStorage.setItem("schoolquest.dataSaver", next ? "1" : "0"); setSaver(next); window.dispatchEvent(new Event("schoolquest:data-saver")); }}>Data saver</button>
            <button type="button" className="rounded-full border bg-white px-3 py-1 text-sm font-bold" onClick={() => void keepCopy()}>Save offline</button>
          </span>
        </div>
        <h1 className="font-display text-3xl mt-2">{paper.title}</h1>
        <p className="text-sm text-muted-foreground">{paper.topic || paper.kind.replaceAll("_", " ")} · Question {index + 1} of {questions.length}</p>
        <p className="text-xs font-bold text-muted-foreground" aria-live="polite">{saveState}</p>
        <div className="mt-3 flex gap-1 overflow-x-auto" role="navigation" aria-label="Questions">
          {questions.map((item, itemIndex) => (
            <button key={item.id} type="button" aria-label={`Question ${itemIndex + 1}${answers[item.id] ? ", answered" : ""}`} aria-current={itemIndex === index ? "true" : undefined} onClick={() => setIndex(itemIndex)} className={`h-9 min-w-9 rounded-full text-sm font-bold ${itemIndex === index ? "bg-primary text-white" : "bg-white border"}`}>{itemIndex + 1}</button>
          ))}
        </div>
        <div role="progressbar" aria-label="Question progress" aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={index + 1} className="h-2 rounded-full bg-muted mt-3">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-[2rem] bg-white border p-5 md:p-7 space-y-5" data-reading-content>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {question.displayNumber ? `${question.displayNumber} · ` : ""}{questionTypeLabel(question.type)} · {question.points} mark{question.points === 1 ? "" : "s"}
        </p>
        {question.stimulus && <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm leading-relaxed whitespace-pre-wrap">{question.stimulus}</div>}
        <h2 id="current-question" tabIndex={-1} className="font-display text-2xl leading-snug">{question.prompt}</h2>
        <ReadAloudButton label="Listen to this question" />
        {question.imageUrl && question.type !== "DIAGRAM_LABEL" && !saver && <img src={question.imageUrl} alt="" className="max-h-72 rounded-2xl border" />}
        {question.imageUrl && saver && question.type !== "DIAGRAM_LABEL" && <p className="text-sm font-bold">Picture hidden to save data.</p>}

        {question.type === "MULTIPLE_CHOICE" && (
          <div className="grid gap-2">
            {options.map((opt) => {
              const selected = answers[question.id] === opt;
              return <button key={opt} type="button" data-read-label aria-pressed={selected} onClick={() => setAnswer(opt)} className={`text-left rounded-2xl border-2 px-4 py-3 font-semibold ${selected ? "border-primary bg-primary/8 text-primary" : "border-border bg-white"}`}>{opt}</button>;
            })}
          </div>
        )}

        {question.type === "MULTI_SELECT" && (
          <div className="grid gap-2">
            {options.map((opt) => {
              const selected = selectedOptions(answers[question.id]).includes(opt);
              return <button key={opt} type="button" aria-pressed={selected} onClick={() => setAnswer(JSON.stringify(toggleOption(answers[question.id], opt)))} className={`text-left rounded-2xl border-2 px-4 py-3 font-semibold ${selected ? "border-primary bg-primary/8 text-primary" : "border-border bg-white"}`}>{opt}</button>;
            })}
          </div>
        )}

        {question.type === "TRUE_FALSE" && (
          <div className="grid grid-cols-2 gap-3">
            {["True", "False"].map((opt) => (
              <button key={opt} type="button" data-read-label aria-pressed={answers[question.id] === opt} onClick={() => setAnswer(opt)} className={`rounded-2xl border-2 py-5 font-black text-xl ${answers[question.id] === opt ? "border-primary bg-primary/8 text-primary" : "border-border"}`}>{opt}</button>
            ))}
          </div>
        )}

        {question.type === "DRAWING" && <DrawingAnswer key={question.id} onChange={setAnswer} value={answers[question.id] || ""} />}

        {question.type === "MATCHING" && (
          <div className="space-y-3">
            {parseMatch(question.options).map(([left, rights]) => (
              <label key={left} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold sm:w-1/2">{left}</span>
                <select className="flex-1 h-11 rounded-2xl border px-3" value={readMatch(answers[question.id], left)} onChange={(event) => setAnswer(writeMatch(answers[question.id], left, event.target.value))}>
                  <option value="">Choose…</option>
                  {rights.map((right) => <option key={right} value={right}>{right}</option>)}
                </select>
              </label>
            ))}
          </div>
        )}

        {question.type === "ORDERING" && (
          <ol className="space-y-2">
            {orderItems(options, answers[question.id]).map((item, itemIndex, list) => (
              <li key={item} className="flex items-center gap-2 rounded-2xl border px-3 py-2">
                <span className="flex-1 font-semibold">{item}</span>
                <button type="button" className="h-11 min-w-11 rounded-full border font-bold" aria-label={`Move ${item} up`} disabled={itemIndex === 0} onClick={() => setAnswer(JSON.stringify(moveItem(list, itemIndex, -1)))}>↑</button>
                <button type="button" className="h-11 min-w-11 rounded-full border font-bold" aria-label={`Move ${item} down`} disabled={itemIndex === list.length - 1} onClick={() => setAnswer(JSON.stringify(moveItem(list, itemIndex, 1)))}>↓</button>
              </li>
            ))}
          </ol>
        )}

        {question.type === "DIAGRAM_LABEL" && (
          <DiagramLabels imageUrl={question.imageUrl} targets={question.labelTargets || []} options={options} value={answers[question.id] || ""} onChange={setAnswer} />
        )}

        {question.type === "CALCULATION" && (
          <div className="grid grid-cols-[1fr_8rem] gap-2">
            <Input aria-label="Your numeric answer" inputMode="decimal" value={readCalc(answers[question.id]).value} onChange={(event) => setAnswer(writeCalc(event.target.value, readCalc(answers[question.id]).unit))} className="h-14 rounded-2xl text-lg" placeholder="Number" />
            <Input aria-label="Unit" value={readCalc(answers[question.id]).unit} onChange={(event) => setAnswer(writeCalc(readCalc(answers[question.id]).value, event.target.value))} className="h-14 rounded-2xl text-lg" placeholder={question.unit || "Unit"} />
          </div>
        )}

        {["SHORT_ANSWER", "COMPREHENSION", "LONG_ANSWER"].includes(question.type) && (
          <Textarea aria-label="Your written answer" aria-describedby="current-question" value={answers[question.id] || ""} onChange={(event) => setAnswer(event.target.value)} className="min-h-32 rounded-2xl text-base" placeholder="Write your answer" />
        )}

        {question.type === "FILL_BLANK" && blanks && (
          <div className="space-y-3">
            {Object.entries(blanks).map(([id, prompt]) => (
              <label key={id} className="block font-semibold">
                {prompt}
                <Input aria-label={prompt} value={readBlank(answers[question.id], id)} onChange={(event) => setAnswer(writeBlank(answers[question.id], id, event.target.value))} className="mt-1 h-14 rounded-2xl text-lg" />
              </label>
            ))}
          </div>
        )}

        {question.type === "FILL_BLANK" && !blanks && (
          <Input aria-label="Your answer" aria-describedby="current-question" value={answers[question.id] || ""} onChange={(event) => setAnswer(event.target.value)} className="h-14 rounded-2xl text-lg" placeholder="Answer" />
        )}

        {question.type === "NUMERIC" && (
          <Input aria-label="Your numeric answer" aria-describedby="current-question" value={answers[question.id] || ""} onChange={(event) => setAnswer(event.target.value)} className="h-14 rounded-2xl text-lg" placeholder="Number" />
        )}

        <div className="flex justify-between gap-3 pt-2">
          <Button variant="outline" className="rounded-2xl h-12" disabled={index === 0} onClick={() => { setIndex((i) => i - 1); requestAnimationFrame(() => document.getElementById("current-question")?.focus()); }}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {index === questions.length - 1 ? (
            <Button className="rounded-2xl h-12 px-6 font-bold" disabled={busy || !attemptId} onClick={() => void send()}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {busy ? "Marking…" : "Submit"}
            </Button>
          ) : (
            <Button className="rounded-2xl h-12" onClick={() => { setIndex((i) => i + 1); requestAnimationFrame(() => document.getElementById("current-question")?.focus()); }}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function readLocal(paperId: string) {
  try {
    const value = JSON.parse(sessionStorage.getItem(`sq-exam-${paperId}`) || "{}") as { answers?: Record<string, string>; versions?: Record<string, number> };
    return { answers: value.answers || {}, versions: value.versions || {} };
  } catch {
    return { answers: {}, versions: {} };
  }
}

function selectedOptions(raw: string | undefined) {
  try {
    const value = JSON.parse(raw || "[]");
    return Array.isArray(value) ? value.map(String) : [];
  } catch {
    return [];
  }
}

function toggleOption(raw: string | undefined, option: string) {
  const current = selectedOptions(raw);
  return current.includes(option) ? current.filter((item) => item !== option) : [...current, option];
}

function orderItems(options: string[], raw: string | undefined) {
  const current = selectedOptions(raw);
  const known = current.filter((item) => options.includes(item));
  return [...known, ...options.filter((item) => !known.includes(item))];
}

function moveItem(list: string[], index: number, direction: number) {
  const next = [...list];
  const target = index + direction;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function parseMatch(options: string | null): [string, string[]][] {
  try {
    const fromOptions = options ? JSON.parse(options) : null;
    if (Array.isArray(fromOptions) && fromOptions.length && Array.isArray(fromOptions[0])) {
      const rights = Array.from(new Set(fromOptions.flatMap((pair: unknown[]) => (Array.isArray(pair[1]) ? pair[1] : [pair[1]]).map(String))));
      return fromOptions.map((pair: unknown[]) => [String(pair[0]), rights]);
    }
  } catch {
    return [];
  }
  return [];
}

function readMatch(raw: string | undefined, left: string) {
  try { return JSON.parse(raw || "{}")[left] || ""; } catch { return ""; }
}

function writeMatch(raw: string | undefined, left: string, right: string) {
  let current: Record<string, string> = {};
  try { current = JSON.parse(raw || "{}"); } catch { current = {}; }
  current[left] = right;
  return JSON.stringify(current);
}

function readBlank(raw: string | undefined, id: string) {
  try { return String(JSON.parse(raw || "{}")[id] || ""); } catch { return ""; }
}

function writeBlank(raw: string | undefined, id: string, value: string) {
  let current: Record<string, string> = {};
  try { current = JSON.parse(raw || "{}"); } catch { current = {}; }
  current[id] = value;
  return JSON.stringify(current);
}

function readCalc(raw: string | undefined) {
  try {
    const value = JSON.parse(raw || "{}") as { value?: string; unit?: string };
    return { value: value.value || "", unit: value.unit || "" };
  } catch {
    return { value: "", unit: "" };
  }
}

function writeCalc(value: string, unit: string) {
  return JSON.stringify({ value, unit });
}

function DiagramLabels({ imageUrl, targets, options, value, onChange }: { imageUrl?: string | null; targets: LabelTarget[]; options: string[]; value: string; onChange: (value: string) => void }) {
  const labels = readLabels(value);
  const write = (id: string, text: string, point?: { x: number; y: number }) => {
    const next = { ...labels, [id]: { text, x: point?.x ?? labels[id]?.x, y: point?.y ?? labels[id]?.y } };
    onChange(JSON.stringify({ labels: Object.entries(next).map(([labelId, row]) => ({ id: labelId, ...row })) }));
  };
  return (
    <div className="space-y-3">
      {imageUrl && (
        <div className="relative">
          <img src={imageUrl} alt="Diagram to label" className="w-full rounded-2xl border" />
          {targets.map((target) => (
            <button key={target.id} type="button" aria-label={target.prompt} className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white text-xs font-bold" style={{ left: `${target.x * 100}%`, top: `${target.y * 100}%` }} onDragOver={(event) => event.preventDefault()} onDrop={(event) => write(target.id, event.dataTransfer.getData("text/plain"), target)}>{target.prompt}</button>
          ))}
        </div>
      )}
      {options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => <span key={option} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", option)} className="rounded-full border bg-white px-3 py-2 text-sm font-bold">{option}</span>)}
        </div>
      )}
      {targets.map((target) => (
        <label key={target.id} className="block font-semibold">
          {target.prompt}
          <Input aria-label={`Label for ${target.prompt}`} value={labels[target.id]?.text || ""} onChange={(event) => write(target.id, event.target.value, target)} className="mt-1 h-12 rounded-2xl" />
        </label>
      ))}
    </div>
  );
}

function readLabels(raw: string) {
  try {
    const value = JSON.parse(raw || "{}") as { labels?: { id: string; text?: string; x?: number; y?: number }[] };
    return Object.fromEntries((value.labels || []).map((label) => [label.id, label]));
  } catch {
    return {};
  }
}
