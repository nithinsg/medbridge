import { Ambulance, Building2, Hospital, Plane, PlaneLanding, PlaneTakeoff } from "lucide-react";

const legs = [
  { icon: Hospital, label: "Referring hospital", sub: "Clinical handover" },
  { icon: Ambulance, label: "Ground ambulance", sub: "To the airport" },
  { icon: PlaneTakeoff, label: "Departure", sub: "Airside transfer" },
  { icon: Plane, label: "Air ambulance", sub: "Medical team on board" },
  { icon: PlaneLanding, label: "Arrival", sub: "Ambulance waiting" },
  { icon: Building2, label: "Receiving hospital", sub: "Bedside admission" },
];

/** Horizontal bed-to-bed chain — the MedBridge standard, visualised. */
export function BedToBedStrip() {
  return (
    <section aria-labelledby="b2b" className="bg-white py-16 md:py-24">
      <div className="container-page">
        <p className="eyebrow">Bed-to-bed</p>
        <h2 id="b2b" className="display mt-3 max-w-2xl text-[32px] md:text-[44px]">
          Every leg arranged before the patient leaves.
        </h2>
        <ol className="relative mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          <span aria-hidden="true" className="route-line absolute left-[6%] right-[6%] top-7 hidden h-0.5 lg:block" />
          {legs.map((l, i) => (
            <li key={l.label} className="relative flex flex-col items-center px-2 text-center">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-aqua-300 ring-8 ring-white">
                <l.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-4 font-mono text-[11px] text-ink-subtle">0{i + 1}</span>
              <span className="mt-1 text-[15.5px] font-semibold tracking-tight">{l.label}</span>
              <span className="mt-0.5 text-[14px] text-ink-muted">{l.sub}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
