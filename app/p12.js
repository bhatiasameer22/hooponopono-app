/* ================= SCRIPT SEARCH (p12) ================= */

const SEARCH_MAP=[
  {id:'relationship',words:['partner','wife','husband','girlfriend','boyfriend','lover','couple','marriage','divorce','breakup','cheat','affair','ex','argue','fight','conflict','trust','toxic','controlling','colleague','coworker','boss','friend','friendship','betrayal','ghosted','ignored','disrespect','relationship']},
  {id:'family',    words:['mother','father','mom','dad','parent','sister','brother','sibling','child','son','daughter','family','in-law','relative','aunt','uncle','grandmother','grandfather','grandma','grandpa','stepmother','stepfather','toxic family','generational','inherited']},
  {id:'money',     words:['money','debt','loan','rent','bill','finance','financial','broke','poor','income','salary','abundance','scarcity','afford','budget','saving','investment','business','payment','owe','owed','bankruptcy','mortgage','credit','spending','wealth']},
  {id:'health',    words:['health','sick','pain','body','weight','skin','sleep','tired','fatigue','diagnosis','disease','illness','hospital','medicine','healing','back','headache','digestion','cancer','chronic','injury','recover','surgery','diet','eating','insomnia']},
  {id:'anger',     words:['anger','angry','rage','furious','temper','shout','yell','violent','mad','irritated','resentment','bitter','hatred','hate','explode','snap','boiling','revenge','grudge','grudges','unfair']},
  {id:'stress',    words:['stress','anxious','anxiety','worry','overwhelm','panic','nervous','fear','overthink','restless','racing mind','tension','burnout','pressure','dread','scared','terrified','phobia','claustrophobic','agoraphobic']},
  {id:'self',      words:['self','worth','confidence','criticism','compare','comparison','shame','guilt','not enough','failure','ugly','fat','stupid','worthless','insecure','unloved','alone','lonely','reject','rejected','judged','judging','mirror','body image','hate myself','low self','self-esteem','self-image','self-worth','imposter','inferior','embarrassed']},
  {id:'exam',      words:['exam','test','interview','presentation','job','career','work','study','project','deadline','performance','score','grade','exam result','entrance','competitive','session','sessions','coach','teaching','procrastinat','procrastination']},
  {id:'habit',     words:['habit','addiction','smoking','alcohol','drinking','drug','sugar','phone','social media','scrolling','porn','gambling','overeating','binge','craving','compulsion','can\'t stop','cigarette','vaping','dependent','dependency']},
  {id:'stuck',     words:['stuck','blocked','confused','direction','goal','purpose','lost','decision','choice','next step','no progress','stagnant','can\'t move','paralysed','indecisive','crossroads','transition','change','business idea','start','begin','procrastinat']},
  {id:'inner',     words:['childhood','trauma','past','memory','memories','young','inner child','abuse','neglect','wound','old pain','parent hurt','emotional block','unresolved','flashback','ptsd','triggered','trigger','childhood memory','hurt as a child']}
];

const CHIPS_SEARCH=[
  {label:'My relationship',q:'fight with partner'},
  {label:'Family tension',q:'family conflict'},
  {label:'Money worries',q:'money debt financial stress'},
  {label:'My health',q:'sick pain body health'},
  {label:'Feeling angry',q:'anger rage resentment'},
  {label:'Anxiety',q:'anxious stress worry overwhelm'},
  {label:'Self-doubt',q:'not enough worthless self confidence'},
  {label:'Work stress',q:'work job career stress deadline'},
  {label:'A bad habit',q:'addiction habit craving'},
  {label:'Feeling stuck',q:'stuck blocked lost no direction'},
  {label:'Past trauma',q:'childhood trauma past memories wound'},
];

function searchScripts(q){
  if(!q||!q.trim())return[];
  const words=q.toLowerCase().split(/[\s,\.!?;:]+/).filter(w=>w.length>1);
  const scores={};
  SEARCH_MAP.forEach(entry=>{
    let score=0;
    words.forEach(w=>{
      entry.words.forEach(kw=>{
        if(kw.includes(w)||w.includes(kw))score+=kw===w?3:1;
      });
    });
    if(score>0)scores[entry.id]=score;
  });
  return Object.entries(scores).sort((a,b)=>b[1]-a[1]).map(([id])=>id);
}

SCREENS.scriptSearch=()=>{
  const q=UI.searchQ||'';
  const results=searchScripts(q);
  const hasResults=results.length>0;
  return `${C.TopHeader('Find Your Script')}
  <p class="muted small" style="margin:-4px 0 16px">Describe what's troubling you and we'll find the right healing script.</p>
  <div style="position:relative;margin-bottom:16px">
    <input id="scriptSearchInput" class="nameinput" placeholder="e.g. fight with my wife, money stress…"
      value="${esc(q)}" style="padding-right:44px;background:var(--ivory)"
      autocomplete="off" spellcheck="true">
    ${q?`<button data-a="clearSearch" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;padding:4px;cursor:pointer;color:var(--muted)">${svg('close','',1.3)}</button>`:''}
  </div>
  <div class="row wrap" style="gap:8px;margin-bottom:24px">
    ${CHIPS_SEARCH.map(c=>`<button class="chip" aria-pressed="${q===c.q}" data-a="searchChip" data-v="${esc(c.q)}">${esc(c.label)}</button>`).join('')}
  </div>
  ${!q?`<div class="stack" style="align-items:center;padding:40px 0;gap:12px;opacity:.5">
    ${svg('flower','',3)}
    <p class="muted small center">Type your situation above<br>or pick a topic to get started</p>
  </div>`
  :hasResults?`<div class="stack" style="gap:12px">
    <p class="small muted" style="margin-bottom:4px">${results.length} script${results.length>1?'s':''} found</p>
    ${results.slice(0,5).map(id=>{const s=SCR[id];if(!s)return'';return`<button class="card row" data-a="go" data-v="script" data-p="${id}" style="border:0;width:100%;text-align:left;gap:14px">
      <span class="ico" style="width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:var(--${s.color||'sage'}-soft,var(--sage-soft));flex-shrink:0">${svg(s.icon||'leaf','',1.6)}</span>
      <span class="grow">
        <b style="display:block">${esc(s.title)}</b>
        <span class="small muted">${esc(s.blurb)}</span>
      </span>
      ${svg('chev','chev')}
    </button>`;}).join('')}
  </div>`
  :`<div class="stack" style="align-items:center;padding:40px 0;gap:12px">
    ${svg('leaf','',3)}
    <p class="h-sm center">No exact match</p>
    <p class="muted small center">Try different words, or browse all scripts below</p>
    <button class="btn btn-secondary" data-a="tab" data-v="situations">Browse all situations</button>
  </div>`}`;
};

AFTER.scriptSearch=()=>{
  const inp=$('#scriptSearchInput');
  if(inp){
    inp.addEventListener('input',()=>{UI.searchQ=inp.value;rerender()});
    if(!UI.searchQ)inp.focus();
  }
};

Object.assign(ACT,{
  searchChip:v=>{UI.searchQ=v;go('scriptSearch')},
  clearSearch:()=>{UI.searchQ='';rerender()}
});

/* Add "Find my script" entry to the top of the situations screen */
const _sit=SCREENS.situations;
SCREENS.situations=()=>_sit().replace(
  C.TopHeader('Healing for Situations'),
  C.TopHeader('Healing for Situations')+
  `<button class="card row" data-a="go" data-v="scriptSearch" style="border:0;width:100%;text-align:left;gap:14px;margin-bottom:4px;background:linear-gradient(120deg,#EEF4FF,#E6EEFF)">
    <span class="ico" style="width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:#D4E2FF;flex-shrink:0">${svg('search','',1.6)}</span>
    <span class="grow">
      <b style="display:block">Find my script</b>
      <span class="small muted">Describe your situation — we'll match it</span>
    </span>
    ${svg('chev','chev')}
  </button>`
);
