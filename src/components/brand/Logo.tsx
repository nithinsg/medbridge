import { cn } from "@/lib/cn";

/**
 * MedBridge mark: origin node → bridge arch → destination node,
 * with a medical cross sheltered beneath the arch.
 * Works from 16px favicon to aircraft livery. Source of truth for the logo.
 */
export function LogoMark({
  className,
  tone = "default",
  title,
}: {
  className?: string;
  tone?: "default" | "inverse" | "mono";
  title?: string;
}) {
  const arch = tone === "inverse" ? "#ffffff" : tone === "mono" ? "currentColor" : "var(--color-navy-900)";
  const accent = tone === "mono" ? "currentColor" : "var(--color-aqua-500)";
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="M5 31C5 5 35 5 35 31" stroke={arch} strokeWidth="3.6" strokeLinecap="round" />
      <circle cx="5" cy="31" r="3.8" fill={arch} />
      <circle cx="35" cy="31" r="3.8" fill={accent} />
      <path d="M20 20v10M15 25h10" stroke={accent} strokeWidth="3.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "default",
  descriptor,
}: {
  className?: string;
  tone?: "default" | "inverse";
  /** Optional division descriptor, e.g. "Aviation" → MEDBRIDGE AVIATION */
  descriptor?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8 shrink-0" tone={tone} />
      <span
        className={cn(
          "text-[15px] font-semibold tracking-[0.16em]",
          tone === "inverse" ? "text-white" : "text-navy-900",
        )}
      >
        MEDBRIDGE
        {descriptor ? (
          <span className={cn("ml-2 font-medium", tone === "inverse" ? "text-aqua-300" : "text-aqua-700")}>
            {descriptor.toUpperCase()}
          </span>
        ) : null}
      </span>
    </span>
  );
}
