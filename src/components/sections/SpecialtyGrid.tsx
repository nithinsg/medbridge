"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Baby, Brain, HeartPulse, Microscope, Ribbon, ShieldPlus, Stethoscope, Wind, X } from "lucide-react";
import { specialties, type Specialty } from "@/content/specialties";
import { buttonClasses } from "@/components/ui/Button";

const icons: Record<string, typeof HeartPulse> = {
  cardiac: HeartPulse,
  neurology: Brain,
  pulmonology: Wind,
  trauma: ShieldPlus,
  oncology: Ribbon,
  transplant: Microscope,
  pediatrics: Stethoscope,
  neonatal: Baby,
};

/** Specialty cards that open an accessible native <dialog> with detail. */
export function SpecialtyGrid() {
  const ref = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Specialty | null>(null);

  const open = (s: Specialty) => {
    setCurrent(s);
    ref.current?.showModal();
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {specialties.map((s) => {
          const Icon = icons[s.slug] ?? Stethoscope;
          return (
            <li key={s.slug}>
              <button
                type="button"
                onClick={() => open(s)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col rounded-[var(--radius-card)] bg-white p-5 text-left ring-1 ring-mist-200 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgb(7_19_31/0.45)] hover:ring-navy-300 md:p-6"
              >
                <span className="flex w-full items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist-100 text-navy-700 transition-colors group-hover:bg-aqua-50 group-hover:text-aqua-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-6 text-[17px] font-semibold tracking-tight text-navy-900">{s.name}</span>
                <span className="mt-1.5 text-[14.5px] leading-snug text-ink-muted">{s.short}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={ref}
        onClose={() => setCurrent(null)}
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
        aria-labelledby="specialty-title"
        className="m-auto w-[min(640px,calc(100vw-24px))] max-h-[88dvh] overflow-y-auto rounded-[var(--radius-panel)] bg-white p-0 text-ink shadow-2xl backdrop:bg-navy-950/60 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <div className="p-6 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Specialty transfer</p>
                <h3 id="specialty-title" className="mt-2 text-[28px] font-semibold tracking-tight">
                  {current.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => ref.current?.close()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist-100 hover:bg-mist-200"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-muted">{current.overview}</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">Common reasons</h4>
                <ul className="mt-3 space-y-2 text-[15px] text-ink-muted">
                  {current.commonReasons.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-400" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">What teams plan for</h4>
                <ul className="mt-3 space-y-2 text-[15px] text-ink-muted">
                  {current.planningFocus.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-500" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-7 rounded-xl bg-mist-50 p-4 text-[13.5px] leading-relaxed text-ink-subtle">
              General information only. The treating and receiving clinicians decide whether and how a patient is
              transferred.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={`/request-transfer?specialty=${current.slug}`} className={buttonClasses("primary", "lg")}>
                Request transfer
              </Link>
              <Link href="/for-doctors" className={buttonClasses("secondary", "lg")}>
                Doctor-to-doctor call
              </Link>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
