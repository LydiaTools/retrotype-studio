#!/usr/bin/env node
import {parseArgs} from 'node:util';
import {readFile, writeFile} from 'node:fs/promises';
import {extname, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const help = `RetroType Studio — export the actual local editor in a temporary browser

node scripts/export.mjs --text "NIGHT 夜" --out title.svg [options]

--out       New .svg or .png output file (never overwrites)
--style     soda | chrome | print | laser             (default: soda)
--ratio     square | wide | portrait                  (default: square)
--font      heavy | rounded | serif | mono           (default: heavy)
--script    auto | zh | ja | ko                      (default: auto)
--size      Type size 9–26                           (default: 17)
--spacing   Letter spacing -8–24 (use --spacing=-8 for negatives; default: 2)
--background  Hex color, e.g. '#f3e9d6'
--transparent Use a transparent background
--help      Show this help

Requires Node 20+, npm install, and Playwright Chromium. Set
RETROTYPE_CHROME_PATH to use a specific local Chrome/Chromium executable.
SVG references system fonts. PNG appearance depends on installed fonts.
`;

async function main() {
  const {values: v} = parseArgs({options: {
    text: {type:'string'}, out: {type:'string'}, style: {type:'string', default:'soda'},
    ratio: {type:'string', default:'square'}, font: {type:'string', default:'heavy'},
    script: {type:'string', default:'auto'}, size: {type:'string', default:'17'},
    spacing: {type:'string', default:'2'}, background: {type:'string', default:'#f3e9d6'},
    transparent: {type:'boolean', default:false}, help: {type:'boolean', default:false}
  }, strict:true});
  if (v.help) { console.log(help); return; }
  if (!v.text || !v.text.trim() || v.text.length > 90 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v.text)) throw Error('--text must contain 1–90 UTF-16 characters without control characters');
  if (!v.out || !['.svg','.png'].includes(extname(v.out).toLowerCase())) throw Error('--out must end in .svg or .png');
  for (const [key, valid] of Object.entries({style:['soda','chrome','print','laser'],ratio:['square','wide','portrait'],font:['heavy','rounded','serif','mono'],script:['auto','zh','ja','ko']})) {
    if (!valid.includes(v[key])) throw Error(`invalid --${key}; choose ${valid.join(', ')}`);
  }
  for (const [key, min, max] of [['size',9,26],['spacing',-8,24]]) {
    if (!/^-?\d+$/.test(v[key]) || Number(v[key]) < min || Number(v[key]) > max) throw Error(`--${key} must be an integer from ${min} to ${max}`);
  }
  if (!/^#[0-9a-f]{6}$/i.test(v.background)) throw Error('--background must be a six-digit hex color');
  let chromium;
  try { ({chromium} = await import('playwright')); }
  catch { throw Error('Playwright is not installed. Run npm install, then npx playwright install chromium.'); }
  const executablePath = process.env.RETROTYPE_CHROME_PATH;
  const browser = await chromium.launch({headless:true,...(executablePath ? {executablePath} : {})});
  try {
    const context = await browser.newContext({offline:true,acceptDownloads:true,viewport:{width:1440,height:1000}});
    const page = await context.newPage();
    const app = pathToFileURL(fileURLToPath(new URL('../index.html',import.meta.url))).href;
    await page.goto(app, {waitUntil:'load'});
    await page.locator('#titleInput').fill(v.text);
    await page.locator('#fontSelect').selectOption(v.font);
    await page.locator('#scriptSelect').selectOption(v.script);
    for (const [selector, value] of [['#sizeRange',v.size],['#spacingRange',v.spacing],['#backgroundColor',v.background]]) {
      await page.locator(selector).evaluate((el, val) => { el.value=val; el.dispatchEvent(new Event('input',{bubbles:true})); }, value);
    }
    if (v.transparent) await page.locator('#transparent').check();
    await page.locator(`[data-style="${v.style}"]`).click();
    await page.locator(`[data-ratio="${v.ratio}"]`).click();
    await page.evaluate(() => document.fonts.ready);
    const isPng = extname(v.out).toLowerCase() === '.png';
    const [download] = await Promise.all([
      page.waitForEvent('download',{timeout:15000}),
      page.locator(isPng ? '#exportPng' : '#exportSvg').click()
    ]);
    const failure = await download.failure();
    if (failure) throw Error(`export failed: ${failure}`);
    const bytes = await readFile(await download.path());
    await writeFile(resolve(v.out), bytes, {flag:'wx'});
    console.log(`Exported ${v.out}`);
  } finally { await browser.close(); }
}

main().catch(error => { console.error(`RetroType: ${error.message}`); process.exitCode=1; });
