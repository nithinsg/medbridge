/**
 * Specialty transfers. Language is deliberately general: these describe what
 * transfer teams commonly plan for — not clinical advice for any individual.
 */
export type Specialty = {
  slug: string;
  name: string;
  short: string;
  overview: string;
  commonReasons: string[];
  planningFocus: string[];
};

export const specialties: Specialty[] = [
  {
    slug: "cardiac",
    name: "Cardiac",
    short: "Transfers for cardiac care, intervention and surgery.",
    overview:
      "Patients are often moved to a centre offering a specific cardiac procedure or surgical team. Timing and monitoring are planned with the treating cardiologist.",
    commonReasons: [
      "Transfer to a centre for an interventional or surgical procedure",
      "Advanced heart failure care or device therapy",
      "Post-procedure return closer to home",
    ],
    planningFocus: [
      "Continuous cardiac monitoring and defibrillation capability",
      "Medication and infusion continuity",
      "Receiving cardiology team ready on arrival",
    ],
  },
  {
    slug: "neurology",
    name: "Neurology & Neurosurgery",
    short: "Stroke, head injury and neurosurgical transfers.",
    overview:
      "Neurological transfers are often time-sensitive and may involve specific considerations about altitude, pressure and positioning, which the aeromedical team plans for.",
    commonReasons: [
      "Transfer to a neurosurgical or comprehensive stroke centre",
      "Specialist neuro-ICU care",
      "Rehabilitation closer to family",
    ],
    planningFocus: [
      "Neurological monitoring during transfer",
      "Cabin altitude and positioning considerations",
      "Neurosurgical team alerted with imaging shared in advance",
    ],
  },
  {
    slug: "pulmonology",
    name: "Pulmonology",
    short: "Patients with oxygen or ventilation requirements.",
    overview:
      "Oxygen requirements change at altitude. Patients on oxygen or ventilatory support need careful calculation of supply, equipment and contingencies — done by the aeromedical team.",
    commonReasons: [
      "Severe respiratory illness needing a higher level of care",
      "Transfer for lung transplant assessment",
      "Repatriation of a patient on oxygen",
    ],
    planningFocus: [
      "Oxygen supply calculated for the full journey plus reserve",
      "Ventilator compatibility and settings handover",
      "Cabin altitude requests where the operator can accommodate them",
    ],
  },
  {
    slug: "trauma",
    name: "Trauma",
    short: "Injury transfers to definitive care.",
    overview:
      "After initial stabilisation, trauma patients may need to move to a centre with the right surgical specialties. Immobilisation and pain management are planned for every leg.",
    commonReasons: [
      "Polytrauma requiring multi-specialty surgical care",
      "Spinal or orthopaedic injuries needing specialist surgery",
      "Road or travel accidents far from home",
    ],
    planningFocus: [
      "Spinal and fracture immobilisation throughout",
      "Analgesia and monitoring",
      "Trauma team at the receiving centre briefed",
    ],
  },
  {
    slug: "oncology",
    name: "Oncology",
    short: "Transfers for cancer treatment or care closer to home.",
    overview:
      "Oncology patients may travel for specialised treatment or to return home. Immune status, fatigue and comfort shape the plan.",
    commonReasons: [
      "Transfer to a specialised oncology centre",
      "Continuation of treatment in the home city",
      "Palliative transfers home with dignity",
    ],
    planningFocus: [
      "Infection-control considerations",
      "Comfort, pain management and positioning",
      "Coordination with the receiving oncology team",
    ],
  },
  {
    slug: "transplant",
    name: "Transplant",
    short: "Transplant candidates and recipients on tight timelines.",
    overview:
      "Transplant candidates may need to reach a transplant centre at short notice. MedBridge coordinates the patient's transport and logistics; the transplant programme leads all clinical decisions.",
    commonReasons: [
      "Candidate called to a transplant centre",
      "Post-transplant transfer or return home",
      "Transfer for transplant evaluation",
    ],
    planningFocus: [
      "Readiness plan agreed in advance with the transplant centre",
      "Rapid activation when the call comes",
      "Immunosuppressed-patient precautions",
    ],
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    short: "Children, with a parent alongside wherever possible.",
    overview:
      "Paediatric transfers need age-appropriate equipment, paediatric-experienced medical teams and a plan that keeps a parent close.",
    commonReasons: [
      "Transfer to a paediatric specialty centre or PICU",
      "Congenital condition requiring specialised surgery",
      "Return home after treatment",
    ],
    planningFocus: [
      "Paediatric equipment sizes and medication dosing",
      "Parent accompaniment where the aircraft allows",
      "Paediatric team at the receiving hospital",
    ],
  },
  {
    slug: "neonatal",
    name: "Neonatal",
    short: "Newborn transfers with transport incubators.",
    overview:
      "Newborns may need transfer to a higher-level NICU. This requires a transport incubator and a neonatal-trained team; availability is confirmed case by case.",
    commonReasons: [
      "Transfer to a higher-level NICU",
      "Neonatal surgery",
      "Specialist cardiac or respiratory newborn care",
    ],
    planningFocus: [
      "Transport incubator and temperature management",
      "Neonatal-trained medical team",
      "NICU bed confirmed before departure",
    ],
  },
];

export const transplantCategories = [
  { name: "Lung transplant", note: "Candidates and recipients often need oxygen or ventilatory support planned in detail." },
  { name: "Heart transplant", note: "Candidates may be on advanced cardiac support; activation windows can be short." },
  { name: "Liver transplant", note: "Candidates may deteriorate quickly; readiness plans are agreed in advance." },
  { name: "Kidney transplant", note: "Often planned transfers; dialysis timing is coordinated around travel." },
  { name: "Pediatric transplant", note: "Paediatric teams and parent accompaniment are planned from the start." },
];
