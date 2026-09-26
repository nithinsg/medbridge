"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminPassword, createSession, destroySession, requireAdmin, safeEqual } from "@/lib/admin-auth";
import { getStore } from "@/lib/leads/store";
import { CASE_STATUSES, type CaseStatus } from "@/lib/leads/schema";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function login(_prev: { error?: string } | undefined, form: FormData) {
  const expected = adminPassword();
  if (!expected) return { error: "Admin is disabled: set ADMIN_PASSWORD in the environment." };
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!rateLimit(`admin:${ip}`, 8, 15 * 60 * 1000)) return { error: "Too many attempts. Try again later." };
  const given = String(form.get("password") ?? "");
  if (!safeEqual(given, expected)) return { error: "Incorrect password." };
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function updateCase(form: FormData) {
  await requireAdmin();
  const caseId = String(form.get("caseId") ?? "");
  const status = String(form.get("status") ?? "") as CaseStatus;
  const num = (k: string) => {
    const v = String(form.get(k) ?? "").replace(/[^\d.]/g, "");
    return v ? Number(v) : null;
  };
  if (!CASE_STATUSES.includes(status)) return;
  await getStore().update(caseId, {
    status,
    quoteValue: num("quoteValue"),
    revenue: num("revenue"),
    internalNotes: String(form.get("internalNotes") ?? "").slice(0, 4000) || null,
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/cases/${caseId}`);
}
