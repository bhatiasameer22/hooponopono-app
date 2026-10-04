/* ================= ANDROID APP BRIDGE (no effect in a browser) ================= */
window.__androidBack=function(){
 if(document.querySelector('.scrim')){closeSheet();return true}
 if(R.s){closeReader();return true}
 if(MA.items.length){closeMorning();return true}
 if(P.m&&!P.min){minimizePlayer();return true}
 if(stack.length>1){back();return true}
 if(S.onboarded&&stack[0].n!=='home'){tab('home');return true}
 return false};
