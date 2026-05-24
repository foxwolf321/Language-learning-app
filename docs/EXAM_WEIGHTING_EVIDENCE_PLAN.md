# EXAM_WEIGHTING_EVIDENCE_PLAN.md — Evidence needed for exam-priority scheduling

Last checked: 2026-05-24

## Core point

An exam-priority scheduler cannot be invented from intuition alone.

If the app says it prioritizes cards for JFT-Basic / SSW preparation, the priority weights must be based on evidence.

## Evidence hierarchy

### Tier 1 — Official test structure

Use official JFT-Basic structure as the first weighting baseline:

- Script and Vocabulary
- Conversation and Expression
- Listening Comprehension
- Reading Comprehension

Each section has around 12 questions and the full test has around 50 questions / 60 minutes. This supports an initial roughly balanced four-section scheduler.

### Tier 2 — Official category descriptions

Within each section, use official category purposes such as:

- word meaning
- word usage
- kanji reading
- kanji meaning and usage
- grammar in context
- expression in context
- conversation listening
- shop/public-place listening
- announcements/instructions
- short message/notice reading
- information search

These categories should map directly to card tags and scheduler weights.

### Tier 3 — Official sample questions and test description

Use public sample questions and official test documents to infer:

- question formats
- difficulty style
- length of Japanese text
- typical situation framing
- types of distractors or comprehension demands

Do not copy sample question text into cards.

### Tier 4 — Public learning frameworks and Irodori

Use Irodori / JF Can-do style materials as domain maps for A1-A2 Japanese in life/work contexts.

Use these to infer common domains:

- city office / documents
- shopping / transport / public places
- health / absence
- work schedule / shift
- workplace instructions
- safety and signs
- reporting problems
- notices and information search

Do not treat Irodori as a literal question bank.

### Tier 5 — Public preparation materials / learner feedback

Use public articles/videos/comments only as weak signals. They may reveal common anxiety, perceived hard sections, preparation topics, or country-specific learner needs. They should not override official structure.

### Tier 6 — Real app data

Once users study with the app, the strongest proprietary evidence becomes:

- which cards are repeatedly missed
- which JFT sections have low accuracy
- which modes cause difficulty
- which cards are skipped
- which cards users mark as useful
- which content leads to paid interest

Over time, app data should become more important than assumptions.

## Initial scheduler weights before historical item data

Because public past-question history may be limited, start with official section balance:

| JFT section | Initial weight |
|---|---:|
| Script and Vocabulary | 1.0 |
| Conversation and Expression | 1.0 |
| Listening Comprehension | 1.1 |
| Reading Comprehension | 1.1 |

Why slightly boost Listening/Reading?

- Listening and reading are harder to improvise without repeated exposure.
- They benefit strongly from app-based repetition and later audio.
- This is a product assumption and should be revised after user data.

## Category weight examples

Initial category weights can be:

| Category | Initial weight | Reason |
|---|---:|---|
| word meaning | 0.9 | Important but easy to overproduce; avoid pure vocabulary bloat. |
| word usage | 1.0 | More exam-relevant than isolated translation. |
| kanji reading | 1.0 | Needed for Script/Vocabulary and real-life reading. |
| kanji meaning/usage | 1.1 | Useful for both exam and signs/notices. |
| grammar in context | 1.0 | Core conversation/expression skill. |
| expression in context | 1.1 | Strong practical and exam value. |
| conversation listening | 1.1 | Needs repetition; later audio value. |
| shop/public-place listening | 1.0 | Everyday situation coverage. |
| announcements/instructions | 1.2 | Strong SSW/workplace relevance. |
| short message/notice reading | 1.1 | Reading section and life in Japan. |
| information search | 1.2 | Distinct test skill; needs targeted practice. |
| workplace safety/reporting | 1.2 | SSW paid-pack relevance, even if not a separate official JFT section. |

These are starting assumptions, not final truth.

## Required metadata for scheduling

Each card should include:

```json
{
  "jft_section": "script_vocab|conversation_expression|listening|reading",
  "skill_category": "word_meaning|word_usage|kanji_reading|kanji_meaning_usage|grammar|expression|conversation_listening|public_place_listening|announcement_instruction|notice_reading|information_search|workplace_safety|reporting",
  "scenario": "city_office|workplace|health|transport|shopping|schedule|safety|documents",
  "mode": "recognition|production|kanji_sign|listening|information_search",
  "exam_weight": 1.0,
  "evidence_basis": ["official_structure", "sample_format", "irodori_domain", "product_assumption", "user_data_later"]
}
```

## Scheduler formula direction

Initial priority can use:

```text
priority = due_score
         × learner_weakness
         × exam_weight
         × section_balance
         × mode_difficulty
         × exam_date_urgency
```

But `exam_weight` must be backed by the evidence hierarchy above.

## Historical exam data limitation

If multiple years of official past questions are not publicly available, do not pretend we have them.

Instead:

1. use official structure and category descriptions
2. analyze public sample questions for format only
3. use Irodori/JF Can-do as domain guidance
4. collect app performance data
5. revise weights from real learner outcomes

## Monetization relevance

A scheduler becomes a paid-value feature only if it can credibly say:

> Today, study these cards because they matter for JFT/SSW and because you are weak here.

That requires evidence-backed tags and continuous updating, not random review.
