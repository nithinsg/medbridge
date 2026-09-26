import { ArrowRight } from "lucide-react";
import { verifiedFacts } from "@/content/trust";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { NetworkGraph } from "@/components/map/NetworkGraph";
import { RepatriationMap } from "@/components/map/RepatriationMap";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "The MedBridge Network — Medical Mobility Infrastructure",
  description:
    "Doctors, hospitals, ground ambulances, air ambulance operators, medical teams, international partners and insurers — connected by one coordination layer.",
  path: "/network",
});

const join = [
  { t: "Air ambulance operators", d: "Operators meeting the MedBridge operator standard, domestic and international." },
  { t: "Hospitals", d: "Sending and receiving hospitals, ICU and international patient desks." },
  { t: "Physicians", d: "Referring doctors, intensivists and aeromedical clinicians." },
  { t: "Ground ambulance providers", d: "Critical-care-capable providers in cities and regions across India." },
  { t: "Insurers & assistance", d: "Insurers, TPAs and international assistance companies." },
];

export default function NetworkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Network", path: "/network" }]}
        eyebrow="MedBridge Network"
        title="The MedBridge Network"
        subtitle="Medical mobility infrastructure."
        intro="A patient transfer involves a dozen independent parties who have never worked together before. MedBridge is the layer that connects them — so every transfer runs as one plan."
      />

      <Section tone="mist" labelledBy="graph">
        <h2 id="graph" className="sr-only">
          Network participants
        </h2>
        <NetworkGraph />
      </Section>

      <Section tone="white" labelledBy="reach">
        <SectionHeader
          id="reach"
          eyebrow="Reach"
          title="Domestic and international."
          intro="Transfers within India and repatriation from abroad, coordinated through the same desk."
        />
        <div className="mt-10">
          <RepatriationMap compact />
        </div>
        {!site.launchReady ? (
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[14.5px] text-ink-muted">
            Network figures ({verifiedFacts.map((f) => f.label.toLowerCase()).join(", ")}):
            <Placeholder>Publish only once verified</Placeholder>
          </div>
        ) : null}
      </Section>

      <Section tone="mist" labelledBy="join">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader id="join" eyebrow="Join the network" title="Partner with MedBridge." intro="We're building a network of partners who share our standards for safety, clinical quality and transparency." />
            <ButtonLink href="/contact#partners" className="mt-8" size="lg">
              Become a partner
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="divide-y divide-mist-200 rounded-[var(--radius-card)] bg-white px-6 ring-1 ring-mist-200">
            {join.map((j) => (
              <li key={j.t} className="py-5">
                <h3 className="text-[17px] font-semibold tracking-tight">{j.t}</h3>
                <p className="mt-1 text-[15px] text-ink-muted">{j.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand placement="network_final" />
    </>
  );
}
