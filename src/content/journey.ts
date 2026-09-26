/** The MedBridge coordinated journey — used on Home and /medical-transfer. */
export type JourneyStep = {
  n: string;
  title: string;
  summary: string;
  details: string[];
  who: string;
};

export const journeySteps: JourneyStep[] = [
  {
    n: "01",
    title: "Medical assessment",
    summary: "A MedBridge coordinator takes the case and gathers the clinical picture from the treating team.",
    details: [
      "Current diagnosis, stability and support (oxygen, ventilation, infusions)",
      "Recent reports, imaging and the treating doctor's summary",
      "Doctor-to-doctor call with the treating clinician",
      "Fitness for transfer is judged by clinicians — never by a form",
    ],
    who: "Treating doctor · MedBridge medical coordinator",
  },
  {
    n: "02",
    title: "Transfer planning",
    summary: "The right way to move this patient — air, airline escort, stretcher or road — with options and an estimate.",
    details: [
      "Transport options matched to the clinical brief, not to an aircraft on hand",
      "Medical team composition and equipment",
      "Timing, weather and airport considerations",
      "Transparent estimate with what is and isn't included",
    ],
    who: "MedBridge coordination desk · aeromedical team",
  },
  {
    n: "03",
    title: "Receiving hospital",
    summary: "The receiving specialist and bed are lined up before the patient leaves.",
    details: [
      "Receiving doctor accepts the patient after a clinical handover",
      "ICU / ward bed confirmed",
      "Admission paperwork and insurance pre-authorisation guidance",
      "Family informed of where to go and whom to meet",
    ],
    who: "Receiving specialist · hospital transfer desk",
  },
  {
    n: "04",
    title: "Transport",
    summary: "A vetted operator and medical team carry out the transfer to the agreed plan.",
    details: [
      "Operator selected against MedBridge's operator standard",
      "Aircraft configured for the patient's needs",
      "Medical crew briefed with the full handover",
      "Family travel arrangements where permitted",
    ],
    who: "Aviation operator · flight medical team",
  },
  {
    n: "05",
    title: "Ground transfer",
    summary: "Ambulances at both ends are timed to the flight so there are no gaps.",
    details: [
      "Sending hospital → airport, with the right level of care",
      "Airside handover where airport permissions allow",
      "Destination airport → receiving hospital",
      "One coordinator tracking every leg",
    ],
    who: "Ground ambulance partners · MedBridge desk",
  },
  {
    n: "06",
    title: "Hospital admission",
    summary: "The patient is handed over at the bedside and the referring doctor is updated.",
    details: [
      "Bedside handover to the receiving team",
      "Transfer documentation handed over",
      "Closure update to the referring doctor and the family",
      "Case closed with a single record of the journey",
    ],
    who: "Receiving hospital · referring doctor · family",
  },
];
