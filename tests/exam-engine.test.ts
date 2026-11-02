import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { markAnswer, type MarkableQuestion } from "../src/lib/marking";
import {
  answerWriteDecision,
  canMutateAttempt,
  examDeadline,
  isPastDeadline,
  mergeAttemptAnswers,
  publicDiagramTargets,
} from "../src/lib/exam-session";

function question(overrides: Partial<MarkableQuestion> & Pick<MarkableQuestion, "type" | "correctAnswer">): MarkableQuestion {
  return {
    id: "q1",
    prompt: "Question",
    options: null,
    acceptedAnswers: null,
    markingGuide: null,
    explanation: null,
    numericTolerance: null,
    caseSensitive: false,
    requiresTeacher: false,
    points: 4,
    ...overrides,
  };
}

test("multiple choice accepts the option text and awards full marks", () => {
  const result = markAnswer(question({ type: "MULTIPLE_CHOICE", options: JSON.stringify(["3", "4", "5"]), correctAnswer: JSON.stringify("4"), points: 1 }), "4");
  assert.equal(result.status, "AUTO");
  assert.equal(result.points, 1);
  assert.equal(result.isCorrect, true);
});

test("multi-select can award partial credit and reject an all-or-nothing miss", () => {
  const options = JSON.stringify(["odd", "even", "prime"]);
  const correct = JSON.stringify(["odd", "prime"]);
  const partial = markAnswer(question({ type: "MULTI_SELECT", options, correctAnswer: correct, partialRule: "proportional" }), JSON.stringify(["odd"]));
  assert.equal(partial.points, 2);
  const exact = markAnswer(question({ type: "MULTI_SELECT", options, correctAnswer: correct, partialRule: "all-or-nothing" }), JSON.stringify(["odd"]));
  assert.equal(exact.points, 0);
});

test("short answers accept spelling and listed alternatives", () => {
  const base = question({ type: "SHORT_ANSWER", correctAnswer: JSON.stringify("Kampala"), acceptedAnswers: JSON.stringify(["Kampala city"]), points: 1 });
  assert.equal(markAnswer(base, "kampalla").isCorrect, true);
  assert.equal(markAnswer(base, "Kampala city").isCorrect, true);
});

test("fill-in-the-blank scores each blank", () => {
  const result = markAnswer(question({ type: "FILL_BLANK", correctAnswer: JSON.stringify({ "1": ["Nile"], "2": ["Lake Victoria", "Victoria"] }), points: 2 }), JSON.stringify({ "1": "Nile", "2": "Victoria" }));
  assert.equal(result.points, 2);
  assert.equal(result.isCorrect, true);
});

test("ordering awards marks for positions that are right", () => {
  const result = markAnswer(question({ type: "ORDERING", correctAnswer: JSON.stringify(["egg", "larva", "pupa", "adult"]), points: 4 }), JSON.stringify(["egg", "pupa", "larva", "adult"]));
  assert.equal(result.points, 2);
});

test("diagram labels accept typed answers and reject a label dropped far from its place", () => {
  const correct = JSON.stringify({ labels: [{ id: "a", x: 0.2, y: 0.3, prompt: "A", accept: ["heart"] }] });
  const typed = markAnswer(question({ type: "DIAGRAM_LABEL", correctAnswer: correct, points: 2 }), JSON.stringify({ a: "heart" }));
  assert.equal(typed.points, 2);
  const misplaced = markAnswer(question({ type: "DIAGRAM_LABEL", correctAnswer: correct, points: 2 }), JSON.stringify({ labels: [{ id: "a", text: "heart", x: 0.9, y: 0.9 }] }));
  assert.equal(misplaced.points, 0);
  assert.deepEqual(publicDiagramTargets(correct), [{ id: "a", x: 0.2, y: 0.3, prompt: "A" }]);
});

test("calculations check the unit and can give half marks for the right number", () => {
  const correct = JSON.stringify({ value: 12, unit: "cm", tolerance: 0.1 });
  const full = markAnswer(question({ type: "CALCULATION", correctAnswer: correct, partialRule: "value-half" }), JSON.stringify({ value: 12, unit: "centimetres" }));
  assert.equal(full.points, 4);
  const half = markAnswer(question({ type: "CALCULATION", correctAnswer: correct, partialRule: "value-half" }), JSON.stringify({ value: 12, unit: "m" }));
  assert.equal(half.points, 2);
});

test("a written answer follows its rubric and stays unmarked when a teacher is required", () => {
  const guide = JSON.stringify({ criteria: [{ label: "definition", marks: 2, keywords: ["set", "elements"] }, { label: "example", marks: 2, keywords: ["example"] }] });
  const marked = markAnswer(question({ type: "LONG_ANSWER", correctAnswer: JSON.stringify(""), markingGuide: guide }), "A set is a collection of elements.");
  assert.equal(marked.points, 2);
  const review = markAnswer(question({ type: "LONG_ANSWER", correctAnswer: JSON.stringify(""), markingGuide: guide, requiresTeacher: true }), "A set is a collection of elements.");
  assert.equal(review.status, "PENDING");
  assert.equal(review.points, 0);
});

test("the deadline follows the server clock rather than a learner's device clock", () => {
  const started = new Date("2026-11-02T09:00:00.000Z");
  const deadline = examDeadline(started, 30);
  assert.equal(deadline?.toISOString(), "2026-11-02T09:30:00.000Z");
  assert.equal(isPastDeadline(deadline, new Date("2026-11-02T09:29:00.000Z")), false);
  assert.equal(isPastDeadline(deadline, new Date("2026-11-02T09:30:00.000Z")), true);
});

test("a stale answer cannot replace a newer saved answer", () => {
  assert.equal(answerWriteDecision(2, 2), "apply");
  assert.equal(answerWriteDecision(2, 1), "stale");
  const merged = mergeAttemptAnswers(
    { q1: { value: "saved later", version: 3 } },
    { q1: { value: "old tab", version: 2 } },
  );
  assert.equal(merged.q1, "saved later");
});

test("a finalized attempt cannot be changed or submitted twice", () => {
  assert.equal(canMutateAttempt("IN_PROGRESS", null), true);
  assert.equal(canMutateAttempt("GRADED", new Date()), false);
  assert.equal(canMutateAttempt("IN_PROGRESS", new Date()), false);
});

test("a resumed attempt keeps its answer and a second submit does not create another result", async () => {
  if (!process.env.DATABASE_URL) {
    try {
      const file = readFileSync(new URL("../.env", import.meta.url), "utf8");
      const match = file.match(/^DATABASE_URL=(.*)$/m);
      if (match) process.env.DATABASE_URL = match[1].trim().replace(/^["']|["']$/g, "");
    } catch {
      return;
    }
  }
  if (!process.env.DATABASE_URL?.startsWith("postgres")) return;

  const { db } = await import("../src/lib/db");
  const { finalizeExam, openExamAttempt, saveExamAnswers } = await import("../src/lib/exam-attempts");
  const subject = await db.subject.findFirst();
  assert.ok(subject);
  const user = await db.user.create({ data: { role: "STUDENT", name: "Exam engine test", accountKind: "TEST", email: `exam-engine-${Date.now()}@example.com` } });
  const paper = await db.paper.create({
    data: {
      title: "Exam engine test",
      subjectId: subject.id,
      status: "PUBLISHED",
      durationMinutes: 20,
      questions: { create: { type: "MULTIPLE_CHOICE", prompt: "2 + 2", options: JSON.stringify(["3", "4"]), correctAnswer: JSON.stringify("4"), points: 1, order: 1 } },
    },
    include: { questions: true },
  });
  try {
    const started = await openExamAttempt(user.id, paper.id);
    const questionId = paper.questions[0].id;
    const saved = await saveExamAnswers(user.id, started.attemptId, [{ questionId, value: "4", version: 0 }]);
    assert.equal(saved.stale.length, 0);
    const resumed = await openExamAttempt(user.id, paper.id);
    assert.equal(resumed.attemptId, started.attemptId);
    assert.equal(resumed.answers[questionId], "4");
    const stale = await saveExamAnswers(user.id, started.attemptId, [{ questionId, value: "3", version: 0 }]);
    assert.equal(stale.stale[0], questionId);
    const first = await finalizeExam(user.id, started.attemptId, { [questionId]: { value: "4", version: saved.versions[questionId] } }, {});
    const second = await finalizeExam(user.id, started.attemptId, { [questionId]: { value: "3", version: 1 } }, { [questionId]: "3" });
    assert.equal(second.attemptId, first.attemptId);
    assert.equal(first.score, 1);
    assert.equal(second.score, 1);
    assert.equal(await db.attempt.count({ where: { userId: user.id, paperId: paper.id } }), 1);
  } finally {
    await db.paper.delete({ where: { id: paper.id } });
    await db.user.delete({ where: { id: user.id } });
  }
});
