import { ShieldAlert } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { clinicalBoundary } from "@/content/trust";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { DecisionGuide } from "@/components/tools/DecisionGuide";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "Which Air Ambulance Do I Need? — Transfer Options Guide",
  description:
    "Answer seven simple questions to understand which medical transfer options a coordinator is likely to discuss — ICU air ambulance, fixed-wing, medical escort, stretcher or ground. Guidance, not diagnosis.",
  path: "/which-air-ambulance",
});

export default function WhichAirAmbulancePage() {
  return (
    <>
      <section className="bg-mist-50">
        <div className="container-page pb-16 pt-8 md:pb-24 md:pt-10">
          <Breadcrumbs items={[{ name: "Air Ambulance", path: "/air-ambulance" }, { name: "Which do I need?", path: "/which-air-ambulance" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <p className="eyebrow">Transfer options guide</p>
              <h1 className="display mt-4 text-[38px] sm:text-[48px] lg:text-[56px]">Which air ambulance do I need?</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                Seven simple questions. At the end, we&apos;ll show which options a MedBridge coordinator is likely to
                discuss with the patient&apos;s doctors — and what they will assess.
              </p>
              <div className="mt-8 flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-mist-200">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning-500" aria-hidden="true" />
                <p className="text-[14.5px] leading-relaxed text-ink-muted">
                  <strong className="font-semibold text-navy-900">This is not a diagnostic tool.</strong> It does not
                  decide fitness to fly or recommend a treatment. {clinicalBoundary}
                </p>
              </div>
            </div>
            <DecisionGuide />
          </div>
        </div>
      </section>
      <CtaBand placement="decision_final" title="Rather talk it through?" body="A coordinator can walk you through the options in a few minutes — at any hour." />
    </>
  );
}
