---
description: Validate a project's UI against the CricHeroes design system and report brand violations by severity.
argument-hint: "[path or glob — defaults to the current project's styles/components]"
---

Audit the target against the **CricHeroes design system** (load the `cricheroes-design` skill for the full rules and tokens).

Target: `$ARGUMENTS` (if empty, scan the current project's CSS, component files, and user-facing copy).

Steps:
1. Read `skills/cricheroes-design/SKILL.md` and `colors_and_type.css` for the rules and token names.
2. Scan the target for brand violations — colour rule (red = identity, teal = action), palette, radius, borders, shadows, gradients-on-buttons, banned patterns, type/tabular numbers, and voice (sentence case, active voice, British spelling, no emoji in product UI, `CricHeroes` spelling).
3. Report findings grouped by severity (Critical / High / Medium / Low), each as:
   `severity · file:line · what's wrong · the token or rule to use instead`.
4. End with a short verdict: pass, pass-with-warnings, or fails-brand — and the top 3 fixes.

Do not change files unless explicitly asked — this command reports, it doesn't fix.
