/* ================= HEALING LIBRARY (from the user's course PDFs; coach names removed, wording adapted) ================= */
/* triggered emotions & glimmers */
const TRIGGERED=['fear','insecurity','judgement','feeling victimised','powerlessness','helplessness','despair','shame','regret','feeling irrelevant','feeling unloved','feeling unwanted','feeling unimportant','feeling ugly','guilt','envy','hate','anger','criticism','worry','disappointment','irritation','boredom','frustration','inadequacy','rejection','resentment','confusion','self-doubt','low confidence','lack','desperation','impatience','loneliness','abandonment','sadness','unworthiness','arrogance','comparing','overwhelm','controlling','self-pity','complaining','blaming','neediness','hurt','jealousy','anxiety','embarrassment','low self-esteem','doubt','fear of rejection','attachment','craving','nervousness'];
const GLIMMERS=['love','gratitude','appreciation','bliss','joy','passion','excitement','enthusiasm','hope','satisfaction','peace','trust'];
FEELINGS.length=0;TRIGGERED.forEach(f=>FEELINGS.push(f));
const joinX=a=>a.length<2?(a[0]||'any low feeling'):a.slice(0,-1).join(', ')+' and '+a[a.length-1];

/* ---------- new Basic scripts ---------- */
const NEW_BASIC=[
 {id:'healthprayer',cat:'basic',title:'Prayer for Healing Health',blurb:'A daily prayer for recovery and life force',img:'sit_health',rounds:108,
  subj:{label:'What are you healing?',def:'my health',chips:['my health','my body','my sinus','my back','my skin','my sleep']},q:{def:'my health',feel:['worry','fear','frustration']},
  note:'A companion to medical care, never a replacement for it.',
  resp:['I take 100% responsibility to heal {n}. Something within me has attracted this, and I have the power to transform it.'],
  sorry:['Dear {n}, I’m sorry.','For the health challenge I am facing, I’m sorry.','I’m sorry if, knowingly or unknowingly, I created any cause that manifested this.','For any memory in my subconscious that attracted this, whether I know it or not, I’m sorry.'],
  forgive:['Please forgive me for not knowing what in me attracted this challenge.','For my beautiful recovery, the right diagnosis, the right doctors and the right treatment: please forgive me.'],
  thanks:['Thank you, Divine, for healing me, and for the healthiest body, mind and soul.','Thank you in advance for the best health I have ever had.'],
  love:['I love you for this chance to change my health patterns permanently.'],
  letgo:['I release all worry and stress about my health.','I am changing my health patterns permanently. I let go of anything in me that creates illness.','I awaken the life force within me.','Dear Divine, heal the data that attracted this. Wash over every memory and pattern of sickness.'],
  affirm:['Everything is perfect in my healing phase.','The universe has my back. I am protected and safe.','Everything is working in my favour.']},
 {id:'time',cat:'basic',title:'Time, Impatience & Desperation',blurb:'When you feel rushed, behind, or desperate for results',img:'snd_river',rounds:108,
  q:{def:'time',feel:['impatience','desperation','worry']},
  info:'These feelings are a trauma response asking to be healed, not the truth. Repeat 108 times a day, or whenever impatience rises. Pairs well with 55 × 5.',
  resp:['I take 100% responsibility for feeling impatient and rushed. These feelings come from past memories, and I am ready to heal them.','I trust the process and divine timing. Everything is working out in my favour, even when I can’t see it yet.'],
  sorry:['I’m sorry for my feelings of hurry, impatience and rush.','I’m sorry for my feelings of desperation.','Dear Time, I’m sorry for blaming you and worrying about you.'],
  forgive:['Please forgive me for not trusting the process, or myself.','Please forgive me for not knowing which memories create this desperation.','Dear Time, please forgive me for blaming you for my stress.','Dear Time, please forgive me for believing I don’t have enough of you.'],
  thanks:['Thank you for cleaning my feelings of desperation, impatience and rush.','Dear Time, thank you for always being more than enough for me.','Dear Time, thank you for always being aligned with me.'],
  love:['I love you, my feelings of impatience, for this chance to grow more patient and trusting.','Dear Time, I love you for always being there for the things I love.','I love time, and time loves me.'],
  letgo:['I let go of these feelings with forgiveness and love. I release my fear of failure.','I release every limiting belief, worry and stress around time.','I let the Divine guide me to the right path and the right solutions.'],
  affirm:['I always have more than enough time.','Time is my ally. More time appears for me, and I feel amazed.','I have divine, perfect timing. I am in the right place at the right time, doing the right thing.']},
 {id:'business',cat:'basic',title:'Clients & Business',blurb:'Attract ideal clients and sell your work with ease',img:'sit_money',
  subj:{label:'Your work',def:'my work',chips:['my business','my program','my sessions','my webinar','my services']},q:{def:'selling my work',feel:['doubt','fear of rejection','worry']},
  info:'Beliefs you may be cleaning: “Clients won’t value what I offer.” “I’m not worthy of charging more.” “I’m too new to attract big clients.” “Self-promotion is pushy.” “Clients only care about price.” “I’m not good enough.”',
  pre:['Visualise {n} surrounded by bright light. Send it love, gratitude and forgiveness.','Picture shaking hands with an ideal client. You are both smiling, joyful and in harmony.'],
  resp:['What is it in me that blocks me from sharing {n} and attracting ideal clients? Whatever it is, I am willing to heal and release it.'],
  sorry:['Dear {n}, I’m sorry for any erroneous data attached to you, knowingly or unknowingly.','For anything within me that hinders the smooth selling of {n} at a divine price, I’m sorry.','Dear clients, I’m sorry for any doubts or limiting beliefs I hold about you.'],
  forgive:['Dear {n}, please forgive me for any erroneous data I have held towards you.','Please forgive me. I release all data that stops me from attracting my ideal clients.','Dear clients, please forgive me for any erroneous thoughts I created about you.'],
  thanks:['Dear {n}, thank you for being abundant, prosperous, beautiful and inspiring.','Thank you for attracting my ideal clients. Arigato, ideal clients!','Dear clients, thank you for loving {n} and investing in it so easily.'],
  love:['Dear {n}, I love you just the way you are. You are wonderful.','I love you for this chance to heal my blocks around clients who love to pay me.','Dear clients, I love you for choosing and believing in me. My clients love me.'],
  letgo:['I release all my erroneous beliefs right here, right now. I let go. I let God.','I allow divine intelligence to guide me to the right clients, who love {n} and prosper from it.'],
  affirm:['I am worthy of being paid abundantly for my unique skills.','People love my work and love to invest in it.','My clients are prospering. I am prospering.','For every no, I attract three ideal clients.']},
 {id:'attach',cat:'basic',title:'Letting Go of Attachments',blurb:'Healthy detachment from people, goals and outcomes',img:'sit_memories',
  subj:{label:'Attached to…',def:'this person or desire',chips:['my partner','my child','my parent','my goal','this outcome']},q:{def:'this person or desire',feel:['anxiety','fear','desperation']},
  info:'Attachment often grows from unmet needs, unheard voices and invalidated feelings in childhood. Bless the person or situation: it is showing you what to heal.',
  pre:['“Part of manifestation practice is what you let go of, rather than what you add.” — Eckhart Tolle'],
  resp:['I take full responsibility for my own wellbeing.'],
  sorry:['For any unhealthy attachment in my subconscious towards {n}, I’m sorry.','I’m sorry for not letting go of things that are not good for me.','I’m sorry for whatever in me is unable to detach, and for depending too much on others for my needs.'],
  forgive:['Please forgive me for not knowing what makes me so attached to {n}.','Please forgive me for not knowing how to let go in a healthy way.','Please forgive me for the programming that makes me hold on to what blocks my happiness.'],
  thanks:['Thank you for giving me the power of healthy, peaceful detachment.','Thank you, {n}, for helping me heal my attachment, anxiety and impatience.','Thank you for the clarity, and for the conviction that I get this or something better.'],
  love:['I love you for this chance to clean my attachment patterns.','I love and accept all of my needs. My needs are valid, important and met.'],
  letgo:['I release every unhealthy attachment, neediness and desperation towards {n}.','I may be with them and listen to them, yet I remain peaceful and unaffected.','I let go of the need to control anything outside of me.','I live in the present moment. I am free of my burdens.'],
  affirm:['I let go of attachment to outcomes and embrace the flow of life.','My inner peace is unshakable.','I am whole and complete within myself.','I trust that everything happens for my ultimate good.','I forgive those who hurt me and release them with love.']},
 {id:'selfcomp',cat:'basic',title:'Self-Compassion & Forgiveness',blurb:'Forgive yourself, your inner child, and others',img:'med_selflove',
  subj:{label:'Your name',def:'my dear self',chips:['my dear self']},q:{def:'myself',feel:['guilt','shame','self-doubt']},
  pre:['I accept the responsibility of healing myself and everyone around me. I am a Ho’oponopono healer.','I am cleaning and healing myself, and through me, healing and cleaning others.'],
  sorry:['{n}, for all the ways I harm, doubt, belittle or judge myself, I’m sorry.','If I have ever offended anyone in words, thoughts or actions, I’m sorry.'],
  forgive:['{n}, please forgive me if I unknowingly hurt you, or let others hurt you.','My dear inner child, please forgive me for the pain you went through. I didn’t know better. I was doing my best.','If I am not yet ready to forgive, I forgive myself for that too.'],
  thanks:['Thank you, {n}, for always being with me and supporting me.'],
  love:['You are worthy of the best things in the world.','I love myself exactly the way I am.'],
  letgo:['I forgive everyone who harmed me through their own confusion. I let go of grudges and resentment.','I release every energy that is less than love.','Dear Divine, teach me how to love and forgive myself deeply.'],
  affirm:['I am at peace with being imperfect.','I am fallible like everyone else, and that’s okay.','Even though I’m imperfect, I am still a worthwhile person.','Bad times don’t define me. I am so much more than that.','Being treated poorly does not change my core worth.','It’s okay to sometimes feel emotional pain.','Every day, in every way, I am getting better and better.']}
];
/* ---------- Quantum / Advanced (X = feelings, Y = person, object, place or situation) ---------- */
const NEW_Q=[
 {id:'qtemplate',cat:'quantum',title:'Quantum Healing · X & Y',blurb:'Heal your feelings (X) towards any trigger (Y)',img:'player',free:true,xy:true,
  ylabel:'What is triggering you? (Y)',ydef:'this situation',ychips:['the traffic','my boss','a family member','money','my body'],xdef:['anger','fear','helplessness'],
  presets:{'the traffic':['frustration','helplessness']},
  info:'POPS (people, objects, places, situations) + the causes I created = the effect I experience. The trigger is a messenger showing what is unhealed. Don’t blame, judge or control it; heal only your feelings.',
  pre:['Observe, name and label your feelings towards this trigger. Breathe through them. Don’t suppress or escape them.'],
  resp:['I take 100% responsibility to heal, clean and release my feelings of {x} because of {y}.','I acknowledge, embrace and accept all the emotions triggered by {y}.'],
  sorry:['I’m sorry for whatever in me is creating these feelings of {x} towards {y}.','I’m sorry, my feelings of {x}, for rejecting you, judging you and holding on to you for so long.'],
  forgive:['Please forgive me for not being aware of what in me makes me feel {x} towards {y}.','Please forgive me, my dear feelings of {x}, for not knowing how to heal and release you.'],
  thanks:['Thank you, my feelings of {x}. Now I know what needs to heal within me.','Thank you for showing up, and for leaving me with love.','Thank you, {y}, for showing me what I needed to heal.'],
  love:['I love my feelings of {x}. My feelings love me.','It is safe for me to feel these emotions. They are guiding me on the right path.'],
  letgo:['I release. I let go. I let God. I release this pattern of feeling {x}.','I let go of the pattern of attracting situations that trigger {x}.'],
  affirm:['Everything is perfect in this phase of my healing journey.','Every emotion has a deeper message for me.','As I heal, I create space for empowering thoughts and a new destiny.','I am calm, relaxed and peaceful.']},
 {id:'qbody',cat:'quantum',title:'Body & Weight · Quantum',blurb:'Heal your feelings about your body, not the body itself',img:'snd_ocean',xy:true,
  ylabel:'What about your body? (Y)',ydef:'my body weight',ychips:['my body weight','how I look','others’ opinions about my body'],xdef:['sadness','worry','rejection','low self-esteem','embarrassment','hurt'],
  note:'This practice heals feelings. It does not replace medical or nutritional advice.',
  pre:['Here we heal only our feelings towards the body: not the weight, not the people. Sit and breathe through the feelings.'],
  resp:['I take 100% responsibility to heal my feelings of {x} because of {y}.','I accept myself completely, including the emotions I don’t want to feel, as part of my growth.'],
  sorry:['For my feelings of {x} because of {y}, I’m sorry. I’m sorry, my feelings, for suppressing you for so long.'],
  forgive:['For my feelings of {x}, please forgive me, for getting triggered and not knowing what inside me created this.'],
  thanks:['For my feelings of {x}, thank you. Had they not come up, I wouldn’t know what needs cleaning.','Thank you for making me more confident, accepting and loving.'],
  love:['I love these feelings, and these feelings love me. I love how I feel about my body. My body loves me.','For anyone in the world going through the same struggle: I’m sorry, please forgive me, thank you, I love you.'],
  letgo:['I let go. I let God. Dear Divine, cleanse this pattern of feeling {x} about {y}.'],
  affirm:['Everything is perfect just the way it is in this phase of my healing.','I love the way I look. I feel confident in my body.','I naturally crave what is healthy for me.','I enjoy moving my body. The right information flows to me.','I am getting what I want, or something even better.','I choose to be happy, fulfilled and blissful.']},
 {id:'qbusiness',cat:'quantum',title:'Clients & Business · Quantum',blurb:'Clean doubt and fear around selling your work',img:'sit_work',xy:true,
  ylabel:'What is triggering you? (Y)',ydef:'selling my work',ychips:['selling my work','people not showing up','negative feedback','pricing my services'],xdef:['doubt','fear of rejection','worry'],
  resp:['I take 100% responsibility to heal any {x} that comes up around {y}.'],
  sorry:['I’m sorry for any feelings of {x} attached to {y}.'],
  forgive:['Please forgive me for any {x} towards {y} and attracting ideal clients.'],
  thanks:['Thank you for healing my {x} around {y}.','Thank you for this situation. Now I can heal, clean and become abundant.'],
  love:['I love you, my feelings of {x}, and this situation, for the chance to vibrate in prosperity, creativity and joy.'],
  letgo:['I release all these feelings of {x}. I let go. I let God. Dear Divine, guide me to the right thoughts, feelings and actions.'],
  affirm:['Everything is perfect the way it is. My clients are perfect.','I have divine timing and guidance.','I healthily detach from outcomes. Everything is working in my favour.','Wow! Isn’t it amazing how easily my clients enrol?']},
 {id:'qattach',cat:'quantum',title:'Attachments · Quantum',blurb:'Release anxiety, fear and neediness around a person or desire',img:'sit_lettinggo',xy:true,
  ylabel:'Attached to… (Y)',ydef:'this person or desire',ychips:['my partner','my child','my goal','money','my home'],xdef:['anxiety','fear','desperation'],
  pre:['Ask: is this making me feel peaceful, or more anxious? Is it creating dependency?'],
  resp:['I take 100% responsibility to release any unhealthy attachment that is not serving me.','I take 100% responsibility to heal my {x} towards {y}. I am open to healthier ways to meet my needs.'],
  sorry:['I’m sorry for whatever in my memories causes {x} towards {y}.','I’m sorry for the childhood memories that make me scared of losing {y}.','I’m sorry for whatever in me believes I need others for my happiness.'],
  forgive:['Please forgive me for not knowing what creates so much {x} towards {y}.','Please forgive me if I am unable to let go and surrender.'],
  thanks:['Thank you, my {x}, for teaching me, and for leaving me with love.','Thank you for this present moment, which is perfect.'],
  love:['I love you, these energies of attachment, exactly as you are.','I love myself so much that I never put myself through this pain again.'],
  letgo:['I let go of all my worries. I release the fear of not being perfect.','I let go of unhealthy expectations. I am free to live the life I dream of.'],
  affirm:['I am good enough. I am whole. I am complete.','Everything is aligned with the rhythm of the universe.','I allow others to make their own way.']}
];
[...NEW_BASIC,...NEW_Q].forEach(s=>{SCRIPTS.push(s);SCR[s.id]=s;SCR_META[s.id]=[s.img,null]});

/* ---------- extra affirmation decks (open in the animated carousel) ---------- */
Object.assign(MSEC,{
 soul:{id:'soul',title:'Soul Consciousness',sub:'You are a divine soul',icon:'sun',ink:'#6A55A6',card:'linear-gradient(150deg,#F3EEFF,#E2D7F8)',bg:'linear-gradient(165deg,#FBF7FF 0%,#E5DBF9 50%,#F6E3C2 100%)',orb:'#FFE7B0',
  lines:[{h:'Begin',t:'Visualise a golden light expanding at the centre of your forehead.'},'I am a divine soul, master of my thoughts, my mind, my emotions and my body.','I always create divine intentions, thoughts and feelings from infinite wisdom, clarity and compassion.','I choose to act from courage and do what is right for all, including myself.','I am the creator of my destiny.',{h:'For any illusions from past memories',t:'I’m sorry. Please forgive me. Thank you. I love you.'},'I tune into my soul consciousness and clear all illusions.','I am creating my best future with everything I think, feel, say and do.','I commit to revealing my full potential.','I am always calm and stable.','I am always blissful, joyful and happy.','I am determined, fearless and resolved.','My mind, heart, body and soul are aligned and healthy.','I accept everyone. Every soul accepts me.','All my relationships are based on dignity and respect.','I am surrounded by the protective shield of the divine universe.']},
 huna:{id:'huna',title:'The 7 Huna Principles',sub:'Ancient Hawaiian wisdom',icon:'flower',ink:'#2F6E78',card:'linear-gradient(150deg,#E6F4F4,#CBE6E6)',bg:'linear-gradient(165deg,#F1FAF9 0%,#D0EAE8 55%,#F6E1C4 100%)',orb:'#CFF1EC',
  lines:[{h:'IKE · The world is what you think it is',t:'I create my ideal reality with my thoughts and beliefs.'},{h:'KALA · There are no limits',t:'I am free, limitless, and capable of all that I desire.'},{h:'MAKIA · Energy flows where attention goes',t:'My focus directs my energy toward positive outcomes.'},{h:'MANAWA · Now is the moment of power',t:'I use the power of this moment to shape my future.'},{h:'ALOHA · To love is to be happy with',t:'I embrace love and compassion in all my relationships.'},{h:'MANA · All power comes from within',t:'My strength and power come from within me.'},{h:'PONO · Effectiveness is the measure of truth',t:'I choose actions aligned with my true purpose, which bring positive results.'}]}
});

/* ---------- library catalogue ---------- */
const LIB=[
 {id:'basic',title:'Healing Scripts',sub:'Basic Ho’oponopono: speak to the person, body or situation',ink:'#6E6A35',tint:'#ECE6CC',icon:'leaf',
  items:['relationship','family','exam','money','health','healthprayer','time','business','attach','selfcomp','inner','self','letgo','anger','stress','habit','stuck'].map(id=>({k:'script',id}))},
 {id:'quantum',title:'Quantum & Advanced',sub:'Heal your feelings (X) towards any trigger (Y)',ink:'#6A55A6',tint:'#EDE6F5',icon:'sparkle',
  items:['qtemplate','qbody','qbusiness','qattach'].map(id=>({k:'script',id}))},
 {id:'affirm',title:'Affirmations',sub:'Swipe, speak, and feel them',ink:'#B04A6E',tint:'#F9E2E1',icon:'heart',
  items:[{k:'aff',id:'all',title:'Start Your Mornings',sub:'Gratitude, empowerment, health, love, wealth',img:'splash'},{k:'aff',id:'soul',title:'Soul Consciousness',sub:'You are a divine soul',img:'onb4'},{k:'aff',id:'huna',title:'The 7 Huna Principles',sub:'Ike, Kala, Makia, Manawa, Aloha, Mana, Pono',img:'snd_ocean'}]},
 {id:'discover',title:'Self-Discovery',sub:'Quizzes and reflections to know yourself',ink:'#4B6E91',tint:'#E2ECF4',icon:'search',
  items:[{k:'go',id:'ego',title:'Ego Self-Assessment',sub:'11 areas · where ego runs the show',img:'med_anger'},{k:'go',id:'egorelease',title:'Ego Release Exercise',sub:'Behaviour → fear → attachment → let go',img:'sit_lettinggo'},{k:'go',id:'empath',title:'Empath Quiz',sub:'Emotional, physical or intuitive?',img:'sit_family'},{k:'go',id:'emotions',title:'Emotions & Glimmers',sub:'Name what you feel, choose what you want to feel',img:'sit_selflove'},{k:'go',id:'colour',title:'Colour Your Feelings',sub:'Give your emotions colour and shape',img:'theme_sunset'}]},
 {id:'rituals',title:'Rituals & Practices',sub:'Daily and evening rituals',ink:'#B8612F',tint:'#FCE7D8',icon:'sun',
  items:[{k:'go',id:'victory',title:'Victorious Day',sub:'Script tomorrow before you sleep',img:'splash'},{k:'go',id:'bowl',title:'Burning Bowl',sub:'Write it, burn it, let it go',img:'onb4'},{k:'go',id:'fivefive',title:'55 × 5 Writing',sub:'One desire, 55 times, 5 days',img:'botanical'},{k:'go',id:'breath',title:'Breath Awareness',sub:'4 in · 4 hold · 6 out',img:'snd_nature'}]}
];
const scrLocked=s=>(s.cat==='quantum'&&!s.free&&!S.premium);
function libItem(it){if(it.k==='script'){const s=SCR[it.id];const lock=scrLocked(s);
  return `<button class="libi" data-a="go" data-v="script" data-p="${s.id}"><img src="${img(scrImg(s))}" alt="" loading="lazy"><span class="grow"><b>${esc(s.title)}</b><span class="small muted">${esc(s.blurb)}</span><span class="xs faint">${s.xy?'Quantum · X & Y':s.guide?'Guided':'Basic'} · ${lineCount(s)} lines</span></span>${lock?C.PremiumBadge():svg('chev','chev')}</button>`}
 const a=it.k==='aff'?`data-a="mplay" data-v="${it.id}"`:`data-a="go" data-v="${it.id}"`;
 return `<button class="libi" ${a}><img src="${img(it.img)}" alt="" loading="lazy"><span class="grow"><b>${it.title}</b><span class="small muted">${it.sub}</span></span>${svg('chev','chev')}</button>`}
const _lc=lineCount;
lineCount=s=>s.xy?['resp','sorry','forgive','thanks','love','letgo','affirm'].reduce((a,k)=>a+(s[k]||[]).length,0)+(s.pre||[]).length:_lc(s)+(s.pre||[]).length;

/* ---------- script engine: pre-lines, X/Y, temporary scripts ---------- */
const TMP={};
const _gs=getScript;getScript=id=>id&&id.startsWith('tmp:')?TMP[id]:_gs(id);
const _bl=buildLines;
buildLines=(s,mode,subject,feel)=>{
 if(s.xy){const y=subject||s.ydef,x=joinX(feel);const f=t=>t.replace(/\{x\}/g,x).replace(/\{y\}/g,y);
  return [...(s.pre||[]).map(t=>({stage:'guide',text:f(t)})),...['resp','sorry','forgive','thanks','love','letgo','affirm'].flatMap(k=>(s[k]||[]).map(t=>({stage:k,text:f(t)})))]}
 const out=_bl(s,mode,subject,feel);
 if(s.pre&&!s.custom&&!s.guide&&mode!=='quantum'){const n=subject||(s.subj?s.subj.def:'');return [...s.pre.map(t=>({stage:'guide',text:t.replace(/\{n\}/g,n)})),...out]}
 return out};
startScript=function(){const u=UI.scr;const s=getScript(u.id);const isQ=u.mode==='quantum'&&!s.guide&&!s.custom&&!s.xy;
 if((isQ||scrLocked(s))&&!S.premium){go('premium');toast(isQ?'Quantum scripts are part of Premium':`${s.title} is part of Premium`);return}
 if((isQ||s.xy)&&!u.feel.length){toast('Pick at least one feeling');return}
 const subject=u.subj.trim()||(s.xy?s.ydef:isQ?s.q.def:(s.subj?s.subj.def:''));
 Object.assign(R,{s,lines:buildLines(s,u.mode,u.subj.trim(),u.feel),i:0,phase:'lines',rounds:u.rounds,done:0,idx:0,before:u.heavy,after:Math.max(1,u.heavy-2),subject,
  mode:s.custom?'My script':s.guide?'Guided':s.xy||isQ?'Quantum':'Basic',sit:(SCR_META[s.id]||[])[1]||null,t0:Date.now(),prompt:0,leaveArm:0,auto:null,logged:false});
 S.rounds=u.rounds;save();$('#player').hidden=false;document.body.style.overflow='hidden';AMB.stop();R.lastChime=-1;drawReader();try{history.pushState({r:1},'')}catch(e){}};
function runTemp(title,lines,img,subject=''){const id='tmp:'+Date.now();TMP[id]={id,title,blurb:'',custom:lines.map(t=>({stage:classify(t),text:t})),tmpImg:img};UI.scr={id,mode:'basic',subj:subject,feel:[],heavy:6,rounds:S.rounds||11};startScript()}
const _si=scrImg;scrImg=s=>s.tmpImg||_si(s);

/* script setup screen (adds X & Y, info and premium) */
SCREENS.script=id=>{const s=getScript(id);if(!s)return SCREENS.library();
 if(!UI.scr||UI.scr.id!==id)UI.scr={id,mode:'basic',subj:'',feel:s.xy?[...s.xdef]:s.q?[...s.q.feel]:[],heavy:6,rounds:s.rounds||S.rounds||11,preview:false};
 const u=UI.scr;const isQ=u.mode==='quantum'&&!s.guide&&!s.custom&&!s.xy;const feelOn=isQ||s.xy;
 const field=s.xy?{label:s.ylabel,def:s.ydef,chips:s.ychips}:isQ?{label:'What or who is it about?',def:s.q.def,chips:s.subj?s.subj.chips:[]}:s.subj;
 const lines=buildLines(s,u.mode,u.subj.trim(),u.feel);const lock=scrLocked(s)||(isQ&&!S.premium);
 const chips=[...new Set([...u.feel,...FEELINGS])];
 return `<div style="position:relative;margin:0 -20px;height:210px;overflow:hidden;border-radius:0 0 32px 32px"><img src="${img(scrImg(s))}" alt="" style="width:100%;height:100%;object-fit:cover">
   <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),transparent 40%,rgba(20,24,20,.7))"></div>
   <button class="iconbtn soft" data-a="back" aria-label="Back" style="position:absolute;left:16px;top:calc(14px + env(safe-area-inset-top,0px))">${svg('back','',2)}</button>
   <div style="position:absolute;left:22px;right:22px;bottom:18px;color:#fff"><p class="xs" style="letter-spacing:.14em;font-weight:700;opacity:.9">${s.xy?'QUANTUM · ADVANCED HEALING':s.guide?'GUIDED SCRIPT':s.mine?'MY SCRIPT':'HO’OPONOPONO SCRIPT'}</p><h1 class="h-xl" style="text-shadow:0 2px 12px rgba(0,0,0,.4)">${esc(s.title)}</h1></div></div>
  <div class="stack stagger" style="margin-top:18px;gap:20px">
   ${s.info?`<div class="card flat small" style="background:var(--sage-soft);border:0;display:flex;gap:10px"><span style="color:var(--sage);flex:none">${svg('info').replace('<svg','<svg width="20" height="20"')}</span><span>${esc(s.info)}</span></div>`:''}
   ${s.note?`<p class="xs muted">${esc(s.note)}</p>`:''}
   ${s.guide||s.custom||s.xy?'':`<div><div class="seg3" style="grid-template-columns:1fr 1fr"><button data-a="smode" data-v="basic" aria-pressed="${u.mode==='basic'}">Basic</button><button data-a="smode" data-v="quantum" aria-pressed="${u.mode==='quantum'}">Quantum${S.premium?'':' · Premium'}</button></div>
    <p class="small muted" style="margin-top:8px">${isQ?'Quantum cleans how you feel about it. Pick the feelings that come up.':'Basic cleans the situation itself. You speak to it directly.'}</p></div>`}
   ${field?`<div><label class="h-sm" for="ssubj" style="display:block;margin-bottom:8px">${field.label}</label><input id="ssubj" class="nameinput" style="background:var(--ivory);min-height:50px;font-size:1.05rem" value="${esc(u.subj)}" placeholder="${esc(field.def)}">
    ${field.chips&&field.chips.length?`<div class="chips" style="margin-top:10px">${field.chips.map(c=>`<button class="chip" data-a="ssubj" data-v="${esc(c)}" aria-pressed="${u.subj===c}">${esc(c)}</button>`).join('')}</div>`:''}</div>`:''}
   ${feelOn?`<div><p class="h-sm">What are you feeling? (X)</p><p class="xs muted" style="margin:2px 0 8px">Name and label your emotions honestly. Selected: ${u.feel.length}</p><div class="feelwrap">${chips.map(f=>`<button class="chip" data-a="sfeel" data-v="${esc(f)}" aria-pressed="${u.feel.includes(f)}">${esc(f)}</button>`).join('')}</div></div>`:''}
   <div class="card flat"><div class="row between"><p class="h-sm">How heavy does it feel?</p><p class="serif" style="font-size:1.6rem;font-weight:700;line-height:1">${u.heavy}<span class="small muted"> / 10</span></p></div>
    <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;margin-top:10px" role="radiogroup" aria-label="Heaviness">${Array.from({length:10},(_,i)=>`<button data-a="sheavy" data-v="${i+1}" role="radio" aria-checked="${u.heavy===i+1}" aria-label="${i+1}" style="height:28px;border:0;border-radius:8px;background:${i<u.heavy?'linear-gradient(180deg,#EFA9BD,#C2567A)':'var(--beige)'}"></button>`).join('')}</div>
    <div class="row between xs faint" style="margin-top:6px"><span>Light</span><span>Very heavy</span></div></div>
   <div><p class="h-sm" style="margin-bottom:8px">Then repeat the four phrases</p><div class="seg3">${[11,55,108].map(r=>`<button data-a="srounds" data-v="${r}" aria-pressed="${u.rounds===r}">${r} times</button>`).join('')}</div></div>
   <details class="faq" ${u.preview?'open':''}><summary>Preview all ${lines.length} lines ${svg('down','chev')}</summary><div class="stack" style="gap:8px;margin-top:12px">${lines.map(l=>`<p class="small" style="padding-left:10px;border-left:3px solid ${stageInk(l.stage)}">${esc(l.text)}</p>`).join('')}</div></details>
   ${C.PrimaryButton(lock?`${svg('lock','',2)} Unlock with Premium`:'Begin session','sbegin')}
   ${s.mine?C.SecondaryButton('Edit this script','go','scriptedit',`data-p="${s.id.slice(3)}"`):''}
  </div>`};
ACT.sfeel=v=>{const f=UI.scr.feel;const i=f.indexOf(v);i>=0?f.splice(i,1):f.push(v);rerender()};
const _ssubj=ACT.ssubj;ACT.ssubj=v=>{const s=getScript(UI.scr.id);if(s&&s.presets&&s.presets[v])UI.scr.feel=[...s.presets[v]];_ssubj(v)};

/* ---------- self-discovery data ---------- */
const EGO=[
 {id:'crit',t:'Self-criticism',q:['Do you often think or say negative things about yourself?','Do you frequently feel you’re not good enough?'],fear:'I am not good enough.',att:'Being perfect so that I am accepted.',let:'The belief that I must be flawless to be worthy.'},
 {id:'comp',t:'Comparison',q:['Do you regularly compare yourself to others?','Do you feel inferior or superior because of it?'],fear:'I am less than others.',att:'Measuring my worth against others.',let:'The need to rank myself against anyone.'},
 {id:'def',t:'Defensiveness',q:['Do you get defensive when given feedback?','Is it hard to accept you might be wrong?'],fear:'Being exposed or judged.',att:'Always being seen as right.',let:'The need to protect my image.'},
 {id:'jeal',t:'Jealousy & inferiority',q:['Do you feel envious of others’ success, looks or possessions?','Does others’ good fortune make you feel bad about yourself?'],fear:'There isn’t enough for me.',att:'Having what others have.',let:'The belief in lack and scarcity.'},
 {id:'blame',t:'Blaming',q:['Do you often blame others for your problems?','Is it hard to take responsibility for your triggers and actions?'],fear:'That it is my fault and I am bad.',att:'Being blameless.',let:'Giving my power away to others.'},
 {id:'appr',t:'Seeking approval',q:['Do you constantly seek validation from others?','Do you feel anxious without praise or recognition?'],fear:'Being rejected or invisible.',att:'Others’ approval as proof of my worth.',let:'The need for outside validation.'},
 {id:'fut',t:'Worrying about the future',q:['Do you frequently worry about what might happen?','Does future anxiety affect how you act and feel today?','Do you get impatient?'],fear:'Losing control of what happens.',att:'Certainty about the future.',let:'The illusion that worry keeps me safe.'},
 {id:'past',t:'Regretting the past',q:['Do you dwell on past mistakes or missed chances?','Is it hard to let go of regrets?'],fear:'I ruined something forever.',att:'A past that should have been different.',let:'The weight of what I cannot change.'},
 {id:'fail',t:'Fear of failure',q:['Do you avoid new challenges for fear of failing?','Does fear of mistakes stop you from trying?'],fear:'Humiliation and not being good enough.',att:'Being seen as successful.',let:'The belief that my worth depends on success.'},
 {id:'pride',t:'Pride',q:['Do you feel a strong need to be right?','Do you often feel superior to others?'],fear:'Being ordinary or small.',att:'Being special and right.',let:'The need to be above others.'},
 {id:'poss',t:'Possessiveness',q:['Do you feel overly controlling or protective of loved ones?','Is it hard to give them space?','Do you feel responsible for their emotions and life?'],fear:'Losing loved ones and being left alone.',att:'Control over loved ones for my own security.',let:'The need to control others to feel safe.'}
];
const EGO_EX={poss:'Telling your partner, “Why do you go out with your friends so often? Don’t you care about me?”',fail:'Missing a goal and feeling like a loser in front of successful peers.',fut:'Waiting in a queue and thinking, “Why is this taking so long? I have better things to do.”'};
const EMP=[
 {q:'When you walk into a crowded room, you usually feel…',a:['Overwhelmed by others’ emotions','Physically drained or unwell','Strong gut feelings about the people there']},
 {q:'When a friend is feeling down, you…',a:['Instantly sense and feel it too','Sometimes feel physical symptoms like theirs','Know what’s troubling them without asking']},
 {q:'When you hear about someone’s illness, you…',a:['Feel a deep emotional response','Start feeling similar symptoms','Have a strong intuition about their condition']},
 {q:'During a stressful event, you…',a:['Absorb and mirror the tension around you','Get headaches or stomach-aches','Sense intuitively how things will unfold']},
 {q:'After time with a highly emotional person, you feel…',a:['Emotionally drained','Physically tired or sore','Aware of their deeper issues']}
];
const EMP_RES={a:['Emotional Empath','You deeply feel and absorb the emotions of people around you.'],b:['Physical Empath','You are sensitive to the physical symptoms and discomfort of others.'],c:['Intuitive Empath','You understand people and situations on a deep, instinctive level.'],all:['Highly Sensitive','You carry all three empath tendencies: emotional, physical and intuitive.']};

/* ---------- screens ---------- */
Object.assign(SCREENS,{
library:()=>{const cat=UI.libCat||'all';const cats=cat==='all'?LIB:LIB.filter(c=>c.id===cat);
 return `${C.TopHeader('Healing Library')}
  <div class="chips" role="toolbar" aria-label="Categories">${[['all','All'],...LIB.map(c=>[c.id,c.title])].map(([v,l])=>C.Chip(l,'libcat',v,cat===v)).join('')}</div>
  ${cats.map(c=>`<section style="margin-top:22px"><div class="row" style="gap:12px;margin-bottom:12px"><span class="libic" style="background:${c.tint};color:${c.ink}">${svg(c.icon)}</span><div><h2 class="h-md">${c.title}</h2><p class="xs muted">${c.sub}</p></div></div>
   <div class="stack stagger" style="gap:10px">${c.items.map(libItem).join('')}</div></section>`).join('')}`},
ego:()=>{const A=UI.ego||(UI.ego={});const n=Object.keys(A).length;const done=n===EGO.length;
 const top=done?EGO.map(e=>({e,v:A[e.id]})).sort((a,b)=>b.v-a.v).filter(x=>x.v>0).slice(0,3):[];
 return `${C.TopHeader('Ego Self-Assessment')}
  <p class="muted small">Answer honestly. There are no right or wrong answers; this simply shows where ego consciousness may be running your reactions.</p>
  <div class="mbar" style="height:6px;margin:14px 0"><i style="width:${n/EGO.length*100}%"></i></div>
  <div class="stack stagger" style="gap:12px">${EGO.map((e,i)=>`<section class="card" style="padding:16px"><p class="xs faint" style="font-weight:700;letter-spacing:.1em">${i+1} OF ${EGO.length}</p><h3 class="h-md" style="margin:2px 0 8px">${e.t}</h3>
   <ul style="margin:0 0 12px;padding-left:18px" class="small muted">${e.q.map(q=>`<li>${q}</li>`).join('')}</ul>
   <div class="seg3">${[['0','Rarely'],['1','Sometimes'],['2','Often']].map(([v,l])=>`<button data-a="egoans" data-v="${e.id}:${v}" aria-pressed="${String(A[e.id])===v}">${l}</button>`).join('')}</div></section>`).join('')}</div>
  ${done?`<section class="card stack" style="margin-top:18px;gap:10px;background:linear-gradient(135deg,#E2ECF4,#EDE6F5)"><h2 class="h-md">Your strongest tendencies</h2>
   ${top.length?top.map(x=>`<div class="row"><span class="num" style="width:34px;height:34px;background:${x.v===2?'#6A55A6':'#9C8CCB'}">${x.v===2?'!':'~'}</span><span class="grow"><b>${x.e.t}</b><span class="small muted" style="display:block">${x.v===2?'Often':'Sometimes'}</span></span></div>`).join(''):'<p class="muted">You answered “rarely” to every area. Beautiful awareness.</p>'}
   <p class="small muted">Which of these do you notice most often? Take them into the release exercise.</p>
   ${C.PrimaryButton('Continue to the Ego Release Exercise','egogo')}</section>`:`<p class="xs faint center" style="margin-top:14px">${EGO.length-n} areas left</p>`}`},
egorelease:()=>{const E=UI.egoRel||(UI.egoRel={pick:[],f:{}});
 return `${C.TopHeader('Ego Release Exercise')}
  <p class="muted small">1. Choose 3 behaviours you relate to. 2. Uncover the fear. 3. Reflect on the attachment. 4. Name what you need to let go of. 5. Release it with Ho’oponopono.</p>
  ${C.SectionHeader('Choose up to 3 behaviours')}
  <div class="feelwrap">${EGO.map(e=>`<button class="chip" data-a="egopick" data-v="${e.id}" aria-pressed="${E.pick.includes(e.id)}">${e.t}</button>`).join('')}</div>
  <div class="stack stagger" style="gap:14px;margin-top:18px">${E.pick.map(id=>{const e=EGO.find(x=>x.id===id);const f=E.f[id]||{};return `<section class="card stack" style="gap:10px"><h3 class="h-md">${e.t}</h3>${EGO_EX[id]?`<p class="small muted"><i>For example: ${EGO_EX[id]}</i></p>`:''}
    ${[['fear','The fear underneath',e.fear],['att','The attachment',e.att],['let','What I need to let go of',e.let]].map(([k,l,ph])=>`<label class="stack" style="gap:4px"><span class="small" style="font-weight:600">${l}</span><input class="nameinput" data-ego="${id}:${k}" value="${esc(f[k]||'')}" placeholder="${esc(ph)}" style="background:var(--cream)"></label>`).join('')}</section>`}).join('')}</div>
  <div style="margin-top:18px">${E.pick.length?C.PrimaryButton('Release with Ho’oponopono','egorun'):`<p class="empty">Pick a behaviour above to begin.</p>`}</div>`},
empath:()=>{const A=UI.emp||(UI.emp=[]);const done=A.length===EMP.length;
 if(done){const c={a:0,b:0,c:0};A.forEach(x=>c[x]++);const mx=Math.max(c.a,c.b,c.c);const tops=['a','b','c'].filter(k=>c[k]===mx);const r=EMP_RES[tops.length>1||(c.a&&c.b&&c.c&&mx<3)?'all':tops[0]];
  S.empath=r[0];save();
  return `${C.TopHeader('Empath Quiz')}<section class="card stack center" style="gap:12px;padding:30px 22px;background:linear-gradient(160deg,#EDE6F5,#E2ECF4);margin-top:10px">
   <img src="${img('lotuscircle')}" alt="" style="width:84px;height:84px;margin:0 auto" class="bobimg"><p class="xs" style="letter-spacing:.14em;font-weight:700;color:#4B6E91">YOU ARE LIKELY AN</p><h2 class="h-xl">${r[0]}</h2><p class="muted">${r[1]}</p>
   <div class="row" style="justify-content:center;gap:16px;margin-top:6px">${['a','b','c'].map((k,i)=>`<div><b class="serif" style="font-size:1.6rem">${c[k]}</b><p class="xs muted">${['Emotional','Physical','Intuitive'][i]}</p></div>`).join('')}</div></section>
   <div class="card stack" style="margin-top:14px;gap:8px"><b>Caring for your sensitivity</b><p class="small muted">Clean what you absorb from others with Quantum Ho’oponopono, and use the Soul Consciousness affirmations to call in your protective shield.</p>
   <div class="stack" style="gap:8px">${C.SecondaryButton('Quantum Healing · X & Y','go','script','data-p="qtemplate"')}${C.SecondaryButton('Soul Consciousness affirmations','mplay','soul')}${C.SecondaryButton('Take the quiz again','empreset')}</div></div>`}
 const i=A.length;const q=EMP[i];
 return `${C.TopHeader('Empath Quiz')}<div class="mbar" style="height:6px;margin:4px 0 20px"><i style="width:${i/EMP.length*100}%"></i></div>
  <p class="xs faint" style="font-weight:700;letter-spacing:.12em">QUESTION ${i+1} OF ${EMP.length}</p><h2 class="h-lg" style="margin:6px 0 18px">${q.q}</h2>
  <div class="stack stagger" style="gap:10px">${q.a.map((t,k)=>`<button class="opt" style="min-height:64px;padding:14px 16px" data-a="empans" data-v="${'abc'[k]}"><span class="radio"></span>${t}</button>`).join('')}</div>
  ${i?`<button class="link small" data-a="empback" style="margin-top:12px">${svg('back','',2).replace('<svg','<svg width="14" height="14" style="vertical-align:-2px"')} Previous question</button>`:''}`},
emotions:()=>{const E=UI.emo||(UI.emo={x:[],g:[]});
 return `${C.TopHeader('Emotions & Glimmers')}
  <div class="card" style="background:linear-gradient(135deg,#FBE3E2,#EDE6F5)"><p class="small">The people, objects, places and situations around you are messengers. They show which old, unhealed emotions are replaying. Name the feeling, clean it, then anchor into a glimmer.</p></div>
  ${C.SectionHeader('What am I feeling right now?')}<p class="xs muted" style="margin-top:-6px">Triggered emotions and states of mind</p>
  <div class="feelwrap" style="margin-top:10px">${TRIGGERED.slice(0,45).map(f=>`<button class="chip" data-a="emox" data-v="${esc(f)}" aria-pressed="${E.x.includes(f)}">${f}</button>`).join('')}</div>
  ${C.SectionHeader('How would I love to feel?')}<p class="xs muted" style="margin-top:-6px">Glimmer emotions</p>
  <div class="feelwrap" style="margin-top:10px">${GLIMMERS.map(f=>`<button class="chip glim" data-a="emog" data-v="${f}" aria-pressed="${E.g.includes(f)}">${f}</button>`).join('')}</div>
  <div class="stack" style="margin-top:22px;gap:10px">${C.PrimaryButton(E.x.length?`Clean ${E.x.length} feeling${E.x.length>1?'s':''} with Quantum Ho’oponopono`:'Choose a feeling to clean','emoclean')}${C.SecondaryButton('Colour these feelings','go','colour')}</div>`},
colour:()=>`${C.TopHeader('Colour Your Feelings')}
  <p class="muted small">Ask: what am I feeling? What colour is it? What shape? Give darker, heavier textures to intense feelings, and lighter colours to hope. You don’t need to name them.</p>
  <div class="cvwrap"><canvas id="cv" aria-label="Drawing canvas for your feelings"></canvas></div>
  <div class="row" style="flex-wrap:wrap;gap:8px;margin-top:12px" role="radiogroup" aria-label="Colour">${['#2E2A3B','#5A2D3E','#8C3B2E','#C0613A','#5E7AA6','#6E9A6A','#E7B45C','#F4DE9C','#F5C3D2','#FFFFFF'].map((c,i)=>`<button class="swatch" role="radio" data-a="cvcol" data-v="${c}" aria-checked="${(UI.cvc||'#5A2D3E')===c}" aria-label="Colour ${i+1}" style="background:${c}"></button>`).join('')}</div>
  <div class="row" style="margin-top:12px;gap:10px"><span class="small muted">Brush</span><input type="range" id="cvsize" min="4" max="60" value="${UI.cvs||18}" style="flex:1;accent-color:var(--sage)" aria-label="Brush size"><button class="btn btn-secondary btn-sm" data-a="cvclear">Clear</button></div>
  <div class="stack" style="margin-top:16px;gap:10px">${C.PrimaryButton('Write about it in my journal','cvjournal')}</div>`,
victory:()=>{const V=UI.vic||(UI.vic={date:(()=>{const d=new Date();d.setDate(d.getDate()+1);return dk(d)})(),text:'',aff:['','','']});
 return `${C.TopHeader('Victorious Day')}
  <div class="card" style="background:linear-gradient(135deg,#FFF1DC,#FBE3E6)"><p class="h-sm">What would make tomorrow great?</p><p class="small muted" style="margin-top:4px">Before sleep, write the day as if it has already happened, vividly and in detail. Feel how it felt.</p></div>
  <label class="stack" style="gap:6px;margin-top:16px"><span class="h-sm">I claim a victorious day on</span><input type="date" id="vdate" class="nameinput" value="${V.date}" style="background:var(--ivory)"></label>
  <div class="chips" style="margin-top:14px">${['Isn’t it so beautiful that ','Isn’t it so wonderful! ','Wow, this happened! ','How lucky I am to ','I woke up feeling ','I am so grateful for '].map(t=>`<button class="chip" data-a="vstart" data-v="${esc(t)}">${esc(t.trim())}</button>`).join('')}</div>
  <textarea id="vtext" class="write" style="min-height:190px;margin-top:10px" placeholder="I woke up refreshed and energised. My meeting went beautifully and I was appreciated…">${esc(V.text)}</textarea>
  ${C.SectionHeader('Three affirmations for this day')}
  <div class="stack" style="gap:8px">${[0,1,2].map(i=>`<input class="nameinput" data-vaff="${i}" value="${esc(V.aff[i])}" placeholder="${['This or something better is coming to me!','I see victory tomorrow.','Everything is working out for my highest good.'][i]}" style="background:var(--ivory)">`).join('')}</div>
  <div class="stack" style="margin-top:18px;gap:10px">${C.PrimaryButton('Save & clean with the four phrases','vsave')}<p class="xs faint center">It works best in a state of flow, hope and neutrality. If the day doesn’t go as planned, it only means there is more to clean.</p></div>`}
});

/* ---------- hooks ---------- */
AFTER.egorelease=()=>document.querySelectorAll('[data-ego]').forEach(i=>i.oninput=()=>{const[id,k]=i.dataset.ego.split(':');(UI.egoRel.f[id]=UI.egoRel.f[id]||{})[k]=i.value});
AFTER.victory=()=>{const V=UI.vic;$('#vdate').onchange=e=>V.date=e.target.value;$('#vtext').oninput=e=>V.text=e.target.value;document.querySelectorAll('[data-vaff]').forEach(i=>i.oninput=()=>V.aff[+i.dataset.vaff]=i.value)};
AFTER.colour=()=>{const cv=$('#cv');const c=cv.getContext('2d');const dpr=devicePixelRatio||1;cv.width=cv.clientWidth*dpr;cv.height=cv.clientHeight*dpr;c.scale(dpr,dpr);c.lineCap='round';c.lineJoin='round';
 if(UI.cvImg){const im=new Image();im.onload=()=>c.drawImage(im,0,0,cv.clientWidth,cv.clientHeight);im.src=UI.cvImg}
 let down=false,lx,ly;const pos=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
 cv.onpointerdown=e=>{down=true;cv.setPointerCapture(e.pointerId);[lx,ly]=pos(e);c.fillStyle=UI.cvc||'#5A2D3E';c.globalAlpha=.55;c.beginPath();c.arc(lx,ly,(UI.cvs||18)/2,0,7);c.fill()};
 cv.onpointermove=e=>{if(!down)return;const[x,y]=pos(e);c.strokeStyle=UI.cvc||'#5A2D3E';c.globalAlpha=.5;c.lineWidth=UI.cvs||18;c.beginPath();c.moveTo(lx,ly);c.lineTo(x,y);c.stroke();lx=x;ly=y};
 cv.onpointerup=()=>{down=false;try{UI.cvImg=cv.toDataURL()}catch(e){}};$('#cvsize').oninput=e=>UI.cvs=+e.target.value};

Object.assign(ACT,{
 libcat:v=>{UI.libCat=v;rerender()},
 egoans:v=>{const[id,x]=v.split(':');UI.ego[id]=+x;S.egoRes={date:dk(),a:UI.ego};save();rerender()},
 egogo:()=>{const top=EGO.map(e=>({id:e.id,v:UI.ego[e.id]})).sort((a,b)=>b.v-a.v).filter(x=>x.v>0).slice(0,3).map(x=>x.id);UI.egoRel={pick:top.length?top:['poss','fail','fut'],f:{}};go('egorelease')},
 egopick:v=>{const p=UI.egoRel.pick;const i=p.indexOf(v);if(i>=0)p.splice(i,1);else{if(p.length>=3){toast('Choose up to 3 behaviours');return}p.push(v)}rerender()},
 egorun:()=>{const lines=['I take 100% responsibility for the ego consciousness in me, and for the memories underneath it.'];
  UI.egoRel.pick.forEach(id=>{const e=EGO.find(x=>x.id===id);const f=UI.egoRel.f[id]||{};const fear=(f.fear||e.fear).replace(/\.$/,''),att=(f.att||e.att).replace(/\.$/,''),lt=(f.let||e.let).replace(/\.$/,'');
   lines.push(`For my ${e.t.toLowerCase()}, and the fear underneath it (“${fear}”), I’m sorry.`,`Please forgive me for my attachment to ${att.charAt(0).toLowerCase()+att.slice(1)}.`,`Thank you, ${e.t.toLowerCase()}, for showing me what needs to heal.`,`I love you, and I release ${lt.charAt(0).toLowerCase()+lt.slice(1)}. I let go. I let God.`)});
  lines.push('I connect with my divine identity. I am a divine soul.','I’m sorry. Please forgive me. Thank you. I love you.');runTemp('Ego Release',lines,'sit_lettinggo')},
 empans:v=>{UI.emp.push(v);rerender()}, empback:()=>{UI.emp.pop();rerender()}, empreset:()=>{UI.emp=[];rerender()},
 emox:v=>{const a=UI.emo.x;const i=a.indexOf(v);i>=0?a.splice(i,1):a.push(v);rerender()},
 emog:v=>{const a=UI.emo.g;const i=a.indexOf(v);i>=0?a.splice(i,1):a.push(v);rerender()},
 emoclean:()=>{if(!UI.emo.x.length){toast('Tap the feelings you notice first');return}UI.scr={id:'qtemplate',mode:'basic',subj:'',feel:[...UI.emo.x],heavy:6,rounds:S.rounds||11,preview:false};
  const g=UI.emo.g;SCR.qtemplate.affirm=['Everything is perfect in this phase of my healing journey.',...(g.length?[`I now choose to feel ${joinX(g)}.`]:[]),'I am calm, relaxed and peaceful.'];go('script','qtemplate')},
 cvcol:v=>{UI.cvc=v;document.querySelectorAll('.swatch').forEach(b=>b.setAttribute('aria-checked',b.dataset.v===v))},
 cvclear:()=>{UI.cvImg=null;rerender()},
 cvjournal:()=>{UI.jPrompt='body';UI.jDate=dk();S.draft='When I coloured my feelings, I noticed ';save();go('journal')},
 vstart:v=>{const t=$('#vtext');t.value=(t.value&&!/\s$/.test(t.value)?t.value+'\n':t.value)+v;UI.vic.text=t.value;t.focus()},
 vsave:()=>{const V=UI.vic;const t=($('#vtext').value||'').trim();if(!t){toast('Describe your victorious day first');return}
  const affs=V.aff.filter(Boolean);S.journal.push({id:Date.now(),date:dk(),ts:Date.now(),prompt:'thanks3',ptext:`Victorious Day · ${fmtDate(V.date)}`,text:t+(affs.length?'\n\nAffirmations:\n• '+affs.join('\n• '):'')});
  S.rituals=S.rituals||[];S.rituals.push({type:'victory',date:dk()});save();toast('Victorious Day saved to your journal');
  runTemp('Victorious Day',['I release any limiting belief, erroneous thought or unhealthy attachment towards my desire of a victorious day.','I’m sorry. Please forgive me. Thank you. I love you.',...affs,'Everything is possible!'],'splash');UI.vic=null}
});

/* ---------- entry points ---------- */
const _home3=SCREENS.home;
SCREENS.home=p=>_home3(p).replace('<div class="tiles">',`${C.SectionHeader('Healing Library',`<button class="link small" data-a="go" data-v="library">See all</button>`)}<div class="hlib">${LIB.map(c=>`<button class="hcat" data-a="golib" data-v="${c.id}" style="background:${c.tint}"><span style="color:${c.ink}">${svg(c.icon).replace('<svg','<svg width="24" height="24"')}</span><b>${c.title}</b><span class="xs muted">${c.items.length} ${c.id==='affirm'?'decks':c.id==='discover'?'tools':c.id==='rituals'?'rituals':'scripts'}</span></button>`).join('')}</div><div class="tiles">`);
ACT.golib=v=>{UI.libCat=v;go('library')};
const _more3=SCREENS.more;
SCREENS.more=p=>_more3(p).replace('<button class="li" data-a="go" data-v="myscripts">',`<button class="li" data-a="go" data-v="library"><span class="ico" style="background:#EDE6F5;color:#6A55A6">${svg('sparkle')}</span><span class="grow">Healing Library</span>${svg('chev','chev')}</button><button class="li" data-a="go" data-v="myscripts">`);
const _sits=SCREENS.situations;
SCREENS.situations=p=>_sits(p)+`<button class="card row" data-a="go" data-v="library" style="border:0;width:100%;text-align:left;margin-top:12px;background:linear-gradient(120deg,#EDE6F5,#E2ECF4)"><span style="color:#6A55A6">${svg('sparkle').replace('<svg','<svg width="26" height="26"')}</span><span class="grow"><b style="display:block">Open the full Healing Library</b><span class="small muted">Quantum scripts, affirmations, quizzes and rituals</span></span>${svg('chev','chev')}</button>`;
const _daily3=SCREENS.daily;
SCREENS.daily=p=>_daily3(p).replace('<button class="pitem" data-a="go" data-v="situations">',`<button class="pitem" data-a="go" data-v="victory"><span class="num" style="background:#FFF1DC;color:#A5691A">${svg('sun')}</span><span class="grow"><b style="display:block">Victorious Day</b><span class="small muted">Script tomorrow before you sleep.</span></span>${svg('chev','chev')}</button><button class="pitem" data-a="go" data-v="situations">`);
