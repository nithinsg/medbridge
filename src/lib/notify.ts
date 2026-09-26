import type { CaseRecord } from "./leads/schema";
import { STATUS_LABEL } from "./leads/schema";
import { site } from "@/config/site";

/**
 * New-case alerts to the coordination desk. Configure any combination:
 *  - RESEND_API_KEY + LEAD_NOTIFY_EMAIL (+ LEAD_FROM_EMAIL) → email via Resend
 *  - LEAD_WEBHOOK_URL → JSON POST (Slack incoming webhook, Zapier, Make, n8n…)
 * Failures are logged, never thrown — the family's submission must succeed.
 */
const labels: Record<string, string> = {
  transfer: "Transfer request",
  callback: "Call-back request",
  doctor_call: "Doctor-to-doctor call request",
  partner: "Partnership enquiry",
};

export function summarise(c: CaseRecord) {
  const lines = [
    `${labels[c.kind] ?? c.kind} — ${c.caseId}`,
    `Urgency: ${c.urgency ?? "—"} | Role: ${c.role}`,
    `Name: ${c.name} | Phone: ${c.phone}${c.whatsapp ? ` | WhatsApp: ${c.whatsapp}` : ""}${c.email ? ` | Email: ${c.email}` : ""}`,
    c.organisation ? `Organisation: ${c.organisation}` : "",
    c.originScope || c.originLocation ? `From: ${c.originScope ?? ""} ${c.originLocation ?? ""}`.trim() : "",
    c.destinationMode ? `To: ${c.destinationMode === "unknown" ? "Not yet known" : c.destination ?? ""}` : "",
    c.condition ? `Condition: ${c.condition}${c.conditionNote ? ` — ${c.conditionNote}` : ""}` : "",
    c.transport ? `Transport requested: ${c.transport}` : "",
    c.message ? `Message: ${c.message}` : "",
    `Status: ${STATUS_LABEL[c.status]} | Source: ${c.source?.page ?? "—"}`,
  ];
  return lines.filter(Boolean).join("\n");
}

async function withTimeout<T>(p: Promise<T>, ms = 5000) {
  return Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
}

export async function notifyNewCase(c: CaseRecord) {
  const text = summarise(c);
  const jobs: Promise<unknown>[] = [];

  if (process.env.LEAD_WEBHOOK_URL) {
    jobs.push(
      withTimeout(
        fetch(process.env.LEAD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: `🟢 ${text}`, case: c }),
        }),
      ),
    );
  }

  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
    const urgent = c.urgency === "immediately" || c.urgency === "within_6h";
    jobs.push(
      withTimeout(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: process.env.LEAD_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
            to: process.env.LEAD_NOTIFY_EMAIL.split(",").map((s) => s.trim()),
            subject: `${urgent ? "[URGENT] " : ""}${labels[c.kind] ?? "New case"} ${c.caseId}`,
            text,
          }),
        }),
      ),
    );
  }

  const results = await Promise.allSettled(jobs);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[notify] delivery failed", r.reason);
  });
  if (jobs.length === 0) console.warn(`[notify] No notification channel configured. New case ${c.caseId}:\n${text}`);
}
