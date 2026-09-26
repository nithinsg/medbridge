import { INDIA_MAP } from "@/lib/geo/map-data";
import { project } from "@/lib/geo/project";
import { indianHubs } from "@/content/places";

/** Static (server-rendered) India locator with the focus city and other hubs. */
export function LocatorMap({ lat, lon, label }: { lat: number; lon: number; label: string }) {
  const p = project(INDIA_MAP, lat, lon);
  return (
    <div className="overflow-hidden rounded-[var(--radius-panel)] bg-navy-950 ring-1 ring-white/5">
      <svg viewBox={`30 40 ${INDIA_MAP.width - 60} ${INDIA_MAP.height - 60}`} className="block h-auto w-full" role="img" aria-label={`Map of India highlighting ${label}`}>
        <image href="/maps/india-dark.svg" x="0" y="0" width={INDIA_MAP.width} height={INDIA_MAP.height} />
        {indianHubs.map((h) => {
          const q = project(INDIA_MAP, h.lat, h.lon);
          return <circle key={h.id} cx={q.x} cy={q.y} r="4.5" fill="#6e8fae" />;
        })}
        {indianHubs.map((h) => {
          const q = project(INDIA_MAP, h.lat, h.lon);
          if (Math.hypot(q.x - p.x, q.y - p.y) < 4) return null;
          return (
            <line key={`l-${h.id}`} x1={q.x} y1={q.y} x2={p.x} y2={p.y} stroke="#3f6a90" strokeWidth="1.6" className="mb-flow" />
          );
        })}
        <circle cx={p.x} cy={p.y} r="14" fill="#16b3a3" opacity="0.3" className="mb-ring" />
        <circle cx={p.x} cy={p.y} r="6" fill="#7fe3d6" />
        <text x={p.x + 14} y={p.y - 12} fill="#fff" style={{ font: "600 16px var(--font-geist-sans)", paintOrder: "stroke", stroke: "#07131f", strokeWidth: 5 }}>
          {label}
        </text>
      </svg>
      <p className="px-5 pb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-navy-400">Illustrative connections · not a route network</p>
    </div>
  );
}
