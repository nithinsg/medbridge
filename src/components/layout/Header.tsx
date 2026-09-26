"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { mainNav, site } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/links";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { LiveDot, buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";

const mobileExtra = [
  { href: "/which-air-ambulance", label: "Which transfer do I need?" },
  { href: "/air-ambulance-cost", label: "Cost & estimate" },
  { href: "/knowledge", label: "Knowledge Hub" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Utility bar — desktop only */}
      <div className="hidden border-b border-white/10 bg-navy-950 text-[13px] text-navy-300 lg:block">
        <div className="container-page flex h-9 items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
            Medical transfer coordination · India &amp; international
          </p>
          <div className="flex items-center gap-6">
            <Link href="/knowledge" className="hover:text-white">
              Knowledge Hub
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <a
              href={whatsappHref("family")}
              target="_blank"
              rel="noopener noreferrer"
              data-placement="utility_bar"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <a
              href={telHref()}
              data-placement="utility_bar"
              className="flex items-center gap-2 border-l border-white/10 pl-6 text-white hover:text-aqua-300"
            >
              <LiveDot className="h-1.5 w-1.5" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-300">24/7 Transfer Desk</span>
              <span className="font-semibold tabular-nums">{site.contact.deskPhoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
          scrolled ? "border-mist-200 shadow-[0_8px_30px_-20px_rgb(7_19_31/0.35)]" : "border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link href="/" aria-label="MedBridge home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "whitespace-nowrap rounded-lg px-3 py-2 text-[14.5px] font-medium transition-colors",
                      isActive(item.href) ? "text-navy-900 bg-mist-100" : "text-ink-muted hover:text-navy-900",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <a
              href={telHref()}
              data-placement="header"
              className="hidden items-center gap-3 rounded-xl py-1 pl-1 pr-2 lg:flex xl:hidden"
              aria-label={`24/7 transfer desk, call ${site.contact.deskPhoneDisplay}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-50 text-coral-600">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-subtle">
                  <LiveDot className="h-1.5 w-1.5" /> 24/7 Transfer Desk
                </span>
                <span className="block whitespace-nowrap text-[15px] font-semibold tabular-nums text-navy-900">
                  {site.contact.deskPhoneDisplay}
                </span>
              </span>
            </a>
            <span className="hidden sm:block">
              <Link href="/request-transfer" data-placement="header" className={buttonClasses("primary", "md")}>
                Request transfer
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </span>
            <a
              href={telHref()}
              data-placement="header_mobile"
              className="flex h-11 items-center gap-2 rounded-[var(--radius-control)] bg-coral-50 px-3 text-[14px] font-semibold text-coral-600 lg:hidden"
              aria-label={`Call the 24/7 transfer desk ${site.contact.deskPhoneDisplay}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-navy-900 hover:bg-mist-100 xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

      </header>

      {/* Rendered outside <header>: its backdrop-filter would trap a fixed child. */}
      <div
        id="mobile-menu"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-0 z-[60] overflow-y-auto bg-white xl:hidden"
      >
        <div className="container-page flex h-16 items-center justify-between border-b border-mist-200">
          <Link href="/" aria-label="MedBridge home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-navy-900 hover:bg-mist-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav
          aria-label="Mobile"
          className="container-page py-6"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <ul className="divide-y divide-mist-200 border-y border-mist-200">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-[19px] font-medium text-navy-900"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-ink-subtle" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
            {mobileExtra.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[15px] text-ink-muted hover:text-navy-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-[var(--radius-card)] bg-navy-950 p-5 text-white">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-300">24/7 Transfer Desk</p>
            <a href={telHref()} data-placement="mobile_menu" className="mt-1 block text-2xl font-semibold tabular-nums">
              {site.contact.deskPhoneDisplay}
            </a>
            <Link href="/request-transfer" className={buttonClasses("accent", "lg", "mt-4 w-full")}>
              Request medical transfer
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
