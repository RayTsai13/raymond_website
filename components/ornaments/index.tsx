/**
 * Original ornament library (design/02 → "Ornament library").
 * Every ornament is decorative: aria-hidden, no focus, currentColor strokes.
 */
import type { SVGProps } from "react";

type OrnamentProps = SVGProps<SVGSVGElement>;

const deco = { "aria-hidden": true, focusable: false } as const;

const MEANDER_UNIT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12'%3E%3Cpath d='M0 11.5H16M1 11.5V2.5H13V9.5H5V5.5H9.5' fill='none' stroke='%23c9a45c' stroke-width='1.1'/%3E%3C/svg%3E\")";

/** Greek key (meander) band that tiles horizontally. Always decorative gold-500. */
export function Meander({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ height: 12, backgroundImage: MEANDER_UNIT, backgroundRepeat: "repeat-x", backgroundPosition: "center" }}
    />
  );
}

/** Acanthus-style corner curl. Rotate via className for the other corners. */
export function CornerFiligree({ className, ...props }: OrnamentProps) {
  return (
    <svg {...deco} viewBox="0 0 40 40" width="32" height="32" className={className} fill="none" {...props}>
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
        <path d="M2 38V12C2 6.5 6.5 2 12 2h26" />
        <path d="M7 38V16c0-5 4-9 9-9h22" opacity="0.55" />
        <path d="M12 12c0-3 2.5-5 5-3.5 2 1.2 1 4-1 4-1.5 0-2-1.3-1.2-2" />
        <path d="M12 12c-3 0-5 2.5-3.5 5 1.2 2 4 1 4-1 0-1.5-1.3-2-2-1.2" />
      </g>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Small eight-petal rosette. Used for bullets, timeline nodes, active marks. */
export function Rosette({ className, ...props }: OrnamentProps) {
  return (
    <svg {...deco} viewBox="0 0 20 20" width="12" height="12" className={className} {...props}>
      <g fill="currentColor">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="10" cy="4.6" rx="1.9" ry="4" transform={`rotate(${i * 45} 10 10)`} opacity="0.85" />
        ))}
      </g>
      <circle cx="10" cy="10" r="2.2" fill="var(--color-ivory-0)" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Laurel wreath: two leafy branches rising from the base around a circle. */
export function Laurel({ className, leaves = 9, ...props }: OrnamentProps & { leaves?: number }) {
  const R = 43;
  const leafEls: React.ReactNode[] = [];
  for (let i = 0; i < leaves; i++) {
    // φ: 0 at the bottom of the circle, sweeping up the side to ~145°.
    const phi = ((14 + (i * 128) / (leaves - 1)) * Math.PI) / 180;
    const size = 1 - (i / (leaves - 1)) * 0.4;
    const px = R * Math.sin(phi);
    const py = R * Math.cos(phi);
    // Tangent (direction of growth) in degrees, for the right-hand branch.
    const tangent = (Math.atan2(-Math.sin(phi), Math.cos(phi)) * 180) / Math.PI;
    for (const s of [1, -1]) {
      // s = 1 outer leaf, -1 inner leaf; each tilts away from the stem.
      const cx = px + Math.sin(phi) * s * 3.4 + Math.cos(phi) * 1.2;
      const cy = py + Math.cos(phi) * s * 3.4 - Math.sin(phi) * 1.2;
      const rot = tangent + 90 - s * 32;
      for (const side of [1, -1]) {
        const x = 50 + side * cx;
        const y = 50 + cy;
        leafEls.push(
          <ellipse
            key={`${i}-${s}-${side}`}
            cx={x.toFixed(2)}
            cy={y.toFixed(2)}
            rx={(1.9 * size).toFixed(2)}
            ry={(4.6 * size).toFixed(2)}
            transform={`rotate(${(side * rot).toFixed(1)} ${x.toFixed(2)} ${y.toFixed(2)})`}
          />,
        );
      }
    }
  }
  const arc = (side: 1 | -1) => {
    const end = (145 * Math.PI) / 180;
    const x = 50 + side * R * Math.sin(end);
    const y = 50 + R * Math.cos(end);
    return `M50 ${50 + R}A${R} ${R} 0 0 ${side === 1 ? 0 : 1} ${x.toFixed(2)} ${y.toFixed(2)}`;
  };
  return (
    <svg {...deco} viewBox="0 0 100 100" className={className} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d={arc(1)} />
        <path d={arc(-1)} />
      </g>
      <g fill="currentColor" opacity="0.9">{leafEls}</g>
    </svg>
  );
}

/** Ionic capital, used to cap the timeline rail. */
export function IonicCapital({ className, ...props }: OrnamentProps) {
  return (
    <svg {...deco} viewBox="0 0 64 24" width="64" height="24" className={className} fill="none" {...props}>
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
        <path d="M4 3h56" />
        <path d="M10 7h44" />
        <path d="M14 7c-6 0-9 4-7.5 8 1.4 3.6 7 3.6 7.5 0 .4-2.4-2.4-3.6-3.8-2" />
        <path d="M50 7c6 0 9 4 7.5 8-1.4 3.6-7 3.6-7.5 0-.4-2.4 2.4-3.6 3.8-2" />
        <path d="M20 12h24M24 16h16" />
        <path d="M28 16v8M36 16v8" />
      </g>
    </svg>
  );
}

/** "RT" roundel monogram. */
export function Monogram({ className, ...props }: OrnamentProps) {
  return (
    <svg {...deco} viewBox="0 0 48 48" className={className} {...props}>
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <text
        x="24"
        y="29.5"
        textAnchor="middle"
        fontFamily="var(--font-cinzel), Georgia, serif"
        fontWeight="600"
        fontSize="15"
        letterSpacing="0.5"
        fill="currentColor"
      >
        RT
      </text>
    </svg>
  );
}
