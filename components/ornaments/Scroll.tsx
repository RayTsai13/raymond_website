/**
 * Hanging-scroll parts for the About section: a bronze roller with gold
 * finials, and drifting gold dust. Decorative only (aria-hidden), and
 * deterministic (no randomness) so server and client markup match.
 */

const f = (n: number) => n.toFixed(1);

function Finial({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* collar where the knob meets the rod */}
      <rect x="15" y="7" width="9" height="10" rx="1.5" fill="#a8843f" />
      <rect x="15" y="7" width="9" height="3" rx="1.5" fill="#e8d3a0" opacity="0.7" />
      {/* knob */}
      <circle cx="10" cy="12" r="8" fill="#c9a45c" stroke="#a8843f" strokeWidth="1" />
      <circle cx="7.5" cy="9" r="2.6" fill="#e8d3a0" opacity="0.85" />
    </svg>
  );
}

/** A bronze dowel with gold knob finials; overhangs its container by 1.25rem each side. */
export function ScrollRoller({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`-mx-5 flex items-center ${className ?? ""}`}>
      <Finial />
      <div className="h-3.5 flex-1 rounded-[3px] bg-[linear-gradient(to_bottom,#9a7650_0%,#c49a68_28%,#6b4e2e_62%,#3d2b17_100%)] shadow-[0_3px_6px_rgb(60_40_10/0.25)]" />
      <Finial flip />
    </div>
  );
}

const DEPTHS = {
  far: { count: 42, r: 1.3, opacity: 0.35, seed: 0.13 },
  mid: { count: 24, r: 2.1, opacity: 0.5, seed: 0.41 },
  near: { count: 12, r: 3.2, opacity: 0.55, seed: 0.77 },
} as const;

export type DustDepth = keyof typeof DEPTHS;

/** One layer of gold specks, evenly scattered via the R2 low-discrepancy sequence. */
export function DustMotes({ depth, className }: { depth: DustDepth; className?: string }) {
  const { count, r, opacity, seed } = DEPTHS[depth];
  const motes = Array.from({ length: count }, (_, i) => {
    const x = ((seed + (i + 1) * 0.7548776662) % 1) * 1000;
    const y = ((seed + (i + 1) * 0.5698402910) % 1) * 1000;
    return { x, y, light: i % 3 === 0 };
  });
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      opacity={opacity}
    >
      {motes.map(({ x, y, light }) => (
        <circle key={`${f(x)}-${f(y)}`} cx={f(x)} cy={f(y)} r={r} fill={light ? "#e8d3a0" : "#c9a45c"} />
      ))}
    </svg>
  );
}
