# CricHeroes Design System — agent guide

This repository is a portable design system for building **on-brand CricHeroes UI**.
Any AI coding agent working in a project that uses this system should follow the
rules below. The full working guide is
[`skills/cricheroes-design/SKILL.md`](skills/cricheroes-design/SKILL.md).

## Use the tokens, never hardcode

Link `skills/cricheroes-design/colors_and_type.css` and use its CSS custom
properties: `--ch-*` (brand), `--bg-*`, `--label-*`, `--fill-*`, `--btn-*`,
`--space-*`, `--r-*`, `--shadow-*`, and the type classes (`.ch-title`, `.ch-body`,
`.ch-caption`, ...). Do not hardcode hex values, font sizes, or radii.

## The one rule that matters most

**Red = identity. Teal = action. Don't mix them.**

- Scarlet Red `#E21C28` — logo, live badges, alerts, destructive actions. Never the fill of a normal button.
- Seafoam Teal `#18958F` — every action: buttons, links, CTAs, focus rings, tabs.
- Charcoal for ink; Khaki Gold `#CB8E40` for premium, sparingly.

## Build from real components

Mirror the specs in `skills/cricheroes-design/reference/components.jsx` (`Btn`,
`Chip`, `ScoreCard`, `Row`, `ListCard`, `TabBar`, `TopBar`, `LiveTag`, `Avatar`,
`Section`). Icons come from `skills/cricheroes-design/assets/icons.js`: add
`<span data-icon="bat"></span>` placeholders and call `CH.icons.hydrate(document)`
once. No emoji as icons.

## Voice

Short, clear, warm. British spelling, sentence case, active voice, numerals for
stats. No emoji in product UI. Always "CricHeroes" (one word, two capitals).

## Before you ship

Validate against the audit checklist in SKILL.md (Audit mode). In Claude Code the
brand-lint hook flags hard violations automatically; other tools can run
`node hooks/brand-lint.mjs <file>` directly.
