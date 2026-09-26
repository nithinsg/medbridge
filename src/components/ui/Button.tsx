import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "inverse" | "outline-inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-700 shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_8px_24px_-12px_rgb(7_19_31/0.6)]",
  accent: "bg-aqua-500 text-navy-950 hover:bg-aqua-400",
  secondary: "bg-white text-navy-900 border border-mist-300 hover:border-navy-400",
  ghost: "text-navy-900 hover:bg-mist-100",
  inverse: "bg-white text-navy-900 hover:bg-mist-100",
  "outline-inverse": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-4 text-[15px]",
  lg: "h-14 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Internal navigation styled as a button. */
export function ButtonLink({ variant, size, className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type AnchorButtonProps = ComponentProps<"a"> & { variant?: Variant; size?: Size };

/** External / tel: / wa.me links styled as a button. */
export function ButtonAnchor({ variant, size, className, children, ...props }: AnchorButtonProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}

/** Small coral live-dot that marks a 24/7 emergency affordance. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-2 w-2 shrink-0 rounded-full bg-coral-500 animate-pulse-dot", className)}
    />
  );
}
