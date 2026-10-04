/* ================= SCRIPTS (structure from the user's course files) ================= */
SCRIPTS.push(
 {id:'family',title:'Family',blurb:'Parents, siblings, in-laws, children',
  subj:{label:'Who in your family?',def:'my family',chips:['my mother','my father','my siblings','my in-laws','my children']},
  q:{def:'my family',feel:['hurt','resentment','guilt']},
  resp:['I take 100% responsibility for the patterns I carry from {n}. Something within me has attracted this, and I am ready to clean it.'],
  sorry:['I\'m sorry, {n}, for the old hurts I still hold.','I\'m sorry for comparing, blaming and keeping score.','I\'m sorry for the expectations I placed on you.','I\'m sorry for the times I did not listen.'],
  forgive:['Please forgive me, {n}, for carrying anger instead of understanding.','Please forgive me for every memory within me that keeps us apart.','Please forgive me for not accepting you as you are.'],
  thanks:['Thank you, {n}, for giving me roots and a home.','Thank you for every sacrifice I never saw.','Thank you for the lessons this family teaches me.'],
  love:['I love you, {n}.','I love each one of you, just as you are.'],
  letgo:['I release what was never mine to carry.','I let go. I let God.'],
  affirm:['Peace and love flow through my family.','We understand each other more each day.']},
 {id:'letgo',title:'Letting Go',blurb:'When something keeps replaying and won’t heal',
  subj:{label:'What are you letting go of?',def:'this situation',chips:['this situation','the past','this worry','this person']},
  q:{def:'this situation',feel:['sadness','fear','attachment']},
  resp:['I take 100% responsibility for {n}, and for how tightly I have held on.'],
  sorry:['I\'m sorry for holding on to {n} so tightly.','I\'m sorry for replaying it again and again.'],
  forgive:['Please forgive me for not trusting that everything has a purpose.','Please forgive me for every memory within me that keeps this alive.'],
  thanks:['Thank you, {n}, for what you taught me.','Thank you for this chance to be free.'],
  love:['I love you, {n}. I let you go with love.'],
  letgo:['I release, I let go, I let God.','I release, I let go, I let God.','I release, I let go, I let God.','Everything is perfect, the way it is.'],
  affirm:['I am free.','I trust the flow of life.']}
);
FEELINGS.push('attachment','sadness');
const SCR=Object.fromEntries(SCRIPTS.map(s=>[s.id,s]));
SCR.exam.title='Work & Exams';SCR.inner.title='Inner Child Healing';SCR.relationship.title='Relationships';SCR.self.title='Self Love';
const SCR_META={relationship:['sit_relationships','relationships'],family:['sit_family','family'],exam:['sit_work','work'],money:['sit_money','money'],health:['sit_health','health'],
 inner:['med_innerchild','memories'],self:['sit_selflove','selflove'],letgo:['sit_lettinggo','lettinggo'],anger:['med_anger',null],stress:['snd_river',null],habit:['snd_forest',null],stuck:['onb4',null]};
const SIT_SCRIPT={relationships:'relationship',family:'family',work:'exam',money:'money',health:'health',memories:'inner',selflove:'self',lettinggo:'letgo'};
const EXTRA_SCRIPTS=['anger','stress','habit','stuck'];
const STAGE={guide:['Guidance','#C9B8F0'],resp:['100% Responsibility','#E6DDCB'],sorry:['I’m sorry','#A9C3FF'],forgive:['Please forgive me','#86DCCB'],thanks:['Thank you','#F3CB83'],love:['I love you','#F6ADC4'],letgo:['Letting go','#B3DCA4'],affirm:['Affirmation','#F4E3B5']};
const PHR=[['I’m sorry.','#A9C3FF'],['Please forgive me.','#86DCCB'],['Thank you.','#F3CB83'],['I love you.','#F6ADC4']];
let lineCount=s=>s.custom?s.custom.length:s.guide?s.guide.length:['resp','sorry','forgive','thanks','love','letgo','affirm'].reduce((a,k)=>a+(s[k]||[]).length,0);
function classify(t){const l=t.toLowerCase();if(/responsib/.test(l))return'resp';if(/sorry/.test(l))return'sorry';if(/forgive/.test(l))return'forgive';if(/thank/.test(l))return'thanks';if(/\blove\b/.test(l))return'love';if(/let go|release|let god/.test(l))return'letgo';return'affirm'}
function getScript(id){if(id&&id.startsWith('my:')){const c=(S.myScripts||[]).find(x=>'my:'+x.id===id);if(!c)return null;
  return{id,title:c.title,blurb:'Your own script',custom:c.lines.map(t=>({stage:classify(t),text:t})),subj:c.subj?{label:'Name or subject (replaces {name})',def:c.subj,chips:[]}:null,mine:true}}return SCR[id]}
let scrImg=s=>s.mine?'botanical':(SCR_META[s.id]||['botanical'])[0];
function buildLines(s,mode,subject,feel){const n=subject||(s.subj?s.subj.def:'');const cap=x=>x.charAt(0).toUpperCase()+x.slice(1);
 const fill=t=>{const r=t.replace(/\{n\}|\{name\}/gi,n);return n&&r.startsWith(n)?cap(r):r};
 if(s.custom)return s.custom.map(l=>({stage:l.stage,text:fill(l.text)}));
 if(s.guide)return s.guide.map(t=>({stage:'guide',text:t}));
 if(mode==='quantum'){const q=subject||s.q.def;const out=[{stage:'resp',text:`I take 100% responsibility for how I feel about ${q}. These feelings come from memories within me, and I am ready to clean them.`}];
  feel.forEach(f=>out.push({stage:'sorry',text:`For the ${f} I feel about ${q}, I’m sorry.`},{stage:'forgive',text:`For the ${f} I feel about ${q}, please forgive me.`},{stage:'thanks',text:`Thank you for this ${f}. It shows me what is ready to be cleaned.`},{stage:'love',text:`I love you, ${f}. I accept you.`}));
  out.push({stage:'letgo',text:'I release, I let go, I let God.'},{stage:'letgo',text:'Everything is perfect, the way it is.'});return out}
 return['resp','sorry','forgive','thanks','love','letgo','affirm'].flatMap(k=>(s[k]||[]).map(t=>({stage:k,text:fill(t)})))}

/* ---------- screens ---------- */
function ScriptCard(id){const s=SCR[id];return `<button class="ccard" data-a="go" data-v="script" data-p="${id}"><img src="${img(scrImg(s))}" alt="" loading="lazy"><span>${s.title}</span></button>`}
Object.assign(SCREENS,{
situations:()=>`${C.TopHeader('Healing for Situations')}<p class="muted small center" style="margin:-4px 0 18px">Choose what you would like to clean today.</p><div class="cgrid three">${SITS.map(C.CategoryCard).join('')}</div>
  ${C.SectionHeader('More healing scripts')}<div class="cgrid three">${EXTRA_SCRIPTS.map(ScriptCard).join('')}</div>
  <button class="card row" data-a="go" data-v="myscripts" style="border:0;width:100%;text-align:left;margin-top:16px"><span class="ico" style="width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:var(--sage-soft);color:var(--sage)">${svg('edit')}</span><span class="grow"><b style="display:block">My Scripts</b><span class="small muted">Paste your own scripts from your course</span></span>${svg('chev','chev')}</button>`,
situation:id=>{const s=SIT[id]||SITS[0];const meds=MEDS.filter(m=>(m.sit||[]).includes(s.id));const sc=SCR[SIT_SCRIPT[s.id]];
 return `<div style="position:relative;margin:0 -20px;height:250px;overflow:hidden;border-radius:0 0 32px 32px"><img src="${img(s.img)}" alt="" style="width:100%;height:100%;object-fit:cover">
   <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),transparent 40%,rgba(20,24,20,.65))"></div>
   <button class="iconbtn soft" data-a="back" aria-label="Back" style="position:absolute;left:16px;top:calc(14px + env(safe-area-inset-top,0px))">${svg('back','',2)}</button>
   <h1 class="h-xl" style="position:absolute;left:22px;right:22px;bottom:20px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.4)">${s.title}</h1></div>
  <p class="muted" style="margin:18px 0 4px">${s.text}</p>
  ${C.SectionHeader('Ho’oponopono script')}
  <button class="card" data-a="go" data-v="script" data-p="${sc.id}" style="border:0;width:100%;text-align:left;display:flex;flex-direction:column;gap:10px;background:linear-gradient(135deg,var(--ivory),var(--sage-soft))">
   <span class="row between"><span class="pbadge" style="background:var(--sage);color:#fff">${sc.guide?'Guided':'Basic · Quantum'}</span><span class="small muted">${lineCount(sc)} lines · then the four phrases</span></span>
   <span class="h-md">${sc.guide?'Meet and heal your younger self':'I take 100% responsibility…'}</span>
   <span class="small muted">${esc(sc.blurb)}</span><span class="btn btn-primary btn-sm" style="align-self:flex-start">Begin script</span></button>
  <button class="card row" data-a="sitmantra" data-v="${s.id}" style="border:0;width:100%;text-align:left;margin-top:12px;background:linear-gradient(120deg,#FBE9EC,#F2EFE8)">
   <img src="${img('lotusicon')}" alt="" style="width:52px;height:52px"><span class="grow"><b style="display:block">Play Return to Peace for ${s.title.toLowerCase()}</b><span class="small muted">Free · 5 min with music</span></span><span class="cplay solid" aria-hidden="true">${svg('play')}</span></button>
  ${meds.length?C.SectionHeader('Meditations')+`<div class="mlist">${meds.map(C.MeditationCard).join('')}</div>`:''}`},
script:id=>{const s=getScript(id);if(!s)return SCREENS.situations();
 if(!UI.scr||UI.scr.id!==id)UI.scr={id,mode:'basic',subj:'',feel:s.q?[...s.q.feel]:[],heavy:6,rounds:S.rounds||11,preview:false};
 const u=UI.scr;const isQ=u.mode==='quantum'&&!s.guide&&!s.custom;const field=isQ?{label:'What or who is it about?',def:s.q.def,chips:s.subj?s.subj.chips:[]}:s.subj;const lines=buildLines(s,u.mode,u.subj.trim(),u.feel);
 return `<div style="position:relative;margin:0 -20px;height:210px;overflow:hidden;border-radius:0 0 32px 32px"><img src="${img(scrImg(s))}" alt="" style="width:100%;height:100%;object-fit:cover">
   <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),transparent 40%,rgba(20,24,20,.7))"></div>
   <button class="iconbtn soft" data-a="back" aria-label="Back" style="position:absolute;left:16px;top:calc(14px + env(safe-area-inset-top,0px))">${svg('back','',2)}</button>
   <div style="position:absolute;left:22px;right:22px;bottom:18px;color:#fff"><p class="xs" style="letter-spacing:.14em;font-weight:700;opacity:.9">${s.guide?'GUIDED SCRIPT':s.mine?'MY SCRIPT':'HO’OPONOPONO SCRIPT'}</p><h1 class="h-xl" style="text-shadow:0 2px 12px rgba(0,0,0,.4)">${esc(s.title)}</h1></div></div>
  <div class="stack" style="margin-top:18px;gap:20px">
   ${s.guide||s.custom?'':`<div><div class="seg3" style="grid-template-columns:1fr 1fr"><button data-a="smode" data-v="basic" aria-pressed="${u.mode==='basic'}">Basic</button><button data-a="smode" data-v="quantum" aria-pressed="${u.mode==='quantum'}">Quantum${S.premium?'':' · Premium'}</button></div>
    <p class="small muted" style="margin-top:8px">${isQ?'Quantum cleans how you feel about it. Pick the feelings that come up.':'Basic cleans the situation itself. You speak to it directly.'}</p></div>`}
   ${field?`<div><label class="h-sm" for="ssubj" style="display:block;margin-bottom:8px">${field.label}</label><input id="ssubj" class="nameinput" style="background:var(--ivory);min-height:50px;font-size:1.05rem" value="${esc(u.subj)}" placeholder="${esc(field.def)}">
    ${field.chips&&field.chips.length?`<div class="chips" style="margin-top:10px">${field.chips.map(c=>`<button class="chip" data-a="ssubj" data-v="${esc(c)}" aria-pressed="${u.subj===c}">${esc(c)}</button>`).join('')}</div>`:''}</div>`:''}
   ${isQ?`<div><p class="h-sm" style="margin-bottom:8px">Which feelings come up?</p><div style="display:flex;flex-wrap:wrap;gap:8px">${FEELINGS.map(f=>`<button class="chip" data-a="sfeel" data-v="${f}" aria-pressed="${u.feel.includes(f)}">${f}</button>`).join('')}</div></div>`:''}
   <div class="card flat"><div class="row between"><p class="h-sm">How heavy does it feel?</p><p class="serif" style="font-size:1.6rem;font-weight:700;line-height:1">${u.heavy}<span class="small muted"> / 10</span></p></div>
    <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;margin-top:10px" role="radiogroup" aria-label="Heaviness">${Array.from({length:10},(_,i)=>`<button data-a="sheavy" data-v="${i+1}" role="radio" aria-checked="${u.heavy===i+1}" aria-label="${i+1}" style="height:28px;border:0;border-radius:8px;background:${i<u.heavy?'linear-gradient(180deg,#EFA9BD,#C2567A)':'var(--beige)'}"></button>`).join('')}</div>
    <div class="row between xs faint" style="margin-top:6px"><span>Light</span><span>Very heavy</span></div></div>
   <div><p class="h-sm" style="margin-bottom:8px">Then repeat the four phrases</p><div class="seg3">${[11,55,108].map(r=>`<button data-a="srounds" data-v="${r}" aria-pressed="${u.rounds===r}">${r} times</button>`).join('')}</div></div>
   <details class="faq" ${u.preview?'open':''}><summary>Preview all ${lines.length} lines ${svg('down','chev')}</summary><div class="stack" style="gap:8px;margin-top:12px">${lines.map(l=>`<p class="small" style="padding-left:10px;border-left:3px solid ${stageInk(l.stage)}">${esc(l.text)}</p>`).join('')}</div></details>
   ${C.PrimaryButton('Begin session','sbegin')}
   ${s.mine?C.SecondaryButton('Edit this script','go','scriptedit',`data-p="${s.id.slice(3)}"`):''}
  </div>`},
myscripts:()=>{const my=S.myScripts||[];return `${C.TopHeader('My Scripts',{right:`<button class="iconbtn" data-a="go" data-v="scriptedit" aria-label="New script">${svg('plus','',2.2)}</button>`})}
  <p class="small muted center" style="margin:-4px 0 16px">Paste a script from your course. Each line becomes one step, coloured by the phrase it uses.</p>
  ${my.length?`<div class="list">${my.map(c=>`<button class="li" data-a="go" data-v="script" data-p="my:${c.id}"><span class="ico" style="background:var(--sage-soft);color:var(--sage)">${svg('doc')}</span><span class="grow"><b style="display:block">${esc(c.title)}</b><span class="small muted">${c.lines.length} lines</span></span>${svg('chev','chev')}</button>`).join('')}</div>`:`<div class="empty">No scripts yet.<div style="margin-top:12px">${C.PrimaryButton('Add your first script','go','scriptedit')}</div></div>`}`},
scriptedit:id=>{const c=(S.myScripts||[]).find(x=>String(x.id)===String(id));return `${C.TopHeader(c?'Edit script':'New script')}
  <div class="stack">
   <div><label class="h-sm" for="etitle">Title</label><input id="etitle" class="nameinput" style="margin-top:6px;background:var(--ivory)" value="${esc(c?c.title:'')}" placeholder="e.g. Loan repayment"></div>
   <div><label class="h-sm" for="esubj">Default name (optional)</label><input id="esubj" class="nameinput" style="margin-top:6px;background:var(--ivory)" value="${esc(c?c.subj:'')}" placeholder="Used wherever you write {name}"></div>
   <div><label class="h-sm" for="elines">Script, one line per step</label><textarea id="elines" class="write" style="min-height:280px;margin-top:6px" placeholder="I take 100% responsibility for this situation.&#10;I’m sorry, {name}, for …&#10;Please forgive me, {name}, for …&#10;Thank you, {name}, for …&#10;I love you, {name}.&#10;I let go. I let God.">${esc(c?c.lines.join('\n'):'')}</textarea></div>
   ${C.PrimaryButton('Save script','ssave','',`data-id="${c?c.id:''}"`)}
   ${c?`<div id="sdelrow">${C.SecondaryButton('Delete script','sdelask',String(c.id))}</div>`:''}</div>`},
bowl:()=>`${C.TopHeader('Burning Bowl')}
  <div class="stack">
   <p class="muted">For a situation that still feels heavy after many rounds. Write down every negative thought and feeling about it. Then release it.</p>
   <div id="bowlin" class="stack"><textarea id="btext" class="write" style="min-height:190px" placeholder="Everything I feel about this…"></textarea>${C.PrimaryButton('Release it','burn')}</div>
   <div id="bowlart" class="bowl" hidden><canvas id="embers"></canvas><p id="bwords"></p></div>
   <div id="bowlout" class="stack" style="gap:6px;text-align:center"></div>
   <div class="card flat small muted" style="display:flex;gap:10px">${svg('info').replace('<svg','<svg width="20" height="20" style="flex:none"')}<span>Nothing you write here is saved. Doing it on paper? Tear it up and burn it safely in a metal bowl, repeating “I release, I let go, I let God” until it has burned.</span></div>
  </div>`,
fivefive:()=>{const F=S.ff||{aff:'',start:null,log:{}};const today=dk();const add=(k,n)=>{const d=parseDk(k);d.setDate(d.getDate()+n);return dk(d)};
 const days=F.start?[0,1,2,3,4].map(i=>add(F.start,i)):[];const ti=days.indexOf(today);const complete=F.start&&days.every(d=>(F.log[d]||0)>=55);
 const broken=F.start&&!complete&&days.some((d,i)=>(ti===-1?true:i<ti)&&(F.log[d]||0)<55);const cnt=F.log[today]||0;
 return `${C.TopHeader('55 × 5 Writing')}
  <div class="stack">
   <p class="muted">Write one desire as an affirmation <b>55 times a day for 5 days in a row</b>. A mix of affirmation and journaling that rewrites the subconscious.</p>
   <div><label class="h-sm" for="ffaff">Your affirmation</label><input id="ffaff" class="nameinput" style="margin-top:6px;background:var(--ivory);min-height:50px" value="${esc(F.aff)}" placeholder="I am happily living in my new home." ${F.start&&!complete&&!broken?'readonly':''}>
    <p class="xs faint" style="margin-top:6px">Present tense · short and specific · positive · one desire at a time</p></div>
   ${!F.start?C.PrimaryButton('Start day 1 today','ffstart'):`
   <div class="card flat"><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px">${days.map((d,i)=>{const dn=(F.log[d]||0)>=55;return `<div style="text-align:center;padding:10px 0;border-radius:12px;${dn?'background:var(--sage);color:#fff':d===today?'box-shadow:inset 0 0 0 2px var(--sage)':'background:var(--beige)'}"><b style="display:block">${dn?'✓':i+1}</b><span class="xs">Day ${i+1}</span></div>`}).join('')}</div></div>
   ${complete?`<div class="card stack center" style="gap:8px;background:linear-gradient(135deg,#E3EEDF,#FBF1E2)"><p class="h-md">All five days complete</p><p class="muted">Now surrender it to the universe. Detach from the result, keep taking inspired action, and trust.</p>${C.SecondaryButton('Start a new desire','ffstart')}</div>`
   :broken?`<div class="card stack center" style="gap:8px"><p class="h-md">The chain was broken</p><p class="muted">A day was missed, so the practice begins again from day 1.</p>${C.PrimaryButton('Restart today','ffstart')}</div>`
   :`<div class="card stack" style="align-items:center;gap:10px"><p class="xs faint" style="letter-spacing:.12em;font-weight:700">TODAY</p><p class="serif" style="font-size:3.4rem;font-weight:700;line-height:1">${cnt}<span class="muted" style="font-size:1.4rem"> / 55</span></p>
     <div class="mbar" style="width:100%;height:6px"><i style="width:${Math.min(100,cnt/55*100)}%"></i></div>
     ${cnt>=55?`<p style="color:var(--botanical);font-weight:600">Done for today. See you tomorrow.</p>`:`<input id="ffw" class="nameinput" style="background:var(--cream);min-height:48px" placeholder="Type it, then press Enter" autocomplete="off" aria-label="Write your affirmation">
     <button class="btn btn-secondary btn-sm" data-a="ffplus">I wrote one on paper · +1</button>`}</div>`}`}
   <details class="faq"><summary>How to do it well ${svg('down','chev')}</summary><p>Be in a high, positive energy. Smile as though it has already happened, and feel the happiness of it. Say it aloud as you write. Don’t break the 5-day chain; if a day is missed, restart. When the 5 days are done, surrender it: detach from results, set no expectations, keep taking inspired action and trust.</p></details>
  </div>`}
});
function stageInk(k){return{guide:'#8B79B8',resp:'#A69C88',sorry:'#4E6FA3',forgive:'#3E8577',thanks:'#B7852E',love:'#C2567A',letgo:'#5E8B4E',affirm:'#C8A25E'}[k]}

/* extend existing screens */
const _daily=SCREENS.daily;
SCREENS.daily=p=>_daily(p)+`${C.SectionHeader('Deeper practices')}<div class="stack" style="gap:10px">
  <button class="pitem" data-a="go" data-v="bowl"><span class="num" style="background:#FCE3D3;color:#B8612F">${svg('flower')}</span><span class="grow"><b style="display:block">Burning Bowl</b><span class="small muted">Write it, burn it, let it go.</span></span>${svg('chev','chev')}</button>
  <button class="pitem" data-a="go" data-v="fivefive"><span class="num" style="background:#EDE6F5;color:#6E5AA0">${svg('edit')}</span><span class="grow"><b style="display:block">55 × 5 Writing</b><span class="small muted">${S.ff&&S.ff.start?`Today ${(S.ff.log||{})[dk()]||0}/55`:'One desire, 55 times, 5 days.'}</span></span>${svg('chev','chev')}</button>
  <button class="pitem" data-a="go" data-v="situations"><span class="num" style="background:#F9E2E1;color:#C2567A">${svg('heart')}</span><span class="grow"><b style="display:block">Ho’oponopono scripts</b><span class="small muted">Basic and Quantum cleaning for any situation.</span></span>${svg('chev','chev')}</button></div>`;
const _more=SCREENS.more;
SCREENS.more=p=>_more(p).replace('<button class="li" data-a="go" data-v="downloads">',`<button class="li" data-a="go" data-v="myscripts"><span class="ico" style="background:#ECE6CC;color:#6E6A35">${svg('doc')}</span><span class="grow">My Scripts</span>${svg('chev','chev')}</button><button class="li" data-a="go" data-v="downloads">`);
const _act=activityDays;
activityDays=function(){const s=_act();(S.rituals||[]).forEach(r=>s.add(r.date));return s};

/* ---------- after hooks ---------- */
AFTER.script=()=>{const i=$('#ssubj');if(i)i.oninput=()=>{UI.scr.subj=i.value};const d=document.querySelector('details.faq');if(d)d.ontoggle=()=>{UI.scr.preview=d.open}};
AFTER.fivefive=()=>{const a=$('#ffaff');if(a)a.onchange=()=>{S.ff=S.ff||{aff:'',start:null,log:{}};S.ff.aff=a.value.trim();save()};
 const w=$('#ffw');if(w){w.onkeydown=e=>{if(e.key==='Enter'&&w.value.trim()){e.preventDefault();ffInc(true)}}}};
function ffInc(refocus){S.ff.log[dk()]=(S.ff.log[dk()]||0)+1;if(S.ff.log[dk()]===55){S.rituals=S.rituals||[];S.rituals.push({type:'55x5',date:dk()});toast('55 done for today ✓')}save();rerender();if(refocus){const w=$('#ffw');if(w)w.focus()}}

/* ---------- script reader (runs in the player overlay) ---------- */
const R={s:null};
function startScript(){const u=UI.scr;const s=getScript(u.id);const isQ=u.mode==='quantum'&&!s.guide&&!s.custom;
 if(isQ&&!S.premium){go('premium');toast('Quantum scripts are part of Premium');return}
 if(isQ&&!u.feel.length){toast('Pick at least one feeling');return}
 const subject=u.subj.trim()||(isQ?s.q.def:(s.subj?s.subj.def:''));
 Object.assign(R,{s,lines:buildLines(s,u.mode,u.subj.trim(),u.feel),i:0,phase:'lines',rounds:u.rounds,done:0,idx:0,before:u.heavy,after:Math.max(1,u.heavy-2),subject,
  mode:s.custom?'My script':s.guide?'Guided':isQ?'Quantum':'Basic',sit:(SCR_META[s.id]||[])[1]||null,t0:Date.now(),prompt:0,leaveArm:0,auto:null});
 S.rounds=u.rounds;save();$('#player').hidden=false;document.body.style.overflow='hidden';AMB.start(S.sound,0,.8);drawReader();try{history.pushState({r:1},'')}catch(e){}}
function closeReader(log){if(!R.s)return;if(log!==false&&(Date.now()-R.t0)>45000)logScript();clearInterval(R.auto);AMB.stop();try{speechSynthesis.cancel()}catch(e){}R.s=null;$('#player').hidden=true;document.body.style.overflow='';closeSheet();rerender()}
function logScript(){if(R.logged)return;R.logged=true;S.sessions.push({id:'script:'+R.s.id,date:dk(),secs:Math.round((Date.now()-R.t0)/1000),sit:R.sit});save()}
function readerTop(){return `<div class="ptop"><button class="iconbtn" data-a="rclose" aria-label="Back">${svg('back','',2.2)}</button>
  <p class="small" style="font-weight:600;opacity:.9;text-align:center;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(R.s.title)}${R.subject&&!R.s.guide?' · '+esc(R.subject):''}</p>
  <button class="iconbtn" data-a="belltoggle" aria-pressed="${S.bell!==false}" aria-label="Bell sound ${S.bell!==false?'on':'off'}" style="opacity:${S.bell!==false?1:.45}">${svg('bell')}</button></div>`}
function drawReader(){const st=$('#stage');const bg=`<div class="pbg" style="background-image:url(${img(scrImg(R.s))});filter:blur(3px) brightness(.5) saturate(.9);height:100%"></div>`;
 if(R.phase==='lines'){const L=R.lines[R.i];const [nm,col]=STAGE[L.stage];
  st.innerHTML=`${bg}<div class="rglow" style="background:radial-gradient(closest-side,${col}55,transparent)"></div>${readerTop()}
   <div class="rprog" aria-hidden="true">${R.lines.map((l,k)=>`<i style="background:${k<=R.i?STAGE[l.stage][1]:'rgba(255,255,255,.2)'}"></i>`).join('')}</div>
   <div class="rtap" data-a="rnext"><span class="rstage" style="color:${col};border-color:${col}88">${nm}</span><p class="rline" aria-live="polite">${esc(L.text)}</p><p class="small" style="opacity:.7">${R.i+1} of ${R.lines.length} · read slowly, then tap anywhere</p></div>
   <div class="rctl"><button class="skipbtn" data-a="rprev" aria-label="Previous line" style="border:1.5px solid rgba(255,255,255,.3);border-radius:50%" ${R.i?'':'disabled'}>${svg('back','',2)}</button><button class="btn btn-cream grow" data-a="rnext">${R.i===R.lines.length-1?'Continue to the four phrases':'Next line'}</button></div>`;
  if(R.i!==R.lastChime){R.lastChime=R.i;AMB.chime()}}
 else if(R.phase==='mala'){const [ph,col]=PHR[R.idx];const n=R.rounds,Rr=118,c=130;let beads='';
  for(let k=0;k<n;k++){const a=-Math.PI/2+k*2*Math.PI/n;const cur=k===R.done;const sz=n>60?(cur?9:5):n>30?(cur?10:6):(cur?13:9);
   beads+=`<circle cx="${(c+Rr*Math.cos(a)).toFixed(1)}" cy="${(c+Rr*Math.sin(a)).toFixed(1)}" r="${sz/2}" fill="${k<R.done?'#F3CB83':cur?col:'rgba(255,255,255,.22)'}"/>`}
  st.innerHTML=`${bg}<div class="rglow" style="background:radial-gradient(closest-side,${col}55,transparent)"></div>${readerTop()}
   <div style="position:relative;z-index:2;text-align:center;margin-top:6px"><p class="xs" style="letter-spacing:.14em;font-weight:700;opacity:.8">THE FOUR PHRASES</p></div>
   <svg viewBox="0 0 260 260" width="250" height="250" style="position:relative;z-index:2;margin:6px auto 0;display:block" aria-hidden="true">${beads}<text x="130" y="132" text-anchor="middle" fill="#FBF6EE" style="font:700 54px 'Cormorant Garamond',Georgia,serif">${R.done}</text><text x="130" y="158" text-anchor="middle" fill="rgba(251,246,238,.75)" style="font:500 13px Figtree,sans-serif">of ${n} rounds</text></svg>
   <div style="position:relative;z-index:2;padding:0 22px;display:flex;flex-direction:column;gap:12px;margin-top:8px">
    <button class="rphrase" data-a="radv" style="box-shadow:inset 0 0 0 1.5px ${col}99" aria-live="polite"><span style="color:${col}">${ph}</span><small>${R.done>=n?`All ${n} rounds complete`:'Say it silently or aloud, then tap'}</small></button>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${PHR.map((p,k)=>`<i style="height:4px;border-radius:2px;background:${k<=R.idx?p[1]:'rgba(255,255,255,.2)'}"></i>`).join('')}</div>
    <div class="row between"><span class="small" style="opacity:.8">Round ${Math.min(R.done+1,n)} of ${n}</span><button class="btn btn-sm" data-a="rauto" aria-pressed="${!!R.auto}" style="background:${R.auto?'#FBF6EE':'rgba(255,255,255,.12)'};color:${R.auto?'#1E2B25':'#FBF6EE'}">${svg('repeat')} Auto-advance${R.auto?' on':''}</button></div></div>
   <div class="rctl"><button class="btn btn-cream grow" data-a="rreflect">${R.done>=n?'Continue to reflection':'Finish and reflect'}</button></div>`}
 else{st.innerHTML=`${bg}${readerTop()}<div class="rreflect"><p class="xs" style="letter-spacing:.14em;font-weight:700;color:var(--botanical)">REFLECT</p><h2 class="h-lg" id="rpr">${PROMPTS[R.prompt].t}</h2>
   <button class="link small" data-a="rprompt" style="align-self:flex-start;padding-left:0">Another prompt</button>
   <textarea id="rtext" class="write" maxlength="500" placeholder="Write freely. Only you can see this." style="min-height:130px"></textarea>
   <div><div class="row between"><p class="h-sm">How heavy does it feel now?</p><p class="serif" style="font-size:1.5rem;font-weight:700" id="raft">${R.after}<span class="small muted"> / 10</span></p></div>
    <input type="range" id="rafter" min="1" max="10" value="${R.after}" style="width:100%;accent-color:var(--sage)" aria-label="Heaviness now"><p class="xs muted">Before: ${R.before} / 10</p></div>
   ${C.PrimaryButton('Save to journal','rsave')}<button class="link small" data-a="rskip" style="align-self:center">Finish without writing</button></div>`;
  const a=$('#rafter');a.oninput=()=>{R.after=+a.value;$('#raft').innerHTML=`${a.value}<span class="small muted"> / 10</span>`}}}
function rAdvance(){if(!R.s||R.phase!=='mala'||R.done>=R.rounds)return;R.idx++;if(R.idx>3){R.idx=0;R.done++;try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}AMB.chime();
 if(R.done>=R.rounds){clearInterval(R.auto);R.auto=null;toast('Complete. Take a slow breath.')}}drawReader()}
Object.assign(ACT,{
 smode:v=>{UI.scr.mode=v;rerender()}, ssubj:v=>{UI.scr.subj=v;rerender()},
 sfeel:v=>{const f=UI.scr.feel;const i=f.indexOf(v);i>=0?f.splice(i,1):f.push(v);rerender()},
 sheavy:v=>{UI.scr.heavy=+v;rerender()}, srounds:v=>{UI.scr.rounds=+v;rerender()}, sbegin:()=>startScript(),
 rnext:()=>{if(R.i<R.lines.length-1)R.i++;else{R.phase='mala';try{speechSynthesis.cancel()}catch(e){}}drawReader()},
 rprev:()=>{if(R.i>0){R.i--;drawReader()}},
 radv:()=>rAdvance(),
 rauto:()=>{if(R.auto){clearInterval(R.auto);R.auto=null}else R.auto=setInterval(rAdvance,3500);drawReader()},
 rreflect:()=>{clearInterval(R.auto);R.auto=null;R.phase='reflect';drawReader()},
 rprompt:()=>{R.prompt=(R.prompt+1)%5;$('#rpr').textContent=PROMPTS[R.prompt].t},
 rsave:()=>{const text=$('#rtext').value.trim();logScript();
  S.journal.push({id:Date.now(),date:dk(),ts:Date.now(),prompt:PROMPTS[R.prompt].id,ptext:`${R.s.title}${R.subject&&!R.s.guide?' · '+R.subject:''} · ${R.mode} · heaviness ${R.before} → ${R.after}`,text:text||`Completed ${R.done} rounds of the four phrases.`});save();
  closeReader(false);toast('Saved to your journal')},
 rskip:()=>{logScript();closeReader(false);toast('Session complete. Thank you.')},
 rclose:()=>{const started=R.phase!=='lines'||R.i>0;if(started&&Date.now()-R.leaveArm>3000){R.leaveArm=Date.now();toast('Tap again to leave the session');return}if(history.state&&history.state.r)history.back();else closeReader()},
 ssave:(v,el)=>{const t=$('#etitle').value.trim();const lines=$('#elines').value.split('\n').map(x=>x.replace(/^[\s☹️🙏😊❤️•\-*\d.)]+/u,'').trim()).filter(Boolean);
  if(!t||!lines.length){toast('Add a title and at least one line');return}S.myScripts=S.myScripts||[];const id=el.dataset.id;const obj={id:id?Number(id):Date.now(),title:t,subj:$('#esubj').value.trim(),lines};
  S.myScripts=id?S.myScripts.map(x=>String(x.id)===id?obj:x):[obj,...S.myScripts];save();stack=stack.filter(x=>x.n!=='scriptedit'&&!(x.n==='script'&&x.p==='my:'+obj.id));UI.scr=null;render();toast('Script saved')},
 sdelask:v=>{$('#sdelrow').innerHTML=`<div class="row"><span class="grow small">Delete this script?</span><button class="btn btn-sm" style="background:#A33B3B;color:#fff" data-a="sdelyes" data-v="${v}">Delete</button><button class="btn btn-secondary btn-sm" data-a="sdelno">Keep</button></div>`},
 sdelno:()=>rerender(),
 sdelyes:v=>{S.myScripts=(S.myScripts||[]).filter(x=>String(x.id)!==String(v));save();stack=stack.filter(x=>!(x.n==='scriptedit'||(x.n==='script'&&x.p==='my:'+v)));render();toast('Script deleted')},
 burn:()=>{const t=$('#btext').value.trim();if(!t){toast('Write what you want to release first');return}
  $('#bowlin').hidden=true;const art=$('#bowlart');art.hidden=false;$('#bwords').textContent=t;requestAnimationFrame(()=>art.classList.add('burning'));embers($('#embers'));
  S.rituals=S.rituals||[];S.rituals.push({type:'bowl',date:dk()});save();
  const out=$('#bowlout');['I release all these feelings from my mind and body.','I let go.','I let God.'].forEach((l,i)=>setTimeout(()=>{if(out.isConnected)out.insertAdjacentHTML('beforeend',`<p class="serif fadeup" style="font-size:1.6rem;font-weight:600;color:#B8612F">${l}</p>`)},1300+i*1400));
  setTimeout(()=>{if(out.isConnected)out.insertAdjacentHTML('beforeend',`<p class="muted fadeup" style="margin-top:10px">Now think of one good thing about this person or situation.</p><div class="stack fadeup" style="margin-top:10px">${C.SecondaryButton('Release something else','bowlagain')}${C.PrimaryButton('Write the good thing in my journal','bowljournal')}</div>`)},5800)},
 bowlagain:()=>rerender(),
 bowljournal:()=>{UI.jPrompt='grateful';UI.jDate=dk();S.draft='One good thing about this: ';save();go('journal')},
 ffstart:()=>{const a=$('#ffaff');const aff=(a?a.value:'').trim();if(!aff){toast('Write your affirmation first');a&&a.focus();return}S.ff={aff,start:dk(),log:{}};save();rerender()},
 ffplus:()=>ffInc(false)
});
function embers(cv){if(!cv||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=cv.getContext('2d');const w=cv.width=cv.clientWidth,h=cv.height=cv.clientHeight;
 const ps=Array.from({length:70},()=>({x:Math.random()*w,y:h+Math.random()*80,v:.6+Math.random()*1.5,r:1+Math.random()*2.4,a:1}));let f=0;
 (function loop(){c.clearRect(0,0,w,h);ps.forEach(p=>{p.y-=p.v;p.x+=Math.sin((p.y+f)/18)*.5;p.a-=.0035;c.fillStyle=`rgba(242,${150+Math.random()*70|0},80,${Math.max(0,p.a)})`;c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill()});f++;if(f<320&&cv.isConnected)requestAnimationFrame(loop);else c.clearRect(0,0,w,h)})()}

ACT.belltoggle=()=>{S.bell=S.bell===false;save();if(S.bell)AMB.chime();toast(S.bell?'Bell on':'Bell off');if(R.s){R.lastChime=R.i;drawReader()}};
