---
description: Build an on-brand CricHeroes UI (component, screen, or page) using the design system.
argument-hint: "<what to build, e.g. 'a tournament leaderboard card'>"
---

Build the requested UI **on-brand for CricHeroes**. Load the `cricheroes-design` skill first for tokens, component specs, and voice.

Requested: `$ARGUMENTS`

Rules:
1. Link `skills/cricheroes-design/colors_and_type.css` and use its official semantic tokens, never hardcode. Backgrounds `--bg-*`; text `--label-{grey,primary,secondary}-*`; fills `--fill-*`; buttons `--btn-bg-*` / `--btn-label-*`; icons `--icon-*`; spacing `--sp-*`; radius `--radius-*` (`--radius-none/xs/sm/md/lg/xl/full`); elevation `--elevation-*`; and the type classes `.ch-<role>` (e.g. `.ch-title-medium`, `.ch-body-medium`). The `--brand-*` primitives are the underlying reference layer only: never consume them directly.
2. Build from the component specs in `skills/cricheroes-design/reference/AI-CONTEXT.md` (buttons, chips, cards, tables, and the 17 interactive primitives). The mobile App-Kit React components are legacy and now live in `skills/cricheroes-design/reference/mobile/`. See `skills/cricheroes-design/demos/` for live examples.
3. Red = identity, teal = action: keep them apart. Icons via `skills/cricheroes-design/assets/icons.js` (`<span data-icon>` placeholders plus `CH.icons.hydrate(document)`). No emoji in product UI.
4. Copy in the brand voice: sentence case, active voice, British spelling, numerals plus tabular numbers for stats.
5. After building, run the brand-lint over your output: `node hooks/brand-lint.mjs <file>` and fix any advisories.
