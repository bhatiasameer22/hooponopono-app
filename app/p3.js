/* ================= STATE ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='hoo.app.v2';
const DEF={onboarded:false,name:'',nameSet:false,lang:'en',gender:'f',ch:null,premium:false,favs:[],affFavs:[],saved:[],prog:{},sessions:[],journal:[],practice:{},
  sound:'ocean',vol:.55,voice:'female',voiceOn:false,bell:true,theme:'light',plan:'yearly',draft:'',
  rem:{mantra:{on:true,t:'08:00'},journal:{on:true,t:'21:00'},practice:{on:false,t:'18:00'},evening:{on:false,t:'21:30'},quotes:{on:false,t:'10:00'}},remShown:{}};
let S;
try{S=Object.assign(structuredClone(DEF),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){S=structuredClone(DEF)}
S.rem=Object.assign(structuredClone(DEF.rem),S.rem||{});
if(!S.nameSet&&S.name==='Ritima')S.name='';
if(S.lang!=='hi')S.lang='en';
if(window.__HOO_LANG==='hi')S.lang='hi';
if(S.gender!=='m')S.gender='f';
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const pad=n=>String(n).padStart(2,'0');
const dk=(d=new Date())=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parseDk=k=>{const[y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d)};
const fmtT=s=>{s=Math.max(0,Math.round(s));return`${pad(Math.floor(s/60))}:${pad(s%60)}`};
const fmtDate=k=>parseDk(k).toLocaleDateString(S.lang==='hi'?'hi-IN':'en-GB',{day:'numeric',month:'short',year:'numeric'});
const canUse=m=>m.free||S.premium;
const img=n=>`img/${n}.webp`;
function toast(msg){document.querySelectorAll('.toast').forEach(t=>t.remove());const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)}

/* ================= LANGUAGE (English / Hindi) =================
   HI is a plain dictionary {English: Hindi}. Keys may hold {#1},{#2} for numbers and {n},{x},{y}… for inserted words.
   Screens are written in English; in Hindi mode every text node is translated as it is added to the page. */
const HID=(typeof HI==='object'&&HI)||{};let HI_L=null,HI_P=null;
function hiPrep(){if(HI_L)return;HI_L={};HI_P=[];for(const k in HID){HI_L[k.toLowerCase()]=HID[k];
  if(/\{[a-z]\w*\}/i.test(k)){const names=[];const re=new RegExp('^'+k.replace(/[.*+?^$()|[\]\\]/g,'\\$&').replace(/\{([a-z]\w*)\}/gi,(m,n)=>{names.push(n);return'(.+?)'})+'$','i');HI_P.push([re,names,HID[k],k.replace(/\{[a-z]\w*\}/gi,'').length])}}HI_P.sort((a,b)=>b[3]-a[3])}
const numNorm=s=>{const nums=[];const k=s.replace(/\d+(?:[.,:]\d+)*/g,m=>{nums.push(m);return'{#'+nums.length+'}'});return[k,nums]};
const numFill=(v,nums)=>v.replace(/\{#(\d+)\}/g,(m,i)=>nums[i-1]??m);
function trList(v,d){const r=trCore(v,d);if(r!=null)return r;if(/, | and /.test(v)){const parts=v.split(/, | and /).map(p=>trCore(p.trim(),d)??p.trim());return parts.length<2?parts[0]:parts.slice(0,-1).join(', ')+' और '+parts[parts.length-1]}return v}
function trCore(s,d=0){let v=HID[s];if(v!=null)return v;const[k,nums]=numNorm(s);
 if(nums.length){v=HID[k];if(v!=null)return numFill(v,nums)}
 v=HI_L[s.toLowerCase()];if(v!=null)return v;
 if(nums.length){v=HI_L[k.toLowerCase()];if(v!=null)return numFill(v,nums)}
 if(d<2){for(const[re,names,out]of HI_P){const m=re.exec(s);if(m)return out.replace(/\{([a-z]\w*)\}/gi,(x,n)=>{const i=names.indexOf(n);return i<0?x:trList(m[i+1],d+1)})}
  if(s.includes(' · ')){let hit=false;const parts=s.split(' · ').map(p=>{const r=trCore(p,d+1);if(r!=null)hit=true;return r??p});if(hit)return parts.join(' · ')}}
 return null}
function T(s){if(S.lang!=='hi'||s==null)return s;s=String(s);if(!/[A-Za-z]/.test(s))return s;hiPrep();
 const a=/^\s*/.exec(s)[0],z=/\s*$/.exec(s)[0],t=s.trim();let r=trCore(t);
 if(r==null){const m=/^([·•:“”"‘’()\-–—✓♡\s]*)([\s\S]*?)([·•:“”"‘’()\-–—✓♡\s]*)$/.exec(t);if(m&&m[2]&&m[2]!==t){const c=trCore(m[2]);if(c!=null)r=m[1]+c+m[3]}}
 return r==null?s:a+r.replace(/\{\{([^|}]*)\|([^}]*)\}\}/g,(x,m,f)=>S.gender==='m'?m:f)+z}
const NOTR='[data-notr],script,style,textarea,.txt,.entry .txt';
function trText(n){const p=n.parentElement;if(!p||p.closest(NOTR))return;const v=n.nodeValue;if(!v||!/[A-Za-z]/.test(v))return;const r=T(v);if(r!==v)n.nodeValue=r}
function trAttrs(el){for(const a of['placeholder','aria-label','title']){const v=el.getAttribute&&el.getAttribute(a);if(v&&/[A-Za-z]/.test(v)){const r=T(v);if(r!==v)el.setAttribute(a,r)}}}
function trNode(root){if(S.lang!=='hi'||!root)return;if(root.nodeType===3){trText(root);return}if(root.nodeType!==1)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const list=[];while(w.nextNode())list.push(w.currentNode);list.forEach(trText);
 if(!root.closest(NOTR)){trAttrs(root);root.querySelectorAll('[placeholder],[aria-label]').forEach(e=>{if(!e.closest(NOTR))trAttrs(e)})}}
function applyLang(){document.documentElement.lang=S.lang==='hi'?'hi':'en';const app=$('#app');if(app)app.dataset.lang=S.lang;document.body.dataset.lang=S.lang}
try{new MutationObserver(ms=>{if(S.lang!=='hi')return;for(const m of ms){if(m.type==='childList')m.addedNodes.forEach(trNode);else if(m.type==='characterData')trText(m.target);else if(m.type==='attributes')trAttrs(m.target)}})
 .observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label']})}catch(e){}

/* ================= COMPONENTS ================= */
const C={
  PrimaryButton:(label,a,v='',extra='')=>`<button class="btn btn-primary btn-block" data-a="${a}" data-v="${v}" ${extra}>${label}</button>`,
  SecondaryButton:(label,a,v='',extra='')=>`<button class="btn btn-secondary btn-block" data-a="${a}" data-v="${v}" ${extra}>${label}</button>`,
  TopHeader:(title,{back=true,right=''}={})=>`<header class="top">${back?`<button class="iconbtn" data-a="back" aria-label="Back">${svg('back','',2)}</button>`:'<span></span>'}<h1>${title}</h1><div style="display:flex;justify-content:flex-end">${right}</div></header>`,
  SectionHeader:(t,right='')=>`<div class="section-h"><h2>${t}</h2>${right}</div>`,
  PremiumBadge:()=>`<span class="pbadge">${svg('crown','',2)}Premium</span>`,
  Chip:(label,a,v,on)=>`<button class="chip" data-a="${a}" data-v="${v}" aria-pressed="${on}">${label}</button>`,
  Toggle:(a,v,on,label)=>`<button class="tgl" role="switch" aria-checked="${on}" aria-label="${esc(label)}" data-a="${a}" data-v="${v}"></button>`,
  CircularPlayButton:(a,v,label,solid=false)=>`<button class="cplay ${solid?'solid':''}" data-a="${a}" data-v="${v}" aria-label="${esc(label)}">${svg('play')}</button>`,
  ProgressIndicator:(n,total)=>`<div class="jdots" role="img" aria-label="${n} of ${total}">${Array.from({length:total},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')}</div>`,
  MeditationCard:m=>{const lock=!canUse(m),p=S.prog[m.id]||0,fav=S.favs.includes(m.id);
    return `<div class="mcard"><button class="row grow" data-a="med" data-v="${m.id}" style="border:0;background:none;padding:0;text-align:left;gap:14px">
      <span class="thumb"><img src="${img(m.img)}" alt="" loading="lazy"${m.pos?` style="object-position:${m.pos}"`:''}>${lock?`<span class="lock">${svg('lock','',2.2)}</span>`:''}</span>
      <span class="grow"><h3>${m.title}</h3><span class="meta">${m.isNew?'<span class="pbadge" style="background:var(--sage-soft);color:var(--botanical)">New</span>':''}${m.min} min · ${m.tag}${lock?' '+C.PremiumBadge():''}${fav?`<span style="color:var(--rose);display:inline-flex" aria-label="Favourite">${svg('heartFill')}</span>`.replace('<svg','<svg width="14" height="14"'):''}</span>
      ${p>.02?`<span class="mbar" aria-label="${Math.round(p*100)}% listened"><i style="width:${Math.min(100,p*100)}%"></i></span>`:''}</span></button>
      ${C.CircularPlayButton('med',m.id,'Play '+m.title)}</div>`},
  CategoryCard:s=>`<button class="ccard" data-a="go" data-v="situation" data-p="${s.id}"><img src="${img(s.img)}" alt="" loading="lazy"><span>${s.title}</span></button>`,
  MantraCard:()=>`<button class="today" data-a="med" data-v="mantra"><img src="${img('lotusicon')}" alt=""><span class="grow"><span class="h-md" style="display:block;font-size:1.3rem">Today’s Practice</span><span class="small muted" style="display:block">Return to Peace</span><span class="small" style="display:block;margin-top:2px">5 min · <b style="color:var(--botanical)">${(S.prog.mantra||0)>.02&&(S.prog.mantra||0)<.98?'Continue':'Start Now'}</b></span></span><span class="cplay solid" aria-hidden="true">${svg('play')}</span></button>`,
  PromptCard:(p,on=false)=>{const lock=!p.free&&!S.premium;return `<button class="prompt" data-a="prompt" data-v="${p.id}" aria-pressed="${on}"><span class="pi" style="background:${p.c};color:${p.k}">${svg(p.i)}</span><span class="grow">${p.t}</span>${lock?C.PremiumBadge():svg('chev','chev')}</button>`},
  JournalCard:e=>`<article class="card flat entry" data-id="${e.id}"><div class="row between xs muted"><span>${new Date(e.ts).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}</span><span class="del"><button class="link xs" data-a="delask" data-v="${e.id}" style="color:var(--muted)">Delete</button></span></div><p class="small" style="color:var(--botanical);font-weight:600">${esc(e.ptext||PROMPT[e.prompt]?.t||'')}</p><p class="txt">${esc(e.text)}</p></article>`,
  ProgressCard:(title,body)=>`<section class="card">${title?`<h3 class="h-sm" style="margin-bottom:10px">${title}</h3>`:''}${body}</section>`,
  Modal:(title,body)=>{closeSheet();const w=document.createElement('div');w.className='scrim';w.innerHTML=`<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="grab"></div><div class="row between" style="margin-bottom:14px"><h2 class="h-md">${title}</h2><button class="iconbtn" data-a="closesheet" aria-label="Close">${svg('close','',2)}</button></div>${body}</div>`;
    w.addEventListener('click',e=>{if(e.target===w)closeSheet()});document.body.appendChild(w);return w.querySelector('.sheet')},
  BottomNavigation:cur=>[['home','Home','home'],['meditations','Meditations','medit'],['journal','Journal','journal'],['progress','Progress','progress'],['more','More','more']]
    .map(([n,l,i])=>`<button data-a="tab" data-v="${n}" ${cur===n?'aria-current="page"':''}>${svg(i)}${l}</button>`).join('')
};
function closeSheet(){document.querySelectorAll('.scrim').forEach(s=>s.remove())}

/* ================= ROUTER ================= */
const TABS=['home','meditations','journal','progress','more'];
let stack=[{n:S.onboarded?'home':'splash',p:null}];
let UI={chip:'all',q:'',searchOpen:false,jDate:dk(),jPrompt:'release',range:'week',favTab:'med',affCat:'all',affIdx:0,affCount:0};
function go(n,p=null){stack.push({n,p});render()}
function back(){if(stack.length>1)stack.pop();else stack=[{n:'home'}];render()}
function tab(n){stack=[{n,p:null}];render()}
function render(keepScroll=false){
  const {n,p}=stack[stack.length-1];const v=$('#view');const sc=scrollY;
  const full=['splash','onb2','onb3','onb4','onbname','premium'].includes(n);
  v.className='view'+(full?' full':'')+(TABS.includes(n)?'':' nonav');
  v.innerHTML=(SCREENS[n]||SCREENS.home)(p);
  const navOn=!['splash','onb2','onb3','onb4','onbname','premium'].includes(n);
  const nav=$('#nav');nav.hidden=!navOn;
  const tabCur=TABS.includes(n)?n:(stack.find(s=>TABS.includes(s.n))||{}).n;
  nav.innerHTML=C.BottomNavigation(tabCur);
  if(n==='premium'||!TABS.includes(n)&&['situation'].includes(n))v.classList.add('nonav');
  $('#app').dataset.theme=S.theme;applyLang();
  AFTER[n]?.(p);
  if(keepScroll)scrollTo(0,sc);else scrollTo(0,0);
}
const rerender=()=>render(true);

/* ================= SCREENS ================= */
const greet=()=>{const h=new Date().getHours();return h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening'};
const initials=()=>S.name?esc(S.name.trim().charAt(0).toUpperCase()):svg('user','',1.3);
const onbDots=i=>`<div class="dots" aria-label="Step ${i+1} of 3">${[0,1,2].map(k=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>`;
const SCREENS={
splash:()=>`<section class="onb" style="background:#5F7F93"><div class="bg" style="background-image:url(${img('splash')})"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,244,232,.35) 0%,rgba(255,244,232,0) 45%)"></div>
  <div style="position:relative;z-index:2;padding:calc(12vh + env(safe-area-inset-top,0px)) 24px 0;text-align:center;color:#1F2A24">
    <div style="color:#2D3830">${LOTUS_MARK}</div>
    <h1 class="h-xl" style="font-size:clamp(2.6rem,12vw,3.4rem);margin-top:8px">Ho’oponopono</h1>
    <p style="font-size:1.12rem;margin-top:8px;font-weight:500">Heal · Forgive · Release · Love</p>
    <p class="small" style="margin-top:22px;opacity:.85">A gentle journey back to yourself</p></div>
  <div style="position:relative;z-index:2;margin-top:auto;padding:0 24px calc(34px + env(safe-area-inset-bottom,0px))">
    <div class="row" data-notr style="justify-content:center;margin-bottom:14px;gap:8px"><button class="chip" data-a="setlang" data-v="en" aria-pressed="${S.lang==='en'}">English</button><button class="chip" data-a="setlang" data-v="hi" aria-pressed="${S.lang==='hi'}">हिन्दी</button></div>
    <button class="btn btn-cream btn-block" style="min-height:60px;font-size:1.05rem" data-a="go" data-v="onb2">Begin Your Healing Journey ${svg('chev','',2.4).replace('<svg','<svg width="18" height="18"')}</button></div></section>`,
onb2:()=>`<section class="onb" style="background:var(--cream)"><button class="skip" data-a="finishonb">Skip</button>
  <div style="position:relative;height:62vh;overflow:hidden"><div class="bg" style="background-image:url(${img('onb2')});background-position:center 20%"></div><div style="position:absolute;inset:auto 0 0 0;height:42%;background:linear-gradient(180deg,transparent,var(--cream))"></div></div>
  <div class="stack center" style="padding:0 28px;margin-top:-6vh;position:relative;gap:14px"><h1 class="h-xl">Find Peace<br>Within You</h1>
  <p class="muted" style="font-size:1.02rem;max-width:22em;margin:0 auto">Release the past, heal your heart and create a lighter, happier you with the power of Ho’oponopono.</p></div>
  <div class="stack" style="margin-top:auto;padding:24px 24px calc(28px + env(safe-area-inset-bottom,0px))">${onbDots(0)}${C.PrimaryButton('Next','go','onb3')}</div></section>`,
onb3:()=>`<section class="onb" style="background:var(--cream)"><button class="skip" data-a="finishonb">Skip</button>
  <img class="leafdeco" src="${img('leaves_tl')}" alt="" style="left:0;top:0;width:34%;max-width:170px">
  <img class="leafdeco" src="${img('leaves_bl')}" alt="" style="left:0;bottom:90px;width:42%;max-width:200px">
  <img class="leafdeco" src="${img('leaves_br')}" alt="" style="right:0;bottom:80px;width:40%;max-width:190px;opacity:.6">
  <div class="stack" style="position:relative;padding:calc(15vh + env(safe-area-inset-top,0px)) 28px 0;gap:30px">
   <h1 class="h-xl center">A Simple Practice,<br>Profound Transformation</h1>
   <ul class="stack" style="list-style:none;padding:0;margin:0 auto;gap:18px;max-width:320px;width:100%">
    ${[['b_heart','Let go of old patterns'],['b_lotus','Heal your emotions'],['b_leaf','Forgive yourself and others'],['b_sun','Invite love and abundance']].map(([i,t])=>`<li class="benefit"><img src="${img(i)}" alt=""><span style="font-size:1.05rem;font-weight:500">${t}</span></li>`).join('')}
   </ul></div>
  <div class="stack" style="position:relative;margin-top:auto;padding:24px 24px calc(28px + env(safe-area-inset-bottom,0px))">${onbDots(1)}${C.PrimaryButton('Next','go','onb4')}</div></section>`,
onb4:()=>`<section class="onb" style="background:#3C4A2E"><div class="bg" style="background-image:url(${img('onb4')})"></div>
  <div style="position:relative;z-index:2;margin:calc(26vh + env(safe-area-inset-top,0px)) 24px 0;padding:30px 22px;border-radius:26px;background:rgba(251,244,232,.9);backdrop-filter:blur(6px);box-shadow:0 20px 50px -20px rgba(0,0,0,.5);text-align:center">
   <p class="serif" style="font-size:clamp(1.7rem,7.4vw,2.1rem);font-weight:600;line-height:1.25">“I’m sorry<br>Please forgive me<br>Thank you<br>I love you”</p>
   <p style="margin-top:16px;font-size:1rem">Four simple phrases.<br>A deeper, more peaceful life.</p></div>
  <div class="stack" style="position:relative;z-index:2;margin-top:auto;padding:24px 24px calc(28px + env(safe-area-inset-bottom,0px))"><div style="filter:brightness(1.6)">${onbDots(2)}</div>${C.PrimaryButton('Get Started','finishonb')}</div></section>`,

onbname:()=>`<section class="onb" style="background:var(--cream)"><img class="leafdeco" src="${img('leaves_tl')}" alt="" style="left:0;top:0;width:34%;max-width:170px">
  <div class="stack" style="position:relative;padding:calc(13vh + env(safe-area-inset-top,0px)) 28px 0;gap:18px">
   <div style="color:var(--sage)">${LOTUS_MARK}</div>
   <h1 class="h-xl center">What should we call you?</h1>
   <p class="muted center" style="margin-top:-8px">Your name appears on your home screen. It stays on this phone.</p>
   <input id="onbnm" class="nameinput" maxlength="30" autocomplete="given-name" placeholder="Your first name" aria-label="Your first name" value="${esc(S.name)}" style="min-height:56px;font-size:1.15rem;text-align:center;background:var(--ivory)">
   <div><p class="small muted center" style="margin-bottom:8px">Language</p><div class="seg3" style="grid-template-columns:1fr 1fr" data-notr><button data-a="setlang" data-v="en" aria-pressed="${S.lang==='en'}">English</button><button data-a="setlang" data-v="hi" aria-pressed="${S.lang==='hi'}">हिन्दी</button></div></div>
  </div>
  <div class="stack" style="position:relative;margin-top:auto;padding:24px 24px calc(28px + env(safe-area-inset-bottom,0px));gap:8px">${C.PrimaryButton('Continue','onbnamego','1')}</div></section>`,

home:()=>{const q=QUOTES[(new Date().getDate())%QUOTES.length];const done=(S.practice[dk()]||[]).length;
 return `<div style="padding-top:calc(22px + env(safe-area-inset-top,0px))" class="row between">
   <div><h1 class="h-xl" style="font-size:2.1rem">${greet()}</h1><p class="h-lg" style="font-size:1.7rem;display:flex;align-items:center;gap:6px">${S.name?`<span data-notr>${esc(S.name)}</span><span style="color:var(--sage);display:inline-flex">${svg('leaf').replace('<svg','<svg width="22" height="22"')}</span>`:`<button class="link" data-a="editname" style="padding:0;font-family:var(--sans);font-size:1rem">Add your name</button>`}</p></div>
   <div class="stack" style="gap:8px;align-items:center"><button class="avatar" data-a="tab" data-v="more" aria-label="Profile">${initials()}</button><button class="iconbtn" data-a="go" data-v="reminders" aria-label="Reminders">${svg('bell')}</button></div></div>
  <div class="stack" style="margin-top:18px">
   <div class="botan"><img src="${img('botanical')}" alt=""><p>${q}</p></div>
   ${C.MantraCard()}
   <div class="tiles">
    <button class="tile" style="background:#F8DDD2" data-a="tab" data-v="meditations"><img src="${img('i_medit')}" alt="">Meditations</button>
    <button class="tile" style="background:#ECE6CC" data-a="go" data-v="daily"><img src="${img('i_daily')}" alt="">Daily Practice</button>
    <button class="tile" style="background:#F3E3C6" data-a="tab" data-v="journal"><img src="${img('i_journal')}" alt="">Journal</button>
    <button class="tile" style="background:#F1DCCB" data-a="go" data-v="affirmations"><img src="${img('i_affirm')}" alt="">Affirmations</button>
    <button class="tile" style="background:#E8E2CF" data-a="go" data-v="situations"><img src="${img('i_situ')}" alt="">Healing for Situations</button>
    <button class="tile" style="background:#FAE6C8" data-a="tab" data-v="progress"><img src="${img('i_progress')}" alt="">Progress</button>
   </div>
   <button class="card row" data-a="go" data-v="daily" style="border:0;text-align:left;width:100%">
    <span class="grow"><span class="h-sm" style="display:block">Today’s healing steps</span><span class="small muted">${done===5?'All five complete. Beautiful work.':`${done} of 5 complete`}</span>${C.ProgressIndicator(done,5)}</span>${svg('chev','chev')}</button>
  </div>`},

meditations:()=>{const q=UI.q.trim().toLowerCase();
 let list=MEDS.filter(m=>UI.chip==='all'||(UI.chip==='favorites'?S.favs.includes(m.id):m.cats.includes(UI.chip)));
 if(q)list=list.filter(m=>(m.title+' '+m.tag+' '+m.sub).toLowerCase().includes(q));
 return `${C.TopHeader('Meditations',{back:stack.length>1,right:`<button class="iconbtn" data-a="search" aria-label="Search" aria-expanded="${UI.searchOpen}">${svg(UI.searchOpen?'close':'search')}</button>`})}
  ${UI.searchOpen?`<label class="row card flat" style="padding:10px 14px;margin-bottom:14px"><span class="faint" style="display:flex">${svg('search').replace('<svg','<svg width="18" height="18"')}</span><input id="q" type="search" value="${esc(UI.q)}" placeholder="Search meditations" aria-label="Search meditations" style="border:0;background:none;outline:none;flex:1;min-width:0"></label>`:''}
  <div class="chips" role="toolbar" aria-label="Categories">${CHIPS.map(([v,l])=>C.Chip(l,'chip',v,UI.chip===v)).join('')}</div>
  <div class="mlist" id="mlist" style="margin-top:14px">${list.length?list.map(C.MeditationCard).join(''):`<div class="empty">${UI.chip==='favorites'&&!q?'Tap the heart in the player to save meditations here.':'No meditations match your search.'}</div>`}</div>`},

situations:()=>`${C.TopHeader('Healing for Situations')}<p class="muted small center" style="margin:-4px 0 18px">Choose what you would like to clean today.</p><div class="cgrid three">${SITS.map(C.CategoryCard).join('')}</div>`,

situation:id=>{const s=SIT[id]||SITS[0];const meds=MEDS.filter(m=>(m.sit||[]).includes(s.id));
 return `<div style="position:relative;margin:0 -20px;height:260px;overflow:hidden;border-radius:0 0 32px 32px">
   <img src="${img(s.img)}" alt="" style="width:100%;height:100%;object-fit:cover">
   <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),transparent 40%,rgba(20,24,20,.65))"></div>
   <button class="iconbtn soft" data-a="back" aria-label="Back" style="position:absolute;left:16px;top:calc(14px + env(safe-area-inset-top,0px))">${svg('back','',2)}</button>
   <h1 class="h-xl" style="position:absolute;left:22px;right:22px;bottom:20px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.4)">${s.title}</h1></div>
  <p class="muted" style="margin:18px 0 6px">${s.text}</p>
  <button class="card row" data-a="sitmantra" data-v="${s.id}" style="border:0;width:100%;text-align:left;margin-top:12px;background:linear-gradient(120deg,#FBE9EC,#F2EFE8)">
   <img src="${img('lotusicon')}" alt="" style="width:52px;height:52px"><span class="grow"><b style="display:block">Play Return to Peace for ${s.title.toLowerCase()}</b><span class="small muted">Free · 5 min</span></span><span class="cplay solid" aria-hidden="true">${svg('play')}</span></button>
  ${C.SectionHeader('Meditations')}<div class="mlist">${meds.map(C.MeditationCard).join('')}</div>`},

daily:()=>{const done=S.practice[dk()]||[];const jd=journeyDays();const next=PRACTICES.find(p=>!done.includes(p.id));
 return `${C.TopHeader('Daily Practice')}
  <div class="jhero"><img src="${img('journeyicon')}" alt=""><div class="grow"><h2 class="h-sm" style="font-size:1.05rem">Your 7-Day Healing Journey</h2><p class="small muted">Small steps, big transformation.</p>${C.ProgressIndicator(jd,7)}<p class="xs muted" style="margin-top:6px">${jd>=7?'Journey complete. Keep going at your own pace.':`Day ${Math.min(7,jd+1)} of 7 · a day counts when you complete 3 steps`}</p></div></div>
  <div class="stack" style="gap:10px;margin-top:16px">${PRACTICES.map(p=>{const d=done.includes(p.id);return `<button class="pitem" data-a="practice" data-v="${p.id}"><span class="num ${d?'done':''}">${d?svg('check','',2.6):p.n}</span><span class="grow"><b style="display:block">${p.t}</b><span class="small muted">${p.d}</span>${d?'<span class="xs" style="color:var(--sage);font-weight:700;display:block">Completed today</span>':''}</span>${svg('chev','chev')}</button>`}).join('')}</div>
  <div style="margin-top:22px">${next?C.PrimaryButton('Start Today’s Practice','practice',next.id):C.SecondaryButton('All done today · practise again','practice','morning')}</div>`},

breath:()=>`${C.TopHeader('Breath Awareness')}<p class="muted center">Breathe in for 4, hold for 4, breathe out for 6.</p>
  <div class="breath"><div class="ring"></div><div class="orb" id="orb"></div><span class="lbl" id="blbl" aria-live="polite">Ready</span></div>
  <p class="center small muted" id="bcount">5 slow breaths · about 1 minute</p>
  <div class="stack" style="margin-top:20px">${C.PrimaryButton('Begin','breathgo','','id="bgo"')}${C.SecondaryButton('Play the guided version','med','breath')}</div>`,

journal:()=>{const today=dk();const ents=S.journal.filter(e=>e.date===UI.jDate).sort((a,b)=>b.ts-a.ts);const p=PROMPT[UI.jPrompt]||PROMPTS[0];
 return `${C.TopHeader('Healing Journal',{back:stack.length>1})}
  <p class="muted center small" style="margin:-4px 8px 16px">Write your thoughts, release your emotions, and create a lighter, happier you.</p>
  <div class="datebar"><button class="iconbtn" data-a="jdate" data-v="-1" aria-label="Previous day">${svg('back','',2)}</button><b>${fmtDate(UI.jDate)}${UI.jDate===today?' · Today':''}</b><button class="iconbtn" data-a="jdate" data-v="1" aria-label="Next day" ${UI.jDate>=today?'disabled style="opacity:.3"':''}>${svg('chev','',2)}</button></div>
  <label for="jtext" class="h-sm" style="display:block;margin:18px 0 10px;font-size:1.05rem">${p.t}</label>
  <div style="position:relative"><textarea id="jtext" class="write" maxlength="500" placeholder="Write here…">${esc(S.draft)}</textarea><span class="xs faint" id="jcount" style="position:absolute;right:14px;bottom:12px">${S.draft.length}/500</span></div>
  <div style="margin-top:14px">${C.PrimaryButton('Save Entry','jsave')}</div>
  ${C.SectionHeader('Journal Prompts',`<button class="link small" data-a="allprompts">See All</button>`)}
  <div class="stack" style="gap:10px">${PROMPTS.slice(1,5).map(x=>C.PromptCard(x,x.id===UI.jPrompt)).join('')}</div>
  ${C.SectionHeader(UI.jDate===today?'Today’s entries':'Entries on this day')}
  <div class="stack" style="gap:10px">${ents.length?ents.map(C.JournalCard).join(''):`<div class="empty">No entries ${UI.jDate===today?'yet today':'on this day'}. Whatever you write stays on this device.</div>`}</div>`},

progress:()=>{const st=stats(UI.range);const streak=streakDays();const wk=weekDays();
 return `${C.TopHeader('Your Progress',{back:stack.length>1})}
  <div class="seg3" role="tablist">${[['week','This Week'],['month','This Month'],['all','All Time']].map(([v,l])=>`<button role="tab" data-a="range" data-v="${v}" aria-pressed="${UI.range===v}" aria-selected="${UI.range===v}">${l}</button>`).join('')}</div>
  <div class="stack" style="margin-top:16px">
   <div class="phero"><img src="${img('leafcircle')}" alt=""><div><p class="h-lg">${streak} ${streak===1?'Day':'Days'}</p><p class="h-sm">of Healing</p><p class="small" style="color:var(--botanical);margin-top:2px">${streak?'You’re doing amazing!':'Your first step starts today.'}</p></div></div>
   <div class="stats3"><div><b>${st.med}</b><span>Meditations</span></div><div><b>${st.jr}</b><span>Journal Entries</span></div><div><b>${st.sit}</b><span>Situations Cleaned</span></div></div>
   ${C.ProgressCard('This week',`<div class="week">${wk.map(d=>`<div><div class="d ${d.on?'on':''} ${d.today?'today':''}" role="img" aria-label="${d.full}: ${d.on?'practised':'no practice'}">${d.on?svg('check','',2.6):''}</div><span>${d.l}</span></div>`).join('')}</div>`)}
   ${C.ProgressCard('',`<div class="row between"><div><p class="h-md">${Math.round(st.mins)} min</p><p class="small muted">of meditation ${UI.range==='all'?'in total':UI.range==='week'?'this week':'this month'}</p></div><div style="text-align:right"><p class="h-md">${st.days}</p><p class="small muted">active days</p></div></div>`)}
   <section class="card ${S.premium?'':'locked'}"><div class="${S.premium?'':'blur'}"><div class="row between"><h3 class="h-sm">Insights · last 14 days</h3><span class="xs muted">minutes per day</span></div>${barsHtml()}</div>
    ${S.premium?'':`<div class="over"><div class="stack" style="gap:8px;align-items:center">${C.PremiumBadge()}<b>Advanced insights</b><button class="btn btn-primary btn-sm" data-a="go" data-v="premium">Unlock</button></div></div>`}</section>
   <div class="quote">“Healing is a journey,<br>and every small step matters.”<div style="color:#D96A8A;margin-top:8px;display:flex;justify-content:center">${svg('heartFill').replace('<svg','<svg width="22" height="22"')}</div></div>
  </div>`},

sounds:()=>`${C.TopHeader('Sounds & Theme')}
  ${C.SectionHeader('Background Sounds')}
  <div class="sgrid">${SOUNDS.map(([id,l,free])=>{const lock=!free&&!S.premium;return `<button class="scard" data-a="sound" data-v="${id}" aria-pressed="${S.sound===id}" aria-label="${l}${lock?' (Premium)':''}"><img src="${img('snd_'+id)}" alt="">${lock?C.PremiumBadge().replace('Premium',''):''}<span class="ck">${svg('check','',3)}</span><span>${l}</span></button>`}).join('')}</div>
  <div class="row" style="margin-top:14px"><span class="small muted" style="width:60px">Volume</span><input type="range" id="vol" min="0" max="100" value="${Math.round(S.vol*100)}" style="flex:1;accent-color:var(--sage)" aria-label="Background volume"><button class="link small" data-a="sound" data-v="none" aria-pressed="${S.sound==='none'}">${S.sound==='none'?'Silent ✓':'Silence'}</button></div>
  <p class="xs faint" style="margin-top:4px">Tap a scene to hear a short preview. It plays behind every meditation.</p>
  ${C.SectionHeader('Theme')}
  <div class="themes">${THEMES.map(([id,l,free])=>{const lock=!free&&!S.premium;return `<button data-a="theme" data-v="${id}" aria-pressed="${S.theme===id}"><img src="${img('theme_'+id)}" alt="">${l}${lock?`<span class="xs faint" style="display:flex;align-items:center;gap:3px">${svg('lock').replace('<svg','<svg width="12" height="12"')} Premium</span>`:''}</button>`}).join('')}</div>`,

reminders:()=>{const R=S.rem;const row=(k,t,sub,time=true)=>`<div class="rrow"><div class="grow"><b style="display:block">${t}</b>${time?`<input class="timein" type="time" data-rem="${k}" value="${R[k].t}" aria-label="${t} time">`:`<span class="small muted">${sub}</span>`}</div>${C.Toggle('rem',k,R[k].on,t)}</div>`;
 return `<div style="position:relative;min-height:90vh">${C.TopHeader('Reminders')}
  <div class="list">${row('mantra','Daily Mantra Reminder')}${row('journal','Journal Reminder')}${row('practice','Practice Reminder')}${row('evening','Evening Reflection')}${row('quotes','Motivational Quotes','Once a day',false)}</div>
  <div class="rprev" style="margin-top:18px"><img src="${img('lotuscircle')}" alt=""><div class="grow"><p class="small muted">A gentle reminder</p><p class="serif" style="font-size:1.2rem;font-weight:600;line-height:1.3">I’m sorry. Please forgive me.<br>Thank you. I love you.</p></div></div>
  <div style="margin-top:14px">${C.SecondaryButton(window.AndroidApp?'Send a test notification':'Preview a reminder','previewrem')}</div>
  ${window.AndroidApp&&!nativeCanExact()?`<div class="card flat" style="margin-top:12px"><p class="small">For reminders at the exact minute, allow “Alarms & reminders” for this app.</p><div style="margin-top:10px">${C.PrimaryButton('Allow exact times','askexact')}</div></div>`:''}
  ${window.AndroidApp?`<div class="card flat" style="margin-top:12px"><p class="small muted">If reminders still don’t arrive, open your phone’s settings for this app and switch on Autostart and “No restrictions” for battery. Some phones block reminders without it.</p><div style="margin-top:10px">${C.SecondaryButton('Open app settings','appsettings')}</div></div>`:''}
  ${window.AndroidApp?(nativeCanNotify()?'<p class="xs faint center" style="margin-top:12px">Reminders arrive as phone notifications at the times you choose, even when the app is closed.</p>':`<div class="card flat" style="margin-top:12px"><p class="small">Notifications are switched off for this app, so reminders can’t reach you.</p><div style="margin-top:10px">${C.PrimaryButton('Allow notifications','asknotify')}</div></div>`):'<p class="xs faint center" style="margin-top:12px">In the phone app, reminders arrive as notifications. In a browser you’ll see a gentle banner while this page is open.</p>'}
  <img class="leafdeco" src="${img('leaves_br')}" alt="" style="right:-20px;bottom:-30px;width:120px;opacity:.35"></div>`},

more:()=>`${C.TopHeader('More',{back:false})}
  <div class="card row" style="gap:16px"><span class="avatar lg">${initials()}</span><div class="grow"><p class="h-md" data-notr>${esc(S.name)||'—'}</p><p class="small muted">${S.premium?'Premium member':'Free plan'}</p></div><button class="btn btn-secondary btn-sm" data-a="editname">Edit</button></div>
  ${S.premium?'':`<button class="card row" data-a="go" data-v="premium" style="width:100%;border:0;margin-top:14px;text-align:left;background:linear-gradient(120deg,#F6E9CF,#FBE4E6)"><span style="color:#8A6420">${svg('crown').replace('<svg','<svg width="28" height="28"')}</span><span class="grow"><b style="display:block">Unlock Premium</b><span class="small muted">The full library, situations, sleep and more</span></span>${svg('chev','chev')}</button>`}
  <div class="list" style="margin-top:16px">${[
   ['heart','My Favorites','go','favorites','#F9E2E1','#C2567A'],['download','My Downloads','go','downloads','#E2ECF4','#4B6E91'],['journal','My Journal','tab','journal','#EDE6F5','#6E5AA0'],['progress','My Progress','tab','progress','#FCEBD3','#A7772B'],
   ['bell','Reminders','go','reminders','#ECE6CC','#6E6A35'],['sound','Sounds & Theme','go','sounds','#ECE6CC','#6E6A35'],['crown','Subscription','go','premium','#F6E9CF','#8A6420']
  ].map(([i,t,a,v,bg,fg])=>`<button class="li" data-a="${a}" data-v="${v}"><span class="ico" style="background:${bg};color:${fg}">${svg(i)}</span><span class="grow">${t}</span>${svg('chev','chev')}</button>`).join('')}</div>
  <div class="list" style="margin-top:16px">${[['shield','Privacy','privacy'],['doc','Terms','terms'],['help','Help & Support','help'],['info','About Ho’oponopono','about']].map(([i,t,v])=>`<button class="li" data-a="go" data-v="page" data-p="${v}"><span class="ico" style="background:var(--beige)">${svg(i)}</span><span class="grow">${t}</span>${svg('chev','chev')}</button>`).join('')}</div>
  <div class="list" style="margin-top:16px"><button class="li" data-a="replay"><span class="ico" style="background:var(--beige)">${svg('refresh')}</span><span class="grow">Replay the introduction</span></button><div class="li" id="resetrow"><span class="ico" style="background:#F9E2E1;color:#A33B3B">${svg('trash')}</span><span class="grow">Reset all data</span><button class="btn btn-secondary btn-sm" data-a="resetask">Reset</button></div></div>
  <p class="xs faint center" style="margin-top:18px">Ho’oponopono · Heal · Forgive · Release · Love</p>`,

favorites:()=>{const meds=MEDS.filter(m=>S.favs.includes(m.id));const affs=AFFS.filter(a=>S.affFavs.includes(a.id));
 return `${C.TopHeader('My Favorites')}<div class="seg3" style="grid-template-columns:1fr 1fr"><button data-a="favtab" data-v="med" aria-pressed="${UI.favTab==='med'}">Meditations</button><button data-a="favtab" data-v="aff" aria-pressed="${UI.favTab==='aff'}">Affirmations</button></div><div class="stack" style="margin-top:16px">
  ${UI.favTab==='med'?(meds.length?`<div class="mlist">${meds.map(C.MeditationCard).join('')}</div>`:`<div class="empty">Tap ♡ in the player to keep meditations here.<div style="margin-top:12px">${C.SecondaryButton('Browse meditations','tab','meditations')}</div></div>`)
  :(affs.length?affs.map(a=>`<div class="card row"><p class="serif grow" style="font-size:1.25rem;font-weight:600">${a.t}</p><button class="iconbtn" data-a="afffav" data-v="${a.id}" aria-label="Remove from favourites" style="color:var(--rose)">${svg('heartFill')}</button></div>`).join(''):`<div class="empty">Tap ♡ on an affirmation to keep it here.<div style="margin-top:12px">${C.SecondaryButton('Open affirmations','go','affirmations')}</div></div>`)}</div>`},

downloads:()=>{const meds=MEDS.filter(m=>S.saved.includes(m.id));
 return `${C.TopHeader('My Downloads')}<p class="small muted center" style="margin:-4px 0 16px">Meditations you save are kept ready for offline listening.</p>${meds.length?`<div class="mlist">${meds.map(C.MeditationCard).join('')}</div>`:`<div class="empty">Tap the download icon in the player to save a meditation here.<div style="margin-top:12px">${C.SecondaryButton('Browse meditations','tab','meditations')}</div></div>`}`},

affirmations:()=>{const list=AFFS.filter(a=>UI.affCat==='all'||a.c===UI.affCat);const a=list[UI.affIdx%list.length];const fav=S.affFavs.includes(a.id);
 return `${C.TopHeader('Affirmations',{right:`<button class="iconbtn" data-a="afffav" data-v="${a.id}" aria-label="${fav?'Remove from':'Add to'} favourites" style="color:${fav?'var(--rose)':'inherit'}">${svg(fav?'heartFill':'heart')}</button>`})}
  <div class="chips">${AFF_CATS.map(([v,l])=>C.Chip(l,'affcat',v,UI.affCat===v)).join('')}</div>
  <button class="aff" data-a="affsay" style="width:100%;border:0;margin-top:14px" aria-label="Say it, then tap. ${UI.affCount} of 3."><p aria-live="polite">${a.t}</p><span class="pips">${[0,1,2].map(i=>`<i class="${i<UI.affCount?'on':''}"></i>`).join('')}</span><span class="small muted" style="margin-top:10px">${UI.affCount>=3?'Beautiful. Let it settle.':'Say it slowly, then tap'}</span></button>
  <div class="row" style="margin-top:16px"><button class="btn btn-secondary" data-a="affnav" data-v="-1" aria-label="Previous">${svg('back','',2)}</button><span class="grow center small muted">${(UI.affIdx%list.length)+1} of ${list.length}</span><button class="btn btn-primary" data-a="affnav" data-v="1">Next ${svg('chev','',2).replace('<svg','<svg width="16" height="16"')}</button></div>`},

premium:()=>`<div class="prem-hero"><img src="${img('splash')}" alt=""><button class="iconbtn soft" data-a="back" aria-label="Close" style="position:absolute;left:16px;top:calc(14px + env(safe-area-inset-top,0px));z-index:2">${svg('close','',2)}</button></div>
  <div class="stack" style="padding:0 22px 40px;margin-top:-70px;position:relative;z-index:2">
   <div class="center">${C.PremiumBadge()}<h1 class="h-xl" style="margin-top:10px">Deepen your healing</h1><p class="muted" style="margin-top:6px">${S.premium?'Premium is active on this device. Thank you.':'Everything in the free app, plus the full library.'}</p></div>
   <div class="card stack" style="gap:12px">${['Full meditation library','Healing for every situation','Inner child & relationship healing','Deep sleep collection','Unlimited journal prompts','Advanced progress insights','Premium sounds & themes'].map(t=>`<div class="check-li">${svg('check','',2.4)}<span>${t}</span></div>`).join('')}</div>
   ${S.premium?C.SecondaryButton('Return to the free plan (testing)','downgrade'):`
   <div class="stack" style="gap:10px" role="radiogroup" aria-label="Plan">
    <button class="plan" role="radio" data-a="plan" data-v="yearly" aria-checked="${S.plan==='yearly'}"><span class="grow"><b style="display:block">Yearly</b><span class="small muted">Best value · 7-day free trial</span></span><span class="pbadge">Save most</span></button>
    <button class="plan" role="radio" data-a="plan" data-v="monthly" aria-checked="${S.plan==='monthly'}"><span class="grow"><b style="display:block">Monthly</b><span class="small muted">Cancel anytime</span></span></button></div>
   ${C.PrimaryButton('Unlock Premium','unlock')}
   <p class="xs faint center">Prices are shown by the App Store or Google Play at checkout. Payments aren’t connected in this preview, so this button unlocks Premium on this device for testing.</p>`}
   <p class="small muted center">The mantra, beginner meditations, journal and daily practice stay free, always.</p></div>`,

page:id=>{const pg=PAGES[id]||PAGES.about;return `${C.TopHeader(pg.title)}<div class="article" style="margin-top:6px">${pg.faq?`<div class="stack" style="gap:10px">${pg.faq.map(([q,a])=>`<details class="faq"><summary>${q}${svg('down','chev')}</summary><p>${a}</p></details>`).join('')}</div><p class="small muted" style="margin-top:18px">Still need help? Write to the app’s support address listed in the app store.</p>`:pg.html}</div>`}
};

/* ================= AFTER-RENDER HOOKS ================= */
const AFTER={
 meditations(){const q=$('#q');if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length);q.oninput=()=>{UI.q=q.value;const l=$('#mlist');const qq=UI.q.trim().toLowerCase();
   let list=MEDS.filter(m=>UI.chip==='all'||(UI.chip==='favorites'?S.favs.includes(m.id):m.cats.includes(UI.chip)));if(qq)list=list.filter(m=>(m.title+' '+m.tag+' '+m.sub).toLowerCase().includes(qq));
   l.innerHTML=list.length?list.map(C.MeditationCard).join(''):'<div class="empty">No meditations match your search.</div>'}}},
 journal(){const t=$('#jtext');t.oninput=()=>{S.draft=t.value;$('#jcount').textContent=t.value.length+'/500';save()}},
 sounds(){const v=$('#vol');v.oninput=()=>{S.vol=v.value/100;save();AMB.setVol(S.vol)}},
 reminders(){document.querySelectorAll('[data-rem]').forEach(i=>i.onchange=()=>{S.rem[i.dataset.rem].t=i.value;save();remSync();toast('Reminder time saved')})},
 breath(){BR.reset()},
};

/* ================= DATA HELPERS ================= */
function activityDays(){const s=new Set();S.sessions.forEach(x=>s.add(x.date));S.journal.forEach(x=>s.add(x.date));Object.entries(S.practice).forEach(([d,a])=>{if(a.length)s.add(d)});return s}
function streakDays(){const s=activityDays();let n=0;const d=new Date();if(!s.has(dk(d)))d.setDate(d.getDate()-1);while(s.has(dk(d))){n++;d.setDate(d.getDate()-1)}return n}
function rangeStart(r){const d=new Date();d.setHours(0,0,0,0);if(r==='week'){const k=(d.getDay()+6)%7;d.setDate(d.getDate()-k);return dk(d)}if(r==='month'){d.setDate(1);return dk(d)}return '0000'}
function stats(r){const from=rangeStart(r);const ses=S.sessions.filter(x=>x.date>=from);const days=[...activityDays()].filter(d=>d>=from).length;
 return{med:ses.length,jr:S.journal.filter(x=>x.date>=from).length,sit:new Set(ses.map(x=>x.sit).filter(Boolean)).size,mins:ses.reduce((a,x)=>a+x.secs/60,0),days}}
function weekDays(){const s=activityDays();const d=new Date();const k=(d.getDay()+6)%7;d.setDate(d.getDate()-k);const today=dk();
 return['M','T','W','T','F','S','S'].map((l,i)=>{const x=new Date(d);x.setDate(d.getDate()+i);const key=dk(x);if(S.lang==='hi')try{l=x.toLocaleDateString('hi-IN',{weekday:'narrow'})}catch(e){}return{l,on:s.has(key),today:key===today,full:x.toLocaleDateString('en-GB',{weekday:'long'})}})}
function barsHtml(){const out=[];const d=new Date();d.setDate(d.getDate()-13);let mx=1;const vals=[];
 for(let i=0;i<14;i++){const key=dk(d);const m=S.sessions.filter(x=>x.date===key).reduce((a,x)=>a+x.secs/60,0);vals.push(m);mx=Math.max(mx,m);d.setDate(d.getDate()+1)}
 const demo=!S.premium&&vals.every(v=>!v);const v2=demo?[3,5,0,8,6,10,4,0,7,9,5,12,8,6]:vals;const m2=demo?12:mx;
 return `<div class="bars" aria-label="Minutes per day">${v2.map(v=>`<i class="${v?'':'z'}" style="height:${Math.max(3,v/m2*100)}%"></i>`).join('')}</div><div class="row between xs faint"><span>2 weeks ago</span><span>Today</span></div>`}
function journeyDays(){return Object.values(S.practice).filter(a=>a.length>=3).length}
function markPractice(id){const k=dk();const a=S.practice[k]||(S.practice[k]=[]);if(!a.includes(id)){a.push(id);save();const p=PRACTICES.find(x=>x.id===id);toast(`${p?p.t:'Step'} complete ✓`)}}
function logSession(m,secs){S.sessions.push({id:m.id,date:dk(),secs:Math.round(secs),sit:(m.sit||[])[0]||P.sit||null});save()}

/* ================= AMBIENT AUDIO (Web Audio) ================= */
const AMB=(()=>{let ctx,master,nodes=[],timers=[],noise={};
 function ensure(){if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;ctx=new AC();master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);mkNoise()}if(ctx.state==='suspended')ctx.resume();return ctx}
 function mkNoise(){const n=ctx.sampleRate*4;const w=ctx.createBuffer(1,n,ctx.sampleRate),p=ctx.createBuffer(1,n,ctx.sampleRate),b=ctx.createBuffer(1,n,ctx.sampleRate);
  const W=w.getChannelData(0),Pk=p.getChannelData(0),B=b.getChannelData(0);let b0=0,b1=0,b2=0,lb=0;
  for(let i=0;i<n;i++){const x=Math.random()*2-1;W[i]=x*.5;b0=.99765*b0+x*.099;b1=.963*b1+x*.2965;b2=.57*b2+x*1.0526;Pk[i]=(b0+b1+b2+x*.1848)*.11;lb=(lb+.02*x)/1.02;B[i]=lb*3.2}
  noise={white:w,pink:p,brown:b}}
 function src(kind){const s=ctx.createBufferSource();s.buffer=noise[kind];s.loop=true;s.start();nodes.push(s);return s}
 function filt(type,f,q=.7){const x=ctx.createBiquadFilter();x.type=type;x.frequency.value=f;x.Q.value=q;return x}
 function gain(v){const g=ctx.createGain();g.gain.value=v;return g}
 function lfo(target,rate,depth){const o=ctx.createOscillator();o.frequency.value=rate;const g=gain(depth);o.connect(g);g.connect(target);o.start();nodes.push(o)}
 function chain(...xs){for(let i=0;i<xs.length-1;i++)xs[i].connect(xs[i+1]);return xs[xs.length-1]}
 function bird(){const t=ctx.currentTime;const g=gain(0);g.connect(master);const o=ctx.createOscillator();o.type='sine';o.connect(g);const f=2400+Math.random()*1800;
  for(let k=0;k<3;k++){const s=t+k*.16;o.frequency.setValueAtTime(f,s);o.frequency.exponentialRampToValueAtTime(f*1.35,s+.09);g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(.035,s+.02);g.gain.linearRampToValueAtTime(0,s+.11)}
  o.start(t);o.stop(t+.6)}
 function bell(){const t=ctx.currentTime;const base=[392,440,523.25][Math.floor(Math.random()*3)];[[1,.08],[2.76,.035],[5.4,.018],[8.93,.008]].forEach(([r,a])=>{const o=ctx.createOscillator();o.frequency.value=base*r;const g=gain(0);o.connect(g);g.connect(master);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(a,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+7/r**.35);o.start(t);o.stop(t+8)})}
 function every(fn,min,max){const tick=()=>{fn();timers.push(setTimeout(tick,min+Math.random()*(max-min)))};timers.push(setTimeout(tick,600+Math.random()*1500))}
 function scene(id){
  if(id==='ocean'){const g=gain(.35);chain(src('brown'),filt('lowpass',650),g,master);lfo(g.gain,.07,.3)}
  if(id==='rain'){chain(src('white'),filt('highpass',1400),filt('lowpass',8000),gain(.22),master);chain(src('pink'),filt('lowpass',500),gain(.25),master)}
  if(id==='forest'){const g=gain(.2);chain(src('pink'),filt('lowpass',1000),g,master);lfo(g.gain,.05,.12);every(bird,2500,6500)}
  if(id==='river'){const g=gain(.55);chain(src('pink'),filt('bandpass',750,.6),g,master);lfo(g.gain,.35,.12);chain(src('brown'),filt('lowpass',300),gain(.25),master)}
  if(id==='bells'){const o=ctx.createOscillator();o.frequency.value=110;chain(o,gain(.025),master);o.start();nodes.push(o);bell();every(bell,7000,11000)}
  if(id==='nature'){const f=filt('bandpass',500,.8);chain(src('pink'),f,gain(.5),master);lfo(f.frequency,.03,300);every(bird,3500,9000)}
 }
 function drone(hz){if(!hz)return;[[hz/2,.03],[hz,.014],[hz*1.5,.006]].forEach(([f,a])=>{const o=ctx.createOscillator();o.frequency.value=f;const g=gain(a);chain(o,g,master);lfo(g.gain,.09,a*.6);o.start();nodes.push(o)})}
 let gen=0;
 function stop(){timers.forEach(clearTimeout);timers=[];nodes.forEach(n=>{try{n.stop()}catch(e){}});nodes=[];if(master){master.disconnect();master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination)}}
 return{
  start(sc,hz,level=1){if(!ensure())return;gen++;stop();if(sc&&sc!=='none')scene(sc);drone(hz);master.gain.setTargetAtTime(S.vol*level,ctx.currentTime,.8);this.level=level},
  fade(on){if(!ctx||!master)return;master.gain.setTargetAtTime(on?S.vol*(this.level||1):0,ctx.currentTime,.4)},
  setVol(v){if(ctx&&master&&nodes.length)master.gain.setTargetAtTime(v*(this.level||1),ctx.currentTime,.2)},
  stop(){if(!ctx)return;master.gain.setTargetAtTime(0,ctx.currentTime,.3);const g=gen;setTimeout(()=>{if(g===gen)stop()},700)},
  chime(){if(S.bell===false||!ensure())return;const t=ctx.currentTime,base=[523.25,587.33,659.25][Math.floor(Math.random()*3)],out=ctx.createGain();out.gain.value=Math.max(.15,S.vol)*.9;out.connect(ctx.destination);
   [[1,.09],[2.76,.035],[5.4,.015]].forEach(([r,a])=>{const o=ctx.createOscillator();o.frequency.value=base*r;const g=ctx.createGain();o.connect(g);g.connect(out);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(a,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+4.5/Math.pow(r,.4));o.start(t);o.stop(t+5)})},
  preview(sc){this.start(sc,0,1);clearTimeout(this.pt);this.pt=setTimeout(()=>{if(!P.m)this.stop()},7000)}
 }})();

/* ================= VOICE ================= */
function pickVoice(){const vs=(window.speechSynthesis&&speechSynthesis.getVoices()||[]).filter(v=>/^en/i.test(v.lang));if(!vs.length)return null;
 const F=/female|samantha|victoria|zira|susan|karen|moira|tessa|serena|allison|ava|fiona|libby|sonia|aria|jenny|google uk english female/i,M=/\bmale\b|daniel|alex|fred|david|mark|arthur|aaron|tom|oliver|ryan|guy|google uk english male/i;
 if(S.voice==='female')return vs.find(v=>F.test(v.name)&&!/\bmale\b/i.test(v.name.replace(/female/i,'')))||vs[0];
 if(S.voice==='male')return vs.find(v=>M.test(v.name)&&!/female/i.test(v.name))||vs[0];
 return vs.find(v=>v.default)||vs[0]}
function speak(){return false}

/* ---------- playlist, sleep timer, lock-screen controls ---------- */
const TRK=()=>MEDS.filter(m=>m.audio&&canUse(m));
const repLabel=()=>P.repeat==='all'?'Repeat all':P.repeat?'Repeat one':'Repeat';
function sleepFire(){P.sleepEnd=0;if(P.playing)playerPause();const b=document.querySelector('[data-a="psleep"]');if(b)b.setAttribute('aria-pressed','false');updPlayer();toast('Sleep timer ended')}
function loadTrack(m){finishLog();P.playing=false;Object.assign(P,{m,t:0,idx:-1,listened:0,logged:false});
 const src=(m.audio===true?'return-to-peace':m.audio.replace(/\.\w+$/,''))+AEXT;if(audio.dataset.src!==src){audio.src=src;audio.dataset.src=src;audio.load()}
 P.dur=m.dur||299.6;if(P.sync)P.sync=null;closeSheet();drawPlayer();playerPlay()}
function trackStep(dir,byUser){const m=P.m;if(!m||!m.audio)return;const L=TRK();if(L.length<2)return;
 if(dir<0&&byUser&&P.t>4){P.t=0;audio.currentTime=0;P.idx=-1;updPlayer();mediaSync();return}
 const i=L.findIndex(x=>x.id===m.id);loadTrack(L[(i+dir+L.length)%L.length])}
const NAT=()=>window.AndroidApp||null;
function nativeCanNotify(){try{const n=NAT();return n&&n.canNotify?!!n.canNotify():true}catch(e){return true}}
function nativeCanExact(){try{const n=NAT();return n&&n.canExact?!!n.canExact():true}catch(e){return true}}
function nativeAskNotify(force){try{const n=NAT();if(n&&n.askNotify)n.askNotify(!!force)}catch(e){}}
function remSync(){const n=NAT();if(!n||!n.setReminders)return;try{n.setReminders(JSON.stringify(Object.entries(S.rem).map(([k,r])=>({id:k,on:!!(r.on&&S.onboarded),t:r.t||'09:00',title:T(REM_TEXT[k][0]),body:T(REM_TEXT[k][1])}))))}catch(e){}}
function mediaSync(){const m=P.m,n=NAT();
 try{if(n&&n.media){if(m)n.media(!!P.playing,String(T(m.title)),'Ho’oponopono',Math.round(P.t*1000),Math.round((P.dur||0)*1000),!!(m.audio&&TRK().length>1),String(m.img||''));else if(n.mediaStop)n.mediaStop()}}catch(e){}
 try{const ms=navigator.mediaSession;if(!ms)return;if(!m){ms.playbackState='none';return}
  if(ms.__id!==m.id){ms.__id=m.id;ms.metadata=new MediaMetadata({title:String(T(m.title)),artist:'Ho’oponopono',album:String(T(m.tag||''))});
   const h=(a,f)=>{try{ms.setActionHandler(a,f)}catch(e){}};h('play',()=>window.__media('play'));h('pause',()=>window.__media('pause'));
   const multi=m.audio&&TRK().length>1;h('previoustrack',multi?()=>window.__media('prev'):null);h('nexttrack',multi?()=>window.__media('next'):null);h('seekto',d=>window.__media('seek',(d.seekTime||0)*1000))}
  ms.playbackState=P.playing?'playing':'paused'}catch(e){}}
window.__media=function(cmd,arg){if(!P.m)return;
 if(cmd==='play'){if(!P.playing){if(P.t>=P.dur-.5)P.t=0;playerPlay()}}else if(cmd==='pause'){if(P.playing)playerPause()}else if(cmd==='toggle'){ACT.ptoggle()}
 else if(cmd==='next')trackStep(1,true);else if(cmd==='prev')trackStep(-1,true);
 else if(cmd==='seek'){P.t=Math.min(P.dur-1,Math.max(0,Number(arg)/1000||0));if(P.m.audio)audio.currentTime=P.t;P.idx=-1;updPlayer();mediaSync()}
 else if(cmd==='stop'){if(P.playing)playerPause()}};

/* ================= PLAYER ================= */
const P={m:null,t:0,dur:0,playing:false,speed:1,repeat:false,sleepEnd:0,idx:-1,listened:0,iv:null,sit:null,logged:false};
const audio=$('#mantraAudio');
const AEXT=audio.canPlayType('audio/ogg; codecs="opus"')?'.ogg':'.mp3';
function openMed(id,opts={}){const m=MED[id];if(!m)return;if(!canUse(m)){go('premium');toast(`${m.title} is part of Premium`);return}
 if(P.m&&P.min&&P.m.id===id&&!opts.loop){restorePlayer();return}
 if(P.m){finishLog();playerPause(true)}
 Object.assign(P,{m,t:0,idx:-1,listened:0,playing:false,sit:opts.sit||null,logged:false,speed:1,min:false,loopN:opts.loop||0,loopDone:0});miniDraw();
 if(m.audio){const src=(m.audio===true?'return-to-peace':m.audio.replace(/\.\w+$/,''))+AEXT;if(audio.dataset.src!==src){audio.src=src;audio.dataset.src=src;audio.load()}}
 P.dur=m.audio?((audio.readyState?audio.duration:0)||m.dur||299.6):m.min*60;
 const resume=S.prog[m.id]||0;if(!opts.loop&&resume>.03&&resume<.97)P.t=resume*P.dur;
 $('#player').hidden=false;document.body.style.overflow='hidden';drawPlayer();playerPlay();
 try{history.pushState({p:1},'')}catch(e){}}
function closePlayer(){if(!P.m)return;finishLog();playerPause(true);AMB.stop();try{speechSynthesis.cancel()}catch(e){}
 clearInterval(P.iv);P.iv=null;P.m=null;P.sleepEnd=0;P.min=false;P.loopN=0;mediaSync();miniDraw();if(!(R.s||MA.items.length)){$('#player').hidden=true;document.body.style.overflow=''}closeSheet();rerender()}
function finishLog(){const m=P.m;if(!m)return;const frac=Math.min(1,P.t/P.dur);S.prog[m.id]=frac>.97?1:frac;
 if(!P.logged&&(P.listened>=60||frac>.97)){P.logged=true;logSession(m,P.listened);if(m.id==='morning')markPractice('morning');if(m.id==='kindness')markPractice('kindness');if(m.id==='breath')markPractice('breath')}save()}
function playerPlay(){P.playing=true;P.last=Date.now();const m=P.m;
 if(m.audio){audio.currentTime=P.t;audio.playbackRate=P.speed;audio.volume=1;audio.play().catch(()=>{P.playing=false;toast('Tap play to start the music');updPlayer()});AMB.stop()}
 else AMB.start(S.sound,m.hz,1);
 clearInterval(P.iv);P.iv=setInterval(tick,250);updPlayer();mediaSync()}
function playerPause(silent){P.playing=false;if(P.m&&P.m.audio)audio.pause();AMB.fade(false);try{speechSynthesis.cancel()}catch(e){}if(!silent)updPlayer();mediaSync()}
function tick(){if(!P.m)return;const now=Date.now();const dt=Math.min(5,Math.max(0,(now-(P.last||now))/1000));P.last=now;
 if(P.playing){if(P.m.audio){P.t=audio.currentTime;if(audio.duration)P.dur=audio.duration}else P.t+=dt*P.speed;P.listened+=dt;
  if(P.listened>=60&&!P.logged)finishLog();
  if(!P.m.audio&&P.t>=P.dur){if(P.repeat){P.t=0;P.idx=-1}else{P.t=P.dur;finishLog();playerPause();toast('Session complete. Thank you.')}}
  if(P.sleepEnd&&Date.now()>=P.sleepEnd)sleepFire()}
 updPlayer()}
function lineIndex(){const m=P.m;if(!m.lines)return Math.floor(P.t/4)%4;if(m.cues){let k=0;for(let j=0;j<m.cues.length;j++)if(P.t>=m.cues[j])k=j;return k}return Math.min(m.lines.length-1,Math.floor(P.t/P.dur*m.lines.length))}
function updPlayer(){const m=P.m;if(!m)return;const f=Math.min(1,P.t/P.dur||0);
 const fill=$('#pfill'),knob=$('#pknob');if(fill){fill.style.width=f*100+'%';knob.style.left=f*100+'%'}
 const c=$('#pcur');if(c){c.textContent=fmtT(P.t);$('#pdur').textContent=fmtT(P.dur)}
 const pb=$('#pbig');if(pb){pb.innerHTML=svg(P.playing?'pause':'play');pb.setAttribute('aria-label',P.playing?'Pause':'Play')}
 const i=lineIndex();if(i!==P.idx){P.idx=i;
  if(!m.lines){document.querySelectorAll('.mantra span').forEach((s,k)=>s.classList.toggle('on',k===i));}
  else{const g=$('#guided');if(g){g.style.opacity=0;setTimeout(()=>{g.textContent=m.lines[i]||'';g.style.opacity=1},350)}if(P.playing&&!m.audio&&i>=0)AMB.chime()}}
 const sl=$('#sleeplbl');if(sl)sl.textContent=P.sleepEnd?Math.max(1,Math.ceil((P.sleepEnd-Date.now())/60000))+' min':'Sleep Timer';
 const sp=$('#speedlbl');if(sp)sp.textContent=P.speed+'x';
 const ll=$('#looplbl');if(ll){const x=P.loopN?`Round ${Math.min(P.loopN,P.loopDone+1)} of ${P.loopN}`:m.rounds?`Round ${Math.min(m.rounds,Math.floor(P.t/P.dur*m.rounds)+1)} of ${m.rounds}`:'';if(ll.dataset.x!==x){ll.dataset.x=x;ll.textContent=x}}miniUpd()}
function drawPlayer(){const m=P.m;const fav=S.favs.includes(m.id),sv=S.saved.includes(m.id);
 $('#stage').innerHTML=`<div class="pbg" style="background-image:url(${img(m.audio?'player':m.img)})${m.audio?'':';filter:saturate(.9) brightness(.8)'}"></div>${m.audio?'<div class="glow"></div>':''}<canvas class="dust" id="dust"></canvas>
  <div class="ptop"><button class="iconbtn" data-a="pclose" aria-label="Back">${svg('back','',2.2)}</button>
   <div class="row" style="gap:0"><button class="iconbtn ${sv?'on':''}" data-a="psave" aria-pressed="${sv}" aria-label="${sv?'Saved for offline':'Save for offline'}">${svg(sv?'downloaded':'download')}</button><button class="iconbtn ${fav?'on':''}" data-a="pfav" aria-pressed="${fav}" aria-label="${fav?'Remove from favourites':'Add to favourites'}">${svg(fav?'heartFill':'heart')}</button></div></div>
  <div class="ptitle"><h2>${m.title}</h2><p>${esc(m.sub)}${P.sit?' · '+esc(SIT[P.sit].title):''}</p><p id="looplbl" style="font-weight:700;color:#F4C98A;margin-top:6px"></p></div>
  ${m.lines?`<p class="guided" id="guided" aria-live="polite"${m.audio?' data-notr':''}></p>`:`<div class="mantra" aria-live="polite">${MANTRA.map(x=>`<span>${x}</span>`).join('')}</div>`}
  <div class="pctl"><div class="seek" id="seek" role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" aria-valuemax="100"><div class="track"></div><div class="fill" id="pfill"></div><div class="knob" id="pknob"></div></div>
   <div class="ptimes"><span id="pcur">00:00</span><span id="pdur">00:00</span></div>
   <div class="pmain ${m.audio&&TRK().length>1?'five':''}">${m.audio&&TRK().length>1?`<button class="trkbtn" data-a="ptrack" data-v="-1" aria-label="Previous song"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5.5v13L10 12z"/></svg></button>`:''}<button class="skipbtn" data-a="pskip" data-v="-15" aria-label="Back 15 seconds">${svg('rw','',1.8)}<b>15</b></button><button class="pbig" id="pbig" data-a="ptoggle" aria-label="Pause">${svg('pause')}</button><button class="skipbtn" data-a="pskip" data-v="15" aria-label="Forward 15 seconds">${svg('fw','',1.8)}<b>15</b></button>${m.audio&&TRK().length>1?`<button class="trkbtn" data-a="ptrack" data-v="1" aria-label="Next song"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5.5v13L14 12z"/></svg></button>`:''}</div>
   <div class="popts"><button data-a="prepeat" aria-pressed="${!!P.repeat}">${svg('repeat')}<span id="replbl">${repLabel()}</span></button><button data-a="pspeed" aria-label="Playback speed"><b id="speedlbl">1x</b>Speed</button><button data-a="psleep" aria-pressed="${!!P.sleepEnd}">${svg('timer')}<span id="sleeplbl">Sleep Timer</span></button>${m.audio?(m.lines?`<button data-a="plyrics">${svg('doc')}Lyrics</button>`:''):`<button data-a="pbgsheet">${svg('image')}Background</button>`}</div></div>`;
 dust();const sk=$('#seek');
 const seekTo=e=>{const r=sk.getBoundingClientRect();const f=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));P.t=f*P.dur;if(P.m.audio)audio.currentTime=P.t;updPlayer()};
 sk.onpointerdown=e=>{sk.setPointerCapture(e.pointerId);seekTo(e);sk.onpointermove=seekTo};sk.onpointerup=()=>{sk.onpointermove=null};
 sk.onkeydown=e=>{if(e.key==='ArrowRight')skip(15);if(e.key==='ArrowLeft')skip(-15)};
 P.idx=-1;updPlayer()}
function skip(s){P.t=Math.min(P.dur-1,Math.max(0,P.t+s));if(P.m.audio)audio.currentTime=P.t;P.idx=-1;updPlayer();mediaSync()}
function dust(){const cv=$('#dust');if(!cv||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=cv.getContext('2d');const dpr=devicePixelRatio||1;
 const W=cv.width=cv.clientWidth*dpr,H=cv.height=cv.clientHeight*dpr;const ps=Array.from({length:34},()=>({x:Math.random()*W,y:H*.35+Math.random()*H*.4,r:(Math.random()*1.6+.6)*dpr,v:(Math.random()*.25+.08)*dpr,a:Math.random()*6}));
 (function f(){if(!P.m||!cv.isConnected)return;c.clearRect(0,0,W,H);ps.forEach(p=>{p.y-=p.v;p.a+=.02;if(p.y<H*.2){p.y=H*.75;p.x=Math.random()*W}c.fillStyle=`rgba(255,215,160,${.25+Math.sin(p.a)*.2})`;c.beginPath();c.arc(p.x+Math.sin(p.a)*6,p.y,p.r,0,7);c.fill()});requestAnimationFrame(f)})()}
function sheetSleep(){const opts=[0,15,30,45,60,90];const cur=P.sleepEnd?Math.round((P.sleepEnd-Date.now())/60000):0;
 C.Modal('Sleep Timer',`<div class="stack" style="gap:8px">${opts.map(o=>`<button class="opt" data-a="setsleep" data-v="${o}" aria-pressed="${o===0?!P.sleepEnd:false}"><span class="radio"></span>${o?o+' minutes':'Off'}</button>`).join('')}</div>`)}
function sheetBg(){C.Modal('Background',`<div class="sgrid">${[['none','Silence',true],...SOUNDS].map(([id,l,free])=>{const lock=!free&&!S.premium;return `<button class="scard" data-a="bgpick" data-v="${id}" aria-pressed="${S.sound===id}" aria-label="${l}${lock?' (Premium)':''}" ${id==='none'?'style="background:linear-gradient(135deg,#E9E2D6,#D8CEBF)"':''}>${id==='none'?'':`<img src="${img('snd_'+id)}" alt="">`}${lock?C.PremiumBadge().replace('Premium',''):''}<span class="ck">${svg('check','',3)}</span><span ${id==='none'?'style="color:#2D3830"':''}>${l}</span></button>`}).join('')}</div>
  <div class="row" style="margin-top:14px"><span class="small muted" style="width:60px">Volume</span><input type="range" id="pvol" min="0" max="100" value="${Math.round(S.vol*100)}" style="flex:1;accent-color:var(--sage)" aria-label="Background volume"></div>`);
 const v=$('#pvol');v.oninput=()=>{S.vol=v.value/100;save();AMB.setVol(S.vol)}}

/* ================= BREATH ================= */
const BR={t:null,run:false,cyc:0,reset(){clearTimeout(this.t);this.run=false;this.cyc=0},
 start(){const orb=$('#orb'),lbl=$('#blbl'),cnt=$('#bcount'),btn=$('#bgo');if(!orb)return;this.run=true;btn.textContent='Pause';
  const seq=[['Breathe in',4000,1.45],['Hold',4000,1.45],['Breathe out',6000,1]];let i=0;
  const step=()=>{if(!this.run||!orb.isConnected)return;const[l,ms,sc]=seq[i];orb.style.transitionDuration=ms+'ms';orb.style.transform=`scale(${sc})`;lbl.textContent=l;
   if(i===0)cnt.textContent=`Breath ${this.cyc+1} of 5`;
   this.t=setTimeout(()=>{i++;if(i===3){i=0;this.cyc++;if(this.cyc>=5){this.run=false;lbl.textContent='Well done';orb.style.transform='scale(1)';cnt.textContent='5 breaths complete';btn.textContent='Breathe again';this.cyc=0;markPractice('breath');return}}step()},ms)};step()},
 pause(){this.run=false;clearTimeout(this.t);const b=$('#bgo');if(b)b.textContent='Resume';const l=$('#blbl');if(l)l.textContent='Paused'}};

/* ================= ACTIONS ================= */
const ACT={
 go:(v,el)=>go(v,el.dataset.p||null), back:()=>back(), tab:v=>tab(v),
 finishonb:()=>{S.onboarded=true;save();if(S.name||S.nameSet)tab('home');else{stack=[{n:'onbname',p:null}];render()}},
 onbnamego:v=>{const i=$('#onbnm');const nm=i?i.value.trim():'';if(v&&!nm){toast('Please enter a name');i&&i.focus();return}if(v&&nm)S.name=nm;S.nameSet=true;S.onboarded=true;save();tab('home');remSync();nativeAskNotify()},
 setlang:v=>{const i=$('#onbnm');if(i)S.name=i.value.trim();S.lang=v==='hi'?'hi':'en';save();closeSheet();render();remSync();toast(v==='hi'?'भाषा: हिन्दी':'Language: English')},
 replay:()=>{stack=[{n:'splash'}];render()},
 med:v=>openMed(v),
 sitmantra:v=>openMed('mantra',{sit:v}),
 chip:v=>{UI.chip=v;rerender()},
 search:()=>{UI.searchOpen=!UI.searchOpen;if(!UI.searchOpen)UI.q='';rerender()},
 practice:v=>{if(v==='morning')openMed('morning');else if(v==='kindness')openMed('kindness');else if(v==='breath')go('breath');
  else{UI.jPrompt=v==='gratitude'?'grateful':'forgive';UI.jDate=dk();UI.jFrom=v;go('journal')}},
 breathgo:()=>BR.run?BR.pause():BR.start(),
 jdate:v=>{const d=parseDk(UI.jDate);d.setDate(d.getDate()+Number(v));const k=dk(d);if(k>dk())return;UI.jDate=k;rerender()},
 prompt:v=>{const p=PROMPT[v];if(!p.free&&!S.premium){closeSheet();go('premium');toast('More prompts are part of Premium');return}closeSheet();UI.jPrompt=v;rerender();const t=$('#jtext');t.focus();t.scrollIntoView({behavior:'smooth',block:'center'})},
 allprompts:()=>C.Modal('Journal Prompts',`<div class="stack" style="gap:10px">${PROMPTS.map(p=>C.PromptCard(p,p.id===UI.jPrompt)).join('')}</div>`),
 jsave:()=>{const t=$('#jtext');const text=t.value.trim();if(!text){toast('Write a few words first');t.focus();return}
  S.journal.push({id:Date.now(),date:UI.jDate,ts:Date.now(),prompt:UI.jPrompt,text});S.draft='';save();
  if(UI.jDate===dk()){if(UI.jPrompt==='grateful')markPractice('gratitude');else if(UI.jPrompt==='forgive')markPractice('forgive');else toast('Saved. Thank you for showing up.')}else toast('Saved');
  rerender()},
 delask:(v,el)=>{el.closest('.del').innerHTML=`<span class="xs">Delete?</span> <button class="link xs" data-a="delyes" data-v="${v}" style="color:#A33B3B">Delete</button><button class="link xs" data-a="delno">Keep</button>`},
 delyes:v=>{S.journal=S.journal.filter(e=>String(e.id)!==String(v));save();rerender();toast('Entry deleted')},
 delno:()=>rerender(),
 range:v=>{UI.range=v;rerender()},
 sound:v=>{const s=SOUNDS.find(x=>x[0]===v);if(s&&!s[2]&&!S.premium){go('premium');toast(`${s[1]} is a Premium sound`);return}
  S.sound=S.sound===v&&v!=='none'?'none':v;save();rerender();if(S.sound!=='none'){AMB.preview(S.sound);toast(`${s?s[1]:''} selected · playing a preview`)}else{AMB.stop();toast('Background set to silence')}},
 voice:v=>{S.voice=v;save();rerender()},
 voiceon:()=>{S.voiceOn=!S.voiceOn;save();document.querySelectorAll('[data-a="voiceon"]').forEach(b=>b.setAttribute('aria-checked',S.voiceOn));if(S.voiceOn&&!window.speechSynthesis)toast('Spoken voice isn’t available in this browser')},
 testvoice:()=>{if(!speak('I’m sorry. Please forgive me. Thank you. I love you.'))toast('Spoken voice isn’t available in this browser')},
 theme:v=>{const t=THEMES.find(x=>x[0]===v);if(!t[2]&&!S.premium){go('premium');toast(`${t[1]} is a Premium theme`);return}S.theme=v;save();rerender()},
 rem:(v,el)=>{S.rem[v].on=!S.rem[v].on;save();el.setAttribute('aria-checked',S.rem[v].on);remSync();if(S.rem[v].on)nativeAskNotify();toast(S.rem[v].on?'Reminder on':'Reminder off')},
 asknotify:()=>{nativeAskNotify(true);setTimeout(rerender,1500)},
 previewrem:()=>{const n=NAT();if(n&&n.testNotify){try{n.testNotify(String(T('A gentle reminder')),String(T('I’m sorry. Please forgive me. Thank you. I love you.')))}catch(e){}toast('Test notification sent. Check the top of your screen.');if(!nativeCanNotify())nativeAskNotify(true)}else showBanner('A gentle reminder','I’m sorry. Please forgive me. Thank you. I love you.')},
 askexact:()=>{try{NAT().askExact()}catch(e){}},
 appsettings:()=>{try{NAT().openAppSettings()}catch(e){}},
 editname:()=>{const s=C.Modal('Your name',`<label class="small muted" for="nm">What should we call you?</label><input id="nm" class="nameinput" style="margin:8px 0 16px" value="${esc(S.name)}" maxlength="30">${C.PrimaryButton('Save','savename')}`);setTimeout(()=>s.querySelector('#nm').focus(),50)},
 savename:()=>{const v=$('#nm').value.trim();if(!v){toast('Please enter a name');return}S.name=v;S.nameSet=true;save();closeSheet();rerender();toast('Name saved')},
 resetask:()=>{$('#resetrow').innerHTML=`<span class="grow small">Erase journal, progress and settings on this device?</span><button class="btn btn-sm" style="background:#A33B3B;color:#fff" data-a="resetyes">Erase</button><button class="btn btn-secondary btn-sm" data-a="resetno">Keep</button>`},
 resetno:()=>rerender(),
 resetyes:()=>{const keep={lang:S.lang,gender:S.gender};try{localStorage.removeItem(KEY)}catch(e){}S=Object.assign(structuredClone(DEF),keep);save();remSync();stack=[{n:'splash'}];render();toast('All data erased')},
 favtab:v=>{UI.favTab=v;rerender()},
 afffav:v=>{const i=S.affFavs.indexOf(v);if(i>=0)S.affFavs.splice(i,1);else S.affFavs.push(v);save();rerender();toast(i>=0?'Removed from favourites':'Saved to favourites')},
 affcat:v=>{UI.affCat=v;UI.affIdx=0;UI.affCount=0;rerender()},
 affnav:v=>{const n=AFFS.filter(a=>UI.affCat==='all'||a.c===UI.affCat).length;UI.affIdx=(UI.affIdx+Number(v)+n)%n;UI.affCount=0;rerender()},
 affsay:()=>{if(UI.affCount<3)UI.affCount++;rerender()},
 plan:v=>{S.plan=v;save();rerender()},
 unlock:()=>{S.premium=true;save();back();toast('Premium unlocked on this device')},
 downgrade:()=>{S.premium=false;if(!THEMES.find(t=>t[0]===S.theme)[2])S.theme='light';const s=SOUNDS.find(x=>x[0]===S.sound);if(s&&!s[2])S.sound='ocean';save();rerender();toast('Back on the free plan')},
 closesheet:()=>closeSheet(),
 /* player */
 pclose:()=>{if(history.state&&history.state.p)history.back();else minimizePlayer()},
 ptoggle:()=>{if(P.playing)playerPause();else{if(P.t>=P.dur-.5)P.t=0;playerPlay()}},
 pskip:v=>skip(Number(v)),
 prepeat:(v,el)=>{const multi=P.m.audio&&TRK().length>1;P.repeat=!P.repeat?'one':(P.repeat==='one'&&multi?'all':false);el.setAttribute('aria-pressed',!!P.repeat);const l=$('#replbl');if(l)l.textContent=repLabel();toast(P.repeat==='all'?'Repeating all songs':P.repeat?'Repeat on':'Repeat off')},
 ptrack:v=>trackStep(Number(v),true),
 pspeed:()=>{const s=[1,1.25,1.5,.75];P.speed=s[(s.indexOf(P.speed)+1)%s.length];if(P.m.audio)audio.playbackRate=P.speed;updPlayer()},
 psleep:()=>sheetSleep(),
 setsleep:v=>{v=Number(v);P.sleepEnd=v?Date.now()+v*60000:0;closeSheet();const b=document.querySelector('[data-a="psleep"]');if(b)b.setAttribute('aria-pressed',!!v);updPlayer();toast(v?`Stopping in ${v} minutes`:'Sleep timer off')},
 pbgsheet:()=>sheetBg(),
 bgpick:v=>{const s=SOUNDS.find(x=>x[0]===v);if(s&&!s[2]&&!S.premium){R.s?closeReader():closePlayer();go('premium');toast(`${s[1]} is a Premium sound`);return}S.sound=v;save();closeSheet();if(R.s)AMB.start(S.sound,0,.8);else if(P.playing)AMB.start(S.sound,P.m.audio?0:P.m.hz,P.m.audio?.45:1);toast(v==='none'?'Background: silence':`Background: ${s[1]}`)},
 pfav:(v,el)=>{const id=P.m.id;const i=S.favs.indexOf(id);if(i>=0)S.favs.splice(i,1);else S.favs.push(id);save();const on=i<0;el.classList.toggle('on',on);el.setAttribute('aria-pressed',on);el.innerHTML=svg(on?'heartFill':'heart');el.setAttribute('aria-label',on?'Remove from favourites':'Add to favourites');toast(on?'Added to favourites':'Removed from favourites')},
 psave:(v,el)=>{const id=P.m.id;const i=S.saved.indexOf(id);if(i>=0)S.saved.splice(i,1);else S.saved.push(id);save();const on=i<0;el.classList.toggle('on',on);el.setAttribute('aria-pressed',on);el.innerHTML=svg(on?'downloaded':'download');toast(on?'Saved for offline listening':'Removed from downloads')}
};
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el||el.disabled)return;const f=ACT[el.dataset.a];if(f){e.preventDefault();f(el.dataset.v,el,e)}});
addEventListener('popstate',()=>{if(P.m&&!P.min)minimizePlayer();else if(R.s)closeReader()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(document.querySelector('.scrim'))closeSheet();else if(P.m&&!P.min)ACT.pclose();else if(R.s)closeReader();else if(MA.items.length)ACT.mclose()}
 if(e.key===' '&&P.m&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();ACT.ptoggle()}});
audio.addEventListener('loadedmetadata',()=>{if(P.m&&P.m.audio){P.dur=audio.duration;updPlayer()}});
audio.addEventListener('ended',()=>{if(!P.m)return;
 if(P.loopN){P.loopDone++;if(P.loopDone<P.loopN){P.t=0;P.idx=-1;audio.currentTime=0;audio.play();updPlayer();return}P.loopN=0;P.t=P.dur;finishLog();playerPause();toast('Mantra complete. Thank you.');return}
 if(P.repeat==='all'&&TRK().length>1)trackStep(1,false);else if(P.repeat){audio.currentTime=0;audio.play()}else{P.t=P.dur;finishLog();playerPause();toast('Session complete. Thank you.')}});
audio.addEventListener('pause',()=>{if(P.m&&P.m.audio&&P.playing&&!audio.ended&&!(audio.duration&&audio.currentTime>audio.duration-.4)){P.playing=false;updPlayer();mediaSync()}});
audio.addEventListener('play',()=>{if(P.m&&P.m.audio&&!P.playing){P.playing=true;P.last=Date.now();if(!P.iv)P.iv=setInterval(tick,250);updPlayer();mediaSync()}});
audio.addEventListener('timeupdate',()=>{if(P.m&&P.sleepEnd&&Date.now()>=P.sleepEnd)sleepFire()});

/* ================= IN-APP REMINDERS ================= */
function showBanner(t,b){document.querySelectorAll('.banner').forEach(x=>x.remove());const d=document.createElement('div');d.className='banner';d.setAttribute('role','status');
 d.innerHTML=`<img src="${img('lotuscircle')}" alt=""><div class="grow"><b style="display:block;font-size:.9rem">${t}</b><span class="small">${b}</span></div><button class="iconbtn" aria-label="Dismiss">${svg('close','',2)}</button>`;
 d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>d.remove(),5000)}
const REM_TEXT={mantra:['Daily mantra','I’m sorry. Please forgive me. Thank you. I love you.'],journal:['Journal','What are you ready to release today?'],practice:['Daily practice','Your healing steps are waiting.'],evening:['Evening reflection','Take a breath and clean the day.'],quotes:['A thought for today','Peace begins with me.']};
setInterval(()=>{if(!S.onboarded)return;const now=new Date();const hm=`${pad(now.getHours())}:${pad(now.getMinutes())}`;const day=dk();
 Object.entries(S.rem).forEach(([k,r])=>{if(r.on&&r.t===hm&&S.remShown[k]!==day){S.remShown[k]=day;save();showBanner(...REM_TEXT[k])}})},20000);

/* boot */
window.__ACT_KEYS=Object.keys(ACT);
applyLang();render();remSync();
