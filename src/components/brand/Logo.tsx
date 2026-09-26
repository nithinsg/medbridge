import { cn } from "@/lib/cn";

/**
 * MedBridge mark: origin node → bridge arch → destination node,
 * with a medical cross sheltered beneath the arch.
 * Works from 16px favicon to aircraft livery. Source of truth for the logo.
 */
const ARCH = "M5 31C5 5 35 5 35 31";
/** One flight cycle: take-off at A, land at B, short pause, repeat. */
const CYCLE = "4.2s";

export function LogoMark({
  className,
  tone = "default",
  title,
  animated = false,
}: {
  className?: string;
  tone?: "default" | "inverse" | "mono";
  title?: string;
  /** An aircraft flies the arch from origin (A) to destination (B). Static under reduced motion. */
  animated?: boolean;
}) {
  const arch = tone === "inverse" ? "#ffffff" : tone === "mono" ? "currentColor" : "var(--color-navy-900)";
  const accent = tone === "mono" ? "currentColor" : "var(--color-aqua-500)";
  const plane = tone === "inverse" ? "#ffffff" : tone === "mono" ? "currentColor" : "var(--color-navy-900)";
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      {title ? <title>{title}</title> : null}
      <path d={ARCH} stroke={arch} strokeWidth="3.6" strokeLinecap="round" />
      <circle cx="5" cy="31" r="3.8" fill={arch} />
      <circle cx="35" cy="31" r="3.8" fill={accent} />
      <path d="M20 20v10M15 25h10" stroke={accent} strokeWidth="3.6" strokeLinecap="round" />

      {animated ? (
        <g className="mb-logo-flight">
          {/* Aqua trail drawn behind the aircraft, then fades before the next departure */}
          <path d={ARCH} stroke={accent} strokeWidth="3.6" strokeLinecap="round" pathLength={1} strokeDasharray="1 2" strokeDashoffset="1">
            <animate attributeName="stroke-dashoffset" values="1;1;0;0" keyTimes="0;0.06;0.62;1" dur={CYCLE} repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.45 0 0.3 1;0 0 1 1" />
            <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.7;0.9;1" dur={CYCLE} repeatCount="indefinite" />
          </path>
          {/* Landing pulse at the destination */}
          <circle cx="35" cy="31" r="3.8" stroke={accent} strokeWidth="1.6" opacity="0">
            <animate attributeName="r" values="3.8;3.8;10;10" keyTimes="0;0.62;0.86;1" dur={CYCLE} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.9;0;0" keyTimes="0;0.62;0.86;1" dur={CYCLE} repeatCount="indefinite" />
          </circle>
          {/* The aircraft, riding the arch nose-first */}
          <g opacity="0">
            <path
              fill={plane}
              stroke={tone === "inverse" ? "var(--color-navy-950)" : "#ffffff"}
              strokeWidth="0.9"
              paintOrder="stroke"
              strokeLinejoin="round"
              transform="scale(0.64)"
              d="M9 0c0-.9-.7-1.4-1.6-1.4H3.2L-1.8-8.6h-2.1l2.4 7.2h-4.3l-1.7-2.3h-1.6l1 3.7-1 3.7h1.6l1.7-2.3h4.3l-2.4 7.2h2.1L3.2 1.4h4.2C8.3 1.4 9 .9 9 0Z"
            />
            <animateMotion path={ARCH} dur={CYCLE} repeatCount="indefinite" rotate="auto" keyPoints="0;0;1;1" keyTimes="0;0.06;0.62;1" calcMode="spline" keySplines="0 0 1 1;0.45 0 0.3 1;0 0 1 1" />
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.06;0.58;0.64;1" dur={CYCLE} repeatCount="indefinite" />
          </g>
        </g>
      ) : null}
    </svg>
  );
}

export function Logo({
  className,
  tone = "default",
  descriptor,
  animated = false,
}: {
  className?: string;
  tone?: "default" | "inverse";
  animated?: boolean;
  /** Optional division descriptor, e.g. "Aviation" → MEDBRIDGE AVIATION */
  descriptor?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0" tone={tone} animated={animated} />
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
