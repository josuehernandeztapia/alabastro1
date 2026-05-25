// landing-content.jsx — Sections 2-7: Statement, Predio, Mapa, Rutas, Expediente, Mercado

// ── S2 — Statement sticky ───────────────────────────────────────────────────
function L_Statement() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.2) / 0.5)));
  const lineW = Easing.easeInOutCubic(Math.max(0, Math.min(1, (t - 0.4) / 0.4)));

  return (
    <section ref={ref} data-screen-label="02 Statement" style={{
      background: L_PALETTE.ink,
      padding: '200px 96px',
      color: L_PALETTE.ivory,
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: 48,
      }}>
        <div style={{
          fontFamily: L_SANS, fontWeight: 800,
          color: L_PALETTE.gold, fontSize: 13,
          letterSpacing: '0.45em', textTransform: 'uppercase',
          opacity: ease,
        }}>La tesis</div>

        <div style={{
          fontFamily: L_SERIF,
          fontSize: 'clamp(56px, 7vw, 120px)',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: L_PALETTE.ivory,
          opacity: ease,
          transform: `translateY(${(1 - ease) * 28}px)`,
        }}>
          Una propiedad.
          <br/>
          <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>
            Dos formas de generar valor.
          </em>
        </div>

        <div style={{
          width: `${lineW * 100}%`, maxWidth: 600,
          height: 1, background: L_PALETTE.gold,
          opacity: 0.55,
        }}/>

        <div style={{
          fontFamily: L_SERIF, fontStyle: 'italic',
          fontSize: 'clamp(20px, 1.6vw, 28px)',
          lineHeight: 1.55,
          color: L_PALETTE.ice,
          maxWidth: 820,
          opacity: ease,
        }}>
          Un predio de 447 m² en el corazón de Milenio III, con uso de suelo H3
          que permite tanto vivienda vertical como consultorios médicos. Dictamen
          explícito. Cuatro accesos oficiales emitidos. Paquete documental completo —
          listo para que el comprador entre directo a proyecto ejecutivo.
        </div>
      </div>
    </section>
  );
}

// ── S3 — El Predio ──────────────────────────────────────────────────────────
function L_Predio() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const reveal = (d, s = 0.4) => Easing.easeOutCubic(Math.max(0, Math.min(1, (t - d) / s)));

  return (
    <section ref={ref} id="predio" data-screen-label="03 Predio" style={{
      background: L_PALETTE.ivory,
      color: L_PALETTE.navy,
      padding: '180px 96px 200px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr',
          gap: 80, alignItems: 'end', marginBottom: 80,
        }}>
          <div style={{ opacity: reveal(0.15) }}>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
              letterSpacing: '0.4em', marginBottom: 22,
            }}>III.</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(48px, 5.5vw, 88px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}>
              El predio<br/>
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>que ves.</em>
            </h2>
          </div>
          <div style={{
            opacity: reveal(0.25),
            fontFamily: L_SERIF, fontStyle: 'italic',
            color: 'rgba(15,30,71,0.7)',
            fontSize: 22, lineHeight: 1.6,
            maxWidth: 720,
          }}>
            Tomas reales del terreno. Adoquín original, palmeras, pendiente natural
            que abre vistas al norte y noroeste. La torre vertical operando atrás
            es evidencia de la densificación ya en marcha.
          </div>
        </div>

        {/* Photo grid · row 1 — the 2 close-up shots of the predio */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr',
          gap: 28, marginBottom: 28,
        }}>
          <div style={{
            opacity: reveal(0.3),
            transform: `translateY(${(1 - reveal(0.3)) * 40}px)`,
          }}>
            <div style={{
              aspectRatio: '4 / 3', overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(15,30,71,0.18)',
            }}>
              <img src="assets/foto_terreno_principal.jpg"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt=""/>
            </div>
            <div style={{
              marginTop: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: L_SERIF, fontStyle: 'italic', color: L_PALETTE.navy,
                fontSize: 18,
              }}>Interior · cara norte</div>
              <div style={{
                fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 11,
                letterSpacing: '0.25em',
              }}>01 / 05</div>
            </div>
          </div>

          <div style={{
            opacity: reveal(0.4),
            transform: `translateY(${(1 - reveal(0.4)) * 40}px)`,
          }}>
            <div style={{
              aspectRatio: '4 / 3', overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(15,30,71,0.18)',
            }}>
              <img src="assets/foto_terreno_torre_al_fondo.jpg"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt=""/>
            </div>
            <div style={{
              marginTop: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: L_SERIF, fontStyle: 'italic', color: L_PALETTE.navy,
                fontSize: 18,
              }}>Lateral · torre operando atrás</div>
              <div style={{
                fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 11,
                letterSpacing: '0.25em',
              }}>02 / 05</div>
            </div>
          </div>
        </div>

        {/* Photo grid · row 2 — the 3 vista shots that prove the N/NO panorama */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20, marginBottom: 100,
        }}>
          {[
            { src: 'assets/vista-01-panoramica.jpeg', cap: 'Vista al cerro · noreste',    n: '03 / 05' },
            { src: 'assets/vista-02-skyline.jpeg',    cap: 'Skyline · torres B. Quintana', n: '04 / 05' },
            { src: 'assets/vista-03-cerro.jpeg',      cap: 'Horizonte abierto · noroeste', n: '05 / 05' },
          ].map((p, i) => (
            <div key={i} style={{
              opacity: reveal(0.5 + i * 0.06),
              transform: `translateY(${(1 - reveal(0.5 + i * 0.06)) * 30}px)`,
            }}>
              <div style={{
                aspectRatio: '4 / 3', overflow: 'hidden',
                boxShadow: '0 24px 50px rgba(15,30,71,0.14)',
              }}>
                <img src={p.src}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt=""/>
              </div>
              <div style={{
                marginTop: 14,
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
                <div style={{
                  fontFamily: L_SERIF, fontStyle: 'italic', color: L_PALETTE.navy,
                  fontSize: 15,
                }}>{p.cap}</div>
                <div style={{
                  fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 10,
                  letterSpacing: '0.25em',
                }}>{p.n}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Ficha técnica — institutional */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 0,
          borderTop: `1px solid ${L_PALETTE.rule}`,
          borderBottom: `1px solid ${L_PALETTE.rule}`,
        }}>
          {[
            { v: '447.22', u: 'm²', l: 'Superficie' },
            { v: 'H3', u: 'Tipo B', l: 'Uso de suelo' },
            { v: '1 + 3', u: 'N. Of.', l: 'Acceso + interiores' },
            { v: '5 m', u: 'roca', l: 'Manto rocoso' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '40px 28px',
              borderRight: i < 3 ? `1px solid ${L_PALETTE.rule}` : 'none',
              opacity: reveal(0.5 + i * 0.08),
            }}>
              <div style={{
                fontFamily: L_SERIF, color: L_PALETTE.navy,
                fontSize: 56, lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}>{s.v}</div>
              <div style={{
                marginTop: 8,
                fontFamily: L_SERIF, fontStyle: 'italic',
                color: L_PALETTE.gold, fontSize: 18,
              }}>{s.u}</div>
              <div style={{
                marginTop: 16,
                fontFamily: L_SANS, fontWeight: 700, color: 'rgba(15,30,71,0.65)',
                fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
              }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Data block */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, marginTop: 80,
          opacity: reveal(0.7),
        }}>
          <div>
            <div style={{
              fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
              fontSize: 11, letterSpacing: '0.4em', marginBottom: 20,
            }}>UBICACIÓN</div>
            <div style={{
              fontFamily: L_SERIF, fontSize: 22, lineHeight: 1.55, color: L_PALETTE.navy,
            }}>
              Sendero del Alabastro 1<br/>
              Lote 14, Manzana V, Sección 1, Fase A<br/>
              Fracc. Milenio III · Querétaro · CP 76060
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
              fontSize: 11, letterSpacing: '0.4em', marginBottom: 20,
            }}>DATOS REGISTRALES</div>
            <div style={{
              fontFamily: L_MONO, fontSize: 15, lineHeight: 1.9, color: L_PALETTE.navy,
              letterSpacing: '0.04em',
            }}>
              <div>Folio Real · <strong>360920</strong></div>
              <div>Escritura Pública · <strong>9,668</strong></div>
              <div>Clave catastral · <strong>140100116081070</strong></div>
              <div>Coordenadas · <a href="https://www.google.com/maps/place/20%C2%B035'58.2%22N+100%C2%B021'50.5%22W/@20.5995052,-100.3666024,926m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d20.5995052!4d-100.3640275!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener" style={{ color: L_PALETTE.navy, textDecoration: 'underline', textDecorationColor: 'rgba(201,169,97,0.5)', textUnderlineOffset: 3 }}><strong>20°35'57.9"N · 100°21'50.9"W ↗</strong></a></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── S4 — Mapa interactivo ───────────────────────────────────────────────────
function L_Map() {
  const ref = React.useRef(null);
  const seen = useRevealOnce(ref);
  const t = useInView(ref);
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.15) / 0.5)));
  const drawT = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.25) / 0.6)));
  const [hovered, setHovered] = React.useState(null);
  const [pulse, setPulse] = React.useState(0);

  React.useEffect(() => {
    if (!seen) return;
    let raf, start = performance.now();
    const tick = (now) => {
      setPulse(((now - start) / 1500) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen]);

  const [view, setView] = React.useState('microzona'); // 'microzona' | 'poligono'

  const landmarks = [
    { id: 'm1',    x: 720, y: 380, label: 'Torre Momentum I',   sub: '200 m · médico',     dist: '200 m', tag: 'med' },
    { id: 'm3',    x: 800, y: 460, label: 'Torre Momentum III', sub: '350 m · médico',     dist: '350 m', tag: 'med' },
    { id: 'm5',    x: 870, y: 540, label: 'Torre Momentum V',   sub: '500 m · médico',     dist: '500 m', tag: 'med' },
    { id: 'lab',   x: 280, y: 540, label: 'Lab Corregidora',    sub: '300 m · análisis',   dist: '300 m', tag: 'med' },
    { id: 'iml',   x: 340, y: 620, label: 'Laboratorio IML',    sub: '300 m · análisis',   dist: '300 m', tag: 'med' },
    { id: 'arcos', x: 180, y: 280, label: 'Calz. de los Arcos', sub: '500 m · vialidad',   dist: '500 m', tag: 'road' },
    { id: 'bq',    x: 730, y: 220, label: 'Av. Bernardo Quintana', sub: '1 km · arteria',  dist: '1 km',  tag: 'road' },
    { id: 'hist',  x: 200, y: 180, label: 'Centro Histórico',   sub: '1.2 km · UNESCO',    dist: '1.2 km', tag: 'amenity' },
  ];

  const pinX = 510, pinY = 460;

  return (
    <section ref={ref} data-screen-label="04 Mapa" style={{
      background: L_PALETTE.ink,
      color: L_PALETTE.ivory,
      padding: '180px 96px 200px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: 80, alignItems: 'end', marginBottom: 80,
        }}>
          <div style={{ opacity: ease }}>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
              letterSpacing: '0.4em', marginBottom: 22,
            }}>VI.</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(48px, 5.5vw, 88px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
              color: L_PALETTE.ivory,
            }}>
              No es una zona<br/>
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>en desarrollo.</em><br/>
              Es una zona <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>consolidada.</em>
            </h2>
          </div>
          <div style={{
            opacity: ease,
            fontFamily: L_SERIF, fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.6,
            color: L_PALETTE.ice,
            maxWidth: 720,
          }}>
            Tres torres médicas ya operando a menos de 700 metros. Dos laboratorios
            clínicos a 300 m. Calzada de los Arcos a 500 m. Centro Histórico —
            Patrimonio UNESCO — a 1.2 km. El predio no inaugura nada; entra a
            una microzona donde la demanda ya está validada.
          </div>
        </div>

        {/* View toggle + Google Maps link */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 32, gap: 24, flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'flex-start', gap: 4,
            background: 'rgba(15,30,71,0.5)',
            padding: 6,
            border: `1px solid ${L_PALETTE.gold}33`,
            borderRadius: 999,
          }}>
            {[
              { id: 'microzona', label: 'Microzona', sub: 'corredor médico + landmarks' },
              { id: 'poligono', label: 'El polígono', sub: 'colindancias + medidas' },
            ].map(v => (
              <button key={v.id} onClick={() => setView(v.id)}
                style={{
                  padding: '12px 22px',
                  background: view === v.id ? L_PALETTE.gold : 'transparent',
                  color: view === v.id ? L_PALETTE.ink : L_PALETTE.ivory,
                  border: 'none', cursor: 'pointer', borderRadius: 999,
                  fontFamily: L_SANS, fontWeight: 700, fontSize: 11,
                  letterSpacing: '0.32em', textTransform: 'uppercase',
                  transition: 'all 220ms',
                }}>{v.label}</button>
            ))}
          </div>

          <a href="https://www.google.com/maps/place/20%C2%B035'58.2%22N+100%C2%B021'50.5%22W/@20.5995052,-100.3666024,926m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d20.5995052!4d-100.3640275!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" rel="noopener"
            style={{
              padding: '12px 22px',
              background: 'transparent',
              color: L_PALETTE.gold,
              border: `1px solid ${L_PALETTE.gold}`,
              borderRadius: 999,
              fontFamily: L_MONO, fontSize: 11,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 220ms',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
            Ver vista satelital
            <span style={{ fontSize: 12 }}>↗</span>
          </a>
        </div>

        {view === 'poligono' && window.L_PolygonView && <window.L_PolygonView/>}

        {view === 'microzona' && (
        <>
        {/* Map + sidebar */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr',
          gap: 48, alignItems: 'flex-start',
        }}>
          {/* MAP */}
          <div style={{
            position: 'relative',
            aspectRatio: '1080 / 900',
            background: '#0A1538',
            border: `1px solid ${L_PALETTE.gold}33`,
            overflow: 'hidden',
          }}>
            <svg width="100%" height="100%" viewBox="0 0 1080 900"
              style={{ position: 'absolute', inset: 0, display: 'block' }}>
              <defs>
                <pattern id="lgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={L_PALETTE.gold} strokeWidth="0.4" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="1080" height="900" fill="url(#lgrid)"/>

              {/* Roads */}
              <path d="M 0 280 Q 280 270, 540 310 T 1080 360"
                fill="none" stroke={L_PALETTE.ivory} strokeWidth="34" opacity="0.05"/>
              <path d="M 730 0 Q 740 280, 600 460 T 540 900"
                fill="none" stroke={L_PALETTE.ivory} strokeWidth="32" opacity="0.05"/>
              <path d="M 0 700 Q 280 680, 540 720 T 1080 760"
                fill="none" stroke={L_PALETTE.ivory} strokeWidth="28" opacity="0.04"/>

              {/* Connection lines */}
              {landmarks.map((l, i) => {
                const lineT = Math.max(0, Math.min(1, drawT * landmarks.length - i));
                const isHover = hovered === l.id;
                return (
                  <g key={l.id} opacity={lineT}>
                    <line x1={pinX} y1={pinY}
                      x2={pinX + (l.x - pinX) * lineT} y2={pinY + (l.y - pinY) * lineT}
                      stroke={L_PALETTE.gold}
                      strokeWidth={isHover ? 2 : 1.2}
                      strokeDasharray="4 6" opacity={isHover ? 1 : 0.65}/>
                    {lineT > 0.95 && (
                      <g style={{ cursor: 'pointer' }}
                         onMouseEnter={() => setHovered(l.id)}
                         onMouseLeave={() => setHovered(null)}>
                        <circle cx={l.x} cy={l.y} r={isHover ? 14 : 9}
                          fill={l.tag === 'med' ? L_PALETTE.teal : (l.tag === 'amenity' ? L_PALETTE.gold : L_PALETTE.ivory)}
                          stroke={L_PALETTE.gold} strokeWidth="2"
                          style={{ transition: 'r 200ms' }}/>
                        <circle cx={l.x} cy={l.y} r="24"
                          fill="transparent"
                          style={{ pointerEvents: 'auto' }}/>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Pulse rings on predio pin */}
              <circle cx={pinX} cy={pinY} r={50 + pulse * 70} fill="none"
                stroke={L_PALETTE.gold} strokeWidth="2" opacity={(1 - pulse) * 0.7}/>
              <circle cx={pinX} cy={pinY} r={50 + ((pulse + 0.5) % 1) * 70} fill="none"
                stroke={L_PALETTE.gold} strokeWidth="2" opacity={(1 - ((pulse + 0.5) % 1)) * 0.5}/>

              {/* Predio pin */}
              <circle cx={pinX} cy={pinY} r="32" fill={L_PALETTE.ink} stroke={L_PALETTE.gold} strokeWidth="3"/>
              <circle cx={pinX} cy={pinY} r="12" fill={L_PALETTE.gold}/>
            </svg>

            {/* Predio label */}
            <div style={{
              position: 'absolute',
              left: `${(pinX + 50) / 1080 * 100}%`,
              top: `${(pinY - 28) / 900 * 100}%`,
              pointerEvents: 'none',
            }}>
              <div style={{
                fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
                fontSize: 13, letterSpacing: '0.32em',
              }}>ALABASTRO 1</div>
              <div style={{
                fontFamily: L_SERIF, fontStyle: 'italic', color: L_PALETTE.ivory,
                fontSize: 14, marginTop: 4,
              }}>447 m² · H3</div>
            </div>

            {/* Landmark hover tooltip */}
            {hovered && (() => {
              const l = landmarks.find(x => x.id === hovered);
              if (!l) return null;
              const isRight = l.x > 540;
              return (
                <div style={{
                  position: 'absolute',
                  left: isRight ? 'auto' : `${(l.x + 24) / 1080 * 100}%`,
                  right: isRight ? `${(1080 - l.x + 24) / 1080 * 100}%` : 'auto',
                  top: `${(l.y - 38) / 900 * 100}%`,
                  pointerEvents: 'none',
                  background: 'rgba(7,14,39,0.92)',
                  border: `1px solid ${L_PALETTE.gold}66`,
                  padding: '10px 14px',
                  backdropFilter: 'blur(6px)',
                }}>
                  <div style={{ fontFamily: L_SANS, fontWeight: 700, color: L_PALETTE.ivory, fontSize: 14 }}>{l.label}</div>
                  <div style={{ fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 11, letterSpacing: '0.18em', marginTop: 4 }}>{l.sub}</div>
                </div>
              );
            })()}

            {/* Legend */}
            <div style={{
              position: 'absolute', top: 24, right: 24,
              background: 'rgba(7,14,39,0.7)',
              border: `1px solid ${L_PALETTE.gold}33`,
              padding: '14px 18px',
              fontFamily: L_MONO, fontSize: 11,
              letterSpacing: '0.18em', color: L_PALETTE.ice,
              backdropFilter: 'blur(6px)',
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: L_PALETTE.teal }}/> CORREDOR MÉDICO
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: L_PALETTE.ivory }}/> VIALIDADES
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: L_PALETTE.gold }}/> AMENIDAD
              </div>
            </div>
          </div>

          {/* Sidebar list */}
          <div>
            <div style={{
              fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
              fontSize: 11, letterSpacing: '0.4em', marginBottom: 24,
            }}>DISTANCIAS CLAVE</div>
            {landmarks.map(l => {
              const isHover = hovered === l.id;
              return (
                <div key={l.id}
                  onMouseEnter={() => setHovered(l.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    padding: '18px 0',
                    borderBottom: `1px solid rgba(201,169,97,${isHover ? 0.5 : 0.15})`,
                    cursor: 'pointer',
                    background: isHover ? 'rgba(201,169,97,0.04)' : 'transparent',
                    transition: 'all 180ms',
                }}>
                  <div>
                    <div style={{
                      fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 20,
                    }}>{l.label}</div>
                    <div style={{
                      fontFamily: L_MONO, color: 'rgba(202,220,252,0.6)',
                      fontSize: 11, letterSpacing: '0.2em', marginTop: 4,
                      textTransform: 'uppercase',
                    }}>{l.sub}</div>
                  </div>
                  <div style={{
                    fontFamily: L_SERIF, color: l.tag === 'med' ? L_PALETTE.teal : L_PALETTE.gold,
                    fontSize: 22, alignSelf: 'center',
                  }}>{l.dist}</div>
                </div>
              );
            })}
          </div>
        </div>
        </>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { L_Statement, L_Predio, L_Map });
