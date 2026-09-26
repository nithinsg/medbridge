import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b1d2e" }}>
        <svg width="120" height="120" viewBox="0 0 40 40">
          <path d="M5 31C5 5 35 5 35 31" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" fill="none" />
          <circle cx="5" cy="31" r="3.8" fill="#fff" />
          <circle cx="35" cy="31" r="3.8" fill="#16b3a3" />
          <path d="M20 20v10M15 25h10" stroke="#16b3a3" strokeWidth="3.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
