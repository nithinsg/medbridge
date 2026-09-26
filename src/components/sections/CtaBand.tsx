import { ArrowRight } from "lucide-react";
import type { WhatsappAudience } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton, WhatsAppButton } from "@/components/ui/ContactActions";
import { LogoMark } from "@/components/brand/Logo";

/** Closing call-to-action used at the end of every page. */
export function CtaBand({
  title = "Wherever the patient is, we'll help find the way forward.",
  body = "Tell us where the patient is and where they need to be. A MedBridge medical coordinator will take it from there.",
  primaryLabel = "Request medical transfer",
  primaryHref = "/request-transfer",
  audience = "family",
  placement = "cta_band",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  audience?: WhatsappAudience;
  placement?: string;
}) {
  return (
    <section className="bg-mist-50 py-16 md:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-navy-950 px-6 py-14 text-center sm:px-12 md:py-20">
          <LogoMark tone="inverse" animated className="pointer-events-none absolute -bottom-24 left-1/2 h-[380px] w-[380px] -translate-x-1/2 opacity-[0.06]" />
          <h2 className="display relative mx-auto max-w-3xl text-[32px] text-white sm:text-[44px] lg:text-[52px]">{title}</h2>
          <p className="relative mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-navy-300">{body}</p>
          <div className="relative mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primaryHref} variant="accent" size="lg" data-placement={placement}>
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <CallButton placement={placement} variant="outline-inverse" />
            <WhatsAppButton placement={placement} audience={audience} variant="outline-inverse" label="WhatsApp" />
          </div>
        </div>
      </div>
    </section>
  );
}
