---
name: cricheroes-design
description: >-
  The CricHeroes design system. Use when building, reviewing, or auditing any UI
  that should match the CricHeroes brand ("Your cricket matters."): scoring apps,
  tournament sites, dashboards, marketing pages. Provides the colour/type/spacing/
  radius/shadow/motion tokens, the icon set, real component specs, and the brand
  voice, plus an audit checklist to validate a project against the system.
---

# CricHeroes design system

CricHeroes is the home of grassroots cricket. The brand is a dependable team
captain: inclusive, calm, credible. Three words guide every visual choice:
dynamic, versatile, credible.

Two modes: Design (build on-brand) and Audit (validate a project against the
brand). The authoritative tokens live in `colors_and_type.css`; the full written
spec (every component, pattern, and locked decision) lives in
`reference/AI-CONTEXT.md`.

## The one rule that matters most

> Red = identity. Teal = action. Don't mix them.

- Scarlet Red `#E21C28` (`--brand-primary`): logo, live/ongoing, alerts, destructive actions. Never the fill of a normal button.
- Seafoam Teal `#18958F` (`--brand-secondary`): every action, such as buttons, links, CTAs, focus rings, tabs and selected chips. Primary hover darkens one step to `--brand-secondary-60` (`#157975`).
- Charcoal `#0B0B0B` (`--brand-black`): headings, scores, dark panels. Grey, black and white carry about 90% of the interface.
- Khaki Gold `#CB8E40` (`--ch-gold`): awards and premium only, sparingly. A labelled local extension, not part of the official web export.

Colour by job (pick by meaning, never by looks):

- Primary CTA, links, active tabs, focus, selected chips: teal (`--btn-bg-primary-*`, `--label-secondary-high`, `--fill-secondary-*`). One primary CTA per view.
- Secondary action: grey tonal (`--btn-bg-grey-*`), never red.
- Destructive action: red (`--btn-bg-secondary-*`), reserved for delete, remove, end match.
- Body, headings, metadata, borders, surfaces: grey/black/white hierarchy (`--label-grey-high` is the default text colour). Brand-accent red only, and sparingly.

## Token contract (3 tiers, always use, never hardcode)

Import via `styles.css` (it `@import`s `colors_and_type.css`). Components consume Tier 2 and Tier 3 only. Opacity is preserved end to end as `rgb(var(--rgb-*) / <alpha>)`: never flatten an alpha colour into a pre-blended hex. Exhaustive list in `colors_and_type.css` and AI-CONTEXT section 2.

Two integration notes. `colors_and_type.css` also ships an opinionated base (a reset, a `body` rule, and an h1 to h6 mapping) so plain markup renders on-brand; if you only want tokens inside an existing app, import just its `:root`. And teal text clears WCAG AA only at large or emphasised sizes: for small teal links use `--brand-secondary-60`, and always pair a teal link with a non-colour affordance (underline or icon).

| Tier | Tokens | Rule |
|---|---|---|
| 1 · Foundations (reference only) | `--brand-primary` / `--brand-secondary` / `--brand-grey`…`--brand-grey-6` / `--brand-black` / `--brand-white` (plus tints such as `--brand-secondary-60`) and the `--rgb-*` triplets | Never consumed directly by components; they exist to compose Tier 2. The one sanctioned reach-in is the teal hover value `--brand-secondary-60`. |
| 2 · Semantic (the component contract) | `--bg-{primary,secondary,tertiary}` (solid surfaces only) · `--label-{grey,primary,secondary}-{high,medium,low,muted}` plus `--label-static-{black,white}-*` · `--fill-{grey,primary,secondary}-{prominent,high,medium,low,muted}` | Pick by meaning, not looks. Text-safe labels are only `-high` and `-medium`; `-low` and `-muted` are banned for text (kept as mixing values). |
| 3 · Component | `--btn-bg-{primary,secondary,grey}-*` · `--btn-label-*` · `--icon-{primary,secondary,grey,static}-*` · `--focus-ring` / `--focus-ring-chip` | `--btn-bg-primary-*` is the teal CTA, `--btn-bg-secondary-*` is the red destructive (legacy name), `--btn-bg-grey-*` is the tonal secondary. Focus is a 3px teal ring, 2px for chips. |

Non-colour foundations:

| Concern | Tokens |
|---|---|
| Spacing (4pt) | `--sp-2`…`--sp-80`, value-named (2/4/8/12/16/20/24/32/40/48/64/80). Retired: `--sp-6`, `--sp-10`, `--sp-96`. |
| Radius | `--radius-{none,xs,sm,md,lg,xl,full}` (0/4/8/12/16/28/9999). Card default `--radius-md` (12). |
| Elevation | `--elevation-0`…`--elevation-5`. A surface uses border OR shadow, never both. Card rest is `--elevation-2`. |
| Motion | `--duration-fast` (150ms), `--ease-standard`, `--ease-spring`. Always respect `prefers-reduced-motion`. |
| Charts (Phase B extension) | `--chart-seq-1..6` (teal ramp for ordered magnitude), `--chart-cat-1..6` (distinct series), `--chart-wicket` (red, wicket/out only), `--chart-grid`, `--chart-axis`. Pair colour with labels/markers and offer a data-table fallback. |
| Layout (Phase B extension) | `--bp-{medium,expanded,large,xl}`, `--container-{narrow,reading,standard,wide,full}`, `--nav-height` (72), `--sidebar-width`. Derived from the spec prose; pending design confirmation. |

## Type

Ubuntu Sans (variable), shipped locally. Weights 400 / 500 / 700 only; 700 is the ceiling. 12px is the type floor (`.ch-label-small`), nothing smaller anywhere.

- 15 Material 3 roles as classes: `.ch-display-{large,medium,small}`, `.ch-headline-*`, `.ch-title-*`, `.ch-body-*`, `.ch-label-*`, each with an `-emphasized` variant (same size, one weight step up). Plus `.ch-overline`, `.ch-display-hero` (marketing), and `.ch-display-numeric`.
- Scores and stats use tabular Ubuntu Sans: `.ch-display-numeric` (`font-variant-numeric: tabular-nums`) or `font-family: var(--font-mono); font-variant-numeric: tabular-nums`. There is no separate numeric face.
- Casing: sentence case for all text (headings, subtitles, body, buttons); Title Case for entities only (products, teams, tournaments); uppercase reserved for the `.ch-overline` device.
- Semantic HTML is pre-styled: `h1` to `h6` and `p` map to the headline, title and body roles, so plain tags render on-brand.

## Voice and tone

Short, clear, warm. State the facts, acknowledge the effort, move on. A captain, not a cheerleader.

- British spelling (colour, centre, organise). Sentence case. Active voice.
- Numerals for stats (`230 runs`, `18.4 overs`). Time `8:22 pm`. Dates `Sept 3, 2025`.
- No emoji in product UI (`·`, `✓`, `→` are fine). Always CricHeroes, one word, two capitals.
- Do: "Lost by 32 runs. Fought till the last over." Don't: "Total choke job."
- Do: "We can't fetch the score right now. We're on it." Don't: "Error 500: service unavailable."

## Design mode

1. Link `colors_and_type.css` (or `styles.css`); render text in Ubuntu Sans.
2. Build components and patterns from the specs in `reference/AI-CONTEXT.md`: 8 buttons (section 10), chips (11), 15 cards (12), 8 tables (13), the 17 interactive components (14), grid and density (6), and the 6 page archetypes (section 1). Reach through tokens for every value.
3. Icons: `assets/icons.js`, an inline SVG set. Add `<span data-icon="bat"></span>` placeholders and call `CH.icons.hydrate(document)` once. 5-step size scale `icon-xs`…`icon-xl` (16/20/24/32/48).
4. Assets: official SVG logos in `assets/logos/official/` (horizontal and vertical, plus PRO), with a `white/` set for red/teal/dark/photo surfaces; parabolas in `assets/parabolas/` (red/green/white; max one per page, never 100% opacity); dismissal illustrations in `assets/illustrations/`.
5. Live galleries in `demos/`: `foundations` (tokens), `match-centre` and `tournament` (page archetypes), plus the Phase B references `components`, `cards`, `tables` and `charts`.

## Audit mode

Scan the target's CSS, markup and copy; report findings by severity as
`severity · file:line · what's wrong · the token or rule to use instead`.

- First pass: the two-tier brand-lint at `hooks/brand-lint.mjs`. Hard violations block, soft findings are advisory: emoji in product UI, off-brand SaaS gradients, red button fills, gradients on buttons or cards, and misspelled CricHeroes.
- Full contract: the token-compliance checks in AI-CONTEXT section 16: zero raw hex outside `:root`, zero raw `rgba()`, on-scale font-size / spacing / radius, and the 12px type floor.
- The `/cricheroes-audit` command also runs the `design-system` and `accessibility` skills alongside this one, for structural and WCAG 2.2 AA coverage.

## Known gaps

- Standalone logomark SVG is still missing (needed for favicon, apple-touch, PWA icons, and the collapsed sidenav); extract it from `horizontal-logo.svg`.
- Component, card, table and chart galleries ship in `demos/` (Phase B). The mobile App-Kit source in `reference/mobile/` is a legacy port; a full mobile (iOS/Android) system is a separate deliverable.
- The chart palette and layout/grid tokens are CricHeroes extensions derived for Phase B (not in the official web export); the nav height is set to 72px (section-6 prose says 56). Confirm both with the design team.
