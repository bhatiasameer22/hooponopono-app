const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:390,height:844}});p.setDefaultTimeout(5000);
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/fonts\.g/,r=>r.abort());
await p.addInitScript(()=>localStorage.setItem('hoo.app.v2',JSON.stringify({onboarded:true,name:'Sameer',nameSet:true})));
await p.goto('file://'+process.cwd()+'/app.html',{waitUntil:'domcontentloaded'});const r=[];const shot=async n=>{await p.waitForTimeout(700);await p.screenshot({path:'shots/v_'+n+'.png'})};
const playing=()=>p.evaluate(()=>!document.querySelector('#mantraAudio').paused);
await p.click('.trkart >> nth=0');await p.waitForTimeout(1500);r.push(['song plays',await playing()]);
r.push(['player shows a back arrow',await p.$eval('[data-a="pclose"]',e=>e.getAttribute('aria-label')==='Back')]);await shot('player');
await p.click('[data-a="pclose"]');await p.waitForTimeout(500);
r.push(['back keeps the music playing',await playing()&&await p.$eval('#player',e=>e.hidden)]);
r.push(['mini player shown',!!(await p.$('#mini'))]);await shot('mini');
await p.click('.nav [data-v="journal"]');await p.fill('#jtext','test');await p.click('[data-a="jsave"]');r.push(['can use other screens while music plays',await playing()&&(await p.textContent('#view')).includes('test')]);
await p.click('#minipp');await p.waitForTimeout(300);r.push(['mini pause works',!(await playing())]);await p.click('#minipp');await p.waitForTimeout(400);r.push(['mini play works',await playing()]);
await p.click('[data-a="miniopen"]');await p.waitForTimeout(400);r.push(['tapping mini reopens the player',!(await p.$eval('#player',e=>e.hidden))&&!(await p.$('#mini'))]);
await p.goBack();await p.waitForTimeout(400);r.push(['phone back button also minimises',await playing()&&!!(await p.$('#mini'))]);
// script while song plays
await p.click('.nav [data-v="home"]');await p.click('.tile[data-v="situations"]');await p.click('.ccard[data-p="family"]');await p.click('[data-v="script"]');await p.click('[data-a="sbegin"]');await p.waitForTimeout(500);
r.push(['a script can be read while the song plays',await playing()&&(await p.$$('.rtap')).length>0]);
r.push(['android back closes the script first',await p.evaluate(()=>window.__androidBack())&&await playing()]);await p.waitForTimeout(300);
await p.evaluate(()=>window.__androidBack());
await p.click('[data-a="miniclose"]');await p.waitForTimeout(400);r.push(['mini close stops the music',!(await playing())&&!(await p.$('#mini'))]);
// mantra loop
await p.click('.nav [data-v="home"]');await p.click('[data-a="mantraloop"]');await shot('loop');
r.push(['loop sheet defaults to 21',await p.$eval('.sheet [data-a="mln"][aria-pressed="true"]',e=>e.textContent)==='21']);
await p.click('.sheet [data-a="mln"][data-v="3"]');await p.click('.sheet [data-a="mlstart"]');await p.waitForTimeout(1200);
r.push(['loop shows round 1 of 3',(await p.textContent('#looplbl'))==='Round 1 of 3']);await shot('loopplay');
for(let k=0;k<2;k++){await p.evaluate(()=>{const a=document.querySelector('#mantraAudio');a.currentTime=a.duration-1});await p.waitForTimeout(2600)}
r.push(['loop repeats and counts ('+await p.textContent('#looplbl')+')',(await p.textContent('#looplbl'))==='Round 3 of 3'&&await playing()]);
await p.evaluate(()=>{const a=document.querySelector('#mantraAudio');a.currentTime=a.duration-1});await p.waitForTimeout(2600);
r.push(['loop stops after the last round',!(await playing())]);
console.log(r.map(x=>(x[1]?'PASS ':'FAIL ')+x[0]).join('\n'),'\nERRORS',errs);await b.close()})();
