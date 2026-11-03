import assert from "node:assert/strict";
import test from "node:test";
import { classifyFreshTeacherPath, learningKind, summarizeCatalog } from "../src/lib/fresh-teacher-catalog";
import { parseGrade } from "../src/lib/gemini";

test("a Fresh Teacher path becomes a class, subject, and paper kind", () => {
  const paper = classifyFreshTeacherPath("p7/P.7 ENGLISH END OF TERM ONE, SET ONE, 2023.pdf");
  assert.deepEqual(paper, { classSlug: "p7", subjectSlug: "english", kind: "paper", year: 2023 });
  const guide = classifyFreshTeacherPath("p7/sipro premock and marking guide.pdf");
  assert.equal(guide.kind, "guide");
  assert.equal(guide.classSlug, "p7");
  const senior = classifyFreshTeacherPath("s6/Macadita UACE Economics 2 2023.pdf");
  assert.equal(senior.classSlug, "s6");
  assert.equal(senior.subjectSlug, "economics");
});

test("notes and schemes of work are kept as learning copies", () => {
  assert.equal(learningKind("Baby Class English Term 2 Lesson Notes.pdf"), "notes");
  assert.equal(learningKind("All Schemes of Work P.3 TERM THREE.pdf"), "scheme");
  assert.equal(learningKind("nurseriez/TOP CLASS LESSON PLAN WHOLE YEAR 2019.pdf"), "plan");
  assert.equal(learningKind("Uganda-English-Syllabus-Final.pdf"), "syllabus");
  assert.equal(learningKind("p7/P.7 ENGLISH END OF TERM ONE, SET ONE, 2023.pdf"), null);
  assert.equal(learningKind("NEW CURRICULUM EXAM COMPOSITION.pdf"), null);
});

test("the catalog summary counts papers separately from guides", () => {
  const summary = summarizeCatalog([
    { gitBlob: "a", bytes: 1, path: "a.pdf", repository: "Fresh-Teacher/fresh-teacher.github.io", revision: "abc", sourcePath: "a.pdf", classSlug: "p7", subjectSlug: "science", kind: "paper", year: 2024 },
    { gitBlob: "b", bytes: 1, path: "b.pdf", repository: "Fresh-Teacher/fresh-teacher.github.io", revision: "abc", sourcePath: "b.pdf", classSlug: "p7", subjectSlug: "science", kind: "guide", year: null },
  ], 3, "abc");
  assert.equal(summary.byKind.paper, 1);
  assert.equal(summary.byClass.p7.guide, 1);
  assert.equal(summary.paths, 3);
});

test("an unsure AI mark asks for review", () => {
  const grade = parseGrade('{"score":2,"explanation":"Close.","confidence":0.4,"needsReview":true}');
  assert.equal(grade.needsReview, true);
  assert.equal(grade.confidence, 0.4);
});
