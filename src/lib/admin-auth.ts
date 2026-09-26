import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Minimal single-password admin auth for the MVP dashboard.
 * Set ADMIN_PASSWORD (and optionally ADMIN_SECRET) in the environment.
 * Phase 2 replaces this with Supabase Auth + per-user roles.
 */
const COOKIE = "mb_admin";
const TTL_S = 60 * 60 * 12;

export function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  // Local development only — never in production.
  return process.env.NODE_ENV === "development" ? "medbridge-dev" : null;
}

const secret = () => process.env.ADMIN_SECRET ?? `mb:${adminPassword() ?? ""}`;

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function createSession() {
  const exp = Math.floor(Date.now() / 1000) + TTL_S;
  const payload = `admin.${exp}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: TTL_S,
  });
}

export async function destroySession() {
  (await cookies()).set(COOKIE, "", { path: "/admin", maxAge: 0 });
}

export async function isAdmin() {
  if (!adminPassword()) return false;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [who, exp, sig] = raw.split(".");
  if (who !== "admin" || !exp || !sig) return false;
  if (Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, sign(`${who}.${exp}`));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
