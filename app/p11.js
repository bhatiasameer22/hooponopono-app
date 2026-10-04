/* ================= AFFIRMATION REELS (p11) ================= */

// Build a shuffled feed from MORNING section lines + AFFS
const REEL_CARDS=(()=>{
  const cards=[];

  // Each morning section has its own gradient + ink color
  MORNING.forEach(sec=>{
    sec.lines.forEach((line,i)=>{
      cards.push({id:'m:'+sec.id+':'+i,text:line,bg:sec.bg,ink:sec.ink,orb:sec.orb,cat:sec.title,icon:sec.icon});
    });
  });

  // AFFS with matching visual styles
  const CM={
    self:  {bg:'linear-gradient(165deg,#FFF3F6 0%,#F9D7E0 55%,#F0B6C8 100%)',ink:'#B04A6E',orb:'#FFD3DF'},
    forgive:{bg:'linear-gradient(165deg,#F2FAF1 0%,#D6EAD5 55%,#B9DBBC 100%)',ink:'#3F7550',orb:'#D7F0D2'},
    peace:  {bg:'linear-gradient(165deg,#F6F2FF 0%,#DFD5F7 55%,#C9B9EE 100%)',ink:'#6A5A99',orb:'#E3D4FF'},
    abundance:{bg:'linear-gradient(165deg,#FFFAEC 0%,#F6E6B8 55%,#EACD8B 100%)',ink:'#8A6516',orb:'#FFE9A8'}
  };
  const CNAMES={self:'Self Love',forgive:'Forgiveness',peace:'Peace',abundance:'Abundance'};
  AFFS.forEach(a=>{
    const c=CM[a.c]||CM.self;
    cards.push({id:a.id,text:a.t,cat:CNAMES[a.c]||a.c,icon:'flower',...c});
  });

  // Meditation guided lines
  const MED_CM={
    anxiety:{bg:'linear-gradient(165deg,#F0F6FF 0%,#D8ECF8 55%,#C0DDEF 100%)',ink:'#3A6191',orb:'#C2D9F2'},
    healing:{bg:'linear-gradient(165deg,#FAF0FF 0%,#EDD5FB 55%,#DFB8F5 100%)',ink:'#7A42A8',orb:'#E8D0FF'},
    sleep:  {bg:'linear-gradient(165deg,#EEF0FF 0%,#D5D0F7 55%,#BAB5EE 100%)',ink:'#4A3D9B',orb:'#D0CCFF'}
  };
  const MED_DFLT={bg:'linear-gradient(165deg,#F2FAF1 0%,#D8EDD6 55%,#C0DEBC 100%)',ink:'#3F7550',orb:'#D7F0D2'};
  MEDS.forEach(med=>{
    if(!Array.isArray(med.lines)||!med.lines.length)return;
    const cat=(med.cats&&med.cats[0])||'';
    const c=MED_CM[cat]||MED_DFLT;
    med.lines.forEach((line,i)=>{
      if(typeof line!=='string'||!line.trim())return;
      cards.push({id:'med:'+med.id+':'+i,text:line,cat:med.title,icon:'leaf',...c});
    });
  });

  // Fisher-Yates shuffle so the order is different each session
  for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]];}
  return cards;
})();

SCREENS.reel=()=>`<div class="reel-wrap" id="reelWrap">
  <button class="iconbtn reel-back" data-a="back" aria-label="Close">${svg('close','',2)}</button>
  <div class="reel-feed" id="reelFeed" role="feed" aria-label="Healing affirmations">
    ${REEL_CARDS.map((c,i)=>{
      const liked=S.affFavs.includes(c.id);
      return `<article class="reel-card" style="background:${c.bg};color:${c.ink}" aria-label="${esc(T(c.text))}">
        <div class="reel-orb" style="background:${c.orb}"></div>
        <div class="reel-cat">${svg(c.icon||'flower','',1.6)}<span>${esc(T(c.cat))}</span></div>
        <p class="reel-txt">${esc(T(c.text))}</p>
        <div class="reel-actions">
          <button class="reel-btn reel-like${liked?' liked':''}" data-a="rellove" data-v="${c.id}" aria-pressed="${liked}" aria-label="${liked?'Saved':'Save to favourites'}" style="color:${c.ink}">${svg(liked?'heartFill':'heart','',2)}</button>
          <button class="reel-btn" data-a="relshare" data-v="${i}" aria-label="Share affirmation" style="color:${c.ink}">${svg('sparkle','',2)}</button>
        </div>
        <div class="reel-mantra">${MANTRA.map(m=>`<span>${esc(T(m))}</span>`).join('<span style="opacity:.4"> · </span>')}</div>
        ${i===0?`<div class="reel-hint">${svg('down','',2)}<span>Swipe up for more</span></div>`:''}
      </article>`;
    }).join('')}
  </div>
</div>`;

AFTER.reel=()=>{
  // Hide bottom nav — the reel is full-screen
  const nav=$('#nav');
  if(nav)nav.hidden=true;
};

Object.assign(ACT,{
  rellove:(v,el)=>{
    const i=S.affFavs.indexOf(v);const on=i<0;
    if(on)S.affFavs.push(v);else S.affFavs.splice(i,1);
    save();
    el.setAttribute('aria-pressed',on);
    el.setAttribute('aria-label',on?'Saved':'Save to favourites');
    el.innerHTML=svg(on?'heartFill':'heart','',2);
    el.classList.toggle('liked',on);
    toast(on?'Saved to favourites':'Removed from favourites');
  },
  relshare:(v,el)=>{
    const card=REEL_CARDS[Number(v)];if(!card)return;
    const text='"'+card.text+'"\n\nHo\'oponopono · Heal · Forgive · Release · Love';
    const n=NAT();
    if(n&&n.share){try{n.share(text,'');return}catch(e){}}
    if(navigator.share){navigator.share({text}).catch(()=>{});return}
    if(navigator.clipboard)navigator.clipboard.writeText(text).then(()=>toast('Copied to clipboard')).catch(()=>toast('Long-press to copy'));
    else toast('Long-press to copy');
  }
});

/* ---- Add Daily Healing Feed button to Meditations tab ---- */
const _medsReel=SCREENS.meditations;
SCREENS.meditations=p=>{
  const entry=`<button class="reel-entry" data-a="go" data-v="reel" style="margin-bottom:14px">
    <span class="reel-entry-orb"></span>
    <span class="row" style="gap:14px;align-items:center;position:relative">
      <span class="reel-entry-icon">${svg('flower','',2)}</span>
      <span class="grow" style="text-align:left">
        <b style="display:block;font-size:1.05rem">Daily Healing Feed</b>
        <span class="small" style="opacity:.7">${REEL_CARDS.length} affirmations &amp; meditation lines</span>
      </span>
      ${svg('chev','chev',2)}
    </span>
  </button>`;
  return _medsReel(p).replace('<div class="mlist"', entry+'<div class="mlist"');
};

/* ---- Add "Healing Affirmations Feed" entry card to the home screen ---- */
const _homeReel=SCREENS.home;
SCREENS.home=p=>{
  const entry=`<button class="reel-entry" data-a="go" data-v="reel">
    <span class="reel-entry-orb"></span>
    <span class="row" style="gap:14px;align-items:center;position:relative">
      <span class="reel-entry-icon">${svg('flower','',2)}</span>
      <span class="grow" style="text-align:left">
        <b style="display:block;font-size:1.05rem">Daily Healing Feed</b>
        <span class="small" style="opacity:.7">Swipe through ${REEL_CARDS.length} healing lines</span>
      </span>
      ${svg('chev','chev',2)}
    </span>
  </button>`;
  // Insert just before the MantraCard (class="today")
  return _homeReel(p).replace('<button class="today"',entry+'<button class="today"');
};
