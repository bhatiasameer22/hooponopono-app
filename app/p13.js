/* ================= MOOD TRACKING (daily practice before/after) ================= */
(function(){
/* inject CSS once */
const _moodStyle=document.createElement('style');
_moodStyle.textContent=`
.moodcard{background:var(--ivory);border-radius:var(--r-md);padding:18px 16px 20px;margin-bottom:14px;text-align:center;border:1.5px solid var(--line)}
.moodcard .mcard-title{font-family:var(--serif);font-size:1.08rem;font-weight:600;margin:0 0 3px;color:var(--ink)}
.moodcard .mcard-sub{font-size:.8rem;color:var(--muted);margin:0 0 16px}
.moodrow{display:flex;justify-content:center;gap:6px}
.moodbtn{font-size:1.7rem;width:52px;height:52px;border:2px solid transparent;border-radius:50%;background:var(--beige);cursor:pointer;transition:transform .15s,border-color .15s,background .15s;display:flex;align-items:center;justify-content:center;padding:0}
.moodbtn.msel{border-color:var(--sage);background:var(--sage-soft);transform:scale(1.14)}
.moodshift{background:var(--ivory);border-radius:var(--r-md);padding:16px;margin-bottom:14px;border:1.5px solid var(--line)}
.moodshift-title{font-family:var(--serif);font-size:1rem;font-weight:600;color:var(--ink);margin:0 0 12px;text-align:center}
.moodshift-row{display:flex;align-items:center;justify-content:center;gap:10px}
.moodshift-col{text-align:center;flex:1}
.moodshift-col span.label{display:block;font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
.moodshift-col span.emo{font-size:2.2rem;line-height:1;display:block}
.moodshift-col span.name{display:block;font-size:.78rem;color:var(--muted);margin-top:3px}
.moodarrow{font-size:1.2rem;color:var(--sage);flex:none}
`;
document.head.appendChild(_moodStyle);

const MOODS=[
 {v:1,e:'😔',n:'Heavy'},
 {v:2,e:'😐',n:'Low'},
 {v:3,e:'🙂',n:'Okay'},
 {v:4,e:'😌',n:'Calm'},
 {v:5,e:'❤️',n:'Peaceful'}
];

function todayMood(){
 if(!S.moods)S.moods=[];
 return S.moods.find(m=>m.date===dk())||null;
}
function moodEmoji(v){return v?(MOODS[v-1]||MOODS[2]).e:''}
function moodName(v){return v?(MOODS[v-1]||MOODS[2]).n:''}

function preMoodCard(){
 const m=todayMood();
 if(m&&m.pre){
  /* already set — show small confirmation */
  return `<div class="moodcard" style="padding:14px 16px"><p class="mcard-title" style="font-size:.95rem">Before practice</p><div class="moodrow" style="margin-top:10px">${MOODS.map(x=>`<button class="moodbtn${x.v===m.pre?' msel':''}" data-a="setmood" data-v="pre:${x.v}" aria-label="${x.n}" aria-pressed="${x.v===m.pre}">${x.e}</button>`).join('')}</div></div>`;
 }
 return `<div class="moodcard"><p class="mcard-title">How are you feeling right now?</p><p class="mcard-sub">Before you begin today’s practice</p><div class="moodrow">${MOODS.map(x=>`<button class="moodbtn" data-a="setmood" data-v="pre:${x.v}" aria-label="${x.n}">${x.e}</button>`).join('')}</div></div>`;
}

function postMoodCard(doneCnt){
 if(doneCnt<3)return'';
 const m=todayMood();
 if(m&&m.post){
  /* both recorded — show the shift */
  return `<div class="moodshift"><p class="moodshift-title">Your shift today</p><div class="moodshift-row"><div class="moodshift-col"><span class="label">Before</span><span class="emo">${moodEmoji(m.pre)}</span><span class="name">${moodName(m.pre)}</span></div><span class="moodarrow">&#8594;</span><div class="moodshift-col"><span class="label">After</span><span class="emo">${moodEmoji(m.post)}</span><span class="name">${moodName(m.post)}</span></div></div></div>`;
 }
 return `<div class="moodcard"><p class="mcard-title">How do you feel now?</p><p class="mcard-sub">After your practice today</p><div class="moodrow">${MOODS.map(x=>`<button class="moodbtn" data-a="setmood" data-v="post:${x.v}" aria-label="${x.n}">${x.e}</button>`).join('')}</div></div>`;
}

/* wrap daily screen */
const _daily13=SCREENS.daily;
SCREENS.daily=function(p){
 const html=_daily13(p);
 const done=(S.practice[dk()]||[]);
 const doneCnt=done.length;
 /* inject pre-mood before the jhero hero block; inject post-mood before "Deeper practices" */
 return html
  .replace('<div class="jhero"',preMoodCard()+'<div class="jhero"')
  .replace(C.SectionHeader('Deeper practices'),postMoodCard(doneCnt)+C.SectionHeader('Deeper practices'));
};

/* action handler */
ACT.setmood=function(v){
 if(!S.moods)S.moods=[];
 const parts=v.split(':');const type=parts[0];const val=Number(parts[1]);
 const today=dk();
 let entry=S.moods.find(m=>m.date===today);
 if(!entry){entry={date:today,pre:null,post:null};S.moods.push(entry);}
 entry[type]=val;
 save();
 rerender();
 if(type==='pre')toast('Noted – begin whenever you’re ready.');
 else toast('Beautiful. You showed up for yourself today ❤️');
};
})();
