/** A topic quiz plays as a short round, not a full paper. */
export const QUIZ_ROUND = 5;

export function quizQuestions<T>(questions: T[]) {
  return questions.slice(0, QUIZ_ROUND);
}
