# CricHeroes design system: agent guide

This repository is a portable design system for building **on-brand CricHeroes UI**.
Any AI coding agent working in a project that uses this system should follow the
rules below. The full working guide is
[`skills/cricheroes-design/SKILL.md`](skills/cricheroes-design/SKILL.md).

## Use the tokens, never hardcode

Link `skills/cricheroes-design/colors_and_type.css` and consume its official
semantic tokens: backgrounds `--bg-*`, text `--label-*` (grey, primary, secondary,
static), fills `--fill-*`, buttons `--btn-bg-*` / `--btn-label-*`, icons `--icon-*`,
spacing `--sp-*`, radius `--radius-*` (`--radius-none/xs/sm/md/lg/xl/full`), and
elevation `--elevation-*`. For type, use the `.ch-*` role classes (e.g.
`.ch-title-medium`, `.ch-body-medium`). The `--brand-*` primitives (Scarlet Red,
Seafoam Teal, greys) are the underlying reference layer only: never consume them
directly, and never hardcode hex values, font sizes, or radii.

## The one rule that matters most

**Red = identity. Teal = action. Don't mix them.**

- Scarlet Red `#E21C28`: logo, live badges, alerts, destructive actions. Never the fill of a normal button.
- Seafoam Teal `#18958F`: every action, buttons, links, CTAs, focus rings, tabs.
- Charcoal for ink. Khaki Gold `#CB8E40` for premium, sparingly.

## Build from real components

Build from the component specs in
[`skills/cricheroes-design/reference/AI-CONTEXT.md`](skills/cricheroes-design/reference/AI-CONTEXT.md)
(buttons, chips, cards, tables, and the 17 interactive primitives). The mobile
App-Kit React source is legacy and now lives in
`skills/cricheroes-design/reference/mobile/`. Icons come from
`skills/cricheroes-design/assets/icons.js`: add `<span data-icon="bat"></span>`
placeholders and call `CH.icons.hydrate(document)` once. No emoji as icons.

## Voice

Short, clear, warm. British spelling, sentence case, active voice, numerals for
stats. No emoji in product UI. Always "CricHeroes" (one word, two capitals).

## Before you ship

Validate against the audit checklist in SKILL.md (Audit mode). In Claude Code the
brand-lint hook flags hard violations automatically; other tools can run
`node hooks/brand-lint.mjs <file>` directly.
