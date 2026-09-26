"use client";

import type { ReactNode } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export type Option<V extends string = string> = { value: V; label: string; hint?: string };

/** Large tap-target single-choice list (radio semantics). */
export function OptionList<V extends string>({
  name,
  options,
  value,
  onChange,
  columns = 1,
}: {
  name: string;
  options: Option<V>[];
  value?: V;
  onChange: (v: V) => void;
  columns?: 1 | 2;
}) {
  return (
    <div role="radiogroup" aria-label={name} className={cn("grid gap-2.5", columns === 2 && "sm:grid-cols-2")}>
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              "flex min-h-[60px] w-full items-center gap-4 rounded-2xl border bg-white px-4 py-3.5 text-left transition-[border-color,box-shadow,background-color] duration-200",
              selected
                ? "border-navy-900 shadow-[0_0_0_1px_var(--color-navy-900)]"
                : "border-mist-300 hover:border-navy-400",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                selected ? "border-navy-900 bg-navy-900 text-white" : "border-mist-300",
              )}
            >
              {selected ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
            </span>
            <span className="flex-1">
              <span className="block text-[16.5px] font-medium text-navy-900">{o.label}</span>
              {o.hint ? <span className="mt-0.5 block text-[14px] leading-snug text-ink-subtle">{o.hint}</span> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Progress({ step, total, label }: { step: number; total: number; label?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
        <span>
          Step {step} of {total}
        </span>
        {label ? <span>{label}</span> : null}
      </div>
      <div
        className="mt-3 flex gap-1.5"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label="Progress"
      >
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn("h-1 flex-1 rounded-full transition-colors duration-300", i < step ? "bg-aqua-500" : "bg-mist-200")}
          />
        ))}
      </div>
    </div>
  );
}

export function BackButton({ onClick, children = "Back" }: { onClick: () => void; children?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center gap-1 rounded-[var(--radius-control)] pl-1 pr-3 text-[15px] font-medium text-ink-muted hover:bg-mist-100 hover:text-navy-900"
    >
      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      {children}
    </button>
  );
}

export function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between text-[14.5px] font-medium text-navy-900">
      {children}
      {optional ? <span className="text-[13px] font-normal text-ink-subtle">Optional</span> : null}
    </label>
  );
}

export const inputClass =
  "block h-13 w-full rounded-xl border border-mist-300 bg-white px-4 text-[16.5px] text-navy-900 placeholder:text-ink-subtle/70 transition-[border-color,box-shadow] focus:border-navy-900 focus:outline-none focus:ring-[3px] focus:ring-clinical-100 aria-[invalid=true]:border-coral-500";
