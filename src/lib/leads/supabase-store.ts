import type { CaseRecord } from "./schema";
import type { LeadStore } from "./store";

/**
 * Supabase adapter using the PostgREST HTTP API directly (no SDK dependency).
 * Schema: supabase/migrations/0001_cases.sql. Uses the service-role key —
 * server-only; never expose it to the browser.
 */
const url = () => process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = () => Boolean(url() && key());

async function rest<T>(pathAndQuery: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${url()}/rest/v1/${pathAndQuery}`, {
    ...init,
    headers: {
      apikey: key()!,
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const body = await res.text();
  return (body ? JSON.parse(body) : null) as T;
}

type Row = {
  id: string;
  case_id: string;
  created_at: string;
  updated_at: string | null;
  status: CaseRecord["status"];
  kind: CaseRecord["kind"];
  role: CaseRecord["role"];
  urgency: string | null;
  transport: string | null;
  origin_scope: string | null;
  quote_value: number | null;
  revenue: number | null;
  internal_notes: string | null;
  data: CaseRecord;
};

const toRow = (r: CaseRecord): Omit<Row, "updated_at"> => ({
  id: r.id,
  case_id: r.caseId,
  created_at: r.createdAt,
  status: r.status,
  kind: r.kind,
  role: r.role,
  urgency: r.urgency ?? null,
  transport: r.transport ?? null,
  origin_scope: r.originScope ?? null,
  quote_value: r.quoteValue ?? null,
  revenue: r.revenue ?? null,
  internal_notes: r.internalNotes ?? null,
  data: r,
});

const fromRow = (row: Row): CaseRecord => ({
  ...row.data,
  status: row.status,
  quoteValue: row.quote_value,
  revenue: row.revenue,
  internalNotes: row.internal_notes,
  updatedAt: row.updated_at ?? undefined,
});

export const supabaseStore: LeadStore = {
  name: "Supabase (Postgres)",
  persistent: true,
  async nextSequence(dateKey) {
    return rest<number>("rpc/next_case_sequence", { method: "POST", body: JSON.stringify({ p_date_key: dateKey }) });
  },
  async create(record) {
    await rest("cases", { method: "POST", body: JSON.stringify(toRow(record)), headers: { Prefer: "return=minimal" } });
  },
  async list(limit = 500) {
    const rows = await rest<Row[]>(`cases?select=*&order=created_at.desc&limit=${limit}`);
    return rows.map(fromRow);
  },
  async get(caseId) {
    const rows = await rest<Row[]>(`cases?select=*&case_id=eq.${encodeURIComponent(caseId)}&limit=1`);
    return rows[0] ? fromRow(rows[0]) : null;
  },
  async update(caseId, patch) {
    const body: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (patch.status) body.status = patch.status;
    if ("quoteValue" in patch) body.quote_value = patch.quoteValue;
    if ("revenue" in patch) body.revenue = patch.revenue;
    if ("internalNotes" in patch) body.internal_notes = patch.internalNotes;
    const rows = await rest<Row[]>(`cases?case_id=eq.${encodeURIComponent(caseId)}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { Prefer: "return=representation" },
    });
    return rows[0] ? fromRow(rows[0]) : null;
  },
};
