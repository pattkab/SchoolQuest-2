import assert from "node:assert/strict";
import test from "node:test";
import { collectionFor } from "../src/lib/fresh-teacher-catalog";
import { questionsFromPaperText, schemeMatchKey, schemeStatus } from "../src/lib/marking-scheme";

const paper = `
1. Name the longest river in Africa.
2. Which gas do plants use?
A. Oxygen
B. Carbon dioxide
C. Nitrogen
D. Hydrogen

ANSWERS
1. Nile
2. B
`;

test("holiday packages, exams, and past papers are kept for the library", () => {
  assert.equal(collectionFor("p7/P.7 Holiday package mathematics term 3.pdf"), "holiday");
  assert.equal(collectionFor("p7/P.7 ENGLISH END OF TERM ONE, SET ONE, 2023.pdf"), "exam");
  assert.equal(collectionFor("P7-SST-1996-PLE-QUESTIONS-WITH-ANSWERS.pdf"), "guide");
  assert.equal(collectionFor("primary/UNEB past paper science 2019.pdf"), "past-paper");
  assert.equal(collectionFor("p7/Area-upper-primary.pdf"), "other");
});

test("a paper and its answer section become a ready marking scheme", () => {
  const questions = questionsFromPaperText(paper, null);
  assert.equal(questions.length, 2);
  assert.equal(questions[0].correctAnswer, "Nile");
  assert.equal(questions[1].type, "MULTIPLE_CHOICE");
  assert.equal(questions[1].correctAnswer, "Carbon dioxide");
  assert.equal(schemeStatus(questions), "ready");
  assert.equal(schemeMatchKey("p7/Science set 1 marking guide.pdf"), schemeMatchKey("p7/Science set 1.pdf"));
});

test("a paper without answers stays a draft", () => {
  const questions = questionsFromPaperText("1. Name the longest river in Africa.\n2. Name the largest lake.", null);
  assert.equal(schemeStatus(questions), "draft");
});
