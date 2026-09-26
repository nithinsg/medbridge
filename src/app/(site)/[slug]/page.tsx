import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { landings, landingBySlug } from "@/content/landings";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton, WhatsAppButton } from "@/components/ui/ContactActions";
import { Faq } from "@/components/ui/Faq";
import { LocatorMap } from "@/components/map/LocatorMap";
import { BedToBedStrip } from "@/components/sections/BedToBedStrip";
import { CtaBand } from "@/components/sections/CtaBand";

export const dynamicParams = false;

export function generateStaticParams() {
  return landings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const l = landingBySlug(slug);
  if (!l) return {};
  return pageMetadata({ title: l.metaTitle, description: l.description, path: `/${l.slug}` });
}

export default async function LandingPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const l = landingBySlug(slug);
  if (!l) notFound();

  const parent =
    l.kind === "corridor"
      ? { name: "International Repatriation", path: "/international-repatriation" }
      : { name: "Air Ambulance", path: "/air-ambulance" };
  const requestHref = `/request-transfer${l.requestQuery ? `?${l.requestQuery}` : ""}`;
  const siblings = landings.filter((x) => x.kind === l.kind && x.slug !== l.slug).slice(0, 6);

  return (
    <>
      <PageHero
        crumbs={[parent, { name: l.shortName, path: `/${l.slug}` }]}
        eyebrow={l.eyebrow}
        title={l.h1}
        intro={l.intro}
        actions={
          <>
            <ButtonLink href={requestHref} size="lg" data-placement="landing_hero">
              Request medical transfer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <CallButton placement="landing_hero" />
          </>
        }
        aside={
          l.geo ? (
            <LocatorMap lat={l.geo.lat} lon={l.geo.lon} label={l.shortName} />
          ) : (
            <FactsPanel facts={l.facts} />
          )
        }
      />

      <Section tone="mist" labelledBy="detail">
        <h2 id="detail" className="sr-only">
          {l.h1} — details
        </h2>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="prose-mb max-w-none">
            {l.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.body.map((b, i) =>
                  Array.isArray(b) ? (
                    <ul key={i}>
                      {b.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{b}</p>
                  ),
                )}
              </section>
            ))}
          </div>
          <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            {l.geo ? <FactsPanel facts={l.facts} /> : null}
            <div className="rounded-[var(--radius-card)] bg-navy-950 p-6 text-navy-300">
              <h3 className="text-[18px] font-semibold text-white">What MedBridge coordinates</h3>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {["Doctor-to-doctor handover", "Receiving hospital & bed", "Ground ambulance at both ends", "Aircraft & medical team", "Documents & family briefing"].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <WhatsAppButton placement="landing_aside" audience={l.whatsapp ?? "family"} variant="outline-inverse" size="md" className="mt-6 w-full" />
            </div>
          </aside>
        </div>
      </Section>

      <BedToBedStrip />

      <Section tone="mist" labelledBy="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader id="faq" eyebrow="Questions" title="Frequently asked." />
          <Faq items={l.faqs} />
        </div>
        {siblings.length ? (
          <div className="mt-16">
            <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-ink-subtle">Related</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-[15px] font-medium text-navy-900 ring-1 ring-mist-200 hover:ring-navy-300">
                    {s.h1}
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <CtaBand placement="landing_final" primaryHref={requestHref} audience={l.whatsapp ?? "family"} />
    </>
  );
}

function FactsPanel({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-mist-200 rounded-[var(--radius-card)] bg-white px-6 ring-1 ring-mist-200">
      {facts.map((f) => (
        <div key={f.label} className="py-4">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-subtle">{f.label}</dt>
          <dd className="mt-1 text-[15.5px] font-medium leading-snug text-navy-900">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
