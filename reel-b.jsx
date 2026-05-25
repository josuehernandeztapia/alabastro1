// reel-b.jsx — Variation B: "DATOS EN MOVIMIENTO"
// 20s · 9:16 · kinetic typography, big numbers, data-driven institutional tone.

const B_BG = () => {
  const t = useTime();
  // subtle vignette breath
  const breathe = 0.5 + 0.5 * Math.sin(t * 0.5);
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, ${PALETTE.ink} 0%, ${PALETTE.navy} 100%)`,
      }}/>
      {/* faint horizontal hairlines like an institutional report */}
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.06 }}
           width="1080" height="1920" viewBox="0 0 1080 1920">
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1="0" x2="1080" y1={i * 80} y2={i * 80}
            stroke={PALETTE.gold} strokeWidth="1"/>
        ))}
      </svg>
      {/* breathing radial */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 30%, ${PALETTE.navy2}55, transparent 60%)`,
        opacity: 0.4 + 0.3 * breathe,
      }}/>
    </>
  );
};

// Persistent chrome — slide counter and ticker bar
const B_Chrome = () => {
  const t = useTime();
  // Map current time to "scene"
  let scene = "01 · El Predio";
  if (t > 3.5) scene = "02 · Con qué contamos";
  if (t > 7.5) scene = "03 · Cuatro Accesos";
  if (t > 11.5) scene = "04 · Precio · Mercado";
  if (t > 15.5) scene = "05 · Dos Tesis";
  if (t > 18.0) scene = "06 · Contacto";

  return (
    <>
      <BrandLockup x={60} y={70} scale={0.9}/>
      <div style={{
        position: 'absolute', top: 78, right: 60,
        fontFamily: MONO, color: PALETTE.gold, fontSize: 22, letterSpacing: '0.18em',
      }}>{scene}</div>

      {/* progress bar at bottom */}
      <div style={{
        position: 'absolute', bottom: 60, left: 60, right: 60, height: 2,
        background: 'rgba(201,169,97,0.18)',
      }}>
        <div style={{
          height: '100%', background: PALETTE.gold,
          width: `${(t / 20) * 100}%`,
          transition: 'width linear',
        }}/>
      </div>
      <div style={{
        position: 'absolute', bottom: 75, left: 60,
        fontFamily: MONO, color: PALETTE.gold, fontSize: 18, letterSpacing: '0.2em',
      }}>ALABASTRO 1 / TEASER · 20S</div>
      <div style={{
        position: 'absolute', bottom: 75, right: 60,
        fontFamily: MONO, color: PALETTE.gold, fontSize: 18, letterSpacing: '0.2em',
      }}>{Math.floor(t * 10).toString().padStart(3, '0')}</div>
    </>
  );
};

// ── Scene 1 (0 → 3.5): El Predio — 447 m² ───────────────────────────────────
const B_Scene1 = () => (
  <Sprite start={0} end={3.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.5) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          <div style={{
            position: 'absolute', top: 720, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.1) * exitOp,
          }}>
            <Eyebrow size={26} tracking="0.55em">Superficie del terreno</Eyebrow>
          </div>

          <div style={{
            position: 'absolute', top: 800, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, color: PALETTE.white, fontSize: 380, lineHeight: 1.0,
            fontWeight: 400, letterSpacing: '-0.04em',
            opacity: reveal(0.3) * exitOp,
            transform: `translateY(${(1 - reveal(0.3)) * 36}px)`,
          }}>
            <Counter to={447} fraction={0.55}/>
          </div>

          <div style={{
            position: 'absolute', top: 1240, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 84,
            opacity: reveal(1.1, 0.7) * exitOp,
          }}>
            metros cuadrados
          </div>

          <div style={{
            position: 'absolute', top: 1370, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(1.6, 0.7) * exitOp,
          }}>
            <Eyebrow size={26} tracking="0.45em">USO H3 · ESCRITURA LIMPIA</Eyebrow>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 2 (3.5 → 7.5): Con qué contamos — 6 categorías ────────────────────
const B_CategoryItem = ({ index, label, items, t }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: 22,
    padding: '12px 0',
    opacity: t,
    transform: `translateX(${(1 - t) * -24}px)`,
  }}>
    <div style={{
      fontFamily: MONO, color: PALETTE.gold, fontSize: 20, letterSpacing: '0.2em',
      width: 38, flexShrink: 0,
    }}>{String(index).padStart(2, '0')}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: SANS, fontWeight: 700, color: PALETTE.white, fontSize: 26, letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ fontFamily: SANS, color: 'rgba(202,220,252,0.65)', fontSize: 18, marginTop: 4, letterSpacing: '0.02em', lineHeight: 1.45 }}>{items}</div>
    </div>
    <TramiteTick size={28} color={PALETTE.gold} progress={t}/>
  </div>
);

const B_Scene2 = () => {
  const cats = [
    { label: 'Documentación legal',     items: 'Escritura 9,668 · Folio Real 360920 · sin gravámenes' },
    { label: 'Trámites municipales',    items: 'Dictamen H3 · Alineamiento · 4 Números Oficiales' },
    { label: 'Factibilidades',          items: 'CFE · CEA (agua + drenaje)' },
    { label: 'Estudios técnicos',       items: 'Mecánica de suelos · topografía planimétrica' },
    { label: 'Trabajo arquitectónico',  items: 'Anteproyecto ML-ARQ + MLA · cuadro de áreas' },
    { label: 'Estado del predio',       items: 'Malla ciclónica · limpieza · predial al corriente' },
  ];
  return (
    <Sprite start={3.5} end={7.5}>
      {({ localTime, duration }) => {
        const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
        const reveal = (d, s = 0.5) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

        return (
          <>
            <div style={{
              position: 'absolute', top: 230, left: 0, right: 0, textAlign: 'center',
              opacity: reveal(0.1) * exitOp,
            }}>
              <Eyebrow size={22} tracking="0.5em">Con qué contamos</Eyebrow>
            </div>

            <div style={{
              position: 'absolute', top: 310, left: 0, right: 0, textAlign: 'center',
              fontFamily: SERIF, color: PALETTE.white, lineHeight: 1.0,
              opacity: reveal(0.3) * exitOp,
            }}>
              <div style={{ fontSize: 170, letterSpacing: '-0.03em' }}>Paquete</div>
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 200, letterSpacing: '-0.03em', marginTop: 8 }}>completo.</div>
            </div>

            <div style={{
              position: 'absolute', top: 770, left: 0, right: 0, textAlign: 'center',
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.ice, fontSize: 36,
              opacity: reveal(1.0, 0.7) * exitOp,
            }}>
              Seis categorías listas para proyecto ejecutivo.
            </div>

            {/* Categories list */}
            <div style={{
              position: 'absolute', left: 90, top: 870, right: 90,
              opacity: exitOp,
            }}>
              {cats.map((c, i) => (
                <B_CategoryItem key={i} index={i + 1} label={c.label} items={c.items}
                  t={reveal(1.2 + i * 0.18, 0.45)}/>
              ))}
            </div>
          </>
        );
      }}
    </Sprite>
  );
};

// ── Scene 3 (7.5 → 11.5): 4 Números Oficiales ───────────────────────────────
const B_Scene3 = () => {
  const codes = ['1', '1A', '1B', '1C'];
  return (
    <Sprite start={7.5} end={11.5}>
      {({ localTime, duration }) => {
        const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
        const reveal = (d, s = 0.5) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

        return (
          <>
            <div style={{
              position: 'absolute', top: 380, left: 0, right: 0, textAlign: 'center',
              opacity: reveal(0.1) * exitOp,
            }}>
              <Eyebrow size={24} tracking="0.5em">Cuatro accesos independientes</Eyebrow>
            </div>

            <div style={{
              position: 'absolute', top: 460, left: 0, right: 0, textAlign: 'center',
              fontFamily: SERIF, color: PALETTE.white, fontSize: 130, lineHeight: 1.0,
              opacity: reveal(0.3) * exitOp,
              letterSpacing: '-0.02em',
            }}>
              Números <em style={{ color: PALETTE.gold }}>Oficiales</em>
            </div>

            {/* 2x2 grid of N.Of. badges */}
            <div style={{
              position: 'absolute', top: 760, left: 90, right: 90,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32,
              opacity: exitOp,
            }}>
              {codes.map((c, i) => {
                const t = reveal(0.7 + i * 0.22, 0.5);
                return (
                  <div key={c} style={{
                    border: `1.5px solid ${PALETTE.gold}`,
                    padding: '60px 0',
                    textAlign: 'center',
                    background: 'rgba(15,30,71,0.6)',
                    opacity: t,
                    transform: `scale(${0.85 + 0.15 * t})`,
                    transformOrigin: 'center',
                  }}>
                    <div style={{
                      fontFamily: MONO, color: PALETTE.gold, fontSize: 22,
                      letterSpacing: '0.4em', marginBottom: 24,
                    }}>N.OF.</div>
                    <div style={{
                      fontFamily: SERIF, color: PALETTE.white, fontSize: 160, lineHeight: 1.0,
                      letterSpacing: '-0.03em',
                    }}>{c}</div>
                  </div>
                );
              })}
            </div>

            <div style={{
              position: 'absolute', bottom: 220, left: 80, right: 80, textAlign: 'center',
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 42,
              opacity: reveal(2.0, 0.7) * exitOp,
            }}>
              5 consultorios + lab &nbsp;·&nbsp; o 3 residencias
            </div>
          </>
        );
      }}
    </Sprite>
  );
};

// ── Scene 4 (11.5 → 15.5): Precio vs mercado ────────────────────────────────
const B_PriceRow = ({ label, value, highlight, t, source }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr auto',
    padding: '20px 24px',
    background: highlight ? `${PALETTE.gold}` : 'rgba(202,220,252,0.04)',
    border: highlight ? `2px solid ${PALETTE.gold}` : `1px solid rgba(202,220,252,0.12)`,
    marginBottom: 12,
    alignItems: 'center',
    opacity: t,
    transform: `translateX(${(1 - t) * 30}px)`,
  }}>
    <div>
      <div style={{
        fontFamily: SANS, fontSize: 24,
        color: highlight ? PALETTE.navy : PALETTE.white,
        letterSpacing: '0.02em', fontWeight: highlight ? 700 : 400,
      }}>{label}</div>
      {source && <div style={{
        fontFamily: MONO, fontSize: 16, color: highlight ? `${PALETTE.navy}aa` : 'rgba(202,220,252,0.5)',
        marginTop: 4, letterSpacing: '0.1em',
      }}>{source}</div>}
    </div>
    <div style={{
      fontFamily: SERIF, fontSize: 42,
      color: highlight ? PALETTE.navy : PALETTE.gold,
      letterSpacing: '-0.01em',
    }}>{value}</div>
  </div>
);

const B_Scene4 = () => (
  <Sprite start={11.5} end={15.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.4) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          <div style={{
            position: 'absolute', top: 220, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.1) * exitOp,
          }}>
            <Eyebrow size={22} tracking="0.5em">Precio vs. mercado Milenio III</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 72, marginTop: 22,
              letterSpacing: '-0.02em',
            }}>$8,000 <span style={{ color: PALETTE.gold }}>/ m²</span></div>
          </div>

          <div style={{
            position: 'absolute', top: 540, left: 70, right: 70,
            opacity: exitOp,
          }}>
            <B_PriceRow label="Bulk 3 lotes juntos" value="$5,500" source="Vivanuncios"
              t={reveal(0.4)}/>
            <B_PriceRow label="Fase A baja (sin trámites)" value="$7,392" source="iCasas"
              t={reveal(0.6)}/>
            <B_PriceRow label="ALABASTRO 1 · con 11 trámites" value="$8,000" highlight
              source="Precio de oportunidad"
              t={reveal(0.8)}/>
            <B_PriceRow label="Mediana Milenio III · feb 2026" value="$8,247" source="Doorvel"
              t={reveal(1.1)}/>
            <B_PriceRow label="Fase A alta · sin trámites" value="$8,630" source="iCasas"
              t={reveal(1.3)}/>
            <B_PriceRow label="Fase B Sec. 11 premium" value="$10,522+" source="Lamudi"
              t={reveal(1.5)}/>
          </div>

          <div style={{
            position: 'absolute', bottom: 200, left: 80, right: 80, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.ice, fontSize: 34,
            opacity: reveal(2.2, 0.7) * exitOp,
            lineHeight: 1.4,
          }}>
            Bajo la mediana — con el paquete de trámites incluido.
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 5 (15.5 → 18.0): Dos tesis pill summary ───────────────────────────
const B_Scene5 = () => (
  <Sprite start={15.5} end={18.0}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.3)) / 0.3, 0, 1);
      const reveal = (d, s = 0.5) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          <div style={{
            position: 'absolute', top: 580, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0) * exitOp,
          }}>
            <Eyebrow size={26} tracking="0.5em">Dos tesis</Eyebrow>
          </div>

          {/* Two stacked pills */}
          <div style={{ position: 'absolute', top: 700, left: 80, right: 80, opacity: exitOp }}>
            {/* Médica */}
            <div style={{
              padding: '36px 40px',
              border: `2px solid ${PALETTE.teal}`,
              background: 'rgba(20,184,166,0.08)',
              marginBottom: 24,
              opacity: reveal(0.3),
              transform: `translateX(${(1 - reveal(0.3)) * -30}px)`,
            }}>
              <div style={{
                fontFamily: MONO, color: PALETTE.teal, fontSize: 20, letterSpacing: '0.4em',
                marginBottom: 14,
              }}>TRACK A</div>
              <div style={{
                fontFamily: SERIF, color: PALETTE.white, fontSize: 64, lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}>Torre Médica</div>
              <div style={{
                fontFamily: SANS, color: PALETTE.ice, fontSize: 26, marginTop: 10,
                letterSpacing: '0.04em',
              }}>Yield bruto 9% · 5 consultorios + lab</div>
            </div>

            {/* Resi */}
            <div style={{
              padding: '36px 40px',
              border: `2px solid ${PALETTE.gold}`,
              background: 'rgba(201,169,97,0.08)',
              opacity: reveal(0.6),
              transform: `translateX(${(1 - reveal(0.6)) * 30}px)`,
            }}>
              <div style={{
                fontFamily: MONO, color: PALETTE.gold, fontSize: 20, letterSpacing: '0.4em',
                marginBottom: 14,
              }}>TRACK B</div>
              <div style={{
                fontFamily: SERIF, color: PALETTE.white, fontSize: 64, lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}>Residencias Boutique</div>
              <div style={{
                fontFamily: SANS, color: PALETTE.ice, fontSize: 26, marginTop: 10,
                letterSpacing: '0.04em',
              }}>Margen 17-30% · 3 unidades · 274 m² c/u</div>
            </div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 6 (18.0 → 20.0): CTA ──────────────────────────────────────────────
const B_Scene6 = () => (
  <Sprite start={18.0} end={20.0}>
    {({ localTime, duration }) => {
      const reveal = (d, s = 0.5) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          <div style={{
            position: 'absolute', top: 700, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0),
            transform: `translateY(${(1 - reveal(0.0)) * 24}px)`,
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 110, lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}>Alabastro <span style={{ color: PALETTE.gold }}>1</span></div>
            <div style={{
              marginTop: 36,
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 48,
            }}>Venta directa con propietario</div>
          </div>

          <div style={{
            position: 'absolute', top: 1080, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.4),
          }}>
            <div style={{
              fontFamily: MONO, color: PALETTE.ice, fontSize: 30, letterSpacing: '0.18em',
              padding: '20px 40px',
              border: `1px solid ${PALETTE.gold}`,
              display: 'inline-block',
            }}>alabastro1.com.mx</div>
          </div>
        </>
      );
    }}
  </Sprite>
);

function ReelB(props) {
  return (
    <Stage width={1080} height={1920} duration={20} background={PALETTE.ink} persistKey="reel-b" {...props}>
      <B_BG/>
      <B_Scene1/>
      <B_Scene2/>
      <B_Scene3/>
      <B_Scene4/>
      <B_Scene5/>
      <B_Scene6/>
      <B_Chrome/>
    </Stage>
  );
}

Object.assign(window, { ReelB });
