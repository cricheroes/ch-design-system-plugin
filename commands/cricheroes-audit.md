---
description: Validate a project's UI against the CricHeroes design system and report brand violations by severity.
argument-hint: "[path or glob, defaults to the current project's styles/components]"
---

Audit the target against the **CricHeroes design system** (load the `cricheroes-design` skill for the full rules and tokens).

Target: `$ARGUMENTS` (if empty, scan the current project's CSS, component files, and user-facing copy).

Steps:
1. Read `skills/cricheroes-design/colors_and_type.css` for the official token names and `skills/cricheroes-design/reference/AI-CONTEXT.md` for the rules. Section 16 (token-compliance contract) is the token-usage contract: no raw hex, no raw `rgba()` / `hsla()`, no off-scale `font-size`, no off-scale `padding` / `margin` / `gap`, and no raw `border-radius` (every value reaches through a token).
2. Scan the target for brand violations: colour rule (red = identity, teal = action), palette, radius, borders, shadows, gradients on buttons, banned patterns, type and tabular numbers, and voice (sentence case, active voice, British spelling, no emoji in product UI, `CricHeroes` spelling).
3. Run the passes in this order:
   - Fast mechanical gate: `node hooks/brand-lint.mjs <file>` flags the hard token violations quickly.
   - Deep pass: invoke the `design-system` skill for visual-consistency and styling review, and the `accessibility` skill for WCAG 2.2 (Level AA) checks.
4. Report findings grouped by severity (Critical / High / Medium / Low), each as:
   `severity · file:line · what's wrong · the token or rule to use instead`.
5. End with a short verdict: pass, pass-with-warnings, or fails-brand, plus the top 3 fixes.

Do not change files unless explicitly asked: this command reports, it does not fix.
