import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Section";

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <section className="bg-white">
      <div className="container-page pb-20 pt-8 md:pt-10">
        <Breadcrumbs items={[{ name: title, path }]} />
        <div className="mx-auto mt-12 max-w-3xl">
          <h1 className="display text-[38px] md:text-[48px]">{title}</h1>
          <Placeholder className="mt-5">Draft — requires legal review before launch</Placeholder>
          <div className="prose-mb mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
