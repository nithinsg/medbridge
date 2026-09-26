import { Check, ShieldCheck } from "lucide-react";
import { clinicalBoundary, operatorStandard, trustPillars, verifiedFacts } from "@/content/trust";
import { site } from "@/config/site";
import { Placeholder, Section, SectionHeader } from "@/components/ui/Section";

/** Trust architecture — principles and process, never invented numbers. */
export function TrustSection({ showStandard = true }: { showStandard?: boolean }) {
  const facts = verifiedFacts.filter((f) => f.value);
  const showPlaceholders = facts.length === 0 && !site.launchReady;
  return (
    <Section tone="dark" labelledBy="trust">
      <SectionHeader
        id="trust"
        tone="dark"
        eyebrow="How we work"
        title="Calm, clinical coordination — at any hour."
        intro={clinicalBoundary}
      />

      <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {trustPillars.map((p) => (
          <li key={p.title} className="bg-navy-950 p-7">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua-500/10 text-aqua-300">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">{p.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-300">{p.body}</p>
          </li>
        ))}
      </ul>

      {showStandard ? (
        <div className="mt-6 grid gap-6 rounded-[var(--radius-card)] bg-white/[0.04] p-7 ring-1 ring-white/10 md:p-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <ShieldCheck className="h-7 w-7 text-aqua-300" aria-hidden="true" />
            <h3 className="mt-5 text-[24px] font-semibold leading-tight tracking-tight text-white">
              Who is flying your patient matters.
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy-300">
              Because we don&apos;t own aircraft, we can choose the operator that fits the patient — and decline the
              ones that don&apos;t. Before we recommend an operator, we check:
            </p>
            {!site.launchReady ? <Placeholder className="mt-4">Draft standard — verify before launch</Placeholder> : null}
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {operatorStandard.map((s) => (
              <li key={s} className="flex gap-3 rounded-xl bg-navy-950/60 p-4 text-[14.5px] leading-snug text-navy-300 ring-1 ring-white/5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {facts.length > 0 || showPlaceholders ? (
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 lg:grid-cols-4">
          {(facts.length ? facts : verifiedFacts).map((f) => (
            <div key={f.label} className="bg-navy-950 p-6">
              <dt className="text-[13.5px] text-navy-400">{f.label}</dt>
              <dd className="mt-2 text-[28px] font-semibold tabular-nums text-white">
                {f.value ?? <Placeholder>{f.note}</Placeholder>}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Section>
  );
}
