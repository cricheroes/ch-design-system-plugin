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

### claude.ai (web and desktop)

Two routes; both need a paid plan (Pro, Max, Team, or Enterprise).

**Plugin (preferred):** in the left sidebar open Customize, then the Plugins
tab, and install this plugin (browse if your org admin has distributed it, or
add this repo's marketplace). The skill is then available in every chat; invoke
it by asking for CricHeroes UI work, or via `/` or the `+` menu. On Team and
Enterprise, an org admin can distribute the plugin org-wide from a marketplace
so nobody installs manually.

**Skill zip (fallback):** zip the skill folder so `cricheroes-design/` (with
`SKILL.md` at its root) is the top-level entry, then upload it under Customize,
then Skills, and toggle it on:

```
cd skills && zip -r cricheroes-design.zip cricheroes-design
```

Requires "Code execution and file creation" enabled; on Team and Enterprise an
org admin must enable Skills under Organization settings first. Skill zips are
limited to 200 files; this skill ships about 54.

In chat, the skill runs fully; the brand-lint hook does not (it runs in Claude
Code and Cowork), and slash commands are Claude Code only.

### Cowork (Claude desktop app)

Skills and plugins do not sync from claude.ai chat automatically. Install the
plugin in Cowork from this marketplace, or upload the same skill zip under
Customize, then Skills. Cowork also runs the plugin's hooks, so the brand-lint
guard is active there.

### Figma (optional, for design-system audits in Figma)

Connect the Figma connector in claude.ai (Settings, then Connectors, then
Figma) or in Cowork. With the connector plus this skill enabled, Claude can
read a Figma file's variables, styles, and components and audit them against
the token canon in `colors_and_type.css`, flag drift, and mirror the three-tier
token contract when creating or updating Figma variables. The CSS in this repo
stays the source of truth; Figma-side differences are reported, not silently
adopted.

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
