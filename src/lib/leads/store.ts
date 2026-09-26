import type { CaseRecord } from "./schema";
import { supabaseStore, supabaseConfigured } from "./supabase-store";
import { localStore } from "./local-store";

export interface LeadStore {
  /** Human-readable adapter name, shown in the admin. */
  name: string;
  /** False when records will not survive a restart/redeploy. */
  persistent: boolean;
  nextSequence(dateKey: string): Promise<number>;
  create(record: CaseRecord): Promise<void>;
  list(limit?: number): Promise<CaseRecord[]>;
  get(caseId: string): Promise<CaseRecord | null>;
  update(caseId: string, patch: Partial<CaseRecord>): Promise<CaseRecord | null>;
}

/**
 * Supabase/Postgres when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set
 * (production). Otherwise a local JSON file in development, or process
 * memory on serverless — which is NOT durable; the admin shows a warning and
 * every submission is still delivered by email/webhook if configured.
 */
export function getStore(): LeadStore {
  if (supabaseConfigured()) return supabaseStore;
  return localStore;
}
