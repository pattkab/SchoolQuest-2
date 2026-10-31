import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient | undefined;
}

function databaseUrl() {
  const bundled = path.join(process.cwd(), "prisma", "dev.db");
  if (process.env.NETLIFY && fs.existsSync(bundled)) {
    const dest = "/tmp/schoolquest.db";
    if (!fs.existsSync(dest)) fs.copyFileSync(bundled, dest);
    return `file:${dest}`;
  }
  return `file:${bundled}`;
}

export const db = globalThis.prismaClient || new PrismaClient({ datasources: { db: { url: databaseUrl() } } });

if (process.env.NODE_ENV !== "production") globalThis.prismaClient = db;

