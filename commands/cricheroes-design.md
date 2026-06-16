---
description: Build an on-brand CricHeroes UI (component, screen, or page) using the design system.
argument-hint: "<what to build, e.g. 'a tournament leaderboard card'>"
---

Build the requested UI **on-brand for CricHeroes**. Load the `cricheroes-design` skill first for tokens, component specs, and voice.

Requested: `$ARGUMENTS`

Rules:
1. Link `skills/cricheroes-design/colors_and_type.css`; use `var(--ch-*)` / `var(--space-*)` / `var(--radius-*)` / `var(--shadow-*)` tokens — never hardcode.
2. Reuse the real component specs in `skills/cricheroes-design/reference/components.jsx` (Btn, Chip, ScoreCard, Row, ListCard, TabBar, TopBar, LiveTag, Avatar).
3. Red = identity, teal = action. Icons via `assets/icons.js` (`<span data-icon>` + `CH.icons.hydrate`). No emoji in product UI.
4. Copy in the brand voice: sentence case, active, British spelling, numerals + tabular numbers for stats.
5. After building, run the brand-lint over your output: `node skills/cricheroes-design/../../hooks/brand-lint.mjs <file>` (or `hooks/brand-lint.mjs` from repo root) and fix any advisories.
