/**
 * Knowledge Hub articles. General education only — never individual advice.
 * Structure: each section has a heading and a body of paragraphs (string)
 * and bullet lists (string[]). Add an article by appending to `articles`.
 * Every article page automatically ends with the "Need help moving a patient?" CTA.
 */
export type ArticleSection = { h: string; body: (string | string[])[] };
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: "Air ambulance" | "International" | "Clinical transfers" | "Planning & cost";
  minutes: number;
  updated: string; // ISO date
  sections: ArticleSection[];
  related?: string[];
};

const UPDATED = "2026-09-26";

export const articles: Article[] = [
  {
    slug: "what-is-an-air-ambulance",
    title: "What is an air ambulance, and when is one used?",
    description:
      "A plain-language guide to air ambulances in India: what they are, who is on board, when clinicians consider them — and when another option is better.",
    category: "Air ambulance",
    minutes: 6,
    updated: UPDATED,
    related: ["commercial-flight-vs-air-ambulance", "air-ambulance-cost", "ground-to-air-transfer"],
    sections: [
      {
        h: "An aircraft configured as a moving clinical space",
        body: [
          "An air ambulance is an aircraft — usually a fixed-wing turboprop or jet, sometimes a helicopter — configured to carry a patient on a stretcher with a medical team, oxygen, monitoring and, when needed, intensive-care equipment such as a transport ventilator and infusion pumps.",
          "In India, air ambulance flights are generally operated by companies holding a Non-Scheduled Operator Permit from the Directorate General of Civil Aviation (DGCA). The medical team may be employed by the operator or by a separate medical provider.",
        ],
      },
      {
        h: "When clinicians consider an air ambulance",
        body: [
          "The decision is clinical and logistical, made by doctors — not by a website or a sales desk. Air ambulances are typically considered when:",
          [
            "The distance is long and a road journey would be too slow or too demanding for the patient",
            "The patient needs care that isn't available where they are",
            "The patient needs continuous monitoring or support that a scheduled airline cannot provide",
            "The patient is abroad and needs to return to India for continued treatment",
          ],
        ],
      },
      {
        h: "When another option may be better",
        body: [
          "An air ambulance is not always the right answer. A stable patient may travel safely and at far lower cost on a scheduled flight with a doctor or nurse escort. Over shorter distances, a well-equipped road ambulance can be quicker once airport transfers are counted. And sometimes the treating team will advise that the patient is not yet stable enough to move at all.",
          "A good coordinator will tell you all of this — including when not to fly.",
        ],
      },
      {
        h: "What the journey actually involves",
        body: [
          "A flight is only one part of a transfer. A complete, bed-to-bed transfer involves a medical assessment, a receiving doctor and bed, a ground ambulance to the airport, the flight itself, a ground ambulance at the destination, and a handover at the receiving hospital. Gaps between these steps are where most delays happen — which is why MedBridge coordinates the entire journey as one plan.",
        ],
      },
    ],
  },
  {
    slug: "medical-repatriation-to-india",
    title: "Medical repatriation to India: a guide for families",
    description:
      "How medical repatriation works when a family member falls ill or is injured abroad — the steps, the documents, and the decisions involved.",
    category: "International",
    minutes: 7,
    updated: UPDATED,
    related: ["international-medical-evacuation", "commercial-flight-vs-air-ambulance", "medical-escort"],
    sections: [
      {
        h: "What repatriation means",
        body: [
          "Medical repatriation is the process of bringing a patient home — for example, from a hospital in Singapore, Dubai or London to a hospital in India — so treatment can continue closer to family, in a familiar system, or at lower cost.",
        ],
      },
      {
        h: "The steps involved",
        body: [
          [
            "Current hospital: the treating team shares a medical report and confirms the patient's current condition",
            "Medical assessment: an aeromedical doctor reviews whether and how the patient can travel",
            "Transfer planning: air ambulance, airline stretcher or commercial flight with escort — chosen on clinical need",
            "Receiving hospital in India: a doctor accepts the patient and a bed is confirmed",
            "The flight, including any permits, landing and handling arrangements",
            "Ground ambulance in India and admission at the receiving hospital",
          ],
        ],
      },
      {
        h: "Documents you'll usually be asked for",
        body: [
          [
            "Patient's passport (and visas where relevant) and the accompanying family member's passport",
            "A recent medical report or discharge summary from the treating hospital",
            "Travel insurance details, if the patient has a policy",
            "Contact details of the treating doctor abroad and, if known, a preferred hospital in India",
          ],
          "Don't wait to have everything before calling. A coordinator can start planning with what you have.",
        ],
      },
      {
        h: "If the patient has travel insurance",
        body: [
          "Many travel insurance policies include medical evacuation or repatriation benefits, usually administered by an assistance company. The insurer typically needs to approve the plan in advance. A coordinator can work alongside your insurer or assistance company — but always contact your insurer early, as policy conditions vary.",
        ],
      },
    ],
  },
  {
    slug: "icu-transfer",
    title: "ICU-to-ICU transfers: how critically ill patients are moved",
    description:
      "How intensive care transfers between hospitals are planned — from intensivist handover to equipment, bed confirmation and the journey itself.",
    category: "Clinical transfers",
    minutes: 6,
    updated: UPDATED,
    related: ["ventilator-transfer", "hospital-transfer", "ground-to-air-transfer"],
    sections: [
      {
        h: "Why ICU patients are moved",
        body: [
          "Critically ill patients may need to move to a hospital with a specific specialty, a transplant programme, a higher-level ICU, or simply to be closer to home. These transfers carry real clinical risk, so they are planned carefully by the treating and receiving teams.",
        ],
      },
      {
        h: "What gets planned before the patient moves",
        body: [
          [
            "Intensivist-to-intensivist handover: diagnosis, current support, recent changes",
            "Equipment: transport ventilator, infusion pumps, monitoring, oxygen with reserve",
            "Medical team: critical-care-trained doctor and nurse/paramedic appropriate to the patient",
            "An ICU bed confirmed at the receiving hospital before departure",
            "Critical-care ground ambulances at both ends",
          ],
        ],
      },
      {
        h: "The role of a coordinator",
        body: [
          "The clinical decisions belong to the doctors. A coordinator's role is to make sure the right people are talking, the bed is real, the aircraft and ambulances are synchronised, and the family knows what is happening. That coordination is what turns a flight into a safe ICU-to-ICU transfer.",
        ],
      },
    ],
  },
  {
    slug: "air-ambulance-cost",
    title: "How much does an air ambulance cost in India?",
    description:
      "Why air ambulance prices vary so widely, which factors drive the cost, and how to read a quote.",
    category: "Planning & cost",
    minutes: 6,
    updated: UPDATED,
    related: ["commercial-flight-vs-air-ambulance", "what-is-an-air-ambulance", "medical-escort"],
    sections: [
      {
        h: "Why there is no single price",
        body: [
          "Air ambulance pricing is built from the specific mission: where the aircraft is positioned, how far it flies, how long it waits, the medical team and equipment on board, and everything that happens on the ground at both ends. Two transfers between the same cities can cost very different amounts.",
          "Be cautious of fixed prices quoted before anyone has understood the patient's condition.",
        ],
      },
      {
        h: "The main cost factors",
        body: [
          [
            "Distance and flying time, including positioning the aircraft to the patient and back",
            "Aircraft type — turboprop, light jet, mid-size jet, or helicopter",
            "Medical complexity: oxygen, ventilation, infusions, specialist team",
            "ICU-level equipment and critical-care crew",
            "Ground ambulances at both ends",
            "International factors: permits, handling, overflight and landing fees",
            "Airport charges and night or holiday operations",
            "Urgency: immediate dispatch versus a planned transfer",
          ],
        ],
      },
      {
        h: "How to read a quote",
        body: [
          "Ask what is included: ground ambulances, medical team, equipment, airport charges, taxes, and a family member's seat. Ask which operator will fly the aircraft. A clear quote lists these separately.",
          "MedBridge's estimator gives an indicative range only; a final price always requires a case assessment and operator confirmation.",
        ],
      },
    ],
  },
  {
    slug: "commercial-flight-vs-air-ambulance",
    title: "Commercial flight with medical escort vs air ambulance",
    description:
      "When a scheduled flight with a doctor or nurse may be appropriate, when a dedicated air ambulance is needed, and how the decision is made.",
    category: "Planning & cost",
    minutes: 5,
    updated: UPDATED,
    related: ["medical-escort", "air-ambulance-cost", "flying-after-surgery"],
    sections: [
      {
        h: "Two very different options",
        body: [
          "A dedicated air ambulance is a private aircraft configured as a clinical space. A commercial medical escort means the patient flies on a scheduled airline, accompanied by a doctor or nurse, subject to the airline's approval. Airline stretcher services sit in between on some routes.",
        ],
      },
      {
        h: "When a commercial escort may be considered",
        body: [
          [
            "The patient is medically stable",
            "They can sit upright for take-off and landing (or a stretcher is available on the route)",
            "Their oxygen needs, if any, can be met within airline rules",
            "The airline's medical department approves the travel (usually via a MEDIF form completed by the treating doctor)",
          ],
        ],
      },
      {
        h: "When a dedicated air ambulance is usually needed",
        body: [
          [
            "The patient needs continuous monitoring or intensive care",
            "They require a ventilator or significant oxygen",
            "Timing can't wait for a scheduled flight",
            "The airline declines medical clearance",
          ],
          "The decision is made by the treating doctor and the aeromedical team. A coordinator's job is to lay out the options honestly, including the lower-cost one when it is clinically appropriate.",
        ],
      },
    ],
  },
  {
    slug: "ventilator-transfer",
    title: "Transferring a patient on a ventilator",
    description:
      "What families should know when a patient on mechanical ventilation needs to move between hospitals or cities.",
    category: "Clinical transfers",
    minutes: 5,
    updated: UPDATED,
    related: ["icu-transfer", "ground-to-air-transfer", "hospital-transfer"],
    sections: [
      {
        h: "It can be done — with the right team and planning",
        body: [
          "Patients on mechanical ventilation are transferred between hospitals regularly, by road and by air. These are among the most carefully planned transfers, because the patient is fully dependent on equipment and on the skill of the team.",
        ],
      },
      {
        h: "What the aeromedical team plans for",
        body: [
          [
            "A transport ventilator suited to the patient's current settings",
            "Oxygen calculated for the full journey — including ground legs and delays — with a reserve",
            "Effects of cabin altitude on oxygenation and air-filled spaces",
            "Sedation, infusions and monitoring continuity",
            "A critical-care-trained doctor on board",
          ],
        ],
      },
      {
        h: "What families can do",
        body: [
          "Ask the treating team for an up-to-date summary and keep the ICU's direct number handy. Let the coordinator arrange the doctor-to-doctor conversation. And ask questions — a good team will explain what they are planning and why.",
        ],
      },
    ],
  },
  {
    slug: "international-medical-evacuation",
    title: "International medical evacuation: how it works",
    description: "Medical evacuation from one country to another — permits, aircraft range, insurers and timelines explained.",
    category: "International",
    minutes: 6,
    updated: UPDATED,
    related: ["medical-repatriation-to-india", "air-ambulance-cost", "commercial-flight-vs-air-ambulance"],
    sections: [
      {
        h: "Evacuation vs repatriation",
        body: [
          "Medical evacuation usually means moving a patient to where appropriate care is available — sometimes to a third country. Repatriation means bringing a patient home. Both follow similar planning steps.",
        ],
      },
      {
        h: "What makes international transfers more complex",
        body: [
          [
            "Overflight and landing permits for each country on the route",
            "Aircraft range, fuel stops and crew duty limits on long routes",
            "Immigration and customs for the patient, crew and family",
            "Insurer or assistance-company approval where a policy applies",
            "Medical reports in a language both teams understand",
          ],
        ],
      },
      {
        h: "Timelines",
        body: [
          "Timelines depend on the patient's condition, the route, permits and aircraft availability. A coordinator should give you an honest timeline after assessing the case — not a promise before.",
        ],
      },
    ],
  },
  {
    slug: "transplant-transfer",
    title: "Transplant patient transfers: planning ahead",
    description:
      "How transplant candidates and recipients are moved to and from transplant centres — and why readiness planning matters.",
    category: "Clinical transfers",
    minutes: 5,
    updated: UPDATED,
    related: ["icu-transfer", "ventilator-transfer", "hospital-transfer"],
    sections: [
      {
        h: "Coordination, not transplantation",
        body: [
          "Transplant decisions and procedures are the responsibility of the transplant programme. A transfer coordinator's role is to move the patient safely and on time — often at short notice — and to handle the logistics so the family can focus on the patient.",
        ],
      },
      {
        h: "Readiness planning",
        body: [
          [
            "Agree a transfer plan in advance with the transplant centre",
            "Keep documents and a medical summary ready",
            "Know in advance which transport options are realistic from your city",
            "Save the coordinator's number so activation is a single call",
          ],
        ],
      },
      {
        h: "After transplant",
        body: [
          "Recipients may later need to travel back home or to another centre. Immunosuppression means infection-control precautions matter; the transplant team will advise on timing and conditions.",
        ],
      },
    ],
  },
  {
    slug: "flying-after-surgery",
    title: "Flying after surgery: what to consider",
    description: "Why the timing of air travel after surgery matters, and who decides when it is appropriate.",
    category: "Planning & cost",
    minutes: 4,
    updated: UPDATED,
    related: ["commercial-flight-vs-air-ambulance", "medical-escort", "what-is-an-air-ambulance"],
    sections: [
      {
        h: "Why timing matters",
        body: [
          "Aircraft cabins are pressurised to the equivalent of a moderate altitude, so gases in the body expand slightly and oxygen levels in the blood can fall. After some types of surgery this matters more, which is why airlines and surgeons set waiting periods that vary by procedure.",
        ],
      },
      {
        h: "Who decides",
        body: [
          "Your surgeon or treating doctor decides whether and when you can fly, and in what way. Airlines may also require a medical clearance form. If a scheduled flight isn't suitable yet, an air ambulance or a later date may be the answer.",
        ],
      },
      {
        h: "Questions to ask your doctor",
        body: [
          [
            "When is it safe for me to fly, and do I need someone with me?",
            "Will I need oxygen, a wheelchair or a stretcher?",
            "Are there precautions for clots, wounds or drains?",
            "Can you complete the airline's medical form if needed?",
          ],
        ],
      },
    ],
  },
  {
    slug: "medical-escort",
    title: "What is a medical escort?",
    description: "How a doctor or nurse escort works on a commercial flight, and who it is suitable for.",
    category: "Air ambulance",
    minutes: 4,
    updated: UPDATED,
    related: ["commercial-flight-vs-air-ambulance", "flying-after-surgery", "medical-repatriation-to-india"],
    sections: [
      {
        h: "A clinician who travels with the patient",
        body: [
          "A medical escort is a doctor, nurse or paramedic who accompanies a patient on a journey — most often on a scheduled airline flight. They manage medication, monitoring, mobility and any problems en route, and hand the patient over at the destination.",
        ],
      },
      {
        h: "Who it may suit",
        body: [
          [
            "Stable patients returning home after treatment",
            "Elderly travellers who need supervision",
            "Patients who need medication or oxygen within airline limits",
          ],
        ],
      },
      {
        h: "What gets arranged",
        body: [
          "Airline medical clearance, seating (sometimes extra seats or a stretcher), wheelchair and airport assistance, oxygen where permitted, and ground transport at both ends.",
        ],
      },
    ],
  },
  {
    slug: "ground-to-air-transfer",
    title: "Ground-to-air transfers: the legs families don't see",
    description:
      "Why the ground ambulance legs are critical to an air ambulance transfer — and how they're synchronised.",
    category: "Air ambulance",
    minutes: 4,
    updated: UPDATED,
    related: ["what-is-an-air-ambulance", "hospital-transfer", "icu-transfer"],
    sections: [
      {
        h: "The flight is the middle of the journey",
        body: [
          "Every air ambulance transfer starts and ends on the ground: hospital to airport, and airport to hospital. These legs need the right ambulance, the right level of care, and precise timing with the aircraft.",
        ],
      },
      {
        h: "What gets synchronised",
        body: [
          [
            "Discharge from the sending hospital with documents ready",
            "Ground ambulance matched to the patient's needs (including ventilator capability if required)",
            "Airport access and, where permitted, airside handover next to the aircraft",
            "Destination ambulance waiting on arrival",
            "Receiving team ready for the bedside handover",
          ],
        ],
      },
    ],
  },
  {
    slug: "hospital-transfer",
    title: "Hospital-to-hospital transfers: what to expect",
    description: "How inter-hospital transfers are arranged, who is involved, and how families can help.",
    category: "Clinical transfers",
    minutes: 5,
    updated: UPDATED,
    related: ["icu-transfer", "ground-to-air-transfer", "medical-repatriation-to-india"],
    sections: [
      {
        h: "Who is involved",
        body: [
          [
            "The treating (referring) doctor and hospital",
            "The receiving doctor and hospital",
            "The transport provider — road, air or both",
            "The family, and sometimes an insurer",
            "A coordinator who keeps everyone aligned",
          ],
        ],
      },
      {
        h: "How families can help",
        body: [
          "Keep ID documents and insurance details handy, ask the treating team for the latest summary, and tell the coordinator about any preferences for the receiving hospital. Then let the professionals handle the clinical handover.",
        ],
      },
      {
        h: "What you should expect from a coordinator",
        body: [
          "Clear timelines, honest options, a single point of contact, and confirmation that the receiving hospital has accepted the patient before they leave.",
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
