// landing-rutas.jsx — Section 5: Dos Rutas with track tabs + scroll-driven building build-up

function L_Building({ progress = 1, mode = 'resi' }) {
  // 5 floors + sotano. Each floor draws on at a different progress threshold.
  const accent = mode === 'med' ? L_PALETTE.teal : L_PALETTE.gold;
  const stroke = mode === 'med' ? L_PALETTE.teal : L_PALETTE.gold;

  const floors = mode === 'med' ? [
    { name: 'Planta Baja',     label: 'Recepción · Lab clínico · 2 consultorios' },
    { name: 'Nivel 1',         label: 'Recepción +' },
    { name: 'Nivel 2',         label: 'Recepción · 3 consultorios' },
    { name: 'Nivel 3',         label: '3 consultorios · imagenología' },
    { name: 'Rooftop',         label: 'Terraza colaborativa · staff' },
  ] : [
    { name: 'Planta Baja',     label: 'Casa 1 · 254 m² · jardín 32 m²' },
    { name: 'Nivel 1',         label: 'Casa 2 · estancia familiar' },
    { name: 'Nivel 2',         label: 'Casa 3 · vista panorámica N/NO' },
    { name: 'Rooftop',         label: 'Asador · fire pit · jardín LED' },
  ];

  // 5 segments incl. sotano: 0.1 sotano, 0.25/0.4/0.55/0.7/0.85 floors
  return (
    <svg viewBox="0 0 700 800" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <pattern id="bg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={L_PALETTE.gold} strokeWidth="0.3" opacity="0.18"/>
        </pattern>
      </defs>
      <rect width="700" height="800" fill="url(#bg-grid)"/>

      {/* Ground line */}
      <line x1="50" y1="600" x2="650" y2="600" stroke={L_PALETTE.ivory} strokeWidth="1" opacity="0.6"/>
      <text x="60" y="592" fontFamily={L_MONO} fontSize="11" fill={L_PALETTE.ivory} opacity="0.55" letterSpacing="3">GROUND</text>

      {/* Sotano */}
      {progress > 0.08 && (() => {
        const t = Math.max(0, Math.min(1, (progress - 0.08) / 0.12));
        return (
          <g opacity={t}>
            <rect x={150} y={600} width={400} height={90}
              fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="6 6" opacity={0.6 * t}/>
            <text x={350} y={650} textAnchor="middle"
              fontFamily={L_MONO} fontSize="14" fill={L_PALETTE.ivory} letterSpacing="2.5" opacity={0.85 * t}>
              SÓTANO · 268 m² · ESTACIONAMIENTO
            </text>
          </g>
        );
      })()}

      {/* Floors stacking up */}
      {floors.map((f, i) => {
        const at = 0.22 + i * 0.13;
        const t = Math.max(0, Math.min(1, (progress - at) / 0.10));
        if (t <= 0) return null;
        const fh = 90;
        const y = 600 - fh * (i + 1);
        const w = 400 * t;
        const x = 350 - w / 2;
        const isRoof = i === floors.length - 1;
        return (
          <g key={i} opacity={t}>
            <rect x={x} y={y} width={w} height={fh}
              fill={isRoof ? `${accent}30` : `rgba(15,30,71,0.72)`}
              stroke={isRoof ? accent : stroke}
              strokeWidth={isRoof ? 2 : 1.5}/>
            {t > 0.7 && (
              <g opacity={(t - 0.7) / 0.3}>
                <text x={170} y={y + fh / 2 - 6}
                  fontFamily={L_SANS} fontWeight="700" fontSize="16" fill={L_PALETTE.ivory} letterSpacing="3">
                  {f.name.toUpperCase()}
                </text>
                <text x={170} y={y + fh / 2 + 14}
                  fontFamily={L_SANS} fontSize="13" fill={L_PALETTE.ice} letterSpacing="1.5">
                  {f.label}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Top callout */}
      {progress > 0.92 && (() => {
        const t = Math.max(0, Math.min(1, (progress - 0.92) / 0.08));
        return (
          <g opacity={t}>
            <text x={350} y={110} textAnchor="middle"
              fontFamily={L_SERIF} fontSize="68" fill={L_PALETTE.ivory} letterSpacing="-1">
              1,045 m²
            </text>
            <text x={350} y={150} textAnchor="middle"
              fontFamily={L_MONO} fontSize="15" fill={accent} letterSpacing="4">
              CONSTRUIBLES · 4 NIVELES · 14 M
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

function L_Rutas() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  // Build progress is driven by scroll position through this section
  const buildT = Math.max(0, Math.min(1, (t - 0.3) / 0.5));
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.1) / 0.4)));

  const [mode, setMode] = React.useState('resi');
  const accent = mode === 'med' ? L_PALETTE.teal : L_PALETTE.gold;
  const accentDk = mode === 'med' ? L_PALETTE.tealDk : L_PALETTE.goldDk;

  const DATA = mode === 'med' ? {
    badge: 'Track A · Torre Médica Boutique',
    title: 'Un cluster ya validado.',
    sub: 'Tres torres operando a menos de 700 metros del predio. Renta de consultorio 70 m² entre $27k y $32k al mes — demanda institucional probada, no proyectada.',
    kpis: [
      { v: '$27-32k', l: 'Renta consultorio · zona' },
      { v: '5 + lab', l: 'Consultorios potenciales' },
      { v: '200 m', l: 'Al corredor médico' },
      { v: '14 m', l: 'Altura máxima' },
    ],
    bullets: [
      'Compatibilidad explícita con consultorios y laboratorios · dictamen H3',
      'Número Oficial 1 (acceso) + 1A · 1B · 1C (interiores) · habilita régimen de condominio',
      'Lab Corregidora, IML buscando expansión en zona',
      'Plusvalía Milenio III 8-12% anual · fuente Spot2.mx · Doorvel',
    ],
    formula: 'Pro-forma completa bajo LOI',
  } : {
    badge: 'Track B · Residencias Boutique',
    title: 'Tres unidades, una sola tesis.',
    sub: 'Vivienda vertical de lujo aprovechando la pendiente natural para vistas panorámicas N/NO sobre la barranca. Escasez programada, ticket aspiracional.',
    kpis: [
      { v: '8-12%', l: 'Plusvalía anual · Milenio III' },
      { v: '3', l: 'Residencias programadas' },
      { v: '274 m²', l: 'Privativa c/u' },
      { v: 'N / NO', l: 'Vista protegida' },
    ],
    bullets: [
      'Anteproyecto completo · planos ML-ARQ, MLA, cuadro de áreas',
      'Vistas panorámicas N/NO desde rooftop · sin construcciones que las obstruyan',
      'Cimentación somera por manto rocoso a 5 m',
      'Esquema preventa 35/40/25 en 9 meses · estructura típica del mercado',
    ],
    formula: 'Pro-forma completa bajo LOI',
  };

  return (
    <section ref={ref} data-screen-label="05 Rutas" style={{
      background: L_PALETTE.ink,
      color: L_PALETTE.ivory,
      padding: '180px 96px 200px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: 80, alignItems: 'end', marginBottom: 60,
          opacity: ease,
        }}>
          <div>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
              letterSpacing: '0.4em', marginBottom: 22,
            }}>VII.</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(48px, 5.5vw, 88px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
              color: L_PALETTE.ivory,
            }}>
              Las <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>dos rutas.</em>
            </h2>
          </div>
          <div style={{
            fontFamily: L_SERIF, fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.6,
            color: L_PALETTE.ice,
            maxWidth: 720,
          }}>
            La misma estructura constructiva — cuatro niveles, 14 m, 1,045 m² —
            soporta dos modelos de negocio completamente distintos. Elige tu perfil
            de comprador y mira las cifras.
          </div>
        </div>

        {/* Tab selector */}
        <div style={{
          display: 'flex', gap: 0, marginBottom: 56,
          borderBottom: `1px solid rgba(201,169,97,0.18)`,
        }}>
          {[
            { id: 'med', label: 'Track A', sub: 'Torre Médica', color: L_PALETTE.teal },
            { id: 'resi', label: 'Track B', sub: 'Residencias',  color: L_PALETTE.gold },
          ].map(tab => {
            const active = mode === tab.id;
            return (
              <button key={tab.id} onClick={() => setMode(tab.id)}
                style={{
                  flex: 1, padding: '24px 0',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  borderBottom: active ? `2px solid ${tab.color}` : `2px solid transparent`,
                  textAlign: 'left',
                  transition: 'all 200ms',
                  opacity: active ? 1 : 0.55,
                }}>
                <div style={{
                  fontFamily: L_MONO, color: tab.color, fontSize: 13,
                  letterSpacing: '0.35em',
                }}>{tab.label.toUpperCase()}</div>
                <div style={{
                  marginTop: 8,
                  fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 30,
                }}>{tab.sub}</div>
              </button>
            );
          })}
        </div>

        {/* Main grid: building viz + content */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'stretch',
        }}>
          {/* LEFT — sticky building */}
          <div style={{ position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
            <div style={{
              position: 'relative',
              border: `1px solid ${accent}33`,
              background: '#0A1538',
              aspectRatio: '700 / 800',
            }}>
              <L_Building progress={buildT} mode={mode}/>

              {/* progress indicator */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20, right: 20,
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  flex: 1, height: 2,
                  background: 'rgba(201,169,97,0.18)',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0,
                    width: `${buildT * 100}%`, height: '100%',
                    background: accent,
                    transition: 'width 60ms',
                  }}/>
                </div>
                <div style={{
                  fontFamily: L_MONO, color: accent, fontSize: 11,
                  letterSpacing: '0.25em',
                }}>{Math.round(buildT * 100)}%</div>
              </div>
            </div>
          </div>

          {/* RIGHT — content */}
          <div>
            <div style={{
              fontFamily: L_MONO, color: accent, fontSize: 12,
              letterSpacing: '0.4em', marginBottom: 18,
              transition: 'color 300ms',
            }}>{DATA.badge.toUpperCase()}</div>
            <div style={{
              fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 56,
              lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>{DATA.title}</div>
            <div style={{
              marginTop: 28,
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: L_PALETTE.ice, fontSize: 22, lineHeight: 1.55,
              maxWidth: 600,
            }}>{DATA.sub}</div>

            {/* KPIs */}
            <div style={{
              marginTop: 56,
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 0,
              border: `1px solid rgba(201,169,97,0.15)`,
            }}>
              {DATA.kpis.map((k, i) => (
                <div key={i} style={{
                  padding: '30px 28px',
                  borderRight: i % 2 === 0 ? `1px solid rgba(201,169,97,0.12)` : 'none',
                  borderBottom: i < 2 ? `1px solid rgba(201,169,97,0.12)` : 'none',
                }}>
                  <div style={{
                    fontFamily: L_SERIF, color: accent, fontSize: 48, lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    transition: 'color 300ms',
                  }}>{k.v}</div>
                  <div style={{
                    marginTop: 12,
                    fontFamily: L_SANS, fontWeight: 700,
                    color: 'rgba(245,241,232,0.7)',
                    fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
                  }}>{k.l}</div>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <ul style={{
              marginTop: 56, padding: 0, listStyle: 'none',
            }}>
              {DATA.bullets.map((b, i) => (
                <li key={i} style={{
                  display: 'flex', gap: 16,
                  padding: '14px 0',
                  borderBottom: `1px solid rgba(202,220,252,0.08)`,
                  fontFamily: L_SERIF, fontSize: 18, color: L_PALETTE.ice,
                  lineHeight: 1.5,
                }}>
                  <span style={{
                    color: accent, transition: 'color 300ms',
                    fontFamily: L_MONO, fontSize: 12, lineHeight: 2.2,
                  }}>0{i + 1}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Bottom CTA — pro-forma bajo LOI */}
            <a href="#contacto" style={{
              marginTop: 48,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 28px',
              background: `${accent}0F`,
              border: `1px solid ${accent}66`,
              borderLeft: `3px solid ${accent}`,
              fontFamily: L_MONO, color: L_PALETTE.ivory, fontSize: 14,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 200ms',
            }}>
              <span>{DATA.formula}</span>
              <span style={{ color: accent }}>→</span>
            </a>
          </div>
        </div>

        {/* Section-wide disclaimer — anchors the "no projected returns" framing */}
        <div style={{
          marginTop: 80,
          padding: '24px 28px',
          borderLeft: `2px solid rgba(201,169,97,0.5)`,
          background: 'rgba(201,169,97,0.04)',
          fontFamily: L_SERIF, fontStyle: 'italic',
          color: 'rgba(202,220,252,0.78)', fontSize: 15, lineHeight: 1.6,
          maxWidth: 1100,
        }}>
          <strong style={{
            color: L_PALETTE.gold, fontStyle: 'normal',
            fontFamily: L_SANS, fontWeight: 800, fontSize: 10,
            letterSpacing: '0.4em', textTransform: 'uppercase',
            display: 'block', marginBottom: 10,
          }}>NOTA · DATOS DE MERCADO</strong>
          Las cifras mostradas (rentas en zona, plusvalía, precios comparables) provienen de fuentes
          públicas verificables. No constituyen proyecciones de rendimiento del propietario.
          El rendimiento real del proyecto depende de la ejecución del comprador-desarrollador,
          condiciones de obra y de mercado al momento de operación o venta. Pro-forma indicativa
          completa disponible bajo LOI (Carta de Intención).
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { L_Rutas, L_Building });
