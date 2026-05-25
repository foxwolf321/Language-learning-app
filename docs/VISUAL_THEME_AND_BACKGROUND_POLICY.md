# VISUAL_THEME_AND_BACKGROUND_POLICY.md

Last updated: 2026-05-26

## 1. Purpose

The visual theme and background should improve emotional appeal and Japan life/work atmosphere, but must never reduce readability.

Stage 1B is a free validation release for a monetization-first JFT-Basic / SSW / Work-in-Japan practical Japanese product. Visual design should help the product feel trustworthy, warm, and focused enough that learners can imagine using it daily and later paying for a broader starter pack.

This document is a policy/specification only. It does not create final background image assets, modify the PWA, change `index.html`, add audio, add payment, add login, add Google Drive, or add app-store behavior.

## 2. Strategic Visual Principle

Core principle:

- background = atmosphere
- card surface = study
- readability always wins
- evoke daily/work Japan, not loud tourist-poster Japan

The visual system should support the product promise: practical Japanese for working and living in Japan. It should not look like a generic language app, a travel brochure, a game, or a corporate HR portal.

The learner should notice the atmosphere, then immediately focus on the card.

## 3. Desired Mood

The first-release visual mood should be:

- calm
- welcoming
- practical
- slightly warm
- trustworthy
- not childish
- not corporate-sterile
- not over-ornamental

This is a study product for serious goals, but many learners may be anxious about Japanese work/life situations. The design should feel steady and supportive rather than cold.

## 4. First-Release Theme Families

Use three to four theme families. Each theme should be simple enough to preserve card readability.

### A. Japan Daily Life

Examples:

- quiet neighborhood
- small station
- bus stop
- apartment exterior
- daily town scene

Use case:

- Best default for Stage 1B because it supports life-in-Japan positioning without becoming too exam-heavy or workplace-heavy.

Avoid:

- crowded tourist landmarks
- neon nightlife
- highly detailed street scenes behind text
- souvenir-shop visual cues

### B. Japan Work / Safety

Examples:

- notice board
- workplace shelves
- warehouse atmosphere
- safety-themed practical setting
- simple staff-room or back-office feeling

Use case:

- Good optional theme for SSW / Work-in-Japan positioning and workplace survival cards.

Avoid:

- proprietary workplace manuals or real company signage
- dangerous-looking or fear-based imagery
- heavy industrial visuals that make the app feel field-specific too early

### C. Soft Traditional / Cultural Atmosphere

Examples:

- subtle lantern street
- soft roofline silhouettes
- paper texture
- calm non-touristy Japanese atmosphere

Use case:

- Adds warmth and Japanese identity without overwhelming the study surface.

Avoid:

- festival-poster intensity
- overused cherry-blossom-only styling
- ornate patterns behind the card
- anything that makes the product feel like travel entertainment rather than work/life preparation

### D. Minimal Clean

Examples:

- very soft abstract background
- paper-like texture
- quiet neutral surface
- faint geometric or material texture

Use case:

- Maximum clarity and safest fallback for dense cards, especially information-search mini cards.

Avoid:

- sterile blankness that makes the app feel unfinished
- high-contrast abstract shapes
- strong gradients that compete with text

## 5. Default Theme

Recommend Japan Daily Life as the first-release default.

Reason:

- It supports the practical life-in-Japan positioning.
- It avoids making the product feel like only a workplace compliance tool.
- It is warmer than a purely minimal theme.
- It leaves room for JFT-Basic, SSW, transport, housing, city office, and daily-life scenarios.
- It can support future monetization messaging around living and working in Japan.

The default should be calm and low-detail. The card should remain the dominant study surface.

## 6. Theme Behavior

First-release behavior:

- Use a fixed theme across the app by default.
- Let the user switch theme in settings if theme selector is implemented.
- Do not change the background dramatically every card.
- Keep study-session consistency.
- Remember selected theme locally in future implementation.

Do not make automatic mode-based background switching the first-release default. It adds complexity and could make card UX validation noisier.

## 7. Future Mode-Linked Option

Mode-linked backgrounds may be tested later after baseline UX validation.

Possible future mapping:

| Mode or context | Possible background direction |
|---|---|
| recognition | daily-life atmosphere |
| production | conversation, counter, workplace interaction, or practical daily scene |
| listening_ready | station, announcement, counter, or work-instruction atmosphere |
| information_search_mini | most minimal and low-detail background |
| SSW workplace cards | work/safety atmosphere |

This is future only. First validate whether the fixed-theme experience is readable, warm, and commercially credible.

## 8. Readability Constraints

Hard rules:

- Use low-contrast backgrounds.
- Put no busy detail behind text.
- Put no strong object behind the main card.
- The card panel must preserve readability.
- Information-search cards require the weakest background presence.
- Avoid high saturation.
- Avoid souvenir-shop Japan aesthetics.
- Avoid strong patterns behind Japanese, kana, Indonesian, or notice/table text.
- Avoid backgrounds that make the app feel childish, touristy, or decorative-first.

If a theme looks attractive but makes a card harder to read, reject or soften the theme.

## 9. Card / Background Relationship

The card panel must remain the learning focus.

Guidelines:

- The background may provide atmosphere around the card, not inside dense text areas.
- The card panel needs enough opacity for readability.
- Soft visual style is acceptable.
- Do not overdo transparency.
- Avoid glass effects that reduce contrast.
- Keep information-search notice/table blocks especially clear.
- Avoid placing important learner text directly on top of background art.

A good test: blur your attention slightly. If the background competes with the Japanese target or Indonesian support text, the design is too loud.

## 10. Theme Selector Policy

First-release selector policy:

- Offer 3-4 themes at most.
- Use one default theme.
- Put the selector in settings.
- Remember the selected theme locally in future implementation.
- Do not build an advanced theme editor.
- Do not allow per-card theme changes in the first release.

Suggested theme names:

| Theme | Family | Notes |
|---|---|---|
| Daily Japan | Japan Daily Life | Recommended default. |
| Work & Safety | Japan Work / Safety | Optional, practical work-life feel. |
| Soft Japan | Soft Traditional / Cultural Atmosphere | Warm but restrained. |
| Clean Focus | Minimal Clean | Highest readability fallback. |

The selector should not become a major feature. It is there to validate whether visual tone improves return motivation without harming study speed.

## 11. Asset Policy

Asset rules:

- Use original or licensed-safe assets only.
- Do not copy copyrighted promotional art.
- Do not use official JFT, Irodori, textbook, company, or agency visuals as backgrounds.
- Prefer original illustrations, generated-but-owned bitmap art, or generic scene art with safe licensing.
- Backgrounds must support the product concept, not compete with the card.
- Do not create final image assets in this documentation issue.
- Keep asset provenance documented when assets are later added.

The product should avoid any visual implication of official endorsement by JFT-Basic, the Japan Foundation, Immigration Services Agency, employers, schools, or textbook publishers.

## 12. Validation Checklist

Use this checklist before accepting a Stage 1B visual implementation:

- Does the background improve emotional appeal?
- Does it still feel like a study tool?
- Is Japanese always readable?
- Is kana readable and connected to the target?
- Is Indonesian support clearly readable?
- Is English fallback secondary but readable?
- Are information-search cards easy to read?
- Does the default theme support monetization positioning?
- Do themes fit JFT/SSW / Work-in-Japan practical preparation?
- Does the app avoid loud tourist-poster Japan visuals?
- Does the card remain the main focus?
- Would a learner or organization perceive the product as credible enough to try?

If the background fails readability, it fails the release even if it looks attractive.

## 13. Next Implementation Recommendation

Recommended next issue:

- Implement the Stage 1B PWA vertical slice using the approved UI/UX spec.
- Load `data/deck_manifest.json`.
- Load `data/cards.stage1b.id.sample.json`.
- Render all five card modes.
- Add theme selector with fixed-theme support.
- Keep the default theme stable during a study session.
- Do not add payment, audio, login, Google Drive, or app-store behavior yet.

The next implementation should validate usability, readability, emotional appeal, and monetization potential before expanding into paid infrastructure or larger content sets.
