#!/usr/bin/env python3
"""Build the signed Android APK.   Usage:  python build.py <versionCode> <versionName>     e.g.  python build.py 22 3.1
Needs: Python 3 and Java 17+ on PATH. Everything else is in tools/. Works on Windows, macOS (Intel aapt2 not included) and Linux.
Output: dist/Hooponopono-v<versionName>.apk, signed with android/hooponopono-release.jks."""
import os, re, shutil, struct, subprocess, sys, zipfile, glob
ROOT = os.path.dirname(os.path.abspath(__file__))
APP, AND, TOOLS, DIST = (os.path.join(ROOT, d) for d in ('app', 'android', 'tools', 'dist'))
B = os.path.join(AND, 'build')
def run(*cmd, **kw):
    r = subprocess.run(list(cmd), capture_output=True, text=True, **kw)
    if r.returncode != 0:
        sys.exit('FAILED: ' + ' '.join(cmd[:4]) + '\n' + r.stdout[-3000:] + r.stderr[-3000:])
    return r.stdout + r.stderr
def main():
    if len(sys.argv) != 3: sys.exit(__doc__)
    code, name = sys.argv[1], sys.argv[2]
    aapt2 = os.path.join(TOOLS, 'aapt2.exe' if os.name == 'nt' else 'aapt2-linux')
    if os.name != 'nt': os.chmod(aapt2, 0o755)
    jar = lambda n: os.path.join(TOOLS, n)
    # 1. assemble the web app (app/index.html) from its parts
    run(sys.executable, 'assemble.py', cwd=APP)
    # 2. copy web app into android/assets/www
    www = os.path.join(AND, 'assets', 'www'); shutil.rmtree(os.path.join(AND, 'assets'), ignore_errors=True); os.makedirs(os.path.join(www, 'img'))
    for f in glob.glob(os.path.join(APP, '*.ogg')): shutil.copy(f, www)
    for f in glob.glob(os.path.join(APP, 'img', '*.webp')): shutil.copy(f, os.path.join(www, 'img'))
    frag = open(os.path.join(APP, 'index.html'), encoding='utf-8').read()
    open(os.path.join(www, 'index.html'), 'w', encoding='utf-8').write('<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#F7EDDF"></head><body>\n' + frag + '\n</body></html>\n')
    # 3. version
    mf = os.path.join(AND, 'AndroidManifest.xml'); s = open(mf, encoding='utf-8').read()
    s = re.sub(r'android:versionCode="\d+" android:versionName="[\d.]+"', f'android:versionCode="{code}" android:versionName="{name}"', s); open(mf, 'w', encoding='utf-8').write(s)
    # 4. resources, java, dex
    shutil.rmtree(B, ignore_errors=True); os.makedirs(os.path.join(B, 'classes')); os.makedirs(os.path.join(B, 'dex'))
    run(aapt2, 'compile', '--dir', os.path.join(AND, 'res'), '-o', os.path.join(B, 'res.zip'))
    run(aapt2, 'link', '-o', os.path.join(B, 'res.apk'), '-I', jar('android.jar'), '--manifest', mf, '-A', os.path.join(AND, 'assets'), '--java', os.path.join(B, 'gen'),
        '--auto-add-overlay', '-0', 'ogg', '-0', 'webp', '--min-sdk-version', '24', '--target-sdk-version', '34', os.path.join(B, 'res.zip'))
    srcs = glob.glob(os.path.join(AND, 'java', '**', '*.java'), recursive=True) + glob.glob(os.path.join(B, 'gen', '**', '*.java'), recursive=True)
    out = subprocess.run(['java', '-jar', jar('ecj-3.45.0.jar'), '-source', '8', '-target', '8', '-encoding', 'UTF-8', '-nowarn', '-bootclasspath', jar('android.jar'), '-classpath', jar('android.jar'), '-d', os.path.join(B, 'classes')] + srcs, capture_output=True, text=True)
    if 'ERROR in' in out.stdout + out.stderr: sys.exit('JAVA COMPILE FAILED\n' + (out.stdout + out.stderr)[-4000:])
    classes = glob.glob(os.path.join(B, 'classes', '**', '*.class'), recursive=True)
    run('java', '-cp', jar('d8.jar'), 'com.android.tools.r8.D8', '--release', '--min-api', '24', '--lib', jar('android.jar'), '--output', os.path.join(B, 'dex'), *classes)
    # 5. package + align (uncompressed entries on 4-byte boundaries)
    src = zipfile.ZipFile(os.path.join(B, 'res.apk')); aligned = os.path.join(B, 'aligned.apk'); outz = zipfile.ZipFile(aligned, 'w')
    entries = [(i.filename, src.read(i.filename), i.compress_type, i.external_attr) for i in src.infolist()]
    entries.append(('classes.dex', open(os.path.join(B, 'dex', 'classes.dex'), 'rb').read(), zipfile.ZIP_DEFLATED, 0))
    for fn, data, ct, attr in entries:
        zi = zipfile.ZipInfo(fn, date_time=(2026, 1, 1, 0, 0, 0)); zi.compress_type = ct; zi.external_attr = attr; zi.create_system = 0
        if ct == zipfile.ZIP_STORED:
            n = (-(outz.fp.tell() + 30 + len(fn.encode()))) % 4
            if n and n < 4: n += 4
            zi.extra = (struct.pack('<HH', 0xD935, n - 4) + b'\0' * (n - 4)) if n else b''
        outz.writestr(zi, data, compress_type=ct)
    outz.close()
    # 6. sign with the release key (the SAME key must sign every update)
    pw = open(os.path.join(AND, 'keystore-password.txt')).read().strip(); os.makedirs(DIST, exist_ok=True)
    apk = os.path.join(DIST, f'Hooponopono-v{name}.apk')
    run('java', '-jar', jar('apksigner.jar'), 'sign', '--ks', os.path.join(AND, 'hooponopono-release.jks'), '--ks-key-alias', 'hooponopono', '--ks-pass', 'pass:' + pw, '--key-pass', 'pass:' + pw,
        '--v1-signing-enabled', 'true', '--v2-signing-enabled', 'true', '--v3-signing-enabled', 'true', '--out', apk, aligned)
    print(run('java', '-jar', jar('apksigner.jar'), 'verify', '--verbose', apk).splitlines()[0]); print('Built', apk, os.path.getsize(apk), 'bytes')
if __name__ == '__main__': main()
