import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { getStore } from "@/lib/leads/store";
import { CASE_STATUSES, STATUS_LABEL, type CaseRecord, type CaseStatus } from "@/lib/leads/schema";
import { cn } from "@/lib/cn";
import { formatINR } from "@/content/pricing";

const KIND: Record<CaseRecord["kind"], string> = {
  transfer: "Transfer",
  callback: "Call-back",
  doctor_call: "Doctor call",
  partner: "Partner",
};

const statusTone: Record<CaseStatus, string> = {
  new: "bg-coral-50 text-coral-600",
  assessing: "bg-warning-50 text-warning-700",
  quoted: "bg-clinical-50 text-clinical-700",
  confirmed: "bg-aqua-50 text-aqua-700",
  in_transit: "bg-aqua-100 text-aqua-700",
  completed: "bg-success-50 text-success-600",
  closed: "bg-mist-100 text-ink-muted",
};

function sourceOf(c: CaseRecord) {
  if (c.source?.utm_source) return c.source.utm_source;
  if (c.source?.referrer) {
    try {
      return new URL(c.source.referrer).hostname.replace(/^www\./, "");
    } catch {
      return "referral";
    }
  }
  return "direct";
}

export default async function AdminDashboard({ searchParams }: PageProps<"/admin">) {
  const sp = await searchParams;
  const filter = typeof sp.status === "string" && (CASE_STATUSES as readonly string[]).includes(sp.status) ? (sp.status as CaseStatus) : null;
  const store = getStore();
  let cases: CaseRecord[] = [];
  let error: string | null = null;
  try {
    cases = await store.list();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load cases";
  }

  const count = (s: CaseStatus) => cases.filter((c) => c.status === s).length;
  const revenue = cases.reduce((sum, c) => sum + (c.revenue ?? 0), 0);
  const quoted = cases.reduce((sum, c) => sum + (c.quoteValue ?? 0), 0);
  const sources = Object.entries(
    cases.reduce<Record<string, number>>((acc, c) => {
      const s = sourceOf(c);
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const doctors = cases.filter((c) => c.role === "doctor");
  const list = filter ? cases.filter((c) => c.status === filter) : cases;

  const kpis = [
    { label: "Active transfers", value: count("confirmed") + count("in_transit"), href: "?status=in_transit" },
    { label: "New requests", value: count("new"), href: "?status=new", urgent: count("new") > 0 },
    { label: "Pending assessment", value: count("assessing"), href: "?status=assessing" },
    { label: "Quotes", value: count("quoted"), href: "?status=quoted" },
    { label: "Confirmed", value: count("confirmed"), href: "?status=confirmed" },
    { label: "Completed", value: count("completed"), href: "?status=completed" },
    { label: "International", value: cases.filter((c) => c.originScope === "international").length },
    { label: "Revenue (recorded)", value: revenue ? formatINR(revenue) : "₹0", sub: quoted ? `Quoted ${formatINR(quoted)}` : undefined },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight">Cases</h1>
          <p className="mt-1 text-[14px] text-ink-subtle">Store: {store.name}</p>
        </div>
      </div>

      {!store.persistent ? (
        <div className="mt-6 flex gap-3 rounded-xl bg-warning-50 p-4 text-[14.5px] text-warning-700">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            <strong>Storage is not durable.</strong> Cases are held in memory and will be lost on redeploy. Connect
            Supabase (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY) and configure email/webhook alerts before launch.
          </p>
        </div>
      ) : null}
      {error ? <p className="mt-6 rounded-xl bg-coral-50 p-4 text-[14.5px] text-coral-600">{error}</p> : null}

      <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((k) => {
          const inner = (
            <>
              <dt className="text-[13px] text-ink-subtle">{k.label}</dt>
              <dd className={cn("mt-1 text-[28px] font-semibold tabular-nums", k.urgent && "text-coral-600")}>{k.value}</dd>
              {k.sub ? <dd className="text-[12.5px] text-ink-subtle">{k.sub}</dd> : null}
            </>
          );
          return k.href ? (
            <Link key={k.label} href={k.href} className="rounded-2xl bg-white p-5 ring-1 ring-mist-200 hover:ring-navy-300">
              {inner}
            </Link>
          ) : (
            <div key={k.label} className="rounded-2xl bg-white p-5 ring-1 ring-mist-200">
              {inner}
            </div>
          );
        })}
      </dl>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-mist-200">
          <h2 className="text-[15px] font-semibold">Lead sources</h2>
          <ul className="mt-3 space-y-1.5 text-[14px]">
            {sources.length ? (
              sources.map(([s, n]) => (
                <li key={s} className="flex justify-between">
                  <span className="text-ink-muted">{s}</span>
                  <span className="tabular-nums">{n}</span>
                </li>
              ))
            ) : (
              <li className="text-ink-subtle">No data yet</li>
            )}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-mist-200">
          <h2 className="text-[15px] font-semibold">Referral doctors ({doctors.length})</h2>
          <ul className="mt-3 space-y-1.5 text-[14px]">
            {doctors.length ? (
              doctors.slice(0, 8).map((d) => (
                <li key={d.caseId} className="flex justify-between gap-4">
                  <span className="truncate text-ink-muted">
                    {d.name}
                    {d.organisation ? ` · ${d.organisation}` : ""}
                  </span>
                  <span className="font-mono text-[12px]">{d.caseId}</span>
                </li>
              ))
            ) : (
              <li className="text-ink-subtle">No doctor referrals yet</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/admin" className={cn("rounded-full px-3.5 py-1.5 text-[13.5px] ring-1", !filter ? "bg-navy-900 text-white ring-navy-900" : "bg-white ring-mist-300")}>
          All ({cases.length})
        </Link>
        {CASE_STATUSES.map((s) => (
          <Link key={s} href={`?status=${s}`} className={cn("rounded-full px-3.5 py-1.5 text-[13.5px] ring-1", filter === s ? "bg-navy-900 text-white ring-navy-900" : "bg-white ring-mist-300")}>
            {STATUS_LABEL[s]} ({count(s)})
          </Link>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-mist-200">
        <table className="w-full min-w-[860px] text-left text-[14px]">
          <thead className="border-b border-mist-200 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-subtle">
            <tr>
              <th className="px-4 py-3 font-normal">Case ID</th>
              <th className="px-4 py-3 font-normal">Received</th>
              <th className="px-4 py-3 font-normal">Type</th>
              <th className="px-4 py-3 font-normal">Contact</th>
              <th className="px-4 py-3 font-normal">Route</th>
              <th className="px-4 py-3 font-normal">Urgency</th>
              <th className="px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist-100">
            {list.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-subtle">
                  No cases.
                </td>
              </tr>
            ) : (
              list.map((c) => (
                <tr key={c.caseId} className="hover:bg-mist-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/cases/${c.caseId}`} className="font-mono font-medium text-clinical-700 underline-offset-2 hover:underline">
                      {c.caseId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {new Date(c.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-3">
                    {KIND[c.kind]} <span className="text-ink-subtle">· {c.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    {c.name}
                    <br />
                    <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="text-ink-muted">
                      {c.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {c.originScope === "international" ? "🌐 " : ""}
                    {c.originLocation ?? c.originScope ?? "—"} → {c.destinationMode === "unknown" ? "TBD" : (c.destination ?? "—")}
                  </td>
                  <td className="px-4 py-3">{c.urgency ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-[12px] font-medium", statusTone[c.status])}>{STATUS_LABEL[c.status]}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
