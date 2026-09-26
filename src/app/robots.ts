import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Until launch-ready, keep the whole site out of search engines (placeholder contact details).
  if (!site.launchReady) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
