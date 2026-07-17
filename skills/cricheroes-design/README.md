# CricHeroes Design System

**"Your cricket matters."**

A small, practical toolkit for designing CricHeroes, the home of grassroots cricket. Built to be used, not read end to end. For the working guide (the one rule, token contract, design and audit modes) see [SKILL.md](SKILL.md); the full written spec is in [reference/AI-CONTEXT.md](reference/AI-CONTEXT.md).

## What CricHeroes is

The app where local cricketers track scores, stats, tournaments and teams.

| Product | What it does | Where |
|---|---|---|
| CricHeroes | The main app: free scoring, teams, tournaments, stats, community | [cricheroes.com](https://cricheroes.com/) |
| CricHeroes Pro | Paid add-ons: live stream, highlights, DRS | cricheroes.com |
| CricHeroes Live | Smart cameras for live-streaming matches | cricheroes.com |
| CricHeroes Store | Cricket gear and merchandise | [store.cricheroes.com](https://store.cricheroes.com) |

The brand is a dependable team captain: inclusive, calm, credible. It celebrates ordinary players doing extraordinary things.

## Voice

Short, clear, warm sentences. State the facts, acknowledge the effort, keep moving. British spelling, sentence case, active voice, numerals for stats, `8:22 pm`, `Sept 3, 2025`, no emoji in product UI. Always **CricHeroes**, one word, two capitals. (Full do and don't in [SKILL.md](SKILL.md).)

## The look

Three words: **dynamic, versatile, credible**. A cricket ball in the air, energy on a curved path, balanced with the steadiness of a permanent record.

- **Colour**: Scarlet Red `#E21C28` = identity. Seafoam Teal `#18958F` = action (hover `#157975`). Charcoal `#0B0B0B` for ink; grey, black and white carry about 90% of the UI. Khaki Gold `#CB8E40` for premium, sparingly. Red and teal never mix. Colour flows through 3 tiers of tokens and opacity stays live as `rgb(var(--rgb-*) / <alpha>)`, never a pre-blended hex.
- **Type**: Ubuntu Sans, weights 400 / 500 / 700 (700 is the ceiling). 15 Material 3 roles as `.ch-*` classes with a 12px floor. Scores and stats use tabular Ubuntu Sans (`.ch-display-numeric`), not a separate face. Sentence case for text, Title Case for entities.
- **Brand visual**: the parabola wallpaper (red, green or white), used lightly: at most one per page, never at full opacity.
- **Space and surface**: 4pt grid (`--sp-2`…`--sp-80`) · radius `--radius-xs`…`--radius-full` (cards 12, pills for buttons and chips) · one separator per surface, border OR shadow (`--elevation-0`…`--elevation-5`) · motion 150ms with standard or spring easing.

All tokens live in [`colors_and_type.css`](colors_and_type.css); the reasoning behind each lives in [reference/AI-CONTEXT.md](reference/AI-CONTEXT.md).

## Files

```
SKILL.md             Working guide: the one rule, token contract, design + audit modes
README.md            This overview
colors_and_type.css  Authoritative tokens (official 3-tier names) + the .ch-* type classes
styles.css           Entry stylesheet (@imports colors_and_type.css)
reference/
  AI-CONTEXT.md      Full written spec: colour, type, spacing, grid, 8 buttons, chips,
                     15 cards, 8 tables, 17 components, 6 page archetypes, locked decisions
  mobile/            Legacy mobile App-Kit port (components.jsx, icons.jsx, screens.js,
                     iOS.jsx, ui_kits/) awaiting the Phase-B web port
demos/               Live demos, being built: foundations showcase, live match
                     scorecard, tournament landing
assets/
  icons.js           Inline SVG icon set (data-icon placeholders + CH.icons.hydrate)
  logos/official/    Official SVG lockups (horizontal/vertical + PRO) and white/ for dark surfaces
  parabolas/         Brand wallpaper: red / green / white (one per page, never 100%)
  illustrations/     Dismissal line-art figures
  favicon.ico
fonts/               Ubuntu Sans Variable (Roman + Italic)
```

Icons: `assets/icons.js` is an inline SVG set. Add `<span data-icon="bat"></span>` placeholders and call `CH.icons.hydrate(document)` once.

## Works well with

Pair this skill with these installed skills (it does not vendor them):

- `accessibility`: WCAG 2.2 AA semantics, traits and contrast. The `/cricheroes-audit` flow already chains it.
- `dataviz`: on-brand charts, stat tiles and dashboards. Swap its placeholder palette for these tokens.
- `ui-ux-pro-max`: layout, style direction and component planning on top of the token base.

## Not shipped yet

- Standalone logomark (favicon, apple-touch, PWA icons, collapsed sidenav) still to be extracted from `horizontal-logo.svg`.
- Live demos are being built; full web component previews land in Phase B.
- No photography yet: use placeholders and ask for real grassroots photos.

## The short version

CricHeroes is a captain, not a cheerleader. State the score, respect the effort, get ready for the next ball.
