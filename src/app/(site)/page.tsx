import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Stethoscope } from "lucide-react";
import { modalities } from "@/content/services";
import { whyNotOperator } from "@/content/trust";
import { articles } from "@/content/articles";
import { whatsappHref } from "@/lib/links";
import { HeroJourney } from "@/components/map/HeroJourney";
import { RepatriationMap } from "@/components/map/RepatriationMap";
import { JourneyExplorer } from "@/components/sections/JourneyExplorer";
import { SpecialtyGrid } from "@/components/sections/SpecialtyGrid";
import { TrustSection } from "@/components/sections/TrustSection";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink, LiveDot } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/ContactActions";
import { Section, SectionHeader } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";

const homeModalities = ["fixed-wing", "helicopter", "icu", "commercial-escort"]
  .map((s) => modalities.find((m) => m.slug === s)!);

export default function HomePage() {
  return (
    <>
      {/* 1 — HERO */}
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgb(22_179_163/0.08),transparent_60%),radial-gradient(40%_40%_at_0%_100%,rgb(45_91_216/0.05),transparent_60%)]"
        />
        <div className="container-page relative grid items-center gap-10 pb-14 pt-10 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-mist-100 py-1.5 pl-3 pr-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-navy-700">
              <LiveDot className="h-1.5 w-1.5" />
              24/7 medical transfer desk
            </p>
            <h1 className="display mt-6 text-[42px] sm:text-[56px] lg:text-[60px] xl:text-[70px]">
              Medical care shouldn&apos;t stop because of distance.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl md:leading-relaxed">
              MedBridge coordinates critical medical transfers, air ambulance services and medical repatriation — from
              bedside to the right hospital.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/request-transfer" size="lg" data-placement="hero">
                Request medical transfer
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <CallButton placement="hero" />
            </div>
            <a
              href={whatsappHref("family")}
              target="_blank"
              rel="noopener noreferrer"
              data-placement="hero"
              className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-navy-700 hover:text-navy-900"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#1FAF55]" />
              Or WhatsApp a transfer coordinator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <p className="mt-8 max-w-md border-l-2 border-aqua-500 pl-4 text-[14.5px] leading-relaxed text-ink-subtle">
              You don&apos;t need to know which aircraft, hospital or ambulance is needed. Tell us where the patient is —
              our medical coordination team works out the rest with the doctors.
            </p>
          </div>
          <HeroJourney />
        </div>
      </section>

      {/* 2 — ONE TEAM */}
      <section aria-labelledby="one-team" className="border-y border-mist-200 bg-mist-50">
        <div className="container-page py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr] lg:gap-16">
            <div>
              <p className="eyebrow">Why MedBridge</p>
              <h2 id="one-team" className="display mt-3 text-[30px] md:text-[36px]">
                One team. One coordinated journey.
              </h2>
            </div>
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {whyNotOperator.map((w, i) => (
                <li key={w.title} className="flex gap-4">
                  <span className="font-mono text-[12px] text-aqua-700">0{i + 1}</span>
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-tight">{w.title}</h3>
                    <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-muted">{w.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 — AIR AMBULANCE */}
      <Section tone="white" labelledBy="air-ambulance">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="air-ambulance"
            eyebrow="MedBridge Aviation"
            title={<>Air ambulance, <span className="text-navy-400">matched to the patient.</span></>}
            intro="We coordinate medically appropriate air transport with qualified operators and medical teams — and we'll tell you when a simpler option is the better one."
          />
          <div className="flex shrink-0 gap-3">
            <ButtonLink href="/which-air-ambulance" variant="secondary">
              Which do I need?
            </ButtonLink>
            <ButtonLink href="/air-ambulance">
              Air ambulance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeModalities.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/air-ambulance#${m.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] bg-mist-50 p-6 ring-1 ring-mist-200 transition-colors hover:bg-white hover:ring-navy-300"
              >
                <span className="flex items-center justify-between">
                  <span className="rounded-md bg-navy-900 px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-aqua-300">
                    {m.code}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-[19px] font-semibold leading-snug tracking-tight">{m.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{m.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4 — JOURNEY */}
      <Section tone="mist" labelledBy="journey">
        <SectionHeader
          id="journey"
          eyebrow="MedBridge Medical Transfer"
          title={<>More than an air ambulance. <span className="text-navy-400">Bedside to hospital.</span></>}
          intro="An aircraft is one part of a transfer. We coordinate every step — the doctors, the bed, the ambulances and the flight — as one plan."
        />
        <div className="mt-12">
          <JourneyExplorer />
        </div>
      </Section>

      {/* 5 — INTERNATIONAL */}
      <Section tone="white" labelledBy="international">
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <SectionHeader
            id="international"
            eyebrow="MedBridge International"
            title="Bringing you home safely."
            intro="Medical repatriation to India from Singapore, the Gulf, Southeast Asia, Europe, the USA and beyond — with the receiving hospital in India confirmed before departure."
          />
          <div className="md:text-right">
            <ButtonLink href="/international-repatriation" variant="secondary">
              International repatriation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
        <div className="mt-10">
          <RepatriationMap compact />
        </div>
      </Section>

      {/* 6/7 — DOCTORS & HOSPITALS */}
      <Section tone="mist" labelledBy="professionals">
        <h2 id="professionals" className="sr-only">
          For doctors and hospitals
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Link
            href="/for-doctors"
            className="group relative overflow-hidden rounded-[var(--radius-panel)] bg-navy-950 p-8 text-white md:p-12"
          >
            <Stethoscope className="h-7 w-7 text-aqua-300" aria-hidden="true" />
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400">For referring doctors</p>
            <h3 className="mt-3 text-[30px] font-semibold leading-tight tracking-tight text-white md:text-[36px]">
              Your patient. One coordinated transfer.
            </h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-navy-300">
              Doctor-to-doctor coordination, receiving specialist and ICU bed arrangements, and transport sourced to your
              clinical brief.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-medium text-aqua-300">
              Request a doctor-to-doctor call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="/for-hospitals"
            className="group relative overflow-hidden rounded-[var(--radius-panel)] bg-white p-8 ring-1 ring-mist-200 md:p-12"
          >
            <Building2 className="h-7 w-7 text-navy-700" aria-hidden="true" />
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">For hospitals</p>
            <h3 className="mt-3 text-[30px] font-semibold leading-tight tracking-tight md:text-[36px]">
              A transfer desk for your transfer desk.
            </h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-muted">
              ICU-to-ICU, inter-hospital and international patient transfers — coordinated, documented and synchronised
              end to end.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-medium text-navy-900">
              Partner with MedBridge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </Section>

      {/* 8 — WHY MEDBRIDGE / TRUST */}
      <TrustSection />

      {/* 9 — SPECIALTIES */}
      <Section tone="mist" labelledBy="specialties">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="specialties"
            eyebrow="Specialty transfers"
            title="Planned around the patient's condition."
            intro="Every specialty brings its own considerations in the air and on the ground. Select one to see what transfer teams plan for."
          />
          <ButtonLink href="/specialty-transfers" variant="secondary" className="shrink-0">
            All specialties
          </ButtonLink>
        </div>
        <div className="mt-12">
          <SpecialtyGrid />
        </div>
      </Section>

      {/* 10 — KNOWLEDGE HUB */}
      <Section tone="white" labelledBy="knowledge">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="knowledge"
            eyebrow="Knowledge Hub"
            title="Clear answers, before you need them."
          />
          <ButtonLink href="/knowledge" variant="secondary" className="shrink-0">
            Visit the Knowledge Hub
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {["what-is-an-air-ambulance", "commercial-flight-vs-air-ambulance", "medical-repatriation-to-india"].map((slug) => {
            const a = articles.find((x) => x.slug === slug)!;
            return (
              <li key={slug}>
                <ArticleCard article={a} />
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 11 — FINAL CTA */}
      <CtaBand placement="home_final" />
    </>
  );
}
