# V37 Quality Check

## 2026-06-06 11:00 +09:00

### 変更ファイル
- app-v37-fsrs-clean.html
- docs/V37_QUALITY_CHECK.md

### 検索結果
- 集約表示語の大小2種: 0件
- 混合系英語3語: 0件
- 前世代名4語: 0件
- 旧スケジューラ名と旧係数名: 0件

### V37 storage key
- `jft-ssw-v37-fsrs-progress`
- `jft-ssw-v37-fsrs-settings`
- `jft-ssw-v37-fsrs-review-log`
- `jft-ssw-v37-fsrs-ui-settings`
- `jft-ssw-v37-fsrs-extra-new-today`

### 今回の確認
- 起動時5ジャンル選択: OK
- 5ジャンル数: OK
- ジャンル選択後に選択ジャンルのみ表示: OK
- ジャンル選択へ戻るボタン: OK
- 本日のカード終了画面: OK
- 今日だけ新規カード+5: OK
- 今日だけ新規カード+10: OK
- 今日だけ追加分の再読込保持: OK
- ふりがな表面表示: OK
- 設定画面切替: OK
- 分析グラフ: OK
- Show answer: OK
- Again / Hard / Good / Easy: OK
- 進捗の再読込保持: OK
- import error: なし
- engine error: なし

### 実行した検証
- ローカルHTTP配信を一時起動し、390px幅のブラウザで確認。
- 起動、ジャンル選択、学習、終了画面、追加学習、再読込、設定、分析を確認。

### 未確認事項
- 実機スマホでの目視確認は未実施。
- GitHub Pages反映後の確認は未実施。

### 残リスク
- 今日だけ追加学習は、新規カードが残っているジャンルで効く。
- 新規カードを使い切ったジャンルでは、追加ボタンを押しても出せる新規カードは増えない。
