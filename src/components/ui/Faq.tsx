import { Plus } from "lucide-react";
import { JsonLd, faqJsonLd } from "@/lib/seo";

/** Native <details> accordion: accessible, zero JavaScript, emits FAQPage JSON-LD. */
export function Faq({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  return (
    <div className="divide-y divide-mist-200 border-y border-mist-200">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[17px] font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus
              className="h-5 w-5 shrink-0 text-ink-subtle transition-transform duration-300 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-3xl pb-6 text-[16px] leading-relaxed text-ink-muted">{f.a}</p>
        </details>
      ))}
      {schema ? <JsonLd data={faqJsonLd(items)} /> : null}
    </div>
  );
}
