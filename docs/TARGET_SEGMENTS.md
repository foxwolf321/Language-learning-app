# TARGET_SEGMENTS.md

Last checked: 2026-05-23

## Purpose

This document defines who the JFT/SSW practical Japanese product is for, what bridge language each segment may need, and which card modes should exist before the project expands cards, audio, or landing copy.

The key guardrail is: do not let the product become English-centric by accident. English can be a fast validation bridge for some segments, but the long-term product should support configurable bridge languages.

## Source Discipline

No market-size or revenue statistics are claimed here. Country recommendations are product hypotheses based on:

- JFT-Basic official positioning: the test measures Japanese needed by non-native speakers, especially people coming to Japan mainly for work, in everyday life situations.[^jft-about]
- JFT-Basic official test design: questions are displayed in English, but a `Your Language` button supports local-language prompts including Indonesian, Myanmar/Burmese, Nepali, Vietnamese, Bengali, and Malay.[^jft-about]
- JFT-Basic official level notes: the current test is A2-oriented, and the official page says A1 and A2.1 assessment will be added from August 2026.[^jft-about]
- Specified Skilled Worker official context: SSW is a status of residence for foreign nationals to work in Japan, and SSW(i) generally requires Japanese-language and skills tests unless exempted by qualifying training history.[^ssw-about][^ssw-tests]
- EF EPI 2025 as a rough English-proficiency proxy only. EF explicitly says its test-taking population is self-selected and not guaranteed to represent a whole country/region.[^ef-method]

Assumption labels used below:

- **Evidence-backed**: directly supported by cited official or proxy source.
- **Product assumption**: plausible for MVP design, but not yet validated by users.
- **Unknown**: requires interviews, landing-page tests, school/agency feedback, or real usage data.

## 1. Target Learner Levels

| Level | Can read hiragana/katakana? | Kanji level | Can understand simple Japanese? | Needs romaji? | Needs native-language support? | Suitable card front format |
|---|---|---|---|---|---|---|
| Pre-A1 / survival beginner | Usually no, or only partial kana. | Very little. May not recognize common signs. | Very limited; needs slow, repeated, concrete phrases. | Yes at first, but should be fadeable. | Yes for broad worker segments; English only for English-capable learners. | Native language / English situation -> Japanese phrase; Japanese phrase with kana and optional romaji. |
| A1-ish / basic phrase learner | Partial to basic kana. | A few daily-life kanji if supported by kana. | Can understand short memorized phrases and predictable classroom Japanese. | Sometimes; should be optional. | Usually yes for explanations and production prompts. | Japanese -> meaning with hidden reading help; situation -> Japanese for common needs. |
| A2-ish / JFT-Basic-ish practical learner | Generally yes, but speed varies. | Basic daily-life and workplace kanji with kana support. | Can understand short instructions, announcements, and routine exchanges. | Usually no, but useful as emergency support. | Helpful, especially for grammar nuance and situation prompts. | Japanese -> meaning; kanji/sign reading; listening with back-side meaning. |
| SSW workplace starter | Kana usually needed; kanji reading still uneven. | Needs workplace words, safety labels, schedule words, and reporting phrases. | Can understand routine workplace phrases if short and contextual. | Optional only; overuse may slow kana acquisition. | Yes if English bridge is weak. | Workplace instruction -> response; Japanese audio/text -> meaning; sign/kanji -> kana + meaning. |
| Workplace onboarding / already in Japan | Often can read kana and some routine kanji but may struggle with speed and local wording. | Needs field-specific kanji and signs. | Understands simple Japanese but struggles with announcements, supervisors, and polite requests. | Usually no. | Useful for high-risk or specialized wording, but Japanese-first should increase. | Listening; sign reading; production from workplace situation; role-specific packs. |

Product implication: the current `data/cards.sample.json` is mostly a recognition deck: Japanese phrase plus kana/romaji, English meaning, and example. It is useful for fast validation, but it does not yet fully cover production, sign-reading, or listening modes.

## 2. Candidate Country / Language Segments

Bridge-language rating means: can the MVP reasonably use English for prompts/explanations without excluding too much of the intended worker segment?

| Segment | English as bridge | Best MVP support language | Audio priority | Monetization / channel note | Risk or uncertainty |
|---|---|---|---|---|---|
| Vietnam / Vietnamese | Medium for urban or higher-education learners; likely weak for a broad worker-first SSW segment. EF EPI 2025 places Vietnam in the moderate band, but this is only a proxy.[^ef-vietnam][^ef-method] | Vietnamese for broad SSW/JFT validation. English can remain optional. | Japanese target audio first; Vietnamese support audio only after paid-interest signal. | Test Vietnamese landing copy and free sample through schools, agencies, Facebook groups, or JFT/SSW communities. | Unknown payer and channel. Vietnamese translation QA is required; do not assume English explanations are enough. |
| Indonesia / Indonesian | Weak to medium for broad worker users. EF EPI 2025 places Indonesia lower than Vietnam, Malaysia, and the Philippines, so English-only likely narrows the audience.[^ef-indonesia] | Indonesian. | Japanese target audio first; support-language audio later. | Good candidate for first native-language MVP because Indonesian is officially supported by JFT local prompts and uses Latin script, lowering UI/font complexity. | Revenue demand and outreach channel are unproven. Human Indonesian review is required. |
| Philippines / English / Tagalog or Filipino | Likely strong for an English-bridge MVP. EF EPI 2025 ranks the Philippines relatively high in Asia.[^ef-philippines] | English first. Tagalog/Filipino later if targeting lower-English or local community channels. | Japanese target audio first. English support audio is optional and probably not first priority. | Fastest English-language smoke test: landing page, free PWA, and waitlist can run without localization. | English ability varies by learner, region, and job type. Competition may be broader because English content is easier to produce. |
| Nepal / Nepali | Medium. English may work for school-mediated or urban learners, but broad beginner users likely benefit from Nepali. EF EPI 2025 is moderate-ish but not worker-specific.[^ef-nepal] | Nepali for broad validation; English as optional fallback. | Japanese target audio first; Nepali audio later only if a paid channel appears. | Potential B2B2C path through schools/sending organizations if reachable. | Nepali script/font, translation QA, and channel access need validation. Do not infer demand from English proxy. |
| Myanmar / Burmese | Likely weak for broad English-bridge use. EF EPI 2025 places Myanmar lower than the other listed segments.[^ef-myanmar] | Burmese / Myanmar language. | Japanese target audio first; Burmese support audio only after strong validation. | Native-language differentiation may matter, but this should not be the first localization unless a channel already exists. | Burmese localization and font QA add cost. Political/economic access and payment paths may be difficult; validate before building. |
| Bangladesh / Bengali | Medium. English may work for some learners, but Bengali likely improves accessibility for beginner worker segments. EF EPI 2025 is a proxy, not learner evidence.[^ef-bangladesh] | Bengali. | Japanese target audio first; Bengali support audio later. | Possible validation through community groups, schools, and Japan-work information channels. | Bengali script QA and support-language audio cost. Payer/channel unknown. |
| Malaysia / Malay / English | Likely strong to medium. EF EPI 2025 ranks Malaysia high, so English bridge is reasonable for many users; Malay still matters for lower-English worker segments.[^ef-malaysia] | English for quick MVP; Malay if testing lower-English SSW learners. | Japanese target audio first. Malay/English support audio later. | Good English-bridge validation segment, similar to Philippines, but the specific JFT/SSW paid niche must be proven. | Do not assume high English-proficiency proxy equals willingness to pay for JFT/SSW material. |

### English Bridge Summary

Reasonable English-first MVP segments:

- Philippines: strongest candidate for English-bridge validation.
- Malaysia: English bridge is reasonable for many learners, with Malay reserved for lower-English validation.
- English-capable subsegments in Nepal, Bangladesh, and Vietnam: usable for interviews or early tests, but not enough for a broad worker product.

Likely native-language-first segments for broad worker reach:

- Indonesia: Indonesian should be the default broad support language.
- Myanmar: Burmese/Myanmar language should be the default broad support language.
- Vietnam: Vietnamese should be the default broad support language unless targeting an English-capable niche.
- Bangladesh: Bengali should be the default broad support language.
- Nepal: Nepali should be the default broad support language for beginner workers.

Product assumption: English bridge is acceptable for speed and internal validation, but a revenue-first product should not define all prompts as English-only. The JFT-Basic official use of local-language prompts supports this design direction.[^jft-about]

## 3. Card Modes

The app should separate recognition, production, sign reading, and listening. These are different learning tasks and should not be hidden inside one generic card type.

### A. Recognition / Reading Mode: Japanese -> Meaning

- Front: Japanese phrase or sentence.
- Optional hidden help: kana reading, romaji for early levels only, or slow audio later.
- Back: meaning in selected support language, reading, example, and simple usage note.
- Goal: understand Japanese seen or heard in work/life.
- Current sample support: mostly yes. `target`, `reading`, `romaji`, `meaning.en`, and `example` support this mode.
- MVP use: default mode for existing PWA.

### B. Production Mode: Native Language / English Situation -> Japanese

- Front: native-language or English situation prompt, such as `You need to tell your supervisor that the machine stopped.`
- Back: Japanese phrase, kana reading, optional romaji, example, and speaking note.
- Goal: say the Japanese phrase yourself.
- Current sample support: partial. Current `meaning.en` can be reused, but a dedicated `prompt.{language}` field is better than reversing meanings automatically.
- MVP use: high value for workplace readiness and paid vertical packs.

### C. Kanji / Sign Reading Mode

- Front: kanji word, workplace sign, city-office word, safety label, or short notice.
- Back: kana reading, selected-language meaning, and one practical example.
- Goal: read workplace signs, city-office words, safety labels, schedules, and notices.
- Current sample support: partial. Some current cards contain kanji, but there is no dedicated sign text or sign category yet.
- MVP use: strong paid-pack differentiator for onboarding, manufacturing, nursing care, and daily-life survival.

### D. Listening Mode

- Front: Japanese audio only, or Japanese audio with hidden text.
- Back: Japanese text, kana reading if needed, selected-language meaning, and short context.
- Goal: understand announcements, instructions, workplace speech, and schedule changes.
- Current sample support: conceptual only. Some cards use `question_type: listening`, but no audio fields exist yet.
- MVP use: do not add audio files until demand is clearer; define stable fields now so audio can be added later without breaking cards.

## 4. MVP Recommendation: Revenue-First Direction

Recommended next MVP direction:

1. Keep the current English-support PWA as the fast smoke-test product for Philippines, Malaysia, and English-capable learners.
2. Do not expand to all seven bridge languages yet.
3. Add data-model support for configurable bridge languages before the next card expansion.
4. Run one native-language validation lane, preferably Indonesian first, if no stronger human channel exists for another country.

Why Indonesian first as a product hypothesis:

- JFT-Basic officially supports Indonesian local prompts, so Indonesian support is aligned with the exam environment, not an invented localization idea.[^jft-about]
- English-only appears riskier for broad Indonesian worker segments than for Philippines/Malaysia, based on EF EPI as a rough proxy.[^ef-indonesia]
- Indonesian uses Latin script, which lowers early UI/font complexity compared with Bengali, Nepali, or Burmese. This is a product-cost assumption, not demand evidence.
- A localized Indonesian starter pack can test whether native-language support improves perceived value enough to justify translation and audio costs.

Fallback if Indonesian channel validation is weak:

- Use English-bridge MVP for Philippines/Malaysia to collect early usability feedback and waitlist/contact signals.
- In parallel, interview or survey Indonesian, Vietnamese, Nepali, Bengali, and Burmese learners or institutions before creating paid localized packs.

Revenue-first paid-pack hypothesis:

- Free: `Japan Work Japanese Starter` with 50-80 cards, English support, recognition mode.
- Test offer: `SSW Workplace Starter - Indonesian Support` with recognition + production + sign reading cards.
- Later paid verticals: `SSW Nursing Care Japanese`, `Manufacturing / Safety Japanese`, and `Workplace Onboarding Japanese` with Japanese audio.

This recommendation is not a market conclusion. It is the smallest test that can answer: does native-language support increase willingness to use, share, or pay?

## 5. Data Design Implications

Do not rewrite all cards yet. For the next schema revision, design cards so the same Japanese target can support multiple bridge languages and modes.

Recommended future fields:

```json
{
  "id": "jft-ssw-0001",
  "deck": "jft_ssw_starter",
  "mode": "recognition",
  "modes_supported": ["recognition", "production", "kanji_sign", "listening"],
  "level": "a1_survival",
  "segment": ["jft_basic", "ssw", "workplace_starter"],
  "target": {
    "ja": "在留カードを見せてください。",
    "reading": "ざいりゅうカードをみせてください。",
    "romaji": "Zairyuu kaado o misete kudasai."
  },
  "prompt": {
    "en": "You need to ask someone to show a residence card.",
    "vi": null,
    "id": null,
    "ne": null,
    "my": null,
    "bn": null,
    "ms": null,
    "tl": null
  },
  "meaning": {
    "en": "Please show your residence card.",
    "vi": null,
    "id": null,
    "ne": null,
    "my": null,
    "bn": null,
    "ms": null,
    "tl": null
  },
  "sign": {
    "ja": null,
    "reading": null,
    "meaning_key": null
  },
  "audio": {
    "ja_target": null,
    "ja_example": null,
    "support_language_optional": null
  },
  "source_note": "Original content. Not copied from official exams or textbooks.",
  "review_status": {
    "ja_native_checked": false,
    "support_language_checked": false
  }
}
```

Implementation notes:

- Use `id` or `ind` for Indonesian? Prefer BCP-47-like language tags in the eventual schema. If using plain object keys, `id` is the language code for Indonesian but can be confused with card `id`; document this clearly or use `indonesian` in internal tooling.
- Keep Japanese audio reusable across countries.
- Delay support-language audio until a specific country segment proves demand.
- Store mode separately from `question_type`; `question_type` describes activity style, while `mode` describes learning direction.
- Require human review for every non-English support language before paid release.

## 6. Validation Questions Before Expanding Content

Before creating hundreds of localized cards, answer these with observed evidence:

- Which target segment can we actually reach this month?
- Which bridge language do they request without prompting?
- Do learners prefer Japanese -> meaning, situation -> Japanese, sign reading, or listening first?
- Is the likely payer the learner, school, sending organization, registered support organization, employer, or family?
- Which paid pack name gets more interest: JFT-Basic, SSW Workplace, Nursing Care, Manufacturing Safety, or Onboarding?
- Can we get human translation review cheaply and reliably for the chosen bridge language?

## Sources

[^jft-about]: The Japan Foundation, "About the JFT-Basic," accessed 2026-05-23. https://www.jpf.go.jp/jft-basic/e/about/index.html
[^ssw-about]: Immigration Services Agency of Japan, "About the Specified Skilled Worker Program," accessed 2026-05-23. https://www.ssw.go.jp/en/about/
[^ssw-tests]: Immigration Services Agency of Japan, "Information on Tests Related to the Specified Skilled Worker Program," accessed 2026-05-23. https://www.ssw.go.jp/en/about/sswv/exam/
[^ef-method]: EF Education First, "About EF EPI," accessed 2026-05-23. https://www.ef.com/wwen/epi/about-epi/
[^ef-philippines]: EF Education First, "Philippines | EF English Proficiency Index," accessed 2026-05-23. https://www.ef.com/wwen/epi/regions/asia/philippines/
[^ef-malaysia]: EF Education First, "Malaysia | EF English Proficiency Index," accessed 2026-05-23. https://www.ef.com/wwen/epi/regions/asia/malaysia/
[^ef-nepal]: EF Education First, "Nepal | EF English Proficiency Index," accessed 2026-05-23. https://www.ef.com/wwen/epi/regions/asia/nepal/
[^ef-bangladesh]: EF Education First, "Bangladesh 2025 EF EPI fact sheet," accessed 2026-05-23. https://www.ef.com/assetscdn/WIBIwq6RdJvcD9bc8RMd/cefcom-epi-site/fact-sheets/2025/ef-epi-fact-sheet-bangladesh-english.pdf
[^ef-vietnam]: EF Education First, "Vietnam 2025 EF EPI fact sheet," accessed 2026-05-23. https://www.ef.com/assetscdn/WIBIwq6RdJvcD9bc8RMd/cefcom-epi-site/fact-sheets/2025/ef-epi-fact-sheet-vietnam-english.pdf
[^ef-indonesia]: EF Education First, "Indonesia 2025 EF EPI fact sheet," accessed 2026-05-23. https://www.ef.com/assetscdn/WIBIwq6RdJvcD9bc8RMd/cefcom-epi-site/fact-sheets/2025/ef-epi-fact-sheet-indonesia-english.pdf
[^ef-myanmar]: EF Education First, "Myanmar | EF English Proficiency Index," accessed 2026-05-23. https://www.ef.co.uk/epi/regions/asia/myanmar/
