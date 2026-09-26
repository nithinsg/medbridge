import { promises as fs } from "node:fs";
import path from "node:path";
import type { CaseRecord } from "./schema";
import type { LeadStore } from "./store";

// On Vercel the filesystem is read-only except /tmp, and instances are ephemeral.
const onServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const FILE = onServerless ? "/tmp/medbridge-cases.json" : path.join(process.cwd(), ".data", "cases.json");

type Db = { cases: CaseRecord[]; counters: Record<string, number> };

const g = globalThis as unknown as { __mbDb?: Db };

async function load(): Promise<Db> {
  if (g.__mbDb) return g.__mbDb;
  try {
    g.__mbDb = JSON.parse(await fs.readFile(FILE, "utf8")) as Db;
  } catch {
    g.__mbDb = { cases: [], counters: {} };
  }
  return g.__mbDb;
}

async function save(db: Db) {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(db, null, 2));
  } catch {
    /* memory only */
  }
}

export const localStore: LeadStore = {
  name: onServerless ? "In-memory (not durable)" : "Local file (.data/cases.json)",
  persistent: !onServerless,
  async nextSequence(dateKey) {
    const db = await load();
    // On serverless, seed from time-of-day so separate instances rarely collide.
    const seed = onServerless && !db.counters[dateKey] ? Math.floor((Date.now() / 1000) % 600) : 0;
    db.counters[dateKey] = (db.counters[dateKey] ?? seed) + 1;
    await save(db);
    return db.counters[dateKey];
  },
  async create(record) {
    const db = await load();
    db.cases.unshift(record);
    await save(db);
  },
  async list(limit = 500) {
    return (await load()).cases.slice(0, limit);
  },
  async get(caseId) {
    return (await load()).cases.find((c) => c.caseId === caseId) ?? null;
  },
  async update(caseId, patch) {
    const db = await load();
    const i = db.cases.findIndex((c) => c.caseId === caseId);
    if (i < 0) return null;
    db.cases[i] = { ...db.cases[i], ...patch, updatedAt: new Date().toISOString() };
    await save(db);
    return db.cases[i];
  },
};
