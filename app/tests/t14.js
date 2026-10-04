const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const ctx=await b.newContext({viewport:{width:390,height:844},acceptDownloads:true});const p=await ctx.newPage();p.setDefaultTimeout(5000);
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/fonts\.g/,r=>r.abort());
await p.goto('file://'+process.cwd()+'/app.html',{waitUntil:'domcontentloaded'});const r=[];const S=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('hoo.app.v2')||'{}'));
const shot=n=>p.screenshot({path:'shots/n_'+n+'.png'});
await p.click('[data-v="onb2"]');await p.click('[data-a="finishonb"]');
r.push(['name screen appears after intro',(await p.textContent('#view')).includes('What should we call you?')]);
await p.click('[data-a="onbnamego"][data-v="1"]');r.push(['empty name is not accepted on Continue',(await p.textContent('#view')).includes('What should we call you?')]);
await p.fill('#onbnm','Sameer');await shot('name');await p.click('[data-a="onbnamego"][data-v="1"]');await p.waitForTimeout(300);
const home=await p.textContent('#view');r.push(['home greets the typed name',home.includes('Sameer')&&!home.includes('Ritima')]);
r.push(['challenge card on home',home.includes('21-Day Healing Challenge')]);await shot('home');
// challenge
await p.click('.chhome');await shot('ch0');await p.click('[data-a="chstart"]');let t=await p.textContent('#view');r.push(['challenge starts on day 1',t.includes('Day 1 of 21')&&t.includes('The four phrases')]);
r.push(['later days locked',await p.$eval('.chitem[data-v="1"]',e=>e.disabled)]);await shot('ch1');
await p.click('.chtoday [data-a="chdo"]');await p.waitForTimeout(600);r.push(['day 1 opens the song',!(await p.$eval('#player',e=>e.hidden))]);
// playlist
r.push(['next/previous song buttons shown',(await p.$$('.trkbtn')).length===2]);const t1=await p.textContent('.ptitle h2');await p.click('[data-a="ptrack"][data-v="1"]');await p.waitForTimeout(500);const t2=await p.textContent('.ptitle h2');
r.push(['next goes to another song ('+t1+' -> '+t2+')',t1!==t2]);await p.click('[data-a="ptrack"][data-v="1"]');await p.waitForTimeout(500);r.push(['next wraps back',(await p.textContent('.ptitle h2'))===t1]);
await p.click('[data-a="prepeat"]');const l1=await p.textContent('#replbl');await p.click('[data-a="prepeat"]');const l2=await p.textContent('#replbl');await p.click('[data-a="prepeat"]');const l3=await p.textContent('#replbl');
r.push(['repeat cycles one/all/off ('+[l1,l2,l3]+')',l1==='Repeat one'&&l2==='Repeat all'&&l3==='Repeat']);
await p.click('[data-a="prepeat"]');await p.click('[data-a="prepeat"]');await p.evaluate(()=>{const a=document.querySelector('#mantraAudio');a.currentTime=a.duration-1.2});await p.waitForTimeout(3500);
r.push(['repeat all moves to the next song at the end',(await p.textContent('.ptitle h2'))===t2]);
await p.click('[data-a="psleep"]');const so=await p.$$eval('.sheet .opt',e=>e.map(x=>x.textContent.trim()));r.push(['sleep timer offers 15/30/60 ('+so.join(',')+')',['15 minutes','30 minutes','60 minutes'].every(x=>so.includes(x))]);
await p.click('.sheet [data-v="15"]');r.push(['sleep timer set',(await p.textContent('#sleeplbl')).includes('min')]);await shot('player');
await p.evaluate(()=>window.__media('pause'));await p.waitForTimeout(200);r.push(['lock-screen pause command works',await p.$eval('#pbig',e=>e.getAttribute('aria-label')==='Play')]);
await p.evaluate(()=>window.__media('play'));await p.waitForTimeout(300);r.push(['lock-screen play command works',await p.$eval('#pbig',e=>e.getAttribute('aria-label')==='Pause')]);
await p.click('[data-a="pclose"]');await p.waitForTimeout(400);
await p.click('.chtoday [data-a="chdone"]');t=await p.textContent('#view');r.push(['day 1 marked complete, day 2 waits for tomorrow',t.includes('Today is done')&&(await S()).ch.done.length===1]);await shot('ch2');
await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('hoo.app.v2'));const d=new Date();d.setDate(d.getDate()-1);const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');s.ch.done=[k];localStorage.setItem('hoo.app.v2',JSON.stringify(s))});
await p.reload({waitUntil:'domcontentloaded'});await p.click('.chhome');t=await p.textContent('#view');r.push(['next day unlocks day 2 with a streak',t.includes('Day 2 of 21')&&t.includes('1 day streak')&&t.includes('Breathe and arrive')]);
await p.click('.chtoday [data-a="chdo"]');r.push(['day 2 opens breathing',(await p.textContent('#view')).includes('Breathe in for 4')]);await p.click('[data-a="back"]');
// share card
await p.click('[data-a="back"]');await p.click('.tile[data-v="affirmations"]');await p.click('[data-a="mplay"][data-v="gratitude"]');await p.waitForTimeout(500);await p.click('[data-a="mshare"]');await p.waitForSelector('.sheet img');
const dim=await p.$eval('.sheet img',i=>new Promise(res=>{const im=new Image();im.onload=()=>res(im.naturalWidth+'x'+im.naturalHeight);im.src=i.src}));r.push(['share card picture made ('+dim+')',dim==='1080x1350']);await shot('card');
const [dl]=await Promise.all([p.waitForEvent('download'),p.click('[data-a="cardsave"]')]);r.push(['picture downloads as '+dl.suggestedFilename(),dl.suggestedFilename()==='affirmation.png']);
await p.evaluate(()=>document.querySelector('[data-a="closesheet"]').click());await p.click('[data-a="mclose"]');await p.waitForTimeout(300);
// journal + backup
await p.click('.nav [data-v="journal"]');await p.fill('#jtext','I release the old story.');await p.click('[data-a="jsave"]');
await p.click('.nav [data-v="more"]');await p.click('.li[data-v="backup"]');await shot('backup');
const [d2]=await Promise.all([p.waitForEvent('download'),p.click('[data-a="bkexport"]')]);const path=await d2.path();const txt=require('fs').readFileSync(path,'utf8');const o=JSON.parse(txt);
r.push(['backup file has journal + name ('+d2.suggestedFilename()+')',o.app==='hooponopono-healing'&&o.data.journal.length===1&&o.data.name==='Sameer']);
await p.click('.nav [data-v="more"]');await p.click('[data-a="resetask"]');await p.click('[data-a="resetyes"]');r.push(['data erased',!(await S()).journal]);
await p.click('[data-v="onb2"]');await p.click('[data-a="finishonb"]');await p.click('[data-a="onbnamego"][data-v=""]');r.push(['skipping name shows "Add your name"',(await p.textContent('#view')).includes('Add your name')]);
await p.click('.nav [data-v="more"]');await p.click('.li[data-v="backup"]');await p.setInputFiles('#bkfile',path);await p.waitForSelector('.sheet [data-a="bkapply"]');await shot('restore');await p.click('[data-a="bkapply"]');await p.waitForTimeout(300);
const s2=await S();r.push(['restore brings back journal, name and challenge',s2.journal.length===1&&s2.name==='Sameer'&&s2.ch.done.length===1&&(await p.textContent('#view')).includes('Sameer')]);
await p.click('.nav [data-v="more"]');await p.click('.li[data-v="backup"]');await p.click('summary');await p.fill('#bkpaste','hello');await p.click('[data-a="bkpaste"]');r.push(['bad backup text is refused',(await p.textContent('.toast')).includes('not a Ho')]);
// old default name migration
await p.evaluate(()=>localStorage.setItem('hoo.app.v2',JSON.stringify({onboarded:true,name:'Ritima'})));await p.reload({waitUntil:'domcontentloaded'});r.push(['old default name removed for existing users',!(await p.textContent('#view')).includes('Ritima')]);
await p.click('[data-a="editname"]');await p.fill('#nm','Asha');await p.click('[data-a="savename"]');r.push(['name can be added later',(await p.textContent('#view')).includes('Asha')]);
console.log(r.map(x=>(x[1]?'PASS ':'FAIL ')+x[0]).join('\n'),'\nERRORS',errs);await b.close()})();
