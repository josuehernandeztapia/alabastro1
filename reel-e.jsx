// reel-e.jsx — Variation E: "LO QUE EXISTE / LO QUE VIENE"
// 22s · 9:16 · photo essay — real predio (HOY) → arch concept (MAÑANA).
// Uses the 4 phone shots of the predio + a stylized SVG of the proposed building.

const E_BG = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: PALETTE.ink,
  }}/>
);

// Building schematic — 4 floors + sotano + rooftop, drawn in SVG.
// `t` 0→1 controls how much of the structure is "built up".
function BuildingSchematic({ progress = 1, opacity = 1, mode = 'resi' }) {
  const stroke = mode === 'med' ? PALETTE.teal : PALETTE.gold;
  const accent = mode === 'med' ? PALETTE.teal : PALETTE.gold;
  const lineW = 2;

  // Floor band positions (in 1080x1920 viewBox-ish space, but we'll render at smaller)
  // Centered building, drawn over a "ground line".
  const cx = 540;
  const groundY = 1500;
  const floorH = 180;
  const w = 540;
  const left = cx - w/2;
  const floors = [
    { y: groundY - floorH * 0, label: 'PB · Recepción / Lobby',     name: 'PB' },
    { y: groundY - floorH * 1, label: 'Nivel 1 · Unidad / Consultorios', name: 'N1' },
    { y: groundY - floorH * 2, label: 'Nivel 2 · Unidad / Consultorios', name: 'N2' },
    { y: groundY - floorH * 3, label: 'Nivel 3 · Unidad / Estudios',  name: 'N3' },
    { y: groundY - floorH * 4, label: 'Rooftop · Amenidades',          name: 'RT' },
  ];

  // Sótano below ground
  const sotano = { y: groundY, label: 'Sótano · 268 m² estacionamiento' };

  return (
    <svg width="1080" height="1920" viewBox="0 0 1080 1920"
      style={{ position: 'absolute', inset: 0, opacity }}>
      {/* Ground line */}
      <line x1={60} y1={groundY} x2={1020} y2={groundY}
        stroke={PALETTE.ice} strokeWidth="1.5" opacity="0.5"/>

      {/* Sótano (drawn first, animates first) */}
      {progress > 0.05 && (
        <g opacity={clamp((progress - 0.05) / 0.1, 0, 1)}>
          <rect x={left} y={groundY} width={w} height={floorH * 0.8}
            fill="none" stroke={stroke} strokeWidth={lineW}
            strokeDasharray="6 6" opacity="0.55"/>
          <text x={cx} y={groundY + floorH * 0.55}
            textAnchor="middle"
            fontFamily={MONO} fontSize="20" fill={PALETTE.ice} letterSpacing="3"
            opacity="0.7">
            SÓTANO · 268 m²
          </text>
        </g>
      )}

      {/* Floors */}
      {floors.map((f, i) => {
        const at = 0.15 + i * 0.15;
        const t = clamp((progress - at) / 0.12, 0, 1);
        if (t <= 0) return null;
        const drawW = w * t;
        return (
          <g key={i} opacity={t}>
            <rect x={cx - drawW/2} y={f.y - floorH}
              width={drawW} height={floorH}
              fill={i === 4 ? `${accent}22` : `${PALETTE.navy2}aa`}
              stroke={i === 4 ? accent : stroke}
              strokeWidth={lineW}/>
            {/* Floor label inside */}
            {t > 0.85 && (
              <text x={cx} y={f.y - floorH/2 + 8}
                textAnchor="middle"
                fontFamily={MONO} fontSize="18" fill={PALETTE.ice}
                letterSpacing="2.5" opacity="0.9">
                {f.label.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}

      {/* Rooftop amenity icons — small palms & dots */}
      {progress > 0.95 && (
        <g opacity={clamp((progress - 0.95) / 0.05, 0, 1)}>
          <circle cx={left + 80} cy={groundY - floorH * 4 - 30} r="10" fill={accent}/>
          <circle cx={left + w - 80} cy={groundY - floorH * 4 - 30} r="10" fill={accent}/>
          <line x1={left + 80} y1={groundY - floorH * 4 - 30}
            x2={left + 80} y2={groundY - floorH * 4 - 90}
            stroke={accent} strokeWidth="3"/>
          <line x1={left + w - 80} y1={groundY - floorH * 4 - 30}
            x2={left + w - 80} y2={groundY - floorH * 4 - 90}
            stroke={accent} strokeWidth="3"/>
        </g>
      )}

      {/* Total construible call-out, top */}
      {progress > 0.85 && (
        <g opacity={clamp((progress - 0.85) / 0.1, 0, 1)}>
          <text x={cx} y={420}
            textAnchor="middle"
            fontFamily={SERIF} fontSize="100" fill={PALETTE.white}>
            1,045 m²
          </text>
          <text x={cx} y={470}
            textAnchor="middle"
            fontFamily={MONO} fontSize="22" fill={PALETTE.gold} letterSpacing="6">
            CONSTRUIBLES · 4 NIVELES · 14 M
          </text>
        </g>
      )}
    </svg>
  );
}

// ── Scene 1 (0 → 3.0): "Hoy" title card ─────────────────────────────────────
const E_Scene1 = () => (
  <Sprite start={0} end={3.0}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.7) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
      return (
        <>
          <div style={{
            position: 'absolute', top: 760, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0) * exitOp,
            transform: `translateY(${(1 - reveal(0.0)) * 24}px)`,
          }}>
            <Eyebrow size={26} tracking="0.6em">Capítulo 01</Eyebrow>
          </div>
          <div style={{
            position: 'absolute', top: 840, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, color: PALETTE.white, fontSize: 360, lineHeight: 1.0,
            letterSpacing: '-0.03em',
            opacity: reveal(0.4) * exitOp,
            transform: `translateY(${(1 - reveal(0.4)) * 32}px)`,
          }}>Hoy.</div>
          <div style={{
            position: 'absolute', top: 1280, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 52,
            opacity: reveal(1.2, 0.9) * exitOp,
          }}>
            El predio que ves.
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Generic photo scene — full-bleed image with ken burns + caption block ───
function E_PhotoScene({ start, end, src, originX = 'center', originY = 'center', caption, eyebrow, stat }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const enterT = Easing.easeOutCubic(clamp(localTime / 0.7, 0, 1));
        const exitOp = 1 - clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
        const reveal = (d, s = 0.7) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
        const kb = 1.04 + 0.10 * (localTime / duration);

        return (
          <>
            {/* Photo */}
            <div style={{
              position: 'absolute', inset: 0,
              opacity: enterT * exitOp,
              transform: `scale(${kb})`,
              transformOrigin: `${originX} ${originY}`,
              overflow: 'hidden',
            }}>
              <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
            </div>

            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(7,14,39,0.55) 0%, transparent 30%, transparent 50%, rgba(7,14,39,0.92) 100%)',
              opacity: exitOp,
            }}/>

            {/* Top eyebrow */}
            <div style={{
              position: 'absolute', top: 160, left: 80, opacity: reveal(0.3) * exitOp,
            }}>
              <Eyebrow size={20} tracking="0.45em">{eyebrow}</Eyebrow>
            </div>

            {/* Bottom block */}
            <div style={{
              position: 'absolute', bottom: 220, left: 80, right: 80,
              opacity: exitOp,
            }}>
              {stat && (
                <div style={{
                  fontFamily: SERIF, color: PALETTE.gold, fontSize: 100, lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  opacity: reveal(0.5, 0.6),
                  transform: `translateY(${(1 - reveal(0.5, 0.6)) * 22}px)`,
                  marginBottom: 22,
                }}>{stat}</div>
              )}
              <div style={{
                fontFamily: SERIF, color: PALETTE.white, fontSize: 56, lineHeight: 1.15,
                letterSpacing: '-0.01em',
                opacity: reveal(0.8, 0.7),
                transform: `translateY(${(1 - reveal(0.8, 0.7)) * 16}px)`,
              }}>{caption}</div>
            </div>
          </>
        );
      }}
    </Sprite>
  );
}

// ── Scene 5 (12.5 → 15.0): "Mañana." title transition ───────────────────────
const E_Scene5 = () => (
  <Sprite start={12.5} end={15.0}>
    {({ localTime, duration }) => {
      const enterT = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.7) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
      return (
        <>
          {/* Full-bleed gold flash that fades into navy */}
          <div style={{
            position: 'absolute', inset: 0,
            background: PALETTE.gold,
            opacity: (1 - enterT) * exitOp,
          }}/>

          <div style={{
            position: 'absolute', top: 760, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.3) * exitOp,
            transform: `translateY(${(1 - reveal(0.3)) * 24}px)`,
          }}>
            <Eyebrow size={26} tracking="0.6em" color={PALETTE.gold}>Capítulo 02</Eyebrow>
          </div>
          <div style={{
            position: 'absolute', top: 840, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.white, fontSize: 320, lineHeight: 1.0,
            letterSpacing: '-0.03em',
            opacity: reveal(0.6) * exitOp,
            transform: `translateY(${(1 - reveal(0.6)) * 32}px)`,
          }}>Mañana.</div>
          <div style={{
            position: 'absolute', top: 1280, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, color: PALETTE.gold, fontSize: 48,
            opacity: reveal(1.2, 0.9) * exitOp,
          }}>
            Lo que puede ser.
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 6 (15.0 → 19.0): Building schematic builds up ─────────────────────
const E_Scene6 = () => (
  <Sprite start={15.0} end={19.0}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const progress = Easing.easeOutCubic(clamp(localTime / 2.5, 0, 1));
      const reveal = (d, s = 0.7) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          <BuildingSchematic progress={progress} opacity={exitOp} mode="resi"/>

          {/* Top eyebrow */}
          <div style={{
            position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0) * exitOp,
          }}>
            <Eyebrow size={20} tracking="0.45em">Anteproyecto arquitectónico</Eyebrow>
          </div>

          {/* Bottom rail with stats */}
          <div style={{
            position: 'absolute', bottom: 180, left: 80, right: 80,
            display: 'flex', justifyContent: 'space-between',
            opacity: reveal(2.4, 0.7) * exitOp,
          }}>
            {[
              { v: 'H3', l: 'Uso de suelo' },
              { v: '4', l: 'Niveles' },
              { v: '14 m', l: 'Altura máx.' },
              { v: 'N/NO', l: 'Vista' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontFamily: SERIF, color: PALETTE.white, fontSize: 44, lineHeight: 1 }}>{s.v}</div>
                <div style={{
                  fontFamily: SANS, color: PALETTE.gold, fontSize: 16, marginTop: 8,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 7 (19.0 → 22.0): Sign-off ─────────────────────────────────────────
const E_Scene7 = () => (
  <Sprite start={19.0} end={22.0}>
    {({ localTime }) => {
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
      return (
        <>
          <div style={{
            position: 'absolute', top: 700, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0),
            transform: `translateY(${(1 - reveal(0.0)) * 20}px)`,
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 200, lineHeight: 1.0,
              letterSpacing: '-0.04em',
            }}>Alabastro</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 220, lineHeight: 1.0,
            }}>1</div>
          </div>

          <div style={{
            position: 'absolute', top: 1260, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.5),
          }}>
            <Eyebrow size={22} tracking="0.5em" color={PALETTE.gold}>Paquete completo · listo para ejecutivo</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 56, marginTop: 22,
              letterSpacing: '-0.02em',
            }}>$3,577,760 <span style={{ color: PALETTE.gold }}>MXN</span></div>
          </div>

          <div style={{
            position: 'absolute', top: 1560, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(1.0),
          }}>
            <div style={{
              display: 'inline-block',
              fontFamily: MONO, color: PALETTE.gold, fontSize: 24, letterSpacing: '0.22em',
              padding: '18px 38px',
              border: `1px solid ${PALETTE.gold}`,
            }}>alabastro1.com.mx</div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// Top-of-frame chapter indicator
const E_Chrome = () => {
  const t = useTime();
  let ch = '';
  if (t < 3.0) ch = '';
  else if (t < 12.5) ch = '01 · HOY';
  else if (t < 15.0) ch = '';
  else if (t < 19.0) ch = '02 · MAÑANA';
  else ch = '';

  return (
    <>
      {ch && (
        <div style={{
          position: 'absolute', top: 80, left: 80,
          fontFamily: MONO, color: PALETTE.gold, fontSize: 18, letterSpacing: '0.32em',
          opacity: 0.85,
        }}>{ch}</div>
      )}
      {ch && (
        <div style={{
          position: 'absolute', top: 80, right: 80,
          fontFamily: SANS, color: PALETTE.gold, fontSize: 14, letterSpacing: '0.4em',
          fontWeight: 800, opacity: 0.85,
        }}>ALABASTRO 1</div>
      )}
      <Grain opacity={0.04}/>
    </>
  );
};

function ReelE(props) {
  return (
    <Stage width={1080} height={1920} duration={22} background={PALETTE.ink} persistKey="reel-e" {...props}>
      <E_BG/>
      <E_Scene1/>
      <E_PhotoScene start={3.0} end={6.3}
        src="assets/foto_terreno_principal.jpg"
        originX="60%" originY="40%"
        eyebrow="VISTA INTERIOR"
        stat="447 m²"
        caption="Adoquín original · palmeras · cielo abierto al norte."/>
      <E_PhotoScene start={6.3} end={9.4}
        src="assets/predio-03.png"
        originX="50%" originY="60%"
        eyebrow="PENDIENTE NATURAL"
        stat="N / NO"
        caption="Vista panorámica norte y noroeste."/>
      <E_PhotoScene start={9.4} end={12.5}
        src="assets/foto_terreno_torre_al_fondo.jpg"
        originX="40%" originY="50%"
        eyebrow="MICROUBICACIÓN"
        stat="500 m"
        caption="A Calzada de los Arcos. 200 m al corredor médico."/>
      <E_Scene5/>
      <E_Scene6/>
      <E_Scene7/>
      <E_Chrome/>
    </Stage>
  );
}

Object.assign(window, { ReelE });
