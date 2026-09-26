"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated listener instead of wiring every button:
 * tel: → call_click, wa.me → whatsapp_click, mailto: → email_click,
 * /request-transfer → cta_request_transfer. `data-placement` says where.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const placement = a.dataset.placement ?? "inline";
      const page = window.location.pathname;
      if (href.startsWith("tel:")) track("call_click", { placement, page });
      else if (href.includes("wa.me/")) track("whatsapp_click", { placement, page, audience: a.dataset.audience ?? "family" });
      else if (href.startsWith("mailto:")) track("email_click", { placement, page });
      else if (href.startsWith("/request-transfer")) track("cta_request_transfer", { placement, page });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
