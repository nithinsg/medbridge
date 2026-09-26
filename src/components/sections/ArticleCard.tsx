import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/content/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/knowledge/${article.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] bg-mist-50 p-6 ring-1 ring-mist-200 transition-colors hover:bg-white hover:ring-navy-300"
    >
      <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-ink-subtle">
        {article.category}
        <span>{article.minutes} min read</span>
      </span>
      <h3 className="mt-6 text-[19px] font-semibold leading-snug tracking-tight text-navy-900">{article.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-ink-muted">{article.description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-navy-900">
        Read article
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
