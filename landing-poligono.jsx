// landing-poligono.jsx — polygon + colindancias section, slots into the Mapa section as a second view.

// Polygon SVG drawn from the levantamiento topográfico:
// Vertices (clockwise from top-left):
//   A (top-left)
//   B (top-mid)        — 6.52 m  to A     (straight, slight angle down-right)
//   C (top-right)      — Lc 13.82 m to B  (CURVED OUTWARD — Sendero del Alabastro)
//   D (right-upper)    — 5.28 m  to C     (straight, going down-right)
//   E (bottom-right)   — 23.77 m to D     (LONG DIAGONAL down-left · linda con Lote 15)
//   F (bottom)         — 7.09 m  to E     (curva sutil al sur)
//   back to A          — 30.00 m on west side (vertical · linda con lote vecino)
// The lot tapers from wide top to narrow bottom — that's the actual shape.

// Coordinate space 800x720 for the polygon drawing
const POLY_PTS = {
  A: { x: 250, y: 180 },   // top-left
  B: { x: 340, y: 200 },   // top-mid
  C: { x: 530, y: 220 },   // top-right (end of curve)
  D: { x: 565, y: 300 },   // right-upper
  E: { x: 350, y: 530 },   // bottom-right (end of long diagonal)
  F: { x: 260, y: 545 },   // bottom (small curve)
};

// Each side: { from, to, length, label, colindancia, description, midX, midY, side }
const POLY_SIDES = [
  { id: 'top1', from: 'A', to: 'B', len: '6.52 m',     label: 'A',
    colindancia: 'Lote vecino al norte', kind: 'lot',
    midX: 295, midY: 175 },
  { id: 'top2', from: 'B', to: 'C', len: 'Lc 13.82 m', label: 'B',
    colindancia: 'Sendero del Alabastro', subtag: 'Acceso vehicular',
    description: 'Frente sobre la vialidad — curva del privado. El Número Oficial 1 (acceso exterior) está aquí; los oficiales 1A, 1B y 1C habilitan la división interior en régimen de condominio.',
    kind: 'street',
    midX: 435, midY: 175 },
  { id: 'east-upper', from: 'C', to: 'D', len: '5.28 m', label: 'C',
    colindancia: 'Lote 15 · esquina este', kind: 'lot',
    midX: 595, midY: 250 },
  { id: 'east', from: 'D', to: 'E', len: '23.77 m',    label: 'D',
    colindancia: 'Lote 15 · vecino al este',
    description: 'Linda directa con el lote 15. Es la banda más larga del costado, define la fachada lateral del eventual edificio.',
    kind: 'lot',
    midX: 488, midY: 415 },
  { id: 'south', from: 'E', to: 'F', len: '7.09 m',    label: 'E',
    colindancia: 'Sendero del Alabastro · curva sur',
    description: 'Segundo punto de la vialidad. Curva pequeña — habilita acceso peatonal o secundario.',
    kind: 'street',
    midX: 305, midY: 565 },
  { id: 'west', from: 'F', to: 'A', len: '30.00 m',    label: 'F',
    colindancia: 'Lote vecino al poniente',
    description: 'Banda larga de 30 m — borde más grande del predio. Aprovechable para fachada principal con vistas N/NO sobre la barranca.',
    kind: 'lot',
    midX: 232, midY: 360 },
];

function L_PolygonView() {
  const [hovered, setHovered] = React.useState(null);

  const pts = POLY_PTS;
  // Build polygon path. Curves: B→C is the main top arc (Lc 13.82),
  // E→F is a subtle south curve. The rest are straight lines.
  const pathD = `
    M ${pts.A.x} ${pts.A.y}
    L ${pts.B.x} ${pts.B.y}
    Q ${(pts.B.x + pts.C.x)/2} ${pts.B.y - 36} ${pts.C.x} ${pts.C.y}
    L ${pts.D.x} ${pts.D.y}
    L ${pts.E.x} ${pts.E.y}
    Q ${(pts.E.x + pts.F.x)/2} ${pts.E.y + 22} ${pts.F.x} ${pts.F.y}
    L ${pts.A.x} ${pts.A.y}
    Z
  `;

  const hi = POLY_SIDES.find(s => s.id === hovered);

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1.4fr 1fr',
      gap: 48,
      marginTop: 80,
    }}>
      {/* SVG polygon */}
      <div style={{
        position: 'relative',
        background: '#0A1538',
        border: `1px solid ${L_PALETTE.gold}33`,
        aspectRatio: '800 / 720',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 800 720"
          style={{ position: 'absolute', inset: 0, display: 'block' }}>
          <defs>
            <pattern id="poly-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={L_PALETTE.gold} strokeWidth="0.4" opacity="0.18"/>
            </pattern>
            <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={L_PALETTE.gold} strokeWidth="1" opacity="0.22"/>
            </pattern>
          </defs>
          <rect width="800" height="720" fill="url(#poly-grid)"/>

          {/* North arrow */}
          <g transform="translate(720, 60)">
            <circle cx="0" cy="0" r="26" fill="rgba(7,14,39,0.7)" stroke={L_PALETTE.gold} strokeWidth="0.8"/>
            <polygon points="0,-16 6,8 0,2 -6,8" fill={L_PALETTE.gold}/>
            <text x="0" y="-22" textAnchor="middle"
              fontFamily={L_MONO} fontSize="12" fill={L_PALETTE.gold} letterSpacing="2">N</text>
          </g>

          {/* Adjacent Lot 15 sketch (right side, follows new diagonal) */}
          <g opacity="0.32">
            <path d={`
              M ${pts.C.x} ${pts.C.y}
              L ${pts.C.x + 90} ${pts.C.y + 40}
              L ${pts.D.x + 110} ${pts.D.y + 30}
              L ${pts.E.x + 130} ${pts.E.y + 60}
              L ${pts.E.x} ${pts.E.y}
              L ${pts.D.x} ${pts.D.y}
              Z
            `} fill="rgba(202,220,252,0.05)" stroke={L_PALETTE.ice} strokeWidth="1" strokeDasharray="4 6"/>
            <text x={pts.D.x + 70} y={(pts.D.y + pts.E.y)/2 + 6}
              fontFamily={L_SERIF} fontSize="20" fill={L_PALETTE.ice} opacity="0.75"
              textAnchor="middle">15</text>
            <circle cx={pts.D.x + 70} cy={(pts.D.y + pts.E.y)/2}
              r="18" fill="none" stroke={L_PALETTE.ice} strokeWidth="0.8" opacity="0.5"/>
          </g>

          {/* Adjacent west-side lot (left of 30m edge) */}
          <g opacity="0.32">
            <path d={`
              M ${pts.A.x} ${pts.A.y}
              L ${pts.A.x - 120} ${pts.A.y + 30}
              L ${pts.A.x - 100} ${pts.F.y - 10}
              L ${pts.F.x} ${pts.F.y}
              Z
            `} fill="rgba(202,220,252,0.05)" stroke={L_PALETTE.ice} strokeWidth="1" strokeDasharray="4 6"/>
            <text x={pts.A.x - 65} y={(pts.A.y + pts.F.y)/2 + 6}
              fontFamily={L_SERIF} fontStyle="italic" fontSize="14"
              fill={L_PALETTE.ice} opacity="0.7" textAnchor="middle">vecino W</text>
          </g>

          {/* Street arc above (Sendero del Alabastro, where Lc 13.82 lives) */}
          <path d={`M ${pts.A.x - 30} ${pts.A.y - 70} Q ${(pts.B.x + pts.C.x)/2} ${pts.B.y - 110} ${pts.C.x + 60} ${pts.C.y - 30}`}
            fill="none" stroke={L_PALETTE.ivory} strokeWidth="34" opacity="0.06"/>
          <text x={(pts.B.x + pts.C.x)/2 - 30} y={pts.B.y - 70}
            fontFamily={L_MONO} fontSize="13" fill={L_PALETTE.ice} opacity="0.55"
            letterSpacing="2.5" textAnchor="middle">
            SENDERO DEL ALABASTRO
          </text>

          {/* Lote 14 polygon */}
          <path d={pathD} fill="url(#hatch)" stroke={L_PALETTE.gold} strokeWidth="2.5"/>

          {/* Hover highlight overlay on sides */}
          {POLY_SIDES.map(s => {
            const from = pts[s.from], to = pts[s.to];
            const isHover = hovered === s.id;
            // Approximate each side as a thick invisible hit-line
            return (
              <g key={s.id}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="transparent" strokeWidth="40"
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}/>
                {isHover && (
                  <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={L_PALETTE.gold} strokeWidth="4"
                    style={{ filter: `drop-shadow(0 0 12px ${L_PALETTE.gold})` }}/>
                )}
              </g>
            );
          })}

          {/* Vertex labels A-F */}
          {Object.entries(pts).map(([k, p]) => (
            <g key={k}>
              <circle cx={p.x} cy={p.y} r="6" fill={L_PALETTE.gold}/>
              <text x={p.x} y={p.y - 14}
                fontFamily={L_SERIF} fontStyle="italic" fontSize="20"
                fill={L_PALETTE.ivory} textAnchor="middle">{k}</text>
            </g>
          ))}

          {/* Side measurement labels */}
          {POLY_SIDES.map(s => (
            <g key={s.id + '-label'}>
              <rect x={s.midX - 38} y={s.midY - 14} width="76" height="28"
                fill="rgba(7,14,39,0.85)" stroke={L_PALETTE.gold} strokeWidth="0.6"/>
              <text x={s.midX} y={s.midY + 5}
                fontFamily={L_MONO} fontSize="13" fill={L_PALETTE.gold}
                letterSpacing="1.5" textAnchor="middle">{s.len}</text>
            </g>
          ))}

          {/* Center area label */}
          <g>
            <text x="405" y="370" textAnchor="middle"
              fontFamily={L_SERIF} fontSize="68" fill={L_PALETTE.ivory}
              letterSpacing="-2">
              447.22
            </text>
            <text x="405" y="402" textAnchor="middle"
              fontFamily={L_MONO} fontSize="13" fill={L_PALETTE.gold}
              letterSpacing="3">
              M² · LOTE 14
            </text>
          </g>

          {/* Bottom-left coords */}
          <g transform="translate(40, 690)">
            <text fontFamily={L_MONO} fontSize="11" fill={L_PALETTE.ice} opacity="0.7"
              letterSpacing="2">
              20°35'57.9"N · 100°21'50.9"W
            </text>
          </g>
        </svg>
      </div>

      {/* Sidebar — colindancias list */}
      <div>
        <div style={{
          fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
          fontSize: 11, letterSpacing: '0.4em', marginBottom: 20,
        }}>SEIS LADOS · COLINDANCIAS</div>

        {POLY_SIDES.map(s => {
          const isHover = hovered === s.id;
          return (
            <div key={s.id}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto',
                gap: 18, alignItems: 'center',
                padding: '18px 18px',
                borderBottom: `1px solid rgba(201,169,97,${isHover ? 0.45 : 0.12})`,
                background: isHover ? 'rgba(201,169,97,0.06)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 180ms',
            }}>
              <div style={{
                width: 30, height: 30,
                background: isHover ? L_PALETTE.gold : 'transparent',
                border: `1.5px solid ${L_PALETTE.gold}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: L_SERIF, fontStyle: 'italic',
                color: isHover ? L_PALETTE.ink : L_PALETTE.gold,
                fontSize: 16, transition: 'all 180ms',
              }}>{s.label}</div>
              <div>
                <div style={{
                  fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 18,
                  letterSpacing: '-0.005em',
                }}>{s.colindancia}</div>
                <div style={{
                  fontFamily: L_MONO, color: 'rgba(202,220,252,0.5)', fontSize: 10,
                  letterSpacing: '0.2em', marginTop: 4,
                  textTransform: 'uppercase',
                }}>{s.kind === 'street' ? 'Vialidad' : 'Lote colindante'}</div>
              </div>
              <div style={{
                fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 14,
                letterSpacing: '0.15em',
              }}>{s.len}</div>
            </div>
          );
        })}

        {/* Highlight detail card */}
        {hi && hi.description && (
          <div style={{
            marginTop: 24,
            padding: '20px 22px',
            background: 'rgba(201,169,97,0.07)',
            borderLeft: `2px solid ${L_PALETTE.gold}`,
            fontFamily: L_SERIF, fontStyle: 'italic',
            color: L_PALETTE.ice, fontSize: 16, lineHeight: 1.55,
          }}>
            <strong style={{
              color: L_PALETTE.gold, fontStyle: 'normal',
              fontFamily: L_SANS, fontWeight: 800, fontSize: 10,
              letterSpacing: '0.35em', textTransform: 'uppercase',
              display: 'block', marginBottom: 8,
            }}>LADO {hi.label}</strong>
            {hi.description}
          </div>
        )}

        {/* PDF link */}
        <div style={{
          marginTop: 32,
          padding: '20px 22px',
          border: `1px solid ${L_PALETTE.gold}55`,
          background: 'rgba(15,30,71,0.4)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 11,
              letterSpacing: '0.3em', marginBottom: 6,
            }}>LEVANTAMIENTO TOPOGRÁFICO</div>
            <div style={{
              fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 17,
            }}>LTA · SCL Sendero Alabastro GCD 04</div>
          </div>
          <a href="planos/07-topografia-1.pdf" target="_blank" rel="noopener"
            style={{
              padding: '10px 18px',
              border: `1px solid ${L_PALETTE.gold}`,
              color: L_PALETTE.gold,
              fontFamily: L_SANS, fontWeight: 700, fontSize: 10,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 999, whiteSpace: 'nowrap',
            }}>Ver PDF ↗</a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { L_PolygonView });
