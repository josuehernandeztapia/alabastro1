// reel-f.jsx — Variation F: "EL EXPEDIENTE"
// 22s · 9:16 · the 11 trámites visualized as physical document cards stacking up.
// Strong proof-driven institutional aesthetic, like a notarial file being assembled.

const F_BG = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, #08102B 0%, ${PALETTE.navy} 100%)`,
  }}/>
);

// A single trámite document card — cream paper with header, body, and a gold approval stamp.
function DocCard({
  title, subtitle, code, date, x, y, rotation = 0, scale = 1, opacity = 1,
  stampOpacity = 0, status = 'OK', width = 660, height = 380,
}) {
  const isPending = status === 'PEND';
  return (
    <div style={{
      position: 'absolute',
      left: x - width/2, top: y - height/2,
      width, height,
      background: PALETTE.cream,
      transform: `rotate(${rotation}deg) scale(${scale})`,
      transformOrigin: 'center',
      opacity,
      boxShadow: '0 30px 60px rgba(0,0,0,0.45), 0 8px 16px rgba(0,0,0,0.3)',
      padding: '28px 36px',
      fontFamily: SANS,
      color: PALETTE.navy,
      borderTop: `4px solid ${isPending ? '#B89048' : PALETTE.navy}`,
    }}>
      {/* Top row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: MONO, fontSize: 14, color: PALETTE.navy,
        letterSpacing: '0.16em', opacity: 0.75,
      }}>
        <span>{code}</span>
        <span>{date}</span>
      </div>

      {/* Eyebrow */}
      <div style={{
        marginTop: 28,
        fontFamily: SANS, fontWeight: 800, fontSize: 14,
        letterSpacing: '0.35em', color: PALETTE.goldDk, textTransform: 'uppercase',
      }}>Trámite municipal</div>

      {/* Title */}
      <div style={{
        marginTop: 12,
        fontFamily: SERIF, fontSize: 44, lineHeight: 1.05, color: PALETTE.navy,
        letterSpacing: '-0.02em',
      }}>{title}</div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{
          marginTop: 14,
          fontFamily: SANS, fontSize: 20, color: '#6B7A93',
          letterSpacing: '0.02em',
        }}>{subtitle}</div>
      )}

      {/* Bottom signature line */}
      <div style={{
        position: 'absolute', left: 36, right: 36, bottom: 30,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        fontFamily: MONO, fontSize: 12, letterSpacing: '0.18em', color: '#8E99A6',
      }}>
        <div style={{ borderTop: `1px solid ${PALETTE.navy}33`, paddingTop: 6, width: 220 }}>
          AUTORIDAD MUNICIPAL
        </div>
        <div style={{ borderTop: `1px solid ${PALETTE.navy}33`, paddingTop: 6, width: 140, textAlign: 'right' }}>
          QRO · MX
        </div>
      </div>

      {/* Stamp */}
      <div style={{
        position: 'absolute', right: 28, top: 80,
        width: 160, height: 160,
        border: `4px solid ${isPending ? '#B89048' : PALETTE.gold}`,
        borderRadius: '50%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        transform: `rotate(-12deg) scale(${stampOpacity * 0.4 + 0.6})`,
        opacity: stampOpacity,
      }}>
        <div style={{
          fontFamily: SERIF, fontWeight: 700, fontSize: 32, lineHeight: 1.0,
          color: isPending ? '#B89048' : PALETTE.gold,
          letterSpacing: '0.05em',
        }}>{isPending ? 'PEND' : 'OK'}</div>
        <div style={{
          fontFamily: MONO, fontSize: 11, color: isPending ? '#B89048' : PALETTE.gold,
          letterSpacing: '0.2em', marginTop: 6,
        }}>{isPending ? 'EN TRÁMITE' : 'APROBADO'}</div>
      </div>
    </div>
  );
}

// ── Scene 1 (0 → 3.0): Title ────────────────────────────────────────────────
const F_Scene1 = () => (
  <Sprite start={0} end={3.0}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.7) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
      return (
        <>
          {/* Eyebrow */}
          <div style={{
            position: 'absolute', top: 740, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0) * exitOp,
          }}>
            <Eyebrow size={26} tracking="0.6em">Alabastro 1</Eyebrow>
          </div>

          {/* Title */}
          <div style={{
            position: 'absolute', top: 830, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, color: PALETTE.white, fontSize: 180, lineHeight: 1.05,
            letterSpacing: '-0.02em',
            opacity: reveal(0.3) * exitOp,
            transform: `translateY(${(1 - reveal(0.3)) * 36}px)`,
          }}>El</div>
          <div style={{
            position: 'absolute', top: 1020, left: 0, right: 0, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 220, lineHeight: 1.0,
            opacity: reveal(0.7) * exitOp,
            transform: `translateY(${(1 - reveal(0.7)) * 36}px)`,
          }}>Expediente</div>

          {/* Sub */}
          <div style={{
            position: 'absolute', top: 1290, left: 80, right: 80, textAlign: 'center',
            fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.ice, fontSize: 38,
            opacity: reveal(1.4, 0.8) * exitOp,
            lineHeight: 1.4,
          }}>
            Paquete completo — el comprador entra a ejecución con seis meses ganados.
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Documents data ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { idx: 1, name: 'Documentación Legal' },
  { idx: 2, name: 'Trámites Municipales' },
  { idx: 3, name: 'Factibilidades' },
  { idx: 4, name: 'Estudios Técnicos' },
  { idx: 5, name: 'Trabajo Arquitectónico' },
  { idx: 6, name: 'Estado del Predio' },
];

const DOCS = [
  // 01 · Documentación Legal
  { cat: 1, code: 'FOLIO 360920',  title: 'Escritura Pública',     subtitle: 'No. 9,668 · inscrita en RPP · sin gravámenes', date: '· INSCRITA' },
  // 02 · Trámites Municipales
  { cat: 2, code: 'DICT · TIPO B', title: 'Dictamen de Uso de Suelo', subtitle: 'H3 · habitacional, consultorios, laboratorio', date: '· VIGENTE' },
  { cat: 2, code: 'ALN · MUNI',    title: 'Alineamiento Municipal', subtitle: 'Sendero del Alabastro 1, Lote 14', date: '· EMITIDO' },
  { cat: 2, code: 'N. OF. 1·1A·1B·1C', title: 'Cuatro Números Oficiales', subtitle: '4 accesos independientes habilitados', date: '· APROBADOS' },
  // 03 · Factibilidades
  { cat: 3, code: 'CFE · 2025',    title: 'Factibilidad CFE',       subtitle: 'Suministro eléctrico confirmado', date: '· EMITIDA' },
  { cat: 3, code: 'CEA · 2025',    title: 'Factibilidad CEA',       subtitle: 'Agua + drenaje · servicios confirmados', date: '· EMITIDA' },
  // 04 · Estudios Técnicos
  { cat: 4, code: 'MS-2024',       title: 'Mecánica de Suelos',     subtitle: 'Manto rocoso a 5 m · cimentación somera', date: '· ESTUDIADA' },
  { cat: 4, code: 'TOPO-2024',     title: 'Levantamiento Topográfico', subtitle: 'Planimetría completa', date: '· LEVANTADO' },
  // 05 · Trabajo Arquitectónico
  { cat: 5, code: 'ML-ARQ · MLA',  title: 'Anteproyecto Arquitectónico', subtitle: '3 unidades verticales · cuadro de áreas', date: '· ENTREGADO' },
  // 06 · Estado del Predio
  { cat: 6, code: 'PERIM',         title: 'Malla Ciclónica + Limpieza', subtitle: 'Perímetro completo', date: '· EJECUTADO' },
  { cat: 6, code: 'PREDIAL',       title: 'Predial al corriente',   subtitle: '2026 · vigente', date: '· AL CORRIENTE' },
];

const DOCS_PENDING = [
  { code: 'PEND-01', title: 'Licencia de Construcción', subtitle: 'A cargo del comprador', date: '· PENDIENTE' },
  { code: 'PEND-02', title: 'Régimen de Condominio',    subtitle: 'Declaratoria', date: '· PENDIENTE' },
  { code: 'PEND-03', title: 'Protección Civil',         subtitle: 'Dictamen previo', date: '· PENDIENTE' },
];

// ── Scene 2 (3.0 → 15.5): Documents fly in & stack ──────────────────────────
const F_Scene2 = () => (
  <Sprite start={3.0} end={15.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const perDoc = 0.85;
      const start = 0.4;

      let placed = 0;
      for (let i = 0; i < DOCS.length; i++) {
        if (localTime >= start + i * perDoc + 0.45) placed++;
      }
      // Per-category fill progress
      const catProgress = {};
      for (let c = 1; c <= 6; c++) {
        const inCat = DOCS.filter(d => d.cat === c).length;
        const placedInCat = DOCS.slice(0, placed).filter(d => d.cat === c).length;
        catProgress[c] = inCat > 0 ? placedInCat / inCat : 0;
      }
      const lastDoc = placed > 0 ? DOCS[placed - 1] : null;
      const currentCat = lastDoc ? lastDoc.cat : 0;

      return (
        <>
          {/* LEFT panel — 6 category checklist */}
          <div style={{
            position: 'absolute', top: 110, left: 60, width: 400,
            opacity: exitOp,
          }}>
            <Eyebrow size={14} tracking="0.45em">Con qué contamos</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.gold, fontSize: 50, lineHeight: 1.0,
              marginTop: 16, letterSpacing: '-0.02em',
            }}>Paquete</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.white, fontSize: 50, lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}>completo.</div>

            <div style={{ marginTop: 36 }}>
              {CATEGORIES.map(c => {
                const p = catProgress[c.idx] || 0;
                const filled = p >= 0.99;
                const isCurrent = c.idx === currentCat && !filled;
                return (
                  <div key={c.idx} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 0',
                    borderBottom: `1px solid rgba(201,169,97,${filled ? 0.3 : 0.1})`,
                    opacity: p > 0 || isCurrent ? 1 : 0.45,
                  }}>
                    <TramiteTick size={22} color={filled || isCurrent ? PALETTE.gold : 'rgba(201,169,97,0.35)'} progress={p}/>
                    <div style={{
                      fontFamily: MONO, color: PALETTE.gold, fontSize: 14, letterSpacing: '0.18em',
                      width: 26, flexShrink: 0,
                    }}>{String(c.idx).padStart(2, '0')}</div>
                    <div style={{
                      fontFamily: SANS, fontWeight: filled ? 700 : 500,
                      color: filled ? PALETTE.white : 'rgba(255,255,255,0.65)',
                      fontSize: 18, letterSpacing: '0.04em',
                    }}>{c.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TOP-RIGHT note */}
          <div style={{
            position: 'absolute', top: 110, right: 60, textAlign: 'right',
            width: 380,
            opacity: exitOp,
          }}>
            <Eyebrow size={14} tracking="0.45em">Lo que ya está hecho</Eyebrow>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.white, fontSize: 28,
              marginTop: 18, lineHeight: 1.4,
            }}>
              Cada documento es tiempo y dinero que el comprador no gasta.
            </div>
          </div>

          {/* Documents */}
          {DOCS.map((d, i) => {
            const docStart = start + i * perDoc;
            const localT = localTime - docStart;
            if (localT < -0.05) return null;

            const stackY = 1180 + i * 28;
            const stackRot = (i % 2 === 0 ? -1 : 1) * (3 + (i % 4));
            const stackX = 540 + (i % 2 === 0 ? -10 : 10);

            const spotX = 540;
            const spotY = 880;
            const spotRot = 0;

            const enter = Easing.easeOutBack(clamp(localT / 0.45, 0, 1));
            const settle = Easing.easeInOutCubic(clamp((localT - 0.7) / 0.4, 0, 1));
            const stamp = clamp((localT - 0.35) / 0.25, 0, 1);

            const x = spotX + (stackX - spotX) * settle;
            const y = spotY + (stackY - spotY) * settle;
            const rot = spotRot + (stackRot - spotRot) * settle;
            const scale = 1 * (1 - settle * 0.45);
            const op = enter * (1 - settle * 0.15) * exitOp;
            const isLatest = i === placed - 1 && localT < 0.85;
            const finalOp = isLatest ? op : op * (0.55 + 0.45 * (1 - clamp((placed - 1 - i) / 4, 0, 1)));

            return (
              <DocCard key={i}
                title={d.title} subtitle={d.subtitle} code={d.code} date={d.date}
                x={x} y={y} rotation={rot} scale={scale}
                opacity={finalOp}
                stampOpacity={stamp * exitOp}/>
            );
          })}
        </>
      );
    }}
  </Sprite>
);

// ── Scene 3 (15.5 → 18.5): Pending docs ─────────────────────────────────────
const F_Scene3 = () => (
  <Sprite start={15.5} end={18.5}>
    {({ localTime, duration }) => {
      const exitOp = 1 - clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));

      return (
        <>
          {/* Top header */}
          <div style={{
            position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0) * exitOp,
          }}>
            <Eyebrow size={20} tracking="0.5em" color="#E7B381">Pendiente para iniciar obra · a cargo del comprador</Eyebrow>
          </div>

          {/* The 3 pending cards in a row */}
          {DOCS_PENDING.map((d, i) => {
            const t = reveal(0.3 + i * 0.2, 0.5);
            const x = 240 + i * 300;
            const y = 800;
            return (
              <DocCard key={i}
                title={d.title} subtitle={d.subtitle} code={d.code} date={d.date}
                x={x} y={y}
                rotation={(i - 1) * 3}
                scale={0.55}
                opacity={t * 0.92 * exitOp}
                stampOpacity={t * exitOp}
                status="PEND"/>
            );
          })}

          {/* Bottom line: cost summary */}
          <div style={{
            position: 'absolute', bottom: 380, left: 80, right: 80, textAlign: 'center',
            opacity: reveal(1.2, 0.7) * exitOp,
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 56, lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              Trámites restantes <em style={{ color: PALETTE.gold }}>≈ $165k</em>
            </div>
            <div style={{
              marginTop: 22,
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.ice, fontSize: 32, lineHeight: 1.4,
            }}>
              Mientras el resto del mercado empieza desde cero.
            </div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// ── Scene 4 (18.5 → 22.0): Sign-off + price + URL ───────────────────────────
const F_Scene4 = () => (
  <Sprite start={18.5} end={22.0}>
    {({ localTime }) => {
      const reveal = (d, s = 0.6) => Easing.easeOutCubic(clamp((localTime - d) / s, 0, 1));
      return (
        <>
          <div style={{
            position: 'absolute', top: 540, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.0),
            transform: `translateY(${(1 - reveal(0.0)) * 20}px)`,
          }}>
            <Eyebrow size={22} tracking="0.55em">Paquete completo · listo para ejecutivo</Eyebrow>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 200, lineHeight: 1.0,
              marginTop: 38, letterSpacing: '-0.04em',
            }}>Alabastro</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic', color: PALETTE.gold, fontSize: 220, lineHeight: 1.0,
            }}>1</div>
          </div>

          <div style={{
            position: 'absolute', top: 1280, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(0.6),
          }}>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 80, letterSpacing: '-0.02em',
            }}>$3,577,760 <span style={{ color: PALETTE.gold }}>MXN</span></div>
            <div style={{
              fontFamily: MONO, color: PALETTE.ice, fontSize: 22, marginTop: 14,
              letterSpacing: '0.3em',
            }}>$8,000 / M²  ·  447 M²  ·  VENTA DIRECTA</div>
          </div>

          <div style={{
            position: 'absolute', bottom: 240, left: 0, right: 0, textAlign: 'center',
            opacity: reveal(1.2),
          }}>
            <div style={{
              display: 'inline-block',
              fontFamily: MONO, color: PALETTE.gold, fontSize: 26, letterSpacing: '0.22em',
              padding: '18px 38px',
              border: `1px solid ${PALETTE.gold}`,
            }}>alabastro1.com.mx</div>
          </div>
        </>
      );
    }}
  </Sprite>
);

// Persistent chrome — top corners
const F_Chrome = () => {
  const t = useTime();
  // hide during the busy stack scene
  const hide = t > 3.0 && t < 15.5;
  return (
    <>
      <Grain opacity={0.05}/>
      {!hide && <BrandLockup x={60} y={70} scale={0.9}/>}
      {!hide && (
        <div style={{
          position: 'absolute', top: 80, right: 60,
          fontFamily: MONO, color: PALETTE.gold, fontSize: 18, letterSpacing: '0.22em',
        }}>EXPEDIENTE / 2026</div>
      )}
    </>
  );
};

function ReelF(props) {
  return (
    <Stage width={1080} height={1920} duration={22} background={PALETTE.ink} persistKey="reel-f" {...props}>
      <F_BG/>
      <F_Scene1/>
      <F_Scene2/>
      <F_Scene3/>
      <F_Scene4/>
      <F_Chrome/>
    </Stage>
  );
}

Object.assign(window, { ReelF });
