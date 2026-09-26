import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/maps/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/air-ambulance-cost-india", destination: "/air-ambulance-cost", permanent: true },
      { source: "/request", destination: "/request-transfer", permanent: true },
      { source: "/doctors", destination: "/for-doctors", permanent: true },
      { source: "/hospitals", destination: "/for-hospitals", permanent: true },
      { source: "/repatriation", destination: "/international-repatriation", permanent: true },
    ];
  },
};

export default nextConfig;
