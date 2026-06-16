# CricHeroes Design System

**"Your cricket matters."**

A small, practical toolkit for designing CricHeroes — the home of grassroots cricket. Built to be used, not read end to end. For the working guide (tokens, audit checklist, design mode) see [SKILL.md](SKILL.md).

## What CricHeroes is

The app where local cricketers track scores, stats, tournaments and teams.

| Product | What it does | Where |
|---|---|---|
| CricHeroes | The main app — free scoring, teams, tournaments, stats, community | [cricheroes.com](https://cricheroes.com/) |
| CricHeroes Pro | Paid add-ons — live stream, highlights, DRS | cricheroes.com |
| CricHeroes Live | Smart cameras for live-streaming matches | cricheroes.com |
| CricHeroes Store | Cricket gear and merchandise | [store.cricheroes.com](https://store.cricheroes.com) |

The brand is a dependable team captain — inclusive, calm, credible. It celebrates ordinary players doing extraordinary things.

## Voice

Short, clear, warm sentences. State the facts, acknowledge the effort, keep moving. British spelling, sentence case, active voice, numerals for stats, `8:22 pm`, `Sept 3, 2025`, no emoji in product UI. Always **CricHeroes** — one word, two capitals. (Full do/don't table in `preview/voice.html`.)

## The look

Three words: **dynamic, versatile, credible**. A cricket ball in the air — energy on a curved path — balanced with the steadiness of a permanent record.

- **Colour** — Scarlet Red `#E21C28` = identity. Seafoam Teal `#18958F` = action. Charcoal `#1A1A1A` for ink, Khaki Gold `#CB8E40` for premium. **Red and teal never mix.**
- **Type** — Ubuntu Sans (100–900). Headings 600, emphasis 500, body 400. Tabular numbers for stats. Always sentence case. Barlow (`var(--ch-font-scorecard)`) is reserved for scorecards/stats.
- **Shapes** — the circle (the ball) and the curve (the ball in flight), used lightly.
- **Spacing** 4px grid · **corners** 8/12/16/pill · **borders** 1px `#E5E5EA` · **shadows** raised/overlay/modal only · **motion** 150ms, spring for success moments.

All tokens live in [`colors_and_type.css`](colors_and_type.css).

## Files

```
SKILL.md             Working guide — tokens, design mode, audit checklist
colors_and_type.css  Every colour, type, spacing, radius, shadow, motion token
assets/              icons.js, badge-pro.svg, parabola-bg.svg, pitch-bg.svg, favicon.ico
assets/logos/        Official logos — horizontal & vertical, each ± tagline (PNG); cricheroes-logo@2x.png (square)
fonts/               Ubuntu Sans Variable (Roman + Italic); Barlow (scorecard — 400/500/600/700)
preview/             One card each: colour, type, buttons, chips, inputs, shadows, radius, icons, match-cards, voice
ui_kits/app/         App Kit.html  — the mobile app
ui_kits/web/         Web Kit.html  — marketing site + organiser dashboard
reference/           Real App Kit source: components.jsx, icons.jsx, screens.js, iOS.jsx
```

Icons: `assets/icons.js` — inline SVG set. Add `<span data-icon="bat"></span>` placeholders and call `CH.icons.hydrate(document)` once.

## Not shipped yet

- The decorative `parabola-bg.svg` / `pitch-bg.svg` are approximations of the circle/curve motif — swap for officials when available. (Logos are official.)
- Sub-brand logos (Pro, Live, Store) — only the master logo set is here.
- No photography — use placeholders, ask for real grassroots photos.

## The short version

CricHeroes is a captain, not a cheerleader. State the score, respect the effort, get ready for the next ball.
