import { ArrowRight, BedDouble, Building2, FileText, Globe2, HeartPulse, Plane, Siren, Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/ContactActions";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata = pageMetadata({
  title: "For Hospitals — Hospital Transfer Network",
  description:
    "MedBridge partners with hospitals for ICU-to-ICU, inter-hospital and international patient transfers: air and ground ambulance coordination, receiving hospital coordination, documentation and medical escort.",
  path: "/for-hospitals",
});

const services = [
  { icon: HeartPulse, t: "ICU transfers", d: "Critical-care transfers with intensivist-to-intensivist handover." },
  { icon: Building2, t: "Inter-hospital transfers", d: "Step-up and step-down transfers between facilities." },
  { icon: Globe2, t: "International patient transfers", d: "Inbound and outbound, with documentation and liaison." },
  { icon: Plane, t: "Air ambulance coordination", d: "Operator selection, aircraft configuration and timing." },
  { icon: Siren, t: "Ground ambulance coordination", d: "The right level of care, synchronised with the flight." },
  { icon: BedDouble, t: "Receiving hospital coordination", d: "Specialist acceptance and bed confirmation." },
  { icon: FileText, t: "Transfer documentation", d: "Handover packs that travel with the patient." },
  { icon: Users, t: "Medical escort", d: "Doctor or nurse escort on commercial flights." },
];

const teams = ["ICU & critical care", "Emergency department", "International patient desk", "Transfer / bed management desk", "TPA & insurance desk"];

const partnership = [
  { t: "Introduction", d: "We learn how your transfers work today: volumes, pain points, contacts." },
  { t: "Transfer protocol", d: "Agreed escalation paths, handover templates and named contacts on both sides." },
  { t: "Dedicated desk access", d: "A direct line into the MedBridge transfer desk for your teams." },
  { t: "Review", d: "Regular case reviews and reporting as the partnership grows." },
];

export default function ForHospitalsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "For Hospitals", path: "/for-hospitals" }]}
        eyebrow="For hospitals"
        title="Hospital Transfer Network"
        subtitle="A transfer desk for your transfer desk."
        intro="Moving patients in and out is complex, time-critical work. MedBridge gives your teams one partner that coordinates the whole journey — clinically, logistically and on paper."
        actions={
          <>
            <ButtonLink href="#partner" size="lg" data-placement="hospital_hero">
              Partner with MedBridge
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <CallButton placement="hospital_hero" label="Live case? Call 24/7" />
          </>
        }
      />

      <Section tone="mist" labelledBy="services">
        <SectionHeader id="services" eyebrow="What we coordinate" title="Every kind of transfer your hospital handles." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.t} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-mist-200">
              <s.icon className="h-6 w-6 text-aqua-600" aria-hidden="true" />
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">{s.d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="partnership">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader id="partnership" eyebrow="Partnership" title="Built around your teams." />
            <p className="mt-6 text-[15.5px] text-ink-muted">Designed for:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {teams.map((t) => (
                <li key={t} className="rounded-full bg-mist-100 px-3.5 py-1.5 text-[14px] text-navy-800">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {partnership.map((p, i) => (
                <li key={p.t} className="rounded-[var(--radius-card)] p-6 ring-1 ring-mist-200">
                  <span className="font-mono text-[12px] text-aqua-700">0{i + 1}</span>
                  <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{p.t}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">{p.d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] bg-mist-50 p-5 text-[14.5px] text-ink-muted ring-1 ring-mist-200">
              Service levels and reporting for partners:
              <Placeholder>SLA terms to be defined</Placeholder>
            </div>
          </div>
        </div>
      </Section>

      <section id="partner" aria-labelledby="partner-h" className="scroll-mt-24 bg-mist-100 py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Partner with MedBridge</p>
            <h2 id="partner-h" className="display mt-3 text-[34px] md:text-[44px]">
              Let&apos;s talk about your transfers.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-ink-muted">
              Tell us a little about your hospital and your team. For a live patient transfer, please call the 24/7
              desk instead.
            </p>
          </div>
          <div className="rounded-[var(--radius-panel)] bg-white p-6 ring-1 ring-mist-200 md:p-9">
            <EnquiryForm
              kind="partner"
              role="hospital"
              submitLabel="Send partnership enquiry"
              organisationLabel="Hospital name & city"
              messageLabel="How can we help?"
              messagePlaceholder="e.g. typical transfer volumes, departments involved, current challenges"
              audience="hospital"
            />
          </div>
        </div>
      </section>
    </>
  );
}
