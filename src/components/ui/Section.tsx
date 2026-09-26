import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  tone = "default",
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "white" | "dark" | "mist";
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 md:py-24 lg:py-28",
        tone === "white" && "bg-white",
        tone === "mist" && "bg-mist-100",
        tone === "dark" && "bg-navy-950 text-navy-300",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  tone = "default",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  tone?: "default" | "dark";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className={cn("eyebrow", tone === "dark" && "text-aqua-300")}>{eyebrow}</p> : null}
      <Tag
        id={id}
        className={cn(
          "display mt-3 text-[34px] sm:text-[42px] lg:text-[52px]",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </Tag>
      {intro ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-relaxed md:text-lg",
            tone === "dark" ? "text-navy-300" : "text-ink-muted",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/** Honest placeholder for facts that must be verified before launch. */
export function Placeholder({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-dashed border-warning-500/60 bg-warning-50 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-warning-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
