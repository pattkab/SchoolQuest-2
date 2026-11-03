"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { checkQuizAnswer, completeQuiz, startQuiz } from "@/app/actions/marking";
import { QuestSoundToggle } from "@/components/quest-sound-toggle";
import { playQuestSound, prepareQuestSound } from "@/lib/quest-sounds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Question = {
  id: string;
  type: string;
  prompt: string;
  options: string | null;
  points: number;
};

type Check = { correct: boolean | null; points: number; feedback: string; pending: boolean };

function optionsOf(raw: string | null) {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.map(String) : [];
  } catch {
    return [];
  }
}

export default function QuizGame({
  paper,
  questions,
}: {
  paper: { id: string; title: string; subject: string; className: string; backHref: string };
  questions: Question[];
}) {
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState("");
  const [check, setCheck] = useState<Check | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState<{ score: number; maxScore: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    startQuiz(paper.id).then((session) => {
      if (!live) return;
      setAttemptId(session.attemptId);
      const answered = new Set(session.answered);
      const next = questions.findIndex((item) => !answered.has(item.id));
      if (next >= 0) setIndex(next);
    }).catch((caught: unknown) => {
      if (live) setError(caught instanceof Error ? caught.message : "The quiz could not start.");
    });
    return () => { live = false; };
  }, [paper.id, questions]);

  const question = questions[index];
  const choices = question ? optionsOf(question.options) : [];
  const typed = question?.type !== "MULTIPLE_CHOICE" && question?.type !== "TRUE_FALSE";

  async function ensureAttempt() {
    if (attemptId) return attemptId;
    const session = await startQuiz(paper.id);
    setAttemptId(session.attemptId);
    const answered = new Set(session.answered);
    const next = questions.findIndex((item) => !answered.has(item.id));
    if (next > 0) setIndex(next);
    return session.attemptId;
  }

  async function submit(value: string) {
    if (!question || check || busy || !value.trim()) return;
    prepareQuestSound();
    setBusy(true);
    setError("");
    try {
      const id = await ensureAttempt();
      const result = await checkQuizAnswer({ attemptId: id, questionId: question.id, value });
      setCheck(result);
      if (result.correct) {
        setCorrectCount((count) => count + 1);
        playQuestSound("correct");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The answer could not be checked.");
    } finally {
      setBusy(false);
    }
  }

  async function next() {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setChoice("");
      setCheck(null);
      return;
    }
    if (!attemptId) return;
    prepareQuestSound();
    setBusy(true);
    try {
      const result = await completeQuiz(attemptId);
      setDone({ score: result.score, maxScore: result.maxScore });
      playQuestSound("complete");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The quiz could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  function playAgain() {
    setAttemptId(null);
    setIndex(0);
    setChoice("");
    setCheck(null);
    setCorrectCount(0);
    setDone(null);
    setError("");
  }

  if (!questions.length) {
    return <p className="rounded-3xl border bg-white p-6 font-bold">This quiz has no questions yet.</p>;
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto rounded-[2rem] bg-white border p-8 text-center quiz-celebration space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Short quiz</p>
        <h1 className="font-display text-4xl">{paper.title}</h1>
        <p className="font-display text-6xl text-primary">{correctCount}/{questions.length}</p>
        <p className="font-bold">{done.score} / {done.maxScore} marks</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button className="rounded-2xl h-12" onClick={playAgain}>Play again</Button>
          <Link href={paper.backHref} className="rounded-2xl border px-5 py-3 font-bold">Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Link href={paper.backHref} className="text-sm font-bold text-primary">← {paper.className} {paper.subject}</Link>
        <p className="text-sm font-bold">{correctCount} correct</p>
      </div>
      <QuestSoundToggle />
      <div className="rounded-[2rem] bg-white border p-6 space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Short quiz · {index + 1} of {questions.length}</p>
        <h1 className="font-display text-3xl leading-snug">{question.prompt}</h1>
        {question.type === "TRUE_FALSE" && (
          <div className="grid grid-cols-2 gap-3">
            {["True", "False"].map((option) => (
              <button key={option} type="button" disabled={Boolean(check) || busy} onClick={() => void submit(option)} className="rounded-2xl border-2 px-4 py-4 text-lg font-bold">{option}</button>
            ))}
          </div>
        )}
        {question.type === "MULTIPLE_CHOICE" && (
          <div className="grid gap-2">
            {choices.map((option) => (
              <button key={option} type="button" disabled={Boolean(check) || busy} onClick={() => void submit(option)} className="text-left rounded-2xl border-2 px-4 py-3 font-bold">{option}</button>
            ))}
          </div>
        )}
        {typed && (
          <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); void submit(choice); }}>
            <Input value={choice} onChange={(event) => setChoice(event.target.value)} disabled={Boolean(check) || busy} aria-label="Your answer" placeholder="Type your answer" />
            <Button type="submit" className="rounded-2xl h-12" disabled={Boolean(check) || busy || !choice.trim()}>Check</Button>
          </form>
        )}
        {check && <p role="status" className={`rounded-2xl px-4 py-3 font-bold ${check.correct ? "bg-emerald-50 quiz-celebration" : "bg-amber-50"}`}>{check.feedback}</p>}
        {error && <p role="alert" className="text-sm font-bold text-red-700">{error}</p>}
        {check && <Button className="rounded-2xl h-12 w-full" disabled={busy} onClick={() => void next()}>{index + 1 < questions.length ? "Next" : "See score"}</Button>}
      </div>
    </div>
  );
}
