// QA sweep: every route → status, console errors, one <h1>, axe (serious/critical), meta.
// Usage: node scripts/qa.mjs http://localhost:3001 [outDir]
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.argv[2] ?? "http://localhost:3001";
const out = process.argv[3];
const sm = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
paths.push("/admin/login", "/does-not-exist");

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium" });
let failures = 0;
for (const vp of [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  for (const p of paths) {
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && !/TUNNEL|Failed to load resource|_vercel\/insights/.test(m.text()) && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push(String(e)));
    page.on("response", (r) => r.status() >= 400 && !r.url().includes("/_vercel/") && r.url() !== base + p && errs.push(`HTTP ${r.status()} ${r.url()}`));
    const res = await page.goto(base + p, { waitUntil: "networkidle" });
    const status = res?.status();
    const h1 = await page.locator("h1").count();
    const title = await page.title();
    const desc = await page.locator('meta[name="description"]').getAttribute("content").catch(() => null);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href").catch(() => null);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    let axe = [];
    if (vp.name === "desktop" || p === "/" || p === "/request-transfer") {
      const r = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
      axe = r.violations.filter((v) => ["serious", "critical"].includes(v.impact)).map((v) => `${v.id}(${v.nodes.length}): ${v.nodes[0]?.target}`);
    }
    const expected404 = p === "/does-not-exist";
    const bad = (expected404 ? status !== 404 : status !== 200) || h1 !== 1 || errs.length || axe.length || overflow || (!expected404 && !p.startsWith("/admin") && (!desc || !canonical));
    if (bad) failures++;
    console.log(`${bad ? "✗" : "✓"} [${vp.name}] ${p} ${status} h1=${h1}${overflow ? " OVERFLOW" : ""}${!desc ? " NO-DESC" : ""}${!canonical ? " NO-CANON" : ""} ${title.slice(0, 60)}`);
    errs.forEach((e) => console.log("   console:", e.slice(0, 200)));
    axe.forEach((a) => console.log("   axe:", a.slice(0, 200)));
    if (out) await page.screenshot({ path: `${out}/${vp.name}${p.replace(/\//g, "_") || "_home"}.png` });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} page checks failed` : "\nAll page checks passed");
