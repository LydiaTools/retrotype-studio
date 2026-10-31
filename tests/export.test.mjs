import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const run = promisify(execFile);
const cli = fileURLToPath(new URL('../scripts/export.mjs', import.meta.url));

test('exports real SVG and PNG, handles mixed text, and refuses to overwrite', {timeout:45000}, async () => {
  const dir = await mkdtemp(join(tmpdir(), 'retrotype-export-'));
  try {
    const svg=join(dir,'title.svg'), png=join(dir,'title.png');
    await run(process.execPath,[cli,'--text','Night 夜 <&>','--out',svg,'--style','chrome','--ratio','wide','--script','zh','--transparent']);
    const text=await readFile(svg,'utf8');
    assert.match(text,/<svg\b/);
    assert.match(text,/viewBox="0 0 1600 900"/);
    assert.match(text,/Night 夜 &lt;&amp;&gt;/);
    assert.match(text,/fill="none"/);
    await run(process.execPath,[cli,'--text','Night 夜','--out',png,'--style','print','--ratio','portrait']);
    const bytes=await readFile(png);
    assert.deepEqual(bytes.subarray(0,8),Buffer.from([137,80,78,71,13,10,26,10]));
    assert.equal(bytes.readUInt32BE(16),2160);
    assert.equal(bytes.readUInt32BE(20),2700);
    await writeFile(svg,'keep this original');
    await assert.rejects(run(process.execPath,[cli,'--text','New','--out',svg]), /EEXIST/);
    assert.equal(await readFile(svg,'utf8'),'keep this original');
  } finally { await rm(dir,{recursive:true,force:true}); }
});

test('rejects invalid text, options and output formats before starting a browser', async () => {
  for (const args of [
    ['--text','x','--out','wrong.jpg'],
    ['--text','x','--out','a.svg','--style','unknown'],
    ['--text','x'.repeat(91),'--out','a.svg'],
    ['--text','x','--out','a.svg','--size','27']
  ]) await assert.rejects(run(process.execPath,[cli,...args]));
});
