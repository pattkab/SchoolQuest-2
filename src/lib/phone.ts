export function phoneKeys(input: string) {
  const digits = input.replace(/\D/g, "");
  const keys = new Set<string>();
  if (!digits) return [];
  keys.add(digits);
  if (digits.startsWith("256") && digits.length > 3) {
    const local = `0${digits.slice(3)}`;
    keys.add(local);
    keys.add(`+${digits}`);
  } else if (digits.startsWith("0") && digits.length > 1) {
    const international = `256${digits.slice(1)}`;
    keys.add(international);
    keys.add(`+${international}`);
  } else if (digits.length === 9) {
    keys.add(`0${digits}`);
    keys.add(`256${digits}`);
    keys.add(`+256${digits}`);
  }
  return [...keys];
}

export function canonicalPhone(input: string) {
  const keys = phoneKeys(input);
  return keys.find((key) => key.startsWith("0")) || keys[0] || "";
}
