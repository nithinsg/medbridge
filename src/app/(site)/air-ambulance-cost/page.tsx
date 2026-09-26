import { costFactors, costSplit } from "@/content/pricing";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder, Section, SectionHeader } from "@/components/ui/Section";
import { CostEstimator } from "@/components/tools/CostEstimator";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/ui/Faq";

export const metadata = pageMetadata({
  title: "Air Ambulance Cost in India — What Affects the Price + Estimator",
  description:
    "How much does medical evacuation cost? The factors behind air ambulance pricing in India and internationally, and an indicative estimator. Final pricing requires case assessment and operator confirmation.",
  path: "/air-ambulance-cost",
});

const faqs = [
  {
    q: "Why won't you publish a fixed price?",
    a: "Because every mission is different: aircraft positioning, flying time, medical team, equipment, airports and ground legs vary case to case. A fixed price quoted before understanding the patient is either padded or incomplete.",
  },
  {
    q: "What should a quote include?",
    a: "Aircraft and flying time, medical team and equipment, ground ambulances at both ends, airport and handling charges, taxes, and whether a family member can travel. Ask for these separately.",
  },
  {
    q: "Is there a lower-cost alternative to an air ambulance?",
    a: "For stable patients, a commercial flight with a medical escort or an airline stretcher can cost far less. Whether it's appropriate is decided by the treating doctor and the airline.",
  },
  {
    q: "Does insurance cover air ambulance costs?",
    a: "Some health and travel insurance policies cover medical evacuation, often subject to pre-approval. Check your policy and speak to your insurer or TPA early; we can share the documents they need.",
  },
];

export default function CostPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Air Ambulance", path: "/air-ambulance" }, { name: "Cost", path: "/air-ambulance-cost" }]}
        eyebrow="Cost & estimate"
        title="How much does medical evacuation cost?"
        intro="There's no honest single price for an air ambulance. Here's what drives the cost, and an indicative range for your situation — before you speak to anyone."
      />

      <Section tone="white" labelledBy="estimator" className="pt-0 md:pt-0 lg:pt-0">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <h2 id="estimator" className="text-[24px] font-semibold tracking-tight">
            Indicative estimator
          </h2>
          {!site.launchReady ? <Placeholder>Ranges to be calibrated with operator rate cards</Placeholder> : null}
        </div>
        <CostEstimator />
      </Section>

      <Section tone="mist" labelledBy="factors">
        <SectionHeader id="factors" eyebrow="What affects the price" title="Ten factors behind every quote." />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-mist-200 sm:grid-cols-2 lg:grid-cols-5">
          {costFactors.map((f, i) => (
            <li key={f.t} className="bg-white p-6">
              <span className="font-mono text-[12px] text-aqua-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{f.t}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">{f.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white" labelledBy="split">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader
            id="split"
            eyebrow="Where the money goes"
            title="A typical air transfer, broken down."
            intro="An illustrative split for a domestic fixed-wing transfer. Real quotes vary — but a transparent quote should itemise these."
          />
          <ul className="space-y-5 self-center">
            {costSplit.map((c) => (
              <li key={c.label}>
                <div className="flex items-baseline justify-between text-[15px]">
                  <span className="font-medium text-navy-900">{c.label}</span>
                  <span className="font-mono text-[13px] text-ink-subtle">~{Math.round(c.share * 100)}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist-100">
                  <div className="h-full rounded-full bg-navy-700" style={{ width: `${c.share * 100}%` }} />
                </div>
              </li>
            ))}
            <li className="pt-2 text-[13px] text-ink-subtle">Illustrative only.</li>
          </ul>
        </div>
      </Section>

      <Section tone="mist" labelledBy="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader id="faq" eyebrow="Questions" title="Cost, answered." />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        placement="cost_final"
        title="Get a real estimate for your situation."
        body="Share the basics and a coordinator will come back with options, a clear breakdown and what's included."
        primaryLabel="Get a transfer estimate"
      />
    </>
  );
}
