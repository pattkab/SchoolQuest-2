import assert from "node:assert/strict";
import test from "node:test";
import { QUIZ_ROUND, quizQuestions } from "../src/lib/quiz-game";

test("a topic quiz plays five questions", () => {
  const round = quizQuestions(["a", "b", "c", "d", "e", "f", "g"]);
  assert.equal(round.length, QUIZ_ROUND);
  assert.deepEqual(round, ["a", "b", "c", "d", "e"]);
  assert.deepEqual(quizQuestions(["one", "two"]), ["one", "two"]);
});
