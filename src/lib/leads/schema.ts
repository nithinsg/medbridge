import { z } from "zod";

/** Shared between the API and the forms. Keep clinical free-text short and optional. */
const phone = z
  .string()
  .trim()
  .min(7, "Please enter a phone number")
  .max(20)
  .regex(/^[+()\d\s-]{7,20}$/, "Please enter a valid phone number");

const text = (max: number) => z.string().trim().max(max).optional();

export const leadInputSchema = z.object({
  kind: z.enum(["transfer", "callback", "doctor_call", "partner"]),
  role: z.enum(["family", "doctor", "hospital", "partner", "other"]).default("family"),

  originScope: z.enum(["india", "international"]).optional(),
  originLocation: text(160),
  destinationMode: z.enum(["city", "hospital", "unknown"]).optional(),
  destination: text(160),
  condition: z.enum(["stable", "critical", "icu", "ventilator", "oxygen", "other"]).optional(),
  conditionNote: text(600),
  transport: z.enum(["air", "commercial_escort", "ground", "not_sure"]).optional(),
  urgency: z.enum(["immediately", "within_6h", "today", "planning"]).optional(),
  specialty: text(40),

  name: z.string().trim().min(2, "Please enter a name").max(120),
  phone,
  whatsapp: z.union([phone, z.literal("")]).optional(),
  email: z.union([z.string().trim().email("Please enter a valid email").max(160), z.literal("")]).optional(),
  organisation: text(160),
  message: text(1500),

  consent: z.literal(true, { error: "Please confirm consent so we can contact you" }),

  source: z
    .object({
      page: text(200),
      referrer: text(300),
      utm_source: text(100),
      utm_medium: text(100),
      utm_campaign: text(100),
    })
    .optional(),

  /** Honeypot — must be empty. */
  company_website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export const CASE_STATUSES = [
  "new",
  "assessing",
  "quoted",
  "confirmed",
  "in_transit",
  "completed",
  "closed",
] as const;
export type CaseStatus = (typeof CASE_STATUSES)[number];

export const STATUS_LABEL: Record<CaseStatus, string> = {
  new: "New request",
  assessing: "Pending assessment",
  quoted: "Quote sent",
  confirmed: "Confirmed",
  in_transit: "In transfer",
  completed: "Completed",
  closed: "Closed / not proceeding",
};

export type CaseRecord = Omit<LeadInput, "consent" | "company_website"> & {
  id: string;
  caseId: string;
  createdAt: string;
  status: CaseStatus;
  consentAt: string;
  quoteValue?: number | null;
  revenue?: number | null;
  internalNotes?: string | null;
  updatedAt?: string;
};
