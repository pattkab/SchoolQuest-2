"use client";

import { useState } from "react";
import { buildContentAction, saveBuiltContentAction, type BuiltQuestion } from "./actions";

export function EngineForm({ subjects }: { subjects: { id: string; name: string }[] }) {
  const [output, setOutput] = useState<"practice" | "notes">("practice");
  const [busy, setBusy] = useState<"build" | "save" | null>(null);
  const [error, setError] = useState("");
  const [kind, setKind] = useState("");
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || "");
  const [mark, setMark] = useState<"AI" | "TEACHER">("AI");
  const [questions, setQuestions] = useState<BuiltQuestion[]>([]);
  const [markdown, setMarkdown] = useState("");
  const [summary, setSummary] = useState("");

  async function build(formData: FormData) {
    setBusy("build");
    setError("");
    try {
      const result = await buildContentAction(formData);
      setKind(result.kind);
      setSourceUrl(result.sourceUrl);
      setTitle(String(formData.get("title") || result.note?.title || ""));
      setSubjectId(String(formData.get("subjectId") || ""));
      setMark(String(formData.get("mark") || "AI") === "TEACHER" ? "TEACHER" : "AI");
      setQuestions(result.questions);
      setMarkdown(result.note?.markdown || "");
      setSummary(result.note?.summary || "");
    } catch (err) {
      if (typeof err === "object" && err && "digest" in err && String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")) throw err;
      setError(err instanceof Error ? err.message : "Could not read that file.");
    } finally {
      setBusy(null);
    }
  }

  async function save() {
    setBusy("save");
    setError("");
    try {
      await saveBuiltContentAction({
        output,
        title,
        subjectId,
        kind: (kind || "PDF") as "SCAN" | "PDF" | "GITHUB",
        sourceUrl,
        mark,
        questions,
        markdown,
        summary,
      });
    } catch (err) {
      if (typeof err === "object" && err && "digest" in err && String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")) throw err;
      setError(err instanceof Error ? err.message : "Could not save.");
      setBusy(null);
    }
  }

  const ready = output === "notes" ? Boolean(markdown) : questions.length > 0;

  return (
    <div className="space-y-4 max-w-3xl">
      <form action={build} className="rounded-3xl border bg-white p-4 grid sm:grid-cols-2 gap-3">
        <input name="title" required placeholder="Title" className="h-12 rounded-2xl border px-3 sm:col-span-2" />
        <select name="subjectId" required className="h-12 rounded-2xl border px-3 sm:col-span-2">
          {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </select>
        <select name="output" value={output} onChange={(event) => setOutput(event.target.value as "practice" | "notes")} className="h-12 rounded-2xl border px-3">
          <option value="practice">Practice questions</option>
          <option value="notes">Revision notes</option>
        </select>
        {output === "practice" ? (
          <select name="mark" className="h-12 rounded-2xl border px-3">
            <option value="AI">AI, then teacher</option>
            <option value="TEACHER">Teacher only</option>
          </select>
        ) : <div />}
        <input name="file" type="file" accept="application/pdf,image/png,image/jpeg" className="text-sm sm:col-span-2" />
        <input name="link" placeholder="GitHub or PDF link" className="h-12 rounded-2xl border px-3 sm:col-span-2" />
        <button type="submit" disabled={busy !== null} className="h-12 rounded-2xl bg-primary text-white font-bold sm:col-span-2">
          {busy === "build" ? "Reading…" : "Read file"}
        </button>
      </form>

      {error && <p className="rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">{error}</p>}

      {ready && (
        <form action={save} className="rounded-3xl border bg-white p-4 space-y-3">
          <p className="text-sm font-bold">{kind === "GITHUB" ? "GitHub paper" : kind === "SCAN" ? "Scanned paper" : "Searchable PDF"} · {output === "notes" ? "Notes" : `${questions.length} questions`}</p>
          {output === "practice" ? (
            <ol className="space-y-2 text-sm list-decimal pl-5">
              {questions.slice(0, 8).map((question, index) => <li key={index}>{question.prompt}</li>)}
              {questions.length > 8 && <li>…{questions.length - 8} more</li>}
            </ol>
          ) : (
            <pre className="text-sm whitespace-pre-wrap max-h-64 overflow-auto">{markdown.slice(0, 1200)}</pre>
          )}
          <button type="submit" disabled={busy !== null} className="h-12 rounded-2xl bg-primary px-5 text-white font-bold">
            {busy === "save" ? "Saving…" : "Publish"}
          </button>
        </form>
      )}
    </div>
  );
}
