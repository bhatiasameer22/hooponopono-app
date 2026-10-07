/* ================= MUSIC TRACK SLIDER (home) =================
   To add a track: put <name>.ogg + <name>.mp3 beside the app, a thumbnail in img/, and add one entry to MEDS with audio:'<name>.mp3', added:'YYYY-MM-DD'. */
MED.mantra.added='2026-09-29';MED.choosepeace.added='2026-10-03';MED.mantra21.added='2026-10-04';MED.dearself.added='2026-10-04';MED.dearmoney.added='2026-10-04';MED.dearbody.added='2026-10-07';
const tracks=()=>MEDS.filter(m=>m.audio).sort((a,b)=>(b.added||'').localeCompare(a.added||''));
const _home8=SCREENS.home;
SCREENS.home=p=>{const T=tracks();
 const row=`<section><div class="section-h" style="margin:6px 0 12px"><h2>New tracks</h2><span class="small muted" id="trkpos">1 of ${T.length}</span></div>
  <div class="trks" id="trks">${T.map((m,i)=>`<article class="trk"><button class="trkart" data-a="med" data-v="${m.id}" aria-label="Play ${esc(m.title)}"><img src="${img(m.img)}" alt="" loading="lazy">${i===0?'<span class="trknew">New</span>':''}<span class="trkplay">${svg('play')}</span></button>
   <div class="row between" style="margin-top:10px"><div class="grow"><b style="display:block;font-size:1.02rem">${esc(m.title)}</b><span class="small muted">${m.min} min · ${esc(m.tag)}</span></div>
   <button class="iconbtn" data-a="trkfav" data-v="${m.id}" aria-pressed="${S.favs.includes(m.id)}" aria-label="Favourite" style="color:${S.favs.includes(m.id)?'var(--rose)':'var(--muted)'}">${svg(S.favs.includes(m.id)?'heartFill':'heart')}</button></div></article>`).join('')}</div></section>`;
 return _home8(p).replace('<button class="today"',row+'<button class="today"')};
const _afterHome8=AFTER.home;
AFTER.home=()=>{_afterHome8&&_afterHome8();const t=$('#trks');if(!t)return;t.onscroll=()=>{const c=t.firstElementChild;if(!c)return;const k=Math.round(t.scrollLeft/(c.offsetWidth+14));$('#trkpos').textContent=`${Math.min(t.children.length,k+1)} of ${t.children.length}`};window.__ACT_KEYS=Object.keys(ACT)};
ACT.trkfav=v=>{const i=S.favs.indexOf(v);if(i>=0)S.favs.splice(i,1);else S.favs.push(v);save();const sl=$('#trks').scrollLeft;rerender();$('#trks').scrollLeft=sl;toast(i>=0?'Removed from favourites':'Added to favourites')};
