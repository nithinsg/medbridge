import type { Metadata } from "next";
import { site } from "@/config/site";
import { absoluteUrl } from "./links";

/** Page-level metadata with canonical + OpenGraph in one call. */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle ?? `${title} | MedBridge`,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: ogTitle ?? title, description },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw string; content is our own static data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Only verified facts belong here — phone is included once the site is launch-ready. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    slogan: site.tagline,
    description: site.description,
    areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
    ...(site.launchReady && !site.contact.isPlaceholder
      ? {
          telephone: site.contact.deskPhone,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: site.contact.deskPhone,
            contactType: "emergency",
            hoursAvailable: "Mo-Su 00:00-23:59",
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
