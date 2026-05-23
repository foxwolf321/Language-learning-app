# CONTENT_SOURCE_STRATEGY.md — How to build card content without copying protected materials

Last checked: 2026-05-23

## Primary rule

Do **not** copy existing textbooks, official exam questions, sample questions, or copyrighted learning materials into the app.

The product should use public/official materials to understand:

- target level
- skill areas
- situation categories
- common task types
- learner needs
- vocabulary/grammar bands
- workplace/life domains

Then create original cards, original examples, original prompts, and original audio scripts.

## Why this matters

The project goal is monetization. Copyright or official-affiliation risk can destroy monetization later.

Do not build a paid product on copied questions or copied textbook sentences.

## Recommended source hierarchy

### 1. Official exam framework and public descriptions

Use for scope, level, and task categories.

Examples:

- JFT-Basic official about page
- JFT-Basic official sample question page
- JFT-Basic official examinee reports
- Specified Skilled Worker official information pages
- official field-specific SSW descriptions where available

Use these to answer:

- What level is expected?
- What skills are tested?
- What kinds of life/work situations matter?
- Which countries/languages are relevant?

Do not copy actual question wording into the app.

### 2. Official/public Can-do style materials

Use Can-do descriptors and category structures as inspiration.

Examples:

- JFT-Basic level descriptions
- JF Standard / CEFR-style A1-A2 descriptions
- public life/work Japanese category descriptions

Use these to define card categories such as:

- greetings and self-introduction
- asking for help
- workplace instructions
- schedule and time
- health and absence
- city office / residence card / paperwork
- safety signs and warnings
- reporting problems
- polite requests

Then write original cards.

### 3. Public free教材 such as Irodori

Irodori is highly relevant because it is designed for Japanese in life and work contexts.

Use it as a reference for:

- level distribution
- practical situation domains
- lesson/task organization
- what A1-A2 practical Japanese looks like

Do not copy its dialogues, sentences, exercise wording, audio, or lesson texts into the app.

If a topic overlaps, create a new original phrase or scenario.

Example:

- Reference topic: asking at a city office
- App card: create an original short phrase about showing a residence card or writing a name, not copied from Irodori.

### 4. Past exam content

Do not use non-public or copyrighted past exam questions as source text.

If official sample questions are public, use them only to understand format and level.

Do not clone the question, options, scenario, or wording.

The product should be marketed as:

- practical JFT/SSW/work-life Japanese support
- unofficial learning tool

not as:

- official past-question collection
- leaked exam preparation
- guaranteed pass material

### 5. Real-world workplace/life sources

This is where the product can become valuable.

Use common real-world domains and create original simplified Japanese:

- workplace safety signs
- city-office procedures
- shift/schedule communication
- asking a supervisor
- reporting a machine/problem
- health and absence
- nursing care communication
- manufacturing safety
- food service/customer phrases

Do not copy proprietary manuals, company training materials, or workplace documents.

Instead, write generic original cards based on common situations.

## Card creation method

For each card, record:

1. **Situation**
   - e.g. city office, workplace, supervisor, safety, health, dormitory

2. **Skill mode**
   - recognition: Japanese -> meaning
   - production: native language/English situation -> Japanese
   - sign reading: kanji/sign -> reading + meaning
   - listening: Japanese audio -> text + meaning

3. **Japanese target**
   - original phrase/sentence
   - short, practical, natural
   - A1-A2/JFT-ish unless vertical pack requires more

4. **Reading help**
   - kana reading
   - romaji only if needed and fadeable

5. **Meaning**
   - English source/fallback
   - selected native-language translation when validated

6. **Example**
   - original example sentence
   - practical and not too long

7. **Notes**
   - polite level
   - when to use
   - what not to say if relevant

8. **Review status**
   - Japanese native checked
   - support-language reviewed
   - audio status

## Content lanes

### Lane A: Core JFT/SSW starter

Goal: free/low-cost starter sample.

Includes:

- 50-80 cards at first
- A1-A2 practical life/work phrases
- recognition mode first
- Indonesian + English fallback if Stage 1B targets Indonesia

### Lane B: Workplace starter paid pack

Goal: first paid-pack hypothesis.

Includes:

- production mode
- workplace reporting
- instructions
- schedule
- safety
- basic trouble communication
- Japanese phrase audio when ready

### Lane C: Field-specific paid packs

Candidates:

- Nursing care Japanese
- Manufacturing / safety Japanese
- Food service / customer Japanese
- Building cleaning Japanese
- Agriculture Japanese

These should be built only after demand signals.

## Topic template for original card generation

Use this format when asking Codex or another model to create content:

```text
Create original JFT/SSW practical Japanese flashcards.
Do not copy official exam questions, textbooks, Irodori dialogues, or existing copyrighted examples.
Use official materials only as level/category guidance.
Target: Indonesian learners preparing for JFT-Basic/SSW.
Support language: Indonesian + English fallback.
Level: A1-A2 practical work/life Japanese.
Mode: recognition and production.
Topic: workplace safety and reporting.
Output JSON matching the repository schema.
Include review_status fields.
Mark translations as machine_draft unless human-reviewed.
```

## Recommended immediate next content move

After `docs/TARGET_SEGMENTS.md`, the next content task should not be a huge deck.

Recommended task:

- create a Stage 1B Indonesian content/schema plan
- convert only 10-20 sample cards to Indonesian + English fallback
- keep existing English cards as source/fallback
- do not add audio yet unless using a tiny proof-of-concept with high-quality Japanese phrase audio

## Monetization relevance

The content source strategy must protect the future paid product.

A product can be small and original and still be monetizable.
A product built from copied material is fragile, risky, and difficult to sell or partner around.
