import bcrypt from "bcryptjs";

export function passwordMatches(hash: string | null | undefined, password: string) {
  if (!hash || !password) return false;
  return bcrypt.compareSync(password, hash);
}
