import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { Placeholder, Section, SectionHeader } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoMark } from "@/components/brand/Logo";

export const metadata = pageMetadata({
  title: "About MedBridge — Bridging the Distance to Care",
  description:
    "Healthcare is sophisticated, but moving a patient across distance is fragmented. MedBridge exists to connect the pieces — from bedside to the right hospital.",
  path: "/about",
});

const fragments = [
  "Doctors have to coordinate.",
  "Families have to call multiple companies.",
  "Hospitals have to arrange beds.",
  "Aircraft operators need medical information.",
  "Ground ambulances need synchronisation.",
];

const values = [
  { t: "Calm in a crisis", d: "We lower the temperature. Clear, unhurried communication — especially at 3 a.m." },
  { t: "Clinicians decide", d: "We coordinate; doctors make clinical decisions. We never blur that line." },
  { t: "Honest options", d: "We'll recommend the simpler, cheaper option when it's right — and tell you when not to fly." },
  { t: "Safety over speed", d: "Weather, crew duty and operator standards are never traded for a faster departure." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950">
        <LogoMark tone="inverse" className="pointer-events-none absolute -right-24 top-10 hidden h-[520px] w-[520px] opacity-[0.04] lg:block" />
        <div className="container-page relative pb-20 pt-8 md:pb-28 md:pt-10">
          <Breadcrumbs items={[{ name: "About", path: "/about" }]} tone="dark" />
          <p className="eyebrow mt-12 text-aqua-300">About MedBridge</p>
          <h1 className="display mt-4 max-w-4xl text-[40px] text-white sm:text-[56px] lg:text-[72px]">
            Healthcare is increasingly sophisticated.
            <span className="block text-navy-400">Moving a patient still isn&apos;t.</span>
          </h1>
        </div>
      </section>

      <Section tone="white" labelledBy="story">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <h2 id="story" className="display text-[30px] md:text-[40px]">
            When a patient needs to move hundreds or thousands of kilometres, the healthcare system becomes fragmented.
          </h2>
          <div>
            <ul className="space-y-0 divide-y divide-mist-200 border-y border-mist-200">
              {fragments.map((f, i) => (
                <li key={f} className="flex items-baseline gap-5 py-5 text-[20px] font-medium tracking-tight text-navy-900 md:text-[22px]">
                  <span className="font-mono text-[12px] text-ink-subtle">0{i + 1}</span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[20px] leading-relaxed text-ink-muted md:text-[22px]">
              <strong className="font-semibold text-navy-900">MedBridge exists to connect these pieces.</strong> We build
              the bridge between where the patient is and where the care needs to be.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="model">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeader
            id="model"
            eyebrow="Our model"
            title="We own the coordination, not the aircraft."
            intro="MedBridge is an asset-light medical transfer company. We don't own aircraft or ambulances — we own the clinical coordination, the relationships and the technology that connect them. That makes us operator-neutral: our only incentive is the right transfer for the patient."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <li key={v.t} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-mist-200">
                <h3 className="text-[18px] font-semibold tracking-tight">{v.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" labelledBy="team">
        <SectionHeader id="team" eyebrow="Leadership & medical governance" title="The people behind the desk." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Founder & CEO", "Medical Director", "Head of Aviation & Operations"].map((r) => (
            <div key={r} className="rounded-[var(--radius-card)] border border-dashed border-mist-300 p-6">
              <div className="h-14 w-14 rounded-full bg-mist-100" aria-hidden="true" />
              <p className="mt-5 text-[17px] font-semibold">{r}</p>
              <Placeholder className="mt-3">Add verified bio</Placeholder>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[14.5px] text-ink-subtle">
          Registered entity: {site.legalName}. Registrations and accreditations will be listed here once verified.
        </p>
      </Section>

      <CtaBand placement="about_final" />
    </>
  );
}
