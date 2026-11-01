import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAccessibility, defaultAccessibility, speechChunks, DRAWING_DESCRIPTION_PREFIX, isDrawingDescription } from '../src/lib/accessibility-settings';
import { markAnswer, type MarkableQuestion } from '../src/lib/marking';

test('untrusted saved preferences cannot force unreadable text sizes or invalid speech speeds', () => {
  assert.deepEqual(parseAccessibility(null), defaultAccessibility);
  assert.deepEqual(parseAccessibility({ textSize: -100, speechRate: 50, highContrast: 'false' }), defaultAccessibility);
  assert.equal(parseAccessibility({ textSize: 200, highContrast: true, speechRate: 0.75 }).textSize, 200);
});

test('long lessons are split within speech limits without dropping words', () => {
  const lesson = Array.from({ length: 900 }, (_, index) => `Word${index}.`).join(' ');
  const chunks = speechChunks(lesson);
  assert.ok(chunks.length > 1);
  assert.ok(chunks.every(chunk => chunk.length <= 1000));
  assert.equal(chunks.join(' '), lesson);
  assert.deepEqual(speechChunks(' \n\t '), []);
});

test('oversized single tokens do not exceed speech engine limits', () => {
  const word = 'a'.repeat(2200);
  const chunks = speechChunks(word);
  assert.ok(chunks.every(chunk => chunk.length <= 1000));
  assert.equal(chunks.join(''), word);
});

const drawing: MarkableQuestion = { id: 'drawing', type: 'DRAWING', prompt: 'Draw and label a triangle.', options: null, correctAnswer: '"triangle"', acceptedAnswers: null, markingGuide: null, explanation: null, numericTolerance: null, caseSensitive: false, requiresTeacher: false, points: 5 };
test('a drawing description remains unscored and awaits teacher review', () => {
  const answer = DRAWING_DESCRIPTION_PREFIX + 'Three straight sides meet at three corners.';
  assert.equal(isDrawingDescription('DRAWING', answer), true);
  assert.equal(isDrawingDescription('SHORT_ANSWER', answer), false);
  const marked = markAnswer(drawing, answer);
  assert.equal(marked.status, 'PENDING');
  assert.equal(marked.isCorrect, null);
  assert.equal(marked.points, 0);
  assert.match(marked.feedback, /teacher review/);
});

test('an empty drawing-description marker is still unanswered', () => {
  assert.equal(markAnswer(drawing, DRAWING_DESCRIPTION_PREFIX + ' ').status, 'UNANSWERED');
});
