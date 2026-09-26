/**
 * INDICATIVE PRICING MODEL — [CALIBRATE BEFORE LAUNCH]
 * Ranges are placeholders informed by publicly advertised Indian market
 * ranges (2026) and must be replaced with MedBridge's operator rate cards.
 * The UI always states that final pricing requires case assessment and
 * operator confirmation. All values are INR.
 */
export type RouteBand = "short" | "medium" | "long" | "intl_short" | "intl_long";
export type Mode = "fixed_wing" | "helicopter" | "commercial_escort" | "stretcher" | "ground";
export type Complexity = "stable" | "monitoring" | "critical";

export const routeBands: { value: RouteBand; label: string; hint: string }[] = [
  { value: "short", label: "Within the region", hint: "Under ~300 km" },
  { value: "medium", label: "Across states", hint: "~300–1,000 km" },
  { value: "long", label: "Across India", hint: "Over ~1,000 km" },
  { value: "intl_short", label: "International — nearby", hint: "Gulf, Southeast Asia, South Asia" },
  { value: "intl_long", label: "International — long-haul", hint: "Europe, USA, Africa, Australia" },
];

export const modes: { value: Mode; label: string }[] = [
  { value: "fixed_wing", label: "Air ambulance (fixed-wing)" },
  { value: "helicopter", label: "Helicopter" },
  { value: "commercial_escort", label: "Commercial flight + medical escort" },
  { value: "stretcher", label: "Airline stretcher" },
  { value: "ground", label: "Ground ambulance" },
];

export const complexities: { value: Complexity; label: string; hint: string }[] = [
  { value: "stable", label: "Stable", hint: "Basic monitoring" },
  { value: "monitoring", label: "Needs monitoring / oxygen", hint: "Continuous observation, some O₂" },
  { value: "critical", label: "Critical / ICU / ventilator", hint: "Critical-care team and equipment" },
];

type Range = [number, number];

/** Base mission cost by mode × route. `null` = not typically offered for that route. */
export const baseRanges: Record<Mode, Partial<Record<RouteBand, Range>>> = {
  fixed_wing: {
    short: [110_000, 250_000],
    medium: [250_000, 550_000],
    long: [350_000, 950_000],
    intl_short: [800_000, 2_200_000],
    intl_long: [2_500_000, 6_500_000],
  },
  helicopter: {
    short: [150_000, 400_000],
    medium: [300_000, 750_000],
  },
  commercial_escort: {
    medium: [40_000, 120_000],
    long: [60_000, 180_000],
    intl_short: [150_000, 450_000],
    intl_long: [300_000, 900_000],
  },
  stretcher: {
    medium: [150_000, 350_000],
    long: [200_000, 500_000],
    intl_short: [400_000, 900_000],
    intl_long: [800_000, 1_800_000],
  },
  ground: {
    short: [8_000, 60_000],
    medium: [30_000, 150_000],
    long: [80_000, 300_000],
  },
};

export const complexityMultiplier: Record<Complexity, number> = { stable: 1, monitoring: 1.15, critical: 1.45 };
export const urgentMultiplier = 1.1;
export const groundBothEnds: Record<"domestic" | "international", Range> = {
  domestic: [10_000, 60_000],
  international: [30_000, 120_000],
};

/** Illustrative split of a typical air transfer, for the explainer only. */
export const costSplit = [
  { label: "Aircraft & flying time (incl. positioning)", share: 0.58 },
  { label: "Medical team & equipment", share: 0.17 },
  { label: "Ground ambulances", share: 0.08 },
  { label: "Airport, handling & permits", share: 0.1 },
  { label: "Coordination", share: 0.07 },
];

export const costFactors = [
  { t: "Distance", d: "Flying time, including positioning the aircraft to the patient and back to base." },
  { t: "Aircraft", d: "Turboprop, light or mid-size jet, or helicopter — chosen for range, runway and configuration." },
  { t: "Medical complexity", d: "Monitoring, oxygen, infusions and specialist teams add equipment and crew." },
  { t: "ICU requirements", d: "Ventilators, multiple infusion pumps and critical-care-trained crew." },
  { t: "Ground ambulance", d: "The level of care and distance for both ground legs." },
  { t: "Medical crew", d: "Doctor, nurse or paramedic — and how many — per the patient's needs." },
  { t: "International logistics", d: "Overflight and landing permits, handling, immigration and fuel stops." },
  { t: "Airport charges", d: "Landing, parking, night operations and airside access fees." },
  { t: "Urgency", d: "Immediate dispatch vs a planned transfer on a flexible date." },
  { t: "Destination", d: "Receiving airport capability and distance to the receiving hospital." },
];

export type EstimateInput = { route: RouteBand; mode: Mode; complexity: Complexity; urgent: boolean; ground: boolean };

export function estimate(i: EstimateInput): { low: number; high: number; unavailable?: string; caution?: string } | null {
  const base = baseRanges[i.mode][i.route];
  if (!base) {
    return {
      low: 0,
      high: 0,
      unavailable:
        i.mode === "helicopter"
          ? "Helicopter transfers are generally limited to shorter regional distances."
          : i.mode === "ground"
            ? "Road transfer isn't practical for this distance."
            : "This option isn't typically used for this distance.",
    };
  }
  let caution: string | undefined;
  let mult = complexityMultiplier[i.complexity];
  if ((i.mode === "commercial_escort" || i.mode === "stretcher") && i.complexity === "critical") {
    caution = "Critically ill patients usually need a dedicated air ambulance — scheduled airlines may not accept them.";
    mult = 1.15;
  }
  if (i.urgent) mult *= urgentMultiplier;
  let [low, high] = [base[0] * mult, base[1] * mult];
  const intl = i.route.startsWith("intl");
  if (i.mode !== "ground") {
    const g = groundBothEnds[intl ? "international" : "domestic"];
    if (i.ground) {
      low += g[0];
      high += g[1];
    }
  }
  const round = (n: number) => Math.round(n / 10_000) * 10_000;
  return { low: Math.max(5_000, round(low)), high: round(high), caution };
}

export function formatINR(n: number) {
  if (n >= 100_000) {
    const lakh = n / 100_000;
    return `₹${lakh >= 10 ? Math.round(lakh) : lakh.toFixed(1).replace(/\.0$/, "")} L`;
  }
  return `₹${new Intl.NumberFormat("en-IN").format(n)}`;
}
