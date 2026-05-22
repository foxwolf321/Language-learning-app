# Validation Plan

## Purpose
Test whether a narrow language-learning market has reachable paid demand before building a full app. The goal is not to prove that a market is large in theory. The goal is to find a segment that can be reached, understands the problem, and shows some willingness to pay or introduce the product to buyers.

## Guardrails
- Do not invent market-size statistics, conversion rates, review counts, or competitor claims.
- Treat `data/market_candidates.csv` scores as internal hypotheses, not evidence.
- Use official public information only for exam structure or eligibility context. Do not copy exam questions, paid textbook examples, or proprietary vocabulary lists.
- Do not claim official endorsement by JFT-Basic, SSW programs, JLPT, BJT, EJU, employers, schools, or government bodies.
- Validate with original sample content and clear non-official wording.

## Source Files
- `data/market_candidates.csv` lists candidate markets and initial monetization hypotheses.
- `data/competitor_research_template.csv` is the worksheet for desk research.
- `docs/MONETIZATION_STRATEGY.md` explains the current monetization thesis.
- `HANDOFF.md` records the current product direction.

## Candidate Scoring
Use the score in `data/market_candidates.csv` only as a starting priority. Re-score each market after real evidence is collected.

Evaluate each candidate against:
- Pain: Is the language problem tied to work, visa-adjacent preparation, school admission, safety, or a deadline?
- Payer: Can the learner, school, agency, employer, or family reasonably pay?
- Urgency: Is there a near-term exam, interview, placement, onboarding, or job requirement?
- Reach: Can the audience be reached through search, communities, schools, agencies, or employers?
- Differentiation: What is missing from general JLPT or general language apps?
- Build cost: Can a useful sample be made with a small original dataset?
- Legal risk: Are exam names, official marks, privacy, or copied content risky?
- Expansion: Can the niche become paid packs, B2B licenses, or adjacent verticals?

## Validation Sequence

### 1. Desk Research
Fill `data/competitor_research_template.csv` before creating a large card dataset.

For each candidate, capture:
- Direct competitors and indirect substitutes.
- Platform: web, Google Play, App Store, Anki, YouTube, course marketplace, school material, or agency training.
- Positioning and target user.
- Free offer and paid offer.
- Languages supported.
- Sales channel and pricing model when public.
- Review signals or visible user feedback without treating them as complete market statistics.
- Gaps that a focused product can address.
- Legal or claims risks.

### 2. Landing Page Smoke Test
Create one simple landing page for the top candidates instead of building the full app first.

Recommended first pages:
- JFT-Basic + SSW practical Japanese.
- Nursing Care Japanese for SSW.
- Manufacturing / safety Japanese.

Each page should include:
- Target user.
- Problem statement.
- Original sample cards or screenshots.
- Clear disclaimer that the product is unofficial.
- Free starter call to action.
- Paid pack hypothesis such as a waiting list, early-access interest form, or contact request.

### 3. Free Sample Test
Create a small original free sample before building hundreds of cards.

Use a sample size that is large enough to judge usefulness but small enough to rewrite quickly, such as 30 to 80 original cards. Track which topics users ask for next. Do not use official exam questions or copied textbook examples.

### 4. Paid Intent Test
Test paid intent before full app development.

Acceptable tests:
- Waiting list for a named paid pack.
- Request-for-demo form for schools, agencies, or employers.
- Manual invoice or quote request for B2B buyers.
- Early-access survey asking which pack the user would pay for.
- Price-sensitivity question shown after a user requests the free sample.

Avoid collecting payment until the product, refund policy, legal wording, and delivery path are ready.

### 5. B2B Outreach
For JFT/SSW, nursing care, manufacturing, and interview-prep candidates, B2B demand may matter more than app-store discovery.

Human-side outreach targets:
- Japanese-language schools.
- Sending organizations.
- Registered support organizations.
- Care facilities.
- Small manufacturing employers.
- Recruiters or agencies that support foreign workers.

Ask for practical pain points, current materials, required languages, purchase process, and whether they need learner progress tracking.

### 6. Community Interviews
Run lightweight interviews with learners before building the full product.

Questions to answer:
- What deadline are they preparing for?
- What language situation feels most stressful?
- What materials do they already use?
- What language do they need explanations in?
- Would they prefer mobile app, web app, Anki deck, PDF, audio, or school access?
- Who would pay if the material is useful?

## Evidence Log
For each test, record the date, channel, audience, offer, result, and follow-up action. Keep raw evidence separate from assumptions. If a number is not observed directly, do not write it as fact.

## Decision Rule
Move from validation to product build only when there is evidence for all of these:
- A specific learner segment has an urgent problem.
- There is a reachable channel.
- The product can be described in one clear paid offer.
- Original sample content receives useful feedback or repeat interest.
- At least one plausible payer is identified.
- Legal and content risks are manageable.

If evidence is weak, revise the offer, test another channel, or move to the next candidate in `data/market_candidates.csv`.

## Initial Recommendation
Start validation with JFT-Basic + SSW practical Japanese as the broad wedge, then compare Nursing Care Japanese for SSW and Manufacturing / safety Japanese as paid verticals. Keep BJT, EJU, JLPT niche addons, IT engineer Japanese, and interview prep in the candidate file until real demand signals justify a build.
