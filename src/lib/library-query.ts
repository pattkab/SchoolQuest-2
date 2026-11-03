/** A shelf is downloaded only after the learner chooses a type or a subject. */
export function shouldFetchLibrary(options: { kind?: string; subjectKeys?: string[] }) {
  return Boolean(options.kind || options.subjectKeys?.length);
}
