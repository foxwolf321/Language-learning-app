# COUNTRY_SEGMENT_RESEARCH_NOTES.md

## Purpose
These are initial research notes for country/language segmentation. They are not final market conclusions. Use them to guide `docs/TARGET_SEGMENTS.md` and future validation.

## Key finding
The product should not become English-centric by accident.

The current English-support PWA is useful for speed, internal testing, and English-capable segments, but the final revenue product should support configurable bridge languages.

## Official JFT-Basic signals
Official JFT-Basic material says the test is for non-native Japanese speakers, especially foreigners coming to Japan for work. It measures communication needed in life situations in Japan and is also used for Specified Skilled Worker Type 1 Japanese-language requirements.

Official JFT-Basic page also shows that test prompts are displayed in English, but a `Your Language` button can show local-language prompts. The official local-language list includes:
- English
- Chinese
- Indonesian
- Khmer
- Mongolian
- Myanmar/Burmese
- Nepali
- Thai
- Vietnamese
- Uzbek
- Bengali
- Lao
- Malay

Implication: local-language support is not a fringe idea. It is aligned with how JFT-Basic itself handles test comprehension.

Sources:
- https://www.jpf.go.jp/jft-basic/about/index.html
- https://www.jpf.go.jp/jft-basic/

## English as bridge language: proxy data
EF EPI 2025 is only a proxy and should not be treated as exact learner-level evidence. It is self-selected test data, not a census. Still, it helps avoid assuming English works equally everywhere.

Observed 2025 EF EPI signals:

| Country | EF EPI 2025 rank/score | Bridge-language implication |
|---|---:|---|
| Philippines | #28 / 569 | English bridge likely viable for many learners, especially online and professional segments. |
| Malaysia | #24 / 581 | English bridge likely viable; Malay support still useful if targeting lower-English workers. |
| Nepal | #58 / 514 | English may work for some, but Nepali support likely improves accessibility. |
| Bangladesh | #62 / 506 | English may work for some, but Bengali support likely improves accessibility. |
| Vietnam | #64 / 500 | English-only may be acceptable for some urban learners, but Vietnamese support likely important. |
| Indonesia | #80 / 471 | Indonesian support likely important for broad SSW/worker segments. |
| Myanmar | #99 / 444 | Burmese support likely important; English-only would likely narrow the audience heavily. |

Sources:
- https://www.ef.com/wwen/epi/regions/asia/philippines/
- https://www.ef.com/wwen/epi/regions/asia/malaysia/
- https://www.ef.com/wwen/epi/regions/asia/nepal/
- https://www.ef.com/wwen/epi/regions/asia/bangladesh/
- https://www.ef.com/wwen/epi/regions/asia/vietnam/
- https://www.ef.com/wwen/epi/regions/asia/indonesia/
- https://www.ef.com/wwen/epi/regions/asia/myanmar/

## Product implication
Do not define cards as `Japanese + English` only.

A better long-term data model:

```json
{
  "id": "jft-ssw-0001",
  "level": "A1_A2",
  "segment": ["jft_basic", "ssw", "work_life"],
  "modes": ["recognition", "production", "reading", "listening_later"],
  "target": {
    "ja": "在留カードを見せてください。",
    "reading": "ざいりゅうカードをみせてください。",
    "romaji": "Zairyuu kaado o misete kudasai."
  },
  "meaning": {
    "en": "Please show your residence card.",
    "id": "...",
    "vi": "...",
    "ne": "...",
    "bn": "...",
    "my": "...",
    "ms": "..."
  },
  "prompt": {
    "en": "You need to say: Please show your residence card.",
    "id": "...",
    "vi": "...",
    "ne": "...",
    "bn": "...",
    "my": "...",
    "ms": "..."
  },
  "audio": {
    "ja_target": null,
    "ja_example": null,
    "support_language_optional": null
  }
}
```

## Recommended product stance

### Current PWA
Keep it as a quick English-support validation sample, but label it clearly:
- English is a support language.
- Current mode is Japanese to meaning.
- Future versions may support Indonesian, Vietnamese, Nepali, Burmese, Bengali, Malay, and others.

### Near-term research
Before expanding beyond 50 cards, create `docs/TARGET_SEGMENTS.md` with a country-by-country recommendation.

### Likely segmentation
1. **English-bridge quick validation**
   - Philippines, Malaysia, urban/professional learners elsewhere.
   - Fastest to test.

2. **Native-language SSW worker validation**
   - Indonesian, Vietnamese, Nepali, Burmese, Bengali.
   - Better fit for mass worker segments.

3. **Audio as paid differentiator**
   - Japanese target phrase audio is reusable across all countries.
   - Japanese example audio is likely paid-pack value.
   - Support-language audio should wait until a country segment proves demand.

## Open questions for Codex / research
- Which target country has the clearest SSW/JFT-Basic paid channel?
- Which has reachable online communities or schools?
- Which bridge-language translation is easiest to validate cheaply?
- Which country has competitors already serving this exact need?
- Which vertical, e.g. nursing care or manufacturing safety, has the strongest B2B path?
