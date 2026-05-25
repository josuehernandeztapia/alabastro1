// landing-planos.jsx — S5.5 · Anteproyecto arquitectónico (architectural plans gallery)
// Shows the 6 ML-ARQ PDFs as cards with styled previews. Click opens in new tab; embed shown in modal.

const L_PLANOS = [
  { id: '01', code: 'MLA · 01', title: 'Plantas · Sótano + PB',   sub: 'Estacionamiento 6 cajones + Casa 1 (sala-comedor, 3 recámaras, terraza)', img: 'planos/img/MLA01-plantas-sotano-baja.png' },
  { id: '02', code: 'MLA · 02', title: 'Plantas · Niveles 1 y 2', sub: 'Dos townhouses replicados — estancia, cocina, 3 recámaras, estudio',      img: 'planos/img/MLA02-niveles-1-2.png' },
  { id: '03', code: 'MLA · 03', title: 'Plantas · Roof + Azotea', sub: 'Roof garden + planta de azotea con cuarto de máquinas',                   img: 'planos/img/MLA03-roof-azotea.png' },
  { id: '04', code: 'MLA · 04', title: 'Fachadas laterales',      sub: 'Tres vistas — lateral, lateral B, lateral interior · niveles +14.10 m',   img: 'planos/img/MLA04-fachadas-laterales.png' },
  { id: '05', code: 'MLA · 05', title: 'Fachadas + secciones',    sub: 'Fachada frontal y posterior + cortes S.01 y S.02',                        img: 'planos/img/MLA05-fachadas-secciones.png' },
];

// Stylized SVG preview — different for each plano kind (planta, fachada, sección, modelo)
function L_PlanoPreview({ kind, color = L_PALETTE.gold }) {
  const stroke = color;
  const fill   = `${color}10`;
  if (kind === 'planta') {
    return (
      <svg viewBox="0 0 200 280" style={{ width: '100%', height: '100%' }}>
        {/* outer wall */}
        <rect x="30" y="40" width="140" height="200" fill={fill} stroke={stroke} strokeWidth="1.5"/>
        {/* room divisions */}
        <line x1="30" y1="120" x2="170" y2="120" stroke={stroke} strokeWidth="1"/>
        <line x1="100" y1="40" x2="100" y2="120" stroke={stroke} strokeWidth="1"/>
        <line x1="30" y1="180" x2="170" y2="180" stroke={stroke} strokeWidth="1"/>
        {/* core / stair */}
        <rect x="80" y="135" width="40" height="35" fill={stroke} opacity="0.18" stroke={stroke} strokeWidth="0.8"/>
        <line x1="80" y1="142" x2="120" y2="142" stroke={stroke} strokeWidth="0.5"/>
        <line x1="80" y1="149" x2="120" y2="149" stroke={stroke} strokeWidth="0.5"/>
        <line x1="80" y1="156" x2="120" y2="156" stroke={stroke} strokeWidth="0.5"/>
        <line x1="80" y1="163" x2="120" y2="163" stroke={stroke} strokeWidth="0.5"/>
        {/* doors as arcs */}
        <path d="M 50 120 A 15 15 0 0 1 65 135" fill="none" stroke={stroke} strokeWidth="0.8"/>
        <path d="M 155 120 A 15 15 0 0 0 140 135" fill="none" stroke={stroke} strokeWidth="0.8"/>
        {/* dimensions tick top */}
        <line x1="30" y1="22" x2="170" y2="22" stroke={stroke} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5"/>
        <line x1="30" y1="18" x2="30" y2="26" stroke={stroke} strokeWidth="0.5" opacity="0.5"/>
        <line x1="170" y1="18" x2="170" y2="26" stroke={stroke} strokeWidth="0.5" opacity="0.5"/>
      </svg>
    );
  }
  if (kind === 'fachada') {
    return (
      <svg viewBox="0 0 200 280" style={{ width: '100%', height: '100%' }}>
        {/* sky bg */}
        {/* ground line */}
        <line x1="20" y1="240" x2="180" y2="240" stroke={stroke} strokeWidth="1"/>
        {/* building outline */}
        <rect x="50" y="60" width="100" height="180" fill={fill} stroke={stroke} strokeWidth="1.5"/>
        {/* floor divisions */}
        <line x1="50" y1="100" x2="150" y2="100" stroke={stroke} strokeWidth="0.6"/>
        <line x1="50" y1="140" x2="150" y2="140" stroke={stroke} strokeWidth="0.6"/>
        <line x1="50" y1="180" x2="150" y2="180" stroke={stroke} strokeWidth="0.6"/>
        <line x1="50" y1="220" x2="150" y2="220" stroke={stroke} strokeWidth="0.6"/>
        {/* windows */}
        {[70, 110, 150, 190].map(y => (
          <g key={y}>
            <rect x="60" y={y - 25} width="22" height="20" fill="none" stroke={stroke} strokeWidth="0.7"/>
            <rect x="118" y={y - 25} width="22" height="20" fill="none" stroke={stroke} strokeWidth="0.7"/>
          </g>
        ))}
        {/* rooftop railing */}
        <line x1="48" y1="60" x2="152" y2="60" stroke={stroke} strokeWidth="0.6" strokeDasharray="2 1"/>
        {/* trees */}
        <circle cx="32" cy="232" r="8" fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.5"/>
        <circle cx="168" cy="232" r="8" fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.5"/>
      </svg>
    );
  }
  if (kind === 'seccion') {
    return (
      <svg viewBox="0 0 200 280" style={{ width: '100%', height: '100%' }}>
        {/* ground line */}
        <line x1="20" y1="220" x2="180" y2="220" stroke={stroke} strokeWidth="1"/>
        {/* sotano (dashed) */}
        <rect x="50" y="220" width="100" height="40" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="4 4"/>
        <line x1="100" y1="220" x2="100" y2="260" stroke={stroke} strokeWidth="0.5" strokeDasharray="2 2"/>
        {/* building cut */}
        <rect x="50" y="60" width="100" height="160" fill={fill} stroke={stroke} strokeWidth="1.5"/>
        {/* floor slabs */}
        <line x1="50" y1="100" x2="150" y2="100" stroke={stroke} strokeWidth="1"/>
        <line x1="50" y1="140" x2="150" y2="140" stroke={stroke} strokeWidth="1"/>
        <line x1="50" y1="180" x2="150" y2="180" stroke={stroke} strokeWidth="1"/>
        {/* stair */}
        <g stroke={stroke} strokeWidth="0.6" fill="none">
          <line x1="95" y1="100" x2="115" y2="120"/>
          <line x1="95" y1="140" x2="115" y2="160"/>
          <line x1="95" y1="180" x2="115" y2="200"/>
        </g>
        {/* dimension ticks side */}
        <line x1="170" y1="60" x2="170" y2="220" stroke={stroke} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6"/>
        <line x1="166" y1="60" x2="174" y2="60" stroke={stroke} strokeWidth="0.5" opacity="0.6"/>
        <line x1="166" y1="100" x2="174" y2="100" stroke={stroke} strokeWidth="0.5" opacity="0.6"/>
        <line x1="166" y1="140" x2="174" y2="140" stroke={stroke} strokeWidth="0.5" opacity="0.6"/>
        <line x1="166" y1="180" x2="174" y2="180" stroke={stroke} strokeWidth="0.5" opacity="0.6"/>
        <line x1="166" y1="220" x2="174" y2="220" stroke={stroke} strokeWidth="0.5" opacity="0.6"/>
      </svg>
    );
  }
  // modelo / isometric
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', height: '100%' }}>
      <g stroke={stroke} fill="none" strokeWidth="1.2" strokeLinejoin="round">
        {/* iso building, simplified */}
        {/* base */}
        <polygon points="50,230 100,255 150,230 100,205" fill={fill}/>
        {/* front face */}
        <polygon points="50,230 50,100 100,125 100,255" fill={fill}/>
        {/* right face */}
        <polygon points="100,255 150,230 150,100 100,125" fill={fill}/>
        {/* top face */}
        <polygon points="50,100 100,125 150,100 100,75" fill={fill}/>
        {/* floor lines on front */}
        <line x1="50" y1="160" x2="100" y2="185" strokeWidth="0.6"/>
        <line x1="50" y1="190" x2="100" y2="215" strokeWidth="0.6"/>
        <line x1="50" y1="130" x2="100" y2="155" strokeWidth="0.6"/>
        {/* floor lines on right */}
        <line x1="100" y1="185" x2="150" y2="160" strokeWidth="0.6"/>
        <line x1="100" y1="215" x2="150" y2="190" strokeWidth="0.6"/>
        <line x1="100" y1="155" x2="150" y2="130" strokeWidth="0.6"/>
      </g>
    </svg>
  );
}

function L_PlanoCard({ plano, idx, onOpen }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onClick={() => onOpen(plano)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer',
        position: 'relative',
        background: '#FFFFFF',
        border: `1px solid ${L_PALETTE.rule}`,
        borderTop: `4px solid ${hover ? L_PALETTE.gold : L_PALETTE.navy}`,
        padding: '24px',
        transition: 'all 240ms',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? '0 24px 48px rgba(15,30,71,0.12)' : '0 0 0 rgba(0,0,0,0)',
      }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: L_MONO, fontSize: 11, letterSpacing: '0.22em',
        color: L_PALETTE.gold,
      }}>
        <span>{plano.code}</span>
        <span style={{ color: 'rgba(15,30,71,0.5)' }}>{String(idx + 1).padStart(2, '0')} / 05</span>
      </div>

      <div style={{
        margin: '20px 0',
        background: L_PALETTE.paper,
        border: `1px solid ${L_PALETTE.rule}`,
        aspectRatio: '5 / 7',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img src={plano.img} alt={plano.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            transition: 'transform 320ms',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
          }}/>
      </div>

      <div style={{
        fontFamily: L_SERIF, color: L_PALETTE.navy,
        fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.01em',
      }}>{plano.title}</div>
      <div style={{
        marginTop: 6,
        fontFamily: L_SANS, color: 'rgba(15,30,71,0.6)', fontSize: 13, lineHeight: 1.45,
      }}>{plano.sub}</div>

      <div style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: `1px solid ${L_PALETTE.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 11,
        letterSpacing: '0.22em', textTransform: 'uppercase',
      }}>
        <span>Ver en grande</span>
        <span style={{ transition: 'transform 220ms', transform: hover ? 'translateX(6px)' : 'translateX(0)' }}>↗</span>
      </div>
    </div>
  );
}

// Fullscreen modal — shows a LARGE styled preview + clear download CTA
// (PDF embedding doesn't work in sandboxed preview; we show a beautiful card with the
// schematic preview and direct download)
function L_PlanoModal({ plano, onClose }) {
  if (!plano) return null;
  const [zoom, setZoom] = React.useState(1);
  React.useEffect(() => { setZoom(1); }, [plano && plano.id]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(7,14,39,0.96)',
      backdropFilter: 'blur(20px)',
      padding: 32,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20, color: L_PALETTE.ivory,
      }}>
        <div>
          <div style={{
            fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 12,
            letterSpacing: '0.4em',
          }}>{plano.code}</div>
          <div style={{
            fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 36,
            marginTop: 6, letterSpacing: '-0.02em',
          }}>{plano.title}</div>
          <div style={{
            fontFamily: L_SERIF, fontStyle: 'italic', color: L_PALETTE.ice,
            fontSize: 16, marginTop: 4, maxWidth: 900,
          }}>{plano.sub}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} style={zoomBtn}>−</button>
          <span style={{
            fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 12,
            letterSpacing: '0.2em', minWidth: 52, textAlign: 'center',
          }}>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} style={zoomBtn}>+</button>
          <button onClick={() => setZoom(1)} style={{...zoomBtn, width: 'auto', fontSize: 10, padding: '0 14px'}}>RESET</button>
          <button onClick={onClose} style={{
            marginLeft: 12,
            padding: '12px 20px',
            background: 'transparent', border: `1px solid ${L_PALETTE.gold}`,
            color: L_PALETTE.gold,
            fontFamily: L_SANS, fontWeight: 700, fontSize: 11,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            cursor: 'pointer', borderRadius: 999,
          }}>Cerrar ✕</button>
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()} style={{
        flex: 1,
        background: '#FFFFFF',
        border: `1px solid ${L_PALETTE.gold}33`,
        overflow: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}>
        <img src={plano.img} alt={plano.title}
          style={{
            display: 'block',
            maxWidth: '100%', maxHeight: '100%',
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 220ms',
          }}/>
      </div>
    </div>
  );
}

const zoomBtn = {
  width: 40, height: 40,
  background: 'rgba(201,169,97,0.1)',
  border: `1px solid #C9A96166`,
  color: '#C9A961',
  fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 700,
  cursor: 'pointer', borderRadius: 999,
};

function L_Planos() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const vp = useViewport();
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.1) / 0.4)));
  const [open, setOpen] = React.useState(null);

  return (
    <section ref={ref} id="planos" data-screen-label="Planos" style={{
      background: L_PALETTE.ivory,
      color: L_PALETTE.navy,
      padding: `${vp.padY}px ${vp.padX}px ${vp.padY + 20}px`,
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 1.6fr'),
          gap: vp.mobile ? 32 : 80, alignItems: 'end', marginBottom: vp.mobile ? 48 : 80,
          opacity: ease,
        }}>
          <div>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
              letterSpacing: '0.4em', marginBottom: 22,
            }}>V.</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(48px, 5.5vw, 88px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>
              El{' '}
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>anteproyecto.</em>
            </h2>
          </div>
          <div style={{
            fontFamily: L_SERIF, fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.6,
            color: 'rgba(15,30,71,0.7)',
            maxWidth: 760,
          }}>
            Cinco láminas MLA — plantas por nivel, fachadas y secciones.
            Base lista para que el arquitecto del comprador desarrolle el
            proyecto ejecutivo. <strong style={{ color: L_PALETTE.navy }}>Selecciona cualquiera para abrirla.</strong>
          </div>
        </div>

        {/* Stat strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('repeat(2, 1fr)', 'repeat(4, 1fr)'),
          gap: 0,
          borderTop: `1px solid ${L_PALETTE.rule}`,
          borderBottom: `1px solid ${L_PALETTE.rule}`,
          marginBottom: 64,
          opacity: ease,
        }}>
          {[
            { v: '5', l: 'Láminas',         sub: 'MLA 01–05' },
            { v: '1,045 m²', l: 'Construible', sub: '4 niveles · 14 m' },
            { v: '3', l: 'Unidades',         sub: '274 m² c/u privativa' },
            { v: '+1', l: 'Sótano',          sub: '268 m² · 6 cajones' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '30px 24px',
              borderRight: i < 3 ? `1px solid ${L_PALETTE.rule}` : 'none',
            }}>
              <div style={{
                fontFamily: L_SERIF, color: L_PALETTE.gold, fontSize: 44,
                lineHeight: 1.0, letterSpacing: '-0.02em',
              }}>{s.v}</div>
              <div style={{
                marginTop: 10,
                fontFamily: L_SANS, fontWeight: 700, color: L_PALETTE.navy,
                fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
              }}>{s.l}</div>
              <div style={{
                marginTop: 2,
                fontFamily: L_SERIF, fontStyle: 'italic',
                color: 'rgba(15,30,71,0.55)', fontSize: 14,
              }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)'),
          gap: vp.mobile ? 20 : 28,
        }}>
          {L_PLANOS.map((p, i) => (
            <L_PlanoCard key={p.id} plano={p} idx={i} onOpen={setOpen}/>
          ))}
        </div>

        {/* Footnote */}
        <div style={{
          marginTop: 80,
          padding: '32px 36px',
          borderLeft: `2px solid ${L_PALETTE.gold}`,
          background: 'rgba(201,169,97,0.07)',
          fontFamily: L_SERIF, fontStyle: 'italic',
          color: 'rgba(15,30,71,0.78)', fontSize: 18, lineHeight: 1.55,
          maxWidth: 1200,
        }}>
          <strong style={{
            color: L_PALETTE.gold, fontStyle: 'normal',
            fontFamily: L_SANS, fontWeight: 800, fontSize: 11,
            letterSpacing: '0.4em', textTransform: 'uppercase',
            display: 'block', marginBottom: 10,
          }}>NOTA</strong>
          Los planos se entregan como <strong style={{ color: L_PALETTE.navy, fontStyle: 'normal' }}>anteproyecto</strong>,
          no como proyecto ejecutivo. Validan la viabilidad espacial del partido
          arquitectónico sobre este predio específico y sirven como base de trabajo
          para el arquitecto del comprador.
        </div>
      </div>

      <L_PlanoModal plano={open} onClose={() => setOpen(null)}/>
    </section>
  );
}

Object.assign(window, { L_Planos });
