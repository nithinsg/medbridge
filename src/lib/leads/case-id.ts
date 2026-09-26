/** Case IDs: MB-YYMMDD-NNN, dated in India Standard Time. */
export function istDateKey(d = new Date()) {
  const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
  const yy = String(ist.getUTCFullYear()).slice(2);
  const mm = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(ist.getUTCDate()).padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

export function formatCaseId(dateKey: string, seq: number) {
  return `MB-${dateKey}-${String(seq).padStart(3, "0")}`;
}

export const CASE_ID_PATTERN = /^MB-\d{6}-\d{3,}$/;
