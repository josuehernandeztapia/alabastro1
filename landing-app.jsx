// landing-app.jsx — main composition, hero, navigation, chapter markers, ambient bar.
// Sections 1, 2 live here. Other sections imported via window globals.

const L_PALETTE = {
  navy:   '#0F1E47',
  navy2:  '#1E3164',
  ink:    '#070E27',
  ivory:  '#F5F1E8',
  paper:  '#FBF8F1',
  ice:    '#CADCFC',
  gold:   '#C9A961',
  goldDk: '#A8884A',
  teal:   '#14B8A6',
  tealDk: '#0D9488',
  rule:   'rgba(15,30,71,0.12)',
};

const L_SERIF = 'Georgia, "Times New Roman", serif';
const L_SANS  = 'Helvetica, Arial, sans-serif';
const L_MONO  = 'Menlo, Consolas, "Courier New", monospace';

// ── Tracking — runs through whole page, observed by sections ─────────────────
const ScrollContext = React.createContext({ y: 0, vh: 800, ready: false });
const useScroll = () => React.useContext(ScrollContext);

// useInView — fires once when element enters viewport, returns 0→1 based on position
function useInView(ref, { offset = 0 } = {}) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    if (!ref.current) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // t reaches 1 quickly: when element top has moved 60% of viewport height
        // (i.e., element top is 40% from top of viewport)
        const triggerDistance = vh * 0.6;
        const traveled = vh - r.top + offset;
        setT(Math.max(0, Math.min(1, traveled / triggerDistance)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, offset]);
  return t;
}

// useViewport — tracks window width, returns breakpoint flags + helpers
function useViewport() {
  const [w, setW] = React.useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1600
  );
  React.useEffect(() => {
    const f = () => setW(window.innerWidth);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const mobile = w < 700;
  const tablet = w >= 700 && w < 1100;
  const desktop = w >= 1100;
  return {
    w, mobile, tablet, desktop,
    // helpers — common scaled values
    padX: mobile ? 16 : tablet ? 48 : 96,
    padY: mobile ? 100 : tablet ? 130 : 180,
    gap:  mobile ? 32 : tablet ? 48 : 80,
    // conditional columns: pass mobile/tablet/desktop strings
    cols: (m, t, d) => mobile ? m : tablet ? (t || d) : d,
  };
}

// useRevealOnce — fires true once when element is visible
function useRevealOnce(ref, { threshold = 0.2 } = {}) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setSeen(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, seen, threshold]);
  return seen;
}

Object.assign(window, {
  L_PALETTE, L_SERIF, L_SANS, L_MONO,
  ScrollContext, useScroll, useInView, useRevealOnce, useViewport,
});

// ── Top nav — minimal, sticky ───────────────────────────────────────────────
function L_Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '20px 48px',
      background: scrolled ? 'rgba(7,14,39,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,169,97,0.18)' : '1px solid transparent',
      transition: 'background 220ms, border-color 220ms, backdrop-filter 220ms',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      pointerEvents: scrolled ? 'auto' : 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: scrolled ? 1 : 0,
        transition: 'opacity 220ms',
        pointerEvents: scrolled ? 'auto' : 'none',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: L_PALETTE.gold }}/>
        <span style={{
          fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.ivory,
          letterSpacing: '0.4em', fontSize: 13,
        }}>ALABASTRO 1</span>
      </div>
      <a href="#contacto" style={{
        opacity: scrolled ? 1 : 0,
        transition: 'opacity 220ms',
        pointerEvents: scrolled ? 'auto' : 'none',
        padding: '10px 22px',
        border: `1px solid ${L_PALETTE.gold}`,
        color: L_PALETTE.gold,
        fontFamily: L_SANS, fontWeight: 700, fontSize: 12,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        textDecoration: 'none',
        borderRadius: 999,
      }}>Solicitar expediente →</a>
    </nav>
  );
}

// ── Ambient gold bar — moves down the page as you scroll ────────────────────
function L_AmbientBar() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setY(docH > 0 ? window.scrollY / docH : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 36, width: 2, height: '100vh',
      pointerEvents: 'none',
      zIndex: 30,
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '100%', height: '100%',
        background: 'rgba(201,169,97,0.12)',
      }}/>
      <div style={{
        position: 'absolute', left: 0, top: `${y * 80 + 10}%`,
        width: '100%', height: '10vh',
        background: `linear-gradient(180deg, transparent, ${L_PALETTE.gold} 50%, transparent)`,
        boxShadow: `0 0 18px ${L_PALETTE.gold}66`,
      }}/>
    </div>
  );
}

// ── Chapter marker — sits between sections, big roman numeral ───────────────
function L_Chapter({ num, label }) {
  const ref = React.useRef(null);
  const t = useInView(ref);
  // entrance from below
  const ease = Easing.easeOutCubic(Math.max(0, Math.min(1, (t - 0.3) / 0.4)));
  return (
    <div ref={ref} style={{
      padding: '160px 0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 36,
        opacity: ease,
        transform: `translateY(${(1 - ease) * 24}px)`,
      }}>
        <span style={{
          width: 140, height: 1, background: L_PALETTE.gold, opacity: 0.5,
        }}/>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: L_SERIF, fontStyle: 'italic', color: L_PALETTE.gold,
            fontSize: 64, lineHeight: 1, letterSpacing: '-0.02em',
          }}>{num}</div>
          <div style={{
            marginTop: 14,
            fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.ivory,
            fontSize: 12, letterSpacing: '0.5em', textTransform: 'uppercase',
          }}>{label}</div>
        </div>
        <span style={{
          width: 140, height: 1, background: L_PALETTE.gold, opacity: 0.5,
        }}/>
      </div>
    </div>
  );
}

// ── Section 1 — HERO inmersivo ──────────────────────────────────────────────
// Cross-fade between 3 hero photos as the visual base, with Ken-Burns drift.
const HERO_PHOTOS = [
  { src: 'assets/hero-01-predio-torre.jpeg',    pos: '50% 55%' },
  { src: 'assets/hero-03-vista-skyline.jpeg',   pos: '50% 50%' },
  { src: 'assets/hero-02-torre-puntosur.jpeg',  pos: '40% 50%' },
];
const HERO_CYCLE_MS = 6000;
const HERO_FADE_MS  = 1400;

function L_HeroBackdrop() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setActive(a => (a + 1) % HERO_PHOTOS.length);
    }, HERO_CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  // Slow Ken Burns: each image drifts/scales across its visible cycle
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
    }}>
      {HERO_PHOTOS.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === active ? 1 : 0,
          transition: `opacity ${HERO_FADE_MS}ms ease-in-out`,
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}>
          <img src={p.src} alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: p.pos,
              filter: 'brightness(0.42) contrast(1.05) saturate(0.7)',
              animation: i === active ? `kenburns-${i % 3} ${HERO_CYCLE_MS + HERO_FADE_MS}ms ease-out forwards` : 'none',
              transformOrigin: 'center center',
              willChange: 'transform',
              imageRendering: 'high-quality',
              backfaceVisibility: 'hidden',
            }}/>
        </div>
      ))}
      <style>{`
        @keyframes kenburns-0 { from { transform: translateZ(0) scale(1.04); } to { transform: translateZ(0) scale(1.08) translateX(-1%); } }
        @keyframes kenburns-1 { from { transform: translateZ(0) scale(1.06); } to { transform: translateZ(0) scale(1.09) translateY(-1%); } }
        @keyframes kenburns-2 { from { transform: translateZ(0) scale(1.04); } to { transform: translateZ(0) scale(1.08) translateX(1%); } }
      `}</style>
    </div>
  );
}

function L_Hero() {
  const [mode, setMode] = React.useState('resi'); // 'resi' | 'med'
  const vp = useViewport();

  // Pulse for hero text
  const heroRef = React.useRef(null);

  // accent color follows mode
  const accent = mode === 'med' ? L_PALETTE.teal : L_PALETTE.gold;

  const COPY = {
    resi: {
      eyebrow: 'Predio con expediente avanzado · Milenio III, Querétaro',
      title: 'Alabastro',
      one: '1',
      tag: 'Tres residencias verticales,',
      tag2: 'una sola decisión.',
      meta: '447 m² · H3 · 1 + 3 N. Oficiales · Anteproyecto incluido',
    },
    med: {
      eyebrow: 'Predio con expediente avanzado · Corredor médico Milenio III',
      title: 'Alabastro',
      one: '1',
      tag: 'Una torre médica boutique,',
      tag2: 'en un cluster ya validado.',
      meta: '447 m² · H3 · 1 + 3 N. Oficiales · 200 m al corredor',
    },
  };
  const copy = COPY[mode];

  return (
    <section ref={heroRef} data-screen-label="01 Hero" style={{
      position: 'relative',
      minHeight: '100vh',
      background: L_PALETTE.ink,
      color: L_PALETTE.ivory,
      overflow: 'hidden',
    }}>
      {/* Background — cross-fading hero photos with Ken Burns */}
      <L_HeroBackdrop/>

      {/* Mode tint overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: mode === 'med'
          ? `radial-gradient(ellipse at 30% 50%, rgba(13,148,136,0.35) 0%, transparent 55%), linear-gradient(135deg, ${L_PALETTE.ink} 0%, transparent 60%, rgba(7,14,39,0.85) 100%)`
          : `radial-gradient(ellipse at 70% 40%, rgba(201,169,97,0.22) 0%, transparent 55%), linear-gradient(135deg, ${L_PALETTE.ink} 0%, transparent 60%, rgba(7,14,39,0.88) 100%)`,
        transition: 'background 600ms ease',
      }}/>

      {/* Gold hairline frame */}
      <div style={{
        position: 'absolute', inset: vp.mobile ? 16 : 48,
        border: `1px solid rgba(201,169,97,0.25)`,
        pointerEvents: 'none',
      }}/>

      {/* Top brand */}
      <div style={{
        position: 'absolute', top: vp.mobile ? 28 : 72, left: vp.padX, zIndex: 5,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent }}/>
        <span style={{
          fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.ivory,
          letterSpacing: '0.4em', fontSize: vp.mobile ? 11 : 13,
        }}>ALABASTRO 1</span>
      </div>

      {/* Mode toggle — top right */}
      <div style={{
        position: 'absolute', top: vp.mobile ? 70 : 64, right: vp.padX, zIndex: 5,
        display: 'flex', alignItems: 'center', gap: vp.mobile ? 10 : 16,
      }}>
        {!vp.mobile && (
          <span style={{
            fontFamily: L_MONO, color: 'rgba(202,220,252,0.6)', fontSize: 11,
            letterSpacing: '0.25em', textTransform: 'uppercase',
          }}>Ver como</span>
        )}
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'rgba(15,30,71,0.65)',
          border: `1px solid ${accent}66`,
          borderRadius: 999, padding: 4,
          backdropFilter: 'blur(8px)',
        }}>
          {['resi', 'med'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: vp.mobile ? '8px 14px' : '10px 22px',
              fontFamily: L_SANS, fontWeight: 700, fontSize: vp.mobile ? 10 : 12,
              letterSpacing: vp.mobile ? '0.2em' : '0.3em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer', borderRadius: 999,
              background: mode === m
                ? (m === 'med' ? L_PALETTE.teal : L_PALETTE.gold)
                : 'transparent',
              color: mode === m ? L_PALETTE.ink : L_PALETTE.ivory,
              transition: 'all 240ms',
            }}>{m === 'med' ? 'Médica' : 'Residencial'}</button>
          ))}
        </div>
      </div>

      {/* Main composition */}
      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: `${vp.mobile ? 140 : 0}px ${vp.padX}px ${vp.mobile ? 220 : 0}px`,
      }}>
        {/* Eyebrow */}
        <div style={{
          fontFamily: L_SANS, fontWeight: 800,
          color: accent, fontSize: 13,
          letterSpacing: '0.45em', textTransform: 'uppercase',
          marginBottom: 32,
          transition: 'color 400ms',
        }}>{copy.eyebrow}</div>

        {/* Title */}
        <div style={{
          fontFamily: L_SERIF,
          color: L_PALETTE.ivory,
          fontSize: 'clamp(80px, 13vw, 220px)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          fontWeight: 400,
        }}>
          {copy.title}
          <em style={{
            color: accent, fontStyle: 'italic',
            marginLeft: '0.08em',
            transition: 'color 400ms',
          }}>{copy.one}.</em>
        </div>

        {/* Tag */}
        <div style={{
          marginTop: 56,
          fontFamily: L_SERIF, fontStyle: 'italic',
          color: L_PALETTE.ice,
          fontSize: 'clamp(28px, 3vw, 44px)',
          lineHeight: 1.25,
          maxWidth: 920,
        }}>
          {copy.tag}<br/>
          <span style={{ color: accent, transition: 'color 400ms' }}>{copy.tag2}</span>
        </div>

        {/* Meta strip */}
        <div style={{
          marginTop: 64,
          fontFamily: L_MONO,
          color: 'rgba(245,241,232,0.78)',
          fontSize: 14,
          letterSpacing: '0.18em',
        }}>{copy.meta}</div>

        {/* CTA row */}
        <div style={{
          marginTop: 56,
          display: 'flex', gap: 16, flexWrap: 'wrap',
        }}>
          <a href="#contacto" style={{
            padding: '18px 36px',
            background: accent, color: L_PALETTE.ink,
            fontFamily: L_SANS, fontWeight: 700, fontSize: 13,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            textDecoration: 'none', borderRadius: 999,
            transition: 'all 240ms',
          }}>Solicitar expediente y due diligence</a>
          <a href="#predio" style={{
            padding: '18px 36px',
            background: 'transparent', color: L_PALETTE.ivory,
            border: `1px solid rgba(245,241,232,0.4)`,
            fontFamily: L_SANS, fontWeight: 700, fontSize: 13,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            textDecoration: 'none', borderRadius: 999,
          }}>Recorrer la propiedad</a>
        </div>
      </div>

      {/* Bottom: scroll indicator + price stamp */}
      <div style={{
        position: 'absolute', bottom: vp.mobile ? 32 : 80,
        left: vp.padX, right: vp.padX, zIndex: 2,
        display: 'flex',
        flexDirection: vp.mobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: vp.mobile ? 'flex-start' : 'flex-end',
        gap: vp.mobile ? 16 : 0,
      }}>
        <div style={{
          fontFamily: L_MONO, color: 'rgba(245,241,232,0.5)', fontSize: 11,
          letterSpacing: '0.32em', textTransform: 'uppercase',
        }}>
          ↓ Scroll
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: L_SANS, fontWeight: 800, color: L_PALETTE.ink,
            background: L_PALETTE.gold, fontSize: 10,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            padding: '5px 10px 5px 13px', borderRadius: 2,
          }}>Oportunidad</div>
          <div style={{
            marginTop: 8,
            fontFamily: L_SERIF, color: L_PALETTE.ivory, fontSize: 36,
            letterSpacing: '-0.01em',
          }}>$3,100,000 <span style={{ color: accent, transition: 'color 400ms' }}>MXN</span></div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { L_Nav, L_AmbientBar, L_Chapter, L_Hero });
