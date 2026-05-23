# BRIDGE_LANGUAGE_POLICY.md — Native-language support plus English fallback

## Principle
Do not assume English is enough for every learner.
Do not assume native-language translations will always be perfect.

A strong product design may show the learner's selected support language first, while keeping English as a secondary fallback/reference where it does not clutter the learning experience.

## Important clarification
"First stage" does **not** mean native-language support is forbidden.

It means:
- The current working PWA is English-support only because it was the fastest technical validation sample.
- The next market-validation version may include one selected native language if that improves validation.
- We should not build full multilingual support for every country before demand is tested.

Recommended staging:

### Stage 1A — technical sample
- English support only is acceptable.
- Purpose: verify PWA, card flow, local save, export/import.
- This is what exists now.

### Stage 1B — market validation sample
- Add one selected native-language text layer if a target country is chosen.
- Keep English fallback/reference.
- No support-language audio yet.
- Purpose: test whether local-language support improves trust, comprehension, and conversion.

### Stage 2 — paid-pack candidate
- Add Japanese target phrase audio and possibly Japanese example audio.
- Expand only the language/country segment that shows evidence of demand.

### Stage 3 — localized premium
- Add more native-language text and only later native-language audio, if justified.

## Why this matters
For JFT/SSW practical Japanese, learners may come from countries where English bridge support is uneven. Native-language support can reduce friction and improve conversion.

However, translations into Vietnamese, Indonesian, Nepali, Burmese, Bengali, Malay, etc. may be difficult to quality-control at the beginning. English fallback can help:
- give a stable reference meaning
- reduce risk from weak machine translation
- support teachers, agencies, and reviewers
- help multilingual support when human review is not complete
- make data QA easier

## Recommended UI rule
Use a selected support language as the main explanation, with English as optional or secondary.

Examples:

### Recognition mode
Front:
- Japanese phrase only
- optional reading help

Back:
- meaning in selected support language
- English fallback in smaller text or collapsible section
- reading
- example sentence

### Production mode
Front:
- situation/prompt in selected support language
- English fallback optional

Back:
- Japanese phrase
- reading
- example

## Avoid clutter
Do not show too many languages at once.

Recommended display order:
1. Japanese learning target
2. selected support language
3. English fallback as small/reference text or toggle

For early technical MVP, it is acceptable to show English only, but the data model should not lock the product into English-only design.

For early market validation, one native language plus English fallback may be better than English-only if the target country has weak or uneven English bridge ability.

## Data model implication
Future cards should support fields such as:

```json
{
  "id": "jft-ssw-0001",
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
  "translation_status": {
    "en": "source_or_reviewed",
    "id": "machine_draft",
    "vi": "machine_draft",
    "ne": "needs_review",
    "bn": "needs_review",
    "my": "needs_review",
    "ms": "needs_review"
  }
}
```

## Audio implication
Japanese audio is the highest-value shared asset:
- target phrase audio
- example sentence audio

Support-language audio should be delayed until a specific country/language segment proves demand.

Text support in native language plus English fallback is much cheaper than multilingual audio and should be tested first.

## MVP recommendation
For the current free PWA:
- keep English support for speed only
- clearly label English as support, not the learning target
- prepare the data/UI direction for selected support language + English fallback
- do not add multilingual audio yet

For the next validation step:
- choose one target country/language hypothesis
- test native-language text plus English fallback, or English-only if the target segment is likely English-capable
- collect feedback about whether learners prefer native-language-only, English-only, or both

## Monetization relevance
A bilingual fallback structure can increase trust without greatly increasing file size. It allows the product to test local-language demand while reducing translation-risk anxiety.
