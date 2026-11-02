import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient | undefined;
}

function databaseUrl() {
  const configured = process.env.DATABASE_URL;
  if (!configured?.startsWith("postgres")) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection string.");
  }
  // Serverless hosts open a new process per request. Cap each process at one
  // connection unless the host URL already sets a pool size.
  if (!process.env.NETLIFY && !process.env.VERCEL) return configured;
  const extras = [];
  if (!/[?&]connection_limit=/.test(configured)) extras.push("connection_limit=1");
  if (!/[?&]pool_timeout=/.test(configured)) extras.push("pool_timeout=20");
  if (!extras.length) return configured;
  return configured + (configured.includes("?") ? "&" : "?") + extras.join("&");
}

export const db = globalThis.prismaClient || new PrismaClient({ datasources: { db: { url: databaseUrl() } } });

if (process.env.NODE_ENV !== "production") globalThis.prismaClient = db;

