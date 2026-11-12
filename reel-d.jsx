// reel-d.jsx — Variation D: "ISOTIPO"
// 20s · 9:16 · the brand mark itself is the protagonist.
// The gold bar that crosses the A becomes the visual motor: extracts, rotates,
// stretches into dividers, flashes as transitions, then reassembles into the
// final lock-up.

// Custom "A" glyph drawn as polygons so we can animate the bar separately.
// Two stems + serifs. Returns left+right stem shapes and a bar slot.
// Centered around (cx, cy). `h` controls overall height.
const A_W_RATIO = 0.90;          // width / height of glyph
const A_BAR_Y   = 0.62;          // gold bar vertical position (0 top → 1 bottom)
const A_BAR_W   = 0.50;          // gold bar width as fraction of glyph width
const A_BAR_H   = 0.085;         // gold bar thickness as fraction of glyph height

function AGlyph({ cx, cy, h, stemOpacity = 1, stemColor = PALETTE.cream }) {
  const w = h * A_W_RATIO;
  const left = cx - w/2, top = cy - h/2;
  // Two stems (left & right) — drawn as polygons
  const apex = [cx, top + h * 0.05];
  const innerL = [cx - w*0.04, top + h * 0.10];
  const innerR = [cx + w*0.04, top + h * 0.10];
  const baseLO = [left + w*0.05, top + h * 0.99];
  const baseLI = [cx - w*0.13, top + h * 0.99];
  const baseRO = [left + w*0.95, top + h * 0.99];
  const baseRI = [cx + w*0.13, top + h * 0.99];

  // Serif feet (thin horizontal extensions at the bottom)
  const footL = [
    [left + w*0.00, top + h * 0.99],
    [left + w*0.18, top + h * 0.99],
    [left + w*0.18, top + h * 1.02],
    [left + w*0.00, top + h * 1.02],
  ];
  const footR = [
    [left + w*0.82, top + h * 0.99],
    [left + w*1.00, top + h * 0.99],
    [left + w*1.00, top + h * 1.02],
    [left + w*0.82, top + h * 1.02],
  ];

  const ptStr = (pts) => pts.map(p => p.join(',')).join(' ');

  return (
    <g opacity={stemOpacity}>
      <polygon points={ptStr([apex, innerL, baseLI, baseLO])} fill={stemColor}/>
      <polygon points={ptStr([apex, innerR, baseRI, baseRO])} fill={stemColor}/>
      <polygon points={ptStr(footL)} fill={stemColor}/>
      <polygon points={ptStr(footR)} fill={stemColor}/>
    </g>
  );
}

// The little ·1· caption beneath the A
function ABase({ cx, cy, opacity = 1, color = PALETTE.gold, size = 28 }) {
  return (
    <text x={cx} y={cy} textAnchor="middle" fontFamily={SERIF}
      fontSize={size} fill={color} opacity={opacity} fontStyle="italic">
      · 1 ·
    </text>
  );
}

const D_BG = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `radial-gradient(ellipse at center, ${PALETTE.navy2} 0%, ${PALETTE.navy} 60%, ${PALETTE.ink} 100%)`,
  }}/>
);

// ── Persistent gold bar — controlled by current scene state ─────────────────
// Single bar element that gets repositioned across the 20s reel.
// Returns a bar in a 1080x1920 stage coordinate space.
function GoldBar({ cx, cy, width, height, rotation = 0, opacity = 1, glow = 0, color = PALETTE.gold }) {
  return (
    <div style={{
      position: 'absolute',
      left: cx - width/2, top: cy - height/2,
      width, height,
      background: color,
      opacity,
      transform: `rotate(${rotation}deg)`,
      transformOrigin: 'center',
      boxShadow: glow ? `0 0 ${glow}px ${PALETTE.gold}88, 0 0 ${glow*2}px ${PALETTE.gold}44` : 'none',
    }}/>
  );
}

// Master bar — single source of truth, interpolates across scenes
const D_BarMotor = () => {
  const t = useTime();

  // Define keyframes for the bar's journey
  // (time, cx, cy, width, height, rotation, opacity, glow)
  const keys = [
    [ 0.0,  -300,  900, 280, 28,   0, 1, 0],   // off-screen left
    [ 1.0,   540,  900, 280, 28,   0, 1, 0],   // slide into logo position
    [ 3.5,   540,  900, 280, 28,   0, 1, 0],   // hold under A
    [ 4.5,   540, 1200, 720, 18,   0, 1, 0],   // descend & widen — divider for "447 m²"
    [ 7.0,   540, 1200, 720, 18,   0, 1, 0],   // hold
    [ 7.8,   540,  960,  18,1280, 90, 1, 0],   // rotate vertical & grow
    [10.5,   540,  960,  18,1280, 90, 1, 30],  // hold split + glow up
    [11.2,   540,  960, 1500, 180, 0, 1, 80],  // explode horizontally — flash
    [11.7,   540,  960, 2200, 1920, 0, 1, 0],  // full screen gold flash
    [12.2,   540,  960, 2200, 1920, 0, 0, 0],  // fade
    [13.5,   540,  960,   0,   0,  0, 0, 0],   // gone
    [14.0,   540,  900, 280, 28,   0, 1, 0],   // re-enter at A position
    [17.0,   540,  900, 280, 28,   0, 1, 0],   // hold
    [18.5,   540,  900, 280, 28,   0, 1, 0],   // hold
    [20.0,   540,  900, 280, 28,   0, 1, 0],
  ];

  // Find segment
  let i = 0;
  for (; i < keys.length - 1; i++) if (t < keys[i+1][0]) break;
  const a = keys[i], b = keys[Math.min(i+1, keys.length-1)];
  const span = b[0] - a[0];
  const localT = span > 0 ? clamp((t - a[0]) / span, 0, 1) : 1;
  const ease = Easing.easeInOutCubic(localT);
  const lerp = (i) => a[i] + (b[i] - a[i]) * ease;

  return <GoldBar cx={lerp(1)} cy={lerp(2)} width={lerp(3)} height={lerp(4)}
    rotation={lerp(5)} opacity={lerp(6)} glow={lerp(7)}/>;
};

// ── Scene 1 (0 → 3.5): Brand reveal ─────────────────────────────────────────
const D_Scene1 = () => (
  <Sprite start={0} end={3.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      const aShow = clamp((localTime - 0.7) / 0.7, 0, 1);

      return (
        <>
          {/* The A glyph — appears around the gold bar */}
          <svg width="1080" height="1920" viewBox="0 0 1080 1920"
            style={{
              position: 'absolute', inset: 0,
              opacity: aShow * exitOp,
            }}>
            <AGlyph cx={540} cy={900} h={400} stemOpacity={aShow}/>
            <ABase cx={540} cy={1170} opacity={reveal(1.4, 0.7)} size={42}/>
          </svg>

          {/* Wordmark */}
          <div style={{
            position: 'absolute', top: 1280, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, color: PALETTE.white, fontSize: 120,
            fontWeight: 700, letterSpacing: '0.05em',
            opacity: reveal(1.7, 0.7) * exitOp,
            transform: `translateY(${(1 - reveal(1.7, 0.7)) * 18}px)`,
          }}>ALABASTRO</div>

          {/* Eyebrow */}
          <div style={{
            position: 'absolute', top: 1440, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(2.2, 0.8) * exitOp,
          }}>
            <Eyebrow size={28} tracking="0.55em" color={PALETTE.ice}>
              Milenio III · Querétaro
            </Eyebrow>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 2 (3.5 → 7.0): Bar drops, becomes divider — 447 m² ────────────────
const D_Scene2 = () => (
  <Sprite start={3.5} end={7.0}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          {/* 447 m² above the bar */}
          <div style={{
            position: 'absolute', top: 760, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, color: PALETTE.white, fontSize: 280, lineHeight: 1.0,
            fontWeight: 400, letterSpacing: '-0.04em',
            opacity: reveal(1.2) * exitOp,
            transform: `translateY(${(1 - reveal(1.2)) * 28}px)`,
          }}>
            <Counter to={447} fraction={0.5}/> m²
          </div>

          {/* Below the bar */}
          <div style={{
            position: 'absolute', top: 1270, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(1.6, 0.7) * exitOp,
          }}>
            <Eyebrow size={28} tracking="0.5em" color={PALETTE.gold}>
              Uso H3 · 4 N. Oficiales · Escritura limpia
            </Eyebrow>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.ice, fontSize: 36,
              marginTop: 26, lineHeight: 1.4,
            }}>
              Predio shovel-ready en Milenio III
            </div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 3 (7.0 → 10.5): Bar vertical — splits screen ──────────────────────
const D_Scene3 = () => (
  <Sprite start={7.0} end={10.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      // Half tints that wash in as the bar goes vertical
      const tintT = Easing.easeInOutCubic(clamp((localTime - 0.6) / 1.0, 0, 1));

      return (
        <>
          {/* Teal wash left */}
          <div style={{
            position: 'absolute', left: 0, top: 320, width: 540, bottom: 320,
            background: `linear-gradient(90deg, rgba(20,184,166,0.22), transparent)`,
            opacity: tintT * exitOp,
          }}/>
          {/* Gold wash right */}
          <div style={{
            position: 'absolute', right: 0, top: 320, width: 540, bottom: 320,
            background: `linear-gradient(270deg, rgba(201,169,97,0.20), transparent)`,
            opacity: tintT * exitOp,
          }}/>

          {/* LEFT label */}
          <div style={{
            position: 'absolute', top: 700, left: 60, width: 440, textAlign: 'left',
            opacity: reveal(1.2) * exitOp,
            transform: `translateX(${(1 - reveal(1.2)) * -20}px)`,
          }}>
            <Eyebrow size={22} tracking="0.45em" color={PALETTE.teal}>Track A</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 82, lineHeight: 1.0,
              marginTop: 22, letterSpacing: '-0.02em',
            }}>Torre<br/>Médica</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.teal, fontSize: 38,
              marginTop: 28,
            }}>Yield 9%</div>
          </div>

          {/* RIGHT label */}
          <div style={{
            position: 'absolute', top: 700, right: 60, width: 440, textAlign: 'right',
            opacity: reveal(1.5) * exitOp,
            transform: `translateX(${(1 - reveal(1.5)) * 20}px)`,
          }}>
            <Eyebrow size={22} tracking="0.45em" color={PALETTE.gold}>Track B</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 82, lineHeight: 1.0,
              marginTop: 22, letterSpacing: '-0.02em',
            }}>Residen-<br/>cias</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 38,
              marginTop: 28,
            }}>Margen 30%</div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 4 (10.5 → 13.5): Flash transition with cascading numbers ─────────
const D_Scene4 = () => (
  <Sprite start={10.5} end={13.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.45) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      // numbers appear AFTER the flash peak (~1.2s)
      const flashed = localTime > 1.0;

      const numbers = [
        { v: '9%',  l: 'Yield bruto · médica',   y: 600, color: PALETTE.teal,  d: 1.4 },
        { v: '30%', l: 'Margen máx. · resi',    y: 920, color: PALETTE.gold,  d: 1.7 },
        { v: 'LISTO', l: 'Paquete completo · expediente', y: 1240, color: PALETTE.cream, d: 2.0 },
      ];

      return (
        <>
          {flashed && numbers.map((n, i) => {
            const t = reveal(n.d, 0.5);
            return (
              <div key={i} style={{
                position: 'absolute', top: n.y, left: 0, right: 0, textAlign: 'center',
                opacity: t * exitOp,
                transform: `translateY(${(1 - t) * 22}px)`,
              }}>
                <div style={{
                  fontFamily: SERIF, color: n.color, fontSize: 160, lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                }}>{n.v}</div>
                <div style={{
                  fontFamily: SANS, color: PALETTE.ice, fontSize: 24, marginTop: 14,
                  letterSpacing: '0.32em', textTransform: 'uppercase',
                }}>{n.l}</div>
              </div>
            );
          })}
        </>
      );
    }}
  </Sprite>
);

// ── Scene 5 (13.5 → 17.0): Bar contracts → logo reassembles ────────────────
const D_Scene5 = () => (
  <Sprite start={13.5} end={17.0}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
      const reveal = (d, s = 0.7) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      const aShow = clamp((localTime - 0.4) / 0.8, 0, 1);

      return (
        <>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920"
            style={{ position: 'absolute', inset: 0, opacity: aShow * exitOp }}>
            <AGlyph cx={540} cy={900} h={400}/>
            <ABase cx={540} cy={1170} opacity={reveal(0.9)} size={42}/>
          </svg>

          {/* Statement */}
          <div style={{
            position: 'absolute', top: 1280, left: 80, right: 80, textAlign: 'center',
            opacity: reveal(1.3) * exitOp,
            transform: `translateY(${(1 - reveal(1.3)) * 20}px)`,
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 60, lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Una propiedad.
            </div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 60,
              lineHeight: 1.2, marginTop: 8,
            }}>
              Dos formas de generar valor.
            </div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 6 (17.0 → 20.0): Price + URL ──────────────────────────────────────
const D_Scene6 = () => (
  <Sprite start={17.0} end={20.0}>
    {({ localTime }) => {
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          {/* Persistent A in faded */}
          <svg width="1080" height="1920" viewBox="0 0 1080 1920"
            style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
            <AGlyph cx={540} cy={900} h={400}/>
          </svg>

          {/* Price */}
          <div style={{
            position: 'absolute', top: 1280, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0),
            transform: `translateY(${(1 - reveal(0.0)) * 16}px)`,
          }}>
            <Eyebrow size={20} tracking="0.5em" color={PALETTE.gold}>Venta directa</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 96, lineHeight: 1,
              marginTop: 28, letterSpacing: '-0.02em',
            }}>$3,100,000</div>
            <div style={{
              fontFamily: MONO, color: PALETTE.ice, fontSize: 22, marginTop: 16,
              letterSpacing: '0.3em',
            }}>MXN · $6,935 / M²</div>
          </div>

          <div style={{
            position: 'absolute', top: 1620, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.8),
          }}>
            <div style={{
              display: 'inline-block',
              fontFamily: MONO, color: PALETTE.gold, fontSize: 24, letterSpacing: '0.22em',
              padding: '16px 36px',
              border: `1px solid ${PALETTE.gold}`,
            }}>alabastro1.com.mx</div>
          </div>
        </>
      );
    }}
  </Sprite>
);

function ReelD(props) {
  return (
    <Stage width={1080} height={1920} duration={20} background={PALETTE.ink} persistKey="reel-d" {...props}>
      <D_BG/>
      <D_Scene1/>
      <D_Scene2/>
      <D_Scene3/>
      <D_Scene4/>
      <D_Scene5/>
      <D_Scene6/>
      {/* The single gold bar that drives all transitions */}
      <D_BarMotor/>
      <Grain opacity={0.04}/>
    </Stage>
  );
}

Object.assign(window, { ReelD });
