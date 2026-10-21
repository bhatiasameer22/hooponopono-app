/* ================= GRATITUDE JOURNAL ================= */
(function(){

var _gjStyle=document.createElement('style');
_gjStyle.textContent=
'.gj-wrap{display:flex;flex-direction:column;padding:20px 20px 60px;min-height:80vh;max-width:480px;margin:0 auto}'+
'.gj-date{font-size:.8rem;color:var(--muted);text-align:center;margin-bottom:18px;letter-spacing:.05em;text-transform:uppercase}'+
'.gj-entry{display:flex;flex-direction:column;gap:14px;margin-bottom:24px}'+
'.gj-field{display:flex;flex-direction:column;gap:6px}'+
'.gj-label{font-size:.78rem;color:var(--muted);font-weight:600;letter-spacing:.06em;text-transform:uppercase}'+
'.gj-input{width:100%;min-height:64px;padding:14px;border-radius:var(--r-md);border:1.5px solid var(--border);background:var(--beige);color:var(--ink);font-family:var(--serif);font-size:1rem;line-height:1.5;resize:none;outline:none}'+
'.gj-input:focus{border-color:var(--sage)}'+
'.gj-saved{text-align:center;padding:10px 0;font-size:.88rem;color:var(--sage);opacity:0;transition:opacity .4s}'+
'.gj-saved.show{opacity:1}'+
'.gj-history{margin-top:8px}'+
'.gj-history-title{font-family:var(--serif);font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:14px}'+
'.gj-day{background:var(--beige);border-radius:var(--r-md);padding:14px 16px;margin-bottom:12px}'+
'.gj-day-date{font-size:.72rem;color:var(--muted);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}'+
'.gj-day-lines{display:flex;flex-direction:column;gap:6px}'+
'.gj-day-line{font-family:var(--serif);font-size:.95rem;color:var(--ink);line-height:1.5;padding-left:16px;position:relative}'+
'.gj-day-line::before{content:"✦";position:absolute;left:0;color:var(--sage);font-size:.7rem;top:3px}'+
'.gj-empty{text-align:center;color:var(--muted);font-size:.88rem;padding:20px 0}';
document.head.appendChild(_gjStyle);

function gjKey(d){
  var dt=d||new Date();
  return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
}

function getGJ(dateKey){
  try{var d=JSON.parse(localStorage.getItem('hoo.gj.'+dateKey)||'null');return d||[];}catch(e){return [];}
}
function saveGJ(dateKey,lines){
  try{localStorage.setItem('hoo.gj.'+dateKey,JSON.stringify(lines));}catch(e){}
}

function formatDateLabel(dateKey){
  var parts=dateKey.split('-');
  var d=new Date(+parts[0],+parts[1]-1,+parts[2]);
  var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate();
}

SCREENS.gratitude=function(){
  var today=gjKey();
  var saved=getGJ(today);
  var v1=saved[0]||'';var v2=saved[1]||'';var v3=saved[2]||'';

  // past 7 days history (excluding today)
  var histHtml='';
  var pastDays=[];
  for(var i=1;i<=7;i++){
    var pd=new Date();pd.setDate(pd.getDate()-i);
    var pk=gjKey(pd);
    var lines=getGJ(pk);
    if(lines.length)pastDays.push({key:pk,lines:lines});
  }
  if(pastDays.length){
    histHtml='<div class="gj-history"><div class="gj-history-title">Past entries</div>';
    pastDays.forEach(function(e){
      histHtml+='<div class="gj-day"><div class="gj-day-date">'+esc(formatDateLabel(e.key))+'</div><div class="gj-day-lines">';
      e.lines.forEach(function(l){if(l)histHtml+='<div class="gj-day-line">'+esc(l)+'</div>';});
      histHtml+='</div></div>';
    });
    histHtml+='</div>';
  }

  return '<div class="view-inner"><div class="gj-wrap">'+
    '<h1 style="font-family:var(--serif);font-size:1.45rem;margin:0 0 2px;text-align:center">Gratitude Journal</h1>'+
    '<p class="small muted" style="text-align:center;margin:0 0 16px">Three things you\'re grateful for today</p>'+
    '<div class="gj-date">'+esc(formatDateLabel(today))+'</div>'+
    '<div class="gj-entry">'+
    '<div class="gj-field"><span class="gj-label">1. I am grateful for</span>'+
    '<textarea class="gj-input" id="gj1" placeholder="Write anything, big or small…">'+esc(v1)+'</textarea></div>'+
    '<div class="gj-field"><span class="gj-label">2. I am grateful for</span>'+
    '<textarea class="gj-input" id="gj2" placeholder="A person, a moment, a feeling…">'+esc(v2)+'</textarea></div>'+
    '<div class="gj-field"><span class="gj-label">3. I am grateful for</span>'+
    '<textarea class="gj-input" id="gj3" placeholder="Something you usually overlook…">'+esc(v3)+'</textarea></div>'+
    '</div>'+
    '<button class="btn" data-a="gjsave" style="width:100%;max-width:320px;margin:0 auto">Save today\'s entry</button>'+
    '<div class="gj-saved" id="gjsaved">✓ Saved with love</div>'+
    (histHtml||'<div class="gj-empty">Your past entries will appear here.</div>')+
    '</div></div>';
};

ACT.gjsave=function(){
  var v1=(document.getElementById('gj1')||{}).value||'';
  var v2=(document.getElementById('gj2')||{}).value||'';
  var v3=(document.getElementById('gj3')||{}).value||'';
  var lines=[v1.trim(),v2.trim(),v3.trim()];
  saveGJ(gjKey(),lines);
  var el=document.getElementById('gjsaved');
  if(el){el.classList.add('show');setTimeout(function(){el.classList.remove('show');},2000);}
  toast('Gratitude saved ✨');
};

// Rate & Share actions
ACT.rateapp=function(){
  var url='https://play.google.com/store/apps/details?id=com.hooponopono.healing';
  if(window.AndroidApp&&AndroidApp.openUrl)AndroidApp.openUrl(url);
  else window.open(url,'_blank');
};
ACT.shareapp=function(){
  var msg='Try Ho\'oponopono: Heal & Meditate — a beautiful app for healing, meditation and daily affirmations.\nhttps://play.google.com/store/apps/details?id=com.hooponopono.healing';
  if(navigator.share){navigator.share({text:msg}).catch(function(){});}
  else if(window.AndroidApp&&AndroidApp.share)AndroidApp.share(msg,'Ho\'oponopono App');
  else{try{navigator.clipboard.writeText(msg);}catch(e){}toast('Link copied ✨');}
};

// Add Rate & Share to More screen
var _more15=SCREENS.more;
SCREENS.more=function(p){
  return _more15(p).replace(
    '<button class="li" data-a="go" data-v="reminders">',
    '<button class="li" data-a="rateapp">'+
      '<span class="ico" style="background:#FFF3E0;color:#E88B00">'+svg('star')+'</span>'+
      '<span class="grow">Rate the App</span>'+
      '<span class="small muted">Leave a review ★</span>'+
    '</button>'+
    '<button class="li" data-a="shareapp">'+
      '<span class="ico" style="background:#E8F5E9;color:#388E3C">'+svg('share')+'</span>'+
      '<span class="grow">Share the App</span>'+
      '<span class="small muted">Tell a friend</span>'+
    '</button>'+
    '<button class="li" data-a="go" data-v="reminders">'
  );
};

// Add Gratitude tile to home screen
var _home15=SCREENS.home;
SCREENS.home=function(p){
  var html=_home15(p);
  var gjIcon='<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:2px"><rect x="6" y="5" width="28" height="30" rx="4" stroke="#8FAF8C" stroke-width="2.2" fill="none"/><line x1="12" y1="13" x2="28" y2="13" stroke="#8FAF8C" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="20" x2="28" y2="20" stroke="#8FAF8C" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="27" x2="22" y2="27" stroke="#8FAF8C" stroke-width="2" stroke-linecap="round"/></svg>';
  html=html.replace(
    'data-a="go" data-v="mala">',
    'data-a="go" data-v="gratitude" style="background:#EAF4EA">'+gjIcon+'Gratitude Journal</button><button class="tile" data-a="go" data-v="mala">'
  );
  return html;
};

})();
