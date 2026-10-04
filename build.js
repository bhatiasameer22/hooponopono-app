#!/usr/bin/env node
'use strict';
/* Node.js equivalent of build.py  —  Usage: node build.js <versionCode> <versionName> */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const cp = require('child_process');

const ROOT = __dirname;
const APP  = path.join(ROOT, 'app');
const AND  = path.join(ROOT, 'android');
const TOOLS= path.join(ROOT, 'tools');
const DIST = path.join(ROOT, 'dist');
const B    = path.join(AND, 'build');

const [,, code, name] = process.argv;
if (!code || !name) { console.error('Usage: node build.js <versionCode> <versionName>'); process.exit(1); }

function fail(msg) { console.error('FAILED:', msg); process.exit(1); }

function run(cmd, args, opts) {
  const r = cp.spawnSync(cmd, args, {encoding:'utf8', maxBuffer:50*1024*1024, ...(opts||{})});
  if (r.error) fail(cmd + ': ' + r.error.message);
  const out = (r.stdout||'') + (r.stderr||'');
  if (r.status !== 0) fail([cmd, ...args.slice(0,3)].join(' ') + '\n' + out.slice(-3000));
  return out;
}

function rmrf(p)   { if (fs.existsSync(p)) fs.rmSync(p, {recursive:true, force:true}); }
function mkdirp(p) { fs.mkdirSync(p, {recursive:true}); }

function globFiles(dir, ext) {
  const out = [];
  function scan(d) {
    if (!fs.existsSync(d)) return;
    for (const f of fs.readdirSync(d)) {
      const full = path.join(d, f);
      if (fs.statSync(full).isDirectory()) scan(full);
      else if (f.endsWith(ext)) out.push(full);
    }
  }
  scan(dir); return out;
}

/* ---------- CRC-32 ---------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

/* ---------- ZIP reader/writer ---------- */
const LFH_SIG  = 0x04034b50;
const CFH_SIG  = 0x02014b50;
const EOCD_SIG = 0x06054b50;
const ZIP_STORED   = 0;
const ZIP_DEFLATED = 8;
const MOD_DATE = 0x5221; // 2026-01-01
const MOD_TIME = 0x0000;

function readZip(buf) {
  let eocdPos = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65558); i--) {
    if (buf.readUInt32LE(i) === EOCD_SIG) { eocdPos = i; break; }
  }
  if (eocdPos < 0) fail('No EOCD in ZIP');
  const cdCount  = buf.readUInt16LE(eocdPos + 8);
  const cdOffset = buf.readUInt32LE(eocdPos + 16);
  const entries = [];
  let pos = cdOffset;
  for (let i = 0; i < cdCount; i++) {
    if (buf.readUInt32LE(pos) !== CFH_SIG) fail('Bad CFH at ' + pos);
    const method    = buf.readUInt16LE(pos + 10);
    const crc       = buf.readUInt32LE(pos + 16);
    const compSz    = buf.readUInt32LE(pos + 20);
    const uncompSz  = buf.readUInt32LE(pos + 24);
    const fnLen     = buf.readUInt16LE(pos + 28);
    const extraLen  = buf.readUInt16LE(pos + 30);
    const commentLen= buf.readUInt16LE(pos + 32);
    const extAttr   = buf.readUInt32LE(pos + 38);
    const localOff  = buf.readUInt32LE(pos + 42);
    const fn = buf.toString('utf8', pos + 46, pos + 46 + fnLen);
    pos += 46 + fnLen + extraLen + commentLen;
    // Read raw (possibly compressed) data from local entry
    const lfnLen    = buf.readUInt16LE(localOff + 26);
    const lextraLen = buf.readUInt16LE(localOff + 28);
    const dataStart = localOff + 30 + lfnLen + lextraLen;
    entries.push({fn, method, crc, compSz, uncompSz, extAttr,
                  data: Buffer.from(buf.subarray(dataStart, dataStart + compSz))});
  }
  return entries;
}

function writeAlignedApk(entries) {
  const local = [];
  const central = [];
  let offset = 0;
  for (const e of entries) {
    const fnBuf = Buffer.from(e.fn.replace(/\\/g, '/'), 'utf8'); // normalize Windows paths
    let extra = Buffer.alloc(0);
    if (e.method === ZIP_STORED) {
      // Align data start to 4-byte boundary from start of file
      const headerBase = offset + 30 + fnBuf.length;
      let n = (4 - (headerBase % 4)) % 4; // 0..3 bytes needed
      if (n > 0) {
        n += 4; // minimum 4 bytes for the extra header (tag + length)
        extra = Buffer.alloc(n);
        extra.writeUInt16LE(0xD935, 0); // Android alignment tag
        extra.writeUInt16LE(n - 4, 2);  // data size (padding bytes count)
      }
    }
    // Local file header
    const lfh = Buffer.alloc(30);
    lfh.writeUInt32LE(LFH_SIG, 0);
    lfh.writeUInt16LE(20, 4);              // version needed
    lfh.writeUInt16LE(0, 6);              // flags
    lfh.writeUInt16LE(e.method, 8);
    lfh.writeUInt16LE(MOD_TIME, 10);
    lfh.writeUInt16LE(MOD_DATE, 12);
    lfh.writeUInt32LE(e.crc, 14);
    lfh.writeUInt32LE(e.compSz, 18);
    lfh.writeUInt32LE(e.uncompSz, 22);
    lfh.writeUInt16LE(fnBuf.length, 26);
    lfh.writeUInt16LE(extra.length, 28);
    const localOffset = offset;
    local.push(lfh, fnBuf, extra, e.data);
    offset += 30 + fnBuf.length + extra.length + e.compSz;
    // Central directory file header
    const cfh = Buffer.alloc(46);
    cfh.writeUInt32LE(CFH_SIG, 0);
    cfh.writeUInt16LE(20, 4); cfh.writeUInt16LE(20, 6);
    cfh.writeUInt16LE(0, 8);
    cfh.writeUInt16LE(e.method, 10);
    cfh.writeUInt16LE(MOD_TIME, 12); cfh.writeUInt16LE(MOD_DATE, 14);
    cfh.writeUInt32LE(e.crc, 16);
    cfh.writeUInt32LE(e.compSz, 20);
    cfh.writeUInt32LE(e.uncompSz, 24);
    cfh.writeUInt16LE(fnBuf.length, 28);
    cfh.writeUInt16LE(0, 30); cfh.writeUInt16LE(0, 32);
    cfh.writeUInt16LE(0, 34); cfh.writeUInt16LE(0, 36);
    cfh.writeUInt32LE(e.extAttr, 38);
    cfh.writeUInt32LE(localOffset, 42);
    central.push(cfh, fnBuf);
  }
  const cdOffset = offset;
  const cdBuf = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(EOCD_SIG, 0);
  eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cdBuf.length, 12);
  eocd.writeUInt32LE(cdOffset, 16);
  eocd.writeUInt16LE(0, 20);
  return Buffer.concat([...local, cdBuf, eocd]);
}

/* ===== MAIN BUILD ===== */
const aapt2 = path.join(TOOLS, 'aapt2.exe');
const jar   = n => path.join(TOOLS, n);

console.log('1. Assembling web app...');
run('node', ['assemble.js'], {cwd: APP});

console.log('2. Copying assets to android/assets/www...');
const www = path.join(AND, 'assets', 'www');
rmrf(path.join(AND, 'assets'));
mkdirp(path.join(www, 'img'));
for (const f of fs.readdirSync(APP))
  if (f.endsWith('.ogg')) fs.copyFileSync(path.join(APP, f), path.join(www, f));
for (const f of fs.readdirSync(path.join(APP, 'img')))
  if (f.endsWith('.webp')) fs.copyFileSync(path.join(APP, 'img', f), path.join(www, 'img', f));
const frag = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
fs.writeFileSync(path.join(www, 'index.html'),
  '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#F7EDDF"></head><body>\n' + frag + '\n</body></html>\n',
  'utf8');

console.log('3. Updating version to', code, name, '...');
const mfPath = path.join(AND, 'AndroidManifest.xml');
let mf = fs.readFileSync(mfPath, 'utf8');
mf = mf.replace(/android:versionCode="\d+" android:versionName="[\d.]+"/, `android:versionCode="${code}" android:versionName="${name}"`);
fs.writeFileSync(mfPath, mf, 'utf8');

console.log('4. Compiling resources...');
rmrf(B); mkdirp(path.join(B, 'classes')); mkdirp(path.join(B, 'dex'));
run(aapt2, ['compile', '--dir', path.join(AND, 'res'), '-o', path.join(B, 'res.zip')]);
run(aapt2, ['link', '-o', path.join(B, 'res.apk'), '-I', jar('android.jar'),
  '--manifest', mfPath, '-A', path.join(AND, 'assets'), '--java', path.join(B, 'gen'),
  '--auto-add-overlay', '-0', 'ogg', '-0', 'webp',
  '--min-sdk-version', '24', '--target-sdk-version', '34', path.join(B, 'res.zip')]);

console.log('5. Compiling Java...');
const srcs = [...globFiles(path.join(AND, 'java'), '.java'), ...globFiles(path.join(B, 'gen'), '.java')];
const ecjR = cp.spawnSync('java', ['-jar', jar('ecj-3.45.0.jar'), '-source', '8', '-target', '8',
  '-encoding', 'UTF-8', '-nowarn', '-bootclasspath', jar('android.jar'),
  '-classpath', jar('android.jar'), '-d', path.join(B, 'classes'), ...srcs],
  {encoding:'utf8', maxBuffer:50*1024*1024});
const ecjOut = (ecjR.stdout||'') + (ecjR.stderr||'');
if (ecjOut.includes('ERROR in')) fail('Java compile failed\n' + ecjOut.slice(-4000));

console.log('6. Dexing...');
const classes = globFiles(path.join(B, 'classes'), '.class');
run('java', ['-cp', jar('d8.jar'), 'com.android.tools.r8.D8', '--release',
  '--min-api', '24', '--lib', jar('android.jar'), '--output', path.join(B, 'dex'), ...classes]);

console.log('7. Packaging + aligning...');
const resApkBuf = fs.readFileSync(path.join(B, 'res.apk'));
const entries = readZip(resApkBuf);
const dexRaw  = fs.readFileSync(path.join(B, 'dex', 'classes.dex'));
const dexComp = zlib.deflateRawSync(dexRaw, {level:9});
entries.push({fn:'classes.dex', method:ZIP_DEFLATED, crc:crc32(dexRaw),
              compSz:dexComp.length, uncompSz:dexRaw.length, extAttr:0, data:dexComp});
const aligned = writeAlignedApk(entries);
const alignedPath = path.join(B, 'aligned.apk');
fs.writeFileSync(alignedPath, aligned);

console.log('8. Signing...');
const pw = fs.readFileSync(path.join(AND, 'keystore-password.txt'), 'utf8').trim();
mkdirp(DIST);
const apkOut = path.join(DIST, `Hooponopono-v${name}.apk`);
run('java', ['-jar', jar('apksigner.jar'), 'sign',
  '--ks', path.join(AND, 'hooponopono-release.jks'), '--ks-key-alias', 'hooponopono',
  '--ks-pass', 'pass:' + pw, '--key-pass', 'pass:' + pw,
  '--v1-signing-enabled', 'true', '--v2-signing-enabled', 'true', '--v3-signing-enabled', 'true',
  '--out', apkOut, alignedPath]);

const verify = run('java', ['-jar', jar('apksigner.jar'), 'verify', '--verbose', apkOut]);
console.log(verify.split('\n')[0]);
console.log('Built', apkOut, fs.statSync(apkOut).size, 'bytes');
