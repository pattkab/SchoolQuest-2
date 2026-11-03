export type DeploymentTarget = "development" | "staging" | "production";

export function deploymentTarget(): DeploymentTarget {
  const named = process.env.SCHOOLQUEST_ENV;
  if (named === "production" || named === "staging" || named === "development") return named;
  if (process.env.NETLIFY === "true") return "production";
  return "development";
}

export function seedBlockedReason() {
  const target = deploymentTarget();
  if (target === "development") return null;
  return `Refusing to seed the ${target} environment.`;
}
