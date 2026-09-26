"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, Check, Info, Phone, RotateCcw } from "lucide-react";
import { site } from "@/config/site";
import { telHref } from "@/lib/links";
import { track } from "@/lib/analytics";
import { buttonClasses } from "@/components/ui/Button";
import { BackButton, OptionList, Progress, type Option } from "@/components/forms/StepUI";

type Answers = {
  condition?: "stable" | "monitoring" | "critical" | "icu" | "unsure";
  oxygen?: "none" | "some" | "high" | "unsure";
  ventilator?: "yes" | "no" | "unsure";
  location?: "india" | "abroad";
  distance?: "short" | "medium" | "long" | "international";
  urgency?: "now" | "day" | "planned";
  destination?: "hospital" | "city" | "unknown";
};

type Q = { key: keyof Answers; title: string; help?: string; options: Option[] };

const QUESTIONS: Q[] = [
  {
    key: "condition",
    title: "How would the treating team describe the patient's condition right now?",
    help: "Use what the doctors have told you. If you're not sure, that's fine.",
    options: [
      { value: "stable", label: "Stable", hint: "Can sit up, not on continuous support" },
      { value: "monitoring", label: "Needs monitoring", hint: "Stable but needs observation or medication en route" },
      { value: "critical", label: "Critical", hint: "Seriously unwell or recently deteriorated" },
      { value: "icu", label: "In ICU", hint: "Receiving intensive care" },
      { value: "unsure", label: "I'm not sure" },
    ],
  },
  {
    key: "oxygen",
    title: "Is the patient on oxygen?",
    options: [
      { value: "none", label: "No oxygen" },
      { value: "some", label: "Some oxygen", hint: "e.g. nasal prongs or a mask" },
      { value: "high", label: "High-flow or high oxygen", hint: "e.g. HFNC, NIV/BiPAP" },
      { value: "unsure", label: "I'm not sure" },
    ],
  },
  {
    key: "ventilator",
    title: "Is the patient on a ventilator?",
    options: [
      { value: "yes", label: "Yes", hint: "Mechanical ventilation / intubated" },
      { value: "no", label: "No" },
      { value: "unsure", label: "I'm not sure" },
    ],
  },
  {
    key: "location",
    title: "Where is the patient now?",
    options: [
      { value: "india", label: "In India" },
      { value: "abroad", label: "Outside India" },
    ],
  },
  {
    key: "distance",
    title: "Roughly how far do they need to travel?",
    options: [
      { value: "short", label: "Within the region", hint: "Under ~300 km" },
      { value: "medium", label: "Across states", hint: "~300–1,000 km" },
      { value: "long", label: "Across India", hint: "Over ~1,000 km" },
      { value: "international", label: "Between countries" },
    ],
  },
  {
    key: "urgency",
    title: "How soon does the patient need to move?",
    options: [
      { value: "now", label: "As soon as possible" },
      { value: "day", label: "Within the next day or two" },
      { value: "planned", label: "Planning ahead" },
    ],
  },
  {
    key: "destination",
    title: "Do you know where the patient is going?",
    options: [
      { value: "hospital", label: "Yes — a specific hospital" },
      { value: "city", label: "A city, not a hospital yet" },
      { value: "unknown", label: "Not yet", hint: "We can help find the right receiving hospital" },
    ],
  },
];

type Discuss = { name: string; why: string; anchor: string; weight: "likely" | "possible" };

/** Non-diagnostic: maps answers to the options a coordinator would DISCUSS with the doctors. */
function optionsToDiscuss(a: Answers): Discuss[] {
  const out: Discuss[] = [];
  const intensive = a.ventilator === "yes" || a.condition === "icu" || a.condition === "critical" || a.oxygen === "high";
  const uncertain = a.condition === "unsure" || a.oxygen === "unsure" || a.ventilator === "unsure";
  const far = a.distance === "long" || a.distance === "international" || a.location === "abroad";

  if (intensive) {
    out.push({
      name: "ICU air ambulance",
      why: "Critical-care equipment and an ICU-trained team are usually discussed when a patient needs intensive support.",
      anchor: "icu",
      weight: "likely",
    });
    if (a.distance === "short")
      out.push({
        name: "Critical-care ground ambulance",
        why: "For shorter distances, a well-equipped road transfer can be quicker once airport legs are counted.",
        anchor: "bed-to-bed",
        weight: "likely",
      });
  } else {
    if (far || a.condition === "monitoring" || a.oxygen === "some")
      out.push({
        name: "Fixed-wing air ambulance",
        why: "A dedicated aircraft with a medical team is commonly discussed for longer distances or when monitoring is needed.",
        anchor: "fixed-wing",
        weight: a.condition === "monitoring" || a.oxygen === "some" ? "likely" : "possible",
      });
    if (a.condition === "stable" || a.condition === "monitoring")
      out.push({
        name: "Commercial flight with medical escort",
        why: "If the treating doctor and the airline agree the patient is fit for a scheduled flight, this can be a practical, lower-cost option.",
        anchor: "commercial-escort",
        weight: a.condition === "stable" && a.oxygen === "none" ? "likely" : "possible",
      });
    if ((a.condition === "stable" || a.condition === "monitoring") && a.urgency === "planned")
      out.push({
        name: "Airline stretcher",
        why: "On some routes, a stretcher can be installed on a scheduled flight for a patient who must lie flat — it needs advance notice.",
        anchor: "stretcher",
        weight: "possible",
      });
    if (a.distance === "short" || a.distance === "medium")
      out.push({
        name: a.distance === "short" ? "Ground ambulance or helicopter" : "Ground ambulance",
        why: "Over shorter distances, road transfer — or a helicopter where landing sites and weather allow — is often considered.",
        anchor: "helicopter",
        weight: "possible",
      });
  }
  if (uncertain && !intensive)
    out.unshift({
      name: "A clinical conversation first",
      why: "Some answers are unclear, so the coordinator will start with a doctor-to-doctor call before discussing transport.",
      anchor: "bed-to-bed",
      weight: "likely",
    });
  if (out.length === 0)
    out.push({
      name: "Fixed-wing air ambulance",
      why: "Commonly discussed for longer journeys where continuous care is needed.",
      anchor: "fixed-wing",
      weight: "possible",
    });
  return out;
}

const ASSESS = [
  "Medical stability",
  "Oxygen requirement",
  "Monitoring requirements",
  "Need for critical-care equipment",
  "Ground transport requirements",
  "Flight logistics",
  "Receiving hospital capability",
];

export function DecisionGuide() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];
  const discuss = useMemo(() => (done ? optionsToDiscuss(answers) : []), [done, answers]);

  const choose = (v: string) => {
    const next = { ...answers, [q.key]: v } as Answers;
    // International origin implies an international journey.
    if (q.key === "location" && v === "abroad") next.distance = "international";
    setAnswers(next);
    let n = step + 1;
    if (q.key === "location" && v === "abroad") n += 1; // skip distance question
    if (n >= QUESTIONS.length) {
      track("decision_tool_complete", {
        condition: next.condition ?? "",
        international: next.location === "abroad",
        urgency: next.urgency ?? "",
      });
    }
    window.setTimeout(() => setStep(n), 160);
  };

  const back = () => {
    let n = step - 1;
    if (QUESTIONS[n]?.key === "distance" && answers.location === "abroad") n -= 1;
    setStep(Math.max(0, n));
  };

  const requestHref = (() => {
    const p = new URLSearchParams();
    if (answers.location) p.set("from", answers.location === "abroad" ? "international" : "india");
    if (answers.condition) p.set("condition", answers.condition === "unsure" ? "other" : answers.condition === "monitoring" ? "stable" : answers.condition);
    if (answers.ventilator === "yes") p.set("condition", "ventilator");
    if (answers.urgency) p.set("urgency", answers.urgency === "now" ? "immediately" : answers.urgency === "day" ? "today" : "planning");
    return `/request-transfer?${p.toString()}`;
  })();

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="rounded-[var(--radius-panel)] bg-white p-5 ring-1 ring-mist-200 sm:p-8 md:p-10">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <m.div
              key={q.key}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Progress step={step + 1} total={QUESTIONS.length} label="Guidance, not diagnosis" />
              <h2 className="mt-8 text-[24px] font-semibold leading-snug tracking-tight md:text-[28px]">{q.title}</h2>
              {q.help ? <p className="mt-2 text-[15.5px] text-ink-muted">{q.help}</p> : null}
              <div className="mt-6">
                <OptionList name={q.title} options={q.options} value={answers[q.key]} onChange={choose} />
              </div>
              <div className="mt-6 flex items-center justify-between">
                {step > 0 ? <BackButton onClick={back} /> : <span />}
                <a href={telHref()} className="text-[14.5px] font-medium text-navy-700 underline underline-offset-4" data-placement="decision_tool">
                  Skip — talk to a coordinator
                </a>
              </div>
            </m.div>
          ) : (
            <m.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
            >
              <p className="eyebrow">Your summary</p>
              <h2 className="mt-3 text-[26px] font-semibold leading-snug tracking-tight md:text-[32px]">
                Options your coordinator is likely to discuss
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-muted">
                This is not a recommendation or a medical decision. It&apos;s a starting point for the conversation with
                your MedBridge coordinator and the patient&apos;s doctors.
              </p>

              <ul className="mt-7 space-y-3">
                {discuss.map((d) => (
                  <li key={d.name} className="rounded-2xl bg-mist-50 p-5 ring-1 ring-mist-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[18px] font-semibold tracking-tight">{d.name}</h3>
                      <span
                        className={
                          d.weight === "likely"
                            ? "rounded-full bg-aqua-50 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-aqua-700"
                            : "rounded-full bg-mist-200 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-ink-muted"
                        }
                      >
                        {d.weight === "likely" ? "Likely to be discussed" : "May be considered"}
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{d.why}</p>
                    <Link href={`/air-ambulance#${d.anchor}`} className="mt-2 inline-block text-[14px] font-medium text-clinical-700 underline underline-offset-4">
                      Learn more
                    </Link>
                  </li>
                ))}
                {answers.location === "abroad" ? (
                  <li className="flex gap-3 rounded-2xl p-4 text-[15px] text-ink-muted ring-1 ring-mist-200">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-clinical-600" aria-hidden="true" />
                    International transfers also involve permits, passports and, where applicable, your insurer. Your
                    coordinator will guide you through these.
                  </li>
                ) : null}
                {answers.destination === "unknown" || answers.destination === "city" ? (
                  <li className="flex gap-3 rounded-2xl p-4 text-[15px] text-ink-muted ring-1 ring-mist-200">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-clinical-600" aria-hidden="true" />
                    We can help identify a receiving hospital with the right specialty and an available bed.
                  </li>
                ) : null}
              </ul>

              <div className="mt-8 rounded-2xl bg-navy-950 p-6 text-navy-300 md:p-8">
                <h3 className="text-[18px] font-semibold text-white">Your transfer coordinator will assess</h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {ASSESS.map((a) => (
                    <li key={a} className="flex gap-2.5 text-[15px]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href={telHref()} className={buttonClasses("accent", "lg")} data-placement="decision_result">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Talk to a medical coordinator
                  </a>
                  <Link href={requestHref} className={buttonClasses("outline-inverse", "lg")} data-placement="decision_result">
                    Request transfer
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-4 text-[13px] text-navy-400">24/7 transfer desk · {site.contact.deskPhoneDisplay}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
                className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-medium text-ink-muted hover:text-navy-900"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Start again
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
