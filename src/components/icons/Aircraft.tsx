/** Top-down aircraft glyph pointing right (+x), centred on 0,0 — for SVG route animations. */
export function AircraftGlyph({ fill = "#fff", scale = 1 }: { fill?: string; scale?: number }) {
  return (
    <path
      transform={`scale(${scale})`}
      fill={fill}
      d="M9 0c0-.9-.7-1.4-1.6-1.4H3.2L-1.8-8.6h-2.1l2.4 7.2h-4.3l-1.7-2.3h-1.6l1 3.7-1 3.7h1.6l1.7-2.3h4.3l-2.4 7.2h2.1L3.2 1.4h4.2C8.3 1.4 9 .9 9 0Z"
    />
  );
}
