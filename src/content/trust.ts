/**
 * Trust architecture. IMPORTANT: no statistics, counts, response times,
 * accreditations or partner names are stated here. Add verified facts to
 * `verifiedFacts` below when they exist — the UI shows placeholders until then.
 */
export const whyNotOperator = [
  {
    title: "One team for the whole journey",
    body: "Doctor, bed, ambulances, aircraft and documents — coordinated by one accountable desk.",
  },
  {
    title: "Operator-neutral",
    body: "We don't own aircraft, so we recommend the transfer the patient needs — even when that isn't a charter.",
  },
  {
    title: "Doctor-to-doctor first",
    body: "Transport is decided by clinicians talking to clinicians, not by a sales desk.",
  },
  {
    title: "Bed confirmed before departure",
    body: "The receiving specialist and bed are lined up before the patient leaves.",
  },
];

export const trustPillars = [
  {
    title: "24/7 medical coordination",
    body: "A transfer desk that answers at any hour and stays with the case until admission.",
  },
  {
    title: "Doctor-to-doctor communication",
    body: "Clinical handovers happen between the treating, receiving and aeromedical doctors.",
  },
  {
    title: "Hospital-to-hospital coordination",
    body: "Sending and receiving hospitals know the plan, the timing and the team.",
  },
  {
    title: "Multiple transport options",
    body: "Air ambulance, ICU aircraft, airline stretcher, medical escort or road — chosen on clinical need.",
  },
  {
    title: "Domestic & international",
    body: "Within India, and repatriation from abroad, with the paperwork handled alongside.",
  },
  {
    title: "Bed-to-bed coordination",
    body: "From one hospital bed to the next: ground, air, ground, admission.",
  },
];

/**
 * MedBridge operator standard — a DRAFT policy. [VERIFY] with the medical
 * director and aviation advisor before publishing as a commitment.
 */
export const operatorStandard = [
  "Holds a valid DGCA Non-Scheduled Operator Permit (or the foreign equivalent) for the aircraft used",
  "Aircraft type and range suitable for the route, runway and patient configuration",
  "Medical configuration — stretcher, oxygen, monitoring, ventilation — matched to the clinical brief",
  "Flight crew duty-time and weather go/no-go decisions respected without commercial pressure",
  "Medical team qualifications appropriate to the patient's acuity",
  "Insurance and documentation verified before confirmation",
];

/** Replace `null` with verified values; the site shows a placeholder until then. */
export const verifiedFacts: { label: string; value: string | null; note: string }[] = [
  { label: "Transfers coordinated", value: null, note: "Add once audited" },
  { label: "Operator partners vetted", value: null, note: "Add once agreements are signed" },
  { label: "Receiving hospitals in network", value: null, note: "Add named partners with permission" },
  { label: "Median callback time", value: null, note: "Measure before publishing" },
];

export const clinicalBoundary =
  "MedBridge coordinates. Transport modality and fitness for transfer are determined by qualified medical professionals — the treating doctor, the receiving doctor and the aeromedical team.";
