// CricHeroes mobile, screens
// Loaded after components.jsx. Each screen returns a column that fills
// the iOS frame body. Screens get `nav({to})` for navigation.

// ──────────────────────────────────────────────────────────────
// Sample data
// ──────────────────────────────────────────────────────────────
const MATCHES = [
  {
    id: 'm1', state: 'live',
    tournament: 'League Matches', subtitle: 'Mohali Premier League · Final',
    date: '25-May-26', overs: '20', venue: 'PCA Stadium, Mohali',
    a: { name: 'Mohali Strikers', score: 182, wkts: 6, overs: '20' },
    b: { name: 'Royal Chargers',  score: 168, wkts: 7, overs: '18.3' },
    status: 'Royal Chargers need 15 runs in 9 balls',
  },
  {
    id: 'm2', state: 'live',
    tournament: 'League Matches', subtitle: 'Box Cricket Cup',
    date: '25-May-26', overs: '10', venue: 'Bopal, Ahmedabad, Sardar Patel Stadium',
    a: { name: 'Capitals XI', score: 88, wkts: 3, overs: '10' },
    b: { name: 'Sky Riders',  score: 54, wkts: 2, overs: '6.2' },
    status: 'Sky Riders need 35 runs in 22 balls',
  },
  {
    id: 'm3', state: 'upcoming',
    tournament: 'Individual match',
    date: '19-May-26', overs: '20', venue: 'Sector 35 Sunday League',
    a: { name: 'Trident CC' },
    b: { name: 'Phoenix XI' },
    status: 'Match scheduled to begin on Sunday, 19th May at 4:30 PM',
    actions: ['Insights', 'Squads'],
  },
];

const PLAYERS = [
  { name: 'Arjun Sharma',   role: 'All-Rounder',  hue: 220, pro: true,  stats: 'M 184 · R 3,420 · W 96' },
  { name: 'Vikram Kohli',   role: 'Batsman',      hue: 12,  pro: false, stats: 'M 92 · R 4,108 · SR 138.4' },
  { name: 'Rahul Mehta',    role: 'Wicket-keeper', hue: 280, pro: true, stats: 'M 64 · D 78 · St 12' },
  { name: 'Sandeep Patel',  role: 'Bowler',       hue: 140, pro: false, stats: 'M 41 · W 67 · Econ 6.4' },
];

// ──────────────────────────────────────────────────────────────
// HOME, feed of live + upcoming + your matches
// ──────────────────────────────────────────────────────────────
function ScreenHome({ nav }) {
  return (
    <>
      <TopBar
        theme="red"
        title=""
        sub={null}
        left={<IconBtn icon="menu" color="white" />}
        right={
          <div style={{ display: 'flex', gap: 4 }}>
            <IconBtn icon="search" color="white" />
            <IconBtn icon="bell" color="white" />
          </div>
        }
      />
      {/* Custom red header content (replaces title) */}
      <div style={{ background: CH.red, color: 'white', padding: '0 16px 18px' }}>
        <div style={{ font: '800 24px/1.1 ' + CH.font, letterSpacing: -0.3 }}>Good evening, Arjun</div>
        <div style={{ font: '400 13px ' + CH.font, opacity: 0.85, marginTop: 4 }}>
          3 live matches · 2 from teams you follow
        </div>
        {/* Filter chips on red */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto' }}>
          {['Live', 'My matches', 'Following', 'Around me', 'Tournaments'].map((c, i) => (
            <span key={c} style={{
              padding: '7px 12px', borderRadius: 999, whiteSpace: 'nowrap',
              background: i === 0 ? 'white' : 'rgba(255,255,255,0.18)',
              color: i === 0 ? CH.red : 'white',
              font: '600 12px/1 ' + CH.font,
            }}>{c}</span>
          ))}
        </div>
      </div>

      <Body>
        <Section title="Live now" action={{ label: 'See all' }}>
          {MATCHES.filter(m => m.state === 'live').map(m =>
            <ScoreCard key={m.id} match={m} onClick={() => nav({ to: 'match', match: m })} />)}
        </Section>

        <Section title="Starting soon">
          {MATCHES.filter(m => m.state === 'upcoming').map(m =>
            <ScoreCard key={m.id} match={m} onClick={() => nav({ to: 'match', match: m })} />)}
        </Section>

        <Section title="Quick actions">
          <ListCard>
            <Row icon="ball"     title="Score a Match"      subtitle="Open scorer for a fixture"      accessory="" />
            <Row icon="trophy"   title="Create Tournament"  subtitle="Round-robin, knockout, league"  accessory="" />
            <Row icon="add_user" title="Find Cricketers"    subtitle="Players near you"               accessory="" last />
          </ListCard>
        </Section>

        <Section title="Players you might know" action={{ label: 'See all' }}>
          <div style={{ display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto' }}>
            {PLAYERS.map(p => (
              <div key={p.name} onClick={() => nav({ to: 'profile', player: p })}
                style={{
                  flex: 'none', width: 140, background: 'white', borderRadius: 14,
                  padding: 14, boxShadow: CH.shadow1,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  cursor: 'pointer',
                }}>
                <Avatar name={p.name} size={64} hue={p.hue} pro={p.pro} />
                <div style={{ font: '600 13px/1.2 ' + CH.font, color: CH.l1, textAlign: 'center' }}>{p.name}</div>
                <div style={{ font: '400 11px ' + CH.font, color: CH.l2 }}>{p.role}</div>
                <Btn variant="primarySoft" size="sm" style={{ width: '100%' }}>+ Follow</Btn>
              </div>
            ))}
          </div>
        </Section>
      </Body>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// MATCH DETAIL, live scoring view
// ──────────────────────────────────────────────────────────────
function abbr(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

function ScreenMatch({ nav, match = MATCHES[0] }) {
  const recent = [
    { b: 1, r: '4' }, { b: 2, r: '·' }, { b: 3, r: '1' }, { b: 4, r: 'W', wkt: true }, { b: 5, r: '6' }, { b: 6, r: '2' },
  ];
  return (
    <>
      <TopBar
        theme="red" title={`${abbr(match.a.name)} vs ${abbr(match.b.name)}`}
        sub={match.tournament}
        left={<IconBtn icon="back" color="white" onClick={() => nav({ to: 'home' })} />}
        right={<IconBtn icon="share" color="white" />}
      />

      {/* Score banner */}
      <div style={{
        background: CH.red, color: 'white', padding: '0 16px 18px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 4 }}>
          <div style={{ flex: 1 }}>
            <div style={{ font: '500 11px ' + CH.font, opacity: 0.8 }}>{match.b.name} batting</div>
            <div style={{ font: '800 36px/1 ' + CH.font, letterSpacing: -1, marginTop: 4 }}>
              {match.b.score}<span style={{ font: '700 18px ' + CH.font, opacity: 0.85 }}>/{match.b.wkts}</span>
            </div>
            <div style={{ font: '400 12px ' + CH.font, opacity: 0.85, marginTop: 4 }}>({match.b.overs} ov · CRR 9.14)</div>
          </div>
          <div style={{ textAlign: 'right', alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ font: '500 11px ' + CH.font, opacity: 0.8 }}>Target</div>
            <div style={{ font: '800 22px/1 ' + CH.font, marginTop: 4 }}>{match.a.score + 1}</div>
            <div style={{ font: '500 11px ' + CH.font, marginTop: 4 }}>
              Need <strong style={{ fontWeight: 700 }}>15 in 9</strong>
            </div>
          </div>
        </div>
      </div>

      <Body style={{ paddingTop: 14 }}>
        {/* Segmented tabs */}
        <div style={{ margin: '0 16px', background: 'white', borderRadius: 10, padding: 4, display: 'flex', boxShadow: CH.shadow1 }}>
          {['Live', 'Scorecard', 'Squad', 'Stats'].map((t, i) => (
            <div key={t} style={{
              flex: 1, textAlign: 'center', padding: '8px 0',
              borderRadius: 8, font: '600 12px/1 ' + CH.font,
              background: i === 0 ? CH.tealS : 'transparent',
              color: i === 0 ? CH.teal : CH.l2,
            }}>{t}</div>
          ))}
        </div>

        {/* This over */}
        <Section title="This over · 18.1 → 18.6">
          <div style={{ margin: '0 16px', background: 'white', borderRadius: 12, padding: 14, boxShadow: CH.shadow1 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {recent.map(b => (
                <div key={b.b} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: b.wkt ? CH.red : b.r === '·' ? CH.g6 : b.r === '6' || b.r === '4' ? CH.tealS : CH.g6,
                  color: b.wkt ? 'white' : b.r === '6' || b.r === '4' ? CH.teal : CH.l1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  font: '700 13px/1 ' + CH.font,
                }}>{b.r}</div>
              ))}
            </div>
            <div style={{ marginTop: 12, font: '500 12px ' + CH.font, color: CH.l2 }}>
              R Sharma to V Patel · <strong style={{ color: CH.l1 }}>13 runs</strong> · 1 wicket
            </div>
          </div>
        </Section>

        {/* Batsmen */}
        <Section title="Batsmen">
          <ListCard style={{ padding: '4px 0' }}>
            <Row icon={null}
              title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                V Patel <span style={{ color: CH.teal, font: '700 11px ' + CH.font }}>●</span>
              </span>}
              subtitle="42 (28) · 4s: 3 · 6s: 2 · SR 150"
              accessory={<span style={{ font: '800 16px ' + CH.font, color: CH.l1 }}>42</span>}
            />
            <Row icon={null}
              title="K Iyer"
              subtitle="18 (14) · 4s: 2 · SR 128.5"
              accessory={<span style={{ font: '800 16px ' + CH.font, color: CH.l1 }}>18</span>}
              last
            />
          </ListCard>
        </Section>

        {/* Bowler */}
        <Section title="Bowler">
          <ListCard>
            <Row icon="ball" iconBg={CH.redS} iconColor={CH.red}
              title="R Sharma"
              subtitle="3.3 ov · 2/28 · Econ 8.0"
              accessory={<span style={{ font: '800 16px ' + CH.font, color: CH.red }}>2/28</span>}
              last
            />
          </ListCard>
        </Section>

        {/* Actions */}
        <div style={{ margin: '0 16px', display: 'flex', gap: 10 }}>
          <Btn variant="primary" size="md" icon="message" style={{ flex: 1 }}>Commentary</Btn>
          <Btn variant="primarySoft" size="md" icon="share" style={{ flex: 1 }}>Share match</Btn>
        </div>
      </Body>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// PROFILE, player career
// ──────────────────────────────────────────────────────────────
function ScreenProfile({ nav, player = PLAYERS[0] }) {
  const stats = [
    { k: 'Matches', v: 184 },
    { k: 'Runs',    v: '3,420' },
    { k: 'Avg',     v: 38.4 },
    { k: 'SR',      v: 132.1 },
    { k: 'Wickets', v: 96 },
    { k: 'Econ',    v: 6.8 },
  ];
  const badges = [
    { i: 'award',    l: 'Player of the Match', n: 14, c: CH.red },
    { i: 'fire',     l: 'Hat-tricks',          n: 2,  c: CH.red },
    { i: 'trophy',   l: 'Trophies won',        n: 7,  c: CH.teal },
    { i: 'allRound', l: 'All-Rounder',         n: '',  c: CH.teal },
  ];
  return (
    <>
      <TopBar
        theme="red" title="Player"
        left={<IconBtn icon="back" color="white" onClick={() => nav({ to: 'home' })} />}
        right={<IconBtn icon="more" color="white" />}
      />
      {/* Hero */}
      <div style={{ background: CH.red, color: 'white', padding: '4px 16px 22px',
                    display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <Avatar name={player.name} size={84} hue={player.hue} pro={player.pro} />
        <div style={{ flex: 1, paddingTop: 4 }}>
          <div style={{ font: '800 22px/1.1 ' + CH.font, letterSpacing: -0.3 }}>{player.name}</div>
          <div style={{ font: '500 13px ' + CH.font, opacity: 0.9, marginTop: 4 }}>
            {player.role} · Right-hand bat · Mohali, IN
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <Btn size="sm" variant="primarySoft"
                 style={{ background: 'white', color: CH.red }}>+ Follow</Btn>
            <Btn size="sm" variant="primaryOutline"
                 style={{ color: 'white', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.6)' }}
                 icon="message">Message</Btn>
          </div>
        </div>
      </div>

      <Body style={{ paddingTop: 14 }}>
        {/* Stats grid */}
        <div style={{ margin: '0 16px', background: 'white', borderRadius: 14, padding: 4,
                      boxShadow: CH.shadow1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={s.k} style={{
              padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              borderRight: i % 3 !== 2 ? `1px solid ${CH.div}` : 'none',
              borderBottom: i < 3 ? `1px solid ${CH.div}` : 'none',
            }}>
              <div style={{ font: '800 18px/1 ' + CH.font }}>{s.v}</div>
              <div style={{ font: '500 10px/1 ' + CH.font, color: CH.l2, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.k}</div>
            </div>
          ))}
        </div>

        <Section title="Badges &amp; achievements">
          <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto' }}>
            {badges.map(b => (
              <div key={b.l} style={{
                flex: 'none', width: 110, background: 'white', borderRadius: 12, padding: 12,
                boxShadow: CH.shadow1, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: b.c === CH.red ? CH.redS : CH.tealS, color: b.c,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><CHIcon name={b.i} size={20} /></div>
                <div style={{ font: '700 14px/1 ' + CH.font }}>{b.n}</div>
                <div style={{ font: '500 11px/1.2 ' + CH.font, color: CH.l2 }}>{b.l}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Recent matches" action={{ label: 'View all' }}>
          <ListCard>
            <Row icon="ball"  iconBg={CH.tealS} iconColor={CH.teal}
                 title="Mohali Strikers vs Royal Chargers"
                 subtitle="62 (38) · MoM · 14 Sep"
                 accessory={<span style={{ font: '700 12px ' + CH.font, color: CH.teal }}>Won</span>} />
            <Row icon="bat"   iconBg={CH.tealS} iconColor={CH.teal}
                 title="Capitals XI vs Trident CC"
                 subtitle="28 (24) · 2/19 · 12 Sep"
                 accessory={<span style={{ font: '700 12px ' + CH.font, color: CH.red }}>Lost</span>} />
            <Row icon="trophy" iconBg={CH.redS} iconColor={CH.red}
                 title="Sector 35 Sunday League"
                 subtitle="Trophy · Captain · 1 Sep"
                 accessory="" last />
          </ListCard>
        </Section>
      </Body>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// LOOKING, find opponents / players / teams
// ──────────────────────────────────────────────────────────────
function ScreenLooking({ nav }) {
  const looking = [
    { icon: 'groups',  bg: CH.tealS, c: CH.teal, t: 'A team to join as',           s: 'I want to play for someone' },
    { icon: 'add_user',bg: CH.redS,  c: CH.red,  t: 'A player to join my team',     s: '3 spots open · T20 squad' },
    { icon: 'ball',    bg: CH.tealS, c: CH.teal, t: 'An opponent to play a match',  s: 'Friendly · Tournament · League' },
    { icon: 'trophy',  bg: CH.redS,  c: CH.red,  t: 'A tournament to participate',  s: 'Filter by city & format' },
  ];
  const requests = [
    { name: 'Sky Riders',      role: 'Need 2 batsmen for Sunday',  hue: 220, ground: 'Sector 35 · Mohali',  fmt: 'T20' },
    { name: 'Phoenix XI',      role: 'Need 1 fast bowler',         hue: 18,  ground: 'Sahibzada Ground',    fmt: 'T10' },
    { name: 'Capitals Women',  role: 'Need wicket-keeper',         hue: 280, ground: 'PCA Stadium',         fmt: 'T20' },
  ];
  return (
    <>
      <TopBar theme="white" title="Looking for…"
        left={<IconBtn icon="back" color={CH.l1} onClick={() => nav({ to: 'home' })} />}
        right={<IconBtn icon="filter" color={CH.l1} />}
      />

      <Body style={{ paddingTop: 14 }}>
        {/* Category grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 16px' }}>
          {looking.map(L => (
            <div key={L.t} style={{
              background: 'white', borderRadius: 14, padding: 14,
              boxShadow: CH.shadow1, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 110,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: L.bg, color: L.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><CHIcon name={L.icon} size={22} /></div>
              <div>
                <div style={{ font: '700 14px/1.2 ' + CH.font, color: CH.l1 }}>{L.t}</div>
                <div style={{ font: '400 11px/1.3 ' + CH.font, color: CH.l2, marginTop: 4 }}>{L.s}</div>
              </div>
            </div>
          ))}
        </div>

        <Section title="Open requests near you" action={{ label: 'See all' }}>
          <ListCard>
            {requests.map((r, i) => (
              <Row key={r.name}
                icon={null}
                title={r.name}
                subtitle={`${r.role} · ${r.fmt} · ${r.ground}`}
                accessory={<Btn variant="primary" size="sm">Apply</Btn>}
                last={i === requests.length - 1}
              />
            ))}
          </ListCard>
        </Section>

        <Section title="Filters">
          <div style={{ display: 'flex', gap: 8, padding: '0 16px', flexWrap: 'wrap' }}>
            <Chip variant="tealSoft" icon="location">Mohali</Chip>
            <Chip variant="neutral" icon="calendar">This weekend</Chip>
            <Chip variant="neutral">T20</Chip>
            <Chip variant="neutral">T10</Chip>
            <Chip variant="outline">Friendly</Chip>
            <Chip variant="outline">League</Chip>
          </div>
        </Section>
      </Body>
    </>
  );
}

Object.assign(window, { ScreenHome, ScreenMatch, ScreenProfile, ScreenLooking });
