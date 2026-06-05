# V36 Preview Worklog

## 2026-06-06 02:53:43 +09:00

### Changed Files
- app-v36-clean-fsrs-preview.html
- docs/V36_PREVIEW_WORKLOG.md

### What Was Fixed
- Restored the preview study screen toward the V35-style single-column card UI.
- Kept the first visible experience as the card study screen, not a long settings view.
- Kept New / Review / Learning counts at the top for the selected mode and section.
- Moved filters, engine status, analysis, CSV export, display toggles, and wallpaper selection into the gear panel.
- Added wallpaper choices: Daily life, Soft traditional, Clean.
- Removed card-body tag chips so raw tags and internal scenario keys are not shown on the card.
- Added Furigana, Answer Furigana, Romaji, and English toggles inside settings.

### What Was Not Touched
- app-v36-clean-fsrs-original.html
- app-v36-clean-fsrs.html
- index.html
- app-latest.html
- sw.js
- data/
- vendor/
- spacedRepetitionEngine.js

### Required Checks
- All removed: yes. The visible mode and section filters do not include All.
- Mixed cards added: no. The study queue filters by the selected mode and selected section only.
- Settings inside gear: yes. The sidebar is hidden on load and opens from the gear button.
- Analysis retained: yes. Study Stats, Mode Stats, Content Stats, FSRS Memory, Creator Analysis, and CSV Export remain inside settings.
- Wallpaper retained/added: yes. Wallpaper selector is inside settings.
- Show answer result: passed in local browser smoke test.
- Again / Hard / Good / Easy result: passed in local browser smoke test.
- FSRS import result: passed. spacedRepetitionEngine.js loaded with no engine error.
- Progress save result: passed. Four reviews remained in localStorage after reload.

### Smartphone Confirmation URL
https://foxwolf321.github.io/Language-learning-app/app-v36-clean-fsrs-preview.html?fresh=20260606-preview

### Remaining Problems
- Not pushed yet, so the GitHub Pages URL will not show this local preview change until commit/push is explicitly allowed.
- Local smoke test saw a non-engine 404 resource request, likely browser favicon handling. FSRS import and card data loading passed.

### Next
- Ask the user to approve commit/push for the preview file only when they are ready to view it on GitHub Pages.
- Do not copy preview changes into app-v36-clean-fsrs.html until the user explicitly approves.
