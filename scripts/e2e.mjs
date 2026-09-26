// End-to-end checks for the conversion flows. Usage: node scripts/e2e.mjs http://localhost:3001
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3001";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const ok = (cond, msg) => { console.log(`${cond ? "✓" : "✗"} ${msg}`); if (!cond) process.exitCode = 1; };

// 1. Guided intake — all six steps
await page.goto(`${base}/request-transfer`, { waitUntil: "networkidle" });
const pick = async (name) => { const r = page.getByRole("radio", { name, exact: false }).first(); await r.waitFor(); await r.click(); };
const cont = () => page.getByRole("button", { name: "Continue" }).click();
await pick("In India"); await page.fill("#origin", "Guwahati"); await cont();
await pick("A city"); await page.fill("#destination", "Bengaluru"); await cont();
await pick("In ICU"); await cont();
ok(await page.getByText("Not sure? Our medical coordination team").waitFor().then(() => true, () => false), "transfer-type step shows 'Not sure' reassurance");
await pick("Not sure"); await cont();
await page.getByRole("button", { name: "Continue" }).click();
ok(await page.getByText("Please enter your name").isVisible(), "contact step validates required fields");
await page.fill("#name", "E2E Family"); await page.fill("#phone", "+91 98765 43210"); await cont();
await pick("Immediately");
ok(await page.getByText("For urgent transfers, calling is fastest.", { exact: true }).isVisible(), "urgent banner offers a call");
await page.getByRole("button", { name: "Send request" }).click();
ok(await page.getByText("Please confirm so we can contact you").isVisible(), "consent required");
await page.getByRole("checkbox").last().check();
await page.getByRole("button", { name: "Send request" }).click();
await page.getByText("Your request has been received.").waitFor({ timeout: 10000 });
const caseId = await page.locator("p.font-mono").filter({ hasText: /^MB-\d{6}-\d{3}$/ }).first().textContent();
ok(/^MB-\d{6}-\d{3}$/.test(caseId ?? ""), `case ID issued: ${caseId}`);
const wa = await page.getByRole("link", { name: "Continue on WhatsApp" }).getAttribute("href");
ok(wa?.startsWith("https://wa.me/") && decodeURIComponent(wa).includes(caseId), "WhatsApp hand-off carries the case ID");

// 2. Call-back fast lane
await page.goto(`${base}/request-transfer`, { waitUntil: "networkidle" });
await page.getByRole("tab", { name: "Just call me back" }).click();
await page.fill("#cb-name", "E2E Callback"); await page.fill("#cb-phone", "9876543210");
await page.getByRole("checkbox").last().check();
await page.getByRole("button", { name: "Request a call back" }).click();
await page.getByText("Your request has been received.").waitFor({ timeout: 10000 });
ok(true, "call-back request submitted");

// 3. Decision guide reaches a non-diagnostic summary
await page.goto(`${base}/which-air-ambulance`, { waitUntil: "networkidle" });
for (const a of ["In ICU", "High-flow", "Yes", "In India", "Across India", "As soon as possible", "Not yet"]) {
  await pick(a); await page.waitForTimeout(450);
}
ok(await page.getByText("Options your coordinator is likely to discuss").isVisible(), "decision guide shows summary");
ok(await page.getByRole("heading", { name: "ICU air ambulance" }).isVisible(), "ICU option discussed for ventilated patient");
ok(await page.getByText("This is not a recommendation or a medical decision").isVisible(), "non-diagnostic disclaimer present");

// 4. Doctor-to-doctor form
await page.goto(`${base}/for-doctors#doctor-call`, { waitUntil: "networkidle" });
await page.fill("#doctor_call-name", "Dr E2E"); await page.fill("#doctor_call-phone", "+91 90000 00001");
await page.locator("#doctor-call").getByRole("checkbox").check();
await page.getByRole("button", { name: "Request doctor-to-doctor call" }).click();
await page.getByText("Request received.").waitFor({ timeout: 10000 });
ok(true, "doctor-to-doctor request submitted");

// 5. Contact links
await page.goto(base, { waitUntil: "networkidle" });
const tel = await page.locator('nav[aria-label="Emergency contact"] a[href^="tel:"]').getAttribute("href");
const waBar = await page.locator('nav[aria-label="Emergency contact"] a[href*="wa.me"]').getAttribute("href");
ok(/^tel:\+\d{10,}$/.test(tel ?? ""), `sticky bar phone link ${tel}`);
ok(decodeURIComponent(waBar ?? "").includes("I need help arranging a medical transfer"), "family WhatsApp prefill");
await page.goto(`${base}/for-doctors`, { waitUntil: "networkidle" });
const waDoc = await page.locator('a[data-audience="doctor"]').first().getAttribute("href");
ok(decodeURIComponent(waDoc ?? "").includes("I am a doctor"), "doctor WhatsApp prefill");

// 6. Mobile menu
await page.getByRole("button", { name: "Open menu" }).click();
ok(await page.locator("#mobile-menu").isVisible(), "mobile menu opens");
await page.locator("#mobile-menu").getByRole("link", { name: "Air Ambulance" }).click();
await page.waitForURL("**/air-ambulance");
ok(!(await page.locator("#mobile-menu").isVisible()), "mobile menu closes on navigation");

// 7. Admin
const pw = process.env.ADMIN_PASSWORD;
if (pw) {
  await page.goto(`${base}/admin`, { waitUntil: "networkidle" });
  ok(page.url().includes("/admin/login"), "admin redirects to login");
  await page.fill("#password", "wrong"); await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByText("Incorrect password.").waitFor();
  await page.fill("#password", pw); await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(`${base}/admin`);
  ok(await page.getByText(caseId).isVisible(), "new case listed in Command Centre");
  await page.getByRole("link", { name: caseId }).click();
  await page.selectOption("#status", "assessing"); await page.fill("#quoteValue", "450000");
  await page.getByRole("button", { name: "Save" }).click(); await page.waitForTimeout(800);
  await page.goto(`${base}/admin?status=assessing`, { waitUntil: "networkidle" });
  ok(await page.getByText(caseId).isVisible(), "status update persisted");
}
await browser.close();
