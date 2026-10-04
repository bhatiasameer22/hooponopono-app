/* ================= START YOUR MORNINGS (from the user's affirmation PDF; no author name kept) ================= */
const MORNING=[
 {id:'gratitude',title:'Gratitude',sub:'Start with thank you',icon:'sun',ink:'#A5691A',card:'linear-gradient(150deg,#FFF1DC,#F8D8B4)',bg:'linear-gradient(165deg,#FFF6E8 0%,#FBDDBE 55%,#F4C3A2 100%)',orb:'#FFD9A0',
  lines:['Thank you, universe!','Thank you, my dear self!','Thank you, Mother Nature, Mother Earth!','I am grateful for a wonderful new day.','I’m grateful for all that I have.','I’m grateful for all that is coming to me.','I see victory today. I see miracles today.','I see changes in myself. I see changes in my environment.','Thank you!']},
 {id:'empower',title:'Empowering Thoughts',sub:'Believe in yourself',icon:'star',ink:'#6A55A6',card:'linear-gradient(150deg,#F2EDFF,#DCD0F5)',bg:'linear-gradient(165deg,#F6F2FF 0%,#DFD5F7 55%,#C9B9EE 100%)',orb:'#E3D4FF',
  lines:['Every day and in every way, I am getting better and better.','I am always safe and protected.','Everything I need is drawn to me, or is already within me.','I believe in myself and all I have to offer the world.','I am wise, bold and brave in every situation.','I see victory today! My success is certain!','I have perfect timing. I am always in the right place at the right time.','I am successful at everything I do.','I believe in my limitless potential.','I am stepping into the most successful decade of my life.','The universe has big, beautiful plans for me. I claim it!','If plan A doesn’t work, plan B works wonderfully for me.','I am awakening to my greatness.','I attract all good things to me.','Universe, give me the wisdom, courage and guidance to move forward in the right direction.','I get to have it all: career, success, family, friends, wealth, health and love.','I am free to create the life I desire.','I am ready and excited for a new beginning in my life.']},
 {id:'health',title:'Health',sub:'A body that thrives',icon:'leaf',ink:'#3F7550',card:'linear-gradient(150deg,#EAF5EA,#CFE5CF)',bg:'linear-gradient(165deg,#F2FAF1 0%,#D6EAD5 55%,#B9DBBC 100%)',orb:'#D7F0D2',
  lines:['I have a strong and healthy body with strong immunity.','I am filled with abundant energy for everything in my day.','My mind is at peace.','I am mentally, physically and emotionally strong and resourceful.','My mind is clear and focused.','My body is balanced and thriving.','I choose to move and eat well every day.','Whatever I eat or drink today supports my perfect health.','The older I grow, the younger and healthier I feel.','My favourite clothes fit me beautifully.','The right health information flows into my life smoothly.','Every cell and every organ in my body thrives with life force.','I take loving care of my mental, emotional, physical and spiritual wellbeing.']},
 {id:'love',title:'Love',sub:'You are loved',icon:'heart',ink:'#B04A6E',card:'linear-gradient(150deg,#FFEEF2,#F7D0DB)',bg:'linear-gradient(165deg,#FFF3F6 0%,#F9D7E0 55%,#F0B6C8 100%)',orb:'#FFD3DF',
  lines:['I am worthy and deserving of true love right now.','I accept, cherish and approve of myself.','I am surrounded by love and prosperity.','I spread unconditional love around me, and it returns in abundance.','I am loved. I am loving. I am lovable.','I am respected. I am trustworthy. I am appreciated.','It is easy for others to trust me. It is easy for me to trust others.','I am worthy of a healthy, loving, respectful, fun and nurturing relationship.','I am worthy of a healthy, loving, respectful and nurturing family.','I release all my past negative patterns around love and relationships.','Right here, right now, with this breath, I clean the data in me that attracts painful relationships.','I am LOVE. I am PEACE. I am HARMONY.']},
 {id:'wealth',title:'Wealth',sub:'Open to receive',icon:'sparkle',ink:'#8A6516',card:'linear-gradient(150deg,#FFF6DD,#F2DFA8)',bg:'linear-gradient(165deg,#FFFAEC 0%,#F6E6B8 55%,#EACD8B 100%)',orb:'#FFE9A8',
  lines:['I am open to receive wealth.','What I lose always comes back to me in divine ways.','Money flows to me in expected and unexpected ways. I feel so relaxed.','The more I relax, the more easily I receive money.','Wealth pours into my life easily and effortlessly.','I always give and receive money with ease and grace.','I spend money with gratitude, love and compassion.','My income streams are increasing every month.','The world becomes a better place when I receive or spend money.','Whatever I do in life, I make money.','I have a unique skill and service that people love.','I attract ideal clients who are happy to pay me for the value I create.','My talents are worthy of being paid abundantly, with love.','I am powerful! I get closer to my goals every day!','I am rich, successful and happy.','Money is attracted to me easily and effortlessly.','My income is constantly increasing, and I prosper wherever I turn.','I am grateful to everyone who supports my financial bliss.']}
];
const MSEC=Object.fromEntries(MORNING.map(s=>[s.id,s]));
const GRAT_HAVE=['Air and water','Life itself','The sun, moon, stars and trees','My family and friends','My home, phone or car'];
const GRAT_COMING=['Healing (e.g. my sinus is clear)','Resolving a conflict with…','Repaying all my debts and loans','Receiving an amount of money','A successful meeting or new opportunity'];
const MONEY_REASONS=['Maintain my desired lifestyle','A lovely home for my family','Invest in learning and growing','Expand my business','Give my clients a smooth experience','Wear the clothes I love','Experience freedom','Travel the world','Gift my loved ones','Help others','Donate generously','Become an inspiration'];
const affText=id=>{if(id.startsWith('m:')){const[,s,i]=id.split(':');const l=MSEC[s]?.lines[+i];return typeof l==='string'?l:l&&l.t}return(AFFS.find(a=>a.id===id)||{}).t};

/* ---------- screens ---------- */
Object.assign(SCREENS,{
morning:()=>{const g=(S.grat||{})[dk()]||{have:[],coming:[],change:''};const doneToday=(S.mornDone||{})[dk()]||0;
 return `<div class="mhero"><img src="${img('splash')}" alt=""><canvas class="petals" id="petals"></canvas>
   <button class="iconbtn soft" data-a="back" aria-label="Back" style="position:absolute;left:16px;top:calc(14px + env(safe-area-inset-top,0px));z-index:3">${svg('back','',2)}</button>
   <div class="mhero-txt"><p class="xs" style="letter-spacing:.16em;font-weight:700">MORNING RITUAL</p><h1 class="h-xl">Start Your Mornings</h1><p>With gratitude, love and thoughts of positivity</p></div></div>
  <div class="stack stagger" style="margin-top:-30px;position:relative;z-index:2">
   <button class="btn btn-primary btn-block pulse" data-a="mplay" data-v="all" style="min-height:58px;font-size:1.05rem">${svg('play')} Begin morning ritual · ${MORNING.reduce((a,s)=>a+s.lines.length,0)} affirmations</button>
   ${doneToday?`<p class="small center" style="color:var(--botanical);font-weight:600">${svg('check','',2.6).replace('<svg','<svg width="16" height="16" style="vertical-align:-3px"')} ${doneToday} affirmations spoken today</p>`:''}
   ${C.SectionHeader('Choose an area')}
   <div class="msecs">${MORNING.map(s=>`<button class="msec" data-a="mplay" data-v="${s.id}" style="background:${s.card}"><span class="mi" style="color:${s.ink}">${svg(s.icon).replace('<svg','<svg width="26" height="26"')}</span><b>${s.title}</b><span class="xs" style="color:${s.ink}">${s.sub} · ${s.lines.length}</span></button>`).join('')}</div>
   ${C.SectionHeader('My gratitude today')}
   <section class="card stack" style="gap:12px">
    <p class="h-sm">Five things I’m grateful for that I already have</p>
    ${GRAT_HAVE.map((h,i)=>`<label class="gline"><span class="gn">${i+1}</span><input data-g="have" data-i="${i}" value="${esc(g.have[i]||'')}" placeholder="Thank you for… (${h})" aria-label="Grateful for ${i+1}"></label>`).join('')}
    <p class="h-sm" style="margin-top:8px">Five things I’m grateful for that are coming to me</p><p class="xs muted" style="margin-top:-8px">Write them as if they have already happened.</p>
    ${GRAT_COMING.map((h,i)=>`<label class="gline"><span class="gn" style="background:#F6E6C5;color:#8A6516">${i+1}</span><input data-g="coming" data-i="${i}" value="${esc(g.coming[i]||'')}" placeholder="Thank you for… (${h})" aria-label="Coming to me ${i+1}"></label>`).join('')}
    <label class="stack" style="gap:6px;margin-top:6px"><span class="h-sm">I see changes in…</span><input class="nameinput" data-g="change" value="${esc(g.change||'')}" placeholder="the situation or person that’s been disturbing me" style="background:var(--cream)"></label>
    <p class="xs faint" id="gsaved">Saved automatically for today.</p>
   </section>
   ${C.SectionHeader('Loving reasons to welcome money')}
   <p class="small muted" style="margin-top:-6px">Tap every reason that’s true for you. Money should never be why you compromise your needs.</p>
   <div style="display:flex;flex-wrap:wrap;gap:8px">${MONEY_REASONS.map(r=>`<button class="chip" data-a="mreason" data-v="${esc(r)}" aria-pressed="${(S.reasons||[]).includes(r)}">${r}</button>`).join('')}</div>
   <div class="card" style="background:linear-gradient(135deg,#FFF6DD,#FBEBD9)"><p class="h-sm">Arigato!</p><p class="small muted" style="margin-top:4px">Say “Arigato” (thank you in Japanese) every time you receive or spend money today. Money is neutral energy; it takes on the energy you give it.</p></div>
   <div class="card flat"><p class="h-sm">Wealth visualisation</p><p class="small muted" style="margin-top:4px">Close your eyes. See money flowing and raining over you. Picture yourself paying the rent and the bills, buying something you love, travelling, and giving generously to charity, and still feeling that money is overflowing in your life.</p></div>
  </div>`}
});
SCREENS.affirmations=SCREENS.morning;

/* home: hero carousel instead of a static card */
const _home2=SCREENS.home;
SCREENS.home=p=>{const q=QUOTES[(new Date().getDate())%QUOTES.length];
 const slides=[
  {img:'botanical',k:'',t:q,cls:'quote',a:'go',v:'morning',cta:''},
  {img:'player',k:'NEW MEDITATION · 5 MIN',t:'I Choose Peace',a:'med',v:'choosepeace',cta:'Listen'},
  {img:'splash',k:'MORNING RITUAL',t:'Start your day with gratitude',a:'go',v:'morning',cta:'Begin'},
  {img:'sit_relationships',k:'HO’OPONOPONO SCRIPT',t:'Heal a relationship today',a:'go',v:'script',p:'relationship',cta:'Start script'},
  {img:'onb4',k:'EVENING RELEASE',t:'Let it go in the burning bowl',a:'go',v:'bowl',cta:'Release'}];
 const car=`<div class="car" id="car" aria-roledescription="carousel"><div class="track" id="track">${slides.map((s,i)=>`<button class="slide ${s.cls||''} ${i===0?'on':''}" data-a="${s.a}" data-v="${s.v}" ${s.p?`data-p="${s.p}"`:''} aria-label="${esc(s.t)}"><img src="${img(s.img)}" alt="">${s.cls==='quote'?`<p class="qt">${s.t}</p>`:`<span class="shade"></span><span class="stxt"><span class="xs" style="letter-spacing:.14em;font-weight:700;opacity:.9">${s.k}</span><span class="serif" style="font-size:1.55rem;font-weight:600;line-height:1.15">${s.t}</span><span class="scta">${s.cta} ${svg('chev','',2.4).replace('<svg','<svg width="14" height="14"')}</span></span>`}</button>`).join('')}</div>
  <div class="cdots">${slides.map((s,i)=>`<button data-a="cdot" data-v="${i}" aria-label="Slide ${i+1}" class="${i===0?'on':''}"></button>`).join('')}</div></div>`;
 return _home2(p).replace(/<div class="botan">[\s\S]*?<\/div>/,car).replace('class="stack" style="margin-top:18px"','class="stack stagger" style="margin-top:18px"')};

/* progress: count-up numbers */
const _prog=SCREENS.progress;
SCREENS.progress=p=>_prog(p).replace(/<b>(\d+)<\/b>/g,'<b data-count="$1">0</b>');

/* favourites: include morning affirmations */
const _fav=SCREENS.favorites;
SCREENS.favorites=p=>{if(UI.favTab!=='aff')return _fav(p);const ids=S.affFavs.filter(affText);
 return `${C.TopHeader('My Favorites')}<div class="seg3" style="grid-template-columns:1fr 1fr"><button data-a="favtab" data-v="med" aria-pressed="false">Meditations</button><button data-a="favtab" data-v="aff" aria-pressed="true">Affirmations</button></div><div class="stack stagger" style="margin-top:16px">
  ${ids.length?ids.map(id=>`<div class="card row"><p class="serif grow" style="font-size:1.25rem;font-weight:600">${esc(affText(id))}</p><button class="iconbtn" data-a="affshare" data-v="${id}" aria-label="Share as a picture">${SHARE_SVG}</button><button class="iconbtn" data-a="afffav2" data-v="${id}" aria-label="Remove from favourites" style="color:var(--rose)">${svg('heartFill')}</button></div>`).join(''):`<div class="empty">Tap ♡ on any affirmation to keep it here.<div style="margin-top:12px">${C.SecondaryButton('Open morning affirmations','go','morning')}</div></div>`}</div>`};

/* ---------- after hooks ---------- */
let carTimer=null;
AFTER.home=()=>{const tr=$('#track');if(!tr)return;let i=0,paused=0;const n=tr.children.length;
 const set=k=>{i=k;[...tr.children].forEach((s,j)=>s.classList.toggle('on',j===k));document.querySelectorAll('.cdots button').forEach((d,j)=>d.classList.toggle('on',j===k))};
 tr.onscroll=()=>{const k=Math.round(tr.scrollLeft/tr.clientWidth);if(k!==i)set(k)};
 tr.onpointerdown=()=>{paused=Date.now()};
 clearInterval(carTimer);carTimer=setInterval(()=>{if(!tr.isConnected){clearInterval(carTimer);return}if(Date.now()-paused<9000||document.hidden)return;
  tr.scrollTo({left:((i+1)%n)*tr.clientWidth,behavior:'smooth'})},5200);
 ACT.cdot=v=>{paused=Date.now();tr.scrollTo({left:+v*tr.clientWidth,behavior:'smooth'})};window.__ACT_KEYS=Object.keys(ACT)};
AFTER.morning=()=>{petals($('#petals'),26);document.querySelectorAll('[data-g]').forEach(inp=>inp.oninput=()=>{S.grat=S.grat||{};const g=S.grat[dk()]||(S.grat[dk()]={have:[],coming:[],change:''});
  if(inp.dataset.g==='change')g.change=inp.value;else g[inp.dataset.g][+inp.dataset.i]=inp.value;
  const filled=g.have.filter(Boolean).length+g.coming.filter(Boolean).length;if(filled>=5&&!(S.practice[dk()]||[]).includes('gratitude'))markPractice('gratitude');
  S.rituals=S.rituals||[];if(filled&&!S.rituals.some(r=>r.type==='grat'&&r.date===dk()))S.rituals.push({type:'grat',date:dk()});save()})};
const _afterProg=AFTER.progress;
AFTER.progress=()=>{_afterProg&&_afterProg();document.querySelectorAll('[data-count]').forEach(el=>{const to=+el.dataset.count;const t0=performance.now();const d=900;
 const f=t=>{const k=Math.min(1,(t-t0)/d);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)})};

/* ---------- petals (gentle falling blossoms) ---------- */
function petals(cv,count=22,colors=['255,214,222','255,236,200','247,196,210','255,250,240']){if(!cv||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const c=cv.getContext('2d');const dpr=devicePixelRatio||1;const W=cv.width=cv.clientWidth*dpr,H=cv.height=cv.clientHeight*dpr;
 const ps=Array.from({length:count},()=>({x:Math.random()*W,y:Math.random()*H,s:(4+Math.random()*6)*dpr,v:(.25+Math.random()*.5)*dpr,r:Math.random()*6,vr:(Math.random()-.5)*.02,sw:Math.random()*6,col:colors[Math.random()*colors.length|0],a:.45+Math.random()*.45}));
 (function f(){if(!cv.isConnected)return;c.clearRect(0,0,W,H);ps.forEach(p=>{p.y+=p.v;p.sw+=.012;p.r+=p.vr;const x=p.x+Math.sin(p.sw)*18*dpr;if(p.y>H+20){p.y=-20;p.x=Math.random()*W}
  c.save();c.translate(x,p.y);c.rotate(p.r);c.fillStyle=`rgba(${p.col},${p.a})`;c.beginPath();c.ellipse(0,0,p.s,p.s*.55,0,0,7);c.fill();c.restore()});requestAnimationFrame(f)})()}

/* ---------- immersive affirmation carousel (player overlay) ---------- */
const MA={items:[],i:0,count:0,auto:null,mode:'all'};
function openMorning(sec){MA.mode=sec;MA.items=(sec==='all'?MORNING:[MSEC[sec]]).flatMap(s=>s.lines.map((t,k)=>({s:s.id,k,t:typeof t==='string'?t:t.t,h:typeof t==='string'?'':t.h})));MA.i=0;MA.count=0;clearInterval(MA.auto);MA.auto=null;
 $('#player').hidden=false;document.body.style.overflow='hidden';const s0=MSEC[MA.items[0].s];AMB.start(S.sound==='none'?'none':'nature',0,.5);
 $('#stage').innerHTML=`<div class="mstage" id="mstage" style="background:${s0.bg}"><div class="morb" id="morb" style="background:radial-gradient(circle,${s0.orb} 0%,transparent 68%)"></div><canvas class="petals" id="mpet"></canvas>
  <div class="ptop" style="color:var(--ink)"><button class="iconbtn" data-a="mclose" aria-label="Back" style="color:var(--ink)">${svg('back','',2.2)}</button><p class="small" id="msec" style="font-weight:700;letter-spacing:.08em"></p><span class="row" style="gap:0"><button class="iconbtn" data-a="mshare" aria-label="Share as a picture" style="color:var(--ink)">${SHARE_SVG}</button><button class="iconbtn" data-a="mfav" id="mfav" aria-label="Favourite" style="color:var(--ink)">${svg('heart')}</button></span></div>
  <div class="mprog"><i id="mbar"></i></div>
  <div class="mtrack" id="mtrack">${MA.items.map((it,j)=>`<div class="acard" data-j="${j}"><button class="mface" data-a="maff" aria-label="Affirm: ${esc(it.t)}">${it.h?`<span class="mkick">${esc(it.h)}</span>`:''}<span class="mtext" data-notr>${T(it.t).split(' ').map((w,wi)=>`<span style="animation-delay:${wi*70}ms">${esc(w)}</span>`).join(' ')}</span><span class="mpips"><i></i><i></i><i></i></span><span class="xs mhint">Say it with feeling, then tap</span></button></div>`).join('')}</div>
  <div class="mctl"><button class="skipbtn" data-a="mnav" data-v="-1" aria-label="Previous" style="color:var(--ink)">${svg('back','',2)}</button>
   <button class="mplay" data-a="mauto" id="mautob" aria-label="Auto-play">${svg('play')}</button>
   <button class="skipbtn" data-a="mnav" data-v="1" aria-label="Next" style="color:var(--ink)">${svg('chev','',2)}</button></div>
  <p class="xs center" id="mcount" style="position:relative;z-index:2;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px));opacity:.75"></p></div>`;
 petals($('#mpet'),30);const tr=$('#mtrack');tr.onscroll=()=>{const k=Math.round(tr.scrollLeft/tr.clientWidth);if(k!==MA.i){MA.i=k;MA.count=0;mUpd()}};mUpd();
 try{history.pushState({m:1},'')}catch(e){}}
function mUpd(){const it=MA.items[MA.i];if(!it)return;const s=MSEC[it.s];const st=$('#mstage');if(!st)return;st.style.background=s.bg;$('#morb').style.background=`radial-gradient(circle,${s.orb} 0%,transparent 68%)`;
 $('#msec').textContent=s.title.toUpperCase();$('#msec').style.color=s.ink;$('#mbar').style.width=((MA.i+1)/MA.items.length*100)+'%';$('#mbar').style.background=s.ink;
 $('#mcount').textContent=`${MA.i+1} of ${MA.items.length}`;
 document.querySelectorAll('.acard').forEach((c,j)=>{c.classList.toggle('on',j===MA.i);if(j===MA.i)c.querySelectorAll('.mpips i').forEach((p,k)=>p.classList.toggle('on',k<MA.count))});
 const id=`m:${it.s}:${it.k}`;const fav=S.affFavs.includes(id);const fb=$('#mfav');fb.innerHTML=svg(fav?'heartFill':'heart');fb.style.color=fav?'#C2567A':'var(--ink)';fb.setAttribute('aria-pressed',fav);
 const ab=$('#mautob');ab.innerHTML=svg(MA.auto?'pause':'play');ab.setAttribute('aria-label',MA.auto?'Pause auto-play':'Auto-play');
 if(MA.auto)AMB.chime()}
function mGo(k){const tr=$('#mtrack');if(!tr)return;k=Math.max(0,Math.min(MA.items.length-1,k));
 if(k===MA.items.length-1&&MA.i===k){mFinish();return}tr.scrollTo({left:k*tr.clientWidth,behavior:'smooth'})}
function mFinish(){clearInterval(MA.auto);MA.auto=null;const st=$('#mstage');if(!st)return;
 S.rituals=S.rituals||[];S.rituals.push({type:'morning',date:dk()});if(MA.mode==='all'||MA.mode==='gratitude')markPractice('gratitude');save();
 const done=document.createElement('div');done.className='mdone';done.innerHTML=`<img src="${img('lotuscircle')}" alt=""><h2 class="h-lg">Beautiful.</h2><p class="muted">${MA.mode==='all'?'Your morning ritual is complete.':MSEC[MA.mode].title+' complete.'} Carry this energy into your day.</p><button class="btn btn-primary" data-a="mclose2">Done</button>`;st.appendChild(done)}
function closeMorning(){clearInterval(MA.auto);MA.auto=null;AMB.stop();try{speechSynthesis.cancel()}catch(e){}MA.items=[];$('#player').hidden=true;document.body.style.overflow='';rerender()}
Object.assign(ACT,{
 mplay:v=>openMorning(v),
 mclose:()=>{if(history.state&&history.state.m)history.back();else closeMorning()},
 mclose2:()=>ACT.mclose(),
 maff:(v,el)=>{const card=el.closest('.acard');if(+card.dataset.j!==MA.i)return;MA.count=Math.min(3,MA.count+1);
  S.mornDone=S.mornDone||{};S.mornDone[dk()]=(S.mornDone[dk()]||0)+(MA.count===3?1:0);if(MA.count===3)save();
  const r=document.createElement('span');r.className='ripple';el.appendChild(r);setTimeout(()=>r.remove(),900);mUpd();
  if(MA.count>=3)setTimeout(()=>{if(MA.i===MA.items.length-1)mFinish();else mGo(MA.i+1)},900)},
 mnav:v=>{if(+v>0&&MA.i===MA.items.length-1){mFinish();return}mGo(MA.i+Number(v))},
 mauto:()=>{if(MA.auto){clearInterval(MA.auto);MA.auto=null}else{MA.auto=setInterval(()=>{if(MA.i>=MA.items.length-1){mFinish();return}mGo(MA.i+1)},6500)}mUpd()},
 mfav:()=>{const it=MA.items[MA.i];const id=`m:${it.s}:${it.k}`;const i=S.affFavs.indexOf(id);if(i>=0)S.affFavs.splice(i,1);else S.affFavs.push(id);save();mUpd();toast(i>=0?'Removed from favourites':'Saved to favourites')},
 afffav2:v=>{S.affFavs=S.affFavs.filter(x=>x!==v);save();rerender();toast('Removed from favourites')},
 mreason:(v,el)=>{S.reasons=S.reasons||[];const i=S.reasons.indexOf(v);if(i>=0)S.reasons.splice(i,1);else S.reasons.push(v);save();el.setAttribute('aria-pressed',i<0)}
});
addEventListener('popstate',()=>{if(MA.items.length)closeMorning()});
