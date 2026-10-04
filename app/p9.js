/* ================= LYRIC SYNC (tap along once; saved on this device) ================= */
const cuesFor=m=>(S.cues&&S.cues[m.id])||m.cues;
lineIndex=function(){const m=P.m;if(!m.lines)return m.rep?Math.min(3,Math.floor((P.t%m.rep)/(m.rep/4))):Math.floor(P.t/4)%4;const c=cuesFor(m);
 if(c){let k=-1;for(let j=0;j<c.length;j++)if(P.t>=c[j])k=j;return k}
 return Math.min(m.lines.length-1,Math.floor(P.t/P.dur*m.lines.length))};
function sheetLyrics(){const m=P.m;if(!m||!m.lines)return;const own=S.cues&&S.cues[m.id];
 C.Modal('Lyrics',`<p class="small muted">${own?'Using your own timing on this device.':'Lines out of step with the music? Tap along once to fix it.'}</p>
  <div class="row" style="margin:12px 0;flex-wrap:wrap"><button class="btn btn-primary btn-sm" data-a="syncstart">Sync lyrics</button>${own?`<button class="btn btn-secondary btn-sm" data-a="syncshow">Show timings</button><button class="btn btn-secondary btn-sm" data-a="syncreset">Reset</button>`:''}</div>
  <div class="card flat" style="max-height:46vh;overflow:auto"><div class="stack" style="gap:6px" data-notr>${m.lines.map((l,k)=>`<p class="serif" style="font-size:1.1rem;${k===P.idx?'font-weight:700;color:var(--botanical)':''}">${esc(l)}</p>`).join('')}</div></div>`)}
ACT.plyrics=()=>sheetLyrics();
function drawSync(){const m=P.m,s=P.sync;const g=$('#guided');if(g)g.hidden=true;let b=$('#syncp');
 if(!b){b=document.createElement('div');b.id='syncp';b.className='syncp';const ctl=document.querySelector('.pctl');ctl.parentNode.insertBefore(b,ctl)}
 b.innerHTML=`<p class="xs" style="letter-spacing:.14em;font-weight:700;color:#F4C98A">SYNC MODE · LINE ${s.i+1} OF ${m.lines.length}</p>
  ${s.i>0?`<p class="small" style="opacity:.6" data-notr>${esc(m.lines[s.i-1])}</p>`:'<p class="small" style="opacity:.6">Listen for the first line…</p>'}
  <p class="serif" style="font-size:1.55rem;line-height:1.25;font-weight:600" data-notr>${esc(m.lines[s.i])}</p>
  <button class="btn btn-cream btn-block" data-a="synctap" style="min-height:64px;font-size:1.05rem">Tap the moment this line begins</button>
  <div class="row" style="justify-content:center"><button class="link small" data-a="syncundo" style="color:#F7F2E8" ${s.i?'':'disabled'}>Undo last</button><button class="link small" data-a="synccancel" style="color:#F7F2E8">Cancel</button></div>`}
function endSync(){P.sync=null;const b=$('#syncp');if(b)b.remove();const g=$('#guided');if(g)g.hidden=false;P.idx=-1;updPlayer()}
function timingText(m){const c=cuesFor(m);return `${m.title}\n`+m.lines.map((l,i)=>`${fmtT(c[i])}  ${c[i].toFixed(1)}  ${l}`).join('\n')}
function showTimings(m,done){const sh=C.Modal(done?'Lyrics synced':'Lyrics timings',`<p class="small muted">${done?'Saved on this device and in use now. ':''}To make this timing part of the app for everyone, copy it and send it to your developer.</p>
  <textarea class="write" id="synctxt" readonly style="min-height:200px;font-size:.8rem;margin-top:10px">${esc(timingText(m))}</textarea>
  <div style="margin-top:12px">${C.PrimaryButton('Copy timings','synccopy')}</div>`)}
Object.assign(ACT,{
 syncstart:()=>{closeSheet();P.sync={i:0,c:[]};P.t=0;audio.currentTime=0;P.repeat=false;if(!P.playing)playerPlay();drawSync();toast('Tap as each line begins')},
 synctap:()=>{const m=P.m,s=P.sync;if(!s)return;s.c.push(Math.max(0,Math.round((audio.currentTime-.25)*10)/10));s.i++;
  if(s.i>=m.lines.length){S.cues=S.cues||{};S.cues[m.id]=s.c;save();endSync();showTimings(m,true)}else drawSync()},
 syncundo:()=>{const s=P.sync;if(!s||!s.i)return;s.i--;s.c.pop();const back=Math.max(0,(s.c[s.c.length-1]||0)-2);audio.currentTime=back;P.t=back;drawSync()},
 synccancel:()=>{endSync();toast('Sync cancelled')},
 syncshow:()=>{closeSheet();showTimings(P.m,false)},
 syncreset:()=>{if(S.cues)delete S.cues[P.m.id];save();closeSheet();P.idx=-1;updPlayer();toast('Back to the built-in timing')},
 synccopy:()=>{const t=$('#synctxt');const ok=()=>toast('Timings copied');const sel=()=>{t.focus();t.select();try{document.execCommand('copy');ok()}catch(e){toast('Select the text and copy it')}};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t.value).then(ok,sel);else sel()}
});
const _closePlayer9=closePlayer;closePlayer=function(){if(P.sync)P.sync=null;_closePlayer9()};
