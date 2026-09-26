"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, TriangleAlert } from "lucide-react";
import {
  complexities,
  estimate,
  formatINR,
  modes,
  routeBands,
  type Complexity,
  type Mode,
  type RouteBand,
} from "@/content/pricing";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";

function Segmented<V extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: V; label: string; hint?: string }[];
  value: V;
  onChange: (v: V) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[14.5px] font-medium text-navy-900">{label}</legend>
      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition-colors",
              value === o.value ? "border-navy-900 bg-white shadow-[0_0_0_1px_var(--color-navy-900)]" : "border-mist-300 bg-white hover:border-navy-400",
            )}
          >
            <input
              type="radio"
              name={label}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-1 h-4 w-4 accent-navy-900"
            />
            <span>
              <span className="block text-[15px] font-medium text-navy-900">{o.label}</span>
              {o.hint ? <span className="block text-[13px] text-ink-subtle">{o.hint}</span> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CostEstimator() {
  const [route, setRoute] = useState<RouteBand>("long");
  const [mode, setMode] = useState<Mode>("fixed_wing");
  const [complexity, setComplexity] = useState<Complexity>("monitoring");
  const [urgent, setUrgent] = useState(false);
  const [ground, setGround] = useState(true);
  const result = useMemo(() => estimate({ route, mode, complexity, urgent, ground }), [route, mode, complexity, urgent, ground]);
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      return;
    }
    const t = window.setTimeout(() => track("estimate_generated", { route, mode, complexity, urgent }), 800);
    return () => window.clearTimeout(t);
  }, [route, mode, complexity, urgent]);

  const requestHref = `/request-transfer?${new URLSearchParams({
    from: route.startsWith("intl") ? "international" : "india",
    ...(mode === "fixed_wing" || mode === "helicopter" ? { transport: "air" } : mode === "commercial_escort" ? { transport: "escort" } : {}),
    ...(urgent ? { urgency: "immediately" } : { urgency: "planning" }),
  }).toString()}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      <div className="space-y-7 rounded-[var(--radius-panel)] bg-mist-50 p-5 ring-1 ring-mist-200 sm:p-8">
        <Segmented label="Distance" options={routeBands} value={route} onChange={setRoute} />
        <Segmented label="Transport" options={modes} value={mode} onChange={setMode} />
        <Segmented label="Medical complexity" options={complexities} value={complexity} onChange={setComplexity} />
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          <label className="flex items-center gap-3 text-[15px] text-navy-900">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="h-5 w-5 accent-navy-900" />
            Needed immediately
          </label>
          {mode !== "ground" ? (
            <label className="flex items-center gap-3 text-[15px] text-navy-900">
              <input type="checkbox" checked={ground} onChange={(e) => setGround(e.target.checked)} className="h-5 w-5 accent-navy-900" />
              Include ground ambulances at both ends
            </label>
          ) : null}
        </div>
      </div>

      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-[var(--radius-panel)] bg-navy-950 p-6 text-navy-300 sm:p-8" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400">Indicative range</p>
          {result?.unavailable ? (
            <p className="mt-4 text-[18px] leading-snug text-white">{result.unavailable}</p>
          ) : result ? (
            <p className="mt-3 text-[40px] font-semibold leading-none tracking-tight text-white tabular-nums sm:text-[46px]">
              {formatINR(result.low)}
              <span className="text-navy-400"> – </span>
              {formatINR(result.high)}
            </p>
          ) : null}
          {result?.caution ? (
            <p className="mt-4 flex gap-2.5 rounded-xl bg-warning-500/10 p-3 text-[14px] leading-snug text-warning-50">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning-500" aria-hidden="true" />
              {result.caution}
            </p>
          ) : null}
          <p className="mt-5 flex gap-2.5 text-[13.5px] leading-relaxed">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" aria-hidden="true" />
            An indicative range only — not a quote. Final pricing requires a case assessment and operator confirmation,
            and depends on aircraft positioning, airport charges and taxes.
          </p>
          <Link href={requestHref} className={buttonClasses("accent", "lg", "mt-7 w-full")} data-placement="estimator">
            Get a transfer estimate
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-3 text-center text-[13px] text-navy-400">A coordinator will confirm options and a firm quote.</p>
        </div>
      </div>
    </div>
  );
}
