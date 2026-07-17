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

### claude.ai chat (skill upload)

The skill (tokens, component specs, brand voice, audit checklist) also works in
the claude.ai web and mobile apps. Slash commands and the brand-lint hook are
Claude Code features and do not run there.

1. Zip the skill folder so `cricheroes-design/` (with `SKILL.md` at its root)
   is the top-level entry of the archive:

   ```
   cd skills && zip -r cricheroes-design.zip cricheroes-design
   ```

2. In claude.ai go to Settings, then Customize, then Skills, click the plus
   button, and upload the zip.
3. Toggle the skill on. Claude then applies the CricHeroes system whenever a
   chat involves building or reviewing UI.

Requirements: a Pro, Max, Team, or Enterprise plan with "Code execution and
file creation" enabled. On Team and Enterprise an org owner or admin must first
enable Skills under Organization settings. Skill zips are limited to 200 files;
this skill ships about 54, so it fits comfortably.

### Cowork (Claude desktop app)

Skills uploaded to claude.ai do not sync to Cowork automatically. Either:

- upload the same zip in Cowork under Customize, then Skills, or
- install the full plugin in Cowork from this marketplace (Cowork supports
  plugin marketplaces by URL), which bundles the skill; hooks and slash
  commands still run only in Claude Code.

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
  fonts/                          Ubuntu Sans (variable + italic; scores use its tabular numerals)
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
