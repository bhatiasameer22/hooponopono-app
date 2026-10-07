/* ================= DATA ================= */
const I = {
  back:'<path d="M15 5l-7 7 7 7"/>', chev:'<path d="M9 5l7 7-7 7"/>', down:'<path d="M6 9l6 6 6-6"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>', close:'<path d="M6 6l12 12M18 6L6 18"/>',
  bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  home:'<path d="M4 11l8-6.5 8 6.5v9h-5.5v-6h-5v6H4z"/>',
  medit:'<circle cx="12" cy="5.5" r="2.3"/><path d="M12 8.5c-2.5 0-4 1.6-4 4v1.5l-3.5 2.5M12 8.5c2.5 0 4 1.6 4 4v1.5l3.5 2.5M5 19c2.3-1.3 4.6-2 7-2s4.7.7 7 2"/>',
  journal:'<path d="M6 3.5h10.5L19 6v14.5H6z"/><path d="M9 9h7M9 12.5h7M9 16h4"/>',
  progress:'<path d="M4 17l5-5 4 3 7-8"/><path d="M15 7h5v5"/>',
  more:'<circle cx="5.5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18.5" cy="12" r="1.4"/>',
  play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
  pause:'<rect x="6.5" y="5" width="3.8" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.7" y="5" width="3.8" height="14" rx="1" fill="currentColor" stroke="none"/>',
  heart:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
  heartFill:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" fill="currentColor"/>',
  repeat:'<path d="M17 3l3 3-3 3"/><path d="M4 11V9a3 3 0 0 1 3-3h13"/><path d="M7 21l-3-3 3-3"/><path d="M20 13v2a3 3 0 0 1-3 3H4"/>',
  timer:'<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>',
  image:'<rect x="3.5" y="4.5" width="17" height="13" rx="2.5"/><path d="M8.5 21h7M12 17.5V21"/><path d="M6.5 14l3.5-3.5 3 3 2-2 2.5 2.5"/>',
  rw:'<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4 3.5v4h4"/>', fw:'<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M20 3.5v4h-4"/>',
  lock:'<rect x="5" y="11" width="14" height="9.5" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>', plus:'<path d="M12 5v14M5 12h14"/>',
  download:'<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>', downloaded:'<path d="M5 12.5l4.5 4.5L19 7.5"/><path d="M5 20h14"/>',
  user:'<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5"/>',
  star:'<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
  crown:'<path d="M4 17.5l-1-10 5 4 4-6.5 4 6.5 5-4-1 10z"/><path d="M4.5 20.5h15"/>',
  shield:'<path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z"/>',
  doc:'<path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4M9 12h6M9 15.5h6"/>',
  help:'<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.4"/><circle cx="12" cy="17" r=".8" fill="currentColor"/>',
  info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".8" fill="currentColor"/>',
  sound:'<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>',
  leaf:'<path d="M5 19c0-8.5 5.5-13.5 14.5-14 0 9-5.5 14-13.5 14"/><path d="M5 19l7.5-7.5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  flower:'<circle cx="12" cy="12" r="2.4"/><path d="M12 9.6C10.3 6.4 12 3.5 12 3.5s1.7 2.9 0 6.1M14.4 12c3.2-1.7 6.1 0 6.1 0s-2.9 1.7-6.1 0M12 14.4c1.7 3.2 0 6.1 0 6.1s-1.7-2.9 0-6.1M9.6 12C6.4 13.7 3.5 12 3.5 12s2.9-1.7 6.1 0"/>',
  refresh:'<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4.5h-4.5"/>', trash:'<path d="M5 7h14M9.5 7V4.5h5V7M7 7l1 13h8l1-13"/>',
  edit:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>', calendar:'<rect x="4" y="5.5" width="16" height="15" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  wind:'<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3"/>', sparkle:'<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
  speaker:'<path d="M11 5L6 9H3v6h3l5 4zM15.5 9a4 4 0 0 1 0 6M18.5 6a8 8 0 0 1 0 12"/>'
};
const svg=(k,cls='',sw=1.8)=>`<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const LOTUS_MARK=`<svg class="lotus-mark" viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M32 6c5.5 6 7.5 13 7.5 19 0 8-3.4 14-7.5 17-4.1-3-7.5-9-7.5-17 0-6 2-13 7.5-19z"/><path d="M24.6 22c-5-2-10-1.7-13.6 0 .6 9.5 7.8 17.3 21 20"/><path d="M39.4 22c5-2 10-1.7 13.6 0-.6 9.5-7.8 17.3-21 20"/><path d="M11 22.4C7 22 4 23 2 24.6c3.4 9.4 13 15.8 30 17.4M53 22.4c4-.4 7 .6 9 2.2-3.4 9.4-13 15.8-30 17.4"/></svg>`;

const MANTRA=['I’m sorry','Please forgive me','Thank you','I love you'];

/* Meditations. Guided lines are written for this app in the Ho'oponopono cleaning style. */
const MEDS=[
 {id:'mantra',title:'Return to Peace',pos:'20% 50%',min:5,tag:'Healing song',cats:['beginners','healing'],img:'med_mantra',free:true,audio:true,dur:300,sub:'Release · Forgive · Give thanks · Choose love',hz:528,
  lines:["I release what I no longer need", "I let the old pain gently leave", "My heart is open", "My heart is free", "I welcome love", "I welcome peace", "I release", "I forgive", "I give thanks", "I choose love", "With every breath", "I soften inside", "With every breath", "I return to peace", "What was heavy", "Can become light", "What was hurting", "Can receive light", "I release", "I forgive", "I give thanks", "I choose love", "My past is held with compassion", "My heart is held with care", "I surrender what I cannot change", "And breathe in peace", "I am here", "I am safe", "I am worthy of love", "I release", "I forgive", "I give thanks", "I choose love", "Peace in my heart", "Peace in my mind", "Love in my heart", "Light in my life", "I release", "I forgive", "I give thanks", "I choose love", "And with every breath", "I return to myself", "I return to love", "I return to peace"],
  cues:[18.5,26.3,33.9,38.4,42.3,45.1,50.2,54.0,58.0,62.1,80.0,83.7,87.9,91.5,95.6,99.3,103.0,106.3,111.2,114.7,119.0,122.6,143.0,150.6,157.0,165.1,172.6,176.5,180.3,187.8,191.7,195.3,199.1,203.6,210.8,218.4,226.1,233.6,237.5,241.2,245.1,252.5,256.7,266.0,279.9]},
 {id:'mantra21',title:'Ho’oponopono Mantra',min:5,tag:'21 times',cats:['beginners','healing'],img:'med_mantra21',pos:'36% 50%',free:true,audio:'mantra-21.mp3',dur:317.5,rounds:21,rep:15.12,sub:'I’m sorry · Please forgive me · Thank you · I love you'},
 {id:'choosepeace',title:'I Choose Peace',min:5,tag:'Self-forgiveness',cats:['beginners','healing'],img:'med_choosepeace',free:true,audio:'i-choose-peace.mp3',dur:295,hz:528,sit:['selflove'],sub:'Release, forgive and return to love',isNew:true,
  lines:["Take a slow, deep breath.", "Place your hand over your heart and gently close your eyes.", "I am sorry.", "Please forgive me.", "Thank you.", "I love you.", "I’m sorry for all the pain, fear, beliefs and memories I have been carrying.", "I’m sorry for the times I abandoned myself, doubted myself, judged myself or forgot my own worth.", "Please forgive me for everything I have consciously or unconsciously held within me that no longer serves my highest good.", "Please forgive me for the stories, patterns and emotions I am ready to release.", "Thank you for everything I have learned.", "Thank you for every experience that has helped me grow.", "Thank you for this moment of healing and release.", "I love you, my inner self.", "I love you, my heart.", "I love every part of me that is still hurting, afraid or seeking love.", "I choose to release what is not mine to carry anymore.", "I choose peace.", "I choose self-love.", "I choose forgiveness.", "I choose freedom.", "I trust that what needs to be healed can be healed, one breath at a time.", "I am sorry.", "Please forgive me.", "Thank you.", "I love you.", "Take one final deep breath…", "I am safe.", "I am worthy.", "I am enough.", "I am ready to receive love, peace and abundance."],
  cues:[19.5,25.9,35.6,41.4,46.2,53.3,63.8,83.1,97.4,112.2,124.1,131.7,139.6,147.7,156.2,163.8,178.7,189.0,192.4,196.5,200.8,205.4,222.5,226.4,233.8,241.1,254.6,262.0,266.8,270.9,275.3]},
 {id:'morning',title:'Morning Mantra',min:5,tag:'Start your day',cats:['beginners'],img:'splash',free:true,hz:432,sub:'Begin the day clean',
  lines:['Good morning. Sit comfortably and let your shoulders soften.','Breathe in slowly… and let the breath go.','Today, I choose to begin again.','For anything within me that may cloud this day: I’m sorry.','Please forgive me.','Thank you for this new morning.','I love you.','May I be a blessing to someone today.','Carry this peace with you as you rise.']},
 {id:'breath',title:'Breath Awareness',min:5,tag:'Calm body',cats:['beginners','anxiety'],img:'snd_nature',free:true,hz:396,sub:'Calm your mind and body',
  lines:['Let your eyes close, or rest your gaze softly.','Notice the air as it enters… and leaves.','Breathe in for four.','Hold gently for four.','Breathe out slowly for six.','Let each out-breath take a little tension with it.','Nothing to fix. Only breath, arriving and leaving.','Thank you, breath. I love you.']},
 {id:'kindness',title:'Loving-Kindness',min:6,tag:'Heart',cats:['beginners','healing'],img:'sit_selflove',free:true,hz:639,sub:'Send love to yourself and others',
  lines:['Place a hand on your heart.','May I be peaceful. May I be kind to myself.','Picture someone you love. May you be happy. May you be free.','Picture someone neutral. May you be well.','Picture someone difficult. I’m sorry. Please forgive me. Thank you. I love you.','May all beings be at peace.','Rest in this warmth for a few breaths.']},
 {id:'anger',title:'Release Anger',min:12,tag:'Let go',cats:['healing'],img:'med_anger',free:true,hz:396,sit:['lettinggo'],sub:'Cool the fire, keep the lesson',
  lines:['Sit tall and breathe out through your mouth.','Notice where anger lives in your body right now.','I take 100% responsibility for this anger.','I’m sorry for the words and actions that came from it.','Please forgive me, not because anyone deserves it, but because I deserve peace.','Thank you, anger, for showing me my boundaries.','I love you, anger, as a part of me that wanted protection.','I let go of needing to be right.','I choose calm. I let go, and let God.']},
 {id:'anxiety',title:'Calm Anxiety',min:10,tag:'Settle',cats:['anxiety'],img:'snd_river',free:true,hz:432,sub:'Soften worry and racing thoughts',
  lines:['You are safe in this moment.','Feel your feet, your seat, the ground holding you.','I take 100% responsibility for these anxious feelings.','I’m sorry for being so hard on myself.','Please forgive me for fighting these feelings instead of healing them.','Thank you, anxiety, for trying to protect me.','I love you, my anxious self.','I release what I cannot control.','One breath. Then the next. That is enough.']},
 {id:'innerchild',title:'Inner Child Healing',min:15,tag:'Guided',cats:['healing'],img:'med_innerchild',hz:528,sit:['memories'],sub:'Meet and comfort your younger self',
  lines:['Imagine a warm golden sun above your head.','Let its light fill you, down to your toes.','Bring to mind a situation that troubles you now.','Notice where you feel it in your body.','Let a childhood memory with the same feeling appear.','See your younger self. Say: “Hello. I am you from the future. I’ve come to help.”','“I’m so sorry you went through this.”','“Please forgive me for not looking after you until now.”','“Thank you for being so brave.”','“I love you.”','Let the golden light hold you both.']},
 {id:'relationships',title:'Heal Relationships',min:15,tag:'Forgiveness',cats:['healing'],img:'med_relationships',hz:639,sit:['relationships'],sub:'Clean what stands between you',
  lines:['Bring to mind the person you want to heal with.','I take 100% responsibility for what I experience with you.','I’m sorry for the judgments I have carried about you.','I’m sorry for expecting you to be someone you are not.','Please forgive me for holding on to old grudges.','Please forgive me for not trying to understand your side.','Thank you for everything you have given me.','Thank you for the lesson this is teaching me.','I love you, just as you are.','I set you free, and I set myself free.']},
 {id:'selflove',title:'Self Love Meditation',min:12,tag:'Heart Healing',cats:['healing'],img:'med_selflove',hz:639,sit:['selflove'],sub:'Come home to yourself',
  lines:['Place both hands over your heart.','I’m sorry, dear self, for criticising you so often.','I’m sorry for comparing you to others.','Please forgive me for not believing in you.','Thank you for carrying me through everything.','I love you, exactly as you are.','It doesn’t matter who else accepts you. I accept you.','You are enough.']},
 {id:'sleep',title:'Deep Sleep Healing',min:30,tag:'Night',cats:['sleep'],img:'med_sleep',hz:396,sub:'Release the day and drift',
  lines:['Lie down and let the bed hold all of your weight.','Breathe out the whole day.','For every moment today that felt heavy: I’m sorry.','Please forgive me.','Thank you for this day and all it taught me.','I love you.','Let your jaw soften. Your shoulders. Your hands.','You don’t need to do anything now.','Rest. Everything is perfect as it is.']},
 {id:'family',title:'Family Healing',min:12,tag:'Home',cats:['healing'],img:'sit_family',hz:639,sit:['family'],sub:'Peace between generations',
  lines:['Picture your family gathered around you.','I take 100% responsibility for the patterns I carry from my family.','I’m sorry for the old hurts I still hold.','Please forgive me for every memory within me that keeps us apart.','Thank you for giving me life and roots.','I love you, each one of you.','I release what was never mine to carry.']},
 {id:'work',title:'Work & Career Clarity',min:10,tag:'Purpose',cats:['anxiety'],img:'sit_work',hz:741,sit:['work'],sub:'Clean fear and doubt at work',
  lines:['Think of the work situation on your mind.','For every doubt and fear I carry about my work: I’m sorry.','Please forgive me for expecting to fail.','Thank you for the chance to grow.','I love you, my work.','I release fear of the result. I take one inspired step today.']},
 {id:'money',title:'Money & Abundance',min:12,tag:'Abundance',cats:['healing'],img:'sit_money',hz:528,sit:['money'],sub:'Clean scarcity and fear',
  lines:['I take 100% responsibility for my money situation.','I’m sorry, money, for the fear and scarcity I’ve felt around you.','Please forgive me for the limiting beliefs I carry about you.','Thank you, money, for the home, food and comfort you provide.','I love you, money. I welcome you with an open heart.','Money flows to me easily.','I am worthy of abundance.']},
 {id:'health',title:'Health & Wellbeing',min:10,tag:'Body',cats:['healing'],img:'sit_health',hz:528,sit:['health'],sub:'Gratitude for your body',
  lines:['Scan your body from head to toe.','I’m sorry, body, for taking you for granted.','Please forgive me for not resting when you asked me to.','Thank you to every cell that keeps working without being asked.','I love you, body, just as you are.','This practice supports your wellbeing. It does not replace medical care.']},
 {id:'memories',title:'Healing Past Memories',min:15,tag:'Release',cats:['healing'],img:'sit_memories',hz:396,sit:['memories'],sub:'Erase what replays',
  lines:['Let a memory that keeps returning come to mind.','I take 100% responsibility for this memory within me.','I’m sorry. Please forgive me.','Thank you for showing me what is ready to be cleaned.','I love you.','I release and erase this memory. I return to zero.']},
 {id:'lettinggo',title:'Letting Go',min:10,tag:'Surrender',cats:['beginners','healing'],img:'sit_lettinggo',free:true,hz:432,sit:['lettinggo'],sub:'Open your hands',
  lines:['Hold what you\u2019re carrying as if in your open hands.','Feel its weight.','I\u2019m sorry for holding on so tightly.','Please forgive me.','Thank you for what this taught me.','I love you. I let you go.','Watch it drift away like seeds on the wind.']},
 {id:'dearself',title:'Dear Self',min:5,tag:'Healing song',cats:['beginners','healing'],img:'med_dearself',pos:'60% 50%',free:true,audio:'dear-self.mp3',dur:327.4,sub:'I\u2019m sorry \xb7 Please forgive me \xb7 Thank you \xb7 I love you',
  lines:['Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I release all emotional blockages preventing peace of mind.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I replace negative thoughts with positive ones.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I heal my mind, make peace with my past.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I let go of anger, guilt, resentment, and regret holding me back.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I deserve a life of happiness and love.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I prioritize self-care daily.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','My emotional and mental states are in balance and harmony.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I start each day with gratitude, filling me with positive energy and supporting my wellbeing.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I fall more deeply in love with who I am each day.','Dear self\u2026','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I love myself. I accept myself. I honor myself.','I embrace imperfections while gently becoming a better me.','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.','I\u2019m sorry.','Please forgive me.','Thank you.','I love you.'],
  cues:[9.0,12.2,16.6,21.7,25.8,32.8,43.9,47.5,50.4,54.0,57.1,63.1,70.2,73.9,77.0,80.6,83.8,88.7,96.5,99.8,102.8,106.3,109.1,114.2,126.3,129.7,132.8,136.1,139.3,144.0,150.6,153.8,156.7,160.0,163.0,167.4,173.5,176.6,179.4,182.5,186.0,190.0,199.1,202.2,204.8,208.1,211.2,215.0,226.3,229.0,231.6,234.4,237.8,241.8,248.9,251.8,254.6,257.9,261.5,268.2,278.8,286.8,289.5,293.4,297.4,304.7,308.3,312.6,317.7]},
 {id:'dearmoney',title:'Dear Money',min:5,tag:'Abundance song',cats:['healing'],img:'med_dearmoney',pos:'60% 50%',free:true,audio:'dear-money.mp3',dur:293.2,sub:'I\u2019m sorry \xb7 Please forgive me \xb7 Thank you \xb7 I love you',
  lines:['Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','I deserve money and I let it in','Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','I release old money stories and choose abundance','Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','Money comes to me easily','I earn with ease','I receive with ease','Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','Money is safe for me','Having money is safe for me','Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','I am open to receive','From expected and unexpected places','Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','I choose prosperity','I choose financial freedom','Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','I let money flow','I let money stay','I let money grow','Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','I release fear','I release scarcity','I release guilt','I release shame','Dear Money','I\u2019m sorry','Please forgive me','Thank you','I love you','I am ready to receive','I allow abundance','I allow wealth','Money flows to me','Easily and effortlessly','Money flows to me','Easily and effortlessly','I am a money magnet','I am open to receive','Thank you','Thank you','Thank you','I love you','I love you','I love you'],
  cues:[2.8,6.5,9.7,12.6,15.5,19.6,27.0,30.0,32.4,35.9,38.2,42.6,50.8,53.7,56.1,58.9,63.5,67.3,72.7,76.3,81.6,84.6,86.7,89.4,92.5,99.2,102.6,107.9,110.7,113.0,115.6,117.9,123.8,127.0,133.3,135.6,138.5,141.4,143.9,149.1,152.6,157.4,159.9,162.2,165.1,168.2,172.9,175.3,178.0,181.1,184.1,186.1,189.2,192.0,196.5,199.5,201.6,203.9,207.6,210.0,212.1,214.9,216.1,222.2,225.6,229.3,235.6,242.5,247.6,250.9,257.1,261.4,264.9,267.5,269.1,274.0,279.2,284.1]},
 {id:'dearbody',title:'Dear Body',min:5,tag:'Body Healing song',cats:['healing'],img:'med_dearbody',pos:'60% 50%',free:true,audio:'dear-body.mp3',dur:348,sub:'I’m sorry \xb7 Please forgive me \xb7 Thank you \xb7 I love you',
  lines:['Dear Body','I’m sorry','Please forgive me','Thank you','I love you','I’m sorry for the times I ignored your signals or pushed you beyond what you needed','Please forgive me','Thank you for always doing your best to support me','I love you','Dear Body','I’m sorry','Please forgive me','Thank you','I love you','I trust your natural wisdom, and I choose to support you with patience, care, and compassion','Dear Body','I’m sorry','Please forgive me','Thank you','I love you','May every cell receive the rest, nourishment, and care it needs to support balance and well-being','Dear Body','I’m sorry','Please forgive me','Thank you','I love you','I honor your need for deep rest, stillness, and restoration','Dear Body','I’m sorry','Please forgive me','Thank you','I love you','I choose to nourish you with kindness, healthy food, hydration, gentle movement, and peaceful thoughts','Dear Body','I’m sorry','Please forgive me','Thank you','I love you','I listen to you with love','I respect your needs','I give you the time and care you deserve','Dear Body','I’m sorry','Please forgive me','Thank you','I love you','I appreciate every positive change, however small','I welcome greater balance, strength, peace, and well-being','Dear Body','I’m sorry','Please forgive me','Thank you','I love you','Thank you for your resilience','Thank you for carrying me through every day','Thank you for everything you do for me','I’m sorry','Please forgive me','Thank you','I love you','I am at peace with my body','I choose love','I choose gratitude','I choose to care for myself, one day at a time']}
];
const MED=Object.fromEntries(MEDS.map(m=>[m.id,m]));
const CHIPS=[['all','All'],['beginners','Beginners'],['healing','Healing'],['sleep','Sleep'],['anxiety','Anxiety'],['favorites','Favorites']];

const SITS=[
 {id:'relationships',title:'Relationships',img:'sit_relationships',text:'Heal what stands between you and a partner, friend or colleague. You clean your side; the relationship follows.'},
 {id:'family',title:'Family',img:'sit_family',text:'Release inherited patterns and old family hurts with love.'},
 {id:'work',title:'Work & Career',img:'sit_work',text:'Clean fear, doubt and pressure around your work and purpose.'},
 {id:'money',title:'Money & Abundance',img:'sit_money',text:'Let go of scarcity beliefs and welcome abundance.'},
 {id:'health',title:'Health & Wellbeing',img:'sit_health',text:'Thank and care for your body. A companion to, never a replacement for, medical care.'},
 {id:'memories',title:'Past Memories',img:'sit_memories',text:'Release memories that keep replaying, and meet your younger self with kindness.'},
 {id:'selflove',title:'Self Love',img:'sit_selflove',text:'Come back home to yourself and soften the inner critic.'},
 {id:'lettinggo',title:'Letting Go',img:'sit_lettinggo',text:'Open your hands. Release what you no longer need to carry.'}
];
const SIT=Object.fromEntries(SITS.map(s=>[s.id,s]));

const SOUNDS=[['ocean','Ocean',true],['rain','Rain',true],['forest','Forest',true],['river','River',false],['bells','Temple Bells',false],['nature','Nature',false]];
const THEMES=[['light','Earth',true],['sage','Sage',true],['sunset','Sunset',true],['lavender','Lavender',false],['forest','Forest',false]];

const PROMPTS=[
 {id:'release',t:'What am I ready to release today?',i:'leaf',c:'#ECE6CC',k:'#6E6A35',free:true},
 {id:'sorry',t:'What am I sorry for?',i:'heart',c:'#F9E2E1',k:'#C2567A',free:true},
 {id:'forgive',t:'Who do I need to forgive?',i:'leaf',c:'#ECE6CC',k:'#6E6A35',free:true},
 {id:'grateful',t:'What am I grateful for today?',i:'sun',c:'#FCEBD3',k:'#B7852E',free:true},
 {id:'loveself',t:'How can I love myself more?',i:'heart',c:'#F9E2E1',k:'#C2567A',free:true},
 {id:'memory',t:'Which memory keeps replaying, and what would it feel like to let it go?',i:'flower',c:'#EDE6F5',k:'#6E5AA0'},
 {id:'body',t:'Where do I feel this in my body right now?',i:'leaf',c:'#E2ECF4',k:'#4B6E91'},
 {id:'resp',t:'If I took 100% responsibility for this, what would change?',i:'sun',c:'#FCEBD3',k:'#B7852E'},
 {id:'child',t:'What does my younger self need to hear today?',i:'flower',c:'#EDE6F5',k:'#6E5AA0'},
 {id:'enough',t:'What is already enough in my life?',i:'heart',c:'#F9E2E1',k:'#C2567A'},
 {id:'fear',t:'What fear is ready to be cleaned?',i:'leaf',c:'#ECE6CC',k:'#6E6A35'},
 {id:'thanks3',t:'Three small things that brought me peace today',i:'sun',c:'#FCEBD3',k:'#B7852E'},
 {id:'message',t:'A letter to someone I am forgiving',i:'flower',c:'#EDE6F5',k:'#6E5AA0'}
];
const PROMPT=Object.fromEntries(PROMPTS.map(p=>[p.id,p]));

const AFFS=[
 ['self','I am worthy of love, exactly as I am.'],['self','I treat myself with kindness.'],['self','I am enough.'],
 ['forgive','I release what no longer serves me.'],['forgive','I forgive myself and I am free.'],['forgive','Forgiveness brings me peace.'],
 ['peace','Everything is perfect as it is.'],['peace','I am safe in this moment.'],['peace','Each breath brings me closer to peace.'],
 ['abundance','Money flows to me easily.'],['abundance','I welcome abundance with an open heart.'],['abundance','I am grateful for all I have.']
].map(([c,t],i)=>({id:'a'+i,c,t}));
const AFF_CATS=[['all','All'],['self','Self love'],['forgive','Forgiveness'],['peace','Peace'],['abundance','Abundance']];

const PRACTICES=[
 {id:'morning',n:1,t:'Morning Mantra',d:'Start your day with healing.'},
 {id:'breath',n:2,t:'Breath Awareness',d:'Calm your mind and body.'},
 {id:'gratitude',n:3,t:'Gratitude Practice',d:'Feel the abundance around you.'},
 {id:'forgive',n:4,t:'Forgiveness Reflection',d:'Let go of what no longer serves you.'},
 {id:'kindness',n:5,t:'Loving-Kindness',d:'Send love to yourself and others.'}
];
const QUOTES=['“A new day, a new opportunity to choose peace.”','“Peace begins with me.”','“Every breath is a chance to begin again.”','“What you clean within, heals around you.”','“Softly, one phrase at a time.”'];

const PAGES={
 about:{title:'About Ho’oponopono',html:`<p>Ho’oponopono (pronounced <i>ho-oh-pono-pono</i>) is a traditional Hawaiian practice of reconciliation and forgiveness. The word roughly means “to make right”, or to restore balance.</p><h3>A modern form</h3><p>In the 1970s, Hawaiian healer Morrnah Simeona adapted the family practice into a personal one that anyone can do alone. Her student, Dr. Ihaleakala Hew Len, and later author Joe Vitale helped it reach the world through the book <i>Zero Limits</i>.</p><h3>The four phrases</h3><p><b>I’m sorry. Please forgive me. Thank you. I love you.</b> You say them silently or aloud to a person, a situation, your body or a memory. The idea is to take full responsibility for what you experience, and to “clean” the memories within you that replay as problems.</p><h3>Basic and Quantum</h3><p>Basic Ho’oponopono speaks to the situation itself. Quantum Ho’oponopono cleans how <i>you feel</i> about it: “For the anger I feel about this, I’m sorry…”</p><h3>A gentle note</h3><p>This app is a practice for peace and reflection. It is not a substitute for medical or psychological care. If you are struggling, please reach out to a professional or someone you trust.</p>`},
 privacy:{title:'Privacy',html:`<p>Your practice is personal. In this version of the app, everything you create stays on this device, in this browser: journal entries, favourites, progress, reminders and settings.</p><p>Nothing is uploaded to a server, and there are no ads or trackers.</p><p>Clearing your browser data, or using a private window, will remove it. You can also erase everything at any time from More → Reset all data.</p>`},
 terms:{title:'Terms',html:`<p>This app offers meditation, journaling and reflection practices for general wellbeing. It does not provide medical, psychological or financial advice, and it does not diagnose or treat any condition.</p><p>Background frequencies and sounds are offered for relaxation. Claims that specific frequencies heal the body are not supported by scientific evidence.</p><p>Music “Return to Peace” is used under the creator’s commercial licence.</p>`},
 help:{title:'Help & Support',faq:[
   ['How do I practise Ho’oponopono?','Bring a person, situation or feeling to mind. Repeat the four phrases slowly: I’m sorry, Please forgive me, Thank you, I love you. Many people repeat them 11, 55 or 108 times.'],
   ['Why is a meditation locked?','Some meditations, sounds and themes are part of Premium. The mantra, beginner meditations, the journal and daily practice are always free.'],
   ['Where is my journal saved?','On this device only. See Privacy for details.'],
   ['Do reminders send notifications?','Yes. In the phone app, each reminder arrives as a notification at the time you choose, even when the app is closed. They can be a few minutes late when the phone is saving battery. Allow notifications when the app asks.'],['How do I move my journal to a new phone?','Open More, then Backup & Restore. Save a backup file, copy it to the new phone, and choose it there under Restore.'],['Can I use the app in Hindi?','Yes. Open More, then Language. Songs are sung in English, so their lyrics stay in English.']]}
};
