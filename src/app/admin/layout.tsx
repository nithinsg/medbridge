import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Centre",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-dvh bg-mist-50">{children}</div>;
}
