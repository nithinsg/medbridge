import { articles } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "Knowledge Hub — Air Ambulance, Repatriation & Patient Transfer Guides",
  description:
    "Plain-language guides for families and clinicians: air ambulances, medical repatriation, ICU and ventilator transfers, costs, medical escorts and more.",
  path: "/knowledge",
});

const categories = ["Air ambulance", "International", "Clinical transfers", "Planning & cost"] as const;

export default function KnowledgePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Knowledge Hub", path: "/knowledge" }]}
        eyebrow="MedBridge Knowledge Hub"
        title="Clear answers, before you need them."
        intro="Plain-language guides to medical transfers for families, patients and clinicians. General information only — always follow the advice of the treating doctors."
      />
      {categories.map((c, i) => {
        const list = articles.filter((a) => a.category === c);
        if (!list.length) return null;
        return (
          <Section key={c} tone={i % 2 === 0 ? "mist" : "white"} labelledBy={`cat-${i}`} className="py-12 md:py-16 lg:py-20">
            <h2 id={`cat-${i}`} className="text-[26px] font-semibold tracking-tight">
              {c}
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {list.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </Section>
        );
      })}
      <CtaBand placement="knowledge_final" title="Need help moving a patient?" />
    </>
  );
}
