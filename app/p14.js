/* ================= MALA COUNTER + DAILY HEALING FEED ================= */
(function(){

var _mStyle=document.createElement('style');
_mStyle.textContent=
'.mala-wrap{display:flex;flex-direction:column;align-items:center;padding:24px 20px 48px;min-height:80vh}'+
'.mala-ring{position:relative;width:250px;height:250px;margin:20px 0}'+
'.mala-ring svg{width:100%;height:100%;transform:rotate(-90deg)}'+
'.mala-mid{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}'+
'.mala-n{font-family:var(--serif);font-size:4.5rem;font-weight:700;color:var(--ink);line-height:1}'+
'.mala-denom{font-size:.82rem;color:var(--muted);letter-spacing:.06em}'+
'.mala-phrases{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:4px 0 20px}'+
'.mala-ph{font-size:.78rem;padding:5px 13px;border-radius:20px;background:var(--beige);color:var(--ink);opacity:.75}'+
'.mala-btn{width:100%;max-width:320px;min-height:88px;font-size:1rem;font-family:var(--serif);border-radius:var(--r-lg);background:var(--sage);color:#fff;border:0;cursor:pointer;line-height:1.4;transition:transform .1s,box-shadow .1s;box-shadow:0 8px 24px -8px rgba(88,127,88,.5);touch-action:manipulation}'+
'.mala-btn:active{transform:scale(.96);box-shadow:0 2px 8px -4px rgba(88,127,88,.4)}'+
'.mala-done{text-align:center;padding:16px 0 8px}'+
'.mala-streak{margin-top:16px;font-size:.82rem;color:var(--muted);text-align:center}'+
'.mala-snd{display:flex;align-items:center;gap:10px;margin-top:18px;font-size:.82rem;color:var(--muted)}';
document.head.appendChild(_mStyle);

function malaKey(){return dk();}
function getMala(){if(!S.mala)S.mala={};return S.mala[malaKey()]||0;}
function setMala(n){if(!S.mala)S.mala={};S.mala[malaKey()]=n;save();}
function malaSndOn(){return S.malaSnd!==false;}  // default on


function malaStreak(){
  if(!S.mala)return 0;
  var streak=0,d=new Date();
  for(var i=0;i<30;i++){
    if(S.mala[dk(d)]>=108){streak++;d.setDate(d.getDate()-1);}
    else if(i===0)return streak;
    else break;
  }
  return streak;
}

function ringPath(count){
  var TOTAL=108,r=110,cx=125,cy=125;
  var circ=2*Math.PI*r;
  var pct=Math.min(1,count/TOTAL);
  var dash=pct*circ;
  return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--beige)" stroke-width="16"/>'+
    '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--sage)" stroke-width="16"'+
    ' stroke-dasharray="'+dash.toFixed(1)+' '+circ.toFixed(1)+'" stroke-linecap="round"'+
    ' style="transition:stroke-dasharray .25s ease"/>';
}

SCREENS.mala=function(){
  var count=getMala();
  var done=count>=108;
  var streak=malaStreak();
  var sndOn=malaSndOn();
  return '<div class="view-inner"><div class="mala-wrap">'+
    '<h1 style="font-family:var(--serif);font-size:1.45rem;margin:0 0 2px">Mala Counter</h1>'+
    '<p class="small muted" style="margin:0 0 4px;text-align:center">Say each phrase with every tap &mdash; 108 rounds</p>'+
    '<div class="mala-ring"><svg viewBox="0 0 250 250">'+ringPath(count)+'</svg>'+
    '<div class="mala-mid">'+
    '<span class="mala-n">'+count+'</span>'+
    '<span class="mala-denom">OF 108</span>'+
    '</div></div>'+
    '<div class="mala-phrases">'+
    '<span class="mala-ph">I\'m sorry</span>'+
    '<span class="mala-ph">Please forgive me</span>'+
    '<span class="mala-ph">Thank you</span>'+
    '<span class="mala-ph">I love you</span>'+
    '</div>'+
    (done
      ? '<div class="mala-done">'+
        '<p class="serif" style="font-size:1.2rem;color:var(--sage);margin:0">&#10024; 108 rounds complete &#10024;</p>'+
        '<p class="small muted" style="margin:8px 0 16px">Wonderful practice today.</p>'+
        '</div>'+
        '<button class="btn btn-secondary" data-a="malareset">Start fresh</button>'
      : '<button class="mala-btn" data-a="malatap" id="malabtn">'+
        'Tap &bull; I\'m sorry &bull; Please forgive me<br>Thank you &bull; I love you'+
        '</button>'+
        (count>0 ? '<button class="link small muted" data-a="malareset" style="margin-top:16px">Reset ('+count+' so far)</button>' : '')+
        '<p class="small muted" style="margin-top:18px;text-align:center">Double-tap to undo last</p>'
    )+
    (streak>=2 ? '<div class="mala-streak">&#127754; '+streak+'-day streak</div>' : '')+
    // Sound toggle
    '<div class="mala-snd">'+
    '<span>🎵 Tibetan Bowl</span>'+
    '<button class="tgl" role="switch" aria-checked="'+sndOn+'" data-a="malasnd" aria-label="Tibetan Bowl sound"></button>'+
    '</div>'+
    '</div></div>';
};

ACT.malasnd=function(){
  S.malaSnd=!malaSndOn();
  save();
  rerender();
};

ACT.malatap=function(){};  // placeholder overwritten below

// undo on double-tap
var _malaPrevTap=0;
ACT.malatap=function(){
  var now=Date.now();
  if(now-_malaPrevTap<400){
    var c=getMala();
    if(c>0){setMala(c-1);rerender();}
    _malaPrevTap=0;
    return;
  }
  _malaPrevTap=now;

  // Start bowl on first tap — guaranteed user gesture on Android
  if(malaSndOn())startBowlLoop();

  var count=getMala();
  if(count>=108)return;
  var next=count+1;
  setMala(next);
  if(next===108){
    rerender();
    toast('✨ 108 complete! Beautiful practice.');
  }else{
    var el=document.querySelector('.mala-n');
    var ring=document.querySelector('.mala-ring svg circle:last-child');
    if(el)el.textContent=next;
    if(ring){
      var r=110,circ=2*Math.PI*r,dash=(Math.min(1,next/108)*circ).toFixed(1);
      ring.setAttribute('stroke-dasharray',dash+' '+circ.toFixed(1));
    }
    if(!el)rerender();
    try{if(navigator.vibrate)navigator.vibrate(20);}catch(e){}
  }
};

ACT.malareset=function(){setMala(0);rerender();};

// Tibetan bowl loop audio
var _malaAudio=null;
function startBowlLoop(){
  if(_malaAudio)return;
  _malaAudio=document.createElement('audio');
  _malaAudio.src='tibetan-bowl.mp3';
  _malaAudio.loop=true;
  _malaAudio.volume=0.45;
  _malaAudio.play().catch(function(){});
}
function stopBowlLoop(){
  if(!_malaAudio)return;
  _malaAudio.pause();
  _malaAudio.src='';
  _malaAudio=null;
}

// Screen opens — bowl starts on first tap (Android needs user gesture for audio)
AFTER.mala=function(){};

// Stop bowl when navigating away
var _tab14=tab;
tab=function(n){stopBowlLoop();_tab14(n);};
var _go14=go;
go=function(n,p){stopBowlLoop();_go14(n,p);};
var _back14=back;
back=function(){stopBowlLoop();_back14();};

// Restart/stop bowl when sound toggle changes
var _origMalaSnd=ACT.malasnd;
ACT.malasnd=function(){
  S.malaSnd=!malaSndOn();
  save();
  if(malaSndOn())startBowlLoop();else stopBowlLoop();
  rerender();
};

// ---- Daily Healing Feed styles ----
var _dhStyle=document.createElement('style');
_dhStyle.textContent=
'.dhfeed{margin-top:22px}'+
'.dhfeed-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;gap:14px;padding:4px 0 14px}'+
'.dhfeed-track::-webkit-scrollbar{display:none}'+
'.dhaff{flex:0 0 78vw;max-width:290px;min-height:160px;scroll-snap-align:start;border-radius:24px;padding:24px 22px 20px;display:flex;flex-direction:column;gap:12px;text-align:left;border:0;cursor:pointer;transition:transform .15s;box-shadow:0 8px 20px -10px rgba(0,0,0,.18)}'+
'.dhaff:active{transform:scale(.97)}'+
'.dhaff-label{font-size:.72rem;letter-spacing:.16em;font-weight:700;opacity:.65;text-transform:uppercase}'+
'.dhaff-text{font-family:var(--serif);font-size:1.28rem;font-weight:600;line-height:1.5;flex:1}'+
'.dhaff-hint{font-size:.78rem;opacity:.55;margin-top:auto;padding-top:8px}';
document.head.appendChild(_dhStyle);

function dailyHealingFeed(){
  if(!window.MORNING||!MORNING.length)return '';
  var day=new Date().getDate();
  var cards=MORNING.map(function(sec,si){
    var idx=(day+si*7)%sec.lines.length;
    var line=sec.lines[idx];
    var text=typeof line==='string'?line:(line&&line.t)||'';
    return {label:sec.title,text:text,bg:sec.card,ink:sec.ink,sid:sec.id};
  });
  var items=cards.map(function(c){
    return '<button class="dhaff" style="background:'+c.bg+';color:'+c.ink+'" data-a="dhaffplay" data-v="'+c.sid+'">'
      +'<span class="dhaff-label">'+esc(c.label)+'</span>'
      +'<span class="dhaff-text">'+esc(c.text)+'</span>'
      +'<span class="dhaff-hint">Tap to read all &rarr;</span>'
      +'</button>';
  }).join('');
  return '<div class="dhfeed">'
    +'<div class="section-h"><h2>Daily Healing</h2></div>'
    +'<div class="dhfeed-track">'+items+'</div>'
    +'</div>';
}

ACT.dhaffplay=function(v){ACT.mplay(v);};

// Add Mala tile + Daily Healing Feed to home screen
var _home14=SCREENS.home;
SCREENS.home=function(p){
  var html=_home14(p);
  var malaIcon='<svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:2px"><circle cx="22" cy="21" r="16" stroke="#8FAF8C" stroke-width="3" fill="none"/><circle cx="22" cy="5" r="3" fill="#8FAF8C"/><circle cx="38" cy="21" r="2.2" fill="#B5945A" opacity=".7"/><circle cx="22" cy="37" r="2.2" fill="#B5945A" opacity=".7"/><circle cx="6" cy="21" r="2.2" fill="#B5945A" opacity=".7"/><circle cx="33" cy="9" r="2" fill="#B5945A" opacity=".6"/><circle cx="33" cy="33" r="2" fill="#B5945A" opacity=".6"/><circle cx="11" cy="33" r="2" fill="#B5945A" opacity=".6"/><circle cx="11" cy="9" r="2" fill="#B5945A" opacity=".6"/></svg>';
  html=html.replace(
    'data-a="tab" data-v="meditations">',
    'data-a="go" data-v="mala">'+malaIcon+'Mala Counter</button><button class="tile" style="background:#F8DDD2" data-a="tab" data-v="meditations">'
  );
  html=html+dailyHealingFeed();
  return html;
};

})();
