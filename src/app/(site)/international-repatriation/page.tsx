import Link from "next/link";
import { ArrowRight, FileText, Globe2, Plane, ShieldCheck } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton, WhatsAppButton } from "@/components/ui/ContactActions";
import { RepatriationMap } from "@/components/map/RepatriationMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { landings } from "@/content/landings";

export const metadata = pageMetadata({
  title: "International Medical Repatriation to India",
  description:
    "Medical repatriation to India from Singapore, Dubai, Thailand, Malaysia, the Middle East, Europe, the USA and beyond — air ambulance or medical escort, with the receiving hospital in India confirmed before departure.",
  path: "/international-repatriation",
});

const steps = [
  { t: "Current hospital", d: "The treating team abroad shares the medical report and current condition." },
  { t: "Medical assessment", d: "An aeromedical doctor reviews whether and how the patient can travel." },
  { t: "Transfer planning", d: "Air ambulance, airline stretcher or commercial escort — chosen on clinical need. Permits and documents in parallel." },
  { t: "Flight", d: "The patient flies with the agreed medical team and equipment." },
  { t: "India", d: "Arrival, immigration and customs handled with the ground team." },
  { t: "Ground ambulance", d: "An ambulance matched to the patient's needs is waiting on arrival." },
  { t: "Receiving hospital", d: "Admission with a bedside handover to the team that has already accepted the patient." },
];

const regions = [
  "Singapore",
  "Dubai & UAE",
  "Thailand",
  "Malaysia",
  "Saudi Arabia, Qatar & the Gulf",
  "Southeast Asia",
  "United Kingdom & Europe",
  "USA & Canada",
  "Africa",
  "Australia",
];

const faqs = [
  {
    q: "Can travel insurance cover medical repatriation?",
    a: "Many travel insurance policies include repatriation benefits, usually managed through an assistance company that must approve the plan. Contact your insurer early. MedBridge can work alongside your insurer or assistance company.",
  },
  {
    q: "What documents are needed?",
    a: "Usually the patient's passport, a recent medical report from the treating hospital, insurance details if applicable, and the passport of any accompanying family member. Call us with what you have — planning can start straight away.",
  },
  {
    q: "Is an air ambulance always required for repatriation?",
    a: "No. Many patients can travel on a scheduled flight with a medical escort, or on an airline stretcher, if the treating doctor and airline agree. This is often significantly less expensive.",
  },
  {
    q: "Do you also transfer patients from India to other countries?",
    a: "Yes. MedBridge coordinates outbound international transfers as well, subject to the destination country's requirements and the receiving hospital's acceptance.",
  },
];

export default function InternationalPage() {
  const routePages = landings.filter((l) => l.kind === "corridor");
  return (
    <>
      <PageHero
        crumbs={[{ name: "International Repatriation", path: "/international-repatriation" }]}
        eyebrow="MedBridge International"
        title="Bringing you home safely."
        intro="When someone you love falls ill or is injured abroad, we coordinate the whole journey home — from the hospital bed overseas to the receiving hospital in India."
        actions={
          <>
            <ButtonLink href="/request-transfer?from=international" size="lg" data-placement="intl_hero">
              Request repatriation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <WhatsAppButton placement="intl_hero" audience="international" />
          </>
        }
      />

      <Section tone="white" labelledBy="map" className="pt-0 md:pt-0 lg:pt-0">
        <h2 id="map" className="sr-only">
          Repatriation routes
        </h2>
        <RepatriationMap />
      </Section>

      <Section tone="mist" labelledBy="steps">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              id="steps"
              eyebrow="How repatriation works"
              title="From a hospital abroad to a hospital at home."
              intro="Each step is confirmed before the next begins, so the patient is never in transit without a destination."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton placement="intl_steps" />
            </div>
          </div>
          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-mist-300" />
            {steps.map((s, i) => (
              <li key={s.t} className="relative flex gap-5 pb-8 last:pb-0">
                <span
                  className={
                    i === 4
                      ? "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-aqua-500 font-mono text-[12px] text-navy-950"
                      : "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[12px] text-ink-muted ring-1 ring-mist-300"
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-[19px] font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-1 text-[15.5px] leading-relaxed text-ink-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="white" labelledBy="covers">
        <SectionHeader id="covers" eyebrow="Where from" title="Repatriation from around the world." />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {regions.map((r) => (
            <li key={r} className="rounded-full bg-mist-100 px-4 py-2 text-[15px] text-navy-800">
              {r}
            </li>
          ))}
          <li className="rounded-full px-4 py-2 text-[15px] text-ink-subtle ring-1 ring-mist-300">and other destinations</li>
        </ul>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { icon: Plane, t: "The right mode", d: "Air ambulance, airline stretcher or commercial medical escort — on clinical need, not on what's available." },
            { icon: FileText, t: "Paperwork in parallel", d: "Medical reports, fit-to-travel documentation from the treating doctor, permits and insurer liaison." },
            { icon: ShieldCheck, t: "India side confirmed", d: "Receiving doctor, bed and ground ambulance confirmed before the patient leaves." },
          ].map((c) => (
            <div key={c.t} className="rounded-[var(--radius-card)] p-6 ring-1 ring-mist-200">
              <c.icon className="h-6 w-6 text-aqua-600" aria-hidden="true" />
              <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{c.t}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{c.d}</p>
            </div>
          ))}
        </div>
        {routePages.length ? (
          <div className="mt-12">
            <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
              <Globe2 className="h-4 w-4" aria-hidden="true" /> Route guides
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {routePages.map((l) => (
                <li key={l.slug}>
                  <Link href={`/${l.slug}`} className="flex items-center justify-between rounded-xl bg-mist-50 px-4 py-3 text-[15px] font-medium text-navy-900 ring-1 ring-mist-200 hover:ring-navy-300">
                    {l.shortName}
                    <ArrowRight className="h-4 w-4 text-ink-subtle" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <Section tone="mist" labelledBy="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader id="faq" eyebrow="Questions" title="Repatriation, answered." />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        placement="intl_final"
        audience="international"
        title="Someone you love is in hospital abroad?"
        body="Share where they are and what the doctors have said. We'll take it from there — and tell you honestly what's possible."
        primaryHref="/request-transfer?from=international"
        primaryLabel="Request repatriation"
      />
    </>
  );
}
