import { geography } from "../lib/site";

// Stylized world coverage map — dotted continents, gold location pins with a
// pulsing halo, and routes fanning out from the Türkiye hub.
const CONTINENTS = [
  // North America
  "M150,112 C214,88 300,96 322,132 C334,153 316,176 300,181 C313,196 300,216 286,226 C263,243 236,251 226,236 C216,221 196,223 183,206 C159,193 132,171 136,146 C137,129 130,122 150,112 Z",
  // South America
  "M300,256 C332,249 356,263 359,291 C361,321 346,361 323,396 C313,411 299,411 293,393 C286,369 279,346 283,321 C285,301 286,266 300,256 Z",
  // Europe
  "M470,120 C502,110 542,117 547,139 C550,156 536,169 513,171 C493,173 470,166 465,149 C462,136 460,126 470,120 Z",
  // Africa
  "M492,196 C542,186 592,199 597,236 C600,271 576,321 546,356 C529,373 513,369 506,346 C496,316 479,286 479,251 C479,226 477,206 492,196 Z",
  // Asia
  "M560,104 C652,86 782,94 832,130 C854,148 847,176 822,183 C842,196 830,216 807,216 C772,216 722,221 692,206 C662,216 622,206 602,186 C577,176 550,150 553,127 C555,114 550,109 560,104 Z",
  // Australia
  "M762,320 C802,310 852,318 860,346 C864,369 842,386 814,386 C790,386 764,376 760,353 C758,339 752,326 762,320 Z"
];

export default function SupplyMap({ className = "" }: { className?: string }) {
  const hub = geography.find((g) => g.hub) ?? geography[0];
  const spokes = geography.filter((g) => !g.hub);

  return (
    <svg viewBox="0 0 1000 500" className={className} role="img" aria-label="Minex Grup global supply network map">
      <defs>
        <pattern id="worldDots" width="13" height="13" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#cfc6b4" fillOpacity="0.28" />
        </pattern>
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6c77e" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c9a24b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* continents */}
      <g>
        {CONTINENTS.map((d, i) => (
          <path key={i} d={d} fill="url(#worldDots)" stroke="#c9a24b" strokeOpacity="0.14" strokeWidth="1" />
        ))}
      </g>

      {/* routes from hub */}
      <g fill="none" stroke="#c9a24b" strokeOpacity="0.4" strokeWidth="1.4">
        {spokes.map((g) => {
          const mx = (hub.x + g.x) / 2;
          const my = (hub.y + g.y) / 2 - Math.abs(hub.x - g.x) * 0.22 - 20;
          return (
            <path
              key={g.region}
              className="map-flow"
              d={`M${hub.x},${hub.y} Q${mx},${my} ${g.x},${g.y}`}
            />
          );
        })}
      </g>

      {/* pins */}
      {geography.map((g, i) => {
        const isHub = !!g.hub;
        const labelAbove = isHub || g.y > 280;
        return (
          <g key={g.region}>
            <circle cx={g.x} cy={g.y} r="26" fill="url(#pinGlow)" />
            <circle
              className="map-pulse"
              cx={g.x}
              cy={g.y}
              r="6"
              fill="none"
              stroke="#e6c77e"
              strokeWidth="1.5"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
            <circle cx={g.x} cy={g.y} r={isHub ? 5.5 : 4} fill={isHub ? "#e6c77e" : "#c9a24b"} />
            <text
              x={g.x}
              y={labelAbove ? g.y - 14 : g.y + 22}
              textAnchor="middle"
              fill={isHub ? "#e6c77e" : "#cfc6b4"}
              fontSize="15"
              fontWeight={isHub ? 600 : 400}
              fontFamily="var(--font-body), system-ui, sans-serif"
            >
              {g.region}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
