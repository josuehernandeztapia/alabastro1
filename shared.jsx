// shared.jsx — brand palette + reusable bits used by reels A/B/C
// (relies on globals from animations.jsx: useSprite, useTime, Sprite, Easing, clamp, interpolate)

const PALETTE = {
  navy:    '#0F1E47',
  navy2:   '#1E3164',
  ink:     '#070E27',
  ice:     '#CADCFC',
  gold:    '#C9A961',
  goldDk:  '#A8884A',
  cream:   '#F5F1E8',
  teal:    '#14B8A6',
  tealDk:  '#0D9488',
  green:   '#10B981',
  white:   '#FFFFFF',
};

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS  = 'Helvetica, Arial, sans-serif';
const MONO  = 'Menlo, "Courier New", monospace';

// Lock-up: gold dot + brand text. Position with absolute parent.
function BrandLockup({ x = 60, y = 60, opacity = 1, color = PALETTE.white, scale = 1 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, opacity,
      display: 'flex', alignItems: 'center', gap: 18 * scale,
      transform: `scale(${scale})`, transformOrigin: 'left center',
    }}>
      <div style={{
        width: 14, height: 14, borderRadius: '50%',
        background: PALETTE.gold,
        boxShadow: `0 0 22px ${PALETTE.gold}66`,
      }}/>
      <div style={{
        fontFamily: SANS, fontWeight: 800, color,
        letterSpacing: '0.36em', fontSize: 24,
      }}>ALABASTRO 1</div>
    </div>
  );
}

// Inner gold hairline frame
function GoldFrame({ inset = 50, opacity = 0.35, color = PALETTE.gold }) {
  return (
    <div style={{
      position: 'absolute',
      left: inset, top: inset, right: inset, bottom: inset,
      border: `1px solid ${color}`,
      opacity,
      pointerEvents: 'none',
    }}/>
  );
}

// Vignette so text stays legible over imagery
function Vignette({ strength = 0.55 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at center, transparent 35%, rgba(7,14,39,${strength}) 100%)`,
      pointerEvents: 'none',
    }}/>
  );
}

// Static film-grain-ish noise (pure CSS)
function Grain({ opacity = 0.05 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity,
      pointerEvents: 'none',
      backgroundImage:
        `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>")`,
      backgroundSize: '200px 200px',
    }}/>
  );
}

// Animated counter — interpolates from `from` to `to` over Sprite's duration*fraction.
function Counter({ from = 0, to, prefix = '', suffix = '', decimals = 0, fraction = 0.7, ease = Easing.easeOutCubic, style }) {
  const { localTime, duration } = useSprite();
  const t = clamp(localTime / (duration * fraction), 0, 1);
  const v = from + (to - from) * ease(t);
  const txt = v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return <span style={{ fontVariantNumeric: 'tabular-nums', ...style }}>{prefix}{txt}{suffix}</span>;
}

// Wipe reveal — clips a child by a moving inset.
function Wipe({ from = 'bottom', start = 0, dur = 0.7, ease = Easing.easeInOutCubic, children, style }) {
  const { localTime } = useSprite();
  const t = ease(clamp((localTime - start) / dur, 0, 1));
  let clip;
  switch (from) {
    case 'left':   clip = `inset(0 ${(1-t)*100}% 0 0)`; break;
    case 'right':  clip = `inset(0 0 0 ${(1-t)*100}%)`; break;
    case 'top':    clip = `inset(0 0 ${(1-t)*100}% 0)`; break;
    default:       clip = `inset(${(1-t)*100}% 0 0 0)`; // bottom = reveal from bottom up
  }
  return <div style={{ clipPath: clip, WebkitClipPath: clip, ...style }}>{children}</div>;
}

// Caption strip at bottom with a gold tick
function Caption({ children, y = 1720, opacity = 1, align = 'center' }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: y,
      textAlign: align, opacity,
      color: PALETTE.ice,
      fontFamily: SANS,
      fontSize: 30,
      letterSpacing: '0.06em',
    }}>
      {children}
    </div>
  );
}

// Eyebrow text — small + tracked-out + colored
function Eyebrow({ children, color = PALETTE.gold, size = 22, tracking = '0.45em', weight = 700, style }) {
  return (
    <span style={{
      fontFamily: SANS, fontWeight: weight, color,
      fontSize: size, letterSpacing: tracking,
      textTransform: 'uppercase',
      ...style,
    }}>{children}</span>
  );
}

// Trámite tick that draws itself.
function TramiteTick({ size = 28, color = PALETTE.gold, progress = 1 }) {
  const d = `M 5 ${size*0.55} L ${size*0.4} ${size*0.8} L ${size-4} ${size*0.25}`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <circle cx={size/2} cy={size/2} r={size/2 - 1}
        fill="none" stroke={color} strokeWidth="1.5" opacity="0.4"/>
      <path d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - progress}/>
    </svg>
  );
}

Object.assign(window, {
  PALETTE, SERIF, SANS, MONO,
  BrandLockup, GoldFrame, Vignette, Grain,
  Counter, Wipe, Caption, Eyebrow, TramiteTick,
});
