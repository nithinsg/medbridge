import { ArrowRight, Check, Minus } from "lucide-react";
import { transplantCategories } from "@/content/specialties";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/ContactActions";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/ui/Faq";

export const metadata = pageMetadata({
  title: "Organ & Transplant Patient Transfers",
  description:
    "Transfer coordination for transplant candidates and recipients — lung, heart, liver, kidney and paediatric — to and from transplant centres, planned in advance and activated fast.",
  path: "/transplant-transfers",
});

const weDo = [
  "Readiness planning with the transplant centre, in advance",
  "Rapid activation of air or ground transport when the call comes",
  "Aeromedical team matched to the candidate's condition",
  "Ground ambulances and airport logistics at both ends",
  "Post-transplant transfers back home or between centres",
  "Communication with the family throughout",
];

const weDont = [
  "Perform, arrange or allocate transplants or organs",
  "Make listing, eligibility or clinical decisions",
  "Replace the transplant programme's coordinators",
];

const readiness = [
  { t: "Before the call", d: "Agree a transfer plan with the transplant centre: route, modality, team and contacts. Keep documents ready." },
  { t: "Activation", d: "One call to MedBridge starts the plan already agreed — aircraft or ambulance, crew and ground legs." },
  { t: "Transfer", d: "The candidate travels with the agreed medical team; the transplant centre is updated en route." },
  { t: "Arrival", d: "Direct handover to the transplant team." },
];

const faqs = [
  {
    q: "Does MedBridge arrange organs for transplant?",
    a: "No. Organ allocation and transplantation are handled by transplant programmes and the relevant authorities. MedBridge coordinates the transport and logistics of patients to and from transplant centres.",
  },
  {
    q: "Can a transfer plan be set up before a transplant call comes?",
    a: "Yes, and we recommend it. A readiness plan agreed with the transplant centre means activation is a single call.",
  },
];

export default function TransplantPage() {
  return (
    <>
      <PageHero
        tone="dark"
        crumbs={[{ name: "Transplant Transfers", path: "/transplant-transfers" }]}
        eyebrow="Specialist transfers"
        title="Organ & Transplant Medical Transfers"
        intro="When a transplant call comes, time and preparation matter. MedBridge coordinates the transport and clinical logistics for transplant candidates and recipients. The transplant programme leads every clinical decision."
        actions={
          <>
            <ButtonLink href="/request-transfer?specialty=transplant" variant="accent" size="lg" data-placement="transplant_hero">
              Set up a readiness plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <CallButton placement="transplant_hero" variant="outline-inverse" />
          </>
        }
      />

      <Section tone="white" labelledBy="categories">
        <SectionHeader id="categories" eyebrow="Categories" title="Transfers across transplant programmes." />
        <ul className="mt-12 divide-y divide-mist-200 border-y border-mist-200">
          {transplantCategories.map((c, i) => (
            <li key={c.name} className="grid gap-2 py-6 md:grid-cols-[80px_1fr_2fr] md:items-baseline md:gap-8">
              <span className="font-mono text-[12px] text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[22px] font-semibold tracking-tight">{c.name}</h3>
              <p className="text-[15.5px] leading-relaxed text-ink-muted">{c.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" labelledBy="readiness">
        <SectionHeader id="readiness" eyebrow="Readiness" title="Prepared before the phone rings." />
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {readiness.map((r, i) => (
            <li key={r.t} className="relative rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-mist-200">
              <span className="font-mono text-[12px] text-aqua-700">0{i + 1}</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-tight">{r.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{r.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white" labelledBy="scope">
        <SectionHeader id="scope" eyebrow="Clear boundaries" title="What we coordinate — and what we don't." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-navy-950 p-7 md:p-9">
            <h3 className="text-[18px] font-semibold text-white">MedBridge coordinates</h3>
            <ul className="mt-5 space-y-3">
              {weDo.map((w) => (
                <li key={w} className="flex gap-3 text-[15.5px] text-navy-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] p-7 ring-1 ring-mist-200 md:p-9">
            <h3 className="text-[18px] font-semibold">MedBridge does not</h3>
            <ul className="mt-5 space-y-3">
              {weDont.map((w) => (
                <li key={w} className="flex gap-3 text-[15.5px] text-ink-muted">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-[26px] font-semibold tracking-tight">Questions</h2>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        placement="transplant_final"
        title="Transplant programme or family preparing for a call?"
        body="Let's agree the transfer plan now, so activation is a single call later."
        primaryLabel="Request a readiness plan"
        primaryHref="/request-transfer?specialty=transplant"
      />
    </>
  );
}
