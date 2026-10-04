# Hindi translation guide — Ho'oponopono healing & meditation app

You are translating the app's English text into Hindi (Devanagari). Audience: Indian adults using a calm, spiritual healing app.
Input: a JSON array of English strings. Output: ONE JSON object mapping every input string (the key, copied EXACTLY, character for character) to its Hindi translation.

## Tone
- Warm, simple, everyday Hindi (Hindustani). Not heavily Sanskritised, not bureaucratic. Short natural sentences.
- Address the app user respectfully with "आप" and neutral imperatives: लिखें, चुनें, टैप करें, शुरू करें.
- When the speaker addresses another person or thing in a healing script ({n}, "Dear body", "Dear clients"), use "आप" forms too.

## First-person gender (IMPORTANT)
Hindi verbs/adjectives in the first person change with the speaker's gender. Wherever a word agrees with the gender of the SPEAKER ("I"), write BOTH endings in this marker: {{masculine|feminine}}.
Examples: "I release" → "मैं छोड़{{ता|ती}} हूँ" · "I am letting go" → "मैं जाने दे {{रहा|रही}} हूँ" · "I can" → "मैं कर {{सकता|सकती}} हूँ" · "I have become" → "मैं हो {{गया|गई}} हूँ" · "I am happy and healthy" → "मैं खुश और स्वस्थ हूँ" (no marker needed, neutral).
Prefer naturally neutral phrasing when it reads just as well (मुझे … है, मेरा … है, मैं … हूँ, मैंने … किया). Never use the marker for words that agree with something other than the speaker.

## Fixed glossary (use exactly these, for consistency across translators)
- Ho’oponopono / Ho'oponopono → होʼओपोनोपोनो
- I’m sorry → मुझे खेद है   (as an opening clause: "I’m sorry for X" → "X के लिए मुझे खेद है")
- Please forgive me → कृपया मुझे क्षमा करें
- Thank you → धन्यवाद
- I love you → मुझे आपसे प्रेम है
- I take 100% responsibility → मैं 100% ज़िम्मेदारी लेता/लेती → write "मैं 100% ज़िम्मेदारी ले{{ता|ती}} हूँ"
- to clean / cleaning (the Ho'oponopono practice) → शुद्ध करना / शुद्धि ; memories → स्मृतियाँ
- release / let go → छोड़ना, जाने देना ; "I let go. I let God." → "मैं छोड़{{ता|ती}} हूँ। मैं ईश्वर को सौंप{{ता|ती}} हूँ।"
- healing → हीलिंग ; meditation → ध्यान ; affirmation → अफ़र्मेशन ; script → स्क्रिप्ट ; journal → जर्नल ; mantra → मंत्र
- gratitude → कृतज्ञता ; forgiveness → क्षमा ; peace → शांति ; abundance → समृद्धि ; the universe → ब्रह्मांड ; divine → दिव्य ; inner child → भीतर का बच्चा
- Premium → प्रीमियम ; Quantum → क्वांटम ; Basic → बेसिक ; challenge → चैलेंज ; backup → बैकअप ; restore → रीस्टोर ; reminder → रिमाइंडर ; notification → नोटिफ़िकेशन
- streak → लगातार दिन ; Home → होम ; Progress → प्रगति ; More → और ; Settings words stay simple
- Arigato → अरिगातो ; Huna terms (IKE, KALA, MAKIA, MANAWA, ALOHA, MANA, PONO) → transliterate in Devanagari
- Song titles "Return to Peace" and "I Choose Peace" stay in English (Latin letters) inside any sentence.
- "X" and "Y" (as variable letters in Quantum scripts) stay as X and Y. "Hz", "WhatsApp", "Instagram", "Google Play", "App Store", "Drive" stay in Latin.

## Placeholders and symbols — copy them unchanged
- {#1}, {#2}, {#3} … stand for numbers. Keep each one exactly once (you may reorder them). Example: "{#1} of {#2} complete" → "{#2} में से {#1} पूरे".
- {n}, {name}, {x}, {y}, {q}, {f}, {t} stand for inserted words (a person's name, a feeling, a title). Keep each exactly as written, in a place where Hindi grammar works for any inserted word (use neutral postpositions like "के लिए", "के प्रति", "को लेकर").
- Keep symbols as they are: · ✓ ♡ → × & % / “ ” ‘ ’ … and digits. Use the Hindi full stop "।" for sentence ends in running text; keep "?" and "!".
- If a key starts or ends with punctuation/quotes or is a sentence fragment (e.g. "“Healing is a journey," or ". A mix of …" or "How lucky I am to"), translate the fragment so it still reads naturally next to its neighbour, keeping the same leading/trailing punctuation.
- ALL-CAPS labels (e.g. "MORNING RITUAL") → normal Hindi (no caps exist).
- Lowercase single words or short phrases (e.g. "anger", "my partner", "this person", "feeling victimised") are inserted into sentences: translate as a plain noun phrase (e.g. "गुस्सा", "मेरे जीवनसाथी", "यह व्यक्ति").

## Output rules
- Valid JSON (UTF-8), one object, every input key present exactly once, no extra keys, no comments.
- Escape double quotes inside values as \" (or use the curly quotes “ ” as in the source).
- Do not leave English words in the Hindi unless the glossary says so.
