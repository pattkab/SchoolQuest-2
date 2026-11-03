export type AccessibilitySettings = {
  textSize: number;
  highContrast: boolean;
  spaciousText: boolean;
  calmDisplay: boolean;
  readingPaper: boolean;
  speechRate: number;
};

export const defaultAccessibility: AccessibilitySettings = {
  textSize: 100, highContrast: false, spaciousText: false,
  calmDisplay: false, readingPaper: false, speechRate: 1,
};

export function parseAccessibility(value: unknown): AccessibilitySettings {
  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    textSize: [100, 125, 150, 175, 200].includes(Number(source.textSize)) ? Number(source.textSize) : 100,
    speechRate: [0.75, 1, 1.25, 1.5].includes(Number(source.speechRate)) ? Number(source.speechRate) : 1,
    highContrast: source.highContrast === true,
    spaciousText: source.spaciousText === true,
    calmDisplay: source.calmDisplay === true,
    readingPaper: source.readingPaper === true,
  };
}

/** Stay below speech-engine limits without losing words from long lessons. */
export function speechChunks(text: string, limit = 1000): string[] {
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const result: string[] = [];
  let chunk = '';
  for (const word of words) {
    if (chunk && chunk.length + word.length + 1 > limit) { result.push(chunk); chunk = ''; }
    if (word.length > limit) {
      for (let index = 0; index < word.length; index += limit) result.push(word.slice(index, index + limit));
    } else chunk = chunk ? `${chunk} ${word}` : word;
  }
  if (chunk) result.push(chunk);
  return result;
}

export const DRAWING_DESCRIPTION_PREFIX = 'TEXT_DESCRIPTION:\n';
export function isDrawingDescription(type: string, answer: string): boolean {
  return type === 'DRAWING' && answer.startsWith(DRAWING_DESCRIPTION_PREFIX);
}

export function submittedAnswerText(type: string, answer: string | null): string {
  return answer && isDrawingDescription(type, answer) ? `Description in words: ${answer.slice(DRAWING_DESCRIPTION_PREFIX.length)}` : answer || '—';
}
