# Ho'oponopono Healing & Meditation app

A single-page web app (vanilla JS, no framework, no npm dependencies) wrapped in a thin native Android WebView shell.
The owner is non-technical: explain in plain language, keep replies short, and always deliver a built APK.

## Layout

```
app/                 the web app (source of truth)
  p1.html            <title>, fonts, ALL CSS, and the static HTML shell (#app, #view, #nav, #player, <audio>)
  p2.js              data: icons, MEDS (meditations + songs), SITS, SOUNDS, THEMES, PROMPTS, AFFS, PAGES (help/privacy)
  p3.js              core: state S (localStorage key hoo.app.v2), Hindi engine T(), components C.*, router, SCREENS,
                     ambient audio AMB, player P, actions ACT, native bridge helpers. Ends with the "/* boot */" marker.
  scripts_src.js     the 10 original healing scripts + FEELINGS
  p4.js              script engine, reader (R), burning bowl, 55x5
  p5.js              morning affirmations, home carousel, affirmation carousel (MA)
  p6.js              healing library, quantum scripts, quizzes
  p7.js              Android back-button hook
  p8.js              "New tracks" slider on Home
  p9.js              lyric sync tool
  p10.js             21-day challenge, share cards, backup, language sheet, mini player, mantra card, bottom music row
  hi.js              Hindi dictionary  const HI={English: Hindi}  (generated from hi/dict_raw.json)
  hi/dict_raw.json   editable Hindi dictionary; hi/GUIDE.md = translation rules and glossary
  assemble.py        joins the parts into index.html (fragment, for the web preview) and app.html (full page, for tests)
  img/*.webp         all pictures;  *.ogg + *.mp3  the three audio tracks
  tests/*.js         Playwright tests (run from app/:  node tests/t23.js ; needs `npm i -g playwright`)
android/             native shell
  java/com/hooponopono/healing/
    MainActivity.java      WebView + JS bridge `window.AndroidApp` (notifications, media, share, backup, file chooser)
    ReminderReceiver.java  daily reminder alarms -> notifications (re-armed on boot)
    PlaybackService.java   foreground media service: screen-off playback + lock-screen controls
    ShareProvider.java     read-only provider for shared files
  AndroidManifest.xml, res/
  hooponopono-release.jks + keystore-password.txt   RELEASE SIGNING KEY. Never lose, never publish, never regenerate.
tools/               aapt2, android.jar (API 34), ecj, d8, apksigner — no Android Studio or Gradle needed
build.py             one-command build
dist/                built APKs
```

## Commands

- Rebuild the web app only: `cd app && python assemble.py` (then open `app/app.html` in a browser). If Python is unavailable, use the Node.js alternative: `node app/assemble.js`
- Build the APK: `python build.py <versionCode> <versionName>` e.g. `python build.py 22 3.1`. versionCode must go up by 1 every release. Last built: code 21, name 3.0.
- Tests: `cd app && python assemble.py && node tests/t23.js` (each prints PASS/FAIL lines)

## Rules that matter

- Never edit `app/index.html` or `app/app.html`; they are generated. Edit the p*.js / p1.html parts.
- Later files override earlier ones by wrapping (`const _home10=SCREENS.home; SCREENS.home=p=>_home10(p)...`). Keep that pattern or fold changes into the original.
- Java must not use lambdas (ecj + d8 setup here fails on them); use anonymous classes.
- All UI text is written in English. Hindi is applied at display time by `T()` using `HI`. After adding or changing any visible English string, add it to `hi/dict_raw.json` and regenerate `hi.js`:
  `python -c "import json;d=json.load(open('hi/dict_raw.json',encoding='utf-8'));open('hi.js','w',encoding='utf-8').write('const HI='+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';')"`
  Numbers in keys are written `{#1}`, `{#2}`; inserted words `{n}`, `{t}` etc. First-person gendered Hindi words use `{{masculine|feminine}}`.
- Song lyrics and song titles stay in English (elements marked `data-notr`).
- To add a song: put `<name>.ogg` (Opus ~64k) and `<name>.mp3` (~96k) in `app/`, a thumbnail in `app/img/`, add an entry to `MEDS` in p2.js with `audio:'<name>.mp3'`, and set `MED.<id>.added='YYYY-MM-DD'` in p8.js. It then appears in New tracks, Music & Mantras, Meditations and the playlist.
- State is local only (localStorage). Payments are a demo button; Premium is not wired to Google Play Billing.

## Known open items

- Reminders, WhatsApp sharing, screen-off playback and lock-screen controls were rewritten in v2.8 and still need confirmation on a real phone.
- Hindi was machine-translated; needs a native review.
- The scripts follow course material by named coaches; the owner needs their written permission before selling.
- Play Store release needs an .aab bundle (not built here), a hosted privacy policy, store listing assets and real billing.
- `Work & Career` picture shows a laptop logo resembling Apple's; replace before publishing.
