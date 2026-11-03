import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

function readEnv(name: string) {
  // Bracket access stays dynamic. A direct process.env.DATABASE_URL read is
  // frozen from the local .env file when the production bundle is built.
  const fromProcess = process.env[name];
  if (fromProcess) return fromProcess;
  const netlifyEnv = (globalThis as { Netlify?: { env?: { get?: (key: string) => string | undefined } } }).Netlify?.env;
  return netlifyEnv?.get?.(name);
}

function databaseUrl() {
  // The hosted site injects NETLIFY_DB_URL. Local development and CI use DATABASE_URL.
  const hosted = readEnv("NETLIFY_DB_URL");
  const configured = hosted || readEnv("DATABASE_URL");
  if (!configured?.startsWith("postgres")) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection string.");
  }
  // Serverless hosts open a new process per request. Cap each process at one
  // connection unless the host URL already sets a pool size.
  if (!hosted && !readEnv("NETLIFY") && !readEnv("VERCEL")) return configured;
  const extras = [];
  if (!/[?&]connection_limit=/.test(configured)) extras.push("connection_limit=1");
  if (!/[?&]pool_timeout=/.test(configured)) extras.push("pool_timeout=20");
  if (!extras.length) return configured;
  return configured + (configured.includes("?") ? "&" : "?") + extras.join("&");
}

export const db = globalThis.prismaClient || new PrismaClient({ datasources: { db: { url: databaseUrl() } } });

if (process.env.NODE_ENV !== "production") globalThis.prismaClient = db;

