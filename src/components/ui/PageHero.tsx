import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

export function Breadcrumbs({ items, tone = "default" }: { items: { name: string; path: string }[]; tone?: "default" | "dark" }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={cn("flex flex-wrap items-center gap-1 text-[13px]", tone === "dark" ? "text-navy-400" : "text-ink-subtle")}>
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              {i === all.length - 1 ? (
                <span aria-current="page" className={tone === "dark" ? "text-navy-300" : "text-ink-muted"}>
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className={tone === "dark" ? "hover:text-white" : "hover:text-navy-900"}>
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  intro,
  crumbs,
  actions,
  aside,
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  intro?: ReactNode;
  crumbs: { name: string; path: string }[];
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-navy-950" : "bg-white")}>
      <div className="container-page pb-14 pt-8 md:pb-20 md:pt-10">
        <Breadcrumbs items={crumbs} tone={dark ? "dark" : "default"} />
        <div className={cn("mt-10 grid items-center gap-12", aside ? "lg:grid-cols-[1.1fr_1fr]" : "")}>
          <div className="max-w-3xl">
            {eyebrow ? <p className={cn("eyebrow", dark && "text-aqua-300")}>{eyebrow}</p> : null}
            <h1 className={cn("display mt-4 text-[40px] sm:text-[52px] lg:text-[64px]", dark && "text-white")}>
              {title}
              {subtitle ? (
                <span className={cn("mt-2 block", dark ? "text-navy-400" : "text-navy-400")}>{subtitle}</span>
              ) : null}
            </h1>
            {intro ? (
              <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", dark ? "text-navy-300" : "text-ink-muted")}>
                {intro}
              </p>
            ) : null}
            {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
