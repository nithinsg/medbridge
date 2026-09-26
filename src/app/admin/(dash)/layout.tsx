import Link from "next/link";
import { LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { Logo } from "@/components/brand/Logo";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <>
      <header className="border-b border-white/10 bg-navy-950">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo tone="inverse" />
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400 sm:inline">Command Centre</span>
          </Link>
          <div className="flex items-center gap-5 text-[14px] text-navy-300">
            <Link href="/" className="hover:text-white">
              Website
            </Link>
            <form action={logout}>
              <button type="submit" className="flex items-center gap-1.5 hover:text-white">
                <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-page py-8 md:py-10">{children}</main>
    </>
  );
}
