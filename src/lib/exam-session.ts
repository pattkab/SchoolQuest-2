/** Server-time and answer-version rules for an examination attempt. */

export function examDeadline(startedAt: Date, durationMinutes: number | null | undefined): Date | null {
  if (!durationMinutes || durationMinutes <= 0) return null;
  return new Date(startedAt.getTime() + durationMinutes * 60_000);
}

export function remainingMs(deadline: Date | null, now: Date): number | null {
  if (!deadline) return null;
  return deadline.getTime() - now.getTime();
}

export function isPastDeadline(deadline: Date | null | undefined, now: Date): boolean {
  if (!deadline) return false;
  return now.getTime() >= new Date(deadline).getTime();
}

/** The client sends the version it last stored. A different version is stale. */
export function answerWriteDecision(storedVersion: number, clientVersion: number): "apply" | "stale" {
  return clientVersion === storedVersion ? "apply" : "stale";
}

export function canMutateAttempt(status: string, finalizedAt: Date | null | undefined): boolean {
  return status === "IN_PROGRESS" && !finalizedAt;
}

export type VersionedAnswer = { value: string; version: number };

/**
 * A confirmed submit keeps the newer write. A stale client copy cannot replace
 * an answer that was already saved at a higher version.
 */
export function mergeAttemptAnswers(
  saved: Record<string, VersionedAnswer>,
  incoming: Record<string, VersionedAnswer>,
): Record<string, string> {
  const ids = new Set([...Object.keys(saved), ...Object.keys(incoming)]);
  const out: Record<string, string> = {};
  for (const id of ids) {
    const server = saved[id];
    const client = incoming[id];
    if (!client) out[id] = server?.value ?? "";
    else if (!server || client.version >= server.version) out[id] = client.value;
    else out[id] = server.value;
  }
  return out;
}

export type DiagramTarget = { id: string; x: number; y: number; prompt: string };

/** Positions a student can label. Accepted spellings stay on the server. */
export function publicDiagramTargets(correctAnswer: string | null | undefined): DiagramTarget[] {
  if (!correctAnswer) return [];
  try {
    const parsed = JSON.parse(correctAnswer) as { labels?: unknown };
    if (!Array.isArray(parsed.labels)) return [];
    return parsed.labels.flatMap((label) => {
      if (!label || typeof label !== "object") return [];
      const row = label as { id?: unknown; x?: unknown; y?: unknown; prompt?: unknown };
      const x = Number(row.x);
      const y = Number(row.y);
      if (!row.id || Number.isNaN(x) || Number.isNaN(y)) return [];
      return [{ id: String(row.id), x, y, prompt: String(row.prompt || row.id) }];
    });
  } catch {
    return [];
  }
}
