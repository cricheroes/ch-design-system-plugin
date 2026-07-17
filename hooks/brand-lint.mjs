#!/usr/bin/env node
// CricHeroes brand-lint: tiered token-compliance checks.
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
// Hex allowed outside :root: sanctioned store-badge glyph colours + pure black/white.
const SANCTIONED_HEX = /^#(4285f4|34a853|fbbc05|ea4335|1ac9fe|0073f7|fff|ffffff|000|000000)$/i;

// On-scale value sets (px).
const TYPE_PX   = new Set([12,14,16,18,20,24,28,32,40,48,56,64,100]);
const RADIUS_PX = new Set([0,4,8,12,16,28]);
const SP_PX     = new Set([2,4,8,12,16,20,24,32,40,48,64,80]);

// Per-line CSS context: is the line inside a :root { } block, and what is the
// enclosing selector chain? (CSS + <style> in HTML) The selector chain lets the
// selector-scoped rules (red CTA fill, gradient on card) fire on multi-line CSS
// where the selector and declaration sit on different lines.
function cssContextByLine(src) {
  const flags = [false];
  const sels = [''];
  const stack = []; // { root: this block or an ancestor is :root, sel: block selector }
  let inComment = false, sel = '', line = 0;
  const snap = () => {
    flags[line] = stack.length ? stack[stack.length - 1].root : false;
    sels[line] = stack.map(s => s.sel).join(' ');
  };
  for (let k = 0; k < src.length; k++) {
    const c = src[k];
    if (c === '\n') { line++; snap(); continue; }
    if (inComment) { if (c === '*' && src[k + 1] === '/') { inComment = false; k++; } continue; }
    if (c === '/' && src[k + 1] === '*') { inComment = true; k++; continue; }
    if (c === '{') { const parent = stack.length ? stack[stack.length - 1].root : false; stack.push({ root: parent || /:root/.test(sel), sel: sel.trim() }); sel = ''; continue; }
    if (c === '}') { stack.pop(); sel = ''; continue; }
    if (c === ';') { sel = ''; continue; }
    sel += c;
  }
  return { flags, sels };
}

// each finding: [line, message, severity] where severity is 'hard' | 'soft'
function lint(file, src) {
  const out = [];
  // The :root-aware rules (raw hex, off-scale) only make sense in CSS context.
  // In .jsx/.tsx/.js, braces are code (not CSS blocks) and would desync the :root
  // tracker, so skip those rules there. In markup, blank out <script> bodies
  // (preserving line numbers) so their JS braces and hex do not interfere.
  const isCss = /\.(css|scss|sass|less)$/i.test(file);
  const isMarkup = /\.(html?|vue|svelte)$/i.test(file);
  const cssContext = isCss || isMarkup;
  const scanSrc = isMarkup
    ? src.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (m) => m.replace(/[^\n]/g, ' '))
    : src;
  const ctx = cssContext ? cssContextByLine(scanSrc) : { flags: [], sels: [] };
  const scanLines = scanSrc.split('\n');
  src.split('\n').forEach((line, i) => {
    const n = i + 1;
    const root = ctx.flags[i] === true;
    const code = line.replace(/\/\/.*$/, '');              // universal rules: raw line
    const cssCode = cssContext ? (scanLines[i] || '') : ''; // css-context rules: script-stripped
    // Selector scope for this line: same-line text plus, in CSS context, the
    // enclosing block's selector (so multi-line rules are still caught).
    const selScope = code + ' ' + (cssContext ? (ctx.sels[i] || '') : '');

    // --- BLOCK tier (all lintable file types) ---
    if (EMOJI.test(line)) out.push([n, 'emoji in product UI (dot, tick, arrow glyphs are fine)', 'hard']);
    if (/\u2014/.test(line)) out.push([n, 'em-dash banned: use a colon or comma instead', 'hard']);
    if (SAAS_GRADIENT.test(code)) out.push([n, 'off-brand SaaS purple/indigo gradient: use brand colours', 'hard']);
    const dead = code.match(DEAD_TOKEN);
    if (dead) out.push([n, `removed/renamed token "${dead[0]}": use the official token (see colors_and_type.css)`, 'hard']);
    // red as a PRIMARY / CTA button fill (primary must be teal). The destructive
    // button uses --btn-bg-secondary-* and is allowed; this catches raw red or a
    // direct --brand-primary/--rgb-primary fill on a primary/cta selector.
    if (/(background|background-color)\s*:\s*(#e21c28|var\(--brand-primary\b|rgb\(\s*var\(--rgb-primary\b)/i.test(code) &&
        /(btn|button|cta|\.primary)/i.test(selScope)) {
      out.push([n, 'red as a primary/CTA button fill: primary actions use teal (--btn-bg-primary-prominent)', 'hard']);
    }
    if (/background[^;]*gradient\(/i.test(code) && /(btn|button|\.card|\.fcard)/i.test(selScope)) {
      out.push([n, 'gradient on button/card: gradients are hero-only', 'hard']);
    }

    // --- CSS-context rules (CSS + markup only; :root-aware) ---
    if (cssContext && !root) {
      const hex = cssCode.match(/:\s*(#[0-9a-fA-F]{3,8})\b/);
      if (hex && !SANCTIONED_HEX.test(hex[1]) && !/^\s*--/.test(cssCode)) {
        out.push([n, `raw hex ${hex[1]} outside :root: use a token (rgb(var(--rgb-*) / a) or a semantic token)`, 'hard']);
      }
      if (/:\s*(rgba|hsla)\(/i.test(cssCode)) out.push([n, 'raw rgba()/hsla(): prefer rgb(var(--rgb-*) / a) to preserve the opacity model', 'soft']);
      if (/color\s*:\s*var\(--label-(primary|secondary)-medium\b/i.test(cssCode)) out.push([n, 'coloured -medium label as text may fail WCAG AA: use -high (large/bold) or --brand-secondary-60 for small text', 'soft']);
      const fs = cssCode.match(/font-size\s*:\s*(\d+)px/i);
      if (fs && !TYPE_PX.has(+fs[1])) out.push([n, `off-scale font-size ${fs[1]}px: use a type role / --ch-font-* (12px floor)`, 'soft']);
      const br = cssCode.match(/border-radius\s*:\s*(\d+)px/i);
      if (br && !RADIUS_PX.has(+br[1]) && +br[1] < 999) out.push([n, `off-scale radius ${br[1]}px: use --radius-*`, 'soft']);
      const sp = cssCode.match(/(?:padding|margin|gap)\s*:\s*(\d+)px\s*;/i);
      if (sp && !SP_PX.has(+sp[1])) out.push([n, `off-grid spacing ${sp[1]}px: use --sp-* (4pt grid)`, 'soft']);
    }

    // --- brand name (all file types) ---
    const m = code.match(/\b(Cricheroes|cricHeroes|CRICHEROES|Crick?heroes)\b/);
    if (m && m[0] !== 'CricHeroes') out.push([n, `"${m[0]}" should be CricHeroes (one word, two capitals)`, 'soft']);
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
        console.error(`\n${hard.length} block-level CricHeroes violation(s): fix before continuing.`);
        process.exit(2);
      }
    }
  }
}
process.exit(0);
