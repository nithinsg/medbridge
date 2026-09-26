import { after, NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { leadInputSchema, type CaseRecord } from "@/lib/leads/schema";
import { createCase } from "@/lib/leads/create";
import { istDateKey } from "@/lib/leads/case-id";
import { notifyNewCase } from "@/lib/notify";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(`lead:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please call or WhatsApp the transfer desk." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadInputSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path.join(".");
      if (!fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    // Honeypot hit: pretend success so bots learn nothing.
    if (fieldErrors.company_website) return NextResponse.json({ ok: true, caseId: `MB-${istDateKey()}-000` });
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  let record: CaseRecord;
  let stored = true;
  try {
    record = await createCase(parsed.data);
  } catch (err) {
    // Storage outage must never lose a patient enquiry: issue an ID, alert the desk loudly.
    console.error("[transfer-requests] store failed", err);
    stored = false;
    const { consent: _c, company_website: _h, ...rest } = parsed.data;
    void _c;
    void _h;
    record = {
      ...rest,
      id: randomUUID(),
      caseId: `MB-${istDateKey()}-X${Math.floor(Math.random() * 900 + 100)}`,
      createdAt: new Date().toISOString(),
      consentAt: new Date().toISOString(),
      status: "new",
      internalNotes: "STORE FAILURE — record only exists in this notification",
    };
  }

  after(() => notifyNewCase(record));

  return NextResponse.json({ ok: true, caseId: record.caseId, stored }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
