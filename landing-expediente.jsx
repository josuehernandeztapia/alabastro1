// landing-expediente.jsx — Sections 6 (expediente) + 7 (mercado)

const L_DOCS = [
  // cat, code, title, sub
  [1, 'FOLIO 360920',     'Escritura Pública',           'No. 9,668 · inscrita en RPP · sin gravámenes'],
  [2, 'DICT · TIPO B',    'Dictamen de Uso de Suelo',    'H3 · habitacional, consultorios, laboratorio'],
  [2, 'ALN · MUNI',       'Alineamiento Municipal',      'Sendero del Alabastro 1, Lote 14'],
  [2, 'N.OF. 1·1A·1B·1C', 'Cuatro Números Oficiales',    '1 exterior + 3 interiores · habilita régimen de condominio'],
  [3, 'CFE · 2025',       'Factibilidad CFE',            'Suministro eléctrico confirmado'],
  [3, 'CEA · 2025',       'Factibilidad CEA',            'Agua + drenaje · servicios confirmados'],
  [4, 'MS-2024',          'Mecánica de Suelos',          'Manto rocoso a 5 m · cimentación somera'],
  [4, 'TOPO-2024',        'Levantamiento Topográfico',   'Planimetría completa'],
  [5, 'ML-ARQ · MLA',     'Anteproyecto Arquitectónico', '3 unidades verticales · cuadro de áreas'],
  [6, 'PERIM',            'Malla Ciclónica + Limpieza',  'Perímetro completo'],
  [6, 'PREDIAL',          'Predial al corriente',        '2026 · vigente'],
];

const L_CATEGORIES = [
  { idx: 1, name: 'Documentación Legal' },
  { idx: 2, name: 'Trámites Municipales' },
  { idx: 3, name: 'Factibilidades' },
  { idx: 4, name: 'Estudios Técnicos' },
  { idx: 5, name: 'Trabajo Arquitectónico' },
  { idx: 6, name: 'Estado del Predio' },
];

const L_PENDING = [
  ['Licencia de Construcción', 'A cargo del comprador'],
  ['Régimen de Condominio',    'Declaratoria'],
  ['Protección Civil',         'Dictamen previo'],
];

function L_DocTick({ active, accent = L_PALETTE.gold, size = 36 }) {
  // Animated circle + checkmark
  const stroke = active ? accent : 'rgba(201,169,97,0.25)';
  const checkO = active ? 1 : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="18" cy="18" r="16" fill="none" stroke={stroke} strokeWidth="1.5"/>
      <path d="M 10 18 L 16 24 L 26 12" fill="none"
        stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        opacity={checkO}
        style={{ transition: 'opacity 320ms' }}/>
    </svg>
  );
}

function L_Expediente() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const vp = useViewport();
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.1) / 0.4)));
  // How many docs are sealed
  // Docs reveal between t = 0.25 and t = 0.85
  const sealRange = Math.max(0, Math.min(1, (t - 0.25) / 0.6));
  const placed = Math.floor(sealRange * (L_DOCS.length + 0.5));

  // category completion
  const catProgress = {};
  for (let c = 1; c <= 6; c++) {
    const inCat = L_DOCS.filter(d => d[0] === c).length;
    const inCatPlaced = L_DOCS.slice(0, placed).filter(d => d[0] === c).length;
    catProgress[c] = inCat > 0 ? inCatPlaced / inCat : 0;
  }

  return (
    <section ref={ref} data-screen-label="06 Expediente" style={{
      background: L_PALETTE.ivory,
      color: L_PALETTE.navy,
      padding: `${vp.padY}px ${vp.padX}px ${vp.padY + 20}px`,
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 1.6fr'),
          gap: vp.mobile ? 32 : 80, alignItems: 'end', marginBottom: vp.mobile ? 48 : 80,
          opacity: ease,
        }}>
          <div>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
              letterSpacing: '0.4em', marginBottom: 22,
            }}>VIII.</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(48px, 5.5vw, 88px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>
              El <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>expediente.</em>
            </h2>
          </div>
          <div style={{
            fontFamily: L_SERIF, fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.6,
            color: 'rgba(15,30,71,0.75)',
            maxWidth: 760,
          }}>
            Once trámites ya realizados, agrupados en seis categorías. Cada documento
            es tiempo y dinero que el comprador no gasta. El paquete completo se entrega
            al cierre, físico y digital, bajo LOI (Carta de Intención).
          </div>
        </div>

        {/* Top stat strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('repeat(2, 1fr)', '1fr 1fr 1fr'),
          gap: 0,
          borderTop: `1px solid ${L_PALETTE.rule}`,
          borderBottom: `1px solid ${L_PALETTE.rule}`,
          marginBottom: 96,
        }}>
          {[
            { v: '6', l: 'Categorías', sub: 'cubiertas' },
            { v: '11 / 14', l: 'Trámites', sub: 'realizados' },
            { v: '9 – 12 meses', l: 'De avance documental', sub: 'ya ejecutados' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '40px 28px',
              borderRight: i < 2 ? `1px solid ${L_PALETTE.rule}` : 'none',
              opacity: ease,
            }}>
              <div style={{
                fontFamily: L_SERIF, fontSize: 64, color: L_PALETTE.gold,
                lineHeight: 1.0, letterSpacing: '-0.02em',
              }}>{s.v}</div>
              <div style={{
                marginTop: 14,
                fontFamily: L_SANS, fontWeight: 700, color: L_PALETTE.navy,
                fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase',
              }}>{s.l}</div>
              <div style={{
                marginTop: 4,
                fontFamily: L_SERIF, fontStyle: 'italic',
                color: 'rgba(15,30,71,0.55)', fontSize: 16,
              }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Two columns: category checklist + docs grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 2fr'),
          gap: vp.mobile ? 32 : 64,
        }}>
          {/* Category checklist — sticky */}
          <div style={{
            position: vp.mobile ? 'static' : 'sticky', top: 100, alignSelf: 'flex-start',
            background: L_PALETTE.ivory, zIndex: 2,
            paddingRight: vp.mobile ? 0 : 24,
          }}>
            <div style={{
              fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
              fontSize: 11, letterSpacing: '0.4em', marginBottom: 20,
            }}>SEIS CATEGORÍAS</div>
            {L_CATEGORIES.map(c => {
              const p = catProgress[c.idx] || 0;
              const done = p >= 0.99;
              return (
                <div key={c.idx} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 0',
                  borderBottom: `1px solid ${done ? L_PALETTE.gold : L_PALETTE.rule}`,
                  opacity: p > 0 ? 1 : 0.4,
                  transition: 'opacity 300ms',
                }}>
                  <L_DocTick active={done} size={28}/>
                  <div style={{
                    fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 12,
                    letterSpacing: '0.2em', width: 28, flexShrink: 0,
                  }}>{String(c.idx).padStart(2, '0')}</div>
                  <div style={{
                    fontFamily: L_SERIF, color: L_PALETTE.navy,
                    fontSize: 20,
                  }}>{c.name}</div>
                </div>
              );
            })}
          </div>

          {/* Doc cards grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 1fr'),
            gap: 16,
          }}>
            {L_DOCS.map(([cat, code, title, sub], i) => {
              const isActive = i < placed;
              return (
                <div key={i} style={{
                  padding: '24px 26px',
                  background: '#FFFFFF',
                  border: `1px solid ${isActive ? L_PALETTE.navy : L_PALETTE.rule}`,
                  borderTop: `4px solid ${isActive ? L_PALETTE.navy : 'rgba(15,30,71,0.15)'}`,
                  position: 'relative',
                  transition: 'all 320ms',
                  opacity: isActive ? 1 : 0.5,
                  boxShadow: isActive ? '0 12px 24px rgba(15,30,71,0.12)' : 'none',
                  transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    fontFamily: L_MONO, fontSize: 11, color: L_PALETTE.gold,
                    letterSpacing: '0.18em',
                  }}>
                    <span>{code}</span>
                    <span>CAT {String(cat).padStart(2, '0')}</span>
                  </div>
                  <div style={{
                    marginTop: 18,
                    fontFamily: L_SERIF, color: L_PALETTE.navy, fontSize: 22,
                    lineHeight: 1.15, letterSpacing: '-0.01em',
                  }}>{title}</div>
                  <div style={{
                    marginTop: 8,
                    fontFamily: L_SANS, color: 'rgba(15,30,71,0.6)', fontSize: 13,
                    lineHeight: 1.45,
                  }}>{sub}</div>
                  {/* Stamp */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', right: 20, bottom: 18,
                      width: 50, height: 50,
                      border: `2px solid ${L_PALETTE.gold}`,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: L_SERIF, color: L_PALETTE.gold, fontSize: 13,
                      transform: 'rotate(-12deg)',
                      letterSpacing: '0.05em',
                    }}>OK</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence block — peñasco rocoso · supports the Mecánica de Suelos finding */}
        <div style={{
          marginTop: 80,
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1.4fr 1fr'),
          gap: 0,
          background: L_PALETTE.navy,
          color: L_PALETTE.ivory,
          opacity: ease,
        }}>
          {/* Photo */}
          <div style={{
            aspectRatio: '4 / 3',
            overflow: 'hidden',
            background: L_PALETTE.ink,
          }}>
            <img src="assets/roca-02-letrero.jpeg" alt="Peñasco rocoso al pie del letrero Sendero del Alabastro"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: '50% 60%',
                display: 'block',
              }}/>
          </div>

          {/* Annotation */}
          <div style={{
            padding: '48px 48px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
              fontSize: 11, letterSpacing: '0.4em', marginBottom: 18,
            }}>EVIDENCIA EN SITIO</div>

            <div style={{
              fontFamily: L_SERIF, color: L_PALETTE.ivory,
              fontSize: 'clamp(36px, 3.2vw, 52px)',
              lineHeight: 1.05, letterSpacing: '-0.02em',
            }}>
              La prueba está{' '}
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>a la vista.</em>
            </div>

            <div style={{
              marginTop: 28,
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: L_PALETTE.ice, fontSize: 18, lineHeight: 1.55,
            }}>
              Peñasco rocoso aflorando a flor de tierra en la propia calle, junto al
              letrero del fraccionamiento. La mecánica de suelos confirma manto rocoso
              a 5 m de profundidad bajo el predio — cimentación somera, menor costo
              de obra y cronograma más corto.
            </div>

            <div style={{
              marginTop: 36,
              paddingTop: 22,
              borderTop: `1px solid rgba(201,169,97,0.25)`,
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}>
              <div>
                <div style={{
                  fontFamily: L_SERIF, color: L_PALETTE.gold, fontSize: 36,
                  lineHeight: 1.0, letterSpacing: '-0.02em',
                }}>5 m</div>
                <div style={{
                  marginTop: 10,
                  fontFamily: L_SANS, fontWeight: 700, color: 'rgba(245,241,232,0.65)',
                  fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
                }}>Manto rocoso</div>
              </div>
              <div>
                <div style={{
                  fontFamily: L_SERIF, color: L_PALETTE.gold, fontSize: 36,
                  lineHeight: 1.0, letterSpacing: '-0.02em',
                }}>Somera</div>
                <div style={{
                  marginTop: 10,
                  fontFamily: L_SANS, fontWeight: 700, color: 'rgba(245,241,232,0.65)',
                  fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
                }}>Cimentación</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending docs */}
        <div style={{
          marginTop: 100,
          padding: '40px 0',
          borderTop: `1px solid ${L_PALETTE.rule}`,
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 2fr'),
            gap: vp.mobile ? 32 : 64, alignItems: 'flex-start',
          }}>
            <div>
              <div style={{
                fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.goldDk,
                fontSize: 11, letterSpacing: '0.4em', marginBottom: 14,
              }}>PENDIENTE PARA INICIAR OBRA</div>
              <div style={{
                fontFamily: L_SERIF, color: L_PALETTE.navy, fontSize: 30,
                lineHeight: 1.15, letterSpacing: '-0.01em',
              }}>A cargo del{' '}
                <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>comprador.</em>
              </div>
              <div style={{
                marginTop: 18,
                fontFamily: L_SERIF, fontStyle: 'italic',
                color: 'rgba(15,30,71,0.65)', fontSize: 16, lineHeight: 1.55,
              }}>
                Trámites estándar municipales · costo estimado ≈ $165 K MXN. El paquete
                documental completo se entrega al cierre.
              </div>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 1fr 1fr'), gap: 16,
            }}>
              {L_PENDING.map(([t, sub], i) => (
                <div key={i} style={{
                  padding: '24px 26px',
                  background: '#FFFFFF',
                  border: `1px dashed ${L_PALETTE.goldDk}66`,
                  borderTop: `4px solid ${L_PALETTE.goldDk}`,
                }}>
                  <div style={{
                    fontFamily: L_MONO, color: L_PALETTE.goldDk, fontSize: 10,
                    letterSpacing: '0.3em',
                  }}>PEND · 0{i + 1}</div>
                  <div style={{
                    marginTop: 14,
                    fontFamily: L_SERIF, color: L_PALETTE.navy, fontSize: 19,
                    lineHeight: 1.2,
                  }}>{t}</div>
                  <div style={{
                    marginTop: 6,
                    fontFamily: L_SANS, color: 'rgba(15,30,71,0.55)', fontSize: 12,
                  }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── S7 — Estudio de mercado ─────────────────────────────────────────────────
function L_Mercado() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const vp = useViewport();
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.15) / 0.4)));
  const barT = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.25) / 0.5)));

  // Bars data — width is $/m² normalized to maxValue
  const ROWS = [
    { label: 'ALABASTRO 1 · con expediente',  v: 6935,  src: 'Precio de oportunidad', kind: 'us' },
    { label: 'Fase A baja · sin trámites',    v: 7392,  src: 'Lamudi',      kind: 'mid' },
    { label: 'Mediana Milenio III · 2026',    v: 8529,  src: 'Spot2.mx',    kind: 'mid' },
    { label: 'Fase A alta',                   v: 8630,  src: 'Lamudi',      kind: 'mid' },
    { label: 'Fase B Sec. 11 · premium',      v: 10235, src: 'Spot2.mx',    kind: 'hi' },
  ];
  const max = 11500;

  return (
    <section ref={ref} data-screen-label="07 Mercado" style={{
      background: L_PALETTE.ink,
      color: L_PALETTE.ivory,
      padding: `${vp.padY}px ${vp.padX}px ${vp.padY + 20}px`,
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 1.6fr'),
          gap: vp.mobile ? 32 : 80, alignItems: 'end', marginBottom: vp.mobile ? 48 : 80,
          opacity: ease,
        }}>
          <div>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
              letterSpacing: '0.4em', marginBottom: 22,
            }}>IX.</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(48px, 5.5vw, 88px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
              color: L_PALETTE.ivory,
            }}>
              Precio{' '}
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>vs. mercado.</em>
            </h2>
          </div>
          <div style={{
            fontFamily: L_SERIF, fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.6,
            color: L_PALETTE.ice,
            maxWidth: 720,
          }}>
            Alabastro 1 se ofrece a <span style={{ color: L_PALETTE.gold, fontStyle: 'normal' }}>$6,935 /m²</span> —
            por debajo de todos los comparables del fraccionamiento, incluyendo el paquete documental
            completo. Diseñado para cierre rápido — el paquete documental acelera la due diligence.
          </div>
        </div>

        {/* Big anchor number */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 2fr'),
          gap: vp.mobile ? 32 : 80, alignItems: 'baseline', marginBottom: 56,
          opacity: ease,
        }}>
          <div>
            <div style={{
              fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
              fontSize: 11, letterSpacing: '0.4em', marginBottom: 14,
            }}>PRECIO DE OPORTUNIDAD</div>
            <div style={{
              fontFamily: L_SERIF, fontSize: 96, lineHeight: 1.0,
              letterSpacing: '-0.03em', color: L_PALETTE.ivory,
            }}>$6,935</div>
            <div style={{
              marginTop: 12,
              fontFamily: L_SERIF, fontStyle: 'italic', color: L_PALETTE.gold, fontSize: 22,
            }}>por metro cuadrado</div>
          </div>
        </div>

        {/* Bars */}
        <div style={{ marginTop: 56 }}>
          {ROWS.map((row, i) => {
            const w = (row.v / max) * 100 * barT;
            const isUs = row.kind === 'us';
            const isHi = row.kind === 'hi';
            const barColor = isUs ? L_PALETTE.gold
              : isHi ? 'rgba(202,220,252,0.45)'
              : 'rgba(202,220,252,0.25)';
            const textColor = isUs ? L_PALETTE.gold : L_PALETTE.ivory;
            return (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: vp.cols('1fr', '320px 1fr 100px 160px'),
                gap: vp.mobile ? 8 : 24, alignItems: 'center',
                padding: '22px 0',
                borderBottom: `1px solid rgba(201,169,97,${isUs ? 0.4 : 0.1})`,
                background: isUs ? 'rgba(201,169,97,0.06)' : 'transparent',
                paddingLeft: isUs ? 16 : 0,
                paddingRight: isUs ? 16 : 0,
                opacity: ease,
              }}>
                <div>
                  <div style={{
                    fontFamily: L_SERIF, color: textColor, fontSize: 19,
                    fontWeight: isUs ? 700 : 400,
                  }}>{row.label}</div>
                  <div style={{
                    fontFamily: L_MONO, color: 'rgba(202,220,252,0.5)',
                    fontSize: 10, letterSpacing: '0.25em', marginTop: 6,
                    textTransform: 'uppercase',
                  }}>{row.src}</div>
                </div>
                <div style={{ position: 'relative', height: isUs ? 18 : 12 }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0,
                    width: `${w}%`, height: '100%',
                    background: barColor,
                    transition: 'width 80ms',
                  }}/>
                </div>
                <div style={{
                  fontFamily: L_SERIF, color: textColor, fontSize: isUs ? 30 : 24,
                  textAlign: 'right',
                  letterSpacing: '-0.01em',
                  fontWeight: isUs ? 700 : 400,
                }}>${row.v.toLocaleString()}</div>
                <div style={{
                  fontFamily: L_MONO, color: isUs ? L_PALETTE.gold : 'rgba(245,241,232,0.4)',
                  fontSize: 11, letterSpacing: '0.18em',
                  textTransform: 'uppercase', textAlign: 'right',
                }}>$ / m²</div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div style={{
          marginTop: 56,
          padding: '32px 36px',
          borderLeft: `2px solid ${L_PALETTE.gold}`,
          background: 'rgba(201,169,97,0.05)',
          fontFamily: L_SERIF, fontStyle: 'italic',
          color: L_PALETTE.ice, fontSize: 20, lineHeight: 1.5,
          maxWidth: 1200,
        }}>
          <strong style={{
            color: L_PALETTE.gold, fontStyle: 'normal',
            fontFamily: L_SANS, fontWeight: 800, fontSize: 11,
            letterSpacing: '0.4em', textTransform: 'uppercase',
            display: 'block', marginBottom: 10,
          }}>LECTURA</strong>
          Comparables sin trámites en zonas equivalentes cierran arriba de $8,500/m².
          Alabastro 1 se ofrece por debajo de todos los comparables — con el paquete documental
          completo ya incluido.
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { L_Expediente, L_Mercado });
