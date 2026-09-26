import Link from "next/link";
import { ArrowRight, Check, CircleHelp } from "lucide-react";
import { modalities } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/ContactActions";
import { Faq } from "@/components/ui/Faq";
import { TrustSection } from "@/components/sections/TrustSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { BedToBedStrip } from "@/components/sections/BedToBedStrip";

export const metadata = pageMetadata({
  title: "Air Ambulance Services in India — Fixed-wing, ICU & Helicopter",
  description:
    "MedBridge coordinates air ambulance transfers across India and internationally: fixed-wing, helicopter, ICU air ambulance, airline stretcher and commercial medical escort — bed to bed, 24/7.",
  path: "/air-ambulance",
});

const faqs = [
  {
    q: "Who decides whether a patient needs an air ambulance?",
    a: "The treating doctor, the receiving doctor and the aeromedical team decide, based on the patient's condition. MedBridge coordinates that conversation and then arranges the transport they agree on.",
  },
  {
    q: "Does MedBridge own aircraft?",
    a: "No. MedBridge is operator-neutral: we coordinate with qualified air ambulance operators and medical teams, and select the aircraft and team that fit the patient's clinical needs and route.",
  },
  {
    q: "Can a family member travel with the patient?",
    a: "Often, yes — depending on the aircraft, the patient's condition and space for the medical team. We confirm this when planning the transfer.",
  },
  {
    q: "How quickly can an air ambulance be arranged?",
    a: "It depends on the patient's condition, aircraft positioning, airport and weather conditions, and the receiving hospital. Your coordinator will give you an honest timeline after assessing the case — we don't promise times before we know the facts.",
  },
  {
    q: "Is an air ambulance always the best option?",
    a: "No. For stable patients, a commercial flight with a medical escort or an airline stretcher may be appropriate and far less expensive. For shorter distances, a road ambulance may be quicker overall. We will tell you when a simpler option is the better one.",
  },
];

export default function AirAmbulancePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Air Ambulance", path: "/air-ambulance" }]}
        eyebrow="MedBridge Aviation"
        title="Air Ambulance"
        subtitle="Critical care without borders."
        intro="MedBridge coordinates medically appropriate air transportation with qualified operators and medical teams — matched to the patient's condition, the route and the receiving hospital. Always bed to bed."
        actions={
          <>
            <ButtonLink href="/request-transfer?transport=air" size="lg" data-placement="air_hero">
              Request air ambulance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <CallButton placement="air_hero" />
          </>
        }
        aside={
          <div className="rounded-[var(--radius-panel)] bg-mist-50 p-7 ring-1 ring-mist-200 md:p-9">
            <CircleHelp className="h-6 w-6 text-aqua-700" aria-hidden="true" />
            <h2 className="mt-5 text-[22px] font-semibold tracking-tight">Not sure which option is right?</h2>
            <p className="mt-2 text-[15.5px] leading-relaxed text-ink-muted">
              Answer a few simple questions and we&apos;ll explain what your transfer coordinator will assess. It&apos;s
              guidance for the conversation — not a medical decision.
            </p>
            <ButtonLink href="/which-air-ambulance" variant="secondary" className="mt-6">
              Which air ambulance do I need?
            </ButtonLink>
          </div>
        }
      />

      <Section tone="mist" labelledBy="options">
        <SectionHeader
          id="options"
          eyebrow="Transport options"
          title="Six ways to move a patient by air."
          intro="Each option is considered on clinical need. The final choice is made with the treating and receiving doctors."
        />
        <div className="mt-12 space-y-4">
          {modalities.map((m) => (
            <article
              key={m.slug}
              id={m.slug}
              className="scroll-mt-28 grid gap-8 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-mist-200 md:p-10 lg:grid-cols-[1.1fr_1fr_1fr]"
            >
              <div>
                <span className="rounded-md bg-navy-900 px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-aqua-300">
                  {m.code}
                </span>
                <h3 className="mt-5 text-[24px] font-semibold leading-tight tracking-tight">{m.name}</h3>
                <p className="mt-1.5 text-[15px] font-medium text-navy-500">{m.short}</p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">{m.description}</p>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">Typically considered for</h4>
                <ul className="mt-4 space-y-2.5">
                  {m.typicallyConsidered.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[15px] leading-snug text-ink-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-400" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">We coordinate</h4>
                <ul className="mt-4 space-y-2.5">
                  {m.weCoordinate.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[15px] leading-snug text-ink-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-600" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <BedToBedStrip />

      <TrustSection />

      <Section tone="white" labelledBy="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeader id="faq" eyebrow="Questions" title="Air ambulance, answered." />
            <p className="mt-6 text-[15.5px] text-ink-muted">
              More in the{" "}
              <Link href="/knowledge" className="font-medium text-clinical-700 underline underline-offset-4">
                Knowledge Hub
              </Link>{" "}
              or see{" "}
              <Link href="/air-ambulance-cost" className="font-medium text-clinical-700 underline underline-offset-4">
                what affects cost
              </Link>
              .
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand placement="air_final" />
    </>
  );
}
