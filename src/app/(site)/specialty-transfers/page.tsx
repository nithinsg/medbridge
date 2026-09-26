import { specialties } from "@/content/specialties";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SpecialtyGrid } from "@/components/sections/SpecialtyGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "Specialty Medical Transfers — Cardiac, Neuro, Trauma, Neonatal & more",
  description:
    "Specialty patient transfers planned around the condition: cardiac, neurology and neurosurgery, pulmonology, trauma, oncology, transplant, paediatric and neonatal.",
  path: "/specialty-transfers",
});

export default function SpecialtyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Specialty Transfers", path: "/specialty-transfers" }]}
        eyebrow="Specialty transfers"
        title="Planned around the patient's condition."
        intro="Every specialty brings different considerations — equipment, positioning, altitude, the receiving team. Select a specialty to see what transfer teams typically plan for."
      />
      <Section tone="mist" labelledBy="grid" className="pt-10 md:pt-14 lg:pt-16">
        <h2 id="grid" className="sr-only">
          Specialties
        </h2>
        <SpecialtyGrid />
      </Section>
      <Section tone="white" labelledBy="detail">
        <h2 id="detail" className="display text-[32px] md:text-[40px]">
          In detail
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {specialties.map((s) => (
            <article key={s.slug} id={s.slug} className="scroll-mt-28 border-t border-mist-200 pt-6">
              <h3 className="text-[21px] font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink-muted">{s.overview}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">What teams plan for</p>
              <ul className="mt-2 space-y-1.5">
                {s.planningFocus.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[15px] text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-500" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-[14px] leading-relaxed text-ink-subtle">
          General information only. Whether and how a patient is transferred is decided by the treating and receiving
          clinicians together with the aeromedical team.
        </p>
      </Section>
      <CtaBand placement="specialty_final" />
    </>
  );
}
