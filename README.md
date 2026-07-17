# CricHeroes Design System: plugin + skill

**"Your cricket matters."**

A portable CricHeroes design system for AI coding tools. It gives any AI agent the
brand tokens, component references, brand voice, and audit rules needed to build
UI that looks and sounds like CricHeroes. Works with **Claude Code**, **Codex**,
**Gemini CLI**, and any tool that can read an `AGENTS.md` or a skill folder.

The full working guide (tokens, design mode, audit checklist) lives in
[`skills/cricheroes-design/SKILL.md`](skills/cricheroes-design/SKILL.md).

## Install

### Claude Code (plugin)

```
/plugin marketplace add cricheroes/ch-design-system-plugin
/plugin install cricheroes-design-system@cricheroes-ds
```

You get the `cricheroes-design` skill, the `/cricheroes-design` and
`/cricheroes-audit` commands, and a brand-lint hook that flags hard violations
(emoji in UI, red used as a button fill, off-brand gradients).

### Codex and other agents that read `AGENTS.md`

Clone the repo into (or beside) your project; the agent picks up
[`AGENTS.md`](AGENTS.md) automatically.

```
git clone https://github.com/cricheroes/ch-design-system-plugin
```

### Gemini CLI

Clone the repo; Gemini CLI reads [`GEMINI.md`](GEMINI.md) as project context.

### Any tool / manual

Point your model at [`skills/cricheroes-design/SKILL.md`](skills/cricheroes-design/SKILL.md)
and link [`skills/cricheroes-design/colors_and_type.css`](skills/cricheroes-design/colors_and_type.css).
Everything ships as plain CSS, JSX, HTML, and Markdown, so no tool lock-in.

## What's inside

```
AGENTS.md                         portable agent guide (Codex + generic agents)
GEMINI.md                         Gemini CLI context pointer
.claude-plugin/                   Claude Code plugin + marketplace manifests
commands/                         /cricheroes-design, /cricheroes-audit
hooks/                            brand-lint.mjs + hooks.json (PostToolUse)
skills/cricheroes-design/         the design system + SKILL.md
  colors_and_type.css             every colour, type, spacing, radius, shadow token
  reference/                      real component specs (components.jsx, icons.jsx, ...)
  preview/                        one preview card per concern
  assets/                         icons, official logos, backgrounds, favicon
  fonts/                          Ubuntu Sans, Barlow (scorecard)
  ui_kits/                        App Kit + Web Kit reference builds
```

## The one rule that matters most

> **Red = identity. Teal = action. Don't mix them.**

Scarlet Red `#E21C28` is for the logo, live badges, and destructive actions, never
a normal button fill. Seafoam Teal `#18958F` is every action: buttons, links, CTAs,
focus rings, tabs.

## License and brand

Proprietary, for CricHeroes use. See [LICENSE](LICENSE). CricHeroes logos, names,
and marks are trademarks of CricHeroes. Bundled fonts keep their own licenses
(see [`skills/cricheroes-design/fonts/NOTICE.txt`](skills/cricheroes-design/fonts/NOTICE.txt)).
