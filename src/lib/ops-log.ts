const SENSITIVE_KEY = /answer|password|token|secret|email|phone|authorization|body|prompt/i;

export function redactOps(fields: Record<string, unknown>) {
  const safe: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (SENSITIVE_KEY.test(key)) continue;
    if (typeof value === "string") {
      if (value.length > 120) continue;
      safe[key] = value;
    } else if (typeof value === "number" || typeof value === "boolean" || value === null) {
      safe[key] = value;
    }
  }
  return safe;
}

export function reportOps(event: string, fields: Record<string, unknown> = {}) {
  const line = JSON.stringify({ event, ...redactOps(fields), at: new Date().toISOString() });
  console.error(line);
  return line;
}
