"use client";

import { useState } from "react";
import { WORLD_MAP } from "@/lib/geo/map-data";
import { arcPath, project } from "@/lib/geo/project";
import { hubById, repatriationOrigins } from "@/content/places";
import { AircraftGlyph } from "@/components/icons/Aircraft";
import { cn } from "@/lib/cn";

const routes = repatriationOrigins.map((o) => {
  const from = project(WORLD_MAP, o.lat, o.lon);
  const hub = hubById(o.to);
  const to = project(WORLD_MAP, hub.lat, hub.lon);
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  return { ...o, hub, from, to, d: arcPath(from, to, dist > 300 ? 0.18 : 0.3), dist };
});

const india = project(WORLD_MAP, 21, 79);

/** Global repatriation map: dotted world, illustrative routes into India, selectable origin. */
export function RepatriationMap({ compact = false, initial = "sin" }: { compact?: boolean; initial?: string }) {
  const [selected, setSelected] = useState(initial);
  const sel = routes.find((r) => r.id === selected) ?? routes[0];
  // Duration scales with distance so long-haul visibly takes longer.
  const dur = `${Math.max(3.5, sel.dist / 90).toFixed(1)}s`;

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-navy-950 ring-1 ring-white/5">
        <svg
          viewBox={`0 0 ${WORLD_MAP.width} ${WORLD_MAP.height}`}
          className="block h-auto w-full"
          role="img"
          aria-label={`Illustrative medical repatriation route from ${sel.name} to ${sel.hub.name}, India.`}
        >
          <image href="/maps/world-dark.svg" x="0" y="0" width={WORLD_MAP.width} height={WORLD_MAP.height} />
          {/* India glow */}
          <circle cx={india.x} cy={india.y} r="46" fill="url(#mb-india-glow)" />
          <defs>
            <radialGradient id="mb-india-glow">
              <stop offset="0" stopColor="#16b3a3" stopOpacity="0.35" />
              <stop offset="1" stopColor="#16b3a3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {routes.map((r) => (
            <path
              key={r.id}
              d={r.d}
              fill="none"
              stroke={r.id === sel.id ? "#3fd0be" : "#2f5578"}
              strokeWidth={r.id === sel.id ? 2.4 : 1.3}
              strokeLinecap="round"
              className={r.id === sel.id ? "" : "mb-flow"}
              opacity={r.id === sel.id ? 1 : 0.8}
            />
          ))}

          {routes.map((r) => (
            <g key={`n-${r.id}`} transform={`translate(${r.from.x} ${r.from.y})`}>
              {r.id === sel.id ? <circle r="10" fill="#16b3a3" opacity="0.3" className="mb-ring" /> : null}
              <circle r={r.id === sel.id ? 4.5 : 3} fill={r.id === sel.id ? "#7fe3d6" : "#6e8fae"} />
            </g>
          ))}

          {/* Selected route labels */}
          <g transform={`translate(${sel.from.x} ${sel.from.y})`}>
            <text
              y={-14}
              textAnchor="middle"
              fill="#fff"
              style={{ font: "500 13px var(--font-geist-sans)", paintOrder: "stroke", stroke: "#07131f", strokeWidth: 4 }}
            >
              {sel.name}
            </text>
          </g>
          <g transform={`translate(${sel.to.x} ${sel.to.y})`}>
            <circle r="10" fill="#16b3a3" opacity="0.3" className="mb-ring" />
            <circle r="4.5" fill="#fff" />
            <text
              y={22}
              textAnchor="middle"
              fill="#7fe3d6"
              style={{ font: "500 11px var(--font-geist-mono)", letterSpacing: "0.08em", paintOrder: "stroke", stroke: "#07131f", strokeWidth: 4 }}
            >
              {sel.hub.name.toUpperCase()}
            </text>
          </g>

          {/* Aircraft along the selected route (SMIL — scales with the viewBox, no JS loop) */}
          <g key={sel.id}>
            <g>
              <AircraftGlyph fill="#ffffff" scale={1.1} />
              <animateMotion dur={dur} repeatCount="indefinite" rotate="auto" path={sel.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" />
            </g>
          </g>
        </svg>
        <p className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-navy-400">
          Illustrative routes · not flight plans
        </p>
      </div>

      <div className={cn("mt-5 flex flex-wrap gap-2", compact && "justify-center")} role="group" aria-label="Choose an origin">
        {routes.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={r.id === sel.id}
            onClick={() => setSelected(r.id)}
            className={cn(
              "rounded-full border px-3.5 py-2 text-[14px] font-medium transition-colors",
              r.id === sel.id
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-mist-300 bg-white text-ink-muted hover:border-navy-400 hover:text-navy-900",
            )}
          >
            {r.name}
          </button>
        ))}
      </div>
      {!compact ? (
        <p className="mt-4 text-[15px] text-ink-muted">
          <span className="font-medium text-navy-900">{sel.name}</span> ({sel.region}) → India ·{" "}
          <span className="font-mono text-[13px] uppercase tracking-wider">{sel.typical}</span>. Aircraft, medical crew,
          permits and the receiving hospital in India are all confirmed before departure.
        </p>
      ) : null}
    </div>
  );
}
