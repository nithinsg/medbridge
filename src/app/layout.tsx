import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/config/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MedBridge — Air Ambulance & Medical Transfer Coordination, 24/7",
    template: "%s | MedBridge",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: "MedBridge — Medical care shouldn't stop because of distance",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: site.launchReady
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1d2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
