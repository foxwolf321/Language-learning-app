# REVENUE_ROADMAP.md — Revenue-first roadmap

## Final goal
The final goal is not merely to build a language-learning app.

The final goal is to create a language-learning product that can generate revenue through a reachable, urgent, legally safe, and differentiated market.

## Core rule
Do not overbuild before validation.

Every task must support at least one of these:
- Find a paying segment.
- Reach that segment.
- Prove interest with a small sample.
- Convert interest into a paid offer.
- Build only the minimum product needed to deliver that offer.
- Reduce legal/content/platform risk.

## Current thesis
The current lead thesis is:

**JFT-Basic + SSW practical Japanese for people who want to work in Japan**

Likely paid verticals:
1. Nursing Care Japanese for SSW
2. Manufacturing / workplace safety Japanese
3. Japanese interview prep for foreign workers
4. Japanese for IT engineers in Japan

This thesis is not permanent. If validation shows a better legal niche with stronger purchase intent, switch.

## Roadmap

### Phase 0 — Strategy lock and repo memory
Status: mostly complete.

Outputs:
- `MISSION_CONTROL.md`
- `WORKFLOW.md`
- `CODEX_INTEGRATION_PLAN.md`
- `docs/MONETIZATION_STRATEGY.md`
- `docs/VALIDATION_PLAN.md`
- `data/market_candidates.csv`

Goal:
Prevent AI/Codex amnesia and keep the project monetization-first.

### Phase 1 — Market validation kit
Status: started.

Required outputs:
- competitor research filled with real observations
- one-page validation plan per top candidate
- landing page copy
- 50-card free sample
- simple offer wording
- human outreach script

Success signal:
A specific segment responds to the free sample or asks for a paid/specialized pack.

### Phase 2 — Free proof product
Required outputs:
- small PWA card app
- 50–80 original sample cards
- progress save via localStorage
- JSON export/import
- landing page
- email/contact/waitlist path

Not required yet:
- Google Drive sync
- App Store
- Google Play
- subscription system
- huge card database

Success signal:
Users can try the product immediately, and we can observe interest.

### Phase 3 — Paid offer test
Required outputs:
- named paid pack, e.g. `SSW Nursing Care Japanese Pack`
- pricing hypothesis
- sample screenshots
- refund/delivery explanation
- contact or early-access form
- B2B outreach message

Possible paid formats:
- Anki deck + audio pack
- PWA paid access
- Gumroad/Stripe digital product
- B2B PDF/PWA/deck license

Success signal:
Someone joins a paid waitlist, asks for a quote, requests a demo, or states a clear willingness to pay.

### Phase 4 — Product build for proven niche
Only after Phase 3 signals.

Required outputs:
- 300–800 card paid pack
- polished PWA
- audio pipeline
- progress backup
- support/contact flow
- terms/privacy
- basic analytics or manual evidence log

Optional:
- Google Drive sync
- Anki export
- GitHub Pages deployment
- Android wrapper
- Google Play listing

Success signal:
First real sale, B2B trial, or committed buyer.

### Phase 5 — Store and scale
Only after proof of demand.

Options:
- Google Play app
- App Store app
- SEO content expansion
- YouTube/Facebook/TikTok ads
- school/agency/facility outreach
- localized versions: Bengali, Nepali, Indonesian, Burmese, Vietnamese, Malay

Success signal:
Repeatable acquisition channel and positive conversion.

## What Codex should build next
Priority order:

1. Issue #2: 50-card original sample dataset.
2. Landing copy for JFT/SSW and Nursing Care Japanese.
3. Minimal PWA displaying the sample cards.
4. Competitor research template filled by human/AI research.
5. Offer page and outreach scripts.

## What Codex should NOT build yet
- A huge app with thousands of cards.
- Google Drive sync.
- Store-specific builds.
- Complex login/accounts.
- Subscriptions.
- AI chatbot features.

These are later, after validation.

## Human action triggers
Ask the human owner when any of these are needed:
- Google Cloud/OAuth setup
- GitHub Pages activation
- Google Play Console setup
- App Store developer account
- Gumroad/Stripe/other payment account
- Legal/tax/trademark review
- Real community or B2B outreach
- Human review of non-English translations

## Decision rule
If a task does not make revenue more likely, delay it.

If a rough sample can test demand, build the rough sample first.

If a market cannot be reached, do not build for it even if it is educationally valuable.
