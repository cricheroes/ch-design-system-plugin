# CricHeroes Web Design System — AI Context Reference

> **Purpose of this document.** A complete, exhaustive context dump of the CricHeroes web design system for use by AI agents and developers. Every token, rule, locked decision, anatomy spec, do/don't, and user-stated constraint is captured here so that any AI that loads this file can generate code, mark-up, or design specs that match the system exactly — without re-reading the full HTML guidelines page.
>
> **Source of truth.** The live guidelines page (`cricheroes-design-guidelines.html`) is the canonical visual reference; this file is its written counterpart. If they ever diverge, the HTML wins on visuals and this file wins on rules.
>
> **Last sync.** 2026-06-22.

---

## Table of contents

1. [Top-level philosophy](#1-top-level-philosophy)
2. [Token architecture (3-tier contract)](#2-token-architecture-3-tier-contract)
3. [Color system](#3-color-system)
4. [Typography](#4-typography)
5. [Spacing](#5-spacing)
6. [Grid & layout](#6-grid--layout)
7. [Radius & elevation](#7-radius--elevation)
8. [Brand & logo](#8-brand--logo)
9. [Parabola — brand visual identity](#9-parabola--brand-visual-identity)
10. [Buttons](#10-buttons)
11. [Chips](#11-chips)
12. [Cards](#12-cards)
13. [Tables](#13-tables)
14. [Components module (17 interactive primitives)](#14-components-module)
15. [Iconography](#15-iconography)
16. [Token-compliance contract](#16-token-compliance-contract)
17. [Layout context](#17-layout-context)
18. [File structure & assets](#18-file-structure--assets)
19. [User-locked decisions (verbatim quotes)](#19-user-locked-decisions-verbatim-quotes)
20. [AI implementation guide](#20-ai-implementation-guide)
21. [Known gaps & deferred items](#21-known-gaps--deferred-items)

---

## 1. Top-level philosophy

### Rule 00 · Foundation, not Prescription
**This design system is the visual floor, NOT a layout template.** It locks tokens, colour roles, spacing, type scale, radii, elevation, and component anatomies — and ONLY those. Layout, motion, and creative patterns are page-author decisions.

User-stated rule (verbatim):
> "design sytem just sets the foundation of visual thing creativity is the core of design soo it shoukd be there you're free to explore out different layout strategy patterns as per user experiment and the end goal of the page"

Four sub-rules under Rule 00:

- **A. Layout follows page aim.** Utility / scoring / settings pages lean on the standard card grid (scan-fast, predictable). Informational / landing pages can break into hero sections, asymmetric grids, full-bleed visuals — whatever the story needs.
- **B. Motion is allowed, but must earn its place.** Use it when it makes a state change easier to read (chip pulse, list reorder, sheet slide-in). Skip when it just decorates. Always respect `prefers-reduced-motion`.
- **C. The system is composable, not a stencil.** Combine cards into new patterns, stack chips into clusters, lean on the chart-card frame for new visualisations. *New patterns are encouraged* — only the tokens are sacred.
- **D. Token-break → fix the token, don't fork the page.** A genuinely new colour / spacing / motion idiom belongs back in this system so the next page inherits it. Never bury one-off raw values in a component.

### Pages by aim · how to layer creativity on the base

**The token system is the base layer; creativity sits on top.** Different pages have different aims — the visual approach must adapt without ever breaking the token system underneath. Below are the six page archetypes the CricHeroes web product ships. When generating code / designs, pick the archetype first, then reach for the "Lean into" moves inside that archetype's card. Never treat every page like the settings page.

User-stated rule (verbatim):
> "our brand is not just one thing there might be landing pages, very data heavy dasboard, utility ad much more soo you've to adapt as per the context and for what you're building the design soo you can use linear opacity some unique patterns for landing pages- you can use modern layouting in dashboard- you can use linear opacity gradietns charts and much moire creative stuff... this design system is just the base layer you can add your creativity on layer above it soo that it feels live still yet feels like it is of our brand"

| # | Archetype | Aim | Lean into | Hold back on |
|---|---|---|---|---|
| 01 | **Landing / Marketing** | Sell the brand, tell the story, make the visitor care | Hero moments · **linear gradients built from token colours** (e.g. `linear-gradient(var(--fill-secondary-muted), var(--fill-secondary-low))`) · **parabola at Priority tier** (50-60 %) · asymmetric grids · full-bleed sections · Display Large 64 px type ramps · brand photography with 40 % black scrim · one "star" component per section · scroll-driven reveals | Dense data · complex forms · utility chrome · standard card grids |
| 02 | **Data-heavy Dashboard** | Show a lot, scan fast, drill down (analytics, scorecards, leaderboards) | Dense card grids · sidebar-driven layouts (240-280 filter/nav column) · mini-charts inline (sparklines composed from primitives) · **linear gradients inside chart cards for zone highlighting** (still token-based) · **Dense density** (12 pad · 12-16 gap) · multi-column grids that let DATA breathe not chrome · colour-coded status columns · sticky headers · condensed table typography | Marketing gradients · large radii · hero-scale visuals · giant empty space · animated transitions that block scroll |
| 03 | **Utility · Forms / Settings / Progress** | Get the user through a task with minimum friction | Single-column focus · generous vertical spacing · card-per-step · clear progress indicators · **Standard density** (16-20 pad) · consistent layout across every utility screen (settings ≈ every other settings page) | Creative flair · gradients · parabola · animated transitions except state-change cues · anything that shifts attention away from the task |
| 04 | **Profile · Player / Team / Tournament** | Establish identity, showcase stats | Red hero card at top (the one place solid brand-red is native surface) · **red parabola @ Mid opacity 30-40 %** — the ONLY archetype where the red parabola is native · tabbed content shell below the hero · big stat tiles in the hero cluster · avatar-led grids · optional linear gradient overlay on the hero for depth | Marketing-scale gradients · non-brand accent colours · anything that competes with the identity moment |
| 05 | **Live · Real-time match view** | Communicate real-time state and give the video priority | Video-first hierarchy · sidebar layout (video + stats side by side) · dark accent panels (`--brand-black` / `--brand-secondary-80`) for score readouts · subtle live-status animations (respecting `prefers-reduced-motion`) · frequent re-renders as data streams · commentary FeedItem variants | Static hero moments · marketing polish · non-essential motion that competes with the video · heavy scroll effects |
| 06 | **Listing · Discovery** | Browse a set, filter, jump in (`/matches`, `/tournaments`, `/looking-for`, community index) | Card grids with `repeat(auto-fill, minmax(<tile>, 1fr))` · filter chips prominent at top · Standard density · card hover lift L2 → L3 · list-first · empty-state cards when a filter returns nothing | Hero-scale visuals · dense analytics · deep animation · fixed grid columns (always auto-fill) |

### Dashboard hierarchy rule (locked)

Dashboards must **NOT** flat-light everything at one tint level. The rule is **hierarchy of fill depth** — the eye should read the STORY, not the chrome:

- `--fill-*-prominent` — reserve for **peaks, anomalies, KPI highlights** (the "look here" moments)
- `--fill-*-high` / `--fill-*-medium` — **baseline data** (the everyday rows / cells)
- `--fill-*-low` / `--fill-*-muted` — **supporting metadata / subtle backdrops** (borders, hover, contextual layer under charts)

Combined with the archetype guidance, dashboards should feel *pleasant instead of overwhelming*: hierarchy of fill depth + gradient-opacity fades on chart edges + translucent-glass filter drawers + subtle grid-pattern backgrounds behind chart clusters (see techniques below).

### Sanctioned creative techniques (named tools, not guesswork)

Five techniques a senior designer can reach for on top of the token base. Every one composes from tokens — never raw hex, never off-scale values. Use them to make dashboards feel **pleasant instead of overwhelming**, landings feel **alive without shouting**, and profile surfaces feel **native to the brand**. Pick the technique for the moment; don't sprinkle them because they're available.

| # | Technique | Composition | When to reach for it | When to avoid it |
|---|---|---|---|---|
| 1 | **Linear gradient** | `linear-gradient(135deg, var(--fill-secondary-muted), var(--fill-secondary-low))` — diagonal / vertical fade between two token colours | Landing hero backdrop · profile-hero depth · chart-card zone highlight · empty-state canvas | Body-text backgrounds · dense table cells · utility screens · anywhere the gradient competes with content |
| 2 | **Gradient opacity** | `linear-gradient(90deg, rgb(var(--rgb-secondary) / 0), rgb(var(--rgb-secondary) / 0.35))` — one colour fades from 0 % to some alpha across an axis. Softer than colour-to-colour. | Chart edges fading to nothing · table-row highlight on hover · sticky-header fade-to-transparent at scroll edges · long-list bottom mask | Full-opacity accents (use the fill scale) · text nodes (use `--label-*`) · anywhere the fade obscures a required signal |
| 3 | **Glass-morphism** | `background: rgb(var(--rgb-white) / 0.24); backdrop-filter: blur(12px); border: 1px solid rgb(var(--rgb-white) / 0.32);` — semi-transparent panel with backdrop blur over a coloured or photo backdrop | Floating filter drawer over a dashboard · sticky nav over rich content · overlay panels on profile heroes with parabola / photo backgrounds · modal on top of a rich page | Primary content surfaces · body text areas · pages without a coloured backdrop (blur has nothing to blur) · low-power devices — fall back to a solid tint |
| 4 | **Grid pattern** | `linear-gradient(rgb(var(--rgb-grey) / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--rgb-grey) / 0.08) 1px, transparent 1px)` at `background-size: 16px 16px` — two crossing hairlines at low opacity. **Texture, not decoration.** | Behind chart clusters in dashboards · empty-state canvases · under a "start scoring" placeholder · in the loose backdrop of a data-heavy page section | Content-dense cards (pattern collides with data) · marketing hero backgrounds (use gradient instead) · anywhere at opacity > 10 % |
| 5 | **Translucent overlay** | `linear-gradient(180deg, rgb(var(--rgb-white) / 0), rgb(var(--rgb-white) / 0.55))` over the source layer — single flat colour at partial opacity, softens the layer beneath without hiding it | Reading text on photo (pair with 40 % black scrim) · profile hero cards that need meta-info legibility · promo cards with a background image · dark-panel headers that need a lift | Layering opacity on top of an already-tonal fill (stacking alpha muddies the surface) · plain white surfaces (there's nothing to soften) |

**Creative techniques still consume tokens — always.** The gradient is `var(--fill-secondary-muted)` → `var(--fill-secondary-low)`, not raw hex. The glass surface is `rgb(var(--rgb-white) / 0.24)`, not `rgba(255, 255, 255, 0.24)`. The grid pattern uses `rgb(var(--rgb-grey) / 0.08)`, not `#EEEEEE`. **The design system is the base layer; senior-designer creativity sits on top, never underneath.** Never invent a new colour for a specific page, never sneak in an off-scale pixel, never break the type scale to be "different". If a page genuinely needs something the tokens don't cover — fix the token, then use it, so the next page inherits it. That's how creativity compounds instead of fragments.

### The 9 numbered principles (after Rule 00)

| # | Principle | Rule |
|---|---|---|
| 01 | **Foundation, not Prescription** | System sets the floor, creativity sets the ceiling. (Mirrors Rule 00) |
| 02 | **Semantic over Aesthetic** | Pick tokens by meaning, never appearance. A "branded" surface uses `--fill-primary-*`, regardless of section context. |
| 03 | **Preserve Opacity** | Keep alpha intact at the CSS layer. Never flatten `rgb(226 28 40 / 16%)` into a pre-blended hex like `#FBE1E3`. |
| 04 | **Solid Layout Surfaces** | Core layout (page, frames, cards) uses `--bg-*`. Opacity is reserved for chips, tints, hover, selected, disabled. |
| 05 | **One Primary per View** | Every screen has exactly one Primary CTA in teal. Red is brand-accent / destructive only, never an action. |
| 06 | **No Raw Brand in Components** | `--brand-*` is reference only. Components reach into Semantic and Component tiers only. |
| 07 | **4pt Discipline** | All spacing values are multiples of 4. No half-pixels, no arbitrary numbers — ever. |
| 08 | **Accessibility First** | 44 × 44 minimum touch target. Colour is never the sole signal — pair with text or shape on every status indicator. |
| 09 | **Composability** | New features compose from existing primitives. Build a new component only when no combination of existing ones solves the case. |

### Three-roles colour philosophy

| Role | Colour | Used for |
|---|---|---|
| **ACCENT ONLY** | Brand red `#E21C28` | Slight brand impact on important headings, the LIVE pill, an urgent count, brand-accent backgrounds on team / player / tournament profiles. **Never a button, CTA, link, or "Save / Submit" routine.** |
| **ALL ACTIONS** | Brand teal `#18958F` | Every primary button, CTA card, inline link, active tab, selected chip, focus ring, action icon. The lower-priority secondary button STEPS DOWN to the neutral grey tonal style — not red. |
| **EVERYTHING ELSE** | Grey / black / white | Body text, headings, metadata, surfaces, borders, hover states, disabled states, secondary buttons, default UI icons. ~90 % of the interface. |

User-stated DO/DON'T (verbatim):
> "Make **every button, CTA, CTA card and link teal**. Default text to `--label-grey-high`. Reach for **red only as an accent** — a brand-flavoured heading word, a live signal, or a profile background held back with opacity. Always consume Tier 2 / Tier 3 tokens, never raw hex."
>
> "Don't paint actions red — no red 'Save', 'Submit' or 'Buy'. Don't use teal for plain body text. Don't let red carry more than a small share of any screen. Don't apply opacity on a text node — pick the right `--label-*` step instead."

---

## 2. Token architecture (3-tier contract)

Components NEVER consume brand primitives directly. They consume **semantic tokens**, which in turn reference foundation values. Opacity is preserved end-to-end as `rgb(<triplet> / <alpha>)` — never flattened into a pre-blended hex.

### Tier 1 · Foundations (brand primitives — reference only)

```
--brand-primary:      #E21C28
--brand-primary-10:   #F9D2D4     /* lightest red tint */
--brand-primary-30:   #EE777E
--brand-primary-70:   #8C151C
--brand-primary-80:   #611217     /* deepest red */

--brand-secondary:    #18958F
--brand-secondary-10: #D1EAE9     /* lightest teal */
--brand-secondary-30: #74BFBC     /* bright accent teal — also used by dark doc-panel */
--brand-secondary-60: #157975     /* primary-button hover */
--brand-secondary-80: #104240     /* deepest teal */

--brand-grey:    #8E8E93     /* base neutral */
--brand-grey-2:  #AEAEB2
--brand-grey-3:  #C7C7CC
--brand-grey-4:  #D1D1D6
--brand-grey-5:  #E5E5EA
--brand-grey-6:  #F2F2F7     /* lightest neutral */

--brand-black:   #0B0B0B
--brand-white:   #FEFFFF
```

### Tier 1.5 · RGB triplets (power opacity-driven semantic tokens)

```
--rgb-primary:        226 28 40
--rgb-secondary:      24 149 143
--rgb-secondary-30:   116 191 188   /* powers the dark doc-panel teal accent */
--rgb-grey:           142 142 147
--rgb-black:          11 11 11
--rgb-white:          254 255 255
```

### Tier 2 · Semantic tokens (the component contract)

**Screen backgrounds** — solid surfaces only (no opacity):
```
--bg-primary:   #FEFFFF      /* white surface · cards, dialogs, dropdowns */
--bg-secondary: #F3F3F3      /* page surface · body / scroll area */
--bg-tertiary:  #FEFFFF      /* nested content, currently same as primary */
```

**Labels** — text colour hierarchy, every label uses `rgb(<rgb-var> / <alpha>)`.

**⚠ TEXT-SAFE RANGE (LOCKED RULE):** Only `-high` and `-medium` steps are allowed for text. **The `-low` (30 %) and `-muted` (14–18 %) steps are BANNED for text usage** — they fail contrast in real product usage. The tokens are kept in the palette as REFERENCE / mixing values only. Every "quieter text" case (placeholder, disabled, muted metadata, tertiary supporting text) must reach for `--label-*-medium`, not `-low` or `-muted`.

User-stated rule (verbatim):
> "dont use this colors text at all as i've tested this design system and have used this in some cases which has created chaos soo please dint use this in the text at all"

| Token | Resolves to | Text-safe? | Use |
|---|---|---|---|
| `--label-primary-high`    | `rgb(--rgb-primary / 1)`     | ✅ Yes | "Live" text, brand callouts (sparingly) |
| `--label-primary-medium`  | `rgb(--rgb-primary / 0.52)`  | ✅ Yes | **Cancelled chip label** (softer red · was `-low` before the ban) |
| `--label-primary-low`     | `rgb(--rgb-primary / 0.30)`  | ❌ **BANNED for text** | Reference only |
| `--label-primary-muted`   | `rgb(--rgb-primary / 0.14)`  | ❌ **BANNED for text** | Reference only · mixing value for tints |
| `--label-secondary-high`  | `rgb(--rgb-secondary / 1)`   | ✅ Yes | Inline links, active tab text, action icons |
| `--label-secondary-medium`| `rgb(--rgb-secondary / 0.54)`| ✅ Yes | Secondary action text (rare use) |
| `--label-secondary-low`   | `rgb(--rgb-secondary / 0.30)`| ❌ **BANNED for text** | Reference only |
| `--label-secondary-muted` | `rgb(--rgb-secondary / 0.18)`| ❌ **BANNED for text** | Reference only |
| `--label-grey-high`       | `rgb(--rgb-black / 1)`       | ✅ Yes | **Primary body / headings / card titles** (dominant default) |
| `--label-grey-medium`     | `rgb(--rgb-black / 0.60)`    | ✅ Yes | Secondary text, descriptions, metadata, **placeholders, disabled text, muted cells, struck-through prices, tertiary rows** |
| `--label-grey-low`        | `rgb(--rgb-black / 0.30)`    | ❌ **BANNED for text** | Reference only |
| `--label-grey-muted`      | `rgb(--rgb-black / 0.18)`    | ❌ **BANNED for text** | Reference only · dividers use `--fill-grey-low` instead |
| `--label-static-black-{high\|medium\|low\|muted}` | fixed black at 1 / 0.60 / 0.30 / 0.16 | high + medium only | Stays black regardless of theme |
| `--label-static-white-{high\|medium\|low\|muted}` | fixed white at 1 / 0.60 / 0.30 / 0.16 | high + medium only | Text on brand / dark / photography surfaces |

**Migration map** (what to use INSTEAD of the banned tokens):

| Case that used to use `-low` / `-muted` | Now uses |
|---|---|
| Cancelled chip label | `--label-primary-medium` (was `-low`) |
| Abandoned chip label | `--label-grey-medium` (was `-low`) |
| Input placeholder text | `--label-grey-medium` (was `-low`) |
| Disabled input text | `--label-grey-medium` (was `-low`) |
| Datepicker out-of-month cells | `--label-grey-medium` (was `-low`) |
| Menu disabled item label | `--label-grey-medium` (was `-low`) |
| Product price "was" (strikethrough) | `--label-grey-medium` (was `-low`) |
| Tertiary supporting text | `--label-grey-medium` (was `-low`) |
| Anywhere else previously using `-low` or `-muted` for text | `--label-*-medium` — always |

**Fills** — surface tints, all opacity-based:

| Family | Tokens (5 each) | Pattern |
|---|---|---|
| Grey   | `--fill-grey-{prominent\|high\|medium\|low\|muted}`     | `rgb(--rgb-grey / 1·0.20·0.16·0.12·0.08)` |
| Primary (red) | `--fill-primary-{prominent\|high\|medium\|low\|muted}`  | `rgb(--rgb-primary / 1·0.20·0.16·0.12·0.08)` |
| Secondary (teal) | `--fill-secondary-{prominent\|high\|medium\|low\|muted}`| `rgb(--rgb-secondary / 1·0.20·0.16·0.12·0.08)` |

### Tier 3 · Component tokens

**Buttons (background):**
```
--btn-bg-primary-prominent:    rgb(--rgb-secondary)          /* TEAL · main CTA */
--btn-bg-primary-disable:      rgb(--rgb-secondary / 0.20)
--btn-bg-secondary-prominent:  rgb(--rgb-primary)            /* RED · destructive ONLY (legacy name) */
--btn-bg-secondary-disable:    rgb(--rgb-primary / 0.14)
--btn-bg-grey-prominent:       rgb(--rgb-grey / 0.12)        /* GREY · tonal secondary button */
--btn-bg-grey-disable:         rgb(--rgb-grey / 0.12)
--btn-bg-black-prominent:      rgb(--rgb-black)
```

**Buttons (label):**
```
--btn-label-primary-prominent:        rgb(--rgb-white)
--btn-label-primary-disable:          rgb(--rgb-white / 0.60)
--btn-label-secondary-prominent:      rgb(--rgb-white)
--btn-label-secondary-disable:        rgb(--rgb-white / 0.50)
--btn-label-grey-prominent:           rgb(--rgb-black)
--btn-label-grey-disable:             rgb(--rgb-black / 0.30)
--btn-label-primary-text-prominent:   rgb(--rgb-secondary)   /* tertiary text-button · teal label */
--btn-label-primary-text-disable:     rgb(--rgb-secondary / 0.60)
--btn-label-secondary-text-prominent: rgb(--rgb-primary)     /* tertiary destructive text · red label */
--btn-label-secondary-text-disable:   rgb(--rgb-primary / 0.50)
--btn-label-black-text-prominent:     rgb(--rgb-black)
--btn-label-black-text-disable:       rgb(--rgb-black / 0.30)
```

**Icons:**
```
--icon-primary-high:    rgb(--rgb-primary)       /* brand / live icon */
--icon-secondary-high:  rgb(--rgb-secondary)     /* interactive / action icon */
--icon-grey-prominent:  rgb(--rgb-black)         /* default UI icon */
--icon-grey-high:       rgb(--rgb-grey)          /* secondary / decorative */
--icon-grey-medium:     rgb(--rgb-grey / 0.50)   /* disabled */
--icon-grey-low:        rgb(--rgb-grey / 0.30)   /* very faint */
--icon-static-black:    rgb(--rgb-black)
--icon-static-white:    rgb(--rgb-white)         /* icon on dark / brand surface */
```

**Focus rings:**
```
--focus-ring:      0 0 0 3px rgb(--rgb-secondary / 0.30)   /* default · 3 px teal */
--focus-ring-chip: 0 0 0 2px rgb(--rgb-secondary / 0.45)   /* chip-only · 2 px teal · higher alpha */
```

### Strict token usage rules (the audit-row table)

| Area | Avoid | Use |
|---|---|---|
| Screen backgrounds | Page surfaces using `--fill-*`, hex codes, or opacity-blended values | `--bg-primary` / `--bg-secondary` / `--bg-tertiary` only — always solid |
| Text / labels | Hard-coded grey hex, mixing `color` with `opacity` on the element | `--label-{primary\|secondary\|grey\|static}-{high\|medium\|low\|muted}` |
| Fills / borders / chips | Stacking opacity on opacity, custom rgba inside components | `--fill-{primary\|secondary\|grey}-{prominent\|high\|medium\|low\|muted}` |
| Buttons | Reaching past button tokens into raw fills or brand colors | `--btn-bg-*` for surfaces, `--btn-label-*` for text — nothing else |
| Icons | `currentColor` falling back to a brand primitive | `--icon-{primary\|secondary\|grey\|static}-*` |
| Opacity model | Flattening `rgba(226 28 40 / 16%)` into `#FBE1E3` | Always preserve alpha — surfaces stay perceptually correct against any background |

---

## 3. Color system

### Three-roles philosophy (full)

**RED — Brand accent only.** Used rationally to drop a touch of the CricHeroes brand onto a surface. Never the default. Never an instruction to act.
- A slight brand impact on an important heading or hero word
- Live / urgent signals — the "LIVE" pill, an urgent count
- Brand-accent backgrounds on team / player / tournament profiles
- **Never a button, CTA, link, or "Save / Submit" action**

**TEAL — Actionable / interactive.** Carries the *primary, high-emphasis action* on a surface. A lower-priority secondary button steps down to the neutral grey tonal style — not red.
- Primary button & main CTA (high emphasis)
- CTA cards and promotional action surfaces
- Inline links and "Read more →" text
- Active tabs, selected chips, focus rings, action icons

**GREY / BLACK / WHITE — Neutral foundation.** ~90 % of the interface.
- All body text, headings & metadata (black hierarchy)
- Surfaces, cards, page backgrounds (white / `#F3F3F3`)
- Borders, dividers, hover, disabled states (grey + alpha)
- Secondary / tonal buttons (grey surface)
- Default UI icons

### Real-world color usage (from a 10-page crawl of cricheroes.com)

**Text on light surfaces (~90 % of all text):**

| Context | Token | Real example |
|---|---|---|
| Primary body / headings / card titles | `--label-grey-high` (`#0B0B0B`) | 125 nodes on white + 83 on `#F3F3F3` — dominant default |
| Secondary text / descriptions / metadata | `--label-grey-medium` (black @ 60 %) | Dates, locations, helper text — 40+ nodes |
| Disabled / hint / placeholder | `--label-grey-medium` (black @ 60 %) | Placeholders, disabled labels. **Was `--label-grey-low` — banned for text; migrated to `-medium`.** |
| Inline link / interactive text | `--label-secondary-high` (`#18958F`) | "Sign In" text button, "Read more →" |
| Live / urgent / brand emphasis | `--label-primary-high` (`#E21C28`) | "Live", brand callouts — only 19 nodes, sparingly |

**Text on branded / dark surfaces:**

| Context | Token | Use |
|---|---|---|
| Text on primary teal | `--label-static-white-high` | 75 nodes — white on teal CTAs & ribbons |
| Text on brand red surface | `--label-static-white-high` | "Load More" on About, brand pills |
| Text on dark / black | `--label-static-white-high` | Footer, dark sections — 27 nodes |
| Secondary text on dark | `--label-static-white-medium` (white @ 60 %) | Footer secondary text — 42 nodes |
| Disabled label on dark | `--label-static-white-low` (white @ 30 %) | Disabled state on branded buttons |

**Buttons & CTAs (the colour-role rule):**

| Job | Surface token | Label token | Notes |
|---|---|---|---|
| Primary CTA | `--btn-bg-primary-prominent` (teal) | `--btn-label-primary-prominent` (white) | "Load More", "Purchase Livestream" |
| Primary CTA hover | `--brand-secondary-60` (`#157975` deeper teal) | unchanged | Never invent new hover colors |
| Brand / destructive CTA | `--btn-bg-secondary-prominent` (red) | `--btn-label-secondary-prominent` (white) | Delete, End match, Reject — destructive ONLY |
| Ghost / text button surface | `--btn-bg-grey-prominent` (grey @ 12 %) | — | "Sign In" outlined / text |
| Ghost / text button label | — | `--btn-label-primary-text-prominent` (teal) | "Sign In" — 11 nodes |
| Disabled button surface | `--btn-bg-primary-disable` (teal @ 20 %) | `--btn-label-primary-disable` (white @ 60 %) | Retains color identity, faded |

**Links, status & interactive states:**

| Context | Tokens |
|---|---|
| Inline text link | `--label-secondary-high` (`#18958F`) |
| Active nav / selected tab label | `--label-grey-high` (full opacity) + teal indicator below |
| Active tab indicator | `--fill-secondary-prominent` (2 px underline / left bar) |
| Selected filter chip | `--fill-secondary-muted` (teal @ 18 %) |
| Live status pill | `--fill-primary-prominent` + `--label-static-white-high` (DEPRECATED — see new chip palette below) |
| Live soft chip | `--fill-primary-muted` + `--label-primary-high` (red @ 8 % + `#E21C28`) |
| Success / completed indicator | `--fill-secondary-muted` + `--label-secondary-high` |
| Focus ring (any focusable) | `--focus-ring` (3 px outer teal @ 30 %) |
| Row / list hover surface | `--fill-grey-muted` (grey @ 8 %) |

**Surfaces, containers & dividers:**

| Context | Token |
|---|---|
| Page background | `--bg-secondary` (`#F3F3F3`) |
| Card / panel / modal surface | `--bg-primary` (`#FEFFFF`) |
| Section accent (neutral) | `--fill-grey-muted` (grey @ 8 %) |
| Section accent (branded soft) | `--fill-secondary-muted` (teal @ 18 %) |
| Alert / warning soft surface | `--fill-primary-muted` (red @ 8 %) |
| Card border / divider | `--fill-grey-low` (grey @ 12 %) |
| Input border (default) | `--fill-grey-medium` (grey @ 16 %) |
| Input border (focus) | `--fill-secondary-prominent` (solid teal) |

**Icons:**

| Context | Token |
|---|---|
| Default UI icon | `--icon-grey-prominent` (`#0B0B0B`) |
| Interactive / action icon | `--icon-secondary-high` (teal) |
| Brand / live icon | `--icon-primary-high` (red) |
| Secondary / decorative icon | `--icon-grey-high` |
| Disabled icon | `--icon-grey-medium` (50 %) |
| Icon on dark / brand surface | `--icon-static-white` |

### NO peach token rule (locked)

User-stated rule (verbatim):
> "strictly dont add peach color at all; keep my color system as as it is for peach one use grey/light or secondary fill/light as per the usage of it based on the context"

The featured-guide / informational-promo card on cricheroes.com originally used a peach surface (`rgb(253,236,208)`). We deliberately did NOT add a peach token to the system. The card uses an existing semantic token picked by context:

| Variant | Surface | When to use |
|---|---|---|
| Default · informational | `--fill-grey-muted` | Educational guide, helper card, FYI note. Calm, neutral — does not compete. |
| Interactive · suggested action | `--fill-secondary-muted` | "Did you mean", "Suggested filter", "Try this" — matches the Suggestion chip family. |
| Warning · negative outcome | `--fill-primary-muted` | "Match abandoned", "Cancelled", recoverable warning — matches the Cancelled chip. |

---

## 4. Typography

### Family stack
```
--font-primary: 'Ubuntu Sans', 'Ubuntu', -apple-system, BlinkMacSystemFont, sans-serif
--font-brand:   'Ubuntu Sans', 'Ubuntu', sans-serif
--font-mono:    'Ubuntu Sans', 'Ubuntu', sans-serif   /* mono context uses tabular Ubuntu Sans */
```

**Primary face:** Ubuntu Sans (variable). Ubuntu (non-variable) is the fallback. Roboto only on the logo lockup. Barlow / Anton / Pacifico tokens exist in legacy CSS but are NOT used in the new system.

### M3 type scale (CricHeroes values)

Naming follows **Material 3** (Display / Headline / Title / Body / Label × Large / Medium / Small × Regular / Emphasized = 30 styles). VALUES are CricHeroes' own — not M3 defaults. Real measured font-size range on cricheroes.com is **8 px → 100 px**.

CSS-variable mirror (exposed in `:root` for component CSS consumption):

```
--ch-font-display-lg:    64px    /* hero · marketing only · max one per page */
--ch-font-display-md:    56px
--ch-font-display-sm:    48px
--ch-font-headline-lg:   40px
--ch-font-headline-md:   32px    /* card-hero title, large stat numbers */
--ch-font-headline-sm:   28px
--ch-font-title-lg:      24px    /* page section title */
--ch-font-title-md:      20px    /* subsection title, dialog title */
--ch-font-title-sm:      18px    /* card title, info-card title */
--ch-font-body-lg:       18px    /* large body paragraph (rare) */
--ch-font-body-md:       16px    /* default body */
--ch-font-body-sm:       14px    /* dense body, FAQ answers, table cells */
--ch-font-label-lg:      16px    /* button-label-lg, prominent label */
--ch-font-label-md:      14px    /* navbar links, body-label */
--ch-font-label-sm:      12px    /* SYSTEM FLOOR · uppercase metadata, chip text, table headers */
--ch-font-display-hero: 100px    /* marketing hero only · "NEWS"-scale */
```

**Floor rule:** **12 px is the system floor.** No text below 12 px (`--ch-font-label-sm`) anywhere in the product. Sub-floor pixel sizes are a violation. If a section feels too dense for 12 px, redesign the density — don't shrink the font.

### Component button-label family (own slot)

Buttons have their own typography family so they evolve independently of generic Label tokens:

```
--ch-button-label-sm-family:   var(--font-primary)
--ch-button-label-sm-size:     0.75rem    /* 12 px · Small (32 px button) */
--ch-button-label-sm-lh:       1rem       /* 16 px line-height */
--ch-button-label-sm-weight:   500
--ch-button-label-sm-tracking: 0.04em

--ch-button-label-md-family:   var(--font-primary)
--ch-button-label-md-size:     0.875rem   /* 14 px · Medium (48 px button — default) */
--ch-button-label-md-lh:       1.25rem    /* 20 px */
--ch-button-label-md-weight:   500
--ch-button-label-md-tracking: 0.01em

--ch-button-label-lg-family:   var(--font-primary)
--ch-button-label-lg-size:     1rem       /* 16 px · Large (56 px button — marketing hero) */
--ch-button-label-lg-lh:       1.5rem     /* 24 px */
--ch-button-label-lg-weight:   500
--ch-button-label-lg-tracking: 0.01em
```

These are mirrored to `typography.css` `:root`, `typography.tokens.json` (`components.button.*`), `tailwind.typography.js` (`text-button-label-*`), and live as CSS vars `--ch-button-label-{sm,md,lg}-*`. Changing the var updates every button.

### Weight palette
- **400** (Regular) — body text
- **500** (Medium) — labels, buttons, emphasis
- **600** (SemiBold) — section titles, card titles (occasional)
- **700** (Bold) — headlines, stat numbers, table headers, chip status text

The system uses **400 / 500 / 700** as the core three. **600 is allowed** for specific moments (the H2 lock, card titles) but is not the default.

### M3 ↔ CricHeroes role mapping

| M3 role | CricHeroes value | Used for |
|---|---|---|
| Display Large | 64 px / weight 500/700 | Marketing hero, cover lockup |
| Display Medium | 56 px | rare |
| Display Small | 48 px | rare |
| Headline Large | 40 px | Marketing hero copy |
| Headline Medium | 32 px | **Card-hero title** (tournament / player profile), big stat numbers |
| Headline Small | 28 px | rare |
| Title Large | 24 px | **Page section title** ("Live cricket matches") |
| Title Medium | 20 px | **Subsection title, dialog title** |
| Title Small | 18 px | **Card title, info-card title** ("Match details") |
| Body Large | 18 px | Large body paragraph (rare) |
| Body Medium | 16 px | **Default body text** |
| Body Small | 14 px | Dense body, FAQ answer, table cell content |
| Label Large | 16 px | Button-label-lg, prominent label |
| Label Medium | 14 px | **Navbar links, body-label** |
| Label Small | 12 px | **Chip text, table header, metadata** — the FLOOR |

### Casing (LOCKED RULE) · sentence case for text, Title Case for entities

> **User note (from real usage):** subtitles were found set in uppercase / ALL CAPS. Off-brand. **Brand language = sentence case for all text; Title Case reserved for entities only.**

- **Sentence case everywhere text reads as text** — headlines, **subtitles**, subheads, descriptions, body, helper text, buttons/CTAs. Capitalize only the first word + proper nouns. e.g. "Follow live cricket matches near you", NOT "Follow Live Cricket Matches Near You".
- **Title Case = entities ONLY** — proper nouns: product / feature / team / tournament / association / place names (CricHeroes PRO, Super Sponsor, Black Caps Todabhim, Match Officials).
- **Never set subtitles or any sentence/supporting copy in uppercase.** The ONLY sanctioned uppercase is the letter-spaced overline / eyebrow / label / table-header device (`--ch-font-label-sm`, `letter-spacing: 0.04em+`) — short functional micro-labels, never subtitles or running text. If a string reads as a subtitle or a sentence → sentence case.

---

## 5. Spacing

### 12 foundation tokens (locked)

**The full 4pt-grid scale:**

```
--sp-2:  2px      /* SUB-MICRO · only for stroke + focus offset use cases */
--sp-4:  4px
--sp-8:  8px
--sp-12: 12px
--sp-16: 16px
--sp-20: 20px
--sp-24: 24px
--sp-32: 32px
--sp-40: 40px
--sp-48: 48px
--sp-64: 64px
--sp-80: 80px
```

**Retired tokens — must NOT come back:** `--sp-6`, `--sp-10`, `--sp-96`. These are deliberately DELETED from `:root` (the 4pt grid is enforced at the foundation level, not just by convention).

### 6 hierarchy tiers

| Tier | Tokens | Use |
|---|---|---|
| Sub-Micro | `--sp-2` | Active-state indicator strokes (`inset 0 -2px 0 ...`), focus-ring offsets, nav-link cluster gap. **Never to compress real component spacing.** |
| Micro | `--sp-4` | Tight inline gaps inside a single component (icon ↔ label inside a button) |
| Component | `--sp-8` / `--sp-12` | Padding inside components, gaps between adjacent items |
| Block | `--sp-16` / `--sp-20` / `--sp-24` | Card padding, content blocks, paragraph spacing |
| Layout | `--sp-32` / `--sp-40` / `--sp-48` | Section spacing, large card grids |
| Hero | `--sp-64` / `--sp-80` | Marketing hero / cover only — never product chrome |

### Decision rules

1. **Default to 16 when unsure.**
2. **Same hierarchy = same token.** (e.g., card content↔footer always 16, not sometimes 14 and sometimes 18)
3. **Escalate in real jumps.** 16 → 24 → 48, or 24 → 32 → 64. Adjacent values are not a real hierarchy step.
4. **Hero (64 / 80) only for marketing / cover.** Never product chrome.
5. **`--sp-2` is the floor.** Use only for the listed strokes / offsets. Don't try to compress component spacing with it.

### Real-world spacing measurements (anchor for the system)

From a fresh 10-page crawl of cricheroes.com:

- **Card internal padding dominants:** `16 (×48), 20 (×84), 24 (×44)` → mapped to Standard / Analytics / Spacious card tokens.
- **Card inner child gaps:** `13 (×24, snap 12), 16 (×8), 10 (×11, snap 8/12)` → header↔content 12, content↔footer 16, icon↔title 12.
- **Section vertical padding in production:** `40 (×7 top), 60 (×6 top / ×4 bottom), 72 (×2 bottom)` — half off-grid. New system: **Product sections 48/48, Marketing sections 80/64.**
- **Card grids in production** use `margin-on-child` (parent `gap: 0` everywhere). **New code MUST use parent `gap`:** 16 (dense) / 24 (standard).
- **Off-grid section values snapped:** 40→48 (or kept where compact), 50→48, 60→64, 72→80. Inner gap 13→12, 15→16, 10→8/12.
- **Buttons shipped 30 / 22 / 20 px** (sub-AA) in real cricheroes.com — all collapsed into the locked 32 / 48 / 56 heights.

### Button gap mapping

| Button size | Gap (icon ↔ label) |
|---|---|
| Small (32 px) | `--sp-8` (8 px) |
| Medium (48 px) | `--sp-8` (8 px) |
| Large (56 px) | `--sp-12` (12 px) |

(Previous off-grid 6 · 8 · 10 has been retuned.)

---

## 6. Grid & layout

### 5 breakpoints (Material 3 adapted)

| Breakpoint | Range | Columns | Outer margin | Gutter |
|---|---|---|---|---|
| Compact | 0 – 599 px | 4 | 16 px | 16 px |
| Medium | 600 – 839 px | 8 | 24 px | 24 px |
| Expanded | 840 – 1199 px | 12 | 24 px | 24 px |
| Large | 1200 – 1599 px | 12 | 40 px | 24 px |
| XL | 1600 + px | 12 | 40 px | 24 px |

### 5 containers

| Container | Width | Use |
|---|---|---|
| Narrow | 640 px | Forms, settings, single-action screens |
| Reading | 720 px | Article / prose content — caps at ~65 char per line |
| Standard | 1040 px | Dashboards, secondary pages |
| **Wide** | **1240 px** | **Default product page width** |
| Full | 1440 px | Marketing cap |

### Sidebar

**3 / 12 split.** Sidebar is **240 – 280 px**. Only present at **Large+** (1200 + px viewport). Collapses to a drawer below.

### Density framework

| Density | Card padding | Card gap | Section padding | Use |
|---|---|---|---|---|
| Comfortable | 24 | 24 | 80 / 64 | Marketing, profile, hero |
| **Standard** (default) | 16–20 | 16–24 | 48 / 48 | Default product |
| Dense | 12 | 12–16 | 32–48 | Data, scorecards, analytics |

### Card grid pattern

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(<tile>, 1fr));
gap: var(--sp-16);   /* dense */
gap: var(--sp-24);   /* standard */
```

No media-query forests. The `auto-fill` + `minmax` pattern handles every breakpoint.

### Table strategies

| Strategy | Use |
|---|---|
| **Stretch** | Table fits in container — no horizontal scroll |
| **Scroll** | Table wider than 1240 px — horizontal scroll inside the card |
| **Collapse** | Below Compact (< 600 px viewport) — stack columns vertically |
| **Responsive (column-priority)** | Show high-priority columns first; drop low-priority columns as viewport shrinks |

### CSS variables

```
--bp-compact:  0
--bp-medium:   600
--bp-expanded: 840
--bp-large:    1200
--bp-xl:       1600

--grid-cols-*:    column count per breakpoint
--grid-margin-*:  outer margin per breakpoint
--grid-gutter-*:  gutter per breakpoint

--container-narrow:   640px
--container-reading:  720px
--container-standard: 1040px
--container-wide:     1240px    /* default */
--container-full:     1440px

--nav-height:     56px
--sidebar-width:  240px to 280px
```

---

## 7. Radius & elevation

### 7 radius tokens

| Token | Value | Use |
|---|---|---|
| `--radius-none` | 0 | Sharp corners (rare) |
| `--radius-xs` | 4 px | Input chips, badges, code chips, small swatches |
| `--radius-sm` | 8 px | Buttons (Small / Medium), chips (interactive / metadata), search bar, store badge, inputs |
| `--radius-md` | 12 px | **Default card radius**, buttons (Large), tab-content shell |
| `--radius-lg` | 16 px | M3-aligned · Looking-for card · analytics / promo / large surfaces (shifted 20 → 16 for M3 alignment) |
| `--radius-xl` | 28 px | Modals, drawers, bottom sheets, large dialogs |
| `--radius-full` | 9999 px | Pills, avatars, status chips, FAB, dot indicators |

### 6 numbered elevation levels

```
--elevation-0: none
--elevation-1: 0 0 0 1px rgb(--rgb-black / 0.04)                                  /* ambient hairline */
--elevation-2: 0 1px 2px rgb(--rgb-black / 0.04), 0 1px 3px rgb(--rgb-black / 0.06)   /* card rest */
--elevation-3: 0 4px 12px rgb(--rgb-black / 0.06), 0 1px 3px rgb(--rgb-black / 0.04)  /* card hover, tooltip, popover */
--elevation-4: 0 8px 20px rgb(--rgb-black / 0.08), 0 2px 4px rgb(--rgb-black / 0.06)  /* drawer, dropdown, menu */
--elevation-5: 0 12px 32px rgb(--rgb-black / 0.10), 0 2px 6px rgb(--rgb-black / 0.06) /* modal · always L5 + scrim */
```

Backward-compat aliases (legacy CSS still works):
```
--shadow-ambient: var(--elevation-1)
--shadow-card:    var(--elevation-2)
--shadow-raised:  var(--elevation-3)
--shadow-overlay: var(--elevation-5)
```

### Core rule: one separator per surface

A surface uses **border OR shadow, never both**.

| Component | Default | Hover | Pressed |
|---|---|---|---|
| Card · static (in list) | L0 + border | L2 | L0 + border |
| Card · interactive | L2 | L3 | L1 |
| Card · selected | L2 + brand outline | L3 | L2 |
| Card · dragged | L4 | — | — |
| Modal · default | L5 + scrim | — | — |
| Modal · nested | L5 (second scrim) | — | — |
| Drawer | L4 | — | — |
| Dropdown / select panel | L4 | — | — |
| Menu (overflow, context) | L4 | — | — |
| Tooltip | L3 | — | — |
| Popover (rich in-flow) | L3 | — | — |
| FAB · floating button | L3 | L4 | L2 |
| Sticky nav · at top | L0 (border-bottom) | — | — |
| Sticky nav · after scroll | L1 or L2 | — | — |
| Analytics widget | L0 + border | L0 + border | — |

**Selection is communicated via color, not depth.** **Focus is always a 3 px ring** (chip-specific override uses 2 px via `--focus-ring-chip`).

### Component radius mapping

| Component | Radius |
|---|---|
| Button Small / Medium | `--radius-sm` (8) |
| Button Large | `--radius-md` (12) |
| Input field | `--radius-sm` (8) |
| Search bar | `--radius-full` (pill) |
| Chip — interactive / metadata | `--radius-sm` (8) |
| Chip — status | `--radius-full` (pill) |
| Card (default) | `--radius-md` (12) |
| Card (looking-for classified) | `--radius-lg` (16) |
| Modal / drawer / dialog | `--radius-md` (12) or `--radius-xl` (28) for bottom sheet |
| Avatar / status pill / FAB / live dot | `--radius-full` |

---

## 8. Brand & logo

### Five canonical lockups

| Lockup | Description |
|---|---|
| **Horizontal** | Wordmark + cricket-ball mark, side-by-side |
| **Horizontal Full** | Horizontal + tagline "Your cricket matters" beneath |
| **Vertical** | Stacked mark above wordmark |
| **Vertical Full** | Vertical + tagline beneath wordmark |
| **PRO** (Horizontal / Vertical variants) | Sub-brand lockup — never mixes with base lockup on the same screen |

Each ships as `SVG + PNG + white variant`. Files live in `/logos/` and `/logos/white/`.

### Surface map (LOCKED)

| Surface | Lockup | Size |
|---|---|---|
| **Top nav** | **Horizontal Full with tagline** | **40 px** (locked policy — replaces earlier Horizontal-only recommendation; site's current CSS-text logo is WRONG, must be replaced with SVG) |
| Cover / hero of guidelines page | Horizontal Full | 64 px |
| Footer | Horizontal Full | 40 px |
| Mobile nav (≥ 480 px) | Horizontal Full with tagline | 32 px |
| Mobile nav (< 480 px) | Horizontal (no tagline) | 32 px |
| Mobile nav (< 360 px) | Logomark only | 24 px |
| Collapsed sidenav / favicon / loading | Logomark | 16 px square (MISSING ASSET — must be extracted from `horizontal-logo.svg`) |
| App splash | Vertical Full on red | — |
| PWA / apple-touch / favicon-large | Logomark on red square | 180 / 192 / 512 (MISSING — site only declares `favicon.ico`) |

### Min sizes

| Lockup | Min height |
|---|---|
| Horizontal | 24 px |
| Horizontal Full | 32 px |
| Vertical | 48 px |
| Vertical Full | 80 px |
| Logomark | 16 px square |

### Color pairing rules

| Background | Logo variant |
|---|---|
| Light / white | Red variant (`logos/*.svg`) |
| Red / teal / dark | White variant (`logos/white/*.svg`) |
| Photography | White variant on a 40 % black scrim (the scrim is non-negotiable on photo backgrounds) |

### Clear space

**Clear space around any lockup = 1 × the cricket-ball logomark height.** No element may enter this clear-space buffer.

### Do / don't

**Do:** Use SVG whenever possible. Use the white variant on red / teal / dark / photo. Reserve clear space. Use the PRO lockup only inside PRO surfaces. Replace the current CSS-text nav logo with the Horizontal Full SVG at 40 px.

**Don't:** Recolor the logo (no green "heroes", no blue ball). Don't put the red variant on red, teal, or photo. Don't stretch / skew / rotate. Don't add a drop shadow or outer glow. Don't pair PRO + base lockup on the same screen. Don't go below the minimum sizes.

### Known missing assets

The Brand section calls out two missing assets that must be produced:
1. **Standalone logomark SVG** (the cricket-ball + whale-tail in isolation) — needed for favicon (16/32/48), apple-touch-icon (180), PWA manifest icons (192/512), loading screens, collapsed sidenav, mobile narrow, video watermark, compact PDF footers.
2. **Logomark on red square** (for PWA / apple-touch / favicon-large).

---

## 9. Parabola — brand visual identity

The signature soft-overlapping-oval wallpaper pattern. **Optional, not mandatory.** Used only on genuinely high-priority sections or when explicitly mentioned.

### Three colour variants

| Colour | Asset | When to use |
|---|---|---|
| **White** | `parabolas/white-fhd.jpg` | Neutral filler — when a section feels blank but isn't a priority moment. Adds subtle brand presence without demanding attention. |
| **Green / teal** | `parabolas/green-fhd.jpg` | Action surfaces — CTA cards, suggestion sections, any priority surface that invites interaction. |
| **Red** | `parabolas/red-fhd.png` | RARE — only for team / player / tournament profile backgrounds where the brand red is already the dominant surface. Always opacity-managed so it supports the hierarchy, never breaks it. |

### Three opacity tiers

| Tier | Opacity | Use |
|---|---|---|
| **Default** | 10–20 % (`--parabola-opacity: 0.15`) | Subtle background lift · default state · pattern fades into the surface · "felt, not seen". |
| **Mid** | 30–40 % (`--parabola-opacity: 0.35`) | Brand-flavoured lift · CTA cards, suggestion surfaces · pattern reads as intentional decoration. |
| **Priority** | 50–60 % (`--parabola-opacity: 0.55`) | Hero-moment highlight · launch banners, marketing moments · pattern becomes a visual feature. |

### CSS implementation

```css
.parabola-bg {
  position: relative; overflow: hidden;
  border-radius: var(--radius-md);
  isolation: isolate;
}
.parabola-bg::before {
  content: ''; position: absolute; inset: 0;
  background-image: var(--parabola-img);
  background-size: cover; background-position: center;
  opacity: var(--parabola-opacity, 0.15);
  pointer-events: none;
  z-index: 0;
}
.parabola-bg > * { position: relative; z-index: 1; }

.parabola-white  { --parabola-img: url('parabolas/white-fhd.jpg'); }
.parabola-green  { --parabola-img: url('parabolas/green-fhd.jpg'); }
.parabola-red    { --parabola-img: url('parabolas/red-fhd.png'); }

.parabola-default  { --parabola-opacity: 0.15; }
.parabola-mid      { --parabola-opacity: 0.35; }
.parabola-priority { --parabola-opacity: 0.55; }
```

### Hard rules (locked, user-stated)

1. **Maximum one parabola per page**, regardless of colour. Two parabolas compete and break the visual rhythm.
2. **Never at 100 % opacity** — always at reduced opacity. The pattern is a background presence, never the foreground subject.
3. **Optional** — if a section is normal-priority, do NOT add a parabola just because the system has one. Use it only when explicitly mentioned in the section spec, or when a priority surface needs a brand-flavoured lift.
4. **Foreground always wins** — if content readability drops, lower the opacity tier, don't shift the type colour to fight the parabola.

### Do / don't

**Do:** Use at most one parabola per page. Always reduce opacity per the tier. Match colour to context (green = actionable, red = profile / brand-accent, white = empty-but-not-priority).

**Don't:** Add a parabola to a normal section just because the system has one. Stack two parabolas on a page. Run at 100 % opacity. Shift content colour to fight the parabola. Use the red parabola outside profile / brand-accent contexts.

---

## 10. Buttons

### Locked decisions

**Three sizes only:** Small **32 px** · Medium **48 px** · Large **56 px**.

**Eight variants total** (out of scope: Elevated, Outlined, Ghost, Floating, Split):

1. Filled · Primary (teal)
2. Filled · Tonal (grey)
3. Filled · Warning / Destructive (red)
4. Text · Primary (teal label)
5. Text · Warning / Destructive (red label)
6. Text · Tertiary (black label)
7. Icon-only · Primary (teal)
8. Icon-only · Secondary (grey)

### Colour-role rule (the strict mapping)

User-stated rule (verbatim):
> "SECONDARY BUTTON ARE GREY AS IT USE BUTTON SECONDARY VARIABLES SOO ADD THAT CONTEXT"

| Job | Colour | Token | When |
|---|---|---|---|
| **Primary action** | Teal | `--btn-bg-primary-prominent` | The one highest-priority action on a screen / section / modal / workflow. Save · Continue · Submit · Buy · Start match · Send. |
| **Secondary action** | **Grey tonal** | **`--btn-bg-grey-prominent`** | Lower-emphasis sibling of the primary — paired beside teal so teal stays focal. Cancel · Back · Skip · Maybe later. **Secondary buttons are GREY, not red.** The `--btn-bg-secondary-*` token name is a legacy brand-mapping artefact; semantically the secondary button is tonal grey. |
| **Destructive action** | Red | `--btn-bg-secondary-prominent` | Reserved STRICTLY for irreversible / destructive / high-attention actions. Delete · Remove · End match · Reject · Discard. **Red buttons are NEVER primary CTAs.** If the action isn't destructive, it's teal. |
| **Tertiary / inline link** | Transparent · teal label | `--btn-label-primary-text-prominent` | Lowest-emphasis · supportive action. "Sign in" · "Read more →" · contextual jumps. |

### Button typography

| Size | Height | Padding x | Gap | Type token | Icon size |
|---|---|---|---|---|---|
| Small | 32 px | `--sp-12` | `--sp-8` | `--ch-button-label-sm` (12 px · weight 500 · +0.04 em) | `icon-xs` (16) |
| Medium | 48 px | `--sp-16` | `--sp-8` | `--ch-button-label-md` (14 px · weight 500 · +0.01 em) | `icon-sm` (20) |
| Large | 56 px | `--sp-20` | `--sp-12` | `--ch-button-label-lg` (16 px · weight 500 · +0.01 em) | `icon-md` (24) |

**Note on Large icon size:** Large is capped at `icon-md` (24 px), NOT `icon-lg` (32 px). The 32 / 16 text-to-icon ratio (2.0) reads visually off. `icon-md` at Large gives 24 / 16 = 1.5, matching M3's 56 px filled-button practice. If Large needs more presence later, bump `--ch-button-label-lg` text to 18 px BEFORE reaching for a 32 px icon.

### Hover / pressed

- **Primary teal hover** → `--brand-secondary-60` (deeper teal `#157975`). **Never invent new hover colors.**
- **Pressed** = `--elevation-1` settle (one level below rest), or background-darker for tonal buttons.
- **Focus** = always `--focus-ring` (3 px teal outer @ 30 %).

### Do / don't

**Do:** Make every primary CTA teal. Pair teal with a grey secondary when two actions sit side-by-side. Reserve red for irreversible / destructive moments only. Use the tertiary text button when the action is supportive, not central.

**Don't:** Use red for Save / Submit / Continue / Buy or any forward-action button. Use red as the secondary button beside a teal primary (reads as "Cancel + Delete", never "Cancel + Save"). Pair two teal buttons (one primary per surface). Drop the tonal grey secondary in favour of an outlined button — outlines are explicitly out of scope.

### Size-context map (from cricheroes.com crawl)

- Real cricheroes.com today ships buttons at **40 px (×9 CTAs)** and **30 px (×3 chrome)** — all collapse to **Medium 48**.
- **Large 56** is reserved for marketing hero CTAs (≤ 1 per viewport). Not used in product chrome.
- **Pagination / chrome below 32 are sub-AA and must go up.**

---

## 11. Chips

### M3 taxonomy — 4 categories chosen by JOB, not look

| Category | Use | Style |
|---|---|---|
| **Assist** (~70 % of usage) | Informational metadata · category labels · status pills | Tonal surface + matching label · pill for status, rectangle for category |
| **Filter** | Stateful toggle · ✓ when selected | Rectangle · outline at rest, tonal teal when selected with ✓ leading icon |
| **Input** | User-entered value with ✕ remove + optional 24 px avatar | Rectangle · tonal grey surface · 20 px ✕ trailing button · 24 px avatar (icon-md) with −8 px outset |
| **Suggestion** | System recommendation · "Did you mean", "Trending near you" | Pill or rectangle · tonal teal · pointer cursor |

### Status palette (locked tonal family)

**All status chips use a low-opacity surface so the row reads as ONE cohesive set.** No solid fills, no animation.

User-stated rules (verbatim):
> "for live and ongoing use tonal red bg and red prominent label and for cancelled use red tonal bg and grey label like abandoned and keep all of the other same"
>
> "use the second attached image label color and not the greey one" → originally `--label-primary-low` · **SUPERSEDED** by the later text ban on `-low` / `-muted` steps; Cancelled now uses `--label-primary-medium` (still red-family, just at 52 % instead of 30 %)

| # | State | Surface | Label | Notes |
|---|---|---|---|---|
| 1 | **Live** | `--fill-primary-muted` | `--label-primary-high` | Tonal red bg + red-high label. **NO pulsing dot — removed.** Chip text "Live" is the differentiator. |
| 2 | **Ongoing** | `--fill-primary-muted` | `--label-primary-high` | **VISUALLY IDENTICAL to Live.** Context (chip text + surrounding card) is the only differentiator (Live = match real-time, Ongoing = tournament running). |
| 3 | **Upcoming** | `--fill-secondary-low` | `--label-secondary-high` | Tonal teal — forward-looking. |
| 4 | **Cancelled** | `--fill-primary-muted` | **`--label-primary-medium`** (red @ 52 %) | Same tonal-red surface as Live/Ongoing, label stays red but softer. **Originally used `--label-primary-low` — updated after the `-low` / `-muted` text ban.** Stays in the red family so Cancelled doesn't fully drop into "neutral past" territory. Ranked ABOVE Completed because cancellation is a deliberate exception. |
| 5 | **Completed** | `--fill-grey-low` | `--label-grey-medium` | Tonal grey medium — calm, archival. |
| 6 | **Abandoned** | `--fill-grey-muted` | `--label-grey-medium` | Lighter grey + medium-contrast label · no glyph · communicates "didn't conclude meaningfully" (rain, light, safety). **Originally used `--label-grey-low` — migrated to `-medium` under the text ban.** |

**The pulsing live-dot was removed entirely.** The `.chip-live-dot` rule and `chip-pulse` keyframes are deleted. The status family has NO animation; no special `prefers-reduced-motion` path needed.

### Anatomy (every dimension on-scale)

- **Height:** **32 px** (4pt-grid aligned · M3-aligned; the earlier 28 px CH-density value was dropped because it required off-scale 6 px padding)
- **Horizontal padding:** `--sp-12` (12 px)
- **Vertical padding:** `--sp-8` (8 px · 8 + 16 line-height + 8 = 32 height)
- **Label ↔ leading icon gap:** `--sp-8` (8 px)
- **Label ↔ close (✕) gap:** `--sp-8` · close has 2 px end-margin (`--sp-2`)
- **Border radius:**
  - Status pills → `--radius-full`
  - Interactive / metadata (Assist / Filter / Input) → `--radius-sm` (8 px)
- **Border width:** 0 (filled) · 1 px (outlined Assist / Filter only)
- **Focus ring:** **`--focus-ring-chip`** — 2 px · `rgb(--rgb-secondary / 0.45)`. Chip-specific override of the system's 3 px ring so it doesn't compete with the 32 px chip. WCAG 2.4.13 compliant.
- **Leading / trailing icon size:** `icon-xs` (16 px)
- **Close (✕) icon:** 14 px glyph inside a 20 px circular hit (`--sp-20`)
- **Avatar (Input chips):** 24 px (`icon-md` from the icon scale) with **−8 px outset** (pulls avatar to chip edge)
- **Typography:** `--ch-button-label-sm` (12 px · weight 500 · +0.01 em tracking · line-height 16 px)
- **Case:** **Sentence case everywhere.** First word capitalised, proper nouns retain their casing ("Live", "Ongoing", "Mumbai Indians", "Did you mean"). **ALL CAPS was evaluated and dropped** — at 12 px it added shoutiness without scanability gain.

### Status hierarchy (visual emphasis ranking)

| Rank | State | Reason |
|---|---|---|
| 1 (highest) | Live | Real-time match · the red colour family carries urgency · chip text differentiates from Ongoing |
| 2 | Ongoing | Tournament currently running · visually identical to Live · context differentiates |
| 3 | Upcoming | Future activity · forward-looking · teal family signals scheduled/anticipated |
| 4 | Cancelled | **Deliberately ABOVE Completed** — cancellation is a deliberate exception that warrants attention |
| 5 | Completed | Expected outcome · default end state · calm, archival, predictable |
| 6 (lowest) | Abandoned | Match never reached meaning (rain / light / safety) · lower contrast than Completed · "didn't conclude meaningfully" rather than "ended successfully" · NO glyph (faded treatment is the signal) |

### Diff from canonical M3

M3 doesn't separate negative-deliberate from negative-incidental. **CricHeroes does** — cricket has frequent rain abandonments alongside organiser cancellations, and conflating them loses real product information. Cancelled gets MORE emphasis than Completed (it's an exception); Abandoned gets LESS (it's an incomplete that should scan past without competing with Completed results).

---

## 12. Cards

**15 first-class card patterns + 8 table types**, derived from a 34-page Chrome + CDP crawl of cricheroes.com (full-page screenshots + computed-style extraction).

### Card · base primitive (all cards inherit)

```
background:  var(--bg-primary)
border:      1px solid var(--fill-grey-low)
border-radius: var(--radius-md)         /* 12 px default */
box-shadow:  var(--elevation-2)         /* at rest */
padding:     var(--sp-16)               /* default; some variants override */
overflow:    hidden
```

Hover lifts to `--elevation-3` only when the card is interactive (links to its own page).

### The 15 patterns

**A · Container & layout primitives (2)**
1. **Card · base** — the primitive. Every card inherits.
2. **Hero card** — Tournament hero + Player profile hero. Full-width red surface — IS a card (user-locked). 3-column layout (logo / avatar tile · title-meta-actions · stat-tile cluster). **No top/bottom accent bars** (removed per user). Action button is `--btn-bg-primary-prominent` (teal) — never the white-pill-on-red shortcut.

**B · Collection / list cards (7)**

3. **Match card** (status variants: `live` / `past` / `upcoming`) — `~450 × 215 px` · `--radius-md` · `--bg-primary`. Header band (tournament + venue + format) · status chip top-right · two team rows (`team-name (bold) · 123/4 (10.0)`) · state line ("Need X runs", "Yet to bat", "won the toss and elected to field"). Compact variant for player-profile grid (~300 px wide). Implemented as `.ch-card-msummary`.
4. **Tournament card** — `450 × 117–140 px` · `--radius-md` · `--bg-primary`. Logo tile left (square, `--radius-sm`), title + date range + location stacked right, status chip top-right.
5. **Association testimonial card** — `514 × 389 px` · `--radius-md` · `--bg-primary`. Photo header (16:9) · name + location title · body quote · attribution footer with avatar.
6. **Community category card** — `240 × 140 px` · `--radius-md` · `--bg-primary`. Centred glyph + label · cursor pointer.
7. **Looking-for classified card** — `419 × 174–318 px` · `--radius-lg` (16 — the only non-hero card using `lg`) · `--bg-primary` · `--sp-16` padding. Compact post with 40 px avatar (tonal teal), headline ("X is looking for Y"), description body, footer row with relative time + actions.
8. **Store product card** — `242 × 419 px` · `--radius-md` · transparent bg (image fills). 3:4 image (top), brand line `--ch-font-label-sm`, product name `--ch-font-body-sm` bold, price row (current · was strike-through · red discount %). Sold in horizontal-scrolling row groups.
9. **Featured-guide card** (the "no peach" card) — `288 × 210 px` · `--radius-md` · `--sp-16` padding · bg picked by context: `--fill-grey-muted` (default), `--fill-secondary-muted` (interactive), `--fill-primary-muted` (warning).

**C · Match summary header (1)**

10. **Match summary card** — Top of every match page. Header band (tournament name + format) · venue meta line · status chip top-right · both team rows with scores · current state line. Shares structure with Match card #3 but at larger scale + always-expanded.

**D · Sidebar info cards (3)**

11. **Stat tile card** — Big-number-led mini card. Single, or split-2 (Current RR / Projected Score twin). `--ch-font-headline-md` weight 700 number, `--ch-font-label-md` muted caption.
12. **Info-list card** (3 subtypes — one component) — Section title (`--ch-font-title-sm`) + label-value rows. Subtypes: **Officials** (role-avatar-name rows · `--sp-12` gap), **Details** (label-value pairs · `--sp-4` gap), **Notes** (timeline · `--sp-12` y padding + 1 px divider). All share `.ch-card-info`.
13. **Video stream card** — Thumbnail (16:9 dark gradient `--brand-black` → `--brand-secondary-80`) with red play affordance + "Watch on YouTube" pill · "View All Video Streams" link · `TOTAL VIEWS:` + `LIVE VIEWERS:` counters.

**E · Visualisation (1)**

14. **Chart card** — Frame for every Analysis-tab chart. Header (title · scope chip · expand icon) · body 180 px tall · gradient grey background · bar elements use `--fill-secondary-high` / `--fill-primary-high` alternating. Variants: Manhattan · Run Rate · Worm · Wickets Pie · Types of Runs · Partnerships.

**F · Squad / team (1)**

15. **Squad tile** — `112 px wide` · `--radius-md`. Photo top (1:1 aspect · `--fill-primary-prominent` default cap glyph) · name below (`--ch-font-label-sm` weight 500) · captain `(C)` / wicketkeeper `(WK)` inline · ✓ teal pin top-right when selected for playing 11. **PRO badge slot is DELIBERATELY NOT included — deferred to Badges work.**

**G · Feed (1)**

16. **Feed item** — One component, 5 variants for the commentary stream. Result-badge colours follow chip palette:
   - `ball` — `over.ball` label (mono grey) · 28 px result badge · headline + dismissal sub
   - `over-summary` — grey-muted band · "END OF OVER N" + total runs/wickets · current batters + bowlers
   - `batter-intro` — 40 px tonal-teal avatar + "NEXT" + handedness + stats inline
   - `bowler-intro` — stumps icon + entry line
   - `event` — star icon + cheer line

   **Result badge colours:**
   - `W` → `--fill-primary-prominent` + `--label-static-white-high` (red)
   - `6` → `--fill-secondary-prominent` + `--label-static-white-high` (teal)
   - `4` → `--fill-secondary-muted` + `--label-secondary-high` (tonal teal)
   - `runs` (1/2/3) → `--fill-grey-muted` + `--label-grey-high` (grey)
   - `dot` (0) → `--fill-grey-low` + `--label-grey-medium` (faint grey)

**H · Utility (1)**

17. **Empty-state card** — `--sp-32 var(--sp-24)` padding · centred icon (56 × 56 circle, `--fill-grey-muted`) + headline (`--ch-font-body-md` weight 600) + helper line (`--ch-font-body-sm` muted, max 320 px).

(Index numbering: the system documentation refers to "15 first-class patterns" by counting Hero as 1 — internal layout is the 17 above.)

### Coverage gaps (auth-walled — anatomy extracted from screenshots only)

The Cards section ends with an explicit warning-tonal callout listing what could NOT be measured directly:

- **Past-match tabs** (Info · Insights · Heroes · Badges · Squad) — anatomy slotted into existing patterns; needs logged-in capture
- **Tournament tabs** (Leaderboard · Points Table · Stats · Heroes) — Points Table T8 anatomy reconstructed from screenshots; live capture needs login
- **Community sub-pages** (`/community/scorers`, `/community/academies`) — almost certainly use the Looking-for classified card
- **PRO crown / verified-tick badges** — intentionally deferred to Badges work

---

## 13. Tables

Tables live inside cards or directly inside the tab-content shell. Token-pure throughout.

### Common table CSS

```
font-size:    var(--ch-font-body-sm)  /* 14 px */
color:        var(--label-grey-high)

header row:   --fill-grey-muted band · uppercase · weight 700 · letter-spacing 0.04em · --label-grey-medium
row dividers: 1 px --fill-grey-low
numeric cells: right-aligned · font-family: var(--font-mono) · class .num
player names: --label-secondary-high · text-decoration: none · class .player-link
player.captain::after: " (C)"
dismissal:    --label-grey-medium · font-size: --ch-font-label-sm · display: block · margin-top: var(--sp-2)
```

### The 8 table types

| ID | Table | Columns / structure |
|---|---|---|
| **T1** | Batting scorecard | Batters · dismissal text · R · B · 4s · 6s · SR · Min |
| **T2** | Bowling scorecard | Bowlers · O · M · R · W · 0s · 4s · 6s · WD · NB · Eco |
| **T3** | Live mini-batters | Batters · R · B · 4s · 6s · SR (only current batters · `*` marks active) |
| **T4** | Live mini-bowlers | Bowlers · O · M · R · W · Eco (current bowler `*`) |
| **T5** | Fall of Wickets | Inline row (not strictly a table) — `1-1 (Ankur Jain, 1 ov), 41-2 (...), ...` · footer under T1 |
| **T6** | Extras & Yet-to-bat | Label-aligned footer rows under T1 — `Extras (b 1, wd 9, nb 2, lb 2) = 14` / `Yet to Bat: SANJU JAIN, ...` |
| **T7** | MVP leaderboard | Avatar + name + team(s) · grouped metric cells (Batting · Bowling · Fielding) · Total · trophy icon |
| **T8** | Points table | Team logo + name · M · W · L · T · NR · NRR · Pts (anatomy from screenshots — auth-walled in crawl) |

---

## 14. Components module

**17 interactive components** that every screen relies on. All token-pure. Buttons / Chips / Cards live in their own sections; this module catalogues everything else.

### Layout context (the rule that opens the section)

**Width is a layout decision, not a component property.** Never hard-code a pixel width inside the component itself. Every component is **full-width within its parent column by default**.

| Context | Behaviour | Container rule |
|---|---|---|
| **Full-width** (no sidebar) | Component spans the entire content area, capped by `--container-wide` (1240 px) | Default — no max-width on the component |
| **Adjusted** (sidebar present) | Main column shrinks to ~9/12 of the grid (sidebar takes 3/12 = 240–280 px); component shrinks with it | Same component, no special variant — fluid handles it |
| **Centered** (standalone moment) | Wrap in centred flex with sensible max-width | 440 forms · 320 menus · 296 date picker · 520 search |
| **Inline** (within a row) | Component takes only the width its content needs | Use intrinsic size — never set a width |

### The 17 components

**1 · Navbar** — Site-wide top navigation. **72 px** white surface · 1 px bottom border on the wrapper (no top/bottom accent bars — those were removed). Horizontal Full logo with tagline (44 px) on the left, dropdown nav links centered, then app-store badges, profile avatar, search trigger on the right.
- Links: `--ch-font-label-md` · weight 700 · `--label-grey-high` at rest, `--label-secondary-high` on hover/active
- Dropdown chevron: 8 px · built from two borders rotated 45° (inherits link colour)
- App badges: 32 × 32 · `--radius-xs` · Google Play 4-colour glyph + Apple App Store stylized "A" on blue gradient · official external brand glyphs (audit carve-out)
- Avatar: 36 × 36 · `--radius-full` · `--fill-secondary-muted` background · tonal teal initials · 2 px white inner ring + 1 px grey-low outer ring · PRO badge slot intentionally empty
- Search trigger: 36 × 36 ghost button · hover → `--fill-grey-muted`

**2 · Input field** — 48 px tall · `--radius-sm` · `--bg-primary` · 1 px `--fill-grey-high` border at rest.
- Focus: `--fill-secondary-prominent` border + 3 px `rgb(--rgb-secondary / 0.18)` focus ring
- Error: `--fill-primary-prominent` border + red helper text (`--label-primary-high`)
- Disabled: `--fill-grey-muted` surface · `--label-grey-medium` colour · cursor not-allowed
- Helper text: `--ch-font-label-sm` · `--label-grey-medium`
- Label: `--ch-font-label-sm` · weight 600 · uppercase · letter-spacing 0.04em · `--label-grey-medium`

**3 · Tab bar** — Two patterns, both with teal active state:
- **Underline tabs** — in-page primary nav (match summary, tournament detail). Padding `--sp-12 --sp-16` · 2 px transparent underline at rest · active = `--label-secondary-high` text + `--fill-secondary-prominent` 2 px underline + weight 700.
- **Segmented control** — filter / view-mode toggle. Container `--fill-grey-muted` · `--radius-full` · 4 px padding. Active tab = `--bg-primary` + `--elevation-2` + `--label-grey-high` + weight 600.

**4 · Carousel** — 220 px container · `--radius-md` · floating elevation-3 white arrow buttons.
- Dots: 8 × 8 · `--radius-full` · `rgb(--rgb-white / 0.6)` at rest, `--fill-secondary-prominent` + width 24 px when active.

**5 · Checkbox · teal** — 20 × 20 · `--radius-xs` · 2 px `--fill-grey-high` border · `--bg-primary`.
- Checked / indeterminate: `--fill-secondary-prominent` fill + `--label-static-white-high` glyph (✓ or –)
- Disabled: opacity 0.4
- **Never red.**

**6 · Date / time picker** — 296 px popover · `--radius-md` · `--elevation-3` · `--sp-16` padding.
- Today: 1 px `--fill-secondary-prominent` inset ring + `--label-secondary-high` text · weight 700
- Selected: `--fill-secondary-prominent` solid pill + `--label-static-white-high`
- Out-of-month: `--label-grey-medium` (was `--label-grey-low` — migrated under the text ban)
- Cells: aspect 1:1 · `--radius-full` · hover → `--fill-grey-muted`

**7 · Dialog** — `--radius-md` · `--elevation-5` · max-width 440 px · `rgb(--rgb-black / 0.40)` scrim.
- Title: `--ch-font-title-md` · weight 700 · `--label-grey-high`
- Body: `--ch-font-body-sm` · `--label-grey-medium` · line-height 1.6
- Close: 32 × 32 ghost button top-right · hover → `--fill-grey-muted`
- Actions: flex right · `--sp-8` gap · destructive uses Warning (red) Filled, non-destructive uses Primary (teal)

**8 · Divider** — Four shapes:
- 1 px hairline `--fill-grey-low` (default)
- 8 px thick band `--fill-grey-muted` (page-band separator)
- Vertical 1 px (inline)
- Labelled (1 px lines + centred uppercase label `--ch-font-label-sm` 0.04em `--label-grey-medium`)

**9 · Loading & Progress** — All teal · all animations respect `prefers-reduced-motion`:
- **Circular spinner**: 32 × 32 default · 20 × 20 small · 48 × 48 large · 3 px border `--fill-grey-muted` with top-border `--fill-secondary-prominent` · `ch-cmp-spin 0.8s linear infinite`
- **Linear progress**: 6 px tall · `--fill-grey-muted` track · `--fill-secondary-prominent` fill · indeterminate uses `ch-cmp-progress 1.5s ease-in-out infinite`
- **Bouncing dots**: 8 × 8 circles · `--fill-secondary-prominent` · staggered `ch-cmp-dot 1.2s ease-in-out infinite`
- **Skeleton shimmer**: `--fill-grey-muted` → `--fill-grey-low` linear gradient · 200 % background-size · `ch-cmp-shimmer 1.6s ease-in-out infinite`

**10 · Menu (dropdown)** — `--elevation-4` floating list · `--sp-4` outer padding · min-width 220 px.
- Items: `--sp-8 var(--sp-12)` padding · `--radius-sm`
- Hover: `--fill-grey-muted`
- Selected: `--fill-secondary-muted` + `--label-secondary-high` + weight 600
- Destructive: `--label-primary-high` label, `--fill-primary-muted` hover
- Disabled: `--label-grey-medium` · no hover
- Divider: 1 px `--fill-grey-low` (inline divider before destructive)

**11 · Radio button · teal** — 20 × 20 circle · 2 px `--fill-grey-high` border · `--bg-primary`.
- Selected: border-color `--fill-secondary-prominent` + 10 × 10 inner dot `--fill-secondary-prominent`
- Disabled: opacity 0.4
- **Never red.**

**12 · Search bar** — Pill (`--radius-full`) · 48 px tall · `--fill-grey-muted` background · 1 px transparent border at rest.
- Focus-within: `--bg-primary` background + `--fill-secondary-prominent` border + 3 px `rgb(--rgb-secondary / 0.18)` ring
- Leading magnifier SVG (20 × 20 · `--label-grey-medium`)
- Trailing clear button (20 × 20 · `--fill-grey-high` background · `--label-static-white-high` ✕)

**13 · Tooltip** — Dark `--brand-black` surface · `--label-static-white-high` text · `--ch-font-label-sm` weight 500 · `--sp-8 var(--sp-12)` padding · `--radius-xs` · `--elevation-3`.
- 4 px arrow (rotated square via `::after`).

**14 · Slider** — Track 4 px `--fill-grey-muted` · `--radius-full`. Fill 4 px `--fill-secondary-prominent`. Thumb 20 px circle `--fill-secondary-prominent` + 2 px white ring + `--elevation-2`. Floating value label above on drag.

**15 · Snackbar / Toast** — `--brand-black` (default) · `--fill-secondary-prominent` (success) · `--fill-primary-prominent` (error) · `--radius-sm` · `--elevation-4` · `--sp-12 var(--sp-16)` padding.
- Message: `--ch-font-body-sm` · `--label-static-white-high`
- Action label: bright teal `rgb(--rgb-secondary-30)` on dark · weight 700 · uppercase · 0.04em — **so it reads interactive on dark without breaking the no-red-action rule**

**16 · App Store badge (Apple + Google)** — Full pill `Download on the App Store` / `Get it on Google Play`. Two sizes:

| | Default | Small (footer) |
|---|---|---|
| Height | 48 px | 40 px |
| Padding x | `--sp-16` | `--sp-12` |
| Gap (icon ↔ text) | `--sp-12` | `--sp-8` |
| Icon size | 24 px | 20 px |
| Top label | `--ch-font-label-sm` (12 · weight 400 · opacity 0.92) | same |
| Bottom label | `--ch-font-label-lg` (16 · weight 600) | `--ch-font-body-sm` (14 · weight 600) |

Surface: `--brand-black` · 1 px `rgb(--rgb-white / 0.18)` border · `--radius-sm`. Hover → `rgb(--rgb-black / 0.85)`.

**Always show both badges paired.** Never one platform alone. Default 48 = home-header centre under hero. Small 40 = footer brand column. For production, link to real store URLs and use Apple/Google official PNG/SVG assets.

**17 · FAQ accordion** — Native `<details>` / `<summary>` so keyboard / screen readers / open-close state work without JS. One bordered card holds the whole list.
- Container: `--bg-primary` · 1 px `--fill-grey-low` · `--radius-md`
- Row divider: 1 px `--fill-grey-low` between items
- Question (`summary`): `--ch-font-body-md` weight 600 · `--label-grey-high` · padding `--sp-20 var(--sp-24)` · hover lifts to `--fill-grey-muted` · focus lifts to `--fill-secondary-muted` + teal label
- Chevron: 18 px SVG · `--label-secondary-high` · 200 ms rotate 180° when open
- Answer: `--ch-font-body-sm` · `--label-grey-medium` · line-height 1.7 · padding `0 --sp-24 --sp-20` (indented under question text). Inline links → `--label-secondary-high`
- Rules: Open the first item by default · max ~10 items per accordion (sub-group if more) · never put critical info inside collapsed answers

### Component animations (prefixed keyframes — won't clash)

```
@keyframes ch-cmp-spin     { to { transform: rotate(360deg); } }
@keyframes ch-cmp-progress { 0% { margin-left: -35%; } 50% { margin-left: 50%; } 100% { margin-left: 100%; } }
@keyframes ch-cmp-dot      { 0%,80%,100% { opacity: 0.3; transform: scale(0.7); } 40% { opacity: 1; transform: scale(1); } }
@keyframes ch-cmp-shimmer  { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
```

---

## 15. Iconography

### 5-step semantic scale

| Token | Size | Use |
|---|---|---|
| `icon-xs` | **16 px** | Small button (32) · inline body · chip icon |
| `icon-sm` | **20 px** | Medium button (48) · search bar leading · field input |
| `icon-md` | **24 px** | Large button (56) · Input chip avatar · default UI icon |
| `icon-lg` | **32 px** | Section header · FAB · prominent action |
| `icon-xl` | **48 px** | Hero / empty-state · onboarding |

### Library structure

```
icon-library/
├── icon-library.html    /* self-contained icon browser */
├── manifest.json        /* JSON catalogue of all icons */
├── README.md
└── icons/               /* 4,600 SVGs total */
    ├── <icon-name>/
    │   ├── 16/{outline,solid,...}.svg
    │   ├── 20/{...}.svg
    │   ├── 24/{...}.svg
    │   ├── 32/{...}.svg
    │   └── 48/{...}.svg
```

**184 distinct icons × 5 sizes × 5 fill types = 4,600 SVGs.**

### Stroke / fill conventions

- Default stroke: 2 px · `stroke-linecap: round` · `stroke-linejoin: round`
- Default colour: `--label-grey-high` (`--icon-grey-prominent`) — black/neutral
- Action icons: `--label-secondary-high` (teal) when interactive
- Brand icons: `--icon-primary-high` (red) — rare, brand moments only
- Disabled icons: `--icon-grey-medium` (50 %)
- Icons on dark surface: `--icon-static-white`

### Iconography principles (from the design system)

- Follow a **"necessity over aesthetics"** approach — use an icon only when removing it would negatively impact understanding, recognition, or task completion.
- If the meaning is already clear through text, do not add an icon unless it improves scannability.
- Prioritise simplicity and reduce visual noise.
- Maintain consistency across the product.
- Icons should support content, not compete with it.
- Designers should be able to justify the presence of every icon.

---

## 16. Token-compliance contract

The full guidelines HTML passes a 5-check audit on every save:

| Check | Pass criterion |
|---|---|
| **Raw hex outside `:root`** | 0 occurrences in CSS rules or `style="..."` attributes (except inside `<code>` / documentation displays) |
| **Raw `rgba()` / `hsla()` literals** | 0 occurrences — every alpha-using color goes through `rgb(var(--rgb-*) / X)` |
| **Off-scale `font-size`** | 0 occurrences — every font-size matches the M3 type scale (12 / 14 / 16 / 18 / 20 / 24 / 28 / 32 / 40 / 48 / 56 / 64 / 100 px) |
| **Off-scale `padding` / `margin` / `gap`** | 0 occurrences — every value matches the 12-token scale (0 / 1 / 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80) · 1, 2, 3 allowed for structural borders / strokes |
| **Raw `border-radius`** | 0 occurrences — every value matches `--radius-*` (0 / 4 / 8 / 12 / 16 / 28 / 9999) |

### Sanctioned exceptions

Three places where literal hex values are allowed outside `:root` (and the audit explicitly carves them out):

1. **Google Play 4-colour glyph** — official external brand asset (the `aria-label="Get on Google Play"` button SVG uses Google's blue `#4285F4` / green `#34A853` / yellow `#FBBC05` / red `#EA4335`).
2. **Apple App Store icon** — official Apple-brand gradient (`#1AC9FE → #0073F7`) + white "A" glyph (the `aria-label="Download on the App Store"` button SVG).
3. **Store-badge component (#16 in Components)** — the Apple silhouette SVG and the 4-colour Google triangle inside the full Download pill.

These are the ONLY places where literal hex appears in HTML / inline styles. Everything else in the entire HTML file consumes tokens.

### Going-forward rule

> Any new CSS in this file MUST reach through tokens — **no raw hex**, **no raw rgba** (outside `rgb(var(--rgb-*) / X)`), **no off-scale px in padding/margin/gap**, **no font-size below the 12 px floor**.

---

## 17. Layout context

Already covered under **Components → Layout context**. Restating here as a single referenceable section:

### When components are full-width

- A form / list / table / chart inside the default 1240 px wide product container with no sidebar.
- The component renders at the full content area width.

### When components are adjusted (sidebar present)

- Pages at Large+ breakpoint (≥ 1200 px) that include a sidebar.
- Sidebar takes 3/12 of the grid (240–280 px); the main column shrinks to ~9/12.
- **The component itself does not change** — it shrinks because its parent column shrank.

### When components are centered (standalone moment)

- Auth dialogs · empty-state search · single-purpose pickers · "the component IS the page" moments.
- Wrap in a centred flex container with a max-width:

| Component | Max width when centered |
|---|---|
| Form | 440 px |
| Menu | 320 px |
| Date picker | 296 px |
| Search bar (standalone) | 520 px |

### When components are inline (within a row)

- Inline chip in a header · search trigger in a navbar · slider beside a value cell.
- Use intrinsic content width — never set a width on the component.

### The Don't list

- **Don't hard-code a pixel width inside the component itself.**
- **Don't centre a component by default** — only when it's a standalone moment.
- **Don't shrink components below the readable minimum** — forms never below 280 px, date picker 296 px is the floor.

---

## 18. File structure & assets

```
CH- Web Design System/
├── README.md                                   # human-friendly overview
├── AI-CONTEXT.md                                # THIS FILE — exhaustive AI reference
├── cricheroes-design-guidelines.html            # the system (12 modules, ~600 KB, self-contained · WEB ONLY)
├── card-inventory.md                            # Phase-1 research: 43 raw card patterns → 15 consolidated
│
├── Color System/                                # standalone colour-philosophy mini-page
│   ├── cricheroes-color-system.html
│   ├── cricheroes-color-system.md
│   ├── logos/                                   # local copies needed by the standalone page
│   └── parabola/                                # local copies (singular folder name) — { -green.jpg, -red.png, -white.jpg }
│
├── logos/                                       # 5 lockups × red + white variants
│   ├── horizontal-logo.svg                      # Horizontal · wordmark
│   ├── horizontal-logo-full.svg                 # Horizontal · with tagline  ← navbar / footer / cover
│   ├── horizontal-logo-pro.svg                  # PRO sub-brand horizontal
│   ├── vertical-logo.svg                        # Vertical · stacked
│   ├── vertical-logo-full.svg                   # Vertical · with tagline
│   ├── vertical-logo-pro.svg                    # PRO vertical
│   ├── *.png                                    # raster fallbacks of each
│   └── white/                                   # white-variant set for red/teal/dark/photo surfaces
│
├── parabolas/                                   # brand visual identity wallpapers
│   ├── green-fhd.jpg                            # 1920×1080 · used at opacity tier  ← references in HTML
│   ├── red-fhd.png
│   └── white-fhd.jpg
│
├── illustrations/                               # 18 dismissal line-art figures + run-out compositions
│   ├── fielder-1.svg
│   ├── fielder-2.svg
│   └── fielder-1-bowler-v1.svg
│
├── icon-library/                                # 4,600 SVG icons
│   ├── icon-library.html                        # self-contained browser/picker
│   ├── manifest.json                            # JSON catalogue
│   ├── README.md
│   └── icons/<name>/{16,20,24,32,48}/*.svg      # 184 icons × 5 sizes × 5 fills
│
└── typography/                                  # 30-style M3 type scale, multi-format
    ├── typography.css                           # CSS with --md-sys-typescale-* + --ch-button-label-* tokens
    ├── typography.tokens.json                   # JSON design tokens (incl. components.button.*)
    ├── tailwind.typography.js                   # Tailwind preset (text-display-lg, text-headline-md, etc.)
    └── TYPOGRAPHY.md                            # M3 mapping + context map + section docs
```

### What the HTML references (resolve these paths)

`cricheroes-design-guidelines.html` references:
- `logos/horizontal-logo-full.svg` — navbar + footer + cover + Home Brand tile
- `parabolas/green-fhd.jpg` / `parabolas/red-fhd.png` / `parabolas/white-fhd.jpg` — Brand → Parabola subsection
- Inline SVGs — all icon glyphs in the page chrome (not the icon-library; the icon-library is a separate `icon-library.html`)

`Color System/cricheroes-color-system.html` references:
- `parabola/parabola-green.jpg` / `parabola/parabola-red.png` / `parabola/parabola-white.jpg` (folder named **singular** — different from `parabolas/` at the top level)

### Self-containment

The HTML page has **no CDN / no external font dependency** apart from the Ubuntu / Ubuntu Sans web fonts (already loaded via Google Fonts in the page head — the only network dependency). Drop the folder on any webserver, double-click `cricheroes-design-guidelines.html`, and the entire system loads from the adjacent files.

---

## 19. User-locked decisions (verbatim quotes)

Every locked rule below is a direct user statement. Treat these as immovable.

### On the colour system

> "Make every button, CTA, CTA card and link teal. Default text to `--label-grey-high`. Reach for red only as an accent — a brand-flavoured heading word, a live signal, or a profile background held back with opacity. Always consume Tier 2 / Tier 3 tokens, never raw hex."

> "Don't paint actions red — no red 'Save', 'Submit' or 'Buy'. Don't use teal for plain body text. Don't let red carry more than a small share of any screen. Don't apply opacity on a text node — pick the right `--label-*` step instead."

> "red buttons are not primary buttons they're destructive button striclty"

> "IT IS MENTIONED GREEN FOR CTA AND NEUTRAL FOR OTHER BUT SECONDARY BUTTON ARE GREY AS IT USE BUTTON SECONDARY VARIABLES SOO ADD THAT CONTEXT"

> "strictly dont add peach color at all; keep my color system as as it is for peach one use grey/light or secondary fill/light as per the usage of it based on the context"

### On the chip system

> "for live and ongoing use tonal red bg and red prominent label and for cancelled use red tonal bg and grey label like abandoned and keep all of the other same"

> "use the second attached image label color and not the greey one"  (originally locked Cancelled to `--label-primary-low`; **superseded by the text ban** — Cancelled now uses `--label-primary-medium`)
>
> "dont use this colors text at all as i've tested this design system and have used this in some cases which has created chaos soo please dint use this in the text at all"  (the `-low` / `-muted` label ban · never use for text)

> "dont use capital in chips; use sentence case only"

### On the parabola

> "also add parabolas as the accent thing; also you could add a section for parabola; this is a visual identity of brand soo should be used one parabola should be used once in a page only irrespective of which color parabola you use; just a small tweal for parabola dont use any parabola wwith 100% opacity; always lover to 50-60% for highest priority thing - for highlighting at its maximum and when the priority is mid use 30-40% AND FOR default state USE 10-20% OPACITY BG"

> "USING ONE PARABOLA IS NOT NECCESARY STRICTLY; USE ONLY WHEN THE SECTION IS PROPRIRY AS PER THE FLOW; IF ITS NORMAL DONT ADD PARABOLA FORCEFULLY OR ADD IT WHEN EXPLICITY MENTIONED IN THE SECTION"

> "red- as mentioned used very rarely and in terms of accent like in team, player , tournaent profile bg and should be strictly used managing the opacity soo that hierarchy is established well"

### On Rule 00 / creativity

> "you can add motion, you can use any creative layout you want as per the content style and the overall aim of the page like some will be basic pages - which are utility pages or progress pages or it could be anuthing; some will be landing informationary pages - whcih needs something creative to be there maybe some sections overall visuals or anything it could be; soo basically depending upon aim purpose what the page is for the design will be created this design sytem just sets the foundation of visual thing creativity is the core of design soo it shoukd be there you're free to explore out different layout strategy patterns as per user experiment and the end goal of the page"

### On the Hero card

> "Tournament/Player hero header — should this be a card or a section (page-level header)? Cards are normally rectangular content blocks; these are full-width red bands. **its a card only**"

### On the navbar

> "remove green line border from top and red line from bottom and for app store use specifically appstore's icon"

### On the PRO badge

> "pro is a badge which we will be discussing out on further and will aslo add that soo add ignore it as of now add it while we work on it"

(Deferred — never bake PRO badge slots into Avatar or Squad Tile components until the Badges work is done.)

### On commentary feed

> "Commentary feed rows — model as one `<FeedItem>` with type variants, or 5 separate row components? I'd recommend one with variants. **yes**"

### On tab-content shells

> "Tab-content shell + tab strip — should these be one component ('tabbed card') or two? — **in tabs there are cards soo use cards as types**"

(The tab strip is structural navigation; the THINGS INSIDE tabs are cards. Do not make the tab strip itself its own card component.)

### On tables

> "Build each table type (#19-#26) as a sub-section under Cards or split into its own 'Tables' section if you'd prefer. **yess**" (sub-section under Cards)

---

## 20. AI implementation guide

When generating code or design specs for CricHeroes web product:

### Always

1. **Reach through tokens.** Every color goes through `--bg-*` / `--fill-*` / `--label-*` / `--icon-*` / `--btn-*`. Every spacing goes through `--sp-*`. Every radius goes through `--radius-*`. Every elevation through `--elevation-*`. Every type size through `--ch-font-*`. Every font family through `--font-*`.
2. **Preserve opacity** as `rgb(var(--rgb-*) / <alpha>)`. Never flatten into pre-blended hex.
3. **Pick the colour by job, not appearance.** Primary CTA → teal. Secondary action → grey tonal. Destructive → red. Neutral → grey/black/white. Brand accent → red (sparingly).
4. **Default to 16 spacing** when unsure. Escalate in real jumps (16 → 24 → 48).
5. **Default card radius is 12 px** (`--radius-md`). Default elevation is `--elevation-2`. Default surface is `--bg-primary`.
6. **Treat 12 px as the type floor.** No text below 12 px anywhere.
7. **Sentence case** for chips and most labels (uppercase only for tiny section eyebrows / table headers / dividers — and there only at `--ch-font-label-sm` with `letter-spacing: 0.04em+`).
8. **One Primary CTA per view.** Pair with a grey tonal secondary if a second action is needed.
9. **Width is layout, not component.** Don't hard-code widths on components — let parent columns drive width.
10. **Composability over invention.** If an existing card / chip / component covers the case, reuse it. Only build a new pattern when nothing composes.

### Never

1. Use a hex value outside `:root` in component CSS or inline styles.
2. Use red for a primary action, save, submit, continue, or buy button. (Red = destructive only.)
3. Use teal for plain body text. (Teal = action color; body text is grey hierarchy.)
4. Stack opacity on opacity, or apply `opacity:` to a text node (use the right `--label-*` step instead).
5. Bring back retired tokens `--sp-6`, `--sp-10`, `--sp-96` — these are deleted from `:root`.
6. Add a peach token — use existing greys/teal/red tonal surfaces by context for educational / promo / warning callouts.
7. Bake a PRO badge slot into the Avatar or Squad Tile components yet — that's deferred.
8. Add the pulsing live-dot — that animation was explicitly removed from the chip system.
9. Use solid status chip fills — all status chips are tonal (low-opacity surface + matching label).
10. Use red as the secondary button beside a teal primary — that reads as "Cancel + Delete", never "Cancel + Save".
11. Stack two parabolas on a single page, or run a parabola at 100 % opacity.
12. Add a top accent bar or bottom accent bar to the navbar (those were explicitly removed).

### Component-class naming convention

| Family | Class prefix |
|---|---|
| Chips | `.chip` + `.chip-status-<state>` + `.chip-<category>` |
| Cards | `.ch-card-<type>` (e.g. `.ch-card-hero`, `.ch-card-classified`) |
| Tables | `.ch-tbl` + `.ch-tbl-<variant>` (`-mini`, `-points`, `-mvp`) |
| Components | `.ch-cmp-<name>` (e.g. `.ch-cmp-navbar`, `.ch-cmp-faq`) |
| Doc-panel (icons section) | `.doc-panel-*` |
| Home-card previews | `.home-card-*`, `.hcp-*` |
| Buttons | `.dsb` + `.dsb-<size>` + `.dsb-<variant>` (the formal button system) and `.btn` legacy aliases |

### Quick-pick token reference

When generating code, use these defaults:

```
/* Surface */                  background: var(--bg-primary);
/* Page bg */                  background: var(--bg-secondary);
/* Card border */              border: 1px solid var(--fill-grey-low);
/* Card radius */              border-radius: var(--radius-md);
/* Card elevation at rest */   box-shadow: var(--elevation-2);
/* Card padding */             padding: var(--sp-16);

/* Primary text */             color: var(--label-grey-high);
/* Secondary text */           color: var(--label-grey-medium);
/* Link text */                color: var(--label-secondary-high);

/* Primary CTA */              background: var(--btn-bg-primary-prominent);
                              color:      var(--btn-label-primary-prominent);
                              /* hover */ background: var(--brand-secondary-60);

/* Secondary action */         background: var(--btn-bg-grey-prominent);
                              color:      var(--label-grey-high);

/* Destructive */              background: var(--btn-bg-secondary-prominent);
                              color:      var(--btn-label-secondary-prominent);

/* Focus ring */               box-shadow: var(--focus-ring);
/* Chip focus override */      box-shadow: var(--focus-ring-chip);
```

---

## 21. Known gaps & deferred items

These are flagged explicitly so future work picks them up:

| Item | Status | Where |
|---|---|---|
| **PRO badge / verified tick on avatars** | DEFERRED — wait for Badges work | Avatar in navbar + Squad tile in Cards — slots intentionally empty |
| **Standalone logomark SVG** (cricket-ball isolated) | MISSING — must be extracted from `horizontal-logo.svg` | Used by favicon (16/32/48), apple-touch-icon (180), PWA icons (192/512), collapsed sidenav, mobile narrow |
| **Logomark on red square** for PWA / apple-touch | MISSING | Needed for proper iOS / Android PWA install icon |
| **Past-match tabs anatomy** (Info · Insights · Heroes · Badges · Squad) | Auth-walled — slot into existing patterns when capturable | Cards section has a callout flagging these |
| **Tournament tabs anatomy** (Leaderboard · Points Table · Stats · Heroes) | Auth-walled — Points Table T8 reconstructed from screenshots only | Cards section callout |
| **Community sub-pages anatomy** (`/community/scorers`, etc.) | Auth-walled — likely reuses Looking-for classified card | Cards section callout |
| **Token naming legacy** | `--btn-bg-secondary-prominent` (red) and `--btn-label-secondary-prominent` are misleadingly named — they represent the DESTRUCTIVE button, not the semantic "secondary action" (which is grey). Documented in Button colour-role rule. | Eventual rename to `--btn-bg-destructive-*` is desirable but breaks downstream consumers. |

---

*End of AI-CONTEXT.md. If any rule in this file conflicts with the live `cricheroes-design-guidelines.html`, the HTML wins on visual examples and this file wins on written rules — until a corrective update reconciles them.*
