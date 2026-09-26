import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBar } from "@/components/layout/EmergencyBar";
import { PreviewRibbon } from "@/components/layout/PreviewRibbon";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { JsonLd, organizationJsonLd } from "@/lib/seo";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:shadow-lg"
      >
        Skip to content
      </a>
      <PreviewRibbon />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <EmergencyBar />
      <AnalyticsListener />
      <JsonLd data={organizationJsonLd()} />
    </>
  );
}
