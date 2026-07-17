# Contributing to the CricHeroes design system

This repository is the CricHeroes design system, shipped as a portable plugin and
skill. It mirrors the design team's official web system, which is the source of
truth. Most changes come from the CricHeroes design and engineering teams.

## The one gate that matters

Anything AI-generated on top of this system should be shared with the CricHeroes
design team for a quick review before it is published or shipped externally. This
keeps every experience consistent with the brand.

## Changing the system

Tokens, components and rules track the official system. To change them:

1. Change the value in the source system first (the design guidelines and the
   typography tokens), not only here.
2. Update `skills/cricheroes-design/colors_and_type.css` and, where needed,
   `skills/cricheroes-design/reference/AI-CONTEXT.md`.
3. Run the audit: `node hooks/brand-lint.mjs <files>` for the fast mechanical gate,
   and `/cricheroes-audit` for the deeper pass.
4. Open a pull request and request design-team review before merging to `main`.

## Maintainer release loop

The design system installs from this repo's marketplace, so a change is not live
until the version is bumped:

1. Edit the files here.
2. Bump the version in BOTH `.claude-plugin/plugin.json` and
   `.claude-plugin/marketplace.json` and keep them equal. Claude Code only refreshes
   its cache on a version change.
3. Push. For Claude Code users, refresh with `claude plugin marketplace update
   cricheroes-design-system`, then reinstall `cricheroes-design-system@cricheroes-design-system`.

## Style

British spelling, sentence case, active voice. No emoji in product UI or docs. No
em-dashes (use colons or commas). Always write CricHeroes as one word, two capitals.

## Scope notes

- The mobile App-Kit React source in `skills/cricheroes-design/reference/mobile/` is
  legacy, awaiting a Phase-B web port. Build new work from `reference/AI-CONTEXT.md`.
- Brand assets (logos, marks) are CricHeroes trademarks; see `LICENSE`. Bundled fonts
  keep their own licences (see `skills/cricheroes-design/fonts/NOTICE.txt`).
