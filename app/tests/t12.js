const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:390,height:844}});p.setDefaultTimeout(4000);
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/fonts\.g/,r=>r.abort());
await p.addInitScript(()=>{window.__osc=0;window.__src=0;window.__tts=0;const O=window.AudioContext;const co=O.prototype.createOscillator,cb=O.prototype.createBufferSource;O.prototype.createOscillator=function(){window.__osc++;return co.call(this)};O.prototype.createBufferSource=function(){window.__src++;return cb.call(this)};
 if(window.speechSynthesis){const sp=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=u=>{window.__tts++}}
 localStorage.setItem('hoo.app.v2',JSON.stringify({onboarded:true,voiceOn:true}))});
await p.goto('file://'+process.cwd()+'/app.html',{waitUntil:'domcontentloaded'});const r=[];
await p.click('.tile[data-v="situations"]');await p.click('.ccard[data-p="anger"]');await p.click('[data-a="sbegin"]');await p.waitForTimeout(400);
const o1=await p.evaluate(()=>window.__osc);r.push(['bell on first line ('+o1+' tones)',o1===3]);
await p.click('.rtap');await p.click('.rtap');await p.waitForTimeout(300);
r.push(['bell follows each line',await p.evaluate(()=>window.__osc)===9]);
r.push(['no background scene in scripts',await p.evaluate(()=>window.__src)===0]);
r.push(['no voice even if it was switched on',await p.evaluate(()=>window.__tts)===0]);
await p.click('[data-a="belltoggle"]');await p.click('.rtap');await p.waitForTimeout(200);r.push(['bell can be switched off',await p.evaluate(()=>window.__osc)===9]);
await p.screenshot({path:'shots/bell.png'});
await p.click('[data-a="belltoggle"]');
for(let i=0;i<30;i++){if(!(await p.$('.rtap')))break;await p.click('.rctl [data-a="rnext"]')}
const before=await p.evaluate(()=>window.__osc);for(let i=0;i<4;i++)await p.click('.rphrase');r.push(['bell on each completed round',await p.evaluate(()=>window.__osc)-before===3]);
await p.click('[data-a="rclose"]');await p.click('[data-a="rclose"]');await p.waitForTimeout(300);
await p.click('.nav [data-v="more"]');await p.click('.li[data-v="sounds"]');r.push(['voice settings removed',!(await p.textContent('#view')).includes('Voice')]);
await p.click('.nav [data-v="meditations"]');await p.click('.cplay[data-v="anxiety"]');await p.waitForTimeout(800);await p.click('[data-a="pbgsheet"]');r.push(['no voice toggle in player sheet',!(await p.textContent('.sheet')).includes('Speak')]);
r.push(['still no voice',await p.evaluate(()=>window.__tts)===0]);
console.log(r.map(x=>(x[1]?'PASS ':'FAIL ')+x[0]).join('\n'),'\nERRORS',errs);await b.close()})();
