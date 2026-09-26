import { ArrowRight, FileText, Hospital, PhoneCall, Stethoscope, Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/ContactActions";
import { JourneyExplorer } from "@/components/sections/JourneyExplorer";
import { BedToBedStrip } from "@/components/sections/BedToBedStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/ui/Faq";

export const metadata = pageMetadata({
  title: "Medical Transfer Coordination — Bedside to Hospital",
  description:
    "More than an air ambulance: MedBridge coordinates the whole medical transfer — assessment, doctor-to-doctor handover, receiving hospital and ICU bed, ground and air transport, and admission.",
  path: "/medical-transfer",
});

const coordination = [
  { icon: Stethoscope, title: "Case assessment", body: "The clinical picture, gathered from the treating team." },
  { icon: PhoneCall, title: "Doctor-to-doctor coordination", body: "Treating, receiving and aeromedical doctors aligned." },
  { icon: Hospital, title: "Hospital & ICU bed coordination", body: "Receiving specialist and bed confirmed before departure." },
  { icon: Users, title: "Receiving specialist", body: "The right specialty for the patient's condition." },
  { icon: FileText, title: "Medical documentation", body: "Summaries, reports and handover notes travel with the patient." },
  { icon: ArrowRight, title: "Transfer preparation", body: "Discharge, equipment, timings and family briefing." },
];

const without = [
  "Families call several operators and ambulance services in the middle of the night",
  "Doctors spend hours finding a receiving specialist and a bed",
  "Aircraft operators receive incomplete medical information",
  "Ground ambulances aren't synchronised with the flight",
  "Nobody owns the whole journey",
];

const faqs = [
  {
    q: "What does a medical transfer coordinator actually do?",
    a: "A coordinator takes responsibility for the whole journey: gathering clinical information, arranging the doctor-to-doctor conversations, lining up the receiving hospital and bed, selecting and synchronising ground and air transport, handling documents, and keeping the family and referring doctor informed.",
  },
  {
    q: "Do you make clinical decisions?",
    a: "No. Clinical decisions — including whether and how a patient can travel — are made by the treating doctor, the receiving doctor and the aeromedical team. MedBridge coordinates and executes the plan they agree.",
  },
  {
    q: "Can you help if we don't know which hospital to go to?",
    a: "Yes. Tell us the patient's condition and preferred city, and we'll help identify receiving hospitals with the right specialty and an available bed, then arrange the clinical handover.",
  },
];

export default function MedicalTransferPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Medical Transfer", path: "/medical-transfer" }]}
        eyebrow="MedBridge Medical Transfer"
        title="More than an air ambulance."
        subtitle="We coordinate the journey from bedside to hospital."
        intro="When a patient needs to move hundreds or thousands of kilometres, the hardest part isn't the flight — it's connecting everyone involved. That's what we do."
        actions={
          <>
            <ButtonLink href="/request-transfer" size="lg" data-placement="transfer_hero">
              Request medical transfer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <CallButton placement="transfer_hero" />
          </>
        }
      />

      <Section tone="mist" labelledBy="journey">
        <SectionHeader
          id="journey"
          eyebrow="The journey"
          title="Six steps. One accountable team."
          intro="Select a step to see what happens, and who is involved."
        />
        <div className="mt-12">
          <JourneyExplorer />
        </div>
      </Section>

      <Section tone="white" labelledBy="coord">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader id="coord" eyebrow="The coordination layer" title="What we take off your hands." />
            <div className="mt-10 rounded-[var(--radius-card)] bg-mist-50 p-6 ring-1 ring-mist-200">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">Without coordination</h3>
              <ul className="mt-4 space-y-3">
                {without.map((w) => (
                  <li key={w} className="flex gap-3 text-[15px] leading-snug text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500/70" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {coordination.map((c) => (
              <li key={c.title} className="rounded-[var(--radius-card)] p-6 ring-1 ring-mist-200">
                <c.icon className="h-6 w-6 text-aqua-600" aria-hidden="true" />
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <BedToBedStrip />

      <Section tone="mist" labelledBy="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader id="faq" eyebrow="Questions" title="How coordination works." />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand placement="transfer_final" />
    </>
  );
}
