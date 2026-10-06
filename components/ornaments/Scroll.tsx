/**
 * Hanging-scroll parts for the About section: a roll of the parchment itself
 * on a gilt rod, and faint line-art constellations (the hero mechanism's
 * vocabulary) for the parallax layers. Decorative only (aria-hidden), and
 * deterministic (no randomness) so server and client markup match.
 */
import { useId } from "react";

/** Gilt rod end (cornu) poking out past the roll; points left unless flipped. */
function RodEnd({ flip = false }: { flip?: boolean }) {
  const id = useId();
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 16 24"
      className="h-6 w-4 shrink-0"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e4bd" />
          <stop offset="0.35" stopColor="#c9a45c" />
          <stop offset="1" stopColor="#7a5c24" />
        </linearGradient>
      </defs>
      {/* ferrule capping the roll, a short neck, then a turned knob */}
      <rect x="11" y="5" width="5" height="14" rx="1" fill={`url(#${id})`} />
      <rect x="8.6" y="9.5" width="2.8" height="5" fill={`url(#${id})`} />
      <ellipse cx="5.2" cy="12" rx="4.6" ry="5.4" fill={`url(#${id})`} />
      <ellipse cx="4.2" cy="9.6" rx="1.8" ry="1.3" fill="#fbf1d6" opacity="0.7" />
      <path d="M11 5V19" stroke="#7a5c24" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

/**
 * The rolled-up parchment: a cylinder in the sheet's own colours, lit from
 * above like the rest of the page, with the edge of the outer layer showing.
 * Overhangs its container by the rod ends so the roll matches the sheet width.
 */
export function ScrollRoller({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`-mx-4 flex items-center ${className ?? ""}`}>
      <RodEnd />
      <div
        className="relative h-5 flex-1 rounded-[2px] shadow-[0_2px_3px_rgb(90_60_20/0.22),0_6px_14px_rgb(90_60_20/0.1)]"
        style={{
          background: [
            // the outer layer's edge, just below the crown
            "linear-gradient(to bottom, transparent 62%, rgb(122 92 36 / 0.22) 62%, rgb(122 92 36 / 0.22) calc(62% + 1px), transparent calc(62% + 1px))",
            // cylinder shading: soft highlight on top, falling into shadow underneath
            "linear-gradient(to bottom, #d8c69c 0%, #fbf4e3 20%, #f1e6cc 42%, #e2d2ab 66%, #b89c68 92%, #9c8152 100%)",
          ].join(","),
        }}
      >
        {/* paper-thin rims where the roll meets the rod */}
        <span className="absolute inset-y-0 left-0 w-px bg-bronze-700/25" />
        <span className="absolute inset-y-0 right-0 w-px bg-bronze-700/25" />
      </div>
      <RodEnd flip />
    </div>
  );
}

type Pt = [number, number];

// Constellations for the gutters either side of the scroll (viewBox 300×900 per side).
const FIELDS: Record<"far" | "near", { left: Pt[][]; right: Pt[][]; r: number; opacity: number }> = {
  far: {
    left: [
      [[40, 120], [110, 90], [170, 150], [230, 130]],
      [[70, 520], [125, 470], [160, 560], [95, 610]],
    ],
    right: [
      [[70, 270], [140, 225], [200, 300], [262, 272]],
      [[50, 770], [130, 728], [212, 795]],
    ],
    r: 1.6,
    opacity: 0.4,
  },
  near: {
    left: [
      [[150, 300], [218, 362], [182, 432], [250, 485]],
      [[60, 820], [140, 776], [205, 830]],
    ],
    right: [
      [[62, 545], [130, 602], [210, 560], [238, 642]],
      [[100, 40], [190, 92], [252, 44]],
    ],
    r: 2.2,
    opacity: 0.65,
  },
};

function Constellations({ groups, r, opacity, className }: { groups: Pt[][]; r: number; opacity: number; className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 300 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      opacity={opacity}
      fill="none"
      stroke="#c9a45c"
      strokeLinecap="round"
    >
      {groups.map((pts) => (
        <g key={pts.join()}>
          <path d={`M${pts.map(([x, y]) => `${x} ${y}`).join("L")}`} strokeWidth="0.7" strokeDasharray="2 4" />
          {pts.map(([x, y], i) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r={r} fill="#c9a45c" stroke="none" />
              {/* the brightest star of each figure gets a halo ring */}
              {i === 0 && <circle cx={x} cy={y} r={r * 3} strokeWidth="0.5" />}
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

export type StarDepth = keyof typeof FIELDS;

/** One parallax layer: a constellation panel in each gutter beside the scroll. */
export function StarField({ depth, className }: { depth: StarDepth; className?: string }) {
  const { left, right, r, opacity } = FIELDS[depth];
  return (
    <div aria-hidden className={className}>
      <Constellations groups={left} r={r} opacity={opacity} className="absolute inset-y-0 left-0 h-full w-[min(22vw,320px)]" />
      <Constellations groups={right} r={r} opacity={opacity} className="absolute inset-y-0 right-0 h-full w-[min(22vw,320px)]" />
    </div>
  );
}
