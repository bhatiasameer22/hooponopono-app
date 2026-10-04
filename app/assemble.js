// Node.js equivalent of assemble.py
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, f), 'utf8');

const s = read('p1.html');
const p3 = read('p3.js');
const boot = p3.indexOf('/* boot */');
const hi = fs.existsSync(path.join(dir, 'hi.js')) ? read('hi.js') : 'const HI={};';

const parts = [
  read('scripts_src.js'),
  read('p4.js'), read('p5.js'),
  'AFTER.affirmations=AFTER.morning;',
  read('p6.js'), read('p7.js'), read('p8.js'), read('p9.js'), read('p10.js'), read('p11.js')
];

const body = read('p2.js') + '\n' + p3.slice(0, boot) + parts.join('\n') + '\nS.voiceOn=false;\n';
const names = [...new Set([...body.matchAll(/^const ([A-Z][A-Z0-9_]*)=(?:[\[{]|Object\.fromEntries)/gm)].map(m => m[1]))].sort();
const fullBody = body + 'if(window.__HOO_DEBUG)window.__HOO={' + names.join(',') + '};\n' + p3.slice(boot);
const js = '(function(){\n\'use strict\';\n' + hi + '\n' + fullBody + '\n})();';

fs.writeFileSync(path.join(dir, 'check.js'), js, 'utf8');
const frag = s + '\n<script>\n' + js + '\n</script>\n';
fs.writeFileSync(path.join(dir, 'index.html'), frag, 'utf8');
fs.writeFileSync(path.join(dir, 'app.html'), '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n' + frag + '\n</body></html>\n', 'utf8');
console.log(js.length, names.length, 'constants');
