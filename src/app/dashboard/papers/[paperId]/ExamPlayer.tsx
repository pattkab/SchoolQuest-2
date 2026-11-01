"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DrawingCanvas from "@/components/DrawingCanvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { questionTypeLabel } from "@/lib/marking";
import { submitExam } from "@/app/actions/marking";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, RefreshCw } from "lucide-react";

type Question = {
  id: string;
  type: string;
  prompt: string;
  stimulus?: string | null;
  options: string | null;
  points: number;
};

type Result = {
  attemptId: string;
  score: number;
  maxScore: number;
  pendingCount: number;
  totalQuestions: number;
};

function parseOptions(raw: string | null) {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.map(String) : [];
  } catch {
    return [];
  }
}

export default function ExamPlayer({
  paper,
  questions,
  freeAttempt = false,
}: {
  freeAttempt?: boolean;
  paper: { id: string; title: string; kind: string; subject: string; className: string; topic: string | null; backHref: string };
  questions: Question[];
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const question = questions[index];
  const options = useMemo(() => parseOptions(question?.options), [question]);
  const matchPairs = question?.type === "MATCHING" ? parseMatch(question.options, question) : [];

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
        <p className="font-display text-6xl text-primary">{percent}%</p>
        <p className="font-bold">{result.score} / {result.maxScore} marks</p>
        {result.pendingCount > 0 && (
          <p className="rounded-2xl bg-amber-50 text-amber-800 px-4 py-3 text-sm">
            {result.pendingCount} with the teacher.
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`/dashboard/attempts/${result.attemptId}`} className="rounded-2xl bg-primary text-white px-5 py-3 font-bold">
            Results
          </Link>
          {!freeAttempt && <Button variant="outline" className="rounded-2xl h-12" onClick={() => { setResult(null); setAnswers({}); setIndex(0); }}>
            <RefreshCw className="h-4 w-4" /> Try again
          </Button>}
          {freeAttempt && <Link href="/dashboard/subscribe" className="rounded-2xl bg-primary px-5 py-3 font-bold text-white">Go Pro for more practice</Link>}
          <Link href={paper.backHref} className="rounded-2xl border px-5 py-3 font-bold">Subject</Link>
        </div>
      </div>
    );
  }

  const setAnswer = (value: string) => setAnswers((prev) => ({ ...prev, [question.id]: value }));

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <Link href={paper.backHref} className="text-sm font-bold text-primary">← {paper.className} {paper.subject}</Link>
        <h1 className="font-display text-3xl mt-2">{paper.title}</h1>
        <p className="text-sm text-muted-foreground">{paper.topic || paper.kind.replaceAll("_", " ")} · Question {index + 1} of {questions.length}</p>
        {freeAttempt && <p className="mt-2 text-sm font-semibold text-primary">Your free practice exam for this subject</p>}
        <div className="h-2 rounded-full bg-muted mt-3">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-[2rem] bg-white border p-5 md:p-7 space-y-5">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {questionTypeLabel(question.type)} · {question.points} mark{question.points === 1 ? "" : "s"}
        </p>
        {question.stimulus && (
          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm leading-relaxed whitespace-pre-wrap">
            {question.stimulus}
          </div>
        )}
        <h2 className="font-display text-2xl leading-snug">{question.prompt}</h2>

        {question.type === "MULTIPLE_CHOICE" && (
          <div className="grid gap-2">
            {options.map((opt) => {
              const selected = answers[question.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setAnswer(opt)}
                  className={`text-left rounded-2xl border-2 px-4 py-3 font-semibold ${selected ? "border-primary bg-primary/8 text-primary" : "border-border bg-white"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {question.type === "TRUE_FALSE" && (
          <div className="grid grid-cols-2 gap-3">
            {["True", "False"].map((opt) => (
              <button
                key={opt}
                onClick={() => setAnswer(opt)}
                className={`rounded-2xl border-2 py-5 font-black text-xl ${answers[question.id] === opt ? "border-primary bg-primary/8 text-primary" : "border-border"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {question.type === "DRAWING" && (
          <DrawingCanvas onChange={setAnswer} defaultValue={answers[question.id]} />
        )}

        {question.type === "MATCHING" && (
          <div className="space-y-3">
            {matchPairs.map(([left, rights]) => (
              <label key={left} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold sm:w-1/2">{left}</span>
                <select
                  className="flex-1 h-11 rounded-2xl border px-3"
                  value={readMatch(answers[question.id], left)}
                  onChange={(e) => setAnswer(writeMatch(answers[question.id], left, e.target.value))}
                >
                  <option value="">Choose…</option>
                  {rights.map((right) => (
                    <option key={right} value={right}>{right}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}

        {["SHORT_ANSWER", "COMPREHENSION", "LONG_ANSWER"].includes(question.type) && (
          <Textarea
            value={answers[question.id] || ""}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-32 rounded-2xl text-base"
            placeholder="Write your answer"
          />
        )}

        {["FILL_BLANK", "NUMERIC"].includes(question.type) && (
          <Input
            value={answers[question.id] || ""}
            onChange={(e) => setAnswer(e.target.value)}
            className="h-14 rounded-2xl text-lg"
            placeholder={question.type === "NUMERIC" ? "Number" : "Answer"}
          />
        )}

        <div className="flex justify-between gap-3 pt-2">
          <Button variant="outline" className="rounded-2xl h-12" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {index === questions.length - 1 ? (
            <Button
              className="rounded-2xl h-12 px-6 font-bold"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  const res = await submitExam({ paperId: paper.id, answers });
                  setResult(res);
                } catch (error) {
                  alert(error instanceof Error ? error.message : "Could not submit.");
                } finally {
                  setBusy(false);
                }
              }}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {busy ? "Marking…" : "Submit"}
            </Button>
          ) : (
            <Button className="rounded-2xl h-12" onClick={() => setIndex((i) => i + 1)}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function parseMatch(options: string | null, question: Question): [string, string[]][] {
  try {
    const fromOptions = options ? JSON.parse(options) : null;
    if (Array.isArray(fromOptions) && fromOptions.length && Array.isArray(fromOptions[0])) {
      const rights = Array.from(
        new Set(
          fromOptions.flatMap((p: unknown[]) => (Array.isArray(p[1]) ? p[1] : [p[1]]).map(String))
        )
      );
      return fromOptions.map((p: unknown[]) => [String(p[0]), rights]);
    }
  } catch {
    /* continue */
  }
  void question;
  return [];
}

function readMatch(raw: string | undefined, left: string) {
  try {
    return JSON.parse(raw || "{}")[left] || "";
  } catch {
    return "";
  }
}

function writeMatch(raw: string | undefined, left: string, right: string) {
  let current: Record<string, string> = {};
  try {
    current = JSON.parse(raw || "{}");
  } catch {
    current = {};
  }
  current[left] = right;
  return JSON.stringify(current);
}
