"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, Check, CircleAlert, Copy, Info, LoaderCircle, Phone, PhoneCall } from "lucide-react";
import { site } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/links";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";
import { BackButton, FieldLabel, OptionList, Progress, inputClass, type Option } from "./StepUI";

type Scope = "india" | "international";
type DestMode = "city" | "hospital" | "unknown";
type Condition = "stable" | "critical" | "icu" | "ventilator" | "oxygen" | "other";
type Transport = "air" | "commercial_escort" | "ground" | "not_sure";
type Urgency = "immediately" | "within_6h" | "today" | "planning";
type Role = "family" | "doctor" | "hospital" | "other";

type State = {
  originScope?: Scope;
  originLocation: string;
  destinationMode?: DestMode;
  destination: string;
  condition?: Condition;
  conditionNote: string;
  transport?: Transport;
  role: Role;
  name: string;
  phone: string;
  whatsappSame: boolean;
  whatsapp: string;
  email: string;
  urgency?: Urgency;
  consent: boolean;
  specialty?: string;
  company_website: string;
};

const initial: State = {
  originLocation: "",
  destination: "",
  conditionNote: "",
  role: "family",
  name: "",
  phone: "",
  whatsappSame: true,
  whatsapp: "",
  email: "",
  consent: false,
  company_website: "",
};

const STEPS = ["Patient location", "Destination", "Condition", "Transfer type", "Contact", "Urgency"] as const;

const scopeOptions: Option<Scope>[] = [
  { value: "india", label: "In India" },
  { value: "international", label: "Outside India", hint: "International repatriation" },
];
const destOptions: Option<DestMode>[] = [
  { value: "city", label: "A city" },
  { value: "hospital", label: "A specific hospital" },
  { value: "unknown", label: "I don't know yet", hint: "We'll help find the right receiving hospital" },
];
const conditionOptions: Option<Condition>[] = [
  { value: "stable", label: "Stable" },
  { value: "critical", label: "Critical" },
  { value: "icu", label: "In ICU" },
  { value: "ventilator", label: "On a ventilator" },
  { value: "oxygen", label: "On oxygen support" },
  { value: "other", label: "Other / not sure" },
];
const transportOptions: Option<Transport>[] = [
  { value: "air", label: "Air ambulance" },
  { value: "commercial_escort", label: "Commercial flight with medical escort" },
  { value: "ground", label: "Ground ambulance" },
  { value: "not_sure", label: "Not sure" },
];
const urgencyOptions: Option<Urgency>[] = [
  { value: "immediately", label: "Immediately" },
  { value: "within_6h", label: "Within 6 hours" },
  { value: "today", label: "Today" },
  { value: "planning", label: "Planning ahead" },
];
const roleOptions: { value: Role; label: string }[] = [
  { value: "family", label: "Family / patient" },
  { value: "doctor", label: "Doctor" },
  { value: "hospital", label: "Hospital staff" },
  { value: "other", label: "Other" },
];

const PHONE_RE = /^[+()\d\s-]{7,20}$/;

type Submitted = { caseId: string };

export function IntakeFlow() {
  const params = useSearchParams();
  const [mode, setMode] = useState<"guided" | "callback">("guided");
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(() => {
    const p = (k: string) => params.get(k) ?? undefined;
    const from = p("from");
    const cond = p("condition");
    const transport = p("transport");
    const urgency = p("urgency");
    return {
      ...initial,
      originScope: from === "international" ? "international" : from === "india" ? "india" : undefined,
      condition: conditionOptions.some((o) => o.value === cond) ? (cond as Condition) : undefined,
      transport: transport === "air" ? "air" : transport === "escort" ? "commercial_escort" : undefined,
      urgency:
        urgency === "immediately" ? "immediately" : urgency === "today" ? "today" : urgency === "planning" ? "planning" : undefined,
      role: p("role") === "doctor" ? "doctor" : p("role") === "hospital" ? "hospital" : "family",
      specialty: p("specialty"),
    };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState<Submitted | null>(null);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof State>(k: K, v: State[K]) => {
    if (!started.current) {
      started.current = true;
      track("transfer_form_start", { mode });
    }
    setS((prev) => ({ ...prev, [k]: v }));
    setErrors((e) => {
      if (!e[k as string]) return e;
      const n = { ...e };
      delete n[k as string];
      return n;
    });
  };

  // Move focus to the new question for keyboard and screen-reader users.
  useEffect(() => {
    if (started.current) headingRef.current?.focus({ preventScroll: false });
  }, [step, mode, done]);

  const go = (n: number) => {
    track("transfer_form_step", { step: n + 1 });
    setStep(n);
  };

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (s.name.trim().length < 2) e.name = "Please enter your name";
    if (!PHONE_RE.test(s.phone.trim())) e.phone = "Please enter a valid phone number";
    if (!s.whatsappSame && s.whatsapp && !PHONE_RE.test(s.whatsapp.trim())) e.whatsapp = "Please enter a valid number";
    if (s.email && !/^\S+@\S+\.\S+$/.test(s.email.trim())) e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const source = () => {
    if (typeof window === "undefined") return undefined;
    const u = new URL(window.location.href);
    return {
      page: u.pathname,
      referrer: document.referrer ? document.referrer.slice(0, 300) : undefined,
      utm_source: u.searchParams.get("utm_source") ?? undefined,
      utm_medium: u.searchParams.get("utm_medium") ?? undefined,
      utm_campaign: u.searchParams.get("utm_campaign") ?? undefined,
    };
  };

  const submit = async (e?: FormEvent) => {
    e?.preventDefault();
    const eMap: Record<string, string> = {};
    if (mode === "guided" && !s.urgency) eMap.urgency = "Please choose how urgent this is";
    if (mode === "callback" && !validateContact()) return;
    if (!s.consent) eMap.consent = "Please confirm so we can contact you";
    if (Object.keys(eMap).length) {
      setErrors((prev) => ({ ...prev, ...eMap }));
      return;
    }
    setSubmitting(true);
    setServerError(null);
    const body =
      mode === "callback"
        ? {
            kind: "callback",
            role: s.role,
            name: s.name,
            phone: s.phone,
            urgency: s.urgency ?? "immediately",
            consent: true,
            source: source(),
            company_website: s.company_website,
          }
        : {
            kind: "transfer",
            role: s.role,
            originScope: s.originScope,
            originLocation: s.originLocation || undefined,
            destinationMode: s.destinationMode,
            destination: s.destinationMode !== "unknown" ? s.destination || undefined : undefined,
            condition: s.condition,
            conditionNote: s.conditionNote || undefined,
            transport: s.transport,
            urgency: s.urgency,
            specialty: s.specialty,
            name: s.name,
            phone: s.phone,
            whatsapp: s.whatsappSame ? s.phone : s.whatsapp,
            email: s.email,
            consent: true,
            source: source(),
            company_website: s.company_website,
          };
    try {
      const res = await fetch("/api/transfer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { ok: boolean; caseId?: string; error?: string; fieldErrors?: Record<string, string> };
      if (!res.ok || !data.ok || !data.caseId) {
        setServerError(data.error ?? "Something went wrong.");
        if (data.fieldErrors) setErrors(data.fieldErrors);
        track("transfer_form_error", { status: res.status });
        return;
      }
      track(mode === "callback" ? "callback_submit" : "transfer_form_submit", {
        international: s.originScope === "international",
        transport: s.transport ?? "",
        urgency: s.urgency ?? "",
        role: s.role,
      });
      setDone({ caseId: data.caseId });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError("We couldn't send your request. Please call or WhatsApp the transfer desk.");
      track("transfer_form_error", { status: 0 });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return <SuccessPanel caseId={done.caseId} state={s} headingRef={headingRef} />;

  const stepValid = [
    Boolean(s.originScope),
    Boolean(s.destinationMode),
    Boolean(s.condition),
    Boolean(s.transport),
    true,
    Boolean(s.urgency),
  ][step];

  const next = () => {
    if (step === 4 && !validateContact()) return;
    if (step < STEPS.length - 1) go(step + 1);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="rounded-[var(--radius-panel)] bg-white p-5 ring-1 ring-mist-200 sm:p-8 md:p-10">
        {/* Mode switch */}
        <div className="mb-8 grid grid-cols-2 gap-1 rounded-xl bg-mist-100 p-1" role="tablist" aria-label="Request type">
          {(
            [
              ["guided", "Guided request"],
              ["callback", "Just call me back"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={mode === k}
              onClick={() => {
                setMode(k);
                setErrors({});
              }}
              className={cn(
                "h-11 rounded-lg text-[14.5px] font-medium transition-colors",
                mode === k ? "bg-white text-navy-900 shadow-sm" : "text-ink-muted hover:text-navy-900",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Honeypot (hidden from people and assistive tech) */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company website
            <input tabIndex={-1} autoComplete="off" value={s.company_website} onChange={(e) => set("company_website", e.target.value)} />
          </label>
        </div>

        {mode === "callback" ? (
          <form onSubmit={submit} noValidate>
            <h2 ref={headingRef} tabIndex={-1} className="text-[24px] font-semibold tracking-tight outline-none md:text-[28px]">
              Leave your number. A coordinator will call you back.
            </h2>
            <p className="mt-2 text-[15.5px] text-ink-muted">Two fields. Nothing else needed right now.</p>
            <div className="mt-6 space-y-4">
              <TextField id="cb-name" label="Your name" value={s.name} onChange={(v) => set("name", v)} error={errors.name} autoComplete="name" />
              <TextField id="cb-phone" label="Phone number" type="tel" value={s.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" placeholder="+91" inputMode="tel" />
            </div>
            <Consent checked={s.consent} onChange={(v) => set("consent", v)} error={errors.consent} />
            {serverError ? <ServerError message={serverError} /> : null}
            <button type="submit" disabled={submitting} className={buttonClasses("primary", "lg", "mt-6 w-full")}>
              {submitting ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <PhoneCall className="h-4 w-4" aria-hidden="true" />}
              {submitting ? "Sending…" : "Request a call back"}
            </button>
          </form>
        ) : (
          <form onSubmit={submit} noValidate>
            <Progress step={step + 1} total={STEPS.length} label={STEPS[step]} />
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={step}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                {step === 0 ? (
                  <>
                    <Heading r={headingRef}>Where is the patient?</Heading>
                    <div className="mt-6">
                      <OptionList name="Where is the patient?" options={scopeOptions} value={s.originScope} onChange={(v) => set("originScope", v)} columns={2} />
                    </div>
                    {s.originScope ? (
                      <div className="mt-5">
                        <TextField
                          id="origin"
                          label={s.originScope === "international" ? "Country, city or hospital" : "City or hospital"}
                          optional
                          value={s.originLocation}
                          onChange={(v) => set("originLocation", v)}
                          placeholder={s.originScope === "international" ? "e.g. Singapore General Hospital" : "e.g. Guwahati"}
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <Heading r={headingRef}>Where does the patient need to go?</Heading>
                    <div className="mt-6">
                      <OptionList name="Destination" options={destOptions} value={s.destinationMode} onChange={(v) => set("destinationMode", v)} />
                    </div>
                    {s.destinationMode && s.destinationMode !== "unknown" ? (
                      <div className="mt-5">
                        <TextField
                          id="destination"
                          label={s.destinationMode === "city" ? "Destination city" : "Hospital name and city"}
                          optional
                          value={s.destination}
                          onChange={(v) => set("destination", v)}
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <Heading r={headingRef}>How is the patient right now?</Heading>
                    <p className="mt-2 text-[15px] text-ink-muted">Choose the closest description. The doctors will fill in the detail.</p>
                    <div className="mt-6">
                      <OptionList name="Patient condition" options={conditionOptions} value={s.condition} onChange={(v) => set("condition", v)} columns={2} />
                    </div>
                    {s.condition ? (
                      <div className="mt-5">
                        <FieldLabel htmlFor="note" optional>
                          Anything the coordinator should know?
                        </FieldLabel>
                        <textarea
                          id="note"
                          rows={3}
                          maxLength={600}
                          value={s.conditionNote}
                          onChange={(e) => set("conditionNote", e.target.value)}
                          className={cn(inputClass, "h-auto py-3")}
                          placeholder="Keep it brief — e.g. reason for transfer"
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <Heading r={headingRef}>What type of transfer are you looking for?</Heading>
                    <div className="mt-6">
                      <OptionList name="Transfer type" options={transportOptions} value={s.transport} onChange={(v) => set("transport", v)} />
                    </div>
                    <p className="mt-5 flex gap-3 rounded-xl bg-aqua-50 p-4 text-[15px] leading-relaxed text-navy-800">
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-aqua-700" aria-hidden="true" />
                      Not sure? Our medical coordination team will help determine the appropriate option with the
                      patient&apos;s doctors.
                    </p>
                  </>
                ) : null}

                {step === 4 ? (
                  <>
                    <Heading r={headingRef}>How can we reach you?</Heading>
                    <fieldset className="mt-6">
                      <legend className="mb-2 text-[14.5px] font-medium text-navy-900">I am a</legend>
                      <div className="flex flex-wrap gap-2">
                        {roleOptions.map((r) => (
                          <button
                            key={r.value}
                            type="button"
                            aria-pressed={s.role === r.value}
                            onClick={() => set("role", r.value)}
                            className={cn(
                              "h-10 rounded-full border px-4 text-[14.5px] font-medium transition-colors",
                              s.role === r.value ? "border-navy-900 bg-navy-900 text-white" : "border-mist-300 text-ink-muted hover:border-navy-400",
                            )}
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <div className="mt-5 space-y-4">
                      <TextField id="name" label="Your name" value={s.name} onChange={(v) => set("name", v)} error={errors.name} autoComplete="name" />
                      <TextField id="phone" label="Phone number" type="tel" value={s.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" placeholder="+91" inputMode="tel" />
                      <label className="flex items-center gap-3 text-[15px] text-ink-muted">
                        <input
                          type="checkbox"
                          checked={s.whatsappSame}
                          onChange={(e) => set("whatsappSame", e.target.checked)}
                          className="h-5 w-5 rounded border-mist-300 accent-navy-900"
                        />
                        This number is on WhatsApp
                      </label>
                      {!s.whatsappSame ? (
                        <TextField id="whatsapp" label="WhatsApp number" optional type="tel" value={s.whatsapp} onChange={(v) => set("whatsapp", v)} error={errors.whatsapp} inputMode="tel" />
                      ) : null}
                      <TextField id="email" label="Email" optional type="email" value={s.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" />
                    </div>
                  </>
                ) : null}

                {step === 5 ? (
                  <>
                    <Heading r={headingRef}>How urgent is the transfer?</Heading>
                    <div className="mt-6">
                      <OptionList name="Urgency" options={urgencyOptions} value={s.urgency} onChange={(v) => set("urgency", v)} columns={2} />
                    </div>
                    {errors.urgency ? <p className="mt-2 text-[14px] text-coral-600">{errors.urgency}</p> : null}
                    {s.urgency === "immediately" || s.urgency === "within_6h" ? (
                      <div className="mt-5 flex flex-col gap-3 rounded-xl bg-coral-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[15px] leading-snug text-navy-900">
                          <strong className="font-semibold">For urgent transfers, calling is fastest.</strong> You can also
                          send this request.
                        </p>
                        <a href={telHref()} className={buttonClasses("primary", "md", "shrink-0")} data-placement="intake_urgent">
                          <Phone className="h-4 w-4" aria-hidden="true" />
                          Call now
                        </a>
                      </div>
                    ) : null}
                    <Consent checked={s.consent} onChange={(v) => set("consent", v)} error={errors.consent} />
                    {serverError ? <ServerError message={serverError} /> : null}
                  </>
                ) : null}
              </m.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-mist-200 pt-6">
              {step > 0 ? <BackButton onClick={() => go(step - 1)} /> : <span />}
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!stepValid}
                  className={buttonClasses("primary", "lg", "min-w-[140px]")}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button type="submit" disabled={submitting} className={buttonClasses("primary", "lg", "min-w-[180px]")}>
                  {submitting ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
                  {submitting ? "Sending…" : "Send request"}
                </button>
              )}
            </div>
          </form>
        )}
        <p className="mt-6 text-[13px] leading-relaxed text-ink-subtle">
          This request is for preliminary coordination only. It is not a medical assessment and does not determine
          fitness to travel — qualified clinicians make those decisions.
        </p>
      </div>
    </LazyMotion>
  );
}

function Heading({ children, r }: { children: React.ReactNode; r: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <h2 ref={r} tabIndex={-1} className="text-[24px] font-semibold leading-snug tracking-tight outline-none md:text-[28px]">
      {children}
    </h2>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  optional,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "tel" | "text" | "email";
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={inputClass}
        {...rest}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-[14px] text-coral-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Consent({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  return (
    <div className="mt-6">
      <label className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-muted">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-mist-300 accent-navy-900"
        />
        <span>
          I agree that MedBridge may contact me and use the information I&apos;ve shared to coordinate this transfer, as
          described in the{" "}
          <a href="/privacy" target="_blank" className="font-medium text-clinical-700 underline underline-offset-2">
            privacy notice
          </a>
          .
        </span>
      </label>
      {error ? <p className="mt-1.5 text-[14px] text-coral-600">{error}</p> : null}
    </div>
  );
}

function ServerError({ message }: { message: string }) {
  return (
    <div role="alert" className="mt-5 flex gap-3 rounded-xl bg-coral-50 p-4 text-[15px] text-navy-900">
      <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-coral-600" aria-hidden="true" />
      <div>
        {message}{" "}
        <a href={telHref()} className="font-semibold underline">
          Call {site.contact.deskPhoneDisplay}
        </a>
      </div>
    </div>
  );
}

const READY = [
  "Patient's ID (passport if international)",
  "Latest medical or discharge summary",
  "Treating doctor's name and number",
  "Insurance or TPA details, if any",
  "Preferred receiving hospital, if you have one",
];

function SuccessPanel({
  caseId,
  state,
  headingRef,
}: {
  caseId: string;
  state: State;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const [copied, setCopied] = useState(false);
  const summary = [
    `Case ID: ${caseId}`,
    state.originScope ? `Patient location: ${state.originScope === "international" ? "Outside India" : "India"}${state.originLocation ? ` — ${state.originLocation}` : ""}` : "",
    state.destinationMode ? `Destination: ${state.destinationMode === "unknown" ? "Not decided" : state.destination || state.destinationMode}` : "",
    state.urgency ? `Urgency: ${urgencyOptions.find((u) => u.value === state.urgency)?.label}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="rounded-[var(--radius-panel)] bg-white p-6 ring-1 ring-mist-200 sm:p-10" role="status" aria-live="polite">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-success-600">
        <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-[28px] font-semibold leading-tight tracking-tight outline-none md:text-[34px]">
        Your request has been received.
      </h2>
      <p className="mt-3 text-[17px] leading-relaxed text-ink-muted">
        A MedBridge medical coordinator will contact you shortly.
      </p>

      <div className="mt-7 flex flex-col gap-4 rounded-2xl bg-navy-950 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400">Your MedBridge Case ID is</p>
          <p className="mt-1 font-mono text-[26px] font-medium tracking-wide text-white md:text-[30px]">{caseId}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(caseId).then(() => setCopied(true), () => undefined);
          }}
          className={buttonClasses("outline-inverse", "md")}
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy ID"}
        </button>
      </div>
      <p className="mt-3 text-[14px] text-ink-subtle">Keep this ID handy — quote it whenever you speak to us.</p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <a
          href={whatsappHref(state.role === "doctor" ? "doctor" : state.originScope === "international" ? "international" : "family", summary)}
          target="_blank"
          rel="noopener noreferrer"
          data-placement="intake_success"
          className={buttonClasses("secondary", "lg")}
        >
          <WhatsAppIcon className="h-[18px] w-[18px] text-[#1FAF55]" />
          Continue on WhatsApp
        </a>
        <a href={telHref()} data-placement="intake_success" className={buttonClasses("primary", "lg")}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call the transfer desk
        </a>
      </div>

      <div className="mt-9 border-t border-mist-200 pt-7">
        <h3 className="text-[17px] font-semibold tracking-tight">While you wait, it helps to have ready</h3>
        <ul className="mt-4 space-y-2.5">
          {READY.map((r) => (
            <li key={r} className="flex gap-3 text-[15.5px] text-ink-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-600" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13.5px] leading-relaxed text-ink-subtle">
          If the patient&apos;s condition changes or becomes life-threatening, contact the treating team immediately or
          call 112.
        </p>
      </div>
    </div>
  );
}
