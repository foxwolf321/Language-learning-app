# V37 Quality Check

## 2026-06-06 03:57:48 +09:00

### Changed Files
- app-v37-fsrs-clean.html
- fsrsV2Adapter.js
- docs/V37_QUALITY_CHECK.md

### V37 Name / Storage
- V37 display name: `JFT/SSW Work-in-Japan Cards v37 Clean FSRS`
- V37 global check object: `window.__APP_V37_FSRS_CLEAN__`
- No automatic migration from earlier progress stores.
- V37 starts with its own progress storage.

### Search Results
- Previous uppercase version token: 0 hits in V37 app and adapter.
- Previous lowercase version token: 0 hits in V37 app and adapter.
- Previous app filename token: 0 hits in V37 app and adapter.
- Previous clean filename token: 0 hits in V37 app and adapter.
- Previous storage key token: 0 hits in V37 app and adapter.
- Retired scheduler identifiers: 0 hits in V37 app and adapter.
- Aggregate mode label token: 0 hits in V37 app and adapter.
- Blend mode tokens: 0 hits in V37 app and adapter.
- Side-panel tokens: 0 hits in V37 app and adapter.

### V37 Storage Keys
- `jft-ssw-v37-fsrs-progress`
- `jft-ssw-v37-fsrs-settings`
- `jft-ssw-v37-fsrs-review-log`
- `jft-ssw-v37-fsrs-ui-settings`

### Smartphone Confirmation URL
- Local test URL: `http://127.0.0.1:8788/app-v37-fsrs-clean.html`
- GitHub Pages URL after a future push: `https://foxwolf321.github.io/Language-learning-app/app-v37-fsrs-clean.html?fresh=20260606-v37`

### Functional Checks
- Card load: passed, 60 cards loaded.
- FSRS/V2 adapter import: passed.
- Engine error: none.
- Import error: none.
- Furigana on first card front: passed.
- Furigana on answer: passed.
- Furigana on example: passed.
- Furigana OFF setting: passed, furigana disappears.
- Furigana ON again: passed.
- Settings screen switch: passed. Gear opens a separate `設定` screen.
- Settings is not a side panel: passed. Card view and top study chips are hidden in settings view.
- Back to card screen: passed.
- Analysis screen: passed. Analysis opens from settings and is not on the initial card view.
- State distribution graph: passed, stacked bar rendered.
- Rating distribution graph: passed, stacked bar rendered.
- Show answer: passed.
- Again / Hard / Good / Easy: passed.
- Reload progress persistence: passed, reviewed progress remained after reload.
- V37 storage only: passed. V37 keys were written; previous progress and UI keys were not written.
- Settings layout overflow: passed after screenshot fix. Buttons, selects, and wallpaper strength slider stay inside the settings screen at 390px width.
- Study layout horizontal overflow: passed after screenshot fix.
- Direct file open handling: passed. The screen now shows a short local-HTTP/GitHub Pages instruction instead of a long local path. Full app operation still requires HTTP/GitHub Pages because browser module imports and card JSON fetches are blocked from direct file open.
- Empty queue with waiting learning cards: passed. If selected cards have no New or due Review cards but still have Learning cards, V37 keeps showing the Learning cards instead of stopping at Card 0/0.

### Unchecked Items
- Real phone hardware check is not performed in this Codex session.
- GitHub Pages check is not performed because no commit/push was requested in this turn.

### Remaining Risk
- fsrsV2Adapter.js directly imports the FSRS package from `vendor/ts-fsrs/index.mjs`; this should be reviewed against the adapter tests before publishing.
- The app is still a single-file UI plus adapter and should be reviewed on the actual phone after publishing.
