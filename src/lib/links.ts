import { site, type WhatsappAudience } from "@/config/site";

export const telHref = (e164: string = site.contact.deskPhone) => `tel:${e164.replace(/[^\d+]/g, "")}`;

/** wa.me deep link with a pre-populated message. */
export function whatsappHref(audience: WhatsappAudience = "family", extra?: string) {
  const text = extra ? `${site.whatsappMessages[audience]}\n\n${extra}` : site.whatsappMessages[audience];
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
