# HUMAN_ACTIONS.md — 人間側で必要な作業

このファイルは、AIだけでは完了できない作業をまとめる。

## 1. GitHub / 開発
- [x] `foxwolf321/Language-learning-app` repo作成
- [x] ChatGPT/GitHub連携にrepo書き込み許可
- [ ] GitHub Pagesを使う場合、Settings → Pagesで公開設定
- [ ] Codexを使う場合、このrepoを対象に指定

## 2. Google Drive連携が必要な場合
Google Drive保存を実装する場合に必要。

- [ ] Google Cloud Consoleでプロジェクト作成
- [ ] OAuth consent screen設定
- [ ] OAuth Client ID作成
- [ ] Authorized JavaScript originsに公開URLを追加
- [ ] Drive API有効化
- [ ] テストユーザー追加または公開審査対応
- [ ] Client IDをアプリ設定に入れる

注意:
- `appDataFolder`を使うとユーザーの通常Drive画面には進捗ファイルが見えにくい。
- バージョンごとに保存ファイル名を分ける。

## 3. App Store / Google Play公開が必要な場合
### Google Play
- [ ] Google Play Console開設
- [ ] 本人確認
- [ ] 支払いプロファイル/銀行口座/税務情報
- [ ] アプリ署名キー管理
- [ ] プライバシーポリシーURL作成
- [ ] データセーフティ入力
- [ ] ストア説明文・スクリーンショット作成

### Apple App Store
- [ ] Apple Developer Program登録
- [ ] App Store Connect設定
- [ ] 銀行口座/税務情報
- [ ] プライバシーポリシーURL作成
- [ ] 審査対応

## 4. 決済・販売
アプリ外で売る場合。

- [ ] Gumroad / Stripe / BOOTH / note / Shopify等の比較
- [ ] 販売者情報・銀行口座登録
- [ ] 返金ポリシー作成
- [ ] 利用規約・プライバシーポリシー作成
- [ ] 消費税・所得税等は必要に応じて専門家確認

## 5. 法務・規約確認
- [ ] JFT-Basic / JLPT / BJT / 特定技能などの名称利用が誤認表示にならないか確認
- [ ] 公式機関と誤認されるロゴ・表現を使わない
- [ ] 合格保証表現を使わない
- [ ] 著作権教材をコピーしない
- [ ] 音声・画像素材の商用利用権を確認

## 6. 市場検証で人間側がやること
- [ ] Facebook/Telegram/WhatsApp等の対象コミュニティを探す
- [ ] 日本語学校・登録支援機関・送り出し機関のリストを作る
- [ ] 簡単な聞き取りメッセージを送る
- [ ] LPや無料サンプルへの反応を見る
- [ ] 可能なら外国人学習者1〜3人に実際に触ってもらう

## 7. 公開前チェック
- [ ] 価格表示が正しいか
- [ ] 返金/問い合わせ窓口があるか
- [ ] 著作権問題がないか
- [ ] スマホで表示確認
- [ ] 音声が再生できるか
- [ ] 進捗保存が壊れないか
- [ ] オフライン時の挙動確認
