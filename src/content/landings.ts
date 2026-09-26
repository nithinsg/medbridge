/**
 * Search-intent landing pages served at /{slug}. Each must carry genuinely
 * useful, specific information — no thin doorway pages. Facts here are
 * general public knowledge (airports, seasons, geography); anything
 * operational (bases, response times, partner hospitals) is deliberately
 * NOT claimed. Add a page by appending an entry.
 */
import type { ArticleSection } from "./articles";

export type Landing = {
  slug: string;
  kind: "city" | "corridor" | "service" | "country";
  shortName: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  description: string;
  intro: string;
  /** For the locator map (city pages) */
  geo?: { lat: number; lon: number };
  facts: { label: string; value: string }[];
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
  requestQuery?: string;
  whatsapp?: "family" | "international";
};

const cityFaqs = (city: string) => [
  {
    q: `How quickly can an air ambulance be arranged from ${city}?`,
    a: `It depends on the patient's condition, aircraft positioning, airport slots, weather and the receiving hospital. After a short assessment your coordinator will give you an honest timeline — we don't quote times before we know the case.`,
  },
  {
    q: `Can MedBridge find a receiving hospital for a patient leaving ${city}?`,
    a: `Yes. Tell us the patient's condition and the preferred destination city, and we'll help identify hospitals with the right specialty and an available bed, and arrange the doctor-to-doctor handover.`,
  },
  {
    q: `What does an air ambulance from ${city} cost?`,
    a: `Cost depends on distance, aircraft type, medical complexity, ground ambulances and airport charges. Use our estimator for an indicative range; a firm quote follows a case assessment and operator confirmation.`,
  },
];

export const landings: Landing[] = [
  // ─── Country ───────────────────────────────────────────────
  {
    slug: "air-ambulance-india",
    kind: "country",
    shortName: "India",
    eyebrow: "Air ambulance · India",
    h1: "Air ambulance services across India",
    metaTitle: "Air Ambulance in India — Coordinated Bed-to-Bed Transfers, 24/7",
    description:
      "Air ambulance coordination anywhere in India: fixed-wing and ICU air ambulances, helicopter transfers where available, airline stretcher and medical escort — with doctors, beds and ground ambulances arranged end to end.",
    intro:
      "India's tertiary care is concentrated in a handful of metros, but patients fall ill everywhere. MedBridge coordinates the transfer between the two — from district hospital to specialist centre, or from one metro to another.",
    facts: [
      { label: "Coverage", value: "Domestic transfers across India, and international" },
      { label: "Transport options", value: "Fixed-wing, ICU, helicopter*, airline stretcher, escort, road" },
      { label: "Model", value: "Operator-neutral coordination, bed to bed" },
      { label: "Desk", value: "24/7" },
    ],
    sections: [
      {
        h: "Why patients in India are transferred by air",
        body: [
          "Distances in India are large and road journeys between regions can take a day or more. For patients who need specialised care — cardiac surgery, neurosurgery, transplant evaluation, advanced ICU care — reaching the right centre quickly and safely can matter. Air ambulances are also used to bring patients home after treatment in another city.",
        ],
      },
      {
        h: "What makes a transfer in India complicated",
        body: [
          [
            "Smaller airports may have limited operating hours, and night operations are not possible everywhere",
            "Weather varies sharply by season — monsoon from June to September and winter fog across the north",
            "Ground legs between hospitals and airports can be long in congested cities",
            "Receiving beds, particularly ICU beds, must be confirmed before departure",
          ],
          "A coordinator plans around each of these, and has a ground plan ready when flying isn't possible.",
        ],
      },
      {
        h: "Helicopter availability",
        body: [
          "*Helicopter air ambulance availability in India varies by region and is subject to landing sites, weather and daylight regulations. We confirm feasibility case by case and never assume it.",
        ],
      },
    ],
    faqs: cityFaqs("anywhere in India"),
  },

  // ─── Cities ────────────────────────────────────────────────
  {
    slug: "air-ambulance-delhi",
    kind: "city",
    shortName: "Delhi NCR",
    eyebrow: "Air ambulance · Delhi NCR",
    h1: "Air ambulance in Delhi NCR",
    metaTitle: "Air Ambulance in Delhi NCR — Bed-to-Bed Medical Transfers",
    description:
      "Air ambulance transfers to and from Delhi, Gurugram and Noida: ICU air ambulance, fixed-wing and medical escort, with receiving hospital, bed and ground ambulance coordinated end to end.",
    intro:
      "Delhi NCR is one of India's largest tertiary-care hubs, receiving patients from across north and northeast India and from abroad. MedBridge coordinates transfers into and out of the region, bed to bed.",
    geo: { lat: 28.61, lon: 77.21 },
    facts: [
      { label: "Primary airport", value: "Indira Gandhi International (DEL)" },
      { label: "Also serving NCR", value: "Hindon (civil enclave); Noida International (Jewar) as operations expand" },
      { label: "Seasonal factor", value: "Winter fog, typically December–January" },
      { label: "Common inbound", value: "North and northeast India, Nepal, the Gulf" },
    ],
    sections: [
      {
        h: "Planning around Delhi's winter fog",
        body: [
          "Dense fog in winter can reduce visibility at Delhi airport and at airports across the Indo-Gangetic plain, sometimes for hours. For non-urgent transfers in these months, coordinators plan departure windows around forecasts and keep a road or alternate-airport plan ready. For urgent transfers, the aeromedical team and operator decide what is safe — and we will tell you if waiting is the safer choice.",
        ],
      },
      {
        h: "Ground legs across NCR",
        body: [
          "Hospitals across Delhi, Gurugram, Faridabad and Noida sit at very different road distances from the airport, and traffic varies by time of day. We time the ground ambulance to the flight, and arrange airside handover where airport permissions allow.",
        ],
      },
      {
        h: "Patients coming into Delhi",
        body: [
          "Patients are often referred to Delhi NCR for specialised cardiac, neuro, oncology and transplant care. Before departure we confirm that the receiving specialist has accepted the patient and that a bed is available.",
        ],
      },
    ],
    faqs: cityFaqs("Delhi NCR"),
  },
  {
    slug: "air-ambulance-mumbai",
    kind: "city",
    shortName: "Mumbai",
    eyebrow: "Air ambulance · Mumbai",
    h1: "Air ambulance in Mumbai",
    metaTitle: "Air Ambulance in Mumbai — ICU & Bed-to-Bed Medical Transfers",
    description:
      "Air ambulance transfers to and from Mumbai and the MMR: ICU air ambulance, fixed-wing, medical escort and international repatriation — coordinated bed to bed.",
    intro:
      "Mumbai is a major referral centre for western India and a gateway for repatriation from the Gulf and Africa. MedBridge coordinates transfers into and out of the city, including the ground legs that Mumbai traffic makes critical.",
    geo: { lat: 19.08, lon: 72.88 },
    facts: [
      { label: "Primary airport", value: "Chhatrapati Shivaji Maharaj International (BOM)" },
      { label: "Also serving MMR", value: "Navi Mumbai International (NMI)" },
      { label: "Seasonal factor", value: "Southwest monsoon, typically June–September" },
      { label: "Common inbound", value: "Maharashtra, Gujarat, Goa, the Gulf, East Africa" },
    ],
    sections: [
      {
        h: "Monsoon planning",
        body: [
          "Heavy monsoon rain can disrupt both flights and roads in Mumbai. During the monsoon, coordinators allow extra margin on ground legs and keep alternates in mind. The operator's weather decisions are respected without commercial pressure.",
        ],
      },
      {
        h: "Two airports, one plan",
        body: [
          "With two airports serving the region, the choice can depend on where the receiving hospital is, runway and slot availability, and the aircraft used. We choose the combination that shortens the patient's ground time.",
        ],
      },
      {
        h: "Gulf and Africa repatriation",
        body: [
          "Mumbai is a natural arrival point for patients returning from the UAE, Oman, Saudi Arabia and East Africa. See our Dubai-to-India guide for the international side of the journey.",
        ],
      },
    ],
    faqs: cityFaqs("Mumbai"),
  },
  {
    slug: "air-ambulance-bangalore",
    kind: "city",
    shortName: "Bengaluru",
    eyebrow: "Air ambulance · Bengaluru",
    h1: "Air ambulance in Bengaluru",
    metaTitle: "Air Ambulance in Bengaluru (Bangalore) — Medical Transfers, 24/7",
    description:
      "Air ambulance transfers to and from Bengaluru: ICU air ambulance, fixed-wing, medical escort and repatriation — with the long airport road leg planned in.",
    intro:
      "Bengaluru receives patients from across south India, the northeast and abroad for specialised care. Because the airport is some distance from much of the city, the ground legs deserve as much planning as the flight.",
    geo: { lat: 12.97, lon: 77.59 },
    facts: [
      { label: "Primary airport", value: "Kempegowda International (BLR)" },
      { label: "Airport distance", value: "Roughly 30–40 km from central Bengaluru" },
      { label: "Seasonal factor", value: "Monsoon rain; generally moderate climate" },
      { label: "Common inbound", value: "Karnataka, Kerala, Andhra Pradesh, northeast India, Southeast Asia" },
    ],
    sections: [
      {
        h: "The airport road matters",
        body: [
          "Kempegowda International Airport sits north of the city, and road time to hospitals in the south and east of Bengaluru can be significant at peak hours. For critically ill patients, the ground ambulance's level of care — and its timing — are planned as carefully as the aircraft.",
        ],
      },
      {
        h: "Transfers into Bengaluru",
        body: [
          "Patients often travel to Bengaluru for cardiac, neurosurgical, oncology and transplant care. We confirm acceptance by the receiving specialist and bed availability before the patient departs.",
        ],
      },
      {
        h: "Transfers home",
        body: [
          "After treatment, many patients return home to other states. Stable patients may be able to travel on a scheduled flight with a medical escort — a far lower-cost option we'll always discuss when appropriate.",
        ],
      },
    ],
    faqs: cityFaqs("Bengaluru"),
  },
  {
    slug: "air-ambulance-hyderabad",
    kind: "city",
    shortName: "Hyderabad",
    eyebrow: "Air ambulance · Hyderabad",
    h1: "Air ambulance in Hyderabad",
    metaTitle: "Air Ambulance in Hyderabad — ICU & Bed-to-Bed Transfers, 24/7",
    description:
      "Air ambulance transfers to and from Hyderabad: ICU air ambulance, fixed-wing, medical escort and repatriation — coordinated with receiving hospitals and ground ambulances.",
    intro:
      "Hyderabad is a major medical centre for Telangana, Andhra Pradesh and beyond, and increasingly for international patients. MedBridge coordinates transfers into and out of the city, bed to bed.",
    geo: { lat: 17.39, lon: 78.49 },
    facts: [
      { label: "Primary airport", value: "Rajiv Gandhi International (HYD), Shamshabad" },
      { label: "Airport distance", value: "Roughly 25–35 km from central Hyderabad" },
      { label: "Seasonal factor", value: "Monsoon, typically June–September" },
      { label: "Common inbound", value: "Telangana, Andhra Pradesh, central India, the Gulf, Africa" },
    ],
    sections: [
      {
        h: "Ground legs via the Outer Ring Road",
        body: [
          "Hospitals in Hyderabad are spread across the city, from the older core to the western IT corridor. Ground ambulance timing to Shamshabad is planned with traffic and the patient's needs in mind.",
        ],
      },
      {
        h: "Referral transfers from nearby states",
        body: [
          "Patients are frequently transferred to Hyderabad from district hospitals in Telangana, Andhra Pradesh and neighbouring states. Many of these journeys can be done by road; for longer or time-sensitive transfers, air may be discussed. We'll lay out both.",
        ],
      },
      {
        h: "International patients",
        body: [
          "Hyderabad receives patients from the Gulf and Africa. International transfers add permits, immigration and insurer approval — which we coordinate in parallel with the clinical plan.",
        ],
      },
    ],
    faqs: cityFaqs("Hyderabad"),
  },
  {
    slug: "air-ambulance-chennai",
    kind: "city",
    shortName: "Chennai",
    eyebrow: "Air ambulance · Chennai",
    h1: "Air ambulance in Chennai",
    metaTitle: "Air Ambulance in Chennai — Medical Transfers & Repatriation, 24/7",
    description:
      "Air ambulance transfers to and from Chennai: ICU air ambulance, fixed-wing, medical escort and repatriation from Southeast Asia — coordinated bed to bed.",
    intro:
      "Chennai has long been a destination for specialised care, receiving patients from across India, Bangladesh, Sri Lanka and Southeast Asia. MedBridge coordinates the whole transfer, bed to bed.",
    geo: { lat: 13.08, lon: 80.27 },
    facts: [
      { label: "Primary airport", value: "Chennai International (MAA)" },
      { label: "Seasonal factor", value: "Northeast monsoon and cyclone risk, typically October–December" },
      { label: "Common inbound", value: "Tamil Nadu, eastern India, Bangladesh, Sri Lanka, Southeast Asia" },
      { label: "Repatriation gateway", value: "Singapore, Malaysia, Thailand" },
    ],
    sections: [
      {
        h: "Cyclone-season planning",
        body: [
          "Chennai's heaviest rain comes with the northeast monsoon, and cyclones in the Bay of Bengal can close airports and flood roads. In these months, coordinators track forecasts, build in flexibility, and keep a ground plan available.",
        ],
      },
      {
        h: "A gateway from Southeast Asia",
        body: [
          "Chennai is a natural arrival point for patients repatriated from Singapore, Malaysia and Thailand. See the Singapore-to-India guide for how international transfers are planned.",
        ],
      },
      {
        h: "Transfers into Chennai",
        body: [
          "Patients travel to Chennai for cardiac, transplant, oncology and other specialised care. We confirm acceptance and bed availability before departure, and brief the family on where to go on arrival.",
        ],
      },
    ],
    faqs: cityFaqs("Chennai"),
  },

  // ─── International corridors ───────────────────────────────
  {
    slug: "singapore-to-india-medical-repatriation",
    kind: "corridor",
    shortName: "Singapore → India",
    eyebrow: "Repatriation · Singapore to India",
    h1: "Medical repatriation from Singapore to India",
    metaTitle: "Singapore to India Medical Repatriation — Air Ambulance & Escort",
    description:
      "Bringing a patient home from a Singapore hospital to India: air ambulance, airline stretcher or medical escort, with the receiving hospital in India confirmed before departure.",
    intro:
      "Singapore's hospitals treat many Indian travellers and residents. When it's time to come home — or to continue care in India — MedBridge coordinates the transfer from the Singapore ward to the Indian hospital bed.",
    facts: [
      { label: "Typical arrival cities", value: "Chennai, Bengaluru, Kolkata, Mumbai, Delhi" },
      { label: "Commercial flight time", value: "Roughly 4–6 hours to south and east India" },
      { label: "Options", value: "Air ambulance, airline stretcher, medical escort" },
      { label: "Key documents", value: "Passport, medical report, insurer approval if applicable" },
    ],
    sections: [
      {
        h: "Choosing how the patient travels",
        body: [
          "Many patients returning from Singapore are stable enough — in the treating doctor's judgement — to travel on a scheduled flight with a medical escort, or on an airline stretcher where available. Patients who need intensive care are moved by air ambulance. The treating team in Singapore and the aeromedical team decide; we lay out the options and costs.",
        ],
      },
      {
        h: "What we coordinate on the Singapore side",
        body: [
          [
            "Medical report and discharge planning with the treating hospital",
            "Airline medical clearance (MEDIF) if flying commercially",
            "Ambulance from the hospital to Changi or the departure airport",
            "Liaison with your travel insurer or assistance company",
          ],
        ],
      },
      {
        h: "What we coordinate in India",
        body: [
          "The receiving doctor and bed, immigration and customs support on arrival, and a ground ambulance matched to the patient's needs, waiting when the aircraft lands.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will travel insurance cover repatriation from Singapore?",
        a: "Many policies include repatriation benefits administered by an assistance company, which must approve the plan in advance. Contact your insurer early; we can work alongside them.",
      },
      {
        q: "Can a family member travel with the patient?",
        a: "Usually yes on a commercial flight, and often on an air ambulance depending on space. We confirm during planning.",
      },
    ],
    requestQuery: "from=international",
    whatsapp: "international",
  },
  {
    slug: "dubai-to-india-air-ambulance",
    kind: "corridor",
    shortName: "Dubai → India",
    eyebrow: "Repatriation · UAE to India",
    h1: "Air ambulance from Dubai to India",
    metaTitle: "Dubai to India Air Ambulance & Medical Repatriation",
    description:
      "Medical repatriation from Dubai and the UAE to India: air ambulance, airline stretcher or medical escort, coordinated with the UAE hospital, your employer or insurer, and the receiving hospital in India.",
    intro:
      "The UAE is home to a very large Indian community. When a family member is hospitalised in Dubai, Abu Dhabi or Sharjah and needs to continue care in India, MedBridge coordinates the transfer end to end.",
    facts: [
      { label: "Typical arrival cities", value: "Mumbai, Kochi, Hyderabad, Delhi, Chennai, Bengaluru" },
      { label: "Commercial flight time", value: "Roughly 3–4 hours to most Indian metros" },
      { label: "Options", value: "Air ambulance, airline stretcher, medical escort" },
      { label: "Often involved", value: "Employer, sponsor, insurer, embassy/consulate" },
    ],
    sections: [
      {
        h: "Employers, sponsors and insurers",
        body: [
          "For residents on employment visas, the employer or sponsor and the health insurer are often involved in the decision and cost of repatriation. We can coordinate with them directly, with the family's permission.",
        ],
      },
      {
        h: "The medical side",
        body: [
          "The treating hospital in the UAE provides a medical report; an aeromedical doctor reviews it with them. For stable patients a commercial escort may be appropriate; for critically ill patients an ICU air ambulance is usually discussed.",
        ],
      },
      {
        h: "Arriving in India",
        body: [
          "We confirm the receiving hospital and bed before departure — whether that's a hospital near the family's home town in Kerala or a specialist centre in a metro — and arrange the ground ambulance on arrival.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you coordinate with an employer or company HR?",
        a: "Yes, with the patient's or family's consent. Many repatriations from the UAE involve the employer and insurer, and we can manage communication with them.",
      },
      {
        q: "Do you also transfer patients from Abu Dhabi, Sharjah or elsewhere in the Gulf?",
        a: "Yes. The same approach applies across the UAE, Oman, Qatar, Saudi Arabia, Kuwait and Bahrain, subject to each country's requirements.",
      },
    ],
    requestQuery: "from=international",
    whatsapp: "international",
  },
  {
    slug: "thailand-to-india-medical-repatriation",
    kind: "corridor",
    shortName: "Thailand → India",
    eyebrow: "Repatriation · Thailand to India",
    h1: "Medical repatriation from Thailand to India",
    metaTitle: "Thailand to India Medical Repatriation — Air Ambulance & Escort",
    description:
      "Repatriation from Bangkok, Phuket and elsewhere in Thailand to India — for travellers who fall ill or are injured on holiday or business.",
    intro:
      "Thailand is one of the most popular destinations for Indian travellers. Illness or injury on holiday is frightening; MedBridge coordinates the journey home, from the Thai hospital to the right hospital in India.",
    facts: [
      { label: "Typical arrival cities", value: "Kolkata, Delhi, Mumbai, Chennai, Bengaluru" },
      { label: "Commercial flight time", value: "Roughly 2.5–5 hours to Indian metros" },
      { label: "Common situations", value: "Road accidents, falls, cardiac events, infections" },
      { label: "Key documents", value: "Passport, medical report, travel insurance" },
    ],
    sections: [
      {
        h: "Holiday injuries and illness",
        body: [
          "Many repatriations from Thailand follow road or water-sports accidents, or sudden illness while travelling. Travel insurance is often involved; call your insurer early and share their details with us.",
        ],
      },
      {
        h: "From the islands",
        body: [
          "Patients treated in Phuket, Koh Samui or Krabi may first need a domestic transfer to Bangkok or a direct international flight depending on airport and aircraft. We plan the full route, including any domestic leg.",
        ],
      },
    ],
    faqs: [
      {
        q: "The patient is on a tourist visa — does that complicate things?",
        a: "Not usually. We'll need the patient's passport and the hospital's documentation. Overstay or insurance issues can be worked through with the hospital and embassy where needed.",
      },
    ],
    requestQuery: "from=international",
    whatsapp: "international",
  },
  {
    slug: "uk-to-india-medical-repatriation",
    kind: "corridor",
    shortName: "UK → India",
    eyebrow: "Repatriation · UK & Europe to India",
    h1: "Medical repatriation from the UK and Europe to India",
    metaTitle: "UK & Europe to India Medical Repatriation — Long-Haul Transfers",
    description:
      "Long-haul medical repatriation from London and Europe to India: commercial escort, airline stretcher or long-range air ambulance, planned with the treating and receiving teams.",
    intro:
      "Long-haul repatriation needs careful planning: flight time, crew duty limits, fuel stops and medical supplies for many hours in the air. MedBridge coordinates the whole journey from a UK or European hospital to India.",
    facts: [
      { label: "Typical arrival cities", value: "Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kochi" },
      { label: "Commercial flight time", value: "Roughly 8–10 hours London to Delhi or Mumbai" },
      { label: "Options", value: "Medical escort, airline stretcher, long-range air ambulance" },
      { label: "Air ambulance note", value: "May require a technical stop depending on aircraft" },
    ],
    sections: [
      {
        h: "Long-haul considerations",
        body: [
          "On a long-range air ambulance, flight duration may require technical stops, and crew duty limits can require crew changes. Oxygen and medication must be calculated for the full journey plus reserve. For stable patients, a commercial escort or airline stretcher can be both safer for comfort and far less expensive.",
        ],
      },
      {
        h: "Working with UK and European hospitals",
        body: [
          "We coordinate with the treating team for a medical report in English, discharge planning and ambulance transport to the airport, and — where applicable — with the patient's insurer or assistance company.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a long-range air ambulance take from London to India?",
        a: "Longer than a direct commercial flight in most cases, because of possible technical stops. Your coordinator will explain the options and timings for the specific aircraft and route.",
      },
    ],
    requestQuery: "from=international",
    whatsapp: "international",
  },

  // ─── Service intents ───────────────────────────────────────
  {
    slug: "icu-air-ambulance",
    kind: "service",
    shortName: "ICU air ambulance",
    eyebrow: "Critical care transfer",
    h1: "ICU air ambulance",
    metaTitle: "ICU Air Ambulance — Critical Care Transfers by Air, India & International",
    description:
      "ICU air ambulance transfers for critically ill patients: intensivist-to-intensivist handover, ventilator and monitoring, ICU bed confirmed at the receiving hospital before departure.",
    intro:
      "When a critically ill patient needs to move, the aircraft must function as an intensive care unit and the team as ICU clinicians. MedBridge coordinates ICU-to-ICU transfers by air, planned with the treating intensivist.",
    facts: [
      { label: "Typical equipment", value: "Transport ventilator, multi-parameter monitor, infusion pumps, oxygen with reserve" },
      { label: "Medical team", value: "Critical-care doctor and nurse/paramedic, per clinical need" },
      { label: "Before departure", value: "Receiving ICU bed confirmed" },
      { label: "Ground legs", value: "Critical-care ambulances at both ends" },
    ],
    sections: [
      {
        h: "Planned with the treating intensivist",
        body: [
          "Every ICU transfer starts with a detailed handover: diagnosis, current support, recent changes, lines and drains, medications and infusions. The aeromedical team uses this to plan equipment, oxygen, sedation and contingencies.",
        ],
      },
      {
        h: "Equipment matched to the patient",
        body: [
          "Configuration is agreed before the aircraft is confirmed — not assumed. That includes ventilator compatibility, the number of infusion pumps, monitoring, and oxygen for the full journey including ground legs and potential delays.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it safe to fly a critically ill patient?",
        a: "Many critically ill patients are transferred safely by air with the right team and equipment, but every transfer carries risk. The treating and aeromedical doctors weigh the risks and benefits for the individual patient.",
      },
    ],
  },
  {
    slug: "ventilator-air-ambulance",
    kind: "service",
    shortName: "Ventilator air ambulance",
    eyebrow: "Ventilated patient transfer",
    h1: "Air ambulance for patients on a ventilator",
    metaTitle: "Ventilator Air Ambulance — Transferring Ventilated Patients by Air",
    description:
      "How patients on mechanical ventilation are transferred by air ambulance: transport ventilators, oxygen planning, critical-care teams and synchronised ground legs.",
    intro:
      "Moving a patient on a ventilator is one of the most carefully planned transfers in medicine. MedBridge coordinates the clinical handover, equipment, aircraft and ambulances so every minute of the journey is covered.",
    facts: [
      { label: "Clinical lead", value: "Treating intensivist with the aeromedical doctor" },
      { label: "Key planning", value: "Ventilator settings, oxygen supply + reserve, cabin altitude" },
      { label: "Team", value: "Critical-care-trained doctor on board" },
      { label: "Ground", value: "Ventilator-capable ambulances at both ends" },
    ],
    sections: [
      {
        h: "Oxygen is calculated, not estimated",
        body: [
          "Oxygen consumption depends on the ventilator settings and the patient's needs. The team calculates supply for the full door-to-door time, adds a reserve for delays, and confirms the aircraft and ambulances can carry it.",
        ],
      },
      {
        h: "Altitude and the ventilated patient",
        body: [
          "Aircraft cabins are pressurised to the equivalent of a moderate altitude. The aeromedical team considers this for oxygenation and for any air-filled spaces, and may request a lower cabin altitude where the operator can accommodate it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the family travel with a ventilated patient?",
        a: "Sometimes, depending on the aircraft size and the space needed by the medical team and equipment. We'll confirm when planning.",
      },
    ],
  },
  {
    slug: "medical-escort-flight",
    kind: "service",
    shortName: "Medical escort flight",
    eyebrow: "Commercial flight with a clinician",
    h1: "Medical escort on commercial flights",
    metaTitle: "Medical Escort Flights — Doctor or Nurse Escort on Commercial Airlines",
    description:
      "A doctor or nurse accompanies a stable patient on a scheduled flight, with airline medical clearance, airport assistance and ground transport arranged — often a far lower-cost alternative to an air ambulance.",
    intro:
      "Not every patient needs a dedicated aircraft. If the treating doctor and the airline agree it's appropriate, a medical escort on a scheduled flight can bring a patient home safely and at a fraction of the cost.",
    facts: [
      { label: "Suitable for", value: "Medically stable patients, as judged by the treating doctor" },
      { label: "Airline process", value: "Medical clearance form (MEDIF) completed by the treating doctor" },
      { label: "Escort", value: "Doctor or nurse, depending on need" },
      { label: "Also arranged", value: "Wheelchair, lift, airport assistance, ground ambulance" },
    ],
    sections: [
      {
        h: "How it works",
        body: [
          [
            "The treating doctor confirms the patient is suitable for commercial travel",
            "We submit the airline's medical clearance paperwork",
            "A doctor or nurse escort is assigned and briefed",
            "Seats, wheelchair, oxygen (where the airline permits) and airport assistance are booked",
            "Ground transport meets the patient at both ends",
          ],
        ],
      },
      {
        h: "When it isn't appropriate",
        body: [
          "If the patient needs continuous intensive monitoring, significant oxygen, a ventilator, or can't meet airline requirements, an air ambulance is usually discussed instead. We'll tell you honestly which applies.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a medical escort cheaper than an air ambulance?",
        a: "Usually significantly, because the patient travels on a scheduled flight. The total depends on the route, seats or stretcher required, escort type and ground transport.",
      },
    ],
  },
];

export const landingBySlug = (slug: string) => landings.find((l) => l.slug === slug);
