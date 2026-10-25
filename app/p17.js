/* ================= PAYWALL / PREMIUM ================= */
(function(){

var _pwStyle=document.createElement('style');
_pwStyle.textContent=
'#pw-wrap{display:flex;flex-direction:column;align-items:center;padding:28px 20px 60px;max-width:460px;margin:0 auto;text-align:center}'+
'.pw-lotus{font-size:64px;line-height:1;margin-bottom:12px}'+
'.pw-title{font-family:var(--serif);font-size:1.6rem;font-weight:700;color:var(--ink);margin:0 0 6px}'+
'.pw-sub{font-size:.95rem;color:var(--muted);margin:0 0 22px;line-height:1.5}'+
'.pw-features{width:100%;background:var(--beige);border-radius:var(--r-lg);padding:18px 20px;margin-bottom:24px;text-align:left;display:flex;flex-direction:column;gap:10px}'+
'.pw-feat{display:flex;align-items:center;gap:12px;font-size:.95rem;color:var(--ink)}'+
'.pw-feat-icon{width:28px;height:28px;border-radius:50%;background:var(--sage);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.85rem}'+
'.pw-plans{width:100%;display:flex;flex-direction:column;gap:12px;margin-bottom:20px}'+
'.pw-plan{width:100%;padding:16px 18px;border-radius:var(--r-lg);border:2px solid var(--border);background:var(--card);cursor:pointer;text-align:left;display:flex;align-items:center;justify-content:space-between;transition:border-color .2s}'+
'.pw-plan.selected{border-color:var(--sage);background:var(--beige)}'+
'.pw-plan-left{display:flex;flex-direction:column;gap:2px}'+
'.pw-plan-name{font-family:var(--serif);font-size:1.05rem;font-weight:700;color:var(--ink)}'+
'.pw-plan-period{font-size:.8rem;color:var(--muted)}'+
'.pw-plan-price{font-family:var(--serif);font-size:1.2rem;font-weight:700;color:var(--sage)}'+
'.pw-plan-badge{background:var(--gold,#C8860A);color:#fff;font-size:.7rem;font-weight:700;padding:3px 8px;border-radius:20px;letter-spacing:.04em}'+
'.pw-plan-right{display:flex;flex-direction:column;align-items:flex-end;gap:4px}'+
'.pw-cta{width:100%;padding:17px;border-radius:var(--r-lg);background:var(--sage);color:#fff;font-family:var(--serif);font-size:1.1rem;font-weight:700;border:none;cursor:pointer;margin-bottom:12px}'+
'.pw-restore{background:none;border:none;color:var(--muted);font-size:.88rem;cursor:pointer;padding:8px;text-decoration:underline}'+
'.pw-terms{font-size:.72rem;color:var(--muted);line-height:1.5;margin-top:12px;max-width:340px}'+
'.pw-loading{opacity:.5;pointer-events:none}'+
'.pw-already{background:var(--beige);border-radius:var(--r-lg);padding:20px;width:100%;text-align:center;margin-bottom:16px}'+
'.pw-already-title{font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--sage);margin-bottom:4px}';
document.head.appendChild(_pwStyle);

var _sel='premium_yearly';

SCREENS.premium=function(){
  if(S.premium){
    return '<div class="view-inner"><div id="pw-wrap">'+
      '<div class="pw-lotus">🌺</div>'+
      '<h1 class="pw-title">You\'re Premium</h1>'+
      '<p class="pw-sub">Thank you for supporting Ho\'oponopono.<br>All content is unlocked for you.</p>'+
      '<div class="pw-already">'+
        '<div class="pw-already-title">✨ Full Access Active</div>'+
        '<p style="font-size:.88rem;color:var(--muted);margin:6px 0 0">Enjoy unlimited meditations,<br>healing scripts and music.</p>'+
      '</div>'+
      '<button class="btn" data-a="go" data-v="home">Back to Home</button>'+
    '</div></div>';
  }

  return '<div class="view-inner"><div id="pw-wrap">'+
    '<div class="pw-lotus">🌺</div>'+
    '<h1 class="pw-title">Try Free for 3 Days</h1>'+
    '<p class="pw-sub">Full access to every meditation, script &amp; song.<br>Cancel anytime — no charge for 3 days.</p>'+
    '<div class="pw-features">'+
      '<div class="pw-feat"><div class="pw-feat-icon">🎵</div><span>All meditations &amp; healing music</span></div>'+
      '<div class="pw-feat"><div class="pw-feat-icon">📜</div><span>10+ guided healing scripts</span></div>'+
      '<div class="pw-feat"><div class="pw-feat-icon">✨</div><span>Quantum scripts &amp; 21-day challenge</span></div>'+
      '<div class="pw-feat"><div class="pw-feat-icon">📿</div><span>Unlimited mala counter &amp; 55×5</span></div>'+
      '<div class="pw-feat"><div class="pw-feat-icon">🚫</div><span>No ads, ever</span></div>'+
    '</div>'+
    '<div class="pw-plans">'+
      '<button class="pw-plan" id="pw-monthly" data-a="pwselect" data-v="premium_monthly">'+
        '<div class="pw-plan-left">'+
          '<div class="pw-plan-name">Monthly</div>'+
          '<div class="pw-plan-period">3 days free, then $4.99/month</div>'+
        '</div>'+
        '<div class="pw-plan-right">'+
          '<div class="pw-plan-price">$4.99 / mo</div>'+
        '</div>'+
      '</button>'+
      '<button class="pw-plan selected" id="pw-yearly" data-a="pwselect" data-v="premium_yearly">'+
        '<div class="pw-plan-left">'+
          '<div class="pw-plan-name">Yearly</div>'+
          '<div class="pw-plan-period">3 days free, then $24.99/year</div>'+
        '</div>'+
        '<div class="pw-plan-right">'+
          '<div class="pw-plan-badge">BEST VALUE</div>'+
          '<div class="pw-plan-price">$24.99 / yr</div>'+
        '</div>'+
      '</button>'+
    '</div>'+
    '<button class="pw-cta" id="pw-cta-btn" data-a="pwbuy">Start Free Trial</button>'+
    '<button class="pw-restore" data-a="pwrestore">Restore purchase</button>'+
    '<p class="pw-terms">3-day free trial, then auto-renews. Cancel anytime in Google Play before trial ends. Payment charged to your Google account.</p>'+
  '</div></div>';
};

ACT.pwselect=function(sku){
  _sel=sku;
  var m=document.getElementById('pw-monthly');
  var y=document.getElementById('pw-yearly');
  if(m)m.classList.toggle('selected',sku==='premium_monthly');
  if(y)y.classList.toggle('selected',sku==='premium_yearly');
};

ACT.pwbuy=function(){
  var btn=document.getElementById('pw-cta-btn');
  if(btn)btn.classList.add('pw-loading');
  if(window.AndroidApp&&AndroidApp.purchase){
    AndroidApp.purchase(_sel);
  }else{
    // dev/web fallback — simulate
    setTimeout(function(){
      if(btn)btn.classList.remove('pw-loading');
      toast('Purchase unavailable outside the app');
    },800);
  }
};

ACT.pwrestore=function(){
  toast('Checking purchases…');
  if(window.AndroidApp&&AndroidApp.restorePurchases){
    AndroidApp.restorePurchases();
  }else{
    setTimeout(function(){toast('No purchases found');},800);
  }
};

// Callbacks from Java
window.__purchaseSuccess=function(){
  S.premium=true;save();
  toast('Welcome to Premium! 🌺');
  nav('premium');
};
window.__purchaseCancelled=function(){
  var btn=document.getElementById('pw-cta-btn');
  if(btn)btn.classList.remove('pw-loading');
  var gBtn=document.getElementById('pwg-cta');
  if(gBtn){gBtn.textContent='Start Free Trial';gBtn.style.opacity='';gBtn.style.pointerEvents='';}
  toast('Purchase cancelled');
};
window.__purchaseFailed=function(msg){
  var btn=document.getElementById('pw-cta-btn');
  if(btn)btn.classList.remove('pw-loading');
  var gBtn=document.getElementById('pwg-cta');
  if(gBtn){gBtn.textContent='Start Free Trial';gBtn.style.opacity='';gBtn.style.pointerEvents='';}
  toast('Purchase failed ('+msg+'). Please try again.');
};
window.__purchaseRetrying=function(){
  toast('Loading plans, please wait…');
};
window.__billingRestore=function(found){
  if(found){
    S.premium=true;save();
    toast('Premium restored! 🌺');
    nav('premium');
  }else{
    toast('No active subscription found');
  }
};

// Add Premium button to More screen
var _more17=SCREENS.more;
SCREENS.more=function(p){
  var html=_more17(p);
  if(S.premium)return html;
  return html.replace(
    '<button class="li" data-a="rateapp">',
    '<button class="li" data-a="go" data-v="premium" style="background:linear-gradient(90deg,#FFF8E6,#FFF3DC)">'+
      '<span class="ico" style="background:#FFF3E0;color:#C8860A">🌺</span>'+
      '<span class="grow" style="font-weight:700;color:#A06A00">Unlock Premium</span>'+
      '<span class="small" style="color:#C8860A;font-weight:600">$4.99/mo →</span>'+
    '</button>'+
    '<button class="li" data-a="rateapp">'
  );
};

// Add Premium banner to home screen for free users
var _home17=SCREENS.home;
SCREENS.home=function(p){
  var html=_home17(p);
  if(S.premium)return html;
  var banner='<div style="margin:0 16px 16px;padding:14px 16px;background:linear-gradient(90deg,#FFF8E6,#FFF3DC);border-radius:var(--r-lg);display:flex;align-items:center;gap:12px;cursor:pointer" data-a="go" data-v="premium">'+
    '<span style="font-size:1.4rem">🌺</span>'+
    '<div style="flex:1"><div style="font-family:var(--serif);font-weight:700;font-size:.95rem;color:#A06A00">Unlock Full Access</div><div style="font-size:.78rem;color:#C8860A">All meditations, scripts &amp; music</div></div>'+
    '<span style="color:#C8860A;font-size:1.1rem">›</span>'+
  '</div>';
  return html.replace('<div class="tiles"',banner+'<div class="tiles"');
};

/* ---- B2 Launch Paywall overlay ---- */
var _pwOverlayStyle=document.createElement('style');
_pwOverlayStyle.textContent=
'#pw-gate{position:fixed;inset:0;z-index:10000;overflow-y:auto;background:var(--cream,#FBF6EE)}'+
'#pw-gate .pw-gate-inner{display:flex;flex-direction:column;align-items:center;padding:36px 24px 40px;max-width:460px;margin:0 auto;text-align:center}'+
'#pw-gate .pw-gate-img{font-size:72px;line-height:1;margin-bottom:16px}'+
'#pw-gate .pw-gate-title{font-family:var(--serif);font-size:1.7rem;font-weight:700;color:var(--ink);margin:0 0 8px}'+
'#pw-gate .pw-gate-sub{font-size:.95rem;color:var(--muted);margin:0 0 24px;line-height:1.55}'+
'#pw-gate .pw-gate-feats{width:100%;background:var(--beige);border-radius:var(--r-lg);padding:16px 18px;margin-bottom:22px;text-align:left;display:flex;flex-direction:column;gap:10px}'+
'#pw-gate .pw-gate-feat{display:flex;align-items:center;gap:10px;font-size:.93rem;color:var(--ink)}'+
'#pw-gate .pw-gate-plans{width:100%;display:flex;flex-direction:column;gap:10px;margin-bottom:16px}'+
'#pw-gate .pw-gate-plan{width:100%;padding:14px 16px;border-radius:var(--r-lg);border:2px solid var(--border);background:var(--card);cursor:pointer;text-align:left;display:flex;align-items:center;justify-content:space-between;transition:border-color .2s}'+
'#pw-gate .pw-gate-plan.sel{border-color:var(--sage);background:var(--beige)}'+
'#pw-gate .pw-gate-pname{font-family:var(--serif);font-size:1rem;font-weight:700;color:var(--ink)}'+
'#pw-gate .pw-gate-pperiod{font-size:.78rem;color:var(--muted)}'+
'#pw-gate .pw-gate-pprice{font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--sage)}'+
'#pw-gate .pw-gate-badge{background:#C8860A;color:#fff;font-size:.68rem;font-weight:700;padding:2px 7px;border-radius:20px}'+
'#pw-gate .pw-gate-cta{width:100%;padding:16px;border-radius:var(--r-lg);background:var(--sage);color:#fff;font-family:var(--serif);font-size:1.05rem;font-weight:700;border:none;cursor:pointer;margin-bottom:10px}'+
'#pw-gate .pw-gate-skip{background:none;border:none;color:var(--muted);font-size:.85rem;cursor:pointer;padding:10px;text-decoration:underline}'+
'#pw-gate .pw-gate-terms{font-size:.7rem;color:var(--muted);line-height:1.5;margin-top:10px;max-width:320px}';
document.head.appendChild(_pwOverlayStyle);

var _pwGateSel='premium_yearly';

function showLaunchPaywall(){
  if(S.premium)return;
  if(document.getElementById('pw-gate'))return;

  var el=document.createElement('div');
  el.id='pw-gate';
  el.innerHTML='<div class="pw-gate-inner">'+
    '<div class="pw-gate-img">🌺</div>'+
    '<h1 class="pw-gate-title">Try Free for 3 Days</h1>'+
    '<p class="pw-gate-sub">Full access to every meditation, script &amp; song.<br>No charge for 3 days — cancel anytime.</p>'+
    '<div class="pw-gate-feats">'+
      '<div class="pw-gate-feat"><span>🎵</span><span>All meditations &amp; healing music</span></div>'+
      '<div class="pw-gate-feat"><span>📜</span><span>10+ guided healing scripts</span></div>'+
      '<div class="pw-gate-feat"><span>✨</span><span>Quantum scripts &amp; 21-day challenge</span></div>'+
      '<div class="pw-gate-feat"><span>📿</span><span>Unlimited mala counter &amp; 55×5</span></div>'+
    '</div>'+
    '<div class="pw-gate-plans">'+
      '<div class="pw-gate-plan" id="pwg-monthly">'+
        '<div><div class="pw-gate-pname">Monthly</div><div class="pw-gate-pperiod">3 days free, then $4.99/mo</div></div>'+
        '<div class="pw-gate-pprice">$4.99 / mo</div>'+
      '</div>'+
      '<div class="pw-gate-plan sel" id="pwg-yearly">'+
        '<div><div class="pw-gate-pname">Yearly</div><div class="pw-gate-pperiod">3 days free, then $24.99/yr</div></div>'+
        '<div style="text-align:right"><div class="pw-gate-badge">BEST VALUE</div><div class="pw-gate-pprice">$24.99 / yr</div></div>'+
      '</div>'+
    '</div>'+
    '<button class="pw-gate-cta" id="pwg-cta">Start Free Trial</button>'+
    '<button class="pw-gate-skip" id="pwg-skip">Maybe later — explore free content</button>'+
    '<p class="pw-gate-terms">3-day free trial, then auto-renews. Cancel anytime in Google Play before trial ends.</p>'+
  '</div>';

  document.body.appendChild(el);

  el.querySelector('#pwg-monthly').addEventListener('click',function(){
    _pwGateSel='premium_monthly';
    el.querySelector('#pwg-monthly').classList.add('sel');
    el.querySelector('#pwg-yearly').classList.remove('sel');
  });
  el.querySelector('#pwg-yearly').addEventListener('click',function(){
    _pwGateSel='premium_yearly';
    el.querySelector('#pwg-yearly').classList.add('sel');
    el.querySelector('#pwg-monthly').classList.remove('sel');
  });
  el.querySelector('#pwg-cta').addEventListener('click',function(){
    var btn=el.querySelector('#pwg-cta');
    if(btn){btn.textContent='Loading…';btn.style.opacity='.6';btn.style.pointerEvents='none';}
    if(window.AndroidApp&&AndroidApp.purchase){
      AndroidApp.purchase(_pwGateSel);
    }else{
      setTimeout(function(){
        if(btn){btn.textContent='Start Free Trial';btn.style.opacity='';btn.style.pointerEvents='';}
        toast('Purchase unavailable outside the app');
      },800);
    }
  });
  el.querySelector('#pwg-skip').addEventListener('click',function(){
    el.style.transition='opacity .35s';
    el.style.opacity='0';
    setTimeout(function(){
      el.remove();
      if(!S.name&&typeof ACT!=='undefined'&&ACT.editname)setTimeout(function(){ACT.editname();},100);
    },350);
  });
}

// Show paywall once, right after onboarding completes (Option A)
window.__afterOnboarding=function(){
  if(!S.premium)showLaunchPaywall();
};

// Remove gate overlay on purchase success
var _origSuccess=window.__purchaseSuccess;
window.__purchaseSuccess=function(){
  var gate=document.getElementById('pw-gate');
  if(gate)gate.remove();
  if(_origSuccess)_origSuccess();
  else{S.premium=true;save();toast('Welcome to Premium! 🌺');nav('premium');}
  if(!S.name&&typeof ACT!=='undefined'&&ACT.editname)setTimeout(function(){ACT.editname();},400);
};

})();
