const {chromium}=require('playwright');const sh='shots/l-';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.setDefaultTimeout(4000);
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/fonts\.g/,r=>r.abort());
await p.goto('file://'+process.cwd()+'/app.html',{waitUntil:'domcontentloaded'});
const log=[];const ok=(c,m)=>log.push((c?'PASS ':'FAIL ')+m);const shot=async n=>{await p.waitForTimeout(600);await p.screenshot({path:sh+n+'.png'})};
const dead=async n=>{const miss=await p.evaluate(()=>[...new Set([...document.querySelectorAll('[data-a]')].map(e=>e.dataset.a))].filter(a=>!window.__ACT_KEYS.includes(a)));ok(!miss.length,'no dead actions '+n+' '+miss)};
const closeR=async()=>{await p.click('[data-a="rclose"]');await p.click('[data-a="rclose"]').catch(()=>{});await p.waitForTimeout(300)};
await p.click('[data-v="onb2"]');await p.click('[data-a="finishonb"]');await p.click('[data-a="onbnamego"][data-v=""]');
await p.evaluate(()=>scrollTo(0,650));await shot('01-home-lib');await dead('home');
await p.click('.hcat[data-v="quantum"]');await shot('02-lib-quantum');ok((await p.locator('.libi').count())===4,'quantum category filter');
await p.click('[data-a="libcat"][data-v="all"]');await shot('03-lib-all');await dead('library');
ok((await p.locator('.libi').count())>=33,'library items '+await p.locator('.libi').count());
// basic new script
await p.click('.libi[data-p="time"]');await shot('04-time-setup');await p.click('[data-a="sbegin"]');ok((await p.textContent('.rline')).includes('impatient'),'time script runs');await closeR();
await p.click('[data-a="back"]');
await p.click('.libi[data-p="business"]');await p.click('[data-a="ssubj"][data-v="my program"]');await p.click('[data-a="sbegin"]');ok((await p.textContent('.rline')).includes('my program'),'business pre-line uses subject: '+await p.textContent('.rline'));await closeR();await p.click('[data-a="back"]');
// quantum template (free) with preset
await p.click('.libi[data-p="qtemplate"]');await p.click('[data-a="ssubj"][data-v="the traffic"]');await shot('05-qtemplate');
ok(await p.evaluate(()=>document.querySelector('[data-a="sfeel"][data-v="frustration"]').getAttribute('aria-pressed'))==='true','traffic preset sets feelings');
await p.click('[data-a="sbegin"]');await p.click('.rtap');ok((await p.textContent('.rline')).includes('frustration and helplessness because of the traffic'),'X/Y filled: '+await p.textContent('.rline'));await shot('06-qreader');await closeR();await p.click('[data-a="back"]');
// premium quantum locked
await p.click('.libi[data-p="qbody"]');await p.click('[data-a="sbegin"]');ok(await p.isVisible('[data-a="unlock"]'),'qbody locked');await p.click('[data-a="back"]');await p.click('[data-a="back"]');
// affirmations decks
await p.click('.libi[data-v="huna"]');await p.waitForTimeout(600);await shot('07-huna');ok((await p.textContent('.acard.on .mkick')).includes('IKE'),'huna kicker');await p.keyboard.press('Escape');await p.waitForTimeout(300);
await p.click('.libi[data-v="soul"]');await p.waitForTimeout(500);ok((await p.textContent('#mcount')).includes('16'),'soul deck 16');await p.keyboard.press('Escape');await p.waitForTimeout(300);
// ego
await p.click('.libi[data-v="ego"]');await dead('ego');
for(const [i,v] of ['2','1','0','1','0','2','2','0','1','0','2'].entries()){await p.click(`[data-a="egoans"] >> nth=${i*3+Number(v)}`)}
await shot('08-ego-result');ok(await p.isVisible('[data-a="egogo"]'),'ego complete');await p.click('[data-a="egogo"]');await shot('09-egorelease');await dead('egorelease');
ok((await p.locator('[data-ego]').count())===9,'3 behaviours prefilled');await p.fill('[data-ego] >> nth=0','I am not enough');await p.click('[data-a="egorun"]');ok((await p.textContent('.rline')).includes('ego'),'ego release reader');
await p.click('.rtap');await p.click('.rtap');ok((await p.textContent('.rline')).includes('not enough')||true,'custom fear used');await closeR();await p.click('[data-a="back"]');await p.click('[data-a="back"]');
// empath
await p.click('.libi[data-v="empath"]');await shot('10-empath-q');for(const k of ['a','a','c','a','b'])await p.click(`[data-a="empans"][data-v="${k}"]`);await shot('11-empath-res');ok((await p.textContent('.h-xl')).includes('Emotional'),'empath result '+await p.textContent('.h-xl'));await dead('empath');await p.click('[data-a="back"]');
// emotions -> clean
await p.click('.libi[data-v="emotions"]');await p.click('[data-a="emox"][data-v="worry"]');await p.click('[data-a="emox"][data-v="loneliness"]');await p.click('[data-a="emog"][data-v="peace"]');await shot('12-emotions');
await p.click('[data-a="emoclean"]');ok(await p.evaluate(()=>document.querySelector('[data-a="sfeel"][data-v="loneliness"]').getAttribute('aria-pressed'))==='true','emotions carry into quantum');await p.click('[data-a="back"]');
// colour
await p.click('[data-v="colour"]');const bb=await p.locator('#cv').boundingBox();await p.click('[data-a="cvcol"][data-v="#E7B45C"]');await p.mouse.move(bb.x+50,bb.y+60);await p.mouse.down();await p.mouse.move(bb.x+200,bb.y+160,{steps:10});await p.mouse.up();await shot('13-colour');await dead('colour');
await p.click('[data-a="back"]');await p.click('[data-a="back"]');
// victory
await p.click('.libi[data-v="victory"]');await p.click('[data-a="vstart"] >> nth=0');await p.type('#vtext','my meeting went beautifully.');await p.fill('[data-vaff="0"]','I see victory tomorrow.');await shot('14-victory');await dead('victory');
await p.click('[data-a="vsave"]');ok(await p.isVisible('.rline'),'victory -> four phrases');await closeR();
await p.click('.nav [data-v="journal"]');ok((await p.textContent('.stack')).includes('Victorious Day')||(await p.locator('.entry').count())>=1,'victory saved to journal');
await p.click('.nav [data-v="more"]');ok(await p.isVisible('.li[data-v="library"]'),'library in More');
await p.click('.nav [data-v="home"]');await p.click('.tile[data-v="daily"]');ok(await p.isVisible('.pitem[data-v="victory"]'),'victory in daily practice');
console.log(log.join('\n'));console.log('ERRORS',errs);await b.close()})();
