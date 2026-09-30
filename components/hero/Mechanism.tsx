/**
 * "The Antikythera Mechanism": abstract gold line-art orrery for the hero.
 * Deterministic geometry (no randomness) so server and client markup match.
 * Rings draw in (.mech-draw) then rotate slowly (.mech-spin*); both are
 * disabled under prefers-reduced-motion in globals.css.
 */

const C = 500; // viewBox centre
const GREEK = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";

const f = (n: number) => n.toFixed(2);
const polar = (cx: number, cy: number, r: number, a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

function gearPath(cx: number, cy: number, r: number, teeth: number, depth: number) {
  const step = (Math.PI * 2) / teeth;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const corners: [number, number][] = [
      [r - depth, a],
      [r, a + step * 0.22],
      [r, a + step * 0.5],
      [r - depth, a + step * 0.72],
    ];
    for (const [rr, aa] of corners) {
      const [x, y] = polar(cx, cy, rr, aa);
      pts.push(`${f(x)} ${f(y)}`);
    }
  }
  return `M${pts.join("L")}Z`;
}

function ticks(r: number, count: number, len: number, every = 0, longLen = len) {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const l = every && i % every === 0 ? longLen : len;
    const [x1, y1] = polar(C, C, r, a);
    const [x2, y2] = polar(C, C, r - l, a);
    d += `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;
  }
  return d;
}

function spokes(cx: number, cy: number, r0: number, r1: number, count: number, offset = 0) {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = offset + (i / count) * Math.PI * 2;
    const [x1, y1] = polar(cx, cy, r0, a);
    const [x2, y2] = polar(cx, cy, r1, a);
    d += `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;
  }
  return d;
}

// A few "constellations" scattered around the outer field (fixed points).
const CONSTELLATIONS: [number, number][][] = [
  [[70, 180], [140, 120], [215, 150], [260, 90], [330, 70]],
  [[840, 120], [900, 190], [880, 270], [950, 330]],
  [[60, 780], [120, 850], [210, 830], [250, 920]],
  [[790, 880], [860, 820], [930, 860], [900, 950]],
];

const draw = (delay: number) => ({ className: "mech-draw", pathLength: 1, style: { "--d": `${delay}ms` } as React.CSSProperties });
const spin = (seconds: number, reverse = false, origin?: string) => ({
  className: `mech-ring ${reverse ? "mech-spin-rev" : "mech-spin"}`,
  style: { "--t": `${seconds}s`, transformOrigin: origin } as React.CSSProperties,
});

export function Mechanism({ className }: { className?: string }) {
  const g1 = { cx: 745, cy: 285, r: 92, teeth: 30 };
  const g2 = { cx: 290, cy: 735, r: 64, teeth: 22 };

  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1000 1000"
      className={className}
      fill="none"
      stroke="url(#mech-gold)"
      strokeLinecap="round"
    >
      <defs>
        <linearGradient id="mech-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8d3a0" />
          <stop offset="0.45" stopColor="#c9a45c" />
          <stop offset="1" stopColor="#a8843f" />
        </linearGradient>
        <radialGradient id="mech-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8d3a0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#e8d3a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* constellations (static) */}
      <g className="hero-fade" style={{ "--d": "900ms" } as React.CSSProperties} strokeWidth="0.6" opacity="0.7">
        {CONSTELLATIONS.map((pts, i) => (
          <g key={i}>
            <path d={`M${pts.map(([x, y]) => `${x} ${y}`).join("L")}`} strokeDasharray="2 4" />
            {pts.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill="#c9a45c" stroke="none" />
            ))}
          </g>
        ))}
      </g>

      {/* outer degree ring */}
      <g {...spin(360)}>
        <circle cx={C} cy={C} r="488" strokeWidth="1.2" {...draw(0)} />
        <path d={ticks(488, 180, 6, 5, 14)} strokeWidth="0.7" className="hero-fade" style={{ "--d": "400ms" } as React.CSSProperties} />
        <circle cx={C} cy={C} r="468" strokeWidth="0.6" {...draw(100)} />
      </g>

      {/* Greek letter band */}
      <g {...spin(240, true)}>
        <circle cx={C} cy={C} r="452" strokeWidth="0.8" {...draw(200)} />
        <circle cx={C} cy={C} r="412" strokeWidth="0.8" {...draw(250)} />
        <path d={spokes(C, C, 412, 452, 24, Math.PI / 24)} strokeWidth="0.6" className="hero-fade" style={{ "--d": "600ms" } as React.CSSProperties} />
        <g className="hero-fade" style={{ "--d": "700ms" } as React.CSSProperties} stroke="none" fill="#a8843f">
          {GREEK.split("").map((ch, i) => {
            const a = (i / 24) * Math.PI * 2;
            const [x, y] = polar(C, C, 432, a);
            const deg = (a * 180) / Math.PI + 90;
            return (
              <text
                key={ch}
                x={f(x)}
                y={f(y)}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="17"
                fontFamily="Georgia, 'Times New Roman', serif"
                transform={`rotate(${f(deg)} ${f(x)} ${f(y)})`}
              >
                {ch}
              </text>
            );
          })}
        </g>
      </g>

      {/* main gear */}
      <g {...spin(200)}>
        <path d={gearPath(C, C, 372, 120, 9)} strokeWidth="1" {...draw(300)} />
        <circle cx={C} cy={C} r="340" strokeWidth="0.6" {...draw(350)} />
        <path d={spokes(C, C, 120, 340, 4, Math.PI / 4)} strokeWidth="0.9" className="hero-fade" style={{ "--d": "900ms" } as React.CSSProperties} />
      </g>

      {/* zodiac ring: 12 divisions */}
      <g {...spin(150, true)}>
        <circle cx={C} cy={C} r="300" strokeWidth="0.8" {...draw(400)} />
        <circle cx={C} cy={C} r="270" strokeWidth="0.5" strokeDasharray="1 7" />
        <path d={spokes(C, C, 270, 300, 12)} strokeWidth="0.8" className="hero-fade" style={{ "--d": "800ms" } as React.CSSProperties} />
        <path d={ticks(300, 72, 5)} strokeWidth="0.5" className="hero-fade" style={{ "--d": "900ms" } as React.CSSProperties} />
      </g>

      {/* inner gear + sun */}
      <g {...spin(90)}>
        <path d={gearPath(C, C, 150, 48, 7)} strokeWidth="1" {...draw(500)} />
        <circle cx={C} cy={C} r="120" strokeWidth="0.6" {...draw(550)} />
      </g>
      <circle cx={C} cy={C} r="110" fill="url(#mech-sun)" stroke="none" className="hero-fade" style={{ "--d": "600ms" } as React.CSSProperties} />

      {/* meshing satellite gears (rotate about their own centres) */}
      <g {...spin(40, true, `${g1.cx}px ${g1.cy}px`)}>
        <path d={gearPath(g1.cx, g1.cy, g1.r, g1.teeth, 8)} strokeWidth="1" {...draw(700)} />
        <circle cx={g1.cx} cy={g1.cy} r={g1.r - 26} strokeWidth="0.6" {...draw(750)} />
        <path d={spokes(g1.cx, g1.cy, 10, g1.r - 26, 6)} strokeWidth="0.7" />
        <circle cx={g1.cx} cy={g1.cy} r="10" strokeWidth="0.8" />
      </g>
      <g {...spin(30, false, `${g2.cx}px ${g2.cy}px`)}>
        <path d={gearPath(g2.cx, g2.cy, g2.r, g2.teeth, 7)} strokeWidth="1" {...draw(800)} />
        <circle cx={g2.cx} cy={g2.cy} r={g2.r - 20} strokeWidth="0.6" {...draw(850)} />
        <path d={spokes(g2.cx, g2.cy, 8, g2.r - 20, 5)} strokeWidth="0.7" />
        <circle cx={g2.cx} cy={g2.cy} r="8" strokeWidth="0.8" />
      </g>

      {/* pointer arm (static): the "date hand" */}
      <g className="hero-fade" style={{ "--d": "1100ms" } as React.CSSProperties}>
        <path d={`M${C} ${C}L${C + 330} ${C - 190}`} strokeWidth="1" />
        <circle cx={C + 330} cy={C - 190} r="5" fill="#c9a45c" stroke="none" />
        <circle cx={C} cy={C} r="6" fill="#c9a45c" stroke="none" />
      </g>
    </svg>
  );
}
