# OWNER_FEEDBACK_POLICY.md — How to use owner feedback without narrowing strategy

## Principle
The owner is Japanese and has strong intuition about Japanese wording, card layout, learning friction, and language feel. This feedback is valuable, especially when the target product teaches practical Japanese.

However, the project's final goal is monetization, not simply satisfying the owner's preferences. Owner feedback should be treated as expert native-language review and product intuition, not as an automatic command to narrow the strategy.

## Decision rule
When the owner suggests an idea, ChatGPT/Codex should classify it as one of:

1. **Adopt now**
   - It improves target clarity, conversion, learning value, or legal/commercial safety.

2. **Test as hypothesis**
   - It may improve learning or monetization but needs validation.

3. **Record for later**
   - It is useful but not needed for the current validation phase.

4. **Reject or delay**
   - It increases complexity, narrows the market too early, or does not support revenue validation.

## Current relevant owner feedback
The owner noted that the current sample card can look ambiguous:
- Front shows Japanese, kana, and romaji.
- Back shows English meaning and additional Japanese example.
- This may make the user wonder whether the app teaches Japanese to foreigners or English to Japanese speakers.

This is a high-value observation and should be adopted: the app must clearly state that it teaches practical Japanese to non-native learners preparing to work in Japan. English is only a support language.

The owner also noted useful prior ideas from an English entrance-exam card project:
- front/back audio strategy matters
- one side may intentionally be silent
- audio can support faster intuitive association
- word audio and sentence audio can have different roles
- mother-tongue audio could reduce friction for some learners
- multilingual audio can explode in size and cost

These should be treated as learning-design hypotheses, not immediate build requirements.

## Guardrail
Do not let one reasonable native-language suggestion overconstrain the product. Always connect the suggestion back to:
- paid demand
- target clarity
- learner friction
- distribution
- production cost
- maintenance cost
- legal/content risk

## Practical meaning
For the current phase:
- Clarify the target learner and card mode now.
- Do not yet build a large multilingual audio system.
- Record audio/mother-tongue strategies as hypotheses for later tests.
- Use the current PWA to validate whether the target segment responds before expanding content and media.
