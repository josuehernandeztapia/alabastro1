// landing-tail.jsx — Sections 8-10: Reels gallery, FAQ, Contact, Footer

// ── S8 — Galería de reels ───────────────────────────────────────────────────
// Reuses the existing Reel components from window globals.

function L_ReelCard({ id, title, sub, dur, ReelComp, thumbSrc, onOpen, accent }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
      style={{
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 240ms',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      }}>
      <div style={{
        position: 'relative',
        width: '100%', aspectRatio: '9 / 16',
        background: L_PALETTE.ink,
        border: `1px solid ${hover ? accent : 'rgba(201,169,97,0.18)'}`,
        overflow: 'hidden',
        transition: 'border-color 240ms',
      }}>
        <img src={thumbSrc}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt=""/>
        {/* Click overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hover
            ? 'linear-gradient(180deg, rgba(7,14,39,0.3) 0%, rgba(7,14,39,0.6) 100%)'
            : 'linear-gradient(180deg, transparent 50%, rgba(7,14,39,0.5) 100%)',
          transition: 'background 240ms',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            padding: '14px 24px',
            border: `1px solid ${accent}`,
            background: 'rgba(7,14,39,0.85)',
            backdropFilter: 'blur(8px)',
            fontFamily: L_SANS, fontWeight: 700, color: accent, fontSize: 11,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            opacity: hover ? 1 : 0.85,
            transition: 'opacity 240ms',
          }}>▶ Ver reel · {id.split(' · ')[1]}</div>
        </div>
      </div>
      <div style={{
        marginTop: 18,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <div>
          <div style={{
            fontFamily: L_MONO, color: accent, fontSize: 11,
            letterSpacing: '0.3em',
          }}>{id}</div>
          <div style={{
            fontFamily: L_SERIF, color: L_PALETTE.ivory,
            fontSize: 24, marginTop: 4, letterSpacing: '-0.01em',
          }}>{title}</div>
          <div style={{
            fontFamily: L_SANS, color: 'rgba(202,220,252,0.6)', fontSize: 13,
            marginTop: 6,
          }}>{sub}</div>
        </div>
        <div style={{
          fontFamily: L_MONO, color: 'rgba(245,241,232,0.45)', fontSize: 12,
          letterSpacing: '0.2em',
        }}>{dur}</div>
      </div>
    </div>
  );
}

function L_ReelOverlay({ reel, onClose }) {
  if (!reel) return null;
  const ReelComp = reel.Comp;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(7,14,39,0.95)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'relative',
        height: '90vh', aspectRatio: '9 / 16',
        maxWidth: '90vw',
      }}>
        <ReelComp autoplay={true}/>
      </div>
      <button onClick={onClose} style={{
        position: 'absolute', top: 32, right: 32,
        background: 'transparent', border: `1px solid ${L_PALETTE.gold}`,
        color: L_PALETTE.gold,
        padding: '10px 16px',
        fontFamily: L_SANS, fontWeight: 700, fontSize: 11,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        cursor: 'pointer', borderRadius: 999,
      }}>Cerrar ✕</button>
    </div>
  );
}

function L_ReelsGallery() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.1) / 0.4)));
  const [open, setOpen] = React.useState(null);

  const REELS = [
    { id: 'A · 22 s', title: 'Dos Rutas',           sub: 'Split-screen con duelo de números',     Comp: window.ReelA, thumb: 'frames/A_03_split_dos_rutas.png', color: L_PALETTE.gold },
    { id: 'B · 20 s', title: 'Datos en Movimiento', sub: 'Kinetic typography institucional',       Comp: window.ReelB, thumb: 'frames/B_02_paquete_completo.png', color: L_PALETTE.teal },
    { id: 'C · 22 s', title: 'Mapa Cinemático',     sub: 'Ubicación + corredor médico',            Comp: window.ReelC, thumb: 'frames/C_02_corredor_medico.png', color: L_PALETTE.ice },
    { id: 'D · 20 s', title: 'Isotipo',             sub: 'Brand-first, barra dorada como motor',    Comp: window.ReelD, thumb: 'frames/D_03_bar_vertical.png', color: L_PALETTE.gold },
    { id: 'E · 22 s', title: 'Hoy / Mañana',        sub: 'Photo essay editorial',                   Comp: window.ReelE, thumb: 'frames/E_06_anteproyecto.png', color: L_PALETTE.ivory },
    { id: 'F · 22 s', title: 'El Expediente',       sub: 'Documentos físicos sellándose',          Comp: window.ReelF, thumb: 'frames/F_02_stack_paquete.png', color: L_PALETTE.gold },
  ];

  return (
    <section ref={ref} data-screen-label="08 Reels" style={{
      background: L_PALETTE.ink,
      color: L_PALETTE.ivory,
      padding: '180px 96px 200px',
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: 80, alignItems: 'end', marginBottom: 80,
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
              color: L_PALETTE.ivory,
            }}>
              Seis<br/>
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>aproximaciones.</em>
            </h2>
          </div>
          <div style={{
            fontFamily: L_SERIF, fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.6,
            color: L_PALETTE.ice,
            maxWidth: 720,
          }}>
            Seis reels verticales de 20–22 s, cada uno con un ángulo distinto sobre la
            misma historia. Comparte el que más te resuene en WhatsApp, IG, LinkedIn.
            Click para verlo en pantalla completa.
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36,
        }}>
          {REELS.map((r, i) => (
            <L_ReelCard key={i}
              id={r.id} title={r.title} sub={r.sub} dur={`#0${i + 1}`}
              ReelComp={r.Comp} thumbSrc={r.thumb} accent={r.color}
              onOpen={() => setOpen(r)}/>
          ))}
        </div>
      </div>

      {open && <L_ReelOverlay reel={open} onClose={() => setOpen(null)}/>}
    </section>
  );
}

// ── S9 — FAQ + dossier CTA ──────────────────────────────────────────────────
function L_FAQItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      padding: '32px 0',
      borderBottom: `1px solid ${L_PALETTE.rule}`,
      cursor: 'pointer',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 24,
      }}>
        <div style={{
          fontFamily: L_SERIF, color: L_PALETTE.navy, fontSize: 26,
          letterSpacing: '-0.01em', lineHeight: 1.25,
        }}>{q}</div>
        <div style={{
          fontFamily: L_SERIF, color: L_PALETTE.gold, fontSize: 36,
          transition: 'transform 240ms',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          flexShrink: 0,
        }}>+</div>
      </div>
      {open && (
        <div style={{
          marginTop: 20, maxWidth: 900,
          fontFamily: L_SERIF, fontSize: 18, color: 'rgba(15,30,71,0.78)',
          lineHeight: 1.65,
        }}>{a}</div>
      )}
    </div>
  );
}

function L_FAQ() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const vp = useViewport();
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.1) / 0.4)));

  return (
    <section ref={ref} id="faq" data-screen-label="09 FAQ" style={{
      background: L_PALETTE.ivory,
      color: L_PALETTE.navy,
      padding: `${vp.padY}px ${vp.padX}px ${vp.padY + 20}px`,
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 2fr'),
          gap: vp.mobile ? 32 : 80, alignItems: 'flex-start',
          opacity: ease,
        }}>
          <div style={{
            position: vp.mobile ? 'static' : 'sticky', top: 100, alignSelf: 'flex-start',
            background: L_PALETTE.ivory, zIndex: 2,
            paddingRight: vp.mobile ? 0 : 24,
          }}>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 14,
              letterSpacing: '0.4em', marginBottom: 22, fontWeight: 700,
            }}>X.</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(48px, 5vw, 78px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>
              Lo que un{' '}
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>
                comprador serio
              </em>{' '}
              quiere saber.
            </h2>

            <div style={{
              marginTop: 56,
              padding: '32px 32px',
              background: L_PALETTE.navy,
              color: L_PALETTE.ivory,
            }}>
              <div style={{
                fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
                fontSize: 11, letterSpacing: '0.4em', marginBottom: 14,
              }}>EXPEDIENTE COMPLETO</div>
              <div style={{
                fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 26, lineHeight: 1.2,
              }}>Solicítalo bajo LOI.</div>
              <div style={{
                marginTop: 14,
                fontFamily: L_SERIF, fontStyle: 'italic', color: L_PALETTE.ice,
                fontSize: 16, lineHeight: 1.5,
              }}>
                Deck institucional · escritura · dictámenes · factibilidades · planos · pro-forma.
              </div>
              <a href="#contacto" style={{
                marginTop: 28, display: 'inline-block',
                padding: '14px 26px',
                background: L_PALETTE.gold, color: L_PALETTE.navy,
                fontFamily: L_SANS, fontWeight: 700, fontSize: 12,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: 999,
              }}>Solicitar expediente y due diligence →</a>
            </div>

            {/* Brokers card — open the door without converting the landing into a traditional broker channel */}
            <div style={{
              marginTop: 24,
              padding: '28px 28px',
              background: L_PALETTE.ivory,
              border: `1px solid ${L_PALETTE.rule}`,
              borderTop: `4px solid ${L_PALETTE.gold}`,
              color: L_PALETTE.navy,
            }}>
              <div style={{
                fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
                fontSize: 11, letterSpacing: '0.4em', marginBottom: 12,
              }}>BROKERS · AGENCIAS</div>
              <div style={{
                fontFamily: L_SERIF, fontStyle: 'italic',
                color: 'rgba(15,30,71,0.65)', fontSize: 14, lineHeight: 1.55,
              }}>
                Registro previo del cliente · términos por escrito. Contacta al propietario antes de presentar el activo.
              </div>
              <a href="#contacto" style={{
                marginTop: 18, display: 'inline-block',
                fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 11,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                textDecoration: 'none',
                borderBottom: `1px solid ${L_PALETTE.gold}`,
                paddingBottom: 4,
              }}>Solicitar términos →</a>
            </div>
          </div>

          <div>
            <L_FAQItem
              q="¿Hay gravámenes sobre el predio?"
              a="La escritura pública 9,668 está inscrita en el Registro Público de la Propiedad y del Comercio de Querétaro bajo el Folio Real 360920. Se puede solicitar Certificado de Libertad de Gravamen vigente como parte de la due diligence."/>
            <L_FAQItem
              q='¿Por qué el dictamen menciona "consultorios y laboratorios"?'
              a="El uso de suelo H3 (Habitacional ≤300 hab/ha) en Querétaro es compatible con servicios médicos según la Tabla de Compatibilidad de Usos de Suelo del Municipio. El dictamen Tipo B vigente para Alabastro 1 lo señala explícitamente. No requiere cambio de uso."/>
            <L_FAQItem
              q="¿Qué incluye el anteproyecto arquitectónico?"
              a="Incluye planos ML-ARQ (plantas, fachadas, cortes esquemáticos), planos MLA 01-05, cuadro de áreas detallado y propuesta tipológica para 3 unidades verticales. Es anteproyecto, no proyecto ejecutivo: el comprador desarrolla este último con su arquitecto. Ahorra al comprador 1-2 meses de diseño conceptual."/>
            <L_FAQItem
              q="¿Es reconvertible a uso médico el anteproyecto residencial?"
              a="Sí, como base. El uso de suelo H3 permite explícitamente consultorios y laboratorios. El partido arquitectónico (sótano + 3 niveles + rooftop, 1,045 m² construibles) sirve para ambos usos. La reconversión a torre médica requiere replanteo en el proyecto ejecutivo: separación de circulaciones pacientes/staff, baños públicos, salidas de emergencia."/>
            <L_FAQItem
              q="¿Cuánto cuesta terminar los trámites pendientes?"
              a="Las etapas restantes — Licencia de construcción + Declaratoria de régimen en condominio + Dictamen Protección Civil — son trámites estándar municipales. Costo estimado ≈ $165 K MXN. El paquete documental completo se entrega al cierre."/>
            <L_FAQItem
              q="¿Cómo se realiza el cierre?"
              a="Firma de Carta de Intención (LOI) con calendario de exclusividad 30-45 días → Due diligence técnica y documental → Cierre notarial con escritura traslativa. Entrega del paquete documental físico y digital al cierre."/>
            <L_FAQItem
              q="¿Trabajan con brokers o agencias inmobiliarias?"
              a="Sí. Hay co-broke disponible bajo registro previo del cliente. Los brokers acreditados solicitan los términos comerciales por la vía institucional antes de presentar el activo a su prospecto — se registra el lead con timestamp y se formaliza el esquema de comisión por escrito."/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── S10 — Cierre + contacto ────────────────────────────────────────────────
function L_Contacto() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const vp = useViewport();
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.1) / 0.5)));

  return (
    <section ref={ref} id="contacto" data-screen-label="10 Contacto" style={{
      background: L_PALETTE.ink,
      color: L_PALETTE.ivory,
      padding: `${vp.mobile ? 120 : 200}px ${vp.padX}px ${vp.mobile ? 80 : 120}px`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 30%, rgba(201,169,97,0.16) 0%, transparent 55%)`,
      }}/>

      <div style={{ maxWidth: 1600, margin: '0 auto', position: 'relative' }}>
        <div style={{
          fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
          letterSpacing: '0.4em', marginBottom: 22,
          opacity: ease,
        }}>XI. · CIERRE</div>

        <h2 style={{
          fontFamily: L_SERIF, fontWeight: 400,
          fontSize: 'clamp(64px, 8vw, 140px)',
          lineHeight: 1.0, letterSpacing: '-0.03em',
          color: L_PALETTE.ivory,
          opacity: ease,
          transform: `translateY(${(1 - ease) * 32}px)`,
        }}>
          Alabastro <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>1.</em>
        </h2>
        <div style={{
          marginTop: 28,
          fontFamily: L_SERIF, fontStyle: 'italic',
          color: L_PALETTE.ice, fontSize: 32,
          lineHeight: 1.4,
          maxWidth: 900,
          opacity: ease,
        }}>
          Documentación completa bajo LOI.
        </div>

        {/* What you receive on LOI — transactional close */}
        <div style={{
          marginTop: 64,
          padding: '36px 40px',
          background: 'rgba(245,241,232,0.03)',
          border: `1px solid rgba(201,169,97,0.22)`,
          opacity: ease,
        }}>
          <div style={{
            fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.gold,
            fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase',
            marginBottom: 22,
          }}>AL FIRMAR LOI · RECIBES</div>

          <div style={{
            display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 1fr'),
            gap: vp.mobile ? 14 : 22,
          }}>
            {[
              ['01', 'Paquete documental completo', 'Escrituras · folio · dictámenes · factibilidades · planos MLA · estudios técnicos'],
              ['02', 'Pro-forma base', 'Resumen indicativo de tipologías y supuestos de mercado para ambas rutas'],
              ['03', 'Visita al predio', 'Coordinada a través del broker acreditado · recorrido en sitio + corredor médico vecino'],
              ['04', 'Ventana de exclusividad', '30 días para revisión documental antes del cierre notarial'],
            ].map(([n, title, desc]) => (
              <div key={n} style={{
                display: 'grid', gridTemplateColumns: '36px 1fr',
                gap: 14,
                padding: vp.mobile ? '10px 0' : '8px 0',
              }}>
                <div style={{
                  fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 13,
                  letterSpacing: '0.2em', paddingTop: 4,
                }}>{n}</div>
                <div>
                  <div style={{
                    fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 19,
                    letterSpacing: '-0.005em',
                  }}>{title}</div>
                  <div style={{
                    marginTop: 6,
                    fontFamily: L_SANS, color: 'rgba(202,220,252,0.65)', fontSize: 13,
                    lineHeight: 1.5,
                  }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price block */}
        <div style={{
          marginTop: 80,
          padding: '40px 0',
          borderTop: `1px solid rgba(201,169,97,0.25)`,
          borderBottom: `1px solid rgba(201,169,97,0.25)`,
          display: 'grid', gridTemplateColumns: vp.cols('1fr', '1fr 1fr 1fr'),
          gap: 0,
          opacity: ease,
        }}>
          {[
            { v: '$3,100,000', l: 'MXN · precio de oportunidad' },
            { v: '$6,935', l: '/m² · 447 m²' },
            { v: 'LOI', l: 'Documentación bajo' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '0 36px',
              borderRight: i < 2 ? `1px solid rgba(201,169,97,0.18)` : 'none',
            }}>
              <div style={{
                fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 42,
                letterSpacing: '-0.02em', lineHeight: 1.0,
              }}>{s.v}</div>
              <div style={{
                marginTop: 14,
                fontFamily: L_SANS, fontWeight: 700, color: L_PALETTE.gold,
                fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
              }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Single contact card · broker/agency enrollment · owner email */}
        <a href="mailto:josuehernandeztapia@gmail.com?subject=Acreditaci%C3%B3n%20de%20broker%20%C2%B7%20Alabastro%201"
          style={{
            display: 'block',
            marginTop: 100,
            padding: '64px 64px',
            background: L_PALETTE.gold,
            color: L_PALETTE.navy,
            textDecoration: 'none',
            transition: 'all 240ms',
            opacity: ease,
          }}>
          <div style={{
            display: 'grid', gridTemplateColumns: vp.cols('1fr', '1.4fr 1fr'),
            gap: vp.mobile ? 32 : 56, alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.navy,
                fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase',
                opacity: 0.7,
              }}>BROKERS · AGENCIAS</div>
              <div style={{
                marginTop: 24,
                fontFamily: L_SERIF, color: L_PALETTE.navy,
                fontSize: 'clamp(36px, 4vw, 60px)',
                lineHeight: 1.0, letterSpacing: '-0.02em',
              }}>
                Solicita{' '}
                <em style={{ fontStyle: 'italic' }}>acreditación.</em>
              </div>
              <div style={{
                marginTop: 22,
                fontFamily: L_SERIF, fontStyle: 'italic',
                color: 'rgba(15,30,71,0.78)', fontSize: 18, lineHeight: 1.55,
                maxWidth: 540,
              }}>
                Canal exclusivo para brokers y agencias inmobiliarias que quieran
                presentar Alabastro 1 a su cartera de clientes.
              </div>
            </div>
            <div style={{
              borderLeft: `1px solid rgba(15,30,71,0.25)`,
              paddingLeft: 36,
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              <div style={{
                fontFamily: L_MONO, color: L_PALETTE.navy, fontSize: 11,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                opacity: 0.65,
              }}>VÍA DE CONTACTO</div>
              <div style={{
                fontFamily: L_SERIF, fontStyle: 'italic',
                color: L_PALETTE.navy, fontSize: 22, lineHeight: 1.4,
              }}>
                Escríbenos para iniciar el proceso de acreditación.
              </div>
              <div style={{
                marginTop: 'auto',
                fontFamily: L_MONO, color: L_PALETTE.navy, fontSize: 13,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                opacity: 0.85,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderTop: `1px solid rgba(15,30,71,0.25)`,
                paddingTop: 18,
              }}>
                <span>Escribir →</span>
                <span>↗</span>
              </div>
            </div>
          </div>
        </a>

        {/* Footer with registry info */}
        <div style={{
          marginTop: 120,
          paddingTop: 36,
          borderTop: `1px solid rgba(201,169,97,0.2)`,
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 40,
          opacity: ease,
        }}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: L_PALETTE.gold }}/>
              <span style={{
                fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.ivory,
                letterSpacing: '0.4em', fontSize: 12,
              }}>ALABASTRO 1</span>
            </div>
            <div style={{
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: 'rgba(245,241,232,0.65)', fontSize: 14, lineHeight: 1.65,
            }}>
              Sendero del Alabastro 1, Lote 14, Mz V, Sec. 1, Fase A<br/>
              Fracc. Milenio III · Querétaro · CP 76060
            </div>
          </div>
          <div style={{
            fontFamily: L_MONO, fontSize: 11, color: 'rgba(245,241,232,0.5)',
            letterSpacing: '0.15em', lineHeight: 2.2, textAlign: 'right',
          }}>
            <div>FOLIO REAL · 360920</div>
            <div>CLAVE CATASTRAL · 140100116081070</div>
            <div>ESCRITURA · 9,668</div>
          </div>
        </div>

        <div style={{
          marginTop: 36,
          fontFamily: L_MONO, color: 'rgba(245,241,232,0.35)', fontSize: 10,
          letterSpacing: '0.25em', textAlign: 'center',
        }}>
          © 2026 · DOCUMENTO INFORMATIVO · NO CONSTITUYE OFERTA VINCULANTE · SUJETO A DUE DILIGENCE
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { L_ReelsGallery, L_FAQ, L_Contacto });
