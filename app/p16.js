/* ================= ONBOARDING ================= */
(function(){

var OB_SLIDES=[
  {
    emoji:'🌺',
    bg:'linear-gradient(160deg,#FDE8D8,#FFF3EC)',
    title:'Welcome to Ho\'oponopono',
    body:'An ancient Hawaiian healing practice using four powerful phrases to release guilt, heal relationships, and restore inner peace.',
    accent:'#C26B3A'
  },
  {
    emoji:'🙏',
    bg:'linear-gradient(160deg,#E8F0E8,#F2F8F2)',
    title:'Four Healing Phrases',
    body:'"I\'m sorry. Please forgive me. Thank you. I love you."\n\nRepeat these with intention to clean painful memories and open your heart.',
    accent:'#4A7A4A'
  },
  {
    emoji:'📿',
    bg:'linear-gradient(160deg,#EDE6F5,#F5F0FB)',
    title:'Mala Counter',
    body:'Count 108 repetitions the traditional way. Tap the button with each mantra — a Tibetan bowl plays softly to keep you grounded.',
    accent:'#6A4A9A'
  },
  {
    emoji:'🎵',
    bg:'linear-gradient(160deg,#E8EDF8,#EFF3FD)',
    title:'Healing Music & Scripts',
    body:'Listen to guided meditations and healing songs. Follow written scripts for specific situations — money, relationships, self-love and more.',
    accent:'#3A5A9A'
  },
  {
    emoji:'✨',
    bg:'linear-gradient(160deg,#FDF5E0,#FDFAF0)',
    title:'Your Daily Practice',
    body:'Start each morning with affirmations, track your gratitude journal, and build a 21-day healing streak.\n\nYour journey begins now.',
    accent:'#8A6A10',
    last:true
  }
];

var _obStyle=document.createElement('style');
_obStyle.textContent=
'#ob-overlay{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;overflow:hidden;-webkit-text-size-adjust:100%;text-size-adjust:100%}'+
'.ob-track{display:flex;flex:1;transition:transform .38s cubic-bezier(.4,0,.2,1)}'+
'.ob-slide{flex:0 0 100vw;width:100vw;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 28px 24px;text-align:center}'+
'.ob-emoji{font-size:80px;line-height:1;margin-bottom:24px;display:block}'+
'.ob-title{font-family:var(--serif);font-size:28px;font-weight:700;line-height:1.3;margin-bottom:16px}'+
'.ob-body{font-size:18px;line-height:1.65;white-space:pre-line;max-width:320px}'+
'.ob-dots{display:flex;gap:8px;justify-content:center;padding:16px 0 8px}'+
'.ob-dot{width:10px;height:10px;border-radius:50%;transition:all .3s}'+
'.ob-dot.active{width:28px;border-radius:5px}'+
'.ob-btns{display:flex;align-items:center;justify-content:space-between;padding:8px 24px 36px;gap:16px}'+
'.ob-skip{background:none;border:0;font-size:17px;opacity:.6;cursor:pointer;padding:12px 16px;color:inherit}'+
'.ob-next{flex:1;max-width:220px;padding:16px 20px;border-radius:var(--r-lg);border:0;font-family:var(--serif);font-size:19px;font-weight:600;cursor:pointer;color:#fff}';
document.head.appendChild(_obStyle);

function obDone(){
  S.onboarded=true;S.nameSet=true;save();
  tab('home');
  var el=document.getElementById('ob-overlay');
  if(el){el.style.transition='opacity .4s';el.style.opacity='0';setTimeout(function(){
    el.remove();
    if(window.__afterOnboarding)window.__afterOnboarding();
  },400);}
}

function animateIn(slide){
  var els=[
    slide.querySelector('.ob-emoji'),
    slide.querySelector('.ob-title'),
    slide.querySelector('.ob-body')
  ];
  // reset to hidden
  els.forEach(function(el){
    if(!el)return;
    el.style.transition='none';
    el.style.opacity='0';
    el.style.transform='translateY(32px)';
  });
  // after one frame, transition to visible with stagger
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      els.forEach(function(el,i){
        if(!el)return;
        el.style.transition='opacity 0.55s ease '+i*120+'ms, transform 0.55s ease '+i*120+'ms';
        el.style.opacity='1';
        el.style.transform='translateY(0)';
      });
    });
  });
}

function buildOnboarding(){
  var idx=0;

  var overlay=document.createElement('div');
  overlay.id='ob-overlay';

  var track=document.createElement('div');
  track.className='ob-track';

  OB_SLIDES.forEach(function(s){
    var slide=document.createElement('div');
    slide.className='ob-slide';
    slide.style.background=s.bg;
    slide.innerHTML=
      '<div class="ob-emoji">'+s.emoji+'</div>'+
      '<div class="ob-title" style="color:'+s.accent+'">'+esc(s.title)+'</div>'+
      '<div class="ob-body" style="color:'+s.accent+'cc">'+esc(s.body)+'</div>';
    track.appendChild(slide);
  });

  var dots=document.createElement('div');
  dots.className='ob-dots';
  OB_SLIDES.forEach(function(_,i){
    var d=document.createElement('div');
    d.className='ob-dot'+(i===0?' active':'');
    dots.appendChild(d);
  });

  var btns=document.createElement('div');
  btns.className='ob-btns';

  var skip=document.createElement('button');
  skip.className='ob-skip';
  skip.textContent='Skip';
  skip.onclick=obDone;

  var next=document.createElement('button');
  next.className='ob-next';
  next.style.background=OB_SLIDES[0].accent;
  next.textContent='Next';

  btns.appendChild(skip);
  btns.appendChild(next);

  overlay.appendChild(track);
  overlay.appendChild(dots);
  overlay.appendChild(btns);

  function updateSlide(i){
    idx=i;
    track.style.transform='translateX(-'+i*100+'vw)';
    overlay.style.background=OB_SLIDES[i].bg;
    dots.querySelectorAll('.ob-dot').forEach(function(d,di){
      d.classList.toggle('active',di===i);
      d.style.background=di===i?OB_SLIDES[i].accent:'rgba(0,0,0,.2)';
    });
    next.style.background=OB_SLIDES[i].accent;
    if(OB_SLIDES[i].last){
      next.textContent='Begin Healing';
      skip.style.visibility='hidden';
    }else{
      next.textContent='Next';
      skip.style.visibility='visible';
    }
    animateIn(track.children[i]);
  }

  next.onclick=function(){
    if(idx>=OB_SLIDES.length-1)obDone();
    else updateSlide(idx+1);
  };

  var tx=0;
  overlay.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
  overlay.addEventListener('touchend',function(e){
    var dx=tx-e.changedTouches[0].clientX;
    if(dx>40&&idx<OB_SLIDES.length-1)updateSlide(idx+1);
    else if(dx<-40&&idx>0)updateSlide(idx-1);
  },{passive:true});

  return {overlay:overlay,start:function(){updateSlide(0);}};
}

// Show onboarding on first launch
var _origRender=render;
render=function(){
  _origRender.apply(this,arguments);
  if(!S.onboarded){
    setTimeout(function(){
      if(!document.getElementById('ob-overlay')){
        var ob=buildOnboarding();
        document.body.appendChild(ob.overlay);
        // start animations after overlay is in DOM
        setTimeout(function(){ob.start();},50);
      }
    },300);
  }
};

})();
