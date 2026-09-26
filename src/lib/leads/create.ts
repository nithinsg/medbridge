import { randomUUID } from "node:crypto";
import { getStore } from "./store";
import { formatCaseId, istDateKey } from "./case-id";
import type { CaseRecord, LeadInput } from "./schema";

export async function createCase(input: LeadInput): Promise<CaseRecord> {
  const store = getStore();
  const dateKey = istDateKey();
  const seq = await store.nextSequence(dateKey);
  // Destructure out fields that must not be stored.
  const { consent: _consent, company_website: _hp, ...rest } = input;
  void _consent;
  void _hp;
  const record: CaseRecord = {
    ...rest,
    id: randomUUID(),
    caseId: formatCaseId(dateKey, seq),
    createdAt: new Date().toISOString(),
    consentAt: new Date().toISOString(),
    status: "new",
  };
  await store.create(record);
  return record;
}
