import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/links";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";
import { LiveDot } from "@/components/ui/Button";

/** Mobile-only thumb-reach action bar. Always visible below lg. */
export function EmergencyBar() {
  return (
    <nav
      aria-label="Emergency contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-200 bg-white/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-[1fr_1fr_1.35fr] gap-2 px-3 py-2.5">
        <a
          href={telHref()}
          data-placement="mobile_bar"
          className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl bg-navy-900 text-white active:bg-navy-700"
        >
          <span className="flex items-center gap-1.5">
            <LiveDot className="h-1.5 w-1.5" />
            <Phone className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-[12px] font-medium">Call 24/7</span>
        </a>
        <a
          href={whatsappHref("family")}
          target="_blank"
          rel="noopener noreferrer"
          data-placement="mobile_bar"
          className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl border border-mist-300 bg-white text-navy-900 active:bg-mist-100"
        >
          <WhatsAppIcon className="h-[18px] w-[18px] text-[#1FAF55]" />
          <span className="text-[12px] font-medium">WhatsApp</span>
        </a>
        <Link
          href="/request-transfer"
          data-placement="mobile_bar"
          className="flex h-14 items-center justify-center gap-1.5 rounded-xl bg-aqua-500 px-2 text-center text-[14px] font-semibold leading-tight text-navy-950 active:bg-aqua-400"
        >
          Request transfer
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
      <p className="sr-only">24/7 transfer desk {site.contact.deskPhoneDisplay}</p>
    </nav>
  );
}
