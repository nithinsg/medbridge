import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getStore } from "@/lib/leads/store";
import { CASE_STATUSES, STATUS_LABEL } from "@/lib/leads/schema";
import { buttonClasses } from "@/components/ui/Button";
import { inputClass } from "@/components/forms/StepUI";
import { updateCase } from "../../../actions";

const LABELS: [string, string][] = [
  ["kind", "Request type"],
  ["role", "Requester role"],
  ["name", "Name"],
  ["phone", "Phone"],
  ["whatsapp", "WhatsApp"],
  ["email", "Email"],
  ["organisation", "Organisation"],
  ["originScope", "Patient location"],
  ["originLocation", "Origin detail"],
  ["destinationMode", "Destination type"],
  ["destination", "Destination"],
  ["condition", "Condition"],
  ["conditionNote", "Condition note"],
  ["transport", "Transport requested"],
  ["urgency", "Urgency"],
  ["specialty", "Specialty"],
  ["message", "Message"],
];

export default async function CasePage({ params }: PageProps<"/admin/cases/[caseId]">) {
  const { caseId } = await params;
  const c = await getStore().get(caseId);
  if (!c) notFound();
  const rec = c as unknown as Record<string, unknown>;
  const wa = (c.whatsapp || c.phone).replace(/\D/g, "");

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1 text-[14px] text-ink-muted hover:text-navy-900">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" /> All cases
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-[28px] font-medium">{c.caseId}</h1>
          <p className="mt-1 text-[14px] text-ink-subtle">
            Received {new Date(c.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST · Consent recorded{" "}
            {new Date(c.consentAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
        </div>
        <div className="flex gap-2">
          <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className={buttonClasses("primary", "md")}>
            Call
          </a>
          <a
            href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hello ${c.name}, this is the MedBridge transfer desk regarding case ${c.caseId}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("secondary", "md")}
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <dl className="divide-y divide-mist-100 rounded-2xl bg-white px-6 ring-1 ring-mist-200">
          {LABELS.filter(([k]) => rec[k]).map(([k, label]) => (
            <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[180px_1fr]">
              <dt className="text-[13.5px] text-ink-subtle">{label}</dt>
              <dd className="whitespace-pre-wrap text-[14.5px]">{String(rec[k])}</dd>
            </div>
          ))}
          <div className="grid gap-1 py-3.5 sm:grid-cols-[180px_1fr]">
            <dt className="text-[13.5px] text-ink-subtle">Source</dt>
            <dd className="text-[14.5px]">
              {c.source?.page ?? "—"}
              {c.source?.utm_source ? ` · utm: ${c.source.utm_source}/${c.source.utm_medium ?? ""}/${c.source.utm_campaign ?? ""}` : ""}
              {c.source?.referrer ? ` · ref: ${c.source.referrer}` : ""}
            </dd>
          </div>
        </dl>

        <form action={updateCase} className="space-y-4 self-start rounded-2xl bg-white p-6 ring-1 ring-mist-200">
          <input type="hidden" name="caseId" value={c.caseId} />
          <h2 className="text-[17px] font-semibold">Update case</h2>
          <div>
            <label htmlFor="status" className="mb-1.5 block text-[14px] font-medium">
              Status
            </label>
            <select id="status" name="status" defaultValue={c.status} className={inputClass}>
              {CASE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="quoteValue" className="mb-1.5 block text-[14px] font-medium">
                Quote (₹)
              </label>
              <input id="quoteValue" name="quoteValue" inputMode="numeric" defaultValue={c.quoteValue ?? ""} className={inputClass} />
            </div>
            <div>
              <label htmlFor="revenue" className="mb-1.5 block text-[14px] font-medium">
                Revenue (₹)
              </label>
              <input id="revenue" name="revenue" inputMode="numeric" defaultValue={c.revenue ?? ""} className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="internalNotes" className="mb-1.5 block text-[14px] font-medium">
              Internal notes
            </label>
            <textarea id="internalNotes" name="internalNotes" rows={5} defaultValue={c.internalNotes ?? ""} className={`${inputClass} h-auto py-3`} />
          </div>
          <button type="submit" className={buttonClasses("primary", "md", "w-full")}>
            Save
          </button>
          <p className="text-[12.5px] text-ink-subtle">Share clinical details only through approved channels.</p>
        </form>
      </div>
    </div>
  );
}
