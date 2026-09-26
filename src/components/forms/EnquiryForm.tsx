"use client";

import { useState, type FormEvent } from "react";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/links";
import { track } from "@/lib/analytics";
import { site, type WhatsappAudience } from "@/config/site";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";
import { FieldLabel, inputClass } from "./StepUI";

type Kind = "doctor_call" | "partner";

/**
 * Short professional enquiry form (doctor-to-doctor call, partnership).
 * Posts to the same case pipeline so every enquiry gets a Case ID.
 */
export function EnquiryForm({
  kind,
  role,
  submitLabel,
  organisationLabel = "Hospital / organisation",
  messageLabel = "Brief clinical summary",
  messagePlaceholder,
  showUrgency = false,
  showRoute = false,
  audience = "family",
  tone = "light",
}: {
  kind: Kind;
  role: "doctor" | "hospital" | "partner";
  submitLabel: string;
  organisationLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  showUrgency?: boolean;
  showRoute?: boolean;
  audience?: WhatsappAudience;
  tone?: "light" | "dark";
}) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    organisation: "",
    message: "",
    urgency: "",
    originLocation: "",
    destination: "",
    consent: false,
    company_website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [caseId, setCaseId] = useState<string | null>(null);
  const dark = tone === "dark";

  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const eMap: Record<string, string> = {};
    if (f.name.trim().length < 2) eMap.name = "Please enter your name";
    if (!/^[+()\d\s-]{7,20}$/.test(f.phone.trim())) eMap.phone = "Please enter a valid phone number";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) eMap.email = "Please enter a valid email";
    if (!f.consent) eMap.consent = "Please confirm so we can contact you";
    setErrors(eMap);
    if (Object.keys(eMap).length) return;
    setState("sending");
    try {
      const res = await fetch("/api/transfer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          role,
          name: f.name,
          phone: f.phone,
          email: f.email,
          organisation: f.organisation || undefined,
          message: f.message || undefined,
          urgency: f.urgency || undefined,
          originLocation: f.originLocation || undefined,
          destination: f.destination || undefined,
          destinationMode: f.destination ? "city" : undefined,
          consent: true,
          source: { page: window.location.pathname, referrer: document.referrer || undefined },
          company_website: f.company_website,
        }),
      });
      const data = (await res.json()) as { ok: boolean; caseId?: string; fieldErrors?: Record<string, string> };
      if (!res.ok || !data.ok || !data.caseId) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setState("error");
        return;
      }
      track(kind === "doctor_call" ? "doctor_call_request" : "partner_enquiry", { role });
      setCaseId(data.caseId);
    } catch {
      setState("error");
    }
  };

  const labelCls = dark ? "[&_label]:text-white [&_label_span]:text-navy-300" : "";
  const inputCls = cn(inputClass, dark && "border-white/15 bg-white/[0.06] text-white placeholder:text-navy-400 focus:border-aqua-400 focus:ring-aqua-500/20");

  if (caseId) {
    return (
      <div role="status" className={cn("rounded-[var(--radius-card)] p-6 md:p-8", dark ? "bg-white/[0.06] text-navy-300" : "bg-white ring-1 ring-mist-200")}>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success-50 text-success-600">
          <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h3 className={cn("mt-5 text-[22px] font-semibold tracking-tight", dark && "text-white")}>Request received.</h3>
        <p className="mt-2 text-[15.5px]">
          Reference <span className={cn("font-mono font-medium", dark ? "text-white" : "text-navy-900")}>{caseId}</span>.{" "}
          {kind === "doctor_call"
            ? "A MedBridge coordinator will call you back to arrange the doctor-to-doctor conversation."
            : "Our partnerships team will be in touch."}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappHref(audience, `Reference: ${caseId}`)} target="_blank" rel="noopener noreferrer" className={buttonClasses(dark ? "outline-inverse" : "secondary", "md")}>
            Continue on WhatsApp
          </a>
          <a href={telHref(role === "doctor" ? site.contact.doctorDeskPhone : site.contact.deskPhone)} className={buttonClasses(dark ? "inverse" : "primary", "md")}>
            Call the desk
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={cn("space-y-4", labelCls)}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input tabIndex={-1} autoComplete="off" value={f.company_website} onChange={(e) => set("company_website", e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${kind}-name`} label={role === "doctor" ? "Your name (Dr.)" : "Your name"} error={errors.name}>
          <input id={`${kind}-name`} className={inputCls} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" aria-invalid={errors.name ? true : undefined} />
        </Field>
        <Field id={`${kind}-phone`} label="Phone" error={errors.phone}>
          <input id={`${kind}-phone`} type="tel" inputMode="tel" className={inputCls} value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+91" aria-invalid={errors.phone ? true : undefined} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${kind}-org`} label={organisationLabel}>
          <input id={`${kind}-org`} className={inputCls} value={f.organisation} onChange={(e) => set("organisation", e.target.value)} autoComplete="organization" />
        </Field>
        <Field id={`${kind}-email`} label="Email" optional error={errors.email}>
          <input id={`${kind}-email`} type="email" className={inputCls} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={errors.email ? true : undefined} />
        </Field>
      </div>
      {showRoute ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={`${kind}-from`} label="Patient currently at" optional>
            <input id={`${kind}-from`} className={inputCls} value={f.originLocation} onChange={(e) => set("originLocation", e.target.value)} placeholder="City / hospital" />
          </Field>
          <Field id={`${kind}-to`} label="Destination" optional>
            <input id={`${kind}-to`} className={inputCls} value={f.destination} onChange={(e) => set("destination", e.target.value)} placeholder="City / hospital / not yet known" />
          </Field>
        </div>
      ) : null}
      {showUrgency ? (
        <Field id={`${kind}-urgency`} label="Urgency">
          <select id={`${kind}-urgency`} className={inputCls} value={f.urgency} onChange={(e) => set("urgency", e.target.value)}>
            <option value="">Select…</option>
            <option value="immediately">Immediately</option>
            <option value="within_6h">Within 6 hours</option>
            <option value="today">Today</option>
            <option value="planning">Planning ahead</option>
          </select>
        </Field>
      ) : null}
      <Field id={`${kind}-msg`} label={messageLabel} optional>
        <textarea id={`${kind}-msg`} rows={4} maxLength={1500} className={cn(inputCls, "h-auto py-3")} value={f.message} onChange={(e) => set("message", e.target.value)} placeholder={messagePlaceholder} />
      </Field>
      <div>
        <label className={cn("flex items-start gap-3 text-[14px] leading-relaxed", dark ? "!text-navy-300" : "text-ink-muted")}>
          <input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-navy-900" />
          <span>
            I agree that MedBridge may contact me about this enquiry, per the{" "}
            <a href="/privacy" target="_blank" className="underline underline-offset-2">
              privacy notice
            </a>
            . Please share only the minimum identifiable patient information needed at this stage.
          </span>
        </label>
        {errors.consent ? <p className="mt-1.5 text-[14px] text-coral-500">{errors.consent}</p> : null}
      </div>
      {state === "error" ? (
        <p role="alert" className="flex gap-2 rounded-xl bg-coral-50 p-3 text-[14.5px] text-navy-900">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-coral-600" aria-hidden="true" />
          We couldn&apos;t send this. Please check the fields, or call {site.contact.deskPhoneDisplay}.
        </p>
      ) : null}
      <button type="submit" disabled={state === "sending"} className={buttonClasses(dark ? "accent" : "primary", "lg", "w-full sm:w-auto")}>
        {state === "sending" ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
        {state === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      {children}
      {error ? <p className="mt-1.5 text-[14px] text-coral-500">{error}</p> : null}
    </div>
  );
}
