import { ImageResponse } from "next/og";

export const alt = "MedBridge — Medical care shouldn't stop because of distance.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07131f",
          padding: 72,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <path d="M5 31C5 5 35 5 35 31" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" fill="none" />
            <circle cx="5" cy="31" r="3.8" fill="#fff" />
            <circle cx="35" cy="31" r="3.8" fill="#16b3a3" />
            <path d="M20 20v10M15 25h10" stroke="#16b3a3" strokeWidth="3.6" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 30, letterSpacing: 6, fontWeight: 600 }}>MEDBRIDGE</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Medical care shouldn&apos;t stop because of distance.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a3b8cc" }}>
            Air ambulance · Medical transfer · International repatriation — 24/7
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#7fe3d6" }}>
          <div style={{ width: 120, height: 3, background: "#16b3a3" }} />
          From bedside to the right hospital.
        </div>
      </div>
    ),
    size,
  );
}
