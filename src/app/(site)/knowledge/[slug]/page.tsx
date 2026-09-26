import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { articleBySlug, articles } from "@/content/articles";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/links";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/ContactActions";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/knowledge/[slug]">) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.description, path: `/knowledge/${a.slug}` });
}

export default async function ArticlePage({ params }: PageProps<"/knowledge/[slug]">) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const related = (a.related ?? []).map(articleBySlug).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const updated = new Date(a.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <article className="bg-white">
        <div className="container-page pb-16 pt-8 md:pt-10">
          <Breadcrumbs items={[{ name: "Knowledge Hub", path: "/knowledge" }, { name: a.title, path: `/knowledge/${a.slug}` }]} />
          <header className="mx-auto mt-12 max-w-3xl">
            <p className="eyebrow">{a.category}</p>
            <h1 className="display mt-4 text-[36px] sm:text-[46px] lg:text-[54px]">{a.title}</h1>
            <p className="mt-5 text-[19px] leading-relaxed text-ink-muted">{a.description}</p>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-subtle">
              {a.minutes} min read · Updated {updated} · Medical review: <span className="text-warning-700">[pending]</span>
            </p>
          </header>
          <div className="prose-mb mx-auto mt-10 max-w-3xl border-t border-mist-200 pt-4">
            {a.sections.map((s) => (
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
            <p className="mt-10 rounded-xl bg-mist-50 p-5 text-[14.5px] leading-relaxed text-ink-subtle">
              This article is general information, not medical advice. Decisions about whether and how a patient travels
              are made by the treating and receiving clinicians.
            </p>
          </div>

          {/* Mandatory article footer CTA */}
          <aside aria-labelledby="need-help" className="mx-auto mt-12 max-w-3xl rounded-[var(--radius-panel)] bg-navy-950 p-8 md:p-10">
            <h2 id="need-help" className="text-[28px] font-semibold tracking-tight text-white md:text-[32px]">
              Need help moving a patient?
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-navy-300">
              A MedBridge coordinator can talk you through the options — at any hour.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/request-transfer" variant="accent" size="lg" data-placement="article_footer">
                Request medical transfer
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <CallButton placement="article_footer" variant="outline-inverse" />
            </div>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related" className="bg-mist-50 py-16">
          <div className="container-page">
            <h2 id="related" className="text-[24px] font-semibold tracking-tight">
              Related guides
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ArticleCard article={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          dateModified: a.updated,
          datePublished: a.updated,
          mainEntityOfPage: absoluteUrl(`/knowledge/${a.slug}`),
          author: { "@type": "Organization", name: site.name },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
