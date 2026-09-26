import { ClipboardList, Phone, Scale, ShieldCheck, Stethoscope } from "lucide-react";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { telHref } from "@/lib/links";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/ContactActions";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Faq } from "@/components/ui/Faq";

export const metadata = pageMetadata({
  title: "For Referring Doctors — Patient Transfer Coordination",
  description:
    "Doctor-to-doctor transfer coordination for referring physicians: urgent transfers, air ambulance sourcing, ICU bed and receiving specialist coordination, international repatriation and documentation.",
  path: "/for-doctors",
});

const services = [
  "Urgent transfer coordination",
  "Air ambulance sourcing matched to your clinical brief",
  "Hospital-to-hospital transfer",
  "Receiving specialist coordination",
  "ICU bed coordination",
  "International repatriation",
  "Medical documentation and handover packs",
];

const process = [
  { t: "You call, WhatsApp or send a short request", d: "Tell us the patient's location, destination (if known) and urgency." },
  { t: "Doctor-to-doctor conversation", d: "A MedBridge coordinator connects you with the aeromedical and receiving clinicians." },
  { t: "Plan and options", d: "Transport modality, team, receiving bed, timings and estimate — agreed with you." },
  { t: "Transfer executed", d: "Bed to bed. You remain the treating clinician until handover." },
  { t: "Closure update", d: "Confirmation of handover and admission, back to you." },
];

const checklist = [
  "Working diagnosis and reason for transfer",
  "Current vitals and trend over the last 24 hours",
  "Airway and respiratory support: O₂ flow / FiO₂, NIV or ventilator settings",
  "Haemodynamic support: vasoactive infusions and doses",
  "Lines, drains, tubes and catheters",
  "Recent labs, ABG and key imaging (shareable reports)",
  "Infection status and isolation requirements",
  "Allergies and current medications",
  "Mobility, weight, and any positioning constraints",
  "Consent / next of kin, and resuscitation status where documented",
];

const principles = [
  { icon: Stethoscope, t: "Clinical decisions stay with clinicians", d: "Modality and fitness for transfer are agreed between you, the receiving clinician and the aeromedical team." },
  { icon: ShieldCheck, t: "Patient information handled carefully", d: "We request the minimum needed to plan safely and share it only with the teams involved." },
  { icon: Scale, t: "No referral inducements", d: "MedBridge does not offer referral commissions or incentives to clinicians. Our only ask is the right plan for your patient." },
];

const faqs = [
  {
    q: "Who will I speak to?",
    a: "Your first contact is the MedBridge transfer desk, which connects you with the aeromedical doctor and, where needed, the receiving specialist for a clinician-to-clinician discussion.",
  },
  {
    q: "Can you find an ICU bed at the receiving end?",
    a: "Yes — we coordinate with receiving hospitals to identify a suitable specialist and bed, and confirm acceptance before the patient departs.",
  },
  {
    q: "What if I think the patient shouldn't fly?",
    a: "Then we plan an alternative — a critical-care road transfer, a delay until stabilisation, or a different receiving centre. Clinical judgement leads, always.",
  },
];

export default function ForDoctorsPage() {
  return (
    <>
      <PageHero
        tone="dark"
        crumbs={[{ name: "For Doctors", path: "/for-doctors" }]}
        eyebrow="For referring doctors"
        title="Your patient. One coordinated transfer."
        intro="When your patient needs care elsewhere, MedBridge coordinates the transfer end to end — so you can stay focused on the patient in front of you."
        actions={
          <>
            <ButtonLink href="#doctor-call" variant="accent" size="lg" data-placement="doctor_hero">
              Request a doctor-to-doctor call
            </ButtonLink>
            <ButtonAnchor href={telHref(site.contact.doctorDeskPhone)} variant="outline-inverse" size="lg" data-placement="doctor_hero">
              <Phone className="h-4 w-4" aria-hidden="true" />
              24/7 transfer desk
            </ButtonAnchor>
          </>
        }
        aside={
          <div className="rounded-[var(--radius-panel)] bg-white/[0.04] p-7 ring-1 ring-white/10 md:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400">Contact us for</p>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s} className="flex gap-3 text-[15.5px] text-navy-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-400" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400">Physician line</p>
              <a href={telHref(site.contact.doctorDeskPhone)} className="mt-1 block text-[22px] font-semibold tabular-nums text-white" data-placement="doctor_aside">
                {site.contact.doctorDeskPhoneDisplay}
              </a>
            </div>
          </div>
        }
      />

      <Section tone="white" labelledBy="process">
        <SectionHeader id="process" eyebrow="How it works" title="Clinician to clinician, from first call to admission." />
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {process.map((p, i) => (
            <li key={p.t} className="rounded-[var(--radius-card)] bg-mist-50 p-5 ring-1 ring-mist-200">
              <span className="font-mono text-[12px] text-aqua-700">0{i + 1}</span>
              <h3 className="mt-3 text-[16.5px] font-semibold leading-snug tracking-tight">{p.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist" labelledBy="handover">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <ClipboardList className="h-7 w-7 text-navy-700" aria-hidden="true" />
            <SectionHeader
              id="handover"
              className="mt-4"
              eyebrow="Clinical handover"
              title="What helps us plan safely."
              intro="You don't need all of this to call. It's what the aeromedical team will ask for — having it ready shortens the time to departure."
            />
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {checklist.map((c, i) => (
              <li key={c} className="flex gap-3 rounded-xl bg-white p-4 text-[15px] leading-snug text-ink-muted ring-1 ring-mist-200">
                <span className="font-mono text-[11px] text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" labelledBy="principles">
        <SectionHeader id="principles" eyebrow="Our commitments to clinicians" title="Professional, by design." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.t} className="rounded-[var(--radius-card)] p-7 ring-1 ring-mist-200">
              <p.icon className="h-6 w-6 text-aqua-600" aria-hidden="true" />
              <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="doctor-call" aria-labelledby="doctor-call-h" className="scroll-mt-24 bg-navy-950 py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow text-aqua-300">Doctor-to-doctor</p>
            <h2 id="doctor-call-h" className="display mt-3 text-[34px] text-white md:text-[44px]">
              Request a doctor-to-doctor call.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-navy-300">
              For urgent cases, call the desk directly. Otherwise, send a short request and we&apos;ll call you back.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonAnchor href={telHref(site.contact.doctorDeskPhone)} variant="inverse" size="lg" data-placement="doctor_form">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {site.contact.doctorDeskPhoneDisplay}
              </ButtonAnchor>
              <WhatsAppButton placement="doctor_form" audience="doctor" variant="outline-inverse" label="WhatsApp (doctors)" />
            </div>
          </div>
          <div className="rounded-[var(--radius-panel)] bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-9">
            <EnquiryForm
              kind="doctor_call"
              role="doctor"
              tone="dark"
              audience="doctor"
              submitLabel="Request doctor-to-doctor call"
              showUrgency
              showRoute
              messagePlaceholder="Diagnosis, current support (O₂ / ventilation / infusions), reason for transfer. Avoid patient names."
            />
          </div>
        </div>
      </section>

      <Section tone="mist" labelledBy="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader id="faq" eyebrow="Questions" title="For referring clinicians." />
          <Faq items={faqs} />
        </div>
      </Section>
    </>
  );
}
