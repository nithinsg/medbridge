import { Phone } from "lucide-react";
import { site, type WhatsappAudience } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/links";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";
import { ButtonAnchor, LiveDot } from "./Button";

type Common = { placement: string; size?: "md" | "lg"; className?: string };

export function CallButton({
  placement,
  size = "lg",
  className,
  variant = "secondary",
  label = "Call MedBridge 24/7",
  phone = site.contact.deskPhone,
}: Common & { variant?: "secondary" | "primary" | "inverse" | "outline-inverse"; label?: string; phone?: string }) {
  return (
    <ButtonAnchor href={telHref(phone)} variant={variant} size={size} className={className} data-placement={placement}>
      <LiveDot />
      <Phone className="h-4 w-4" aria-hidden="true" />
      {label}
    </ButtonAnchor>
  );
}

export function WhatsAppButton({
  placement,
  size = "lg",
  className,
  audience = "family",
  variant = "secondary",
  label = "WhatsApp a coordinator",
}: Common & {
  audience?: WhatsappAudience;
  variant?: "secondary" | "ghost" | "outline-inverse" | "inverse";
  label?: string;
}) {
  return (
    <ButtonAnchor
      href={whatsappHref(audience)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
      data-placement={placement}
      data-audience={audience}
    >
      <WhatsAppIcon className="h-[18px] w-[18px] text-[#1FAF55]" />
      {label}
    </ButtonAnchor>
  );
}
