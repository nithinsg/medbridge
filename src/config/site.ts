/**
 * ───────────────────────────────────────────────────────────────
 *  MEDBRIDGE — SITE CONFIGURATION (single source of truth)
 * ───────────────────────────────────────────────────────────────
 *  Change phone numbers, WhatsApp, email, address and launch state here,
 *  or override them with environment variables in Vercel (preferred —
 *  no code change needed). See README → "Changing contact details".
 *
 *  Anything marked [PLACEHOLDER] must be replaced with verified
 *  information before the site is made public.
 */

/** Formats +919876543210 → "+91 98765 43210". */
function formatIndianNumber(e164: string) {
  const digits = e164.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return e164;
}

// Next.js inlines NEXT_PUBLIC_* only when referenced literally.
const DESK_PHONE = process.env.NEXT_PUBLIC_DESK_PHONE;
const DOCTOR_DESK_PHONE = process.env.NEXT_PUBLIC_DOCTOR_DESK_PHONE;
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const LAUNCH_READY = process.env.NEXT_PUBLIC_LAUNCH_READY;
const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? (VERCEL_URL ? `https://${VERCEL_URL}` : undefined);
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const hasRealPhone = Boolean(DESK_PHONE && DESK_PHONE.trim());

export const site = {
  name: "MedBridge",
  legalName: "MedBridge [PLACEHOLDER — registered company name]",
  /** Brand line (see docs/STRATEGY.md §L). */
  tagline: "Bridging the distance to care.",
  /** Proof line used under the brand line. */
  proofLine: "From bedside to the right hospital.",
  description:
    "MedBridge coordinates critical medical transfers, air ambulance services and international medical repatriation — from bedside to the right hospital. 24/7 medical transfer desk.",
  url: (SITE_URL ?? "https://medbridge-india.vercel.app").replace(/\/$/, ""),
  locale: "en_IN",

  /**
   * While false, the site shows a "preview" ribbon and tells search engines
   * not to index it. Set NEXT_PUBLIC_LAUNCH_READY=true only after every
   * contact detail below has been verified — a family must never reach a
   * dead number.
   */
  launchReady: LAUNCH_READY === "true",

  contact: {
    /** 24/7 transfer desk. E.164 format, e.g. +919876543210 */
    deskPhone: DESK_PHONE?.trim() ?? "+910000000000",
    deskPhoneDisplay: hasRealPhone ? formatIndianNumber(DESK_PHONE!.trim()) : "+91 XXXXX XXXXX",
    /** Physician-to-physician line. Falls back to the main desk. */
    doctorDeskPhone: DOCTOR_DESK_PHONE?.trim() ?? DESK_PHONE?.trim() ?? "+910000000000",
    doctorDeskPhoneDisplay: DOCTOR_DESK_PHONE?.trim()
      ? formatIndianNumber(DOCTOR_DESK_PHONE.trim())
      : hasRealPhone
        ? formatIndianNumber(DESK_PHONE!.trim())
        : "+91 XXXXX XXXXX",
    /** WhatsApp number, digits only with country code, e.g. 919876543210 */
    whatsapp: (WHATSAPP ?? "910000000000").replace(/\D/g, ""),
    email: EMAIL ?? "desk@medbridge.example",
    partnershipsEmail: "partners@medbridge.example",
    isPlaceholder: !hasRealPhone,
  },

  address: {
    line1: "[PLACEHOLDER] Registered office address",
    line2: "[PLACEHOLDER] City, State, PIN",
    country: "India",
  },

  /** Pre-filled WhatsApp messages by audience. */
  whatsappMessages: {
    family: "Hello MedBridge, I need help arranging a medical transfer.",
    doctor: "Hello MedBridge, I am a doctor and need to coordinate a patient transfer.",
    hospital: "Hello MedBridge, I am contacting you from a hospital about a patient transfer.",
    international: "Hello MedBridge, I need help with an international medical repatriation.",
    partner: "Hello MedBridge, I would like to discuss a partnership.",
  },

  social: {
    linkedin: "", // [PLACEHOLDER] add when available
  },
} as const;

export type WhatsappAudience = keyof typeof site.whatsappMessages;

/** Primary navigation (desktop). Mobile shows a simplified version. */
export const mainNav = [
  { href: "/air-ambulance", label: "Air Ambulance" },
  { href: "/medical-transfer", label: "Medical Transfer" },
  { href: "/international-repatriation", label: "International" },
  { href: "/for-doctors", label: "For Doctors" },
  { href: "/for-hospitals", label: "For Hospitals" },
  { href: "/network", label: "Network" },
  { href: "/about", label: "About" },
] as const;
