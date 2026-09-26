/**
 * Geographic reference data for maps. Coordinates are public city locations.
 * These are *illustrative routes*, not claims of past missions.
 */
export type Place = { id: string; name: string; lat: number; lon: number };

export const indianHubs: Place[] = [
  { id: "del", name: "Delhi", lat: 28.61, lon: 77.21 },
  { id: "bom", name: "Mumbai", lat: 19.08, lon: 72.88 },
  { id: "blr", name: "Bengaluru", lat: 12.97, lon: 77.59 },
  { id: "hyd", name: "Hyderabad", lat: 17.39, lon: 78.49 },
  { id: "maa", name: "Chennai", lat: 13.08, lon: 80.27 },
  { id: "ccu", name: "Kolkata", lat: 22.57, lon: 88.36 },
  { id: "gau", name: "Guwahati", lat: 26.14, lon: 91.74 },
  { id: "amd", name: "Ahmedabad", lat: 23.02, lon: 72.57 },
  { id: "cok", name: "Kochi", lat: 9.93, lon: 76.27 },
  { id: "pat", name: "Patna", lat: 25.59, lon: 85.14 },
  { id: "ixr", name: "Ranchi", lat: 23.34, lon: 85.31 },
  { id: "sxr", name: "Srinagar", lat: 34.08, lon: 74.8 },
  { id: "lko", name: "Lucknow", lat: 26.85, lon: 80.95 },
  { id: "bbi", name: "Bhubaneswar", lat: 20.3, lon: 85.82 },
  { id: "jai", name: "Jaipur", lat: 26.91, lon: 75.79 },
  { id: "ixb", name: "Siliguri", lat: 26.73, lon: 88.4 },
];

export type RepatriationOrigin = Place & {
  region: string;
  /** Rough great-circle distance band to India for the explainer — not a flight plan. */
  typical: string;
  /** Destination hub used to draw the illustrative arc. */
  to: string;
};

export const repatriationOrigins: RepatriationOrigin[] = [
  { id: "sin", name: "Singapore", region: "Southeast Asia", lat: 1.35, lon: 103.82, typical: "Medium-haul", to: "maa" },
  { id: "dxb", name: "Dubai", region: "Middle East", lat: 25.2, lon: 55.27, typical: "Short to medium-haul", to: "bom" },
  { id: "bkk", name: "Bangkok", region: "Southeast Asia", lat: 13.75, lon: 100.5, typical: "Medium-haul", to: "ccu" },
  { id: "kul", name: "Kuala Lumpur", region: "Southeast Asia", lat: 3.14, lon: 101.69, typical: "Medium-haul", to: "blr" },
  { id: "doh", name: "Doha", region: "Middle East", lat: 25.29, lon: 51.53, typical: "Short to medium-haul", to: "cok" },
  { id: "ruh", name: "Riyadh", region: "Middle East", lat: 24.71, lon: 46.68, typical: "Medium-haul", to: "hyd" },
  { id: "lhr", name: "London", region: "Europe", lat: 51.5, lon: -0.13, typical: "Long-haul", to: "del" },
  { id: "fra", name: "Frankfurt", region: "Europe", lat: 50.11, lon: 8.68, typical: "Long-haul", to: "del" },
  { id: "jfk", name: "New York", region: "USA", lat: 40.71, lon: -74.0, typical: "Ultra long-haul", to: "del" },
  { id: "sfo", name: "San Francisco", region: "USA", lat: 37.77, lon: -122.42, typical: "Ultra long-haul", to: "blr" },
  { id: "nbo", name: "Nairobi", region: "Africa", lat: -1.29, lon: 36.82, typical: "Long-haul", to: "bom" },
  { id: "syd", name: "Sydney", region: "Australia", lat: -33.87, lon: 151.21, typical: "Ultra long-haul", to: "maa" },
];

export const hubById = (id: string) => indianHubs.find((h) => h.id === id)!;
