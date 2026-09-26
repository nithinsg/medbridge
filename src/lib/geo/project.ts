export type MapMeta = {
  readonly bounds: readonly [number, number, number, number]; // lonMin, lonMax, latMin, latMax
  readonly scaleX: number;
  readonly scaleY: number;
  readonly width: number;
  readonly height: number;
};

export type Pt = { x: number; y: number };

/** Same projection the dotted maps were generated with (scripts/generate-maps.mjs). */
export function project(map: MapMeta, lat: number, lon: number): Pt {
  return { x: (lon - map.bounds[0]) * map.scaleX, y: (map.bounds[3] - lat) * map.scaleY };
}

/** Quadratic arc between two points that always bows "north" (upwards). */
export function arcPath(a: Pt, b: Pt, bend = 0.22) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const cx = mx + nx * len * bend;
  const cy = my + ny * len * bend;
  const f = (n: number) => Math.round(n * 10) / 10;
  return `M${f(a.x)} ${f(a.y)}Q${f(cx)} ${f(cy)} ${f(b.x)} ${f(b.y)}`;
}
