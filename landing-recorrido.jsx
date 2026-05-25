// landing-recorrido.jsx — Section "El recorrido" — private street photo essay

function L_Recorrido() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const vp = useViewport();
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.1) / 0.4)));
  const reveal = (d, s = 0.4) => Easing.easeOutCubic(Math.max(0, Math.min(1, (t - d) / s)));

  // Photo strip — 4 numbered frames + the big anchor
  const FRAMES = [
    { n: '01', src: 'assets/calle-01-portico.jpeg',        cap: 'Acceso' },
    { n: '02', src: 'assets/calle-02-frente-casas.jpeg',   cap: 'Frente' },
    { n: '03', src: 'assets/calle-04-callejon-vista.jpeg', cap: 'Vista al skyline' },
    { n: '04', src: 'assets/calle-05-empedrado.jpeg',      cap: 'Adoquín' },
  ];

  return (
    <section ref={ref} data-screen-label="Recorrido" style={{
      background: L_PALETTE.ivory,
      color: L_PALETTE.navy,
      padding: `${vp.padY}px ${vp.padX}px ${vp.padY + 20}px`,
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 1.6fr'),
          gap: vp.mobile ? 32 : 80, alignItems: 'end', marginBottom: vp.mobile ? 40 : 64,
          opacity: ease,
        }}>
          <div>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
              letterSpacing: '0.4em', marginBottom: 22,
            }}>IV.</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(48px, 5.5vw, 88px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>
              El{' '}
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>recorrido.</em>
            </h2>
          </div>
          <div style={{
            fontFamily: L_SERIF, fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.6,
            color: 'rgba(15,30,71,0.7)',
            maxWidth: 760,
          }}>
            Sendero del Alabastro es una calle privada en forma de circuito — con adoquín,
            terminada en mirador natural sobre la barranca. El predio se ubica
            al final del circuito, donde el frente mira al norte sobre el cañón — zona
            sin posibilidad de construcción vecina que pueda obstruir la vista.
          </div>
        </div>

        {/* Anchor photo — large, panoramic */}
        <div style={{
          width: '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          marginBottom: 48,
          background: L_PALETTE.ink,
          opacity: reveal(0.2),
          transform: `translateY(${(1 - reveal(0.2)) * 30}px)`,
          boxShadow: '0 40px 80px rgba(15,30,71,0.18)',
        }}>
          <img src="assets/calle-03-bajada.jpeg" alt="Bajada de Sendero del Alabastro"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: '50% 60%',
              display: 'block',
            }}/>
        </div>

        {/* Caption + mini-data row under anchor */}
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1.5fr 1fr 1fr 1fr'),
          gap: 0,
          borderTop: `1px solid ${L_PALETTE.rule}`,
          borderBottom: `1px solid ${L_PALETTE.rule}`,
          marginBottom: 80,
          opacity: reveal(0.35),
        }}>
          <div style={{ padding: '30px 32px 30px 0' }}>
            <div style={{
              fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
              fontSize: 11, letterSpacing: '0.4em', marginBottom: 10,
            }}>VISTA PROTEGIDA</div>
            <div style={{
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: 'rgba(15,30,71,0.8)', fontSize: 19, lineHeight: 1.45,
            }}>
              El predio mira al norte sobre la barranca — zona protegida por su
              topografía, sin construcciones colindantes actuales que obstruyan la vista.
            </div>
          </div>
          {[
            { v: 'Circuito',  l: 'Forma de la calle' },
            { v: 'Adoquín', l: 'Pavimentación' },
            { v: 'N / NO',    l: 'Orientación de la vista' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '30px 28px',
              borderLeft: `1px solid ${L_PALETTE.rule}`,
            }}>
              <div style={{
                fontFamily: L_SERIF, color: L_PALETTE.navy, fontSize: 36,
                lineHeight: 1.0, letterSpacing: '-0.02em',
              }}>{s.v}</div>
              <div style={{
                marginTop: 14,
                fontFamily: L_SANS, fontWeight: 700, color: 'rgba(15,30,71,0.55)',
                fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
              }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* 4-frame numbered strip */}
        <div style={{ opacity: reveal(0.5) }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 24,
          }}>
            <div style={{
              fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
              fontSize: 11, letterSpacing: '0.4em',
            }}>CUATRO FRAMES DEL RECORRIDO</div>
            <div style={{
              fontFamily: L_MONO, color: 'rgba(15,30,71,0.45)', fontSize: 11,
              letterSpacing: '0.18em',
            }}>04 / 04 ESCENAS</div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: vp.cols('repeat(2, 1fr)', 'repeat(4, 1fr)'),
            gap: vp.mobile ? 14 : 18,
          }}>
            {FRAMES.map((f, i) => (
              <div key={i} style={{
                opacity: reveal(0.55 + i * 0.05),
                transform: `translateY(${(1 - reveal(0.55 + i * 0.05)) * 20}px)`,
              }}>
                <div style={{
                  width: '100%', aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  background: L_PALETTE.ink,
                  border: `1px solid ${L_PALETTE.rule}`,
                }}>
                  <img src={f.src} alt={f.cap}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block',
                    }}/>
                </div>
                <div style={{
                  marginTop: 14,
                  fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 11,
                  letterSpacing: '0.32em',
                }}>{f.n}</div>
                <div style={{
                  marginTop: 6,
                  fontFamily: L_SERIF, color: L_PALETTE.navy,
                  fontSize: 16, lineHeight: 1.25,
                }}>{f.cap}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div style={{
          marginTop: 80,
          padding: '28px 32px',
          borderLeft: `2px solid ${L_PALETTE.gold}`,
          background: 'rgba(201,169,97,0.06)',
          fontFamily: L_SERIF, fontStyle: 'italic',
          color: 'rgba(15,30,71,0.78)', fontSize: 18, lineHeight: 1.55,
          maxWidth: 1100,
          opacity: reveal(0.8),
        }}>
          <strong style={{
            color: L_PALETTE.gold, fontStyle: 'normal',
            fontFamily: L_SANS, fontWeight: 800, fontSize: 11,
            letterSpacing: '0.4em', textTransform: 'uppercase',
            display: 'block', marginBottom: 10,
          }}>CONTEXTO</strong>
          Las fotos se tomaron el 24 de mayo de 2026 al final de la tarde. La calle
          está habitada — vehículos estacionados, casas terminadas, postes y
          alumbrado en operación. No es un proyecto en planos: es una microzona
          consolidada con servicios entregados.
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { L_Recorrido });
