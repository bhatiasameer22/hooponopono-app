/* ================= v2.1: 21-DAY CHALLENGE · SHARE CARDS · BACKUP · LANGUAGE ================= */
const SHARE_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22" aria-hidden="true"><path d="M12 15V3M8 7l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>`;

/* ---------- 21-day healing challenge ---------- */
const CH_WEEKS=[['Week 1 · Release','Clean what you have been carrying.'],['Week 2 · Forgive','Soften towards yourself and others.'],['Week 3 · Love and receive','Open to love, health and abundance.']];
const CH=[
 {t:'The four phrases',d:'Listen once and let the words wash through you.',k:'med',v:'mantra',b:'Play Return to Peace'},
 {t:'Breathe and arrive',d:'Five slow breaths bring you back to this moment.',k:'go',v:'breath',b:'Start breathing'},
 {t:'Name what is heavy',d:'Write down what you are ready to release today.',k:'journal',v:'release',b:'Open the journal'},
 {t:'A grateful morning',d:'Speak the gratitude affirmations with feeling.',k:'aff',v:'gratitude',b:'Begin affirmations'},
 {t:'Calm the worry',d:'A guided meditation to settle a busy mind.',k:'med',v:'anxiety',b:'Play Calm Anxiety'},
 {t:'Cool the anger',d:'Clean anger with the Ho’oponopono script.',k:'script',v:'anger',b:'Open the script'},
 {t:'Burn it and let go',d:'Write what you release, then watch it burn away.',k:'go',v:'bowl',b:'Open the burning bowl'},
 {t:'Forgive yourself',d:'Listen to I Choose Peace and forgive your past self.',k:'med',v:'choosepeace',b:'Play I Choose Peace'},
 {t:'What am I sorry for?',d:'An honest page in your journal. No one else will read it.',k:'journal',v:'sorry',b:'Open the journal'},
 {t:'Heal one relationship',d:'Choose one person and clean what stands between you.',k:'script',v:'relationship',b:'Open the script'},
 {t:'Peace with family',d:'Release old family hurts with love.',k:'script',v:'family',b:'Open the script'},
 {t:'Meet your younger self',d:'A guided script to comfort your inner child.',k:'script',v:'inner',b:'Open the script'},
 {t:'Who do I need to forgive?',d:'Write their name and what you are letting go of.',k:'journal',v:'forgive',b:'Open the journal'},
 {t:'Send loving-kindness',d:'Send love to yourself, then to everyone you know.',k:'med',v:'kindness',b:'Play Loving-Kindness'},
 {t:'Come home to yourself',d:'Clean the inner critic with the self-love script.',k:'script',v:'self',b:'Open the script'},
 {t:'Love yourself more',d:'Write one kind thing you can do for yourself today.',k:'journal',v:'loveself',b:'Open the journal'},
 {t:'Thank your body',d:'Speak to your body with gratitude and care.',k:'script',v:'health',b:'Open the script'},
 {t:'Welcome abundance',d:'Clean old beliefs about money and open to receive.',k:'script',v:'money',b:'Open the script'},
 {t:'Open your hands',d:'A guided meditation on letting go.',k:'med',v:'lettinggo',b:'Play Letting Go'},
 {t:'Write your desire',d:'Begin the 55 × 5 writing with one clear wish.',k:'go',v:'fivefive',b:'Open 55 × 5 writing'},
 {t:'Thank you. I love you.',d:'Write what you are grateful for after 21 days.',k:'journal',v:'grateful',b:'Open the journal'}
];
const chS=()=>S.ch||{start:null,done:[]};
const chDay=()=>chS().done.length;
const chLockedToday=()=>{const d=chS().done;return d.length>0&&d.length<21&&d[d.length-1]===dk()};
function chStreak(){const d=chS().done;if(!d.length)return 0;const set=new Set(d);let n=0;const x=new Date();if(!set.has(dk(x)))x.setDate(x.getDate()-1);while(set.has(dk(x))){n++;x.setDate(x.getDate()-1)}return n}
function chRing(n){const r=44,c=2*Math.PI*r,f=Math.min(1,n/21);
 return `<svg viewBox="0 0 108 108" width="108" height="108" role="img" aria-label="${n} of 21 days"><circle cx="54" cy="54" r="${r}" fill="none" stroke="var(--beige)" stroke-width="9"/><circle cx="54" cy="54" r="${r}" fill="none" stroke="var(--sage)" stroke-width="9" stroke-linecap="round" stroke-dasharray="${(c*f).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 54 54)"/><text x="54" y="52" text-anchor="middle" fill="var(--ink)" style="font:700 26px var(--serif)">${n}</text><text x="54" y="70" text-anchor="middle" fill="var(--muted)" style="font:600 11px var(--sans)">/ 21</text></svg>`}
function chCard(){const c=chS(),n=chDay();
 if(!c.start)return `<button class="card row chhome" data-a="go" data-v="challenge" style="border:0;width:100%;text-align:left"><span class="chbadge">21</span><span class="grow"><b style="display:block">21-Day Healing Challenge</b><span class="small muted">One small practice a day. Start today.</span></span>${svg('chev','chev')}</button>`;
 return `<button class="card chhome" data-a="go" data-v="challenge" style="border:0;width:100%;text-align:left;display:block"><span class="row"><span class="chbadge">${Math.min(21,n+(chLockedToday()||n>=21?0:1))}</span><span class="grow"><b style="display:block">21-Day Healing Challenge</b><span class="small muted">${n>=21?'Complete. Beautiful work.':chLockedToday()?`Day ${n} done. Come back tomorrow.`:`Day ${n+1} of 21 · ${CH[n].t}`}</span></span>${svg('chev','chev')}</span><span class="mbar" style="display:block;margin-top:12px"><i style="width:${n/21*100}%"></i></span></button>`}
SCREENS.challenge=()=>{const c=chS(),n=chDay(),lock=chLockedToday(),st=chStreak();
 if(!c.start)return `${C.TopHeader('21-Day Challenge')}
  <div class="card center stack" style="gap:12px;align-items:center;padding:26px 20px"><span class="chbadge" style="width:76px;height:76px;font-size:2rem">21</span><h2 class="h-lg">Twenty-one days of gentle healing</h2>
   <p class="muted">One short practice each day, about five to ten minutes. Each day opens the day after you finish the one before, so you never fall behind.</p></div>
  <div class="stack" style="gap:10px;margin-top:16px">${CH_WEEKS.map(([t,d],i)=>`<div class="card flat row"><span class="num">${i+1}</span><span class="grow"><b style="display:block">${t}</b><span class="small muted">${d}</span></span></div>`).join('')}</div>
  <div style="margin-top:20px">${C.PrimaryButton('Start the challenge','chstart')}</div>`;
 const cur=n<21?CH[n]:null;
 return `${C.TopHeader('21-Day Challenge')}
  <div class="card row" style="gap:18px">${chRing(n)}<div class="grow"><p class="h-md">${n>=21?'Challenge complete':`Day ${Math.min(21,n+(lock?0:1))} of 21`}</p><p class="small muted">${st} day streak</p><p class="small" style="color:var(--botanical);margin-top:4px">${n>=21?'You showed up for yourself for 21 days.':lock?'Today is done. Rest, and come back tomorrow.':'Today’s practice is ready.'}</p></div></div>
  ${cur&&!lock?`<section class="card chtoday" style="margin-top:14px"><p class="xs" style="letter-spacing:.14em;font-weight:700;color:var(--botanical)">TODAY · DAY ${n+1}</p><h2 class="h-lg" style="margin-top:4px">${cur.t}</h2><p class="muted" style="margin-top:6px">${cur.d}</p>
   <div class="stack" style="gap:10px;margin-top:16px">${C.PrimaryButton(cur.b,'chdo',n)}${C.SecondaryButton('I have done it · mark day complete','chdone',n)}</div></section>`:''}
  ${CH_WEEKS.map(([wt],w)=>`${C.SectionHeader(wt)}<div class="stack" style="gap:8px">${CH.slice(w*7,w*7+7).map((x,j)=>{const i=w*7+j;const done=i<n,now=i===n&&!lock;
    return `<button class="pitem chitem ${done?'isdone':now?'isnow':'islock'}" data-a="chdo" data-v="${i}" ${done||now?'':'disabled'}><span class="num ${done?'done':''}" ${done||now?'':'style="background:var(--beige);color:var(--faint)"'}>${done?svg('check','',2.6):i+1}</span><span class="grow"><b style="display:block">${x.t}</b><span class="small muted">${x.d}</span></span>${done||now?svg('chev','chev'):svg('lock','chev')}</button>`}).join('')}</div>`).join('')}
  <div style="margin-top:22px" id="chreset"><button class="link small" data-a="chresetask" style="color:var(--muted)">Start the challenge again</button></div>`};
Object.assign(ACT,{
 chstart:()=>{S.ch={start:dk(),done:[]};save();rerender();toast('Your 21 days begin today')},
 chdo:v=>{const x=CH[Number(v)];if(!x)return;
  if(x.k==='med')openMed(x.v);else if(x.k==='script')go('script',x.v);else if(x.k==='aff')openMorning(x.v);
  else if(x.k==='journal'){UI.jPrompt=x.v;UI.jDate=dk();go('journal')}else go(x.v)},
 chdone:v=>{const c=chS();if(Number(v)!==c.done.length||chLockedToday())return;c.done.push(dk());S.ch=c;save();rerender();
  toast(c.done.length>=21?'21 days complete. Thank you. I love you.':`Day ${c.done.length} complete ✓`)},
 chresetask:()=>{$('#chreset').innerHTML=`<div class="card flat row" style="flex-wrap:wrap"><span class="grow small">Clear your challenge progress and begin again from day 1?</span><button class="btn btn-sm" style="background:#A33B3B;color:#fff" data-a="chresetyes">Start again</button><button class="btn btn-secondary btn-sm" data-a="chresetno">Keep</button></div>`},
 chresetyes:()=>{S.ch=null;save();rerender()},chresetno:()=>rerender()
});
const _act10=activityDays;activityDays=function(){const s=_act10();chS().done.forEach(d=>s.add(d));return s};
const _home10=SCREENS.home;SCREENS.home=p=>_home10(p).replace('<div class="tiles">',mlCard()+chCard()+'<div class="tiles">');
const _daily10=SCREENS.daily;SCREENS.daily=p=>_daily10(p).replace('<div class="jhero">',chCard()+'<div class="jhero" style="margin-top:14px">');

/* ---------- share cards ---------- */
let CARD=null;
function wrapLines(x,text,maxW){const words=String(text).split(/\s+/);const lines=[];let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(x.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t}if(cur)lines.push(cur);return lines}
function makeCard(text){const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#FBEBD6');g.addColorStop(.55,'#F3CFAE');g.addColorStop(1,'#DE9A76');x.fillStyle=g;x.fillRect(0,0,W,H);
 const sun=x.createRadialGradient(W*.5,H*.3,20,W*.5,H*.3,520);sun.addColorStop(0,'rgba(255,240,205,.95)');sun.addColorStop(1,'rgba(255,240,205,0)');x.fillStyle=sun;x.fillRect(0,0,W,H);
 x.fillStyle='rgba(177,86,58,.34)';x.beginPath();x.moveTo(0,H);x.lineTo(0,H*.86);x.bezierCurveTo(W*.25,H*.78,W*.45,H*.9,W*.7,H*.83);x.bezierCurveTo(W*.85,H*.79,W*.95,H*.82,W,H*.8);x.lineTo(W,H);x.fill();
 x.fillStyle='rgba(140,64,41,.42)';x.beginPath();x.moveTo(0,H);x.lineTo(0,H*.93);x.bezierCurveTo(W*.3,H*.87,W*.6,H*.97,W,H*.89);x.lineTo(W,H);x.fill();
 /* lotus */
 x.save();x.translate(W/2,210);x.strokeStyle='#8C4029';x.lineWidth=5;x.lineCap='round';x.lineJoin='round';
 const petal=(a,l,w)=>{x.save();x.rotate(a);x.beginPath();x.moveTo(0,30);x.bezierCurveTo(-w,0,-w,-l*.6,0,-l);x.bezierCurveTo(w,-l*.6,w,0,0,30);x.stroke();x.restore()};
 petal(0,78,30);petal(-.62,66,26);petal(.62,66,26);petal(-1.15,52,22);petal(1.15,52,22);x.beginPath();x.moveTo(-86,44);x.quadraticCurveTo(0,66,86,44);x.stroke();x.restore();
 x.textAlign='center';x.fillStyle='#8C4029';x.font='700 30px Figtree, "Noto Sans Devanagari", sans-serif';try{x.letterSpacing='10px'}catch(e){}x.fillText('HO’OPONOPONO',W/2+5,330);try{x.letterSpacing='0px'}catch(e){}
 const fam='"Cormorant Garamond", "Noto Serif Devanagari", "Noto Sans Devanagari", Georgia, serif';let size=92,lines=[];
 for(;size>=44;size-=6){x.font=`600 ${size}px ${fam}`;lines=wrapLines(x,text,W-200);if(lines.length*size*1.28<=560)break}
 const lh=size*1.28;let y=H*.52-(lines.length*lh)/2+size*.8;x.fillStyle='#3B2A20';lines.forEach(l=>{x.fillText(l,W/2,y);y+=lh});
 x.fillStyle='rgba(59,42,32,.8)';x.font='500 32px Figtree, "Noto Sans Devanagari", sans-serif';x.fillText(MANTRA.map(m=>T(m)).join('  ·  '),W/2,H*.775);
 return c}
function shareCard(text){text=String(T(text)||'').replace(/^[“"]|[”"]$/g,'');if(!text)return;const draw=()=>{const c=makeCard(text);CARD={c,text,url:c.toDataURL('image/png')};
  C.Modal('Share this affirmation',`<img src="${CARD.url}" alt="${esc(text)}" style="width:100%;border-radius:20px;box-shadow:var(--shadow)">
   <div class="stack" style="gap:10px;margin-top:14px">${C.PrimaryButton('Share','cardshare')}${C.SecondaryButton(NAT()?'Save to gallery':'Save picture','cardsave')}</div>
   <p class="xs faint center" style="margin-top:10px">${NAT()?'Send it on WhatsApp, Instagram or any other app.':'You can also press and hold the picture to save it.'}</p>`)};
 if(document.fonts&&document.fonts.load){Promise.race([document.fonts.load('600 80px "Cormorant Garamond"'),new Promise(r=>setTimeout(r,800))]).then(draw,draw)}else draw()}
function cardBlob(){return new Promise(r=>{try{CARD.c.toBlob(b=>r(b),'image/png')}catch(e){r(null)}})}
function downloadBlob(blob,name){const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}
Object.assign(ACT,{
 mshare:()=>{const it=MA.items[MA.i];if(it)shareCard(it.t)},
 affshare:v=>shareCard(affText(v)),
 cardshare:async()=>{if(!CARD)return;const n=NAT();
  if(n&&n.shareImage){try{n.shareImage(CARD.url.split(',')[1],CARD.text)}catch(e){toast('Sharing isn’t available right now')}return}
  const b=await cardBlob();if(!b){toast('Press and hold the picture to save it');return}
  try{const f=new File([b],'affirmation.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],text:CARD.text});return}}catch(e){if(e&&e.name==='AbortError')return}
  try{downloadBlob(b,'affirmation.png');toast('Picture saved to your downloads')}catch(e){toast('Press and hold the picture to save it')}},
 cardsave:async()=>{if(!CARD)return;const n=NAT();if(n&&n.saveImage){let r='';try{r=String(n.saveImage(CARD.url.split(',')[1])||'')}catch(e){}toast(r?'Picture saved to your gallery':'The picture could not be saved');return}const b=await cardBlob();try{downloadBlob(b,'affirmation.png');toast('Picture saved to your downloads')}catch(e){toast('Press and hold the picture to save it')}}
});

/* ---------- backup and restore ---------- */
const BK_APP='hooponopono-healing';
const bkText=()=>JSON.stringify({app:BK_APP,v:1,exported:new Date().toISOString(),data:S});
const bkName=()=>`hooponopono-backup-${dk()}.json`;
function bkMark(){S.lastBackup=dk();save();if(stack[stack.length-1].n==='backup')rerender()}
SCREENS.backup=()=>`${C.TopHeader('Backup & Restore')}
 <p class="muted small center" style="margin:-4px 8px 16px">Your journal, progress and settings live only on this phone. Save a backup file so you can bring them to a new phone.</p>
 <section class="card stack" style="gap:12px"><h2 class="h-sm">Save a backup</h2>
  <p class="small muted">${S.journal.length} journal entries · ${S.sessions.length} sessions${S.lastBackup?` · Last backup: <span>${fmtDate(S.lastBackup)}</span>`:''}</p>
  ${C.PrimaryButton(NAT()?'Save backup to this phone':'Download backup file','bkexport')}
  ${NAT()?C.SecondaryButton('Send backup to Drive, email or WhatsApp','bkshare'):''}
  ${C.SecondaryButton('Copy backup as text','bkcopy')}</section>
 <section class="card stack" style="gap:12px;margin-top:14px"><h2 class="h-sm">Restore from a backup</h2>
  <p class="small muted">Choose the backup file you saved earlier. You will be asked to confirm before anything is replaced.</p>
  <input type="file" id="bkfile" accept=".json,application/json,text/plain,*/*" hidden>
  ${C.SecondaryButton('Choose backup file','bkpick')}
  <details class="faq"><summary>Or paste backup text${svg('down','chev')}</summary><textarea id="bkpaste" class="write" style="min-height:120px;margin-top:10px;font-size:.8rem" placeholder="Paste the backup text here"></textarea><div style="margin-top:10px">${C.SecondaryButton('Restore from pasted text','bkpaste')}</div></details></section>`;
AFTER.backup=()=>{const f=$('#bkfile');if(f)f.onchange=()=>{const file=f.files&&f.files[0];if(!file)return;const r=new FileReader();r.onload=()=>bkParse(String(r.result||''));r.onerror=()=>toast('That file could not be read');r.readAsText(file);f.value=''}};
function bkParse(text){let o=null;try{o=JSON.parse(text.trim())}catch(e){}
 if(!o||o.app!==BK_APP||!o.data||typeof o.data!=='object'){toast('This is not a Ho’oponopono backup file');return}
 UI.bk=o;const d=o.data;const when=(o.exported||'').slice(0,10);
 C.Modal('Restore this backup?',`<p class="small muted">Backup date: <span>${when?fmtDate(when):'—'}</span> · ${(d.journal||[]).length} journal entries · ${(d.sessions||[]).length} sessions</p>
  <p class="small" style="margin-top:10px">Everything now on this phone (${S.journal.length} journal entries) will be replaced by the backup.</p>
  <div class="stack" style="gap:10px;margin-top:16px"><button class="btn btn-block" style="background:#A33B3B;color:#fff" data-a="bkapply">Replace with backup</button>${C.SecondaryButton('Cancel','closesheet')}</div>`)}
window.__restore=t=>bkParse(String(t||''));
Object.assign(ACT,{
 bkexport:()=>{const n=NAT(),t=bkText();
  if(n&&n.saveFile){let r='';try{r=String(n.saveFile(bkName(),t)||'')}catch(e){}if(r){bkMark();toast('Backup saved in your Downloads folder')}else if(n.shareFile){try{n.shareFile(bkName(),t);bkMark()}catch(e){toast('The backup could not be saved')}}return}
  try{downloadBlob(new Blob([t],{type:'application/json'}),bkName());bkMark();toast('Backup file downloaded')}catch(e){toast('Download isn’t available here. Use “Copy backup as text”.')}},
 bkshare:()=>{const n=NAT();try{n.shareFile(bkName(),bkText());bkMark()}catch(e){toast('Sharing isn’t available right now')}},
 bkcopy:()=>{const t=bkText();const ok=()=>{bkMark();toast('Backup text copied. Paste it somewhere safe.')};const fb=()=>{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(e){toast('Copying isn’t available here')}a.remove()};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fb);else fb()},
 bkpick:()=>{const f=$('#bkfile');if(f)f.click()},
 bkpaste:()=>{const t=$('#bkpaste');if(!t||!t.value.trim()){toast('Paste the backup text first');return}bkParse(t.value)},
 bkapply:()=>{const o=UI.bk;if(!o)return;const keepLang=S.lang;S=Object.assign(structuredClone(DEF),o.data);S.rem=Object.assign(structuredClone(DEF.rem),S.rem||{});S.onboarded=true;S.nameSet=true;if(S.lang!=='hi'&&S.lang!=='en')S.lang=keepLang;
  UI.bk=null;save();closeSheet();tab('home');remSync();toast('Backup restored')}
});

/* ---------- language ---------- */
ACT.langsheet=()=>C.Modal('Language',`<div class="stack" style="gap:8px" data-notr><button class="opt" data-a="setlang" data-v="en" aria-pressed="${S.lang==='en'}"><span class="radio"></span>English</button><button class="opt" data-a="setlang" data-v="hi" aria-pressed="${S.lang==='hi'}"><span class="radio"></span>हिन्दी (Hindi)</button></div>${S.lang==='hi'?`<p class="small muted" style="margin:16px 0 8px" data-notr>हिन्दी वाक्य किस रूप में हों?</p><div class="stack" style="gap:8px" data-notr><button class="opt" data-a="setgender" data-v="f" aria-pressed="${S.gender!=='m'}"><span class="radio"></span>स्त्रीलिंग · “मैं छोड़ती हूँ”</button><button class="opt" data-a="setgender" data-v="m" aria-pressed="${S.gender==='m'}"><span class="radio"></span>पुल्लिंग · “मैं छोड़ता हूँ”</button></div>`:''}<p class="xs faint" style="margin-top:12px">Songs are sung in English, so their lyrics stay in English.</p>`);
ACT.setgender=v=>{S.gender=v==='m'?'m':'f';save();closeSheet();render()};
const _setlang10=ACT.setlang;ACT.setlang=v=>{_setlang10(v);if(v==='hi'&&stack[stack.length-1].n==='more')ACT.langsheet()};
const _ssubj10=ACT.ssubj;ACT.ssubj=v=>_ssubj10(S.lang==='hi'?T(v):v);

/* ---------- More: entry points ---------- */
const _more10=SCREENS.more;
SCREENS.more=p=>_more10(p)
 .replace('<button class="li" data-a="go" data-v="reminders">',`<button class="li" data-a="go" data-v="challenge"><span class="ico" style="background:#F5DDCF;color:#8C4029">${svg('star')}</span><span class="grow">21-Day Challenge</span>${svg('chev','chev')}</button><button class="li" data-a="go" data-v="reminders">`)
 .replace('<button class="li" data-a="replay">',`<button class="li" data-a="langsheet"><span class="ico" style="background:var(--beige)">${svg('info')}</span><span class="grow">Language</span><span class="small muted" data-notr>${S.lang==='hi'?'हिन्दी':'English'}</span>${svg('chev','chev')}</button><button class="li" data-a="go" data-v="backup"><span class="ico" style="background:var(--beige)">${svg('download')}</span><span class="grow">Backup & Restore</span>${svg('chev','chev')}</button><button class="li" data-a="replay">`);
window.__T=s=>T(s);
window.__notifChanged=()=>{try{if(stack[stack.length-1].n==='reminders')rerender()}catch(e){}};
/* ---------- mini player: music keeps playing when you leave the player ---------- */
function miniDraw(){let el=$('#mini');if(!P.m||!P.min){if(el)el.remove();document.body.classList.remove('hasmini');return}
 if(!el){el=document.createElement('div');el.id='mini';el.className='mini';$('#app').appendChild(el)}
 const m=P.m;el.innerHTML=`<button class="minimain" data-a="miniopen" aria-label="Open player"><img src="${img(m.img)}" alt=""><span class="grow"><b>${esc(m.title)}</b><span class="xs" id="minisub" data-notr></span></span></button><button class="iconbtn" data-a="ptoggle" id="minipp" aria-label="Pause">${svg('pause')}</button><button class="iconbtn" data-a="miniclose" aria-label="Stop and close">${svg('close','',2)}</button><i class="minibar"><i id="minifill"></i></i>`;
 document.body.classList.add('hasmini');miniUpd()}
function miniUpd(){const pp=$('#minipp');if(!pp||!P.m)return;const st=P.playing?'pause':'play';if(pp.dataset.s!==st){pp.dataset.s=st;pp.innerHTML=svg(st);pp.setAttribute('aria-label',P.playing?'Pause':'Play')}
 const f=$('#minifill');if(f)f.style.width=Math.min(100,(P.t/P.dur*100)||0)+'%';
 const s=$('#minisub');if(s){const x=fmtT(P.t)+' / '+fmtT(P.dur)+(P.loopN?`  ·  ${Math.min(P.loopN,P.loopDone+1)}/${P.loopN}`:'');if(s.textContent!==x)s.textContent=x}}
function minimizePlayer(){if(!P.m)return;if(P.sync){P.sync=null;const b=$('#syncp');if(b)b.remove()}P.min=true;$('#player').hidden=true;document.body.style.overflow='';closeSheet();
 const fr=Math.min(1,P.t/P.dur||0);S.prog[P.m.id]=fr>.97?1:fr;save();rerender();miniDraw()}
function restorePlayer(){if(!P.m||R.s||MA.items.length)return;P.min=false;miniDraw();$('#player').hidden=false;document.body.style.overflow='hidden';drawPlayer();try{history.pushState({p:1},'')}catch(e){}}
ACT.miniopen=()=>restorePlayer();ACT.miniclose=()=>closePlayer();
const _ss10=startScript;startScript=function(){if(P.m&&!P.m.audio)closePlayer();_ss10()};
const _om10=openMorning;openMorning=function(sec){if(P.m&&!P.m.audio)closePlayer();_om10(sec);if(P.m&&P.m.audio&&P.playing)AMB.stop()};

/* ---------- mantra loop: hear a track 21 times (or 3, 7, 108) ---------- */
const mlCard=()=>`<div class="card" style="background:linear-gradient(120deg,var(--ivory),#F8E4C4);padding:0"><button class="row" data-a="med" data-v="mantra21" style="border:0;background:none;width:100%;text-align:left;padding:18px"><span class="chbadge" style="background:linear-gradient(135deg,#DDB96F,#B1563A)">21</span><span class="grow"><b style="display:block">Ho’oponopono Mantra · 21 times</b><span class="small muted">The four phrases, chanted 21 times. About 5 minutes.</span></span><span class="cplay solid" aria-hidden="true">${svg('play')}</span></button></div>`;
function sheetMantra(){const L=TRK();if(!L.length)return;UI.ml=UI.ml||{id:L[0].id,n:21};if(!L.find(m=>m.id===UI.ml.id))UI.ml.id=L[0].id;const cur=MED[UI.ml.id];
 C.Modal('Mantra Loop',`<p class="small muted">Choose a song and how many times to hear it. It plays in a loop and stops by itself. You can leave this screen or switch off the display while it plays.</p>
  <p class="h-sm" style="margin:14px 0 8px">Song</p><div class="stack" style="gap:8px">${L.map(m=>`<button class="opt" data-a="mlpick" data-v="${m.id}" aria-pressed="${UI.ml.id===m.id}"><span class="radio"></span><span class="grow">${esc(m.title)}</span><span class="small muted">${m.min} min</span></button>`).join('')}</div>
  <p class="h-sm" style="margin:16px 0 8px">How many times?</p><div class="seg3" style="grid-template-columns:repeat(4,1fr)">${[3,7,21,108].map(n=>`<button data-a="mln" data-v="${n}" aria-pressed="${UI.ml.n===n}">${n}</button>`).join('')}</div>
  <p class="xs faint" style="margin-top:8px">About ${Math.round((cur.dur||cur.min*60)*UI.ml.n/60)} minutes in total</p>
  <div style="margin-top:14px">${C.PrimaryButton('Start the loop','mlstart')}</div>`)}
Object.assign(ACT,{mantraloop:()=>sheetMantra(),mlpick:v=>{UI.ml.id=v;sheetMantra()},mln:v=>{UI.ml.n=Number(v);sheetMantra()},
 mlstart:()=>{const u=UI.ml;closeSheet();openMed(u.id,{loop:u.n});toast(`Playing ${u.n} times in a loop`)}});

/* ---------- Home, bottom: every song and mantra in one scrollable row (newest first) ---------- */
const _home11=SCREENS.home;
SCREENS.home=p=>_home11(p)+`${C.SectionHeader('Music & Mantras',`<span class="small muted">${tracks().length}</span>`)}
 <div class="mrow">${tracks().map((m,i)=>`<button class="mtile" data-a="med" data-v="${m.id}" aria-label="Play ${esc(m.title)}"><span class="mtimg"><img src="${img(m.img)}" alt="" loading="lazy"${m.pos?` style="object-position:${m.pos}"`:''}>${i===0?'<span class="trknew" style="left:8px;top:8px;font-size:.66rem;padding:2px 9px">New</span>':''}<span class="mtplay">${svg('play')}</span></span><b>${esc(m.title)}</b><span class="xs muted">${m.min} min · ${esc(m.tag)}</span></button>`).join('')}</div>
 <p class="xs faint" style="margin-top:8px">Swipe sideways to see them all. New songs and mantras appear here first.</p>`;

/* ---------- debug only: text recorder used to build and check the Hindi dictionary ---------- */
if(window.__HOO_DEBUG){const seen=new Set();const rec=s=>{s=(s||'').trim();if(s&&/[A-Za-z]{2}/.test(s)&&!seen.has(s)){seen.add(s);console.log('SEEN:'+JSON.stringify(s))}};
 const walk=n=>{if(n.nodeType===3){const p=n.parentElement;if(p&&!p.closest(NOTR))rec(n.nodeValue)}else if(n.nodeType===1){const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT);while(w.nextNode()){const p=w.currentNode.parentElement;if(p&&!p.closest(NOTR))rec(w.currentNode.nodeValue)}
   [n,...n.querySelectorAll('[placeholder],[aria-label]')].forEach(e=>{if(e.closest(NOTR))return;for(const a of['placeholder','aria-label'])rec(e.getAttribute&&e.getAttribute(a))})}};
 new MutationObserver(ms=>ms.forEach(m=>{m.addedNodes.forEach(walk);if(m.type==='characterData')walk(m.target)})).observe(document.body,{childList:true,subtree:true,characterData:true});
 window.__API={SCREENS,ACT,go,tab,render,openMed,closePlayer,closeSheet,get S(){return S},UI,get stack(){return stack},set stack(v){stack=v}};
 setTimeout(()=>walk(document.body),0)}
window.__shareFailed=()=>toast('Sharing isn’t available right now');
