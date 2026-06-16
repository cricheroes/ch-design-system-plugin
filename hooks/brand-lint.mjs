#!/usr/bin/env node
// CricHeroes brand-lint — high-confidence checks only.
// Two modes:
//   hook : reads PostToolUse JSON on stdin, lints the edited file.
//          HARD violations → print to stderr + exit 2 (blocks: Claude must fix).
//          Soft-only       → print to stderr + exit 0 (advisory).
//   cli  : `node brand-lint.mjs <file> [file...]` → prints findings;
//          exit 2 if any hard, 1 if only soft, 0 if clean.
// ponytail: a few cheap regex checks, not a CSS parser — add a real parser only
//           if false positives become a problem.
import { readFileSync } from 'node:fs';

const LINTABLE = /\.(css|scss|sass|less|html?|jsx?|tsx?|vue|svelte)$/i;
// Emoji-ish ranges (skip the symbols the brand allows: · ✓ → ).
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}\u{1F1E6}-\u{1F1FF}]/u;
const SAAS_GRADIENT = /(linear|radial)-gradient[^;]*#(6366f1|7c3aed|8b5cf6|818cf8|a855f7|4f46e5)/i;

// each finding: [line, message, severity] where severity is 'hard' | 'soft'
function lint(file, src) {
  const out = [];
  src.split('\n').forEach((line, i) => {
    const n = i + 1;
    if (EMOJI.test(line)) out.push([n, 'emoji in UI — none in product UI (· ✓ → are fine)', 'hard']);
    if (SAAS_GRADIENT.test(line)) out.push([n, 'off-brand SaaS purple/indigo gradient — use brand colours', 'hard']);
    // red as a button/CTA fill (red = identity, teal = action)
    if (/(background|background-color)\s*:\s*(#e21c28|var\(--ch-red\b)/i.test(line) &&
        /(btn|button|cta|\.primary)/i.test(line)) {
      out.push([n, 'red as a button fill — primary actions use teal (--ch-teal)', 'hard']);
    }
    // gradient actually applied (background:…gradient(…)) on a button/card
    if (/background[^;]*gradient\(/i.test(line) && /(btn|button|\.card|\.fcard)/i.test(line)) {
      out.push([n, 'gradient on button/card — gradients are hero-only', 'hard']);
    }
    // wrong brand name (advisory)
    const m = line.match(/\b(Cricheroes|cricHeroes|CRICHEROES|Crick?heroes)\b/);
    if (m && m[0] !== 'CricHeroes') out.push([n, `"${m[0]}" → write CricHeroes (one word, two capitals)`, 'soft']);
  });
  return out;
}

function readStdin() {
  try { return readFileSync(0, 'utf8'); } catch { return ''; }
}

const args = process.argv.slice(2);
if (args.length) { // CLI mode
  let hard = 0, soft = 0;
  for (const f of args) {
    if (!LINTABLE.test(f)) continue;
    let src; try { src = readFileSync(f, 'utf8'); } catch { continue; }
    for (const [ln, msg, sev] of lint(f, src)) {
      console.log(`${sev === 'hard' ? 'BLOCK' : 'warn '} ${f}:${ln}  ${msg}`);
      if (sev === 'hard') hard++; else soft++;
    }
  }
  if (!hard && !soft) console.log('No CricHeroes brand issues found.');
  else console.log(`\n${hard} hard, ${soft} soft CricHeroes brand finding(s).`);
  process.exit(hard ? 2 : soft ? 1 : 0);
}

// Hook mode
const raw = readStdin();
let file;
try { file = JSON.parse(raw)?.tool_input?.file_path; } catch { /* ignore */ }
if (file && LINTABLE.test(file)) {
  let src; try { src = readFileSync(file, 'utf8'); } catch { src = null; }
  if (src != null) {
    const findings = lint(file, src);
    if (findings.length) {
      const hard = findings.filter(f => f[2] === 'hard');
      console.error('[CricHeroes brand-lint] ' + file);
      findings.forEach(([ln, msg, sev]) => console.error(`  ${sev === 'hard' ? 'BLOCK' : 'warn '} L${ln}: ${msg}`));
      if (hard.length) {
        console.error(`\n${hard.length} hard CricHeroes brand violation(s) — fix before continuing.`);
        process.exit(2); // block: stderr is fed back so Claude corrects the edit
      }
    }
  }
}
process.exit(0); // soft-only or clean — advisory
