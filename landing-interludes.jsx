// landing-interludes.jsx — Reel-based full-bleed interludes + "Comparte" strip
// Reels embed live, autoplay, and the reel's own ambient design takes over the viewport.

// ── L_VideoInterlude — mobile-aware MP4 walking-tour interlude ──────────────
// Mobile: poster + click-to-play overlay. Desktop: full-bleed autoplay video.
function L_VideoInterlude({ src, label, title, sub, tag, poster = 'assets/hero-01-predio-torre.jpeg', accent = L_PALETTE.gold }) {
  const ref = React.useRef(null);
  const videoRef = React.useRef(null);
  const overlayVideoRef = React.useRef(null);
  const vp = useViewport();
  const seen = useRevealOnce(ref, { threshold: 0.15 });
  const t = useInView(ref);
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.2) / 0.4)));
  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(true);
  const [overlayOpen, setOverlayOpen] = React.useState(false);

  // Desktop only: auto pause when leaves viewport
  React.useEffect(() => {
    if (vp.mobile || !seen || !videoRef.current) return;
    const v = videoRef.current;
    const obs = new IntersectionObserver((entries) => {
      const visible = entries[0].isIntersecting;
      if (!visible) {
        v.pause();
      } else if (playing) {
        v.play().catch(() => {});
      }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen, playing, vp.mobile]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };
  const goFullscreen = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
  };

  const mobileBtn = {
    ...btnStyle,
    width: 52, height: 52,
  };

  // ── MOBILE: click-to-play poster card ─────────────────────────────────────
  if (vp.mobile) {
    return (
      <>
        <section ref={ref} data-screen-label="Recorrido en sitio" style={{
          position: 'relative',
          background: L_PALETTE.ink,
          padding: '60px 20px 80px',
          overflow: 'hidden',
        }}>
          <div style={{
            opacity: ease,
            marginBottom: 24,
          }}>
            <div style={{
              fontFamily: L_MONO, color: accent, fontSize: 11,
              letterSpacing: '0.4em', textTransform: 'uppercase',
              marginBottom: 6,
            }}>Recorrido · 2026</div>
            <div style={{
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: L_PALETTE.ice, fontSize: 18, lineHeight: 1.45,
            }}>
              Lo que ves al final del circuito.
            </div>
          </div>

          {/* Poster card — click to open fullscreen video */}
          <button onClick={() => setOverlayOpen(true)}
            style={{
              display: 'block',
              width: '100%',
              aspectRatio: '9 / 16',
              maxHeight: '70vh',
              position: 'relative',
              padding: 0, border: 'none',
              background: '#0A1538',
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: 0,
            }}>
            <img src={poster} alt="Recorrido"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.55) saturate(0.85)',
              }}/>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(7,14,39,0.3) 0%, transparent 40%, rgba(7,14,39,0.7) 100%)',
            }}/>
            {/* Big play button */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 88, height: 88,
              background: 'rgba(7,14,39,0.75)',
              border: `1.5px solid ${accent}`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path d="M 10 6 L 25 16 L 10 26 Z" fill={accent}/>
              </svg>
            </div>
            <div style={{
              position: 'absolute', bottom: 24, left: 0, right: 0,
              textAlign: 'center',
              fontFamily: L_MONO, color: accent, fontSize: 11,
              letterSpacing: '0.32em', textTransform: 'uppercase',
            }}>Ver recorrido · 0:30</div>
          </button>
        </section>

        {/* Fullscreen overlay with video */}
        {overlayOpen && (
          <div onClick={() => setOverlayOpen(false)} style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(7,14,39,0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}>
            <video ref={overlayVideoRef}
              src={src}
              autoPlay loop playsInline controls
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxHeight: '85vh',
                objectFit: 'contain',
                background: '#000',
              }}/>
            <button onClick={() => setOverlayOpen(false)} style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(7,14,39,0.85)',
              border: `1px solid ${accent}`,
              color: accent,
              padding: '10px 16px',
              fontFamily: L_SANS, fontWeight: 700, fontSize: 11,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              cursor: 'pointer', borderRadius: 999,
            }}>Cerrar ✕</button>
          </div>
        )}
      </>
    );
  }

  // ── DESKTOP / TABLET: full-bleed autoplay video ──────────────────────────
  return (
    <section ref={ref} data-screen-label="Recorrido en sitio" style={{
      position: 'relative',
      height: '100vh',
      minHeight: 700,
      background: L_PALETTE.ink,
      overflow: 'hidden',
    }}>
      {/* Video */}
      {seen && (
        <video ref={videoRef}
          src={src}
          autoPlay muted={muted} loop playsInline
          onClick={togglePlay}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            cursor: 'pointer',
          }}/>
      )}

      {/* Subtle vignette overlay so text reads */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(7,14,39,0.55) 0%, transparent 25%, transparent 60%, rgba(7,14,39,0.85) 100%)',
        pointerEvents: 'none',
      }}/>

      {/* Top label */}
      <div style={{
        position: 'absolute', top: 56, left: 56, right: 56,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        color: L_PALETTE.ivory,
        opacity: ease,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: L_MONO, color: accent, fontSize: 12,
          letterSpacing: '0.4em', textTransform: 'uppercase',
        }}>{label}</div>
        <div style={{
          fontFamily: L_MONO, color: 'rgba(245,241,232,0.65)', fontSize: 11,
          letterSpacing: '0.32em', textTransform: 'uppercase',
        }}>{tag}</div>
      </div>

      {/* Bottom-left title (only renders if title prop is set) */}
      {title && (
        <div style={{
          position: 'absolute', left: 56, bottom: 80, right: '40%',
          color: L_PALETTE.ivory,
          opacity: ease,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: L_SERIF, fontSize: 'clamp(40px, 4.5vw, 72px)',
            lineHeight: 1.0, letterSpacing: '-0.02em',
          }}>{title}</div>
          {sub && (
            <div style={{
              marginTop: 22,
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: L_PALETTE.ice, fontSize: 'clamp(15px, 1.3vw, 19px)',
              lineHeight: 1.5, maxWidth: 540,
            }}>{sub}</div>
          )}
        </div>
      )}

      {/* Bottom-right controls */}
      <div style={{
        position: 'absolute', right: 56, bottom: 56,
        display: 'flex', gap: 10, alignItems: 'center',
        opacity: ease,
      }}>
        <button onClick={togglePlay} aria-label={playing ? 'Pausar' : 'Reproducir'} style={btnStyle}>
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="2" width="3" height="10" fill="currentColor"/><rect x="8" y="2" width="3" height="10" fill="currentColor"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 2 L 12 7 L 3 12 Z" fill="currentColor"/></svg>
          )}
        </button>
        <button onClick={toggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'} style={btnStyle}>
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 5 L 5 5 L 8 2 L 8 12 L 5 9 L 2 9 Z" fill="currentColor"/>
              <path d="M11 4 L 13 6 M 13 4 L 11 6 M 11 8 L 13 10 M 13 8 L 11 10"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 5 L 5 5 L 8 2 L 8 12 L 5 9 L 2 9 Z" fill="currentColor"/>
              <path d="M10 4 Q 12 7 10 10"/>
              <path d="M11.5 3 Q 14 7 11.5 11"/>
            </svg>
          )}
        </button>
        <button onClick={goFullscreen} aria-label="Pantalla completa" style={btnStyle}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 5 L 2 2 L 5 2 M 9 2 L 12 2 L 12 5 M 12 9 L 12 12 L 9 12 M 5 12 L 2 12 L 2 9"/>
          </svg>
        </button>
      </div>
    </section>
  );
}

const btnStyle = {
  width: 40, height: 40,
  background: 'rgba(7,14,39,0.65)',
  border: `1px solid ${L_PALETTE.gold}66`,
  color: L_PALETTE.gold,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 999,
  backdropFilter: 'blur(8px)',
  transition: 'all 200ms',
};

// ── L_Interlude — reel interlude (mobile-aware) ────────────────────────────
function L_Interlude({ reelKey, label, title, sub, accent = L_PALETTE.gold }) {
  const ref = React.useRef(null);
  const seen = useRevealOnce(ref, { threshold: 0.15 });
  const ReelComp = window['Reel' + reelKey];
  const t = useInView(ref);
  const vp = useViewport();
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.2) / 0.4)));

  return (
    <section ref={ref} data-screen-label={`Interlude ${reelKey}`} style={{
      position: 'relative',
      minHeight: vp.mobile ? 'auto' : 700,
      height: vp.mobile ? 'auto' : '100vh',
      background: L_PALETTE.ink,
      overflow: 'hidden',
      padding: vp.mobile ? '60px 20px 80px' : 0,
    }}>
      {vp.mobile ? (
        <>
          {/* Mobile: text first, then reel below in proper 9:16 frame */}
          <div style={{ opacity: ease, marginBottom: 24 }}>
            <div style={{
              fontFamily: L_MONO, color: accent, fontSize: 11,
              letterSpacing: '0.4em', textTransform: 'uppercase',
              marginBottom: 12,
            }}>{label}</div>
            <div style={{
              fontFamily: L_SERIF, color: L_PALETTE.ivory,
              fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>{title}</div>
            <div style={{
              marginTop: 16,
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: L_PALETTE.ice, fontSize: 15,
              lineHeight: 1.5,
            }}>{sub}</div>
          </div>

          {/* Reel in proper 9:16 aspect ratio, contained */}
          <div style={{
            width: '100%', aspectRatio: '9 / 16', maxHeight: '75vh',
            margin: '0 auto', position: 'relative',
            border: `1px solid ${accent}33`,
            overflow: 'hidden',
            background: L_PALETTE.ink,
          }}>
            {seen && ReelComp && <ReelComp autoplay={true} hideChrome={true}/>}
          </div>
        </>
      ) : (
        <>
          {/* The reel takes the full viewport */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {seen && ReelComp && <ReelComp autoplay={true} hideChrome={true}/>}
          </div>

          {/* Side overlay panel with chapter caption */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            width: 'clamp(380px, 36vw, 560px)',
            background: 'linear-gradient(90deg, rgba(7,14,39,0.92) 0%, rgba(7,14,39,0.7) 75%, transparent 100%)',
            padding: '0 56px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            color: L_PALETTE.ivory,
            opacity: ease,
          }}>
            <div style={{
              fontFamily: L_MONO, color: accent, fontSize: 12,
              letterSpacing: '0.4em', marginBottom: 26,
              textTransform: 'uppercase',
            }}>{label}</div>
            <div style={{
              fontFamily: L_SERIF, fontSize: 'clamp(40px, 4.5vw, 72px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>{title}</div>
            <div style={{
              marginTop: 24,
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: L_PALETTE.ice, fontSize: 'clamp(16px, 1.4vw, 22px)',
              lineHeight: 1.5, maxWidth: 460,
            }}>{sub}</div>
          </div>

          {/* Bottom-right tag */}
          <div style={{
            position: 'absolute', right: 56, bottom: 48,
            textAlign: 'right',
            opacity: ease,
          }}>
            <div style={{
              fontFamily: L_MONO, color: accent, fontSize: 11,
              letterSpacing: '0.32em', textTransform: 'uppercase',
            }}>REEL · {reelKey}</div>
          </div>
        </>
      )}
    </section>
  );
}

// ── L_Compartir — thin horizontal strip with 6 reel chips ───────────────────
function L_Compartir() {
  const ref = React.useRef(null);
  const t = useInView(ref);
  const vp = useViewport();
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.15) / 0.4)));

  const CHIPS = [
    { k: 'A', label: 'Dos Rutas',           thumb: 'frames/A_03_split_dos_rutas.png',  color: L_PALETTE.gold },
    { k: 'B', label: 'Datos en Movimiento', thumb: 'frames/B_02_paquete_completo.png', color: L_PALETTE.teal },
    { k: 'C', label: 'Mapa Cinemático',     thumb: 'frames/C_02_corredor_medico.png',  color: L_PALETTE.ice },
    { k: 'D', label: 'Isotipo',             thumb: 'frames/D_03_bar_vertical.png',     color: L_PALETTE.gold },
    { k: 'E', label: 'Hoy / Mañana',        thumb: 'frames/E_06_anteproyecto.png',     color: L_PALETTE.ivory },
    { k: 'F', label: 'El Expediente',       thumb: 'frames/F_02_stack_paquete.png',    color: L_PALETTE.gold },
  ];

  const [open, setOpen] = React.useState(null);

  return (
    <section ref={ref} data-screen-label="Comparte" style={{
      background: L_PALETTE.ink,
      color: L_PALETTE.ivory,
      padding: `${vp.mobile ? 80 : 120}px ${vp.padX}px`,
      borderTop: `1px solid rgba(201,169,97,0.18)`,
      borderBottom: `1px solid rgba(201,169,97,0.18)`,
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: vp.cols('1fr', 'auto 1fr'),
          gap: vp.mobile ? 32 : 60, alignItems: 'center',
          opacity: ease,
        }}>
          <div>
            <div style={{
              fontFamily: L_MONO, color: L_PALETTE.gold, fontSize: 12,
              letterSpacing: '0.4em', marginBottom: 16,
            }}>COMPARTE</div>
            <h2 style={{
              fontFamily: L_SERIF, fontWeight: 400,
              fontSize: 'clamp(36px, 3vw, 56px)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
              color: L_PALETTE.ivory,
              maxWidth: 360,
            }}>
              Seis reels<br/>
              <em style={{ color: L_PALETTE.gold, fontStyle: 'italic' }}>para reenviar.</em>
            </h2>
            <div style={{
              marginTop: 22,
              fontFamily: L_SERIF, fontStyle: 'italic',
              color: 'rgba(202,220,252,0.7)', fontSize: 16, lineHeight: 1.5,
              maxWidth: 320,
            }}>
              Selecciona cualquier reel para reproducirlo.
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: vp.cols('repeat(3, 1fr)', 'repeat(6, 1fr)'),
            gap: 14,
          }}>
            {CHIPS.map((c, i) => {
              return (
                <button key={c.k}
                  onClick={() => setOpen(c)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  style={{
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none', padding: 0,
                    transition: 'transform 220ms',
                  }}>
                  <div style={{
                    position: 'relative',
                    width: '100%', aspectRatio: '9 / 16',
                    overflow: 'hidden',
                    border: `1px solid ${c.color}55`,
                  }}>
                    <img src={c.thumb}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt=""/>
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(180deg, transparent 60%, rgba(7,14,39,0.8) 100%)',
                    }}/>
                    <div style={{
                      position: 'absolute', left: 8, bottom: 6, right: 8,
                      fontFamily: L_MONO, color: c.color, fontSize: 10,
                      letterSpacing: '0.2em', textAlign: 'left',
                    }}>· {c.k}</div>
                  </div>
                  <div style={{
                    marginTop: 8,
                    fontFamily: L_SERIF, color: L_PALETTE.ivory,
                    fontSize: 13, textAlign: 'left',
                    letterSpacing: '-0.01em',
                  }}>{c.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {open && (
        <div onClick={() => setOpen(null)} style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(7,14,39,0.78)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 40,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            height: '64vh', aspectRatio: '9 / 16', maxWidth: '40vw',
            position: 'relative',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          }}>
            {(() => {
              const Comp = window['Reel' + open.k];
              return Comp ? <Comp autoplay={true}/> : null;
            })()}
          </div>
          <button onClick={() => setOpen(null)} style={{
            position: 'absolute', top: 32, right: 32,
            background: 'transparent', border: `1px solid ${L_PALETTE.gold}`,
            color: L_PALETTE.gold,
            padding: '10px 16px',
            fontFamily: L_SANS, fontWeight: 700, fontSize: 11,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            cursor: 'pointer', borderRadius: 999,
          }}>Cerrar ✕</button>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { L_Interlude, L_VideoInterlude, L_Compartir });
