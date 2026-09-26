"use client";

import { useId, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { journeySteps } from "@/content/journey";
import { cn } from "@/lib/cn";

/**
 * Interactive six-step transfer journey.
 * Desktop: step rail + detail panel. Mobile: accordion. Keyboard accessible.
 */
const ROW = 64; // px — height of each step row (h-16)

export function JourneyExplorer({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const id = useId();
  const dark = tone === "dark";
  const step = journeySteps[active];

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Desktop */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div role="tablist" aria-orientation="vertical" aria-label="Transfer journey steps" className="relative">
          <span
            aria-hidden="true"
            className={cn("absolute bottom-8 left-[27px] top-8 w-px", dark ? "bg-white/10" : "bg-mist-200")}
          />
          <m.span
            aria-hidden="true"
            className="absolute left-[27px] top-8 w-px bg-aqua-500"
            initial={false}
            animate={{ height: active * ROW }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {journeySteps.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.n}
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    const n = (i + 1) % journeySteps.length;
                    setActive(n);
                    document.getElementById(`${id}-tab-${n}`)?.focus();
                  }
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const n = (i - 1 + journeySteps.length) % journeySteps.length;
                    setActive(n);
                    document.getElementById(`${id}-tab-${n}`)?.focus();
                  }
                }}
                className={cn(
                  "group relative flex h-16 w-full items-center gap-5 rounded-2xl px-2 text-left transition-colors",
                  selected ? (dark ? "bg-white/5" : "bg-white shadow-[0_8px_30px_-18px_rgb(7_19_31/0.4)]") : "",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-[12px] transition-colors",
                    i < active
                      ? "border-aqua-500 bg-aqua-500 text-navy-950"
                      : selected
                        ? "border-aqua-500 bg-navy-950 text-aqua-300"
                        : dark
                          ? "border-white/15 bg-navy-950 text-navy-400"
                          : "border-mist-300 bg-mist-50 text-ink-subtle",
                  )}
                >
                  {i < active ? <Check className="h-4 w-4" aria-hidden="true" /> : s.n}
                </span>
                <span>
                  <span
                    className={cn(
                      "block text-[17px] font-medium tracking-tight",
                      dark ? (selected ? "text-white" : "text-navy-300") : selected ? "text-navy-900" : "text-ink-muted",
                    )}
                  >
                    {s.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          className={cn(
            "relative min-h-[420px] overflow-hidden rounded-[var(--radius-panel)] p-10",
            dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-white ring-1 ring-mist-200",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={step.n}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={cn("font-mono text-[12px] uppercase tracking-[0.14em]", dark ? "text-aqua-300" : "text-aqua-700")}>
                Step {step.n} of 06
              </p>
              <h3 className={cn("mt-3 text-[30px] font-semibold leading-tight tracking-tight", dark && "text-white")}>
                {step.title}
              </h3>
              <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-navy-300" : "text-ink-muted")}>{step.summary}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {step.details.map((d) => (
                  <li
                    key={d}
                    className={cn(
                      "flex gap-3 rounded-xl p-4 text-[15px] leading-snug",
                      dark ? "bg-white/[0.04] text-navy-300" : "bg-mist-50 text-ink-muted",
                    )}
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className={cn("mt-8 border-t pt-5 font-mono text-[12px] uppercase tracking-[0.1em]", dark ? "border-white/10 text-navy-400" : "border-mist-200 text-ink-subtle")}>
                Involved: {step.who}
              </p>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile accordion */}
      <ol className="space-y-3 lg:hidden">
        {journeySteps.map((s, i) => {
          const open = openMobile === i;
          return (
            <li
              key={s.n}
              className={cn(
                "overflow-hidden rounded-2xl",
                dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-white ring-1 ring-mist-200",
              )}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${id}-m-${i}`}
                onClick={() => setOpenMobile(open ? null : i)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[12px]",
                    open ? "bg-aqua-500 text-navy-950" : dark ? "bg-white/10 text-navy-300" : "bg-mist-100 text-ink-muted",
                  )}
                >
                  {s.n}
                </span>
                <span className={cn("flex-1 text-[17px] font-medium", dark ? "text-white" : "text-navy-900")}>{s.title}</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-ink-subtle transition-transform", open && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <m.div
                    id={`${id}-m-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-4 pb-5">
                      <p className={cn("text-[15.5px] leading-relaxed", dark ? "text-navy-300" : "text-ink-muted")}>{s.summary}</p>
                      <ul className="mt-4 space-y-2.5">
                        {s.details.map((d) => (
                          <li key={d} className={cn("flex gap-2.5 text-[15px]", dark ? "text-navy-300" : "text-ink-muted")}>
                            <Check className="mt-1 h-4 w-4 shrink-0 text-aqua-500" aria-hidden="true" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-subtle">{s.who}</p>
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </LazyMotion>
  );
}
