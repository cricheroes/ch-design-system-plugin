---
name: cricheroes-design
description: >-
  The CricHeroes design system. Use when building, reviewing, or auditing any UI
  that should match the CricHeroes brand ("Your cricket matters.") — scoring apps,
  tournament sites, dashboards, marketing pages. Provides the colour/type/spacing/
  radius/shadow/motion tokens, the icon set, real component specs, and the brand
  voice, plus an audit checklist to validate a project against the system.
---

# CricHeroes design system

CricHeroes is the home of grassroots cricket. The brand is a **dependable team
captain — inclusive, calm, credible**. Three words guide every visual choice:
**dynamic, versatile, credible**.

This skill has two modes: **Design** (build on-brand) and **Audit** (validate a
project against the brand). Tokens live in `colors_and_type.css`; real component
specs in `reference/`; previews in `preview/`.

## The one rule that matters most

> **Red = identity. Teal = action. Don't mix them.**

- **Scarlet Red `#E21C28`** — logo, live badges, alerts, destructive actions. **Never the fill of a normal button.**
- **Seafoam Teal `#18958F`** — every action: buttons, links, CTAs, focus rings, tabs. Hover darkens one step (`--ch-teal-deep`).
- **Charcoal `#1A1A1A`** — headings, scores, dark banners. **Khaki Gold `#CB8E40`** — awards/premium, sparingly.

## Tokens (always use, never hardcode)

Import `colors_and_type.css` — the official token set extracted from the Figma
"iCricHeroes Design System". Use the semantic tokens, not raw hex.

| Concern | Tokens |
|---|---|
| Brand | `--ch-red` (+ `-light/-lighter/-dark/-darker`), `--ch-teal` (+ same scale), `--ch-black`, `--ch-white` |
| Backgrounds | `--bg-primary` (white), `--bg-secondary` (`rgb(243,243,243)`) |
| Text | `--label-1` (high), `--label-2` (medium), `--label-3` (low), `--label-on-color` |
| Greys / dividers | `--ch-grey`…`--ch-grey6`, `--divider`, `--divider-strong` |
| Fills (chips/soft btns) | `--fill-teal`, `--fill-red`, `--fill-grey` |
| Buttons | `--btn-primary-bg` (teal), `--btn-destructive-bg` (red), `--btn-neutral-bg`, + `-soft` variants |
| Type | `--font-sans` (Ubuntu Sans); `--ch-font-scorecard` (Barlow — scores/stats only); weights `--w-regular/medium/semibold/bold`; scale `--t-display-lg…--t-caption`; classes `.ch-display`, `.ch-title`, `.ch-headline`, `.ch-body`, `.ch-caption`, etc. |
| Spacing | 4px base: `--space-0`…`--space-13` |
| Radius | `--r-2`…`--r-32`; `--r-pill` for **buttons, chips, FAB**; `--r-12`/`--r-16` for cards/sheets |
| Elevation | `--shadow-0`…`--shadow-3`, `--shadow-sticky` (flat by default) |
| Status | `--status-success/-warning/-error/-info` |
| Playbook extras* | `--ch-gold` (awards/premium), `--border`, `--focus-ring`, `--ch-gradient-red/-teal` (hero only), `--duration-fast`/`--ease-standard`/`--ease-spring` |

\* Brand-playbook values added on top of the Figma export — not in the original Figma variables.

## Voice & tone

Short, clear, warm. State the facts, acknowledge the effort, move on. A captain,
not a cheerleader.

- British spelling (colour, centre, organise). Sentence case. Active voice.
- Numerals for stats (`230 runs`, `18.4 overs`). Time `8:22 pm`. Dates `Sept 3, 2025`.
- **No emoji in product UI** (`·`, `✓`, `→` are fine). Marketing captions may use them.
- Always **CricHeroes** — one word, two capitals.
- Do: "Lost by 32 runs. Fought till the last over." Don't: "Total choke job."
- Do: "We can't fetch the score right now. We're on it." Don't: "Error 500: service unavailable."

## Design mode

1. Link `colors_and_type.css`; render text in Ubuntu Sans.
2. Build from the real component specs in `reference/components.jsx` — `Btn`, `Chip`,
   `ScoreCard`, `Row`, `ListCard`, `TabBar`, `TopBar`, `LiveTag`, `Avatar`, `Section`.
   Mirror their structure; use tokens for values.
3. Icons: `assets/icons.js` → `<span data-icon="bat">` + `CH.icons.hydrate(document)`.
   27 glyphs (bat, ball, trophy, team, player, stats, live, fire, target, calendar,
   location, share, search, bell, plus, menu, home, star, filter, user, lock, play,
   chevron, down, arrow, close, check). No emoji.
4. Signature shapes: the circle (cricket ball) and the curve (ball in flight) — used
   lightly: one big low-opacity circle off-edge, layered red/teal circles, or arcs as
   dividers. Backgrounds in `assets/parabola-bg.svg`, `assets/pitch-bg.svg`.
5. Reference kits: `ui_kits/app/App Kit.html` (mobile), `ui_kits/web/Web Kit.html` (web).

## Audit mode

Scan the target's CSS/markup/copy and report findings by severity. Flag:

**Critical / High**
- Red used as a **normal button/CTA fill** (must be teal). Or actions not teal.
- Off-brand colours: SaaS purple-blue gradients; accent colours outside the palette.
- **Emoji in product UI**.

**Medium**
- Buttons/chips/FAB not pills (`--r-pill`); cards/modals not `--r-12`, sheets not `--r-16`.
- Borders other than 1px `--ch-grey5`; focus rings that aren't teal (`--focus-ring`).
- Shadows beyond `--shadow-0…3`/`--shadow-sticky` — no big/glowy shadows (flat by default).
- Gradients on buttons or cards (gradients are hero-only).
- Banned patterns: rounded cards with a coloured strip down the left; emoji cards; heavy photo filters.
- Type: not Ubuntu Sans; stats without tabular numbers.

**Low**
- Copy not sentence case; passive voice; American spelling; emoji in product strings;
  `CricHeroes` misspelled (CricHeroes only); dates/time not in house format.
- Motion not `150ms`/standard easing; `prefers-reduced-motion` not respected.

Report format: `severity · file:line · what's wrong · the token/rule to use instead`.

## Logos & assets

- Official logos: `assets/logos/cricheroes-horizontal.png`, `-horizontal-tagline.png`,
  `-vertical.png`, `-vertical-tagline.png`. PRO badge: `assets/badge-pro.svg`.
- Website primary logo (square `@2x`): `assets/logos/cricheroes-logo@2x.png`.
- Favicon: `assets/favicon.ico` (256×256).
- Decorative backgrounds `assets/parabola-bg.svg` / `pitch-bg.svg` are still
  approximations of the circle/curve motif — swap for officials when available.

## Known gaps

- No sub-brand logos (Pro/Live/Store) — only the master logo set.
- No photography ships — use placeholders and ask for real grassroots photos.
