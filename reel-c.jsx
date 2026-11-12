// reel-c.jsx — Variation C: "MAPA CINEMÁTICO"
// 22s · 9:16 · location-first: zoom on map, draw corredor médico, predio photos, CTA.

const C_BG = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${PALETTE.ink} 0%, ${PALETTE.navy} 100%)`,
  }}/>
);

// ── Map of Milenio III ──────────────────────────────────────────────────────
// Stylized — gold pin at Alabastro 1 in center, labelled landmarks around.
// `zoom`: 1 = wide (shows roads), 2.0 = tight in on predio.
// `lineProgress`: 0→1 controls how many connection lines are drawn.

const C_Map = ({ zoom = 1, lineProgress = 0, pulse = 0, labelOpacity = 1 }) => {
  // Map coordinate space: 1080x1920 viewBox
  // Alabastro 1 pin at center (540, 960)
  // Landmarks placed around it
  const landmarks = [
    { id: 'm1', x: 760, y: 880, label: 'Torre Momentum I',  sub: '200 m',  side: 'R' },
    { id: 'm3', x: 830, y: 1040, label: 'Torre Momentum III', sub: '350 m', side: 'R' },
    { id: 'm5', x: 900, y: 1200, label: 'Torre Momentum V',  sub: '500 m', side: 'R' },
    { id: 'lab', x: 360, y: 1230, label: 'Lab Corregidora',  sub: '300 m', side: 'L' },
    { id: 'arcos', x: 220, y: 720, label: 'Calz. de los Arcos', sub: '500 m', side: 'L' },
    { id: 'bq', x: 720, y: 600, label: 'Av. B. Quintana', sub: '1 km', side: 'R' },
  ];

  const pinX = 540, pinY = 960;

  // line draw — each line gets a slice of [0,1]
  const lineT = (i) => clamp(lineProgress * landmarks.length - i, 0, 1);

  // Pulse rings
  const pulseR1 = 60 + pulse * 80;
  const pulseR2 = 60 + ((pulse + 0.5) % 1) * 80;
  const pulseO1 = 1 - pulse;
  const pulseO2 = 1 - ((pulse + 0.5) % 1);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      transform: `scale(${zoom})`,
      transformOrigin: '50% 50%',
    }}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920"
        style={{ position: 'absolute', inset: 0 }}>
        {/* Grid */}
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke={PALETTE.gold} strokeWidth="0.4" opacity="0.18"/>
          </pattern>
        </defs>
        <rect width="1080" height="1920" fill="url(#grid)"/>

        {/* Stylized "roads" as soft beige curves */}
        <path d="M 0 720 Q 250 700, 540 760 T 1080 820"
          fill="none" stroke={PALETTE.cream} strokeWidth="40" opacity="0.06"/>
        <path d="M 720 0 Q 740 500, 600 960 T 540 1920"
          fill="none" stroke={PALETTE.cream} strokeWidth="40" opacity="0.06"/>
        <path d="M 0 1240 Q 300 1220, 540 1280 T 1080 1340"
          fill="none" stroke={PALETTE.cream} strokeWidth="32" opacity="0.05"/>

        {/* Road labels */}
        <text x="40" y="710" fill={PALETTE.gold} opacity="0.6"
          fontFamily={MONO} fontSize="14" letterSpacing="3">CALZ. DE LOS ARCOS</text>
        <text x="720" y="160" fill={PALETTE.gold} opacity="0.6"
          fontFamily={MONO} fontSize="14" letterSpacing="3">AV. BERNARDO QUINTANA</text>
        <text x="40" y="1230" fill={PALETTE.gold} opacity="0.5"
          fontFamily={MONO} fontSize="13" letterSpacing="3">CAMINO REAL DE CARRETAS</text>

        {/* Connection lines */}
        {landmarks.map((l, i) => {
          const t = lineT(i);
          return (
            <g key={l.id} opacity={t}>
              <line x1={pinX} y1={pinY} x2={pinX + (l.x - pinX) * t} y2={pinY + (l.y - pinY) * t}
                stroke={PALETTE.gold} strokeWidth="1.5" strokeDasharray="4 6"/>
              {t > 0.95 && (
                <circle cx={l.x} cy={l.y} r="9" fill={PALETTE.cream}
                  stroke={PALETTE.gold} strokeWidth="2"/>
              )}
            </g>
          );
        })}

        {/* Pulse rings on pin */}
        <circle cx={pinX} cy={pinY} r={pulseR1} fill="none"
          stroke={PALETTE.gold} strokeWidth="2" opacity={pulseO1 * 0.6}/>
        <circle cx={pinX} cy={pinY} r={pulseR2} fill="none"
          stroke={PALETTE.gold} strokeWidth="2" opacity={pulseO2 * 0.4}/>

        {/* Alabastro 1 pin */}
        <circle cx={pinX} cy={pinY} r="36" fill={PALETTE.navy} stroke={PALETTE.gold} strokeWidth="3"/>
        <circle cx={pinX} cy={pinY} r="14" fill={PALETTE.gold}/>
      </svg>

      {/* Labels (positioned in DOM for crisp text) */}
      <div style={{
        position: 'absolute', left: pinX + 60, top: pinY - 32,
        opacity: labelOpacity,
      }}>
        <div style={{
          fontFamily: SANS, fontWeight: 800, color: PALETTE.gold,
          fontSize: 22, letterSpacing: '0.32em',
        }}>ALABASTRO 1</div>
        <div style={{
          fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.white, fontSize: 22, marginTop: 4,
        }}>447 m² · H3</div>
      </div>

      {landmarks.map((l, i) => {
        const t = lineT(i);
        return (
          <div key={l.id} style={{
            position: 'absolute',
            left: l.side === 'L' ? 'auto' : l.x + 24,
            right: l.side === 'L' ? 1080 - l.x + 24 : 'auto',
            top: l.y - 20,
            textAlign: l.side === 'L' ? 'right' : 'left',
            opacity: clamp((t - 0.6) / 0.4, 0, 1) * labelOpacity,
          }}>
            <div style={{ fontFamily: SANS, fontWeight: 700, color: PALETTE.white, fontSize: 20 }}>{l.label}</div>
            <div style={{ fontFamily: MONO, color: PALETTE.gold, fontSize: 14, letterSpacing: '0.15em', marginTop: 3 }}>{l.sub}</div>
          </div>
        );
      })}
    </div>
  );
};

// ── Scene 1 (0 → 4): Locate it ──────────────────────────────────────────────
const C_Scene1 = () => (
  <Sprite start={0} end={4.0}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
      // Zoom slowly from wide out to slightly closer
      const zoom = 0.85 + 0.2 * Easing.easeInOutCubic(clamp(localTime / duration, 0, 1));
      const pulse = (localTime * 0.7) % 1;

      return (
        <>
          <div style={{ opacity: exitOp }}>
            <C_Map zoom={zoom} lineProgress={0} pulse={pulse} labelOpacity={reveal(1.4, 1.0)}/>
          </div>

          {/* Top eyebrow */}
          <div style={{
            position: 'absolute', top: 180, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.1) * exitOp,
          }}>
            <Eyebrow size={24} tracking="0.55em">Querétaro · Milenio III</Eyebrow>
          </div>

          {/* Big intro */}
          <div style={{
            position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, color: PALETTE.white, fontSize: 90, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            opacity: reveal(0.3) * exitOp,
            transform: `translateY(${(1 - reveal(0.3)) * 24}px)`,
          }}>
            Aquí.
          </div>
          <div style={{
            position: 'absolute', top: 400, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 44,
            opacity: reveal(0.9, 0.8) * exitOp,
          }}>
            Una microzona ya consolidada.
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 2 (4.0 → 9.5): Draw the corredor médico ───────────────────────────
const C_Scene2 = () => (
  <Sprite start={4.0} end={9.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.5) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
      const zoom = 1.05 - 0.05 * (localTime / duration);
      const pulse = (localTime * 0.7) % 1;
      const lp = Easing.easeOutCubic(clamp((localTime - 0.5) / 3.5, 0, 1));

      return (
        <>
          <div style={{ opacity: exitOp }}>
            <C_Map zoom={zoom} lineProgress={lp} pulse={pulse} labelOpacity={1}/>
          </div>

          {/* Bottom statement */}
          <div style={{
            position: 'absolute', bottom: 180, left: 70, right: 70,
            opacity: reveal(0.0) * exitOp,
            padding: '28px 36px',
            background: 'rgba(7,14,39,0.75)',
            border: `1px solid ${PALETTE.gold}55`,
            backdropFilter: 'blur(6px)',
          }}>
            <Eyebrow size={20} tracking="0.45em">Corredor médico</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 56, lineHeight: 1.1,
              marginTop: 14, letterSpacing: '-0.02em',
            }}>
              Tres torres médicas <em style={{ color: PALETTE.gold }}>ya operando</em>
            </div>
            <div style={{
              fontFamily: SANS, color: PALETTE.ice, fontSize: 26, marginTop: 12,
              letterSpacing: '0.04em', lineHeight: 1.4,
            }}>
              Momentum I, III, V · laboratorios · a 200-700 m del predio
            </div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 3 (9.5 → 13.5): Predio photo ──────────────────────────────────────
const C_Scene3 = () => (
  <Sprite start={9.5} end={13.5}>
    {({ localTime, duration }) => {
      const enterT = Easing.easeOutCubic(clamp(localTime / 0.7, 0, 1));
      const exitOp = 1 - clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
      const kb = 1.05 + 0.1 * (localTime / duration);

      return (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            opacity: enterT * exitOp,
            transform: `scale(${kb})`,
            transformOrigin: '60% 40%',
            overflow: 'hidden',
          }}>
            <img src="assets/foto_terreno_torre_al_fondo.jpg"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
          </div>

          {/* gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(7,14,39,0.55) 0%, transparent 35%, transparent 55%, rgba(7,14,39,0.92) 100%)',
            opacity: exitOp,
          }}/>

          {/* Top card */}
          <div style={{
            position: 'absolute', top: 200, left: 80, right: 80,
            opacity: reveal(0.3) * exitOp,
            transform: `translateY(${(1 - reveal(0.3)) * 24}px)`,
          }}>
            <Eyebrow size={22} tracking="0.5em">El predio</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 88, marginTop: 22,
              lineHeight: 1.05, letterSpacing: '-0.02em',
            }}>
              447 m² en una <em style={{ color: PALETTE.gold }}>esquina premium</em> del fraccionamiento.
            </div>
          </div>

          {/* Bottom stats row */}
          <div style={{
            position: 'absolute', bottom: 240, left: 80, right: 80,
            display: 'flex', justifyContent: 'space-between', gap: 24,
            opacity: reveal(1.0) * exitOp,
          }}>
            {[
              { v: '14 m', l: 'altura máx.' },
              { v: '4', l: 'niveles' },
              { v: 'N/NO', l: 'vista' },
              { v: '5 m', l: 'roca' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1,
                opacity: reveal(1.0 + i * 0.1, 0.5),
              }}>
                <div style={{ fontFamily: SERIF, color: PALETTE.gold, fontSize: 56, lineHeight: 1 }}>{s.v}</div>
                <div style={{
                  fontFamily: SANS, color: PALETTE.ice, fontSize: 18, marginTop: 8,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 4 (13.5 → 17.5): Two paths quick beats ────────────────────────────
const C_Scene4 = () => (
  <Sprite start={13.5} end={17.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.5) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          <div style={{
            position: 'absolute', top: 220, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0) * exitOp,
          }}>
            <Eyebrow size={24} tracking="0.5em">Dos rutas de inversión</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 72, marginTop: 18,
              letterSpacing: '-0.02em',
            }}>Una propiedad,</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 72,
            }}>dos modelos.</div>
          </div>

          {/* Médica card */}
          <div style={{
            position: 'absolute', top: 620, left: 80, right: 80,
            padding: '34px 38px',
            border: `1.5px solid ${PALETTE.teal}`,
            background: `linear-gradient(135deg, rgba(20,184,166,0.16) 0%, rgba(13,148,136,0.06) 100%)`,
            opacity: reveal(0.5) * exitOp,
            transform: `translateX(${(1 - reveal(0.5)) * -40}px)`,
          }}>
            <div style={{ fontFamily: MONO, color: PALETTE.teal, fontSize: 22, letterSpacing: '0.4em', marginBottom: 12 }}>TRACK A</div>
            <div style={{ fontFamily: SERIF, color: PALETTE.white, fontSize: 56, lineHeight: 1.0 }}>Torre Médica</div>
            <div style={{ fontFamily: SANS, color: PALETTE.ice, fontSize: 24, marginTop: 10 }}>
              Yield bruto 9% &nbsp;·&nbsp; 5 consultorios + lab
            </div>
          </div>

          {/* Resi card */}
          <div style={{
            position: 'absolute', top: 1000, left: 80, right: 80,
            padding: '34px 38px',
            border: `1.5px solid ${PALETTE.gold}`,
            background: `linear-gradient(135deg, rgba(201,169,97,0.16) 0%, rgba(168,136,74,0.06) 100%)`,
            opacity: reveal(0.9) * exitOp,
            transform: `translateX(${(1 - reveal(0.9)) * 40}px)`,
          }}>
            <div style={{ fontFamily: MONO, color: PALETTE.gold, fontSize: 22, letterSpacing: '0.4em', marginBottom: 12 }}>TRACK B</div>
            <div style={{ fontFamily: SERIF, color: PALETTE.white, fontSize: 56, lineHeight: 1.0 }}>Residencias Boutique</div>
            <div style={{ fontFamily: SANS, color: PALETTE.ice, fontSize: 24, marginTop: 10 }}>
              Margen 17-30% &nbsp;·&nbsp; 3 unidades de 274 m²
            </div>
          </div>

          <div style={{
            position: 'absolute', top: 1380, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(1.4) * exitOp,
          }}>
            <Eyebrow size={22} tracking="0.5em" color={PALETTE.gold}>
              Paquete completo · listo para ejecutivo
            </Eyebrow>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 5 (17.5 → 22.0): CTA ──────────────────────────────────────────────
const C_Scene5 = () => (
  <Sprite start={17.5} end={22.0}>
    {({ localTime, duration }) => {
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          {/* small map echo behind, very subtle */}
          <div style={{ opacity: 0.18 }}>
            <C_Map zoom={1.0} lineProgress={1} pulse={(localTime * 0.6) % 1} labelOpacity={0.3}/>
          </div>
          {/* dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,14,39,0.78)' }}/>

          <div style={{
            position: 'absolute', top: 540, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.1),
            transform: `translateY(${(1 - reveal(0.1)) * 20}px)`,
          }}>
            <Eyebrow size={22} tracking="0.55em">Venta directa · sin intermediarios</Eyebrow>
          </div>

          <div style={{
            position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.3),
            transform: `translateY(${(1 - reveal(0.3)) * 24}px)`,
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
            position: 'absolute', top: 1240, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.9),
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 64, letterSpacing: '-0.02em',
            }}>$3,100,000 <span style={{ color: PALETTE.gold }}>MXN</span></div>
            <div style={{
              fontFamily: MONO, color: PALETTE.ice, fontSize: 22, marginTop: 14,
              letterSpacing: '0.25em', opacity: 0.7,
            }}>$6,935 / M²  ·  447 M²</div>
          </div>

          <div style={{
            position: 'absolute', top: 1500, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(1.3),
          }}>
            <div style={{
              display: 'inline-block',
              fontFamily: MONO, color: PALETTE.gold, fontSize: 28, letterSpacing: '0.2em',
              padding: '20px 44px',
              border: `1px solid ${PALETTE.gold}`,
            }}>alabastro1.com.mx</div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// Persistent chrome
const C_Chrome = () => {
  const t = useTime();
  const hide = t > 9.5 && t < 13.5;  // hide during photo scene
  return (
    <>
      <BrandLockup x={60} y={70} scale={0.85} opacity={hide ? 0.4 : 1}/>
      <div style={{
        position: 'absolute', top: 78, right: 60,
        fontFamily: MONO, color: PALETTE.gold, fontSize: 20, letterSpacing: '0.18em',
        opacity: hide ? 0.4 : 1,
      }}>20°35'57.9"N · 100°21'50.9"W</div>
      <Grain opacity={0.04}/>
    </>
  );
};

function ReelC(props) {
  return (
    <Stage width={1080} height={1920} duration={22} background={PALETTE.ink} persistKey="reel-c" {...props}>
      <C_BG/>
      <C_Scene1/>
      <C_Scene2/>
      <C_Scene3/>
      <C_Scene4/>
      <C_Scene5/>
      <C_Chrome/>
    </Stage>
  );
}

Object.assign(window, { ReelC });
