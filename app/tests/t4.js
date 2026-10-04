const {chromium}=require('playwright');const sh='shots/s4-';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.setDefaultTimeout(4000);
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/fonts\.g/,r=>r.abort());
await p.goto('file://'+process.cwd()+'/app.html',{waitUntil:'domcontentloaded'});
const log=[];const ok=(c,m)=>log.push((c?'PASS ':'FAIL ')+m);const shot=async n=>{await p.waitForTimeout(450);await p.screenshot({path:sh+n+'.png'})};
const dead=async n=>{const miss=await p.evaluate(()=>[...new Set([...document.querySelectorAll('[data-a]')].map(e=>e.dataset.a))].filter(a=>!window.__ACT_KEYS.includes(a)));ok(!miss.length,'no dead actions '+n+' '+miss)};
await p.click('[data-v="onb2"]');await p.click('[data-a="finishonb"]');await p.click('[data-a="onbnamego"][data-v=""]');await shot('01-home');await dead('home');
await p.click('.tile[data-v="situations"]');await shot('02-situations');await dead('situations');
await p.click('.ccard[data-p="relationships"]');await shot('03-situation');
await p.click('[data-v="script"][data-p="relationship"]');await shot('04-setup');await dead('setup');
await p.click('[data-a="ssubj"][data-v="my mother"]');ok((await p.inputValue('#ssubj'))==='my mother','subject chip fills');
await p.fill('#ssubj','Ravi');await p.click('[data-a="sheavy"][data-v="8"]');ok((await p.inputValue('#ssubj'))==='Ravi','typed subject kept after rerender');
await p.click('[data-a="srounds"][data-v="11"]');
await p.click('[data-a="sbegin"]');await shot('05-reader');ok((await p.textContent('.rline')).includes('Ravi'),'reader uses name');
await p.click('.rtap');await p.click('.rtap');await shot('06-reader-sorry');await p.click('[data-a="rprev"]');
for(let i=0;i<40;i++){if(!(await p.$('.rtap')))break;await p.click('.rctl [data-a="rnext"]')}
await shot('07-mala');ok(await p.isVisible('.rphrase'),'mala phase');await dead('mala');
for(let i=0;i<9;i++)await p.click('.rphrase');ok((await p.textContent('svg text')).trim()==='2','two rounds counted');
await p.click('[data-a="rauto"]');await p.click('[data-a="rauto"]');
await p.click('[data-a="rreflect"]');await shot('08-reflect');await p.fill('#rtext','Felt lighter by the thank-you lines.');await p.click('[data-a="rsave"]');
await p.waitForTimeout(300);ok(!(await p.isVisible('#player')),'reader closes');
await p.click('.nav [data-v="journal"]');ok((await p.textContent('.entry')).includes('Relationships · Ravi'),'script saved to journal');await shot('09-journal');
// quantum locked
await p.click('.nav [data-v="home"]');await p.click('.tile[data-v="situations"]');await p.click('.ccard[data-p="anger"]');await p.click('[data-a="smode"][data-v="quantum"]');await shot('10-quantum');
await p.click('[data-a="sfeel"][data-v="hurt"]');await p.click('[data-a="sbegin"]');ok(await p.isVisible('[data-a="unlock"]'),'quantum locked for free');
await p.click('[data-a="unlock"]');await p.waitForTimeout(300);await p.click('[data-a="sbegin"]');ok((await p.textContent('.rline')).includes('responsibility'),'quantum runs after unlock');
await p.click('.rtap');ok((await p.textContent('.rline')).includes('For the'),'quantum line '+(await p.textContent('.rline')));await shot('11-quantum-reader');
await p.click('[data-a="rclose"]');await p.click('[data-a="rclose"]');await p.waitForTimeout(300);ok(!(await p.isVisible('#player')),'double tap close');
// my scripts
await p.click('[data-a="back"]');await p.click('[data-v="myscripts"]');await p.click('.empty [data-v="scriptedit"]');
await p.fill('#etitle','Loan repayment');await p.fill('#esubj','my loan');await p.fill('#elines',"I take 100% responsibility for {name}.\n☹ I am sorry {name} for the fear.\n🙏 Please forgive me {name}.\nThank you {name}.\nI love you {name}.\nI let go. I let God.");
await p.click('[data-a="ssave"]');ok((await p.locator('.li').count())===1,'custom script saved');await p.click('.li');await shot('12-myscript-setup');await p.click('[data-a="sbegin"]');ok((await p.textContent('.rline')).includes('my loan'),'custom script runs '+await p.textContent('.rline'));
await p.click('.rtap');ok((await p.textContent('.rstage')).includes('sorry'),'stage classified');await p.click('[data-a="rclose"]');await p.click('[data-a="rclose"]');
// bowl
await p.click('.nav [data-v="home"]');await p.click('[data-v="bowl"]');await shot('13-bowl');await p.fill('#btext','I am so angry that he never listens.');await p.click('[data-a="burn"]');await p.waitForTimeout(2200);await shot('14-bowl-burning');await p.waitForTimeout(4200);await shot('15-bowl-after');await dead('bowl');
await p.click('[data-a="bowljournal"]');ok((await p.inputValue('#jtext')).startsWith('One good thing'),'bowl -> journal');
// 55x5
await p.click('.nav [data-v="home"]');await p.click('.card[data-v="fivefive"]');await p.fill('#ffaff','I am happily living in my new home.');await p.click('[data-a="ffstart"]');
for(let i=0;i<3;i++){await p.fill('#ffw','I am happily living in my new home.');await p.press('#ffw','Enter')}
await p.click('[data-a="ffplus"]');ok((await p.textContent('.serif[style*="3.4rem"]')).startsWith('4'),'55x5 counts');await shot('16-fivefive');await dead('fivefive');
await p.click('[data-a="back"]');await p.click('.tile[data-v="daily"]');await shot('17-daily');await dead('daily');
await p.click('.nav [data-v="more"]');ok(await p.isVisible('.li[data-v="myscripts"]'),'My Scripts in More');
await p.click('.nav [data-v="progress"]');ok(Number(await p.textContent('.stats3 b'))>=0,'progress ok');await shot('18-progress');
console.log(log.join('\n'));console.log('ERRORS',errs);await b.close()})();
