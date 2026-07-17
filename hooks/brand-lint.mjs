#!/usr/bin/env node
// CricHeroes brand-lint — tiered token-compliance checks.
// Two modes:
//   hook : reads PostToolUse JSON on stdin, lints the edited file.
//          BLOCK (hard) violations -> stderr + exit 2 (Claude must fix).
//          WARN (soft) only        -> stderr + exit 0 (advisory).
//   cli  : `node brand-lint.mjs <file> [file...]` -> prints findings;
//          exit 2 if any block, 1 if only warn, 0 if clean.
//
// BLOCK tier = high-confidence, low false-positive (the audit that must stay
// trustworthy). WARN tier = fuzzy heuristics (off-scale sizes/spacing) that are
// advisory until proven on real files. See reference/AI-CONTEXT.md section 16.
// ponytail: regex + a light :root brace-tracker, not a full CSS parser. Add a
//           parser only if false positives become a real problem.
import { readFileSync } from 'node:fs';

const LINTABLE = /\.(css|scss|sass|less|html?|jsx?|tsx?|vue|svelte)$/i;

// Emoji-ish ranges (the brand allows · ✓ → ).
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}\u{1F1E6}-\u{1F1FF}]/u;
const SAAS_GRADIENT = /(linear|radial)-gradient[^;]*#(6366f1|7c3aed|8b5cf6|818cf8|a855f7|4f46e5)/i;
// Removed / renamed tokens from the pre-reconciliation skill. Using them = broken.
const DEAD_TOKEN = /--(ch-(red|teal|black|white|grey\d?)|r-(pill|\d+)|space-\d+|shadow-\d+|t-(display|title|headline|body|callout|subhead|footnote|caption)|font-sans|label-[123]\b|ch-font-scorecard|ch-teal-deep|w-(regular|medium|semibold|bold))/;
// Hex allowed outside :root — sanctioned store-badge glyph colours + pure black/white.
const SANCTIONED_HEX = /^#(4285f4|34a853|fbbc05|ea4335|1ac9fe|0073f7|fff|ffffff|000|000000)$/i;

// On-scale value sets (px).
const TYPE_PX   = new Set([12,14,16,18,20,24,28,32,40,48,56,64,100]);
const RADIUS_PX = new Set([0,4,8,12,16,28]);
const SP_PX     = new Set([2,4,8,12,16,20,24,32,40,48,64,80]);

// Per-line flag: is the line inside a :root { } block? (CSS + <style> in HTML)
function rootFlagsByLine(src) {
  const flags = [false];
  const stack = []; // booleans: is this block (or an ancestor) a :root block
  let inComment = false, sel = '', line = 0;
  for (let k = 0; k < src.length; k++) {
    const c = src[k];
    if (c === '\n') { line++; flags[line] = stack.length ? stack[stack.length - 1] : false; continue; }
    if (inComment) { if (c === '*' && src[k + 1] === '/') { inComment = false; k++; } continue; }
    if (c === '/' && src[k + 1] === '*') { inComment = true; k++; continue; }
    if (c === '{') { const parent = stack.length ? stack[stack.length - 1] : false; stack.push(parent || /:root/.test(sel)); sel = ''; continue; }
    if (c === '}') { stack.pop(); sel = ''; continue; }
    if (c === ';') { sel = ''; continue; }
    sel += c;
  }
  return flags;
}

// each finding: [line, message, severity] where severity is 'hard' | 'soft'
function lint(file, src) {
  const out = [];
  const inRoot = rootFlagsByLine(src);
  src.split('\n').forEach((line, i) => {
    const n = i + 1;
    const root = inRoot[i] === true;
    const code = line.replace(/\/\/.*$/, ''); // drop trailing line comment (jsx/js)

    // --- BLOCK tier ---
    if (EMOJI.test(line)) out.push([n, 'emoji in product UI (· ✓ → are fine)', 'hard']);
    if (SAAS_GRADIENT.test(code)) out.push([n, 'off-brand SaaS purple/indigo gradient — use brand colours', 'hard']);

    const dead = code.match(DEAD_TOKEN);
    if (dead) out.push([n, `removed/renamed token "${dead[0]}" — use the official token (see colors_and_type.css)`, 'hard']);

    // red as a PRIMARY / CTA button fill (primary must be teal). The destructive
    // button uses --btn-bg-secondary-* and is allowed; this catches raw red or a
    // direct --brand-primary/--rgb-primary fill on a primary/cta selector.
    if (/(background|background-color)\s*:\s*(#e21c28|var\(--brand-primary\b|rgb\(\s*var\(--rgb-primary\b)/i.test(code) &&
        /(btn|button|cta|\.primary)/i.test(code)) {
      out.push([n, 'red as a primary/CTA button fill — primary actions use teal (--btn-bg-primary-prominent)', 'hard']);
    }
    // gradient applied on a button or card (gradients are hero-only)
    if (/background[^;]*gradient\(/i.test(code) && /(btn|button|\.card|\.fcard)/i.test(code)) {
      out.push([n, 'gradient on button/card — gradients are hero-only', 'hard']);
    }
    // raw hex in a colour value outside :root (token-compliance contract)
    if (!root) {
      const hex = code.match(/:\s*(#[0-9a-fA-F]{3,8})\b/);
      if (hex && !SANCTIONED_HEX.test(hex[1]) && !/^\s*--/.test(code)) {
        out.push([n, `raw hex ${hex[1]} outside :root — use a token (rgb(var(--rgb-*) / a) or a semantic token)`, 'hard']);
      }
    }

    // --- WARN tier (fuzzy; advisory until proven) ---
    if (!root) {
      if (/:\s*(rgba|hsla)\(/i.test(code)) out.push([n, 'raw rgba()/hsla() — prefer rgb(var(--rgb-*) / a) to preserve the opacity model', 'soft']);
      const fs = code.match(/font-size\s*:\s*(\d+)px/i);
      if (fs && !TYPE_PX.has(+fs[1])) out.push([n, `off-scale font-size ${fs[1]}px — use a type role / --ch-font-* (12px floor)`, 'soft']);
      const br = code.match(/border-radius\s*:\s*(\d+)px/i);
      if (br && !RADIUS_PX.has(+br[1]) && +br[1] < 999) out.push([n, `off-scale radius ${br[1]}px — use --radius-*`, 'soft']);
      const sp = code.match(/(?:padding|margin|gap)\s*:\s*(\d+)px\s*;/i);
      if (sp && !SP_PX.has(+sp[1])) out.push([n, `off-grid spacing ${sp[1]}px — use --sp-* (4pt grid)`, 'soft']);
    }
    const m = code.match(/\b(Cricheroes|cricHeroes|CRICHEROES|Crick?heroes)\b/);
    if (m && m[0] !== 'CricHeroes') out.push([n, `"${m[0]}" -> write CricHeroes (one word, two capitals)`, 'soft']);
  });
  return out;
}

function readStdin() { try { return readFileSync(0, 'utf8'); } catch { return ''; } }

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
  else console.log(`\n${hard} block, ${soft} warn CricHeroes finding(s).`);
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
        console.error(`\n${hard.length} block-level CricHeroes violation(s) — fix before continuing.`);
        process.exit(2);
      }
    }
  }
}
process.exit(0);
