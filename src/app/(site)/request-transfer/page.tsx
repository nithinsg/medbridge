import { Suspense } from "react";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { CallButton, WhatsAppButton } from "@/components/ui/ContactActions";
import { IntakeFlow } from "@/components/forms/IntakeFlow";

export const metadata = pageMetadata({
  title: "Request a Medical Transfer",
  description:
    "Request an air ambulance, medical repatriation or hospital transfer. Six short questions — a MedBridge medical coordinator will contact you. Or call the 24/7 transfer desk.",
  path: "/request-transfer",
});

const next = [
  { t: "A coordinator reviews your request", d: "You'll receive a Case ID straight away." },
  { t: "We call you back", d: "To understand the situation and speak with the treating doctor." },
  { t: "Options and an estimate", d: "Transport options, receiving hospital and costs — explained plainly." },
  { t: "We coordinate the transfer", d: "Bed to bed, with one point of contact throughout." },
];

export default function RequestTransferPage() {
  return (
    <section className="bg-mist-50">
      <div className="container-page pb-16 pt-8 md:pb-24 md:pt-10">
        <Breadcrumbs items={[{ name: "Request transfer", path: "/request-transfer" }]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow">Request medical transfer</p>
            <h1 className="display mt-3 text-[36px] sm:text-[44px] lg:text-[52px]">Tell us about the patient.</h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-muted">
              Six short questions, about a minute. &ldquo;Not sure&rdquo; is always a valid answer — that&apos;s what
              our coordinators are for.
            </p>
            <div className="mt-8">
              <Suspense fallback={<div className="h-[560px] animate-pulse rounded-[var(--radius-panel)] bg-white ring-1 ring-mist-200" />}>
                <IntakeFlow />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[var(--radius-card)] bg-navy-950 p-6 text-navy-300 md:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400">Prefer to talk?</p>
              <p className="mt-2 text-[22px] font-semibold tabular-nums text-white">{site.contact.deskPhoneDisplay}</p>
              <p className="mt-1 text-[14.5px]">24/7 transfer desk. For urgent transfers, calling is fastest.</p>
              <div className="mt-5 grid gap-2.5">
                <CallButton placement="intake_aside" variant="inverse" size="md" label="Call now" />
                <WhatsAppButton placement="intake_aside" variant="outline-inverse" size="md" />
              </div>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-mist-200 md:p-7">
              <h2 className="text-[17px] font-semibold tracking-tight">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {next.map((n, i) => (
                  <li key={n.t} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist-100 font-mono text-[11px] text-navy-700">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[15px] font-medium text-navy-900">{n.t}</p>
                      <p className="mt-0.5 text-[14px] leading-snug text-ink-muted">{n.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className="px-1 text-[13px] leading-relaxed text-ink-subtle">
              In a life-threatening emergency, call <a href="tel:112" className="font-medium underline">112</a> or your
              local ambulance service first.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
