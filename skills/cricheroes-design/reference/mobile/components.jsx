// CricHeroes mobile, shared UI primitives
// Loaded after React + ios-frame.jsx + icons.jsx

// ──────────────────────────────────────────────────────────────
// Tokens (mirror colors_and_type.css so we can use them in JS)
// ──────────────────────────────────────────────────────────────
const CH = {
  red:   'rgb(226,28,40)',
  redS:  'rgba(226,28,40,0.14)',
  teal:  'rgb(24,149,143)',
  tealS: 'rgba(24,149,143,0.16)',
  black: 'rgb(11,11,11)',
  white: 'rgb(254,255,255)',
  bg:    'rgb(243,243,243)',
  g6:    'rgb(242,242,247)',
  g5:    'rgb(229,229,234)',
  g3:    'rgb(199,199,204)',
  g:     'rgb(142,142,147)',
  l1:    'rgb(11,11,11)',
  l2:    'rgba(11,11,11,0.6)',
  l3:    'rgba(11,11,11,0.3)',
  div:   'rgba(11,11,11,0.10)',
  divS:  'rgba(11,11,11,0.18)',
  font:  '"Ubuntu Sans", -apple-system, system-ui, sans-serif',
  shadow1: '0 1px 2px rgba(11,11,11,0.06)',
  shadow2: '0 2px 8px rgba(11,11,11,0.08)',
};

// ──────────────────────────────────────────────────────────────
// Avatar
// ──────────────────────────────────────────────────────────────
function Avatar({ name = '', size = 40, shape = 'squircle', pro = false, hue = 200, src }) {
  const r = shape === 'round' ? '50%' : Math.round(size * 0.22) + 'px';
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  const proSize = Math.max(12, Math.round(size * 0.28));
  const proFs   = Math.max(7, Math.round(proSize * 0.55));
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <div style={{
        width: size, height: size, borderRadius: r, overflow: 'hidden',
        background: src ? '#000' : `linear-gradient(135deg, hsl(${hue} 45% 55%), hsl(${hue} 50% 30%))`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', font: `700 ${Math.round(size*0.35)}px/1 ${CH.font}`,
        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.18)',
      }}>
        {src ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/> : initials}
      </div>
      {pro && <div style={{
        position: 'absolute', top: -2, right: -2,
        background: CH.teal, color: 'white',
        font: `800 ${proFs}px/1 ${CH.font}`,
        padding: `${Math.round(proFs*0.4)}px ${Math.round(proFs*0.7)}px`,
        borderRadius: 999, letterSpacing: '0.3px',
        boxShadow: '0 0 0 2px white',
      }}>PRO</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Button (matches CHButtons specs from Figma)
// ──────────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', icon, onClick, style }) {
  const sizes = {
    sm: { padding: '8px 16px', font: '700 13px/1 ' + CH.font, gap: 4 },
    md: { padding: '12px 20px', font: '700 14px/1 ' + CH.font, gap: 6 },
    lg: { padding: '14px 24px', font: '700 16px/1 ' + CH.font, gap: 8 },
  };
  const v = {
    primary:        { background: CH.teal, color: 'white' },
    primarySoft:    { background: CH.tealS, color: CH.teal },
    primaryOutline: { background: 'transparent', color: CH.teal, boxShadow: `inset 0 0 0 1.5px ${CH.teal}` },
    primaryText:    { background: 'transparent', color: CH.teal, padding: sizes[size].padding.split(' ').map((p,i)=>i%2?'0':p).join(' ') },
    destructive:    { background: CH.red, color: 'white' },
    destructiveSoft:{ background: CH.redS, color: CH.red },
    neutral:        { background: 'rgba(142,142,147,0.16)', color: CH.black },
    black:          { background: CH.black, color: 'white' },
  }[variant] || {};
  return (
    <button onClick={onClick} style={{
      ...sizes[size], ...v, ...style,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      border: 'none', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
    }}>
      {icon && <CHIcon name={icon} size={size==='sm'?16:18} />}
      {children}
    </button>
  );
}

// ──────────────────────────────────────────────────────────────
// Chip / pill
// ──────────────────────────────────────────────────────────────
function Chip({ children, variant = 'neutral', icon, style }) {
  const v = {
    neutral:    { background: 'rgba(142,142,147,0.16)', color: CH.black },
    tealSolid:  { background: CH.teal, color: 'white' },
    tealSoft:   { background: CH.tealS, color: CH.teal },
    redSolid:   { background: CH.red, color: 'white' },
    redSoft:    { background: CH.redS, color: CH.red },
    outline:    { background: 'transparent', color: CH.black, boxShadow: `inset 0 0 0 1px ${CH.divS}` },
  }[variant];
  return (
    <span style={{
      ...v, ...style,
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '6px 10px', borderRadius: 999,
      font: '600 12px/1 ' + CH.font, whiteSpace: 'nowrap',
    }}>
      {icon && <CHIcon name={icon} size={14} />}
      {children}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────
// Section header (used in stacked content)
// ──────────────────────────────────────────────────────────────
function Section({ title, action, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      {(title || action) && (
        <div style={{ display: 'flex', alignItems: 'baseline', padding: '0 16px' }}>
          <div style={{ font: '700 15px/1.2 ' + CH.font, color: CH.l1, flex: 1 }}>{title}</div>
          {action && <button onClick={action.onClick}
            style={{ background: 'none', border: 'none', padding: 0,
              color: CH.teal, font: '600 13px/1 ' + CH.font, cursor: 'pointer' }}>
            {action.label} ›
          </button>}
        </div>
      )}
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// LIVE chip (white-on-red with pulsing dot)
// ──────────────────────────────────────────────────────────────
function LiveTag({ dark = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 999,
      background: dark ? 'rgba(255,255,255,0.18)' : CH.red,
      color: 'white',
      font: '800 10px/1 ' + CH.font, letterSpacing: 0.4,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: 'white',
        boxShadow: '0 0 0 2px rgba(255,255,255,0.35)',
        animation: 'pulse 1.2s ease-in-out infinite',
      }}/>
      LIVE
    </span>
  );
}

// ──────────────────────────────────────────────────────────────
// Score card, signature CricHeroes element
//   Header (tournament + status pill), divider, teams (bold name +
//   score on right, dim name if yet to bat), divider, status line,
//   teal action links on bottom-right.
//   `match.state`: 'live' | 'upcoming' | 'result'
// ──────────────────────────────────────────────────────────────
function TeamRow({ t }) {
  const yetToBat = t.score == null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        flex: 1, minWidth: 0,
        font: `${yetToBat ? '400' : '700'} 16px/1.2 ${CH.font}`,
        color: CH.l1,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{t.name}</div>
      {!yetToBat && (
        <div style={{ font: '700 18px/1 ' + CH.font, color: CH.l1, flex: 'none' }}>
          {t.score}/{t.wkts}
          <span style={{ font: '400 12px ' + CH.font, color: CH.l2, marginLeft: 4 }}>
            ({t.overs} Ov)
          </span>
        </div>
      )}
    </div>
  );
}

function StatusPill({ state }) {
  const styles = {
    live:     { background: CH.red,   color: 'white', label: 'Live' },
    upcoming: { background: 'rgb(255,158,27)', color: 'white', label: 'Upcoming' },
    result:   { background: CH.black, color: 'white', label: 'Result' },
  };
  const s = styles[state] || styles.live;
  return (
    <span style={{
      flex: 'none',
      padding: '4px 12px', borderRadius: 999,
      background: s.background, color: s.color,
      font: '600 12px/1.3 ' + CH.font, whiteSpace: 'nowrap',
    }}>{s.label}</span>
  );
}

function ScoreCard({ match, onClick }) {
  const actions = match.actions || (
    match.state === 'upcoming' ? ['Insights', 'Squads'] : ['Insights', 'Table', 'Leaderboard']
  );
  return (
    <div onClick={onClick} style={{
      background: 'white', borderRadius: 16, overflow: 'hidden',
      boxShadow: CH.shadow2, cursor: onClick ? 'pointer' : 'default',
      margin: '0 16px',
    }}>
      {/* header */}
      <div style={{
        padding: '14px 16px 12px',
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '700 14px/1.3 ' + CH.font, color: CH.l1 }}>
            {match.tournament}
            {match.subtitle && <span style={{ fontWeight: 400, color: CH.l2 }}>, {match.subtitle}</span>}
          </div>
          <div style={{ font: '400 12px/1.4 ' + CH.font, color: CH.l1, marginTop: 4 }}>
            {match.date}<span style={{ color: CH.l3, margin: '0 6px' }}>|</span>
            {match.overs} Ov.<span style={{ color: CH.l3, margin: '0 6px' }}>|</span>
            {match.venue}
          </div>
        </div>
        <StatusPill state={match.state} />
      </div>
      <div style={{ height: 1, background: CH.div, margin: '0 16px' }} />
      {/* teams */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TeamRow t={match.a} />
        <TeamRow t={match.b} />
      </div>
      <div style={{ height: 1, background: CH.div, margin: '0 16px' }} />
      {/* status line */}
      <div style={{
        padding: '12px 16px 4px',
        font: '400 13px/1.4 ' + CH.font, color: CH.l1,
      }}>{match.status}</div>
      {/* actions */}
      <div style={{
        padding: '8px 16px 14px',
        display: 'flex', justifyContent: 'flex-end', gap: 18,
        font: '600 13px/1 ' + CH.font, color: CH.teal,
      }}>
        {actions.map(a => <span key={a}>{a}</span>)}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// List card + row (iOS grouped list, with CricHeroes flavor)
// ──────────────────────────────────────────────────────────────
function ListCard({ children, style }) {
  return (
    <div style={{
      background: 'white', borderRadius: 12, overflow: 'hidden',
      boxShadow: CH.shadow1, margin: '0 16px',
      ...style,
    }}>{children}</div>
  );
}

function Row({ icon, iconBg, iconColor, title, subtitle, accessory, onClick, last = false }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      borderBottom: last ? 'none' : `1px solid ${CH.div}`,
      cursor: onClick ? 'pointer' : 'default',
    }}>
      {icon && <div style={{
        width: 36, height: 36, borderRadius: 10, flex: 'none',
        background: iconBg || CH.tealS, color: iconColor || CH.teal,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><CHIcon name={icon} size={20} /></div>}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ font: '600 14px/1.2 ' + CH.font, color: CH.l1,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        {subtitle && <div style={{ font: '400 12px/1.3 ' + CH.font, color: CH.l2 }}>{subtitle}</div>}
      </div>
      {accessory != null
        ? (typeof accessory === 'string'
            ? <span style={{ font: '600 13px ' + CH.font, color: CH.teal }}>{accessory}</span>
            : accessory)
        : <span style={{ color: CH.l3, font: '300 18px/1 ' + CH.font }}>›</span>
      }
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Bottom tab bar (with center FAB)
// ──────────────────────────────────────────────────────────────
function TabBar({ current, onChange, onStart }) {
  const tabs = [
    { key: 'home',      label: 'Home',      icon: 'home' },
    { key: 'cricket',   label: 'Cricket',   icon: 'cricket' },
    { key: 'fab' }, // FAB slot
    { key: 'looking',   label: 'Looking',   icon: 'looking' },
    { key: 'menu',      label: 'Menu',      icon: 'menu' },
  ];
  return (
    <div style={{
      position: 'relative',
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      background: 'white', borderTop: `0.5px solid ${CH.divS}`,
      padding: '6px 4px 36px',
    }}>
      {tabs.map(t => t.key === 'fab' ? (
        <div key="fab" style={{ position: 'relative' }}>
          <button onClick={onStart} style={{
            position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
            width: 56, height: 56, borderRadius: '50%', border: 'none',
            background: CH.red, color: 'white',
            boxShadow: '0 6px 16px rgba(226,28,40,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <CHIcon name="plus" size={26} color="white" />
          </button>
        </div>
      ) : (
        <button key={t.key} onClick={() => onChange(t.key)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          color: current === t.key ? CH.teal : CH.l2,
          padding: '6px 0',
        }}>
          <CHIcon name={current === t.key && t.icon === 'home' ? 'homeF' : t.icon} size={22} />
          <span style={{ font: '500 10px/1 ' + CH.font }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Top nav bar (CH style, solid red or white)
// ──────────────────────────────────────────────────────────────
function TopBar({ title, left, right, theme = 'red', sub, safeTop = 54 }) {
  const dark = theme === 'red' || theme === 'black';
  const bg = theme === 'red' ? CH.red : theme === 'black' ? CH.black : 'white';
  return (
    <div style={{
      background: bg, color: dark ? 'white' : CH.l1,
      padding: `${safeTop}px 12px 12px`,
      borderBottom: dark ? 'none' : `0.5px solid ${CH.div}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
        <div style={{ width: 32 }}>{left}</div>
        <div style={{ flex: 1, textAlign: 'center', font: '700 16px/1.2 ' + CH.font,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ width: 32, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
      </div>
      {sub && <div style={{ textAlign: 'center', font: '500 11px/1 ' + CH.font, marginTop: 4, opacity: 0.85 }}>{sub}</div>}
    </div>
  );
}

function IconBtn({ icon, onClick, color = 'currentColor', size = 22 }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', padding: 4, cursor: 'pointer', color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}><CHIcon name={icon} size={size} /></button>
  );
}

// ──────────────────────────────────────────────────────────────
// Scrollable body container, fills inside iOS frame
// ──────────────────────────────────────────────────────────────
function Body({ children, style }) {
  return (
    <div style={{
      flex: 1, overflowY: 'auto', background: CH.bg,
      display: 'flex', flexDirection: 'column', gap: 16,
      padding: '16px 0 100px', ...style,
    }}>{children}</div>
  );
}

// Export
Object.assign(window, {
  CH, Avatar, Btn, Chip, Section, LiveTag, ScoreCard, ListCard, Row, TabBar, TopBar, IconBtn, Body, TeamRow, StatusPill,
});
