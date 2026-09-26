"use client";

import { useEffect, useRef, useState } from "react";
import { INDIA_MAP } from "@/lib/geo/map-data";
import { arcPath, project, type Pt } from "@/lib/geo/project";
import { AircraftGlyph } from "@/components/icons/Aircraft";
import { cn } from "@/lib/cn";

/**
 * "We coordinate the entire journey" — an illustrative bed-to-bed transfer:
 * referring hospital → ground ambulance → airport → air ambulance →
 * destination → receiving hospital. The timeline lights up in sync.
 * Pure SVG + one rAF loop that writes to refs (no per-frame React renders).
 */

const STOPS = ["Patient", "Ground ambulance", "Airport", "Air ambulance", "Destination", "Hospital"] as const;
// Progress thresholds (0–1) at which each stop becomes active.
const T = { ground1: 0.06, airport: 0.16, flight: 0.22, dest: 0.8, hospital: 0.92 };
const CYCLE_MS = 12500;
const ACTIVE_SPAN = 0.9; // remainder of the cycle holds on "Hospital"

const W = INDIA_MAP.width;
const H = INDIA_MAP.height;
const origin = project(INDIA_MAP, 26.14, 91.74); // Guwahati (illustrative)
const dest = project(INDIA_MAP, 17.39, 78.49); // Hyderabad (illustrative)
const originHosp: Pt = { x: origin.x + 26, y: origin.y - 30 };
const destHosp: Pt = { x: dest.x - 34, y: dest.y + 26 };
const f = (n: number) => Math.round(n * 10) / 10;
const G1 = `M${f(originHosp.x)} ${f(originHosp.y)}Q${f(origin.x + 30)} ${f(origin.y - 4)} ${f(origin.x)} ${f(origin.y)}`;
const FLIGHT = arcPath(origin, dest, 0.2);
const G2 = `M${f(dest.x)} ${f(dest.y)}Q${f(dest.x - 6)} ${f(dest.y + 26)} ${f(destHosp.x)} ${f(destHosp.y)}`;

function stopIndex(t: number) {
  if (t < T.ground1) return 0;
  if (t < T.airport) return 1;
  if (t < T.flight) return 2;
  if (t < T.dest) return 3;
  if (t < T.hospital) return 4;
  return 5;
}

export function HeroJourney({ className }: { className?: string }) {
  const g1 = useRef<SVGPathElement>(null);
  const fl = useRef<SVGPathElement>(null);
  const g2 = useRef<SVGPathElement>(null);
  const g1Prog = useRef<SVGPathElement>(null);
  const flProg = useRef<SVGPathElement>(null);
  const g2Prog = useRef<SVGPathElement>(null);
  const ground = useRef<SVGGElement>(null);
  const air = useRef<SVGGElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const paths = [g1.current, fl.current, g2.current];
    const progs = [g1Prog.current, flProg.current, g2Prog.current];
    if (paths.some((p) => !p) || progs.some((p) => !p) || !ground.current || !air.current) return;
    const lens = paths.map((p) => p!.getTotalLength());
    // Progress strokes use pathLength=1, so the offset is simply 1 - progress.
    const setProg = (i: number, v: number) => {
      progs[i]!.style.strokeDashoffset = `${1 - Math.min(1, Math.max(0, v))}`;
    };
    const place = (el: SVGGElement, p: DOMPoint, angle = 0) => {
      el.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
    };

    let lastStop = -1;
    const render = (t: number) => {
      const seg = (a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a)));
      const s1 = seg(T.ground1, T.airport);
      const s2 = seg(T.flight, T.dest);
      const s3 = seg(T.dest, T.hospital);
      setProg(0, s1);
      setProg(1, s2);
      setProg(2, s3);

      const inFlight = t >= T.airport && t < T.dest;
      ground.current!.style.opacity = inFlight ? "0" : "1";
      air.current!.style.opacity = inFlight ? "1" : "0";

      if (inFlight) {
        const L = lens[1] * s2;
        const p = paths[1]!.getPointAtLength(L);
        const q = paths[1]!.getPointAtLength(Math.min(lens[1], L + 1));
        const angle = s2 >= 1 ? 0 : (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
        place(air.current!, p, angle || 135);
      } else if (t < T.dest) {
        place(ground.current!, paths[0]!.getPointAtLength(lens[0] * s1));
      } else {
        place(ground.current!, paths[2]!.getPointAtLength(lens[2] * s3));
      }

      const idx = stopIndex(t);
      if (idx !== lastStop) {
        lastStop = idx;
        setActive(idx);
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      render(0.5);
      return;
    }

    let raf = 0;
    let visible = true;
    let start = performance.now();
    let pausedAt = 0;
    const loop = (now: number) => {
      const elapsed = (now - start) % CYCLE_MS;
      const t = Math.min(1, elapsed / CYCLE_MS / ACTIVE_SPAN);
      render(t);
      raf = requestAnimationFrame(loop);
    };
    let started = false;
    const play = () => {
      started = true;
      if (raf || !visible || document.hidden) return;
      start += pausedAt ? performance.now() - pausedAt : 0;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      pausedAt = performance.now();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!started) return;
      if (visible && !document.hidden) play();
      else pause();
    });
    if (root.current) io.observe(root.current);
    const onVis = () => {
      if (!started) return;
      if (document.hidden || !visible) pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVis);
    // Start once the page is idle so the animation never competes with first paint / hydration.
    render(0);
    const idle = "requestIdleCallback" in window;
    const startTimer = idle ? window.requestIdleCallback(play, { timeout: 1500 }) : window.setTimeout(play, 800);
    return () => {
      if (idle) window.cancelIdleCallback(startTimer);
      else window.clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={root}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-panel)] bg-navy-950 ring-1 ring-white/5 shadow-[0_40px_80px_-40px_rgb(7_19_31/0.6)]",
        className,
      )}
    >
      <div className="flex items-center justify-between px-5 pt-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-navy-400 sm:px-6">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" aria-hidden="true" />
          Bed-to-bed · illustrative
        </span>
        <span className="tabular-nums text-navy-300">GAU → HYD</span>
      </div>

      <svg
        viewBox={`20 40 ${W - 40} ${H - 70}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Illustration: a patient is moved from a referring hospital by ground ambulance to the airport, flown by air ambulance, then taken by ground ambulance to the receiving hospital."
      >
        <defs>
          <radialGradient id="mb-fade" cx="0.45" cy="0.55" r="0.62">
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="mb-map-mask">
            <rect x="0" y="0" width={W} height={H} fill="url(#mb-fade)" />
          </mask>
        </defs>
        <image href="/maps/india-dark.svg" x="0" y="0" width={W} height={H} mask="url(#mb-map-mask)" />

        {/* Base routes */}
        <path d={G1} stroke="#3f6a90" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" fill="none" />
        <path d={FLIGHT} stroke="#3f6a90" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" fill="none" />
        <path d={G2} stroke="#3f6a90" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" fill="none" />

        {/* Measurement paths (invisible) + progress strokes */}
        <path ref={g1} d={G1} fill="none" stroke="none" />
        <path ref={fl} d={FLIGHT} fill="none" stroke="none" />
        <path ref={g2} d={G2} fill="none" stroke="none" />
        <path ref={g1Prog} d={G1} stroke="#7fe3d6" strokeWidth="2.5" strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="1 2" strokeDashoffset="1" />
        <path ref={flProg} d={FLIGHT} stroke="url(#mb-flight)" strokeWidth="3" strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="1 2" strokeDashoffset="1" />
        <path ref={g2Prog} d={G2} stroke="#7fe3d6" strokeWidth="2.5" strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="1 2" strokeDashoffset="1" />
        <defs>
          <linearGradient id="mb-flight" x1={origin.x} y1={origin.y} x2={dest.x} y2={dest.y} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3fd0be" />
            <stop offset="1" stopColor="#7fe3d6" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        <Node p={originHosp} label="Referring hospital" sub="Guwahati" anchor="end" dx={-18} dy={-4} kind="hospital" />
        <Node p={origin} label="Airport" anchor="start" dx={12} dy={18} kind="airport" />
        <Node p={dest} label="Airport" anchor="start" dx={12} dy={-8} kind="airport" />
        <Node p={destHosp} label="Receiving hospital" sub="Hyderabad" anchor="start" dx={14} dy={16} kind="hospital" highlight />

        {/* Vehicles */}
        <g ref={ground} style={{ transition: "opacity .25s" }} transform={`translate(${f(originHosp.x)} ${f(originHosp.y)})`}>
          <circle r="9" fill="#16b3a3" opacity="0.25" />
          <circle r="5" fill="#7fe3d6" />
        </g>
        <g ref={air} style={{ opacity: 0, transition: "opacity .25s" }} transform={`translate(${f(origin.x)} ${f(origin.y)})`}>
          <circle r="16" fill="#16b3a3" opacity="0.14" />
          <AircraftGlyph fill="#ffffff" scale={1.35} />
        </g>
      </svg>

      {/* Synced timeline */}
      <div className="border-t border-white/5 px-5 pb-5 pt-4 sm:px-6">
        <ol className="grid grid-cols-6 gap-1.5" aria-label="Journey stages">
          {STOPS.map((s, i) => (
            <li key={s} className="min-w-0">
              <span
                className={cn(
                  "block h-1 rounded-full transition-colors duration-500",
                  i <= active ? "bg-aqua-400" : "bg-white/10",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "mt-2 hidden font-mono text-[10px] uppercase leading-tight tracking-[0.08em] transition-colors duration-500 sm:block",
                  i === active ? "text-white" : "text-navy-400",
                )}
              >
                {s}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white sm:hidden" aria-live="off">
          {String(active + 1).padStart(2, "0")} · {STOPS[active]}
        </p>
      </div>
    </div>
  );
}

function Node({
  p,
  label,
  sub,
  anchor,
  dx,
  dy,
  kind,
  highlight,
}: {
  p: Pt;
  label: string;
  sub?: string;
  anchor: "start" | "end";
  dx: number;
  dy: number;
  kind: "hospital" | "airport";
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${f(p.x)} ${f(p.y)})`}>
      {kind === "hospital" ? (
        <>
          <circle r="11" fill={highlight ? "#16b3a3" : "#2a5073"} opacity="0.25" className="mb-ring" />
          <rect x="-7" y="-7" width="14" height="14" rx="3.5" fill={highlight ? "#16b3a3" : "#e8eef4"} />
          <path d="M0 -3.6v7.2M-3.6 0h7.2" stroke={highlight ? "#07131f" : "#0b1d2e"} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle r="5" fill="#07131f" stroke="#6e8fae" strokeWidth="2" />
        </>
      )}
      <text
        x={dx}
        y={dy}
        textAnchor={anchor}
        className="fill-white"
        style={{ font: "500 15px var(--font-geist-sans)", letterSpacing: "-0.01em" }}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={dx}
          y={dy + 16}
          textAnchor={anchor}
          style={{ font: "400 11.5px var(--font-geist-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}
          fill="#6e8fae"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}
