/**
 * Air ambulance & transfer modalities. Edit copy here; pages read from this file.
 * Clinical rule: describe when a modality is *typically considered* — never
 * imply the website decides. The treating and receiving clinicians and the
 * aeromedical team decide.
 */
export type Modality = {
  slug: string;
  name: string;
  short: string;
  /** Mono label used on cards, e.g. route-board style */
  code: string;
  description: string;
  typicallyConsidered: string[];
  weCoordinate: string[];
};

export const modalities: Modality[] = [
  {
    slug: "fixed-wing",
    name: "Fixed-wing air ambulance",
    code: "FW",
    short: "For longer domestic and international transfers.",
    description:
      "A dedicated aircraft configured for a stretcher patient, with a medical team, monitoring and oxygen on board. Used where distance, clinical need or time make a road journey unsuitable.",
    typicallyConsidered: [
      "Transfers of several hundred kilometres or more",
      "International repatriation and cross-border evacuation",
      "Patients who need continuous monitoring throughout the journey",
    ],
    weCoordinate: [
      "Operator and aircraft selection matched to the clinical brief",
      "Medical team composition agreed with the treating doctor",
      "Ground ambulances at both ends, timed to the flight",
      "Airport, permits and handling logistics",
    ],
  },
  {
    slug: "helicopter",
    name: "Helicopter air ambulance",
    code: "HEMS",
    short: "For rapid regional and inter-hospital transfers, where appropriate.",
    description:
      "Rotary-wing transfer for shorter regional distances where landing sites, weather and daylight regulations allow. Availability varies by region and is confirmed case by case.",
    typicallyConsidered: [
      "Regional inter-hospital transfers",
      "Locations with limited road access",
      "Time-sensitive transfers over shorter distances",
    ],
    weCoordinate: [
      "Landing-site feasibility at both hospitals",
      "Weather and daylight limitations — with a ground plan B",
      "Receiving team on standby at the helipad",
    ],
  },
  {
    slug: "icu",
    name: "ICU air ambulance",
    code: "ICU",
    short: "For critically ill patients requiring advanced monitoring and support.",
    description:
      "A fixed-wing aircraft configured as a flying intensive care unit, with a critical-care medical team. The configuration is agreed with the treating intensivist before the aircraft is confirmed.",
    typicallyConsidered: [
      "Patients on mechanical ventilation or high oxygen requirements",
      "Patients on infusions or vasoactive support",
      "ICU-to-ICU transfers between hospitals",
    ],
    weCoordinate: [
      "Intensivist-to-intensivist handover",
      "Ventilator, infusion pumps and monitoring matched to the patient",
      "ICU bed confirmed at the receiving hospital before departure",
      "Critical-care ground ambulances at both ends",
    ],
  },
  {
    slug: "commercial-escort",
    name: "Commercial flight medical escort",
    code: "ESC",
    short: "For patients who may not require a dedicated aircraft.",
    description:
      "A doctor or nurse travels with the patient on a scheduled airline flight, subject to the airline's medical clearance process. Often a practical and significantly lower-cost option for stable patients.",
    typicallyConsidered: [
      "Medically stable patients who can sit upright for the flight",
      "Patients who need supervision, medication or mobility help en route",
      "Elderly travellers returning home after treatment",
    ],
    weCoordinate: [
      "Airline medical clearance paperwork (MEDIF) with the treating doctor",
      "Escort doctor or nurse and travel medical kit",
      "Wheelchair, lift and airport assistance",
      "Ground transfer at both ends",
    ],
  },
  {
    slug: "stretcher",
    name: "Airline stretcher transport",
    code: "STR",
    short: "For selected patients requiring specialised airline arrangements.",
    description:
      "Some airlines can install a stretcher on selected scheduled routes for a patient who must lie flat, travelling with a medical escort. Availability is route- and airline-specific and needs advance notice.",
    typicallyConsidered: [
      "Stable patients who must remain lying down",
      "Longer routes where a dedicated aircraft is not clinically required",
      "Planned (non-emergency) transfers",
    ],
    weCoordinate: [
      "Route and airline availability checks",
      "Medical escort and oxygen arrangements where permitted",
      "Airport-side ambulance access",
    ],
  },
  {
    slug: "bed-to-bed",
    name: "Bed-to-bed transfer",
    code: "B2B",
    short: "Ground ambulance → aircraft → destination ambulance → receiving hospital.",
    description:
      "The complete journey as one coordinated plan: the patient leaves one hospital bed and is admitted into another, with every handover arranged in advance. This is how MedBridge approaches every transfer.",
    typicallyConsidered: ["Every transfer — this is the MedBridge standard, not an upgrade"],
    weCoordinate: [
      "Discharge and documentation at the sending hospital",
      "Ground ambulance to the airport and airside handover",
      "Flight with the agreed medical team",
      "Destination ambulance and admission at the receiving hospital",
    ],
  },
];

export const groundAndOther = [
  {
    name: "Ground ambulance transfer",
    description:
      "For shorter distances, or where flying isn't advisable, a road transfer with an appropriately equipped ambulance and medical team can be the right option.",
  },
];
