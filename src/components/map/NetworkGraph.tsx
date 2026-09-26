"use client";

import { useState } from "react";
import { Ambulance, Building2, Globe2, HeartHandshake, Plane, Stethoscope, Users } from "lucide-react";
import { cn } from "@/lib/cn";

export const networkNodes = [
  {
    id: "doctors",
    label: "Doctors",
    icon: Stethoscope,
    role: "Referring and receiving physicians",
    flow: "Clinical handovers flow doctor to doctor through the MedBridge desk.",
  },
  {
    id: "hospitals",
    label: "Hospitals",
    icon: Building2,
    role: "Sending and receiving hospitals",
    flow: "Beds, specialists and admission are confirmed before departure.",
  },
  {
    id: "ground",
    label: "Ambulances",
    icon: Ambulance,
    role: "Ground ambulance providers",
    flow: "Ambulances at both ends are synchronised with the flight.",
  },
  {
    id: "air",
    label: "Air operators",
    icon: Plane,
    role: "Air ambulance and charter operators",
    flow: "Operators are selected per case against the MedBridge operator standard.",
  },
  {
    id: "medical",
    label: "Medical teams",
    icon: Users,
    role: "Aeromedical doctors, nurses and paramedics",
    flow: "Teams are matched to the patient's acuity and equipment needs.",
  },
  {
    id: "international",
    label: "International",
    icon: Globe2,
    role: "Overseas hospitals and partners",
    flow: "Repatriation handovers, permits and ground support abroad.",
  },
  {
    id: "assist",
    label: "Insurers & assistance",
    icon: HeartHandshake,
    role: "Insurers, TPAs, assistance companies, corporates",
    flow: "Approvals, guarantees of payment and case reporting.",
  },
] as const;

const R = 190;
const C = 250;

/** Hub-and-spoke visual: MedBridge as the coordination layer between every party in a transfer. */
export function NetworkGraph() {
  const [active, setActive] = useState<string>("doctors");
  const pos = networkNodes.map((n, i) => {
    const a = (i / networkNodes.length) * Math.PI * 2 - Math.PI / 2;
    return { ...n, x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  });
  const current = pos.find((p) => p.id === active)!;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative mx-auto w-full max-w-[560px]">
        <svg viewBox="0 0 500 500" className="h-auto w-full" role="img" aria-label="MedBridge at the centre of a network of doctors, hospitals, ambulances, air operators, medical teams, international partners and insurers.">
          <circle cx={C} cy={C} r={R} fill="none" stroke="#dde5ec" strokeDasharray="2 6" />
          <circle cx={C} cy={C} r={R * 0.55} fill="none" stroke="#edf2f6" />
          {pos.map((p) => (
            <line
              key={`l-${p.id}`}
              x1={C}
              y1={C}
              x2={p.x}
              y2={p.y}
              stroke={p.id === active ? "#16b3a3" : "#c8d4df"}
              strokeWidth={p.id === active ? 2.2 : 1.2}
              className={p.id === active ? "mb-flow" : ""}
            />
          ))}
          {/* Hub */}
          <circle cx={C} cy={C} r="62" fill="#0b1d2e" />
          <circle cx={C} cy={C} r="62" fill="none" stroke="#16b3a3" strokeOpacity="0.4" strokeWidth="1" className="mb-ring" />
          <g transform={`translate(${C - 20} ${C - 30}) scale(1)`}>
            <path d="M5 31C5 5 35 5 35 31" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" fill="none" />
            <circle cx="5" cy="31" r="3.8" fill="#fff" />
            <circle cx="35" cy="31" r="3.8" fill="#16b3a3" />
            <path d="M20 20v10M15 25h10" stroke="#16b3a3" strokeWidth="3.6" strokeLinecap="round" />
          </g>
          <text x={C} y={C + 26} textAnchor="middle" fill="#a3b8cc" style={{ font: "500 9.5px var(--font-geist-mono)", letterSpacing: "0.14em" }}>
            COORDINATION
          </text>
          {pos.map((p) => (
            <g
              key={p.id}
              transform={`translate(${p.x} ${p.y})`}
              onClick={() => setActive(p.id)}
              className="cursor-pointer"
            >
              <circle r="30" fill={p.id === active ? "#16b3a3" : "#ffffff"} stroke={p.id === active ? "#16b3a3" : "#c8d4df"} />
              <foreignObject x="-11" y="-11" width="22" height="22" className="pointer-events-none">
                <p.icon className={cn("h-[22px] w-[22px]", p.id === active ? "text-navy-950" : "text-navy-700")} aria-hidden="true" />
              </foreignObject>
              <text
                y={p.y > C + 10 ? 50 : -42}
                textAnchor="middle"
                fill="#0b1d2e"
                style={{ font: "500 13px var(--font-geist-sans)" }}
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Network participants">
          {networkNodes.map((n) => (
            <button
              key={n.id}
              type="button"
              aria-pressed={active === n.id}
              onClick={() => setActive(n.id)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[14px] font-medium transition-colors",
                active === n.id ? "border-navy-900 bg-navy-900 text-white" : "border-mist-300 bg-white text-ink-muted hover:border-navy-400",
              )}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-mist-200" aria-live="polite">
          <current.icon className="h-7 w-7 text-aqua-600" aria-hidden="true" />
          <h3 className="mt-4 text-[22px] font-semibold tracking-tight">{current.label}</h3>
          <p className="mt-1 text-[15px] font-medium text-navy-500">{current.role}</p>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">{current.flow}</p>
        </div>
      </div>
    </div>
  );
}
