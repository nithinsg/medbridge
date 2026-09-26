/**
 * Vendor-neutral analytics. Sends to Vercel Analytics and, when configured,
 * GA4/GTM (window.dataLayer). NEVER pass names, phone numbers, emails or
 * clinical information — only categorical, non-identifying properties.
 */
import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsEvent =
  | "cta_request_transfer"
  | "call_click"
  | "whatsapp_click"
  | "email_click"
  | "transfer_form_start"
  | "transfer_form_step"
  | "transfer_form_submit"
  | "transfer_form_error"
  | "callback_submit"
  | "decision_tool_complete"
  | "estimate_generated"
  | "doctor_call_request"
  | "partner_enquiry";

type Props = Record<string, string | number | boolean | null>;

const BLOCKED_KEYS = /name|phone|email|whatsapp|condition|notes|hospital|diagnos/i;

function sanitize(props: Props = {}): Props {
  const clean: Props = {};
  for (const [k, v] of Object.entries(props)) if (!BLOCKED_KEYS.test(k)) clean[k] = v;
  return clean;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, props?: Props) {
  if (typeof window === "undefined") return;
  const clean = sanitize(props);
  try {
    vercelTrack(event, clean);
  } catch {
    /* analytics must never break the UI */
  }
  window.dataLayer?.push({ event, ...clean });
}
