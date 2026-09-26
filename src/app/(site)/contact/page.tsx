import Link from "next/link";
import { Mail, MapPin, Phone, Stethoscope } from "lucide-react";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { telHref, whatsappHref } from "@/lib/links";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Contact MedBridge — 24/7 Transfer Desk",
  description: "Call or WhatsApp the MedBridge 24/7 medical transfer desk, reach the physician line, or contact our partnerships team.",
  path: "/contact",
});

export default function ContactPage() {
  const desks = [
    {
      icon: Phone,
      t: "24/7 Transfer Desk",
      d: "Families, patients and hospitals. For any live transfer.",
      v: site.contact.deskPhoneDisplay,
      href: telHref(),
    },
    {
      icon: Stethoscope,
      t: "Physician line",
      d: "Referring doctors — for doctor-to-doctor coordination.",
      v: site.contact.doctorDeskPhoneDisplay,
      href: telHref(site.contact.doctorDeskPhone),
    },
    {
      icon: WhatsAppIcon,
      t: "WhatsApp",
      d: "Message a transfer coordinator. Share reports securely once connected.",
      v: "Start a chat",
      href: whatsappHref("family"),
      external: true,
    },
    {
      icon: Mail,
      t: "Email",
      d: "Non-urgent enquiries and documents.",
      v: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
  ];
  return (
    <>
      <section className="bg-white">
        <div className="container-page pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <p className="eyebrow mt-10">Contact</p>
          <h1 className="display mt-4 text-[40px] sm:text-[52px] lg:text-[64px]">We&apos;re here at any hour.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            For a patient who needs to move, call or WhatsApp — or{" "}
            <Link href="/request-transfer" className="font-medium text-clinical-700 underline underline-offset-4">
              send a transfer request
            </Link>
            .
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {desks.map((d) => (
              <li key={d.t}>
                <a
                  href={d.href}
                  {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  data-placement="contact_page"
                  className="flex h-full flex-col rounded-[var(--radius-card)] bg-mist-50 p-6 ring-1 ring-mist-200 transition-colors hover:bg-white hover:ring-navy-300"
                >
                  <d.icon className="h-6 w-6 text-aqua-600" aria-hidden="true" />
                  <h2 className="mt-5 text-[17px] font-semibold tracking-tight">{d.t}</h2>
                  <p className="mt-1 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{d.d}</p>
                  <p className="mt-4 break-all text-[16px] font-semibold tabular-nums text-navy-900">{d.v}</p>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-start gap-3 text-[15px] text-ink-muted">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ink-subtle" aria-hidden="true" />
            <address className="not-italic">
              {site.legalName}
              <br />
              {site.address.line1}, {site.address.line2}, {site.address.country}
            </address>
          </div>
        </div>
      </section>

      <Section tone="mist" labelledBy="partners-h" id="partners" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader
              id="partners-h"
              eyebrow="Partnerships · MedBridge Assist"
              title="Insurers, assistance companies, corporates & institutions."
              intro="We work with insurers, TPAs, international assistance companies, employers, travel companies, universities and embassies that need a dependable medical transfer partner in India."
            />
            <p className="mt-6 text-[15px] text-ink-muted">
              Hospitals: see{" "}
              <Link href="/for-hospitals" className="font-medium text-clinical-700 underline underline-offset-4">
                For Hospitals
              </Link>
              . Doctors:{" "}
              <Link href="/for-doctors" className="font-medium text-clinical-700 underline underline-offset-4">
                For Doctors
              </Link>
              .
            </p>
          </div>
          <div className="rounded-[var(--radius-panel)] bg-white p-6 ring-1 ring-mist-200 md:p-9">
            <EnquiryForm
              kind="partner"
              role="partner"
              submitLabel="Send enquiry"
              organisationLabel="Organisation"
              messageLabel="How can we work together?"
              audience="partner"
            />
          </div>
        </div>
      </Section>

      <section className="bg-white py-14">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl text-[15px] text-ink-muted">
            In a life-threatening emergency, call <a href="tel:112" className="font-semibold underline">112</a> first.
            MedBridge coordinates transfers between facilities and is not a first-response emergency service.
          </p>
          <ButtonLink href="/request-transfer" size="lg">
            Request medical transfer
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
