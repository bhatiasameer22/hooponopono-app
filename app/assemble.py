import builtins
_o=builtins.open
def open(f,m='r',**k):
    k.setdefault('encoding','utf-8');return _o(f,m,**k)

import re,os
def build():
    s=open('p1.html').read();p3=open('p3.js').read();i=p3.index("/* boot */")
    hi=open('hi.js').read() if os.path.exists('hi.js') else 'const HI={};'
    parts=[open('scripts_src.js').read()]+[open(f'p{k}.js').read() for k in (4,5)]+["AFTER.affirmations=AFTER.morning;"]+[open(f'p{k}.js').read() for k in (6,7,8,9,10,11)]
    body=open('p2.js').read()+"\n"+p3[:i]+"\n".join(parts)+"\nS.voiceOn=false;\n"
    names=sorted(set(re.findall(r'^const ([A-Z][A-Z0-9_]*)=(?:[\[{]|Object\.fromEntries)',body,re.M)))
    body+="if(window.__HOO_DEBUG)window.__HOO={"+",".join(names)+"};\n"+p3[i:]
    js="(function(){\n'use strict';\n"+hi+"\n"+body+"\n})();"
    open('check.js','w',encoding='utf-8').write(js)
    frag=s+"\n<script>\n"+js+"\n</script>\n"
    open('index.html','w').write(frag)
    open('app.html','w').write('<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n'+frag+'\n</body></html>\n')
    print(len(js),names)
build()
