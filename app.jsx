// app.jsx — host shell with A/B/C tab selector for the three reels.

function ReelTab({ id, title, subtitle, color, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '14px 18px',
      background: active ? 'rgba(201,169,97,0.12)' : 'transparent',
      border: 'none',
      borderTop: active ? `2px solid ${color}` : '2px solid transparent',
      borderBottom: '1px solid rgba(201,169,97,0.18)',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'background 160ms',
      color: PALETTE.white,
      fontFamily: SANS,
      minWidth: 0, // grid cells respect overflow
    }}>
      <div style={{
        fontFamily: 'Menlo, monospace',
        fontSize: 11, color: color, letterSpacing: '0.28em',
        opacity: active ? 1 : 0.55,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{id}</div>
      <div style={{
        fontFamily: SERIF, fontSize: 20, marginTop: 6,
        color: active ? PALETTE.white : 'rgba(255,255,255,0.65)',
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{title}</div>
      <div style={{
        fontSize: 11, color: 'rgba(202,220,252,0.55)', marginTop: 4,
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{subtitle}</div>
    </button>
  );
}

function App() {
  const [variant, setVariant] = React.useState(() => {
    try { return localStorage.getItem('alabastro-variant') || 'A'; }
    catch { return 'A'; }
  });

  React.useEffect(() => {
    try { localStorage.setItem('alabastro-variant', variant); } catch {}
  }, [variant]);

  const variants = [
    { key: 'A', id: 'A · DOS RUTAS',           title: 'Dos Rutas',           subtitle: '22s · split-screen · datos contrastados',  color: PALETTE.gold,  reel: ReelA },
    { key: 'B', id: 'B · DATOS EN MOVIMIENTO', title: 'Datos en Movimiento', subtitle: '20s · kinetic typography · institucional', color: PALETTE.teal,  reel: ReelB },
    { key: 'C', id: 'C · MAPA CINEMÁTICO',     title: 'Mapa Cinemático',     subtitle: '22s · ubicación · corredor médico',        color: PALETTE.cream, reel: ReelC },
    { key: 'D', id: 'D · ISOTIPO',             title: 'Isotipo',             subtitle: '20s · brand-first · barra dorada como motor', color: PALETTE.gold, reel: ReelD },
    { key: 'E', id: 'E · HOY / MAÑANA',        title: 'Hoy / Mañana',        subtitle: '22s · photo essay · existe vs. potencial', color: PALETTE.ice,   reel: ReelE },
    { key: 'F', id: 'F · EL EXPEDIENTE',       title: 'El Expediente',       subtitle: '22s · trámites como dossier físico',       color: PALETTE.cream, reel: ReelF },
  ];

  const active = variants.find(v => v.key === variant) || variants[0];
  const Reel = active.reel;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: PALETTE.ink,
      color: PALETTE.white,
      fontFamily: SANS,
    }}>
      {/* Header */}
      <header style={{
        padding: '22px 36px 0',
        borderBottom: '1px solid rgba(201,169,97,0.15)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 24, marginBottom: 18, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontFamily: SANS, fontWeight: 800, color: PALETTE.gold,
              fontSize: 13, letterSpacing: '0.4em',
            }}>ALABASTRO 1 · REEL HERO</div>
            <div style={{
              fontFamily: SERIF, color: PALETTE.white, fontSize: 28, marginTop: 6,
              letterSpacing: '-0.01em',
            }}>6 variaciones · 9:16 · Instagram/WhatsApp</div>
          </div>
          <div style={{
            fontFamily: 'Menlo, monospace', fontSize: 11, letterSpacing: '0.2em',
            color: 'rgba(202,220,252,0.55)', textTransform: 'uppercase',
          }}>
            ESPACIO · play/pause &nbsp;·&nbsp; ← → · seek &nbsp;·&nbsp; 0 · reset
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0,
        }}>
          {variants.map((v) => (
            <ReelTab
              key={v.key}
              id={v.id}
              title={v.title}
              subtitle={v.subtitle}
              color={v.color}
              active={variant === v.key}
              onClick={() => setVariant(v.key)}
            />
          ))}
        </div>
      </header>

      {/* Stage wrapper — gives Stage its space (Stage uses absolute inset:0) */}
      <main style={{
        flex: 1, position: 'relative', minHeight: 0,
      }}>
        <Reel key={variant}/>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
