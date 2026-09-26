import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { articles } from "@/content/articles";
import { landings } from "@/content/landings";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/request-transfer", priority: 0.9 },
  { path: "/air-ambulance", priority: 0.95 },
  { path: "/which-air-ambulance", priority: 0.7 },
  { path: "/medical-transfer", priority: 0.85 },
  { path: "/international-repatriation", priority: 0.85 },
  { path: "/for-doctors", priority: 0.8 },
  { path: "/for-hospitals", priority: 0.8 },
  { path: "/transplant-transfers", priority: 0.6 },
  { path: "/specialty-transfers", priority: 0.6 },
  { path: "/air-ambulance-cost", priority: 0.8 },
  { path: "/network", priority: 0.5 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.6 },
  { path: "/knowledge", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/medical-disclaimer", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r.path}`, lastModified: now, priority: r.priority })),
    ...landings.map((l) => ({ url: `${site.url}/${l.slug}`, lastModified: now, priority: 0.75 })),
    ...articles.map((a) => ({ url: `${site.url}/knowledge/${a.slug}`, lastModified: new Date(a.updated), priority: 0.6 })),
  ];
}
