// reel-a.jsx — Variation A: "DOS RUTAS"
// 22s · 9:16 · narrative: open → predio → split reveal → numbers → converge → CTA

const A_BG = () => {
  const t = useTime();
  const x = 50 + Math.sin(t * 0.25) * 4;
  const y = 38 + Math.cos(t * 0.2) * 3;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse 80% 60% at ${x}% ${y}%, ${PALETTE.navy2} 0%, ${PALETTE.navy} 55%, ${PALETTE.ink} 100%)`,
    }}/>
  );
};

// ── Scene 1 (0 → 4.0): Title card ────────────────────────────────────────────
const A_Scene1 = () => (
  <Sprite start={0} end={4.0}>
    {({ localTime, duration }) => {
      const exitT = clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
      const exitOp = 1 - exitT;
      const reveal = (delay, span = 0.7) =>
        Easing.easeOutCubic(clamp((localTime - delay) / span, 0, 1));
      const lineGrow = Easing.easeInOutCubic(clamp((localTime - 0.2) / 1.0, 0, 1));

      return (
        <>
          {/* Eyebrow */}
          <div style={{
            position: 'absolute', top: 600, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.2) * exitOp,
            transform: `translateY(${(1 - reveal(0.2)) * 14}px)`,
          }}>
            <Eyebrow color={PALETTE.gold} size={26} tracking="0.55em">
              Milenio III · Querétaro
            </Eyebrow>
          </div>

          {/* Gold hairline */}
          <div style={{
            position: 'absolute', top: 680, left: '50%',
            width: 280 * lineGrow, height: 1.5,
            background: PALETTE.gold,
            transform: 'translateX(-50%)',
            opacity: exitOp,
          }}/>

          {/* Big serif title */}
          <div style={{
            position: 'absolute', top: 750, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, fontWeight: 400,
            color: PALETTE.white, fontSize: 200, lineHeight: 1.0,
            letterSpacing: '-0.03em',
            opacity: reveal(0.5, 0.9) * exitOp,
            transform: `translateY(${(1 - reveal(0.5, 0.9)) * 40}px)`,
          }}>
            Alabastro
          </div>

          {/* Roman numeral */}
          <div style={{
            position: 'absolute', top: 970, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            color: PALETTE.gold, fontSize: 260, lineHeight: 1.0,
            opacity: reveal(0.9, 0.9) * exitOp,
            transform: `scale(${0.85 + 0.15 * reveal(0.9, 0.9)})`,
            transformOrigin: 'center',
          }}>
            1
          </div>

          {/* Subtitle */}
          <div style={{
            position: 'absolute', top: 1310, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic',
            color: PALETTE.ice, fontSize: 42, lineHeight: 1.3,
            opacity: reveal(1.4, 0.8) * exitOp,
          }}>
            Predio shovel-ready · 447 m²
          </div>

          {/* Tag pill */}
          <div style={{
            position: 'absolute', top: 1400, left: '50%',
            transform: `translateX(-50%) translateY(${(1 - reveal(1.7, 0.7)) * 20}px)`,
            padding: '14px 32px',
            border: `1px solid ${PALETTE.gold}`,
            borderRadius: 999,
            opacity: reveal(1.7, 0.7) * exitOp,
          }}>
            <Eyebrow size={22} tracking="0.4em" color={PALETTE.gold}>
              Una propiedad · dos rutas
            </Eyebrow>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 2 (4.0 → 7.5): Predio image + facts ───────────────────────────────
const A_Scene2 = () => (
  <Sprite start={4.0} end={7.5}>
    {({ localTime, duration }) => {
      const enterT = Easing.easeOutCubic(clamp(localTime / 0.7, 0, 1));
      const exitT = clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
      const exitOp = 1 - exitT;
      const kb = 1 + 0.08 * (localTime / duration);

      const reveal = (delay, span = 0.6) =>
        Easing.easeOutCubic(clamp((localTime - delay) / span, 0, 1));

      return (
        <>
          {/* Full-bleed photo */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: enterT * exitOp,
            transform: `scale(${kb})`,
            transformOrigin: 'center',
            overflow: 'hidden',
          }}>
            <img src="assets/foto_terreno_torre_al_fondo.jpg"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt=""/>
          </div>

          {/* Bottom-up dark gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(7,14,39,0.5) 0%, transparent 30%, transparent 50%, rgba(7,14,39,0.92) 100%)',
            opacity: exitOp,
          }}/>

          {/* Top tag */}
          <div style={{
            position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.3) * exitOp,
            transform: `translateY(${(1 - reveal(0.3)) * 12}px)`,
          }}>
            <Eyebrow size={22} tracking="0.5em">El predio</Eyebrow>
          </div>

          {/* Bottom stats */}
          <div style={{
            position: 'absolute', left: 80, bottom: 280, right: 80,
            opacity: exitOp,
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 110, lineHeight: 1.0,
              fontWeight: 400,
              opacity: reveal(0.4, 0.7),
              transform: `translateY(${(1 - reveal(0.4, 0.7)) * 28}px)`,
            }}>
              <Counter to={447} suffix=" m²" fraction={0.55}/>
            </div>
            <div style={{
              marginTop: 18,
              fontFamily: SANS, color: PALETTE.gold, fontSize: 30,
              letterSpacing: '0.18em',
              opacity: reveal(0.8, 0.7),
            }}>
              USO H3  ·  4 N. OFICIALES  ·  ESCRITURA LIMPIA
            </div>
            <div style={{
              marginTop: 14,
              fontFamily: SANS, color: PALETTE.ice, fontSize: 26, opacity: reveal(1.1, 0.7) * 0.85,
              letterSpacing: '0.04em',
            }}>
              A 500 m de Calzada de los Arcos · 200 m del corredor médico
            </div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 3 (7.5 → 11.0): The split — two paths revealed ────────────────────
const A_Scene3 = () => (
  <Sprite start={7.5} end={11.0}>
    {({ localTime, duration }) => {
      const exitT = clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
      const exitOp = 1 - exitT;
      const splitT = Easing.easeInOutCubic(clamp(localTime / 0.8, 0, 1));

      const reveal = (delay, span = 0.55) =>
        Easing.easeOutCubic(clamp((localTime - delay) / span, 0, 1));

      return (
        <>
          {/* Top half — teal (médica) — slides down */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: 960,
            background: `linear-gradient(180deg, ${PALETTE.tealDk} 0%, #0A6D67 100%)`,
            transform: `translateY(${(1 - splitT) * -960}px)`,
            opacity: exitOp,
          }}/>

          {/* Bottom half — gold (residencial) — slides up */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 960,
            background: `linear-gradient(180deg, ${PALETTE.goldDk} 0%, ${PALETTE.gold} 100%)`,
            transform: `translateY(${(1 - splitT) * 960}px)`,
            opacity: exitOp,
          }}/>

          {/* Gold hairline divider */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 958, height: 4,
            background: PALETTE.cream,
            opacity: splitT * exitOp,
          }}/>

          {/* TOP — Torre Médica label */}
          <div style={{
            position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.7) * exitOp,
            transform: `translateY(${(1 - reveal(0.7)) * 20}px)`,
          }}>
            <Eyebrow size={28} tracking="0.55em" color={PALETTE.cream}>Track A</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 130, lineHeight: 1.0,
              marginTop: 30, letterSpacing: '-0.02em',
            }}>Torre Médica</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.cream, fontSize: 60,
              marginTop: 16, opacity: 0.92,
            }}>Boutique</div>
          </div>

          {/* BOTTOM — Residencias label */}
          <div style={{
            position: 'absolute', bottom: 380, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(1.0) * exitOp,
            transform: `translateY(${(1 - reveal(1.0)) * -20}px)`,
          }}>
            <Eyebrow size={28} tracking="0.55em" color={PALETTE.ink}>Track B</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.navy, fontSize: 130, lineHeight: 1.0,
              marginTop: 30, letterSpacing: '-0.02em',
            }}>Residencias</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.navy, fontSize: 60,
              marginTop: 16, opacity: 0.85,
            }}>Verticales</div>
          </div>

          {/* Center "OR" disc */}
          <div style={{
            position: 'absolute', left: '50%', top: 920, width: 130, height: 130,
            marginLeft: -65, borderRadius: '50%',
            background: PALETTE.ink,
            border: `1.5px solid ${PALETTE.gold}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: reveal(1.3) * exitOp,
            transform: `translateY(0) scale(${0.6 + 0.4 * reveal(1.3)})`,
            boxShadow: `0 0 40px ${PALETTE.gold}55`,
          }}>
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 56,
            }}>ó</span>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 4 (11.0 → 15.0): Numbers face-off ─────────────────────────────────
const A_StatRow = ({ value, label, color, side, t }) => (
  <div style={{
    padding: '20px 0',
    borderBottom: `1px solid ${color}33`,
    opacity: t,
    transform: `translateX(${(1 - t) * (side === 'L' ? -30 : 30)}px)`,
  }}>
    <div style={{
      fontFamily: SERIF, color, fontSize: 88, lineHeight: 1.0, fontWeight: 400,
    }}>{value}</div>
    <div style={{
      fontFamily: SANS, color: `${color}cc`, fontSize: 22, letterSpacing: '0.18em',
      marginTop: 10, textTransform: 'uppercase',
    }}>{label}</div>
  </div>
);

const A_Scene4 = () => (
  <Sprite start={11.0} end={15.0}>
    {({ localTime, duration }) => {
      const exitT = clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
      const exitOp = 1 - exitT;
      const reveal = (delay, span = 0.5) =>
        Easing.easeOutCubic(clamp((localTime - delay) / span, 0, 1));

      return (
        <>
          {/* Header */}
          <div style={{
            position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.1) * exitOp,
          }}>
            <Eyebrow size={22} tracking="0.5em">Las cifras</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 64,
              marginTop: 22, letterSpacing: '-0.02em',
            }}>Dos tesis de valor</div>
          </div>

          {/* Center divider */}
          <div style={{
            position: 'absolute', top: 380, bottom: 240, left: '50%', width: 1,
            background: `linear-gradient(180deg, transparent, ${PALETTE.gold}55, transparent)`,
            opacity: reveal(0.3) * exitOp,
          }}/>

          {/* Left column — Torre Médica */}
          <div style={{
            position: 'absolute', top: 400, left: 70, width: 430,
            opacity: exitOp,
          }}>
            <div style={{ marginBottom: 30 }}>
              <Eyebrow size={20} tracking="0.45em" color={PALETTE.teal}>Track A · Médica</Eyebrow>
            </div>
            <A_StatRow value={<Counter to={9} suffix="%" fraction={0.6}/>}
              label="Yield bruto" color={PALETTE.teal} side="L" t={reveal(0.5)}/>
            <A_StatRow value={<Counter to={5} fraction={0.5}/>}
              label="Consultorios + lab" color={PALETTE.teal} side="L" t={reveal(0.9)}/>
            <A_StatRow value={<>$<Counter to={32.5} decimals={1} fraction={0.6}/><span style={{fontSize:48}}> K/mes</span></>}
              label="Renta consultorio" color={PALETTE.teal} side="L" t={reveal(1.3)}/>
            <A_StatRow value="200 m"
              label="Al corredor médico" color={PALETTE.teal} side="L" t={reveal(1.7)}/>
          </div>

          {/* Right column — Residencias */}
          <div style={{
            position: 'absolute', top: 400, right: 70, width: 430,
            opacity: exitOp,
            textAlign: 'right',
          }}>
            <div style={{ marginBottom: 30 }}>
              <Eyebrow size={20} tracking="0.45em" color={PALETTE.gold}>Track B · Resi</Eyebrow>
            </div>
            <A_StatRow value={<><Counter to={30} suffix="%" fraction={0.6}/></>}
              label="Margen máx." color={PALETTE.gold} side="R" t={reveal(0.7)}/>
            <A_StatRow value={<Counter to={3} fraction={0.4}/>}
              label="Residencias" color={PALETTE.gold} side="R" t={reveal(1.1)}/>
            <A_StatRow value={<><Counter to={274} fraction={0.6}/> m²</>}
              label="Por unidad" color={PALETTE.gold} side="R" t={reveal(1.5)}/>
            <A_StatRow value="N/NO"
              label="Vista panorámica" color={PALETTE.gold} side="R" t={reveal(1.9)}/>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 5 (15.0 → 18.5): Convergence statement ─────────────────────────────
const A_Scene5 = () => (
  <Sprite start={15.0} end={18.5}>
    {({ localTime, duration }) => {
      const exitT = clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
      const exitOp = 1 - exitT;
      const reveal = (delay, span = 0.7) =>
        Easing.easeOutCubic(clamp((localTime - delay) / span, 0, 1));

      return (
        <>
          {/* Big quote */}
          <div style={{
            position: 'absolute', top: 720, left: 80, right: 80, textAlign: 'center',
            opacity: exitOp,
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 98, lineHeight: 1.15,
              letterSpacing: '-0.02em',
              opacity: reveal(0.2),
              transform: `translateY(${(1 - reveal(0.2)) * 24}px)`,
            }}>
              Una propiedad.
            </div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 98, lineHeight: 1.15,
              marginTop: 14,
              opacity: reveal(0.9),
              transform: `translateY(${(1 - reveal(0.9)) * 24}px)`,
            }}>
              Dos formas de generar valor.
            </div>
            <div style={{
              width: 240, height: 1, background: PALETTE.gold,
              margin: '54px auto 0',
              opacity: reveal(1.6) * 0.65,
              transform: `scaleX(${reveal(1.6)})`,
            }}/>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 6 (18.5 → 22.0): Price + CTA ──────────────────────────────────────
const A_Scene6 = () => (
  <Sprite start={18.5} end={22.0}>
    {({ localTime, duration }) => {
      const reveal = (delay, span = 0.6) =>
        Easing.easeOutCubic(clamp((localTime - delay) / span, 0, 1));

      return (
        <>
          {/* Eyebrow */}
          <div style={{
            position: 'absolute', top: 540, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.1),
          }}>
            <Eyebrow size={22} tracking="0.5em">Venta directa</Eyebrow>
          </div>

          {/* Price */}
          <div style={{
            position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.3),
            transform: `translateY(${(1 - reveal(0.3)) * 20}px)`,
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 140, lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}>
              $<Counter to={3577760} fraction={0.6}/>
            </div>
            <div style={{
              marginTop: 24,
              fontFamily: SANS, color: PALETTE.gold, fontSize: 36, letterSpacing: '0.16em',
            }}>MXN  ·  $8,000 / m²</div>
          </div>

          {/* Card */}
          <div style={{
            position: 'absolute', left: 100, right: 100, top: 1100,
            padding: '38px 44px',
            border: `1px solid ${PALETTE.gold}66`,
            background: 'rgba(15,30,71,0.6)',
            backdropFilter: 'blur(6px)',
            opacity: reveal(0.9),
            transform: `translateY(${(1 - reveal(0.9)) * 24}px)`,
          }}>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 38,
              textAlign: 'center', marginBottom: 14,
            }}>Paquete completo</div>
            <div style={{
              fontFamily: SANS, color: PALETTE.ice, fontSize: 26, textAlign: 'center',
              letterSpacing: '0.04em', lineHeight: 1.5,
            }}>
              Escritura · Dictamen H3 · 4 N. Of. · Factibilidades · Anteproyecto
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 220, textAlign: 'center',
            opacity: reveal(1.3),
          }}>
            <BrandLockup x={0} y={0} scale={1.1}/>
            <div style={{ marginTop: 70 }}>
              <Eyebrow size={24} tracking="0.4em" color={PALETTE.gold}>
                alabastro1.com.mx
              </Eyebrow>
            </div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// Persistent gold hairline frame
const A_Chrome = () => {
  const t = useTime();
  // hide during scene 2 (photo) and scene 3 (split)
  const hidden = t > 4.0 && t < 11.0;
  return (
    <>
      <GoldFrame inset={42} opacity={hidden ? 0 : 0.3}/>
      <Grain opacity={0.04}/>
    </>
  );
};

function ReelA(props) {
  return (
    <Stage width={1080} height={1920} duration={22} background={PALETTE.ink} persistKey="reel-a" {...props}>
      <A_BG/>
      <A_Scene1/>
      <A_Scene2/>
      <A_Scene3/>
      <A_Scene4/>
      <A_Scene5/>
      <A_Scene6/>
      <A_Chrome/>
    </Stage>
  );
}

Object.assign(window, { ReelA });
