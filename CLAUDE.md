# CLAUDE.md — WebProgramming リポジトリガイド

このファイルは、リポジトリで作業するAIアシスタント向けのコンテキスト情報を提供します。

## リポジトリ概要

これは**学生向けWeb開発学習リポジトリ**です。AIM Commons大学施設のイベントマーケティングサイト（MAXイベント）の完成版と、反復的な課題・練習プロジェクトを含みます。すべてのコードはバニラHTML5/CSS3/JavaScriptで書かれており、ビルドツール・フレームワーク・パッケージマネージャは使用しません。

## ディレクトリ構成

```
WebProgramming/
├── final/          # 本番用イベントサイト（MAX）
├── wip/            # 作業中 / アクティブな開発バージョン
├── No2/ … No12/    # 番号付きコース課題（反復学習）
├── No2_pre/ …      # 一部課題のプレリリース版
└── CLAUDE.md       # このファイル
```

### 主要ディレクトリ

| パス | 用途 |
|------|------|
| `final/` | デプロイ可能な安定版 — 安定版として扱うこと |
| `wip/` | 開発サンドボックス — 自由に変更可 |
| `No*/` | 過去の課題 — 基本的に参照のみ（読み取り専用） |

## finalプロジェクトの構成（`final/`）

```
final/
├── index.html          # シングルページアプリのエントリーポイント（370行）
├── main.css            # グローバルレイアウト & デスクトップスタイル
├── sub.css             # モバイルブレークポイント（max-width: 800px）& オーバーレイ
├── main.js             # コアJS: フォント・ハンバーガーメニュー・オーバーレイ・Swiper
├── images/             # SVGロゴ、JPG/PNG写真、ファビコン
├── favicons/           # マルチフォーマットファビコン一式 + manifest.json
└── dist/
    ├── css/swiper.css  # Swiper.js v6.6.2 スタイル（ローカルバンドル）
    └── js/swiper.js    # Swiper.js v6.6.2 ライブラリ（ローカルバンドル）
```

### ページセクション（`index.html`の順序）

1. **ヘッダー** — デスクトップナビゲーションバー + モバイルハンバーガーメニュー（チェックボックストグル）
2. **トップビジュアル** — キービジュアル付きヒーロー画像
3. **セッション** — KeynoteとWorkshopカード（オーバーレイモーダル付き）
4. **ブース** — Swiper.js画像カルーセル（自動再生）
5. **AIM Commonsについて** — 施設説明
6. **フッター**

## 外部依存関係

npm/yarnは使用しません。すべての依存関係はCDN読み込みまたは`dist/`にバンドルされています。

| ライブラリ | バージョン | 読み込み方法 |
|-----------|-----------|------------|
| Swiper.js | 6.6.2 | `dist/js/swiper.js`にバンドル |
| Adobe Typekit | kitId `bgh3yko` | `https://use.typekit.net/`から動的スクリプト読み込み |
| Google Material Symbols | 最新版 | `<head>`内のCDNリンク |
| jQuery | 不明 | WIP/テストファイルのみ — **`final/`では未使用** |

**フォントファミリー**: `"din-2014"`、`"ryo-gothic-plusn"`、sans-serif（Typekit）

## JavaScriptの規約（`main.js`）

- バニラJSのみ（`final/`にjQueryは使用しない）
- Typekitは`try { Typekit.load({...}) } catch(e) {}`による動的`<script>`インジェクションで読み込み
- ハンバーガーメニュー: `uncheckCheckbox()`でチェックボックスの`checked`を`false`に設定
- オーバーレイシステム: `openOverlay(id)` / `closeOverlay(id)`でIDによる要素操作
- オーバーレイのコンテンツコンテナで`event.stopPropagation()`によるイベントバブリング停止
- Swiperは`autoplay: { delay: 5000 }`でDOMレディ後に初期化

## CSSの規約

- **モバイルブレークポイント**: `sub.css`内の`@media screen and (max-width: 800px)`
- デスクトップスタイルは`main.css`、モバイルオーバーライドは`sub.css`
- CSSカスタムプロパティ（変数）は使用しない — 値はハードコード
- 日本語コメントでセクションを区切る: 例）`/* ヘッダー */`、`/* メインコンテンツ */`
- レイアウトにはFlexboxとCSS Gridを使用
- `html { scroll-behavior: smooth; }`でスムーズスクロールを有効化

## HTMLの規約

- プロジェクトごとに`index.html`を1ファイル（マルチページルーティングなし）
- ナビゲーションアンカーは`#section-id`でページ内スクロール
- モーダルオーバーレイは非表示チェックボックス + labelのCSSトグルを使用（JSと併用）
- 画像パスは相対パス（例: `images/max_logo.svg`）
- 言語: 主に日本語（`lang="ja"`）

## 開発ワークフロー

**ビルドステップはありません**。ファイルを直接編集してブラウザで開きます。

```
# 典型的なワークフロー
1. wip/ で変更を加える（安全なサンドボックス）
2. ブラウザで wip/index.html を開いてテスト
3. 安定したら final/ にコピー
```

リンター・フォーマッター・プリコミットフックは設定されていません。

## テスト

自動テストフレームワークはありません。手動テストのみ:

- `wip/test.html` / `wip/test.js` — jQueryタブの非公式テスト
- `wip/modal.html` — モーダルコンポーネントの単体テスト
- 複数のビューポート幅（特に≤800px）でブラウザ確認

## Git設定

- リモート: 内部プロキシ `http://local_proxy@127.0.0.1:42477/git/meshiden-dot-jp/WebProgramming`
- デフォルトブランチ: `master`
- `.gitignore`なし — 全ファイルがトラッキング対象
- 変更内容を明確に説明した英語のコミットメッセージを使用

## 画像アセット

`final/images/`と`wip/images/`に格納:

- ロゴ: SVG形式（`max_logo.svg`、`aim_logo.svg`）
- 写真: JPG/PNG、一部非常に大きい（各2〜5 MB）— 許可なく圧縮しないこと
- エリアマップ: `area_map.svg`（45.9 KB）
- ファビコン: `final/favicons/`内に複数サイズ

## 避けるべきこと

- 明示的に要求されない限り、npm・webpack・ビルドツールチェーンを導入しない
- `final/`にjQueryを追加しない — バニラJSのみを使用
- 特別に依頼されない限り、`No*/`ディレクトリのファイルを変更しない
- 画像ファイルを削除しない — 間接的に参照されている可能性がある
- カルーセルをテストせずにSwiper.jsをアップグレードしない — v6とv7以降でAPIが大幅に変更された
- 一度しか使用しない値にCSSカスタムプロパティを追加しない

## よくある作業

**イベントページに新しいセクションを追加する**
1. `final/index.html`の既存セクション間にHTMLを追加
2. `<header>`のナビリストにナビアンカーを追加
3. `main.css`でデスクトップレイアウトをスタイリング
4. `sub.css`の既存`@media`ブロック内にモバイルオーバーライドを追加

**新しいオーバーレイ/モーダルを追加する**
1. HTMLに`<div id="overlay-NAME">`を追加
2. 開くトリガー（`openOverlay('overlay-NAME')`を呼び出すボタン/リンク）を追加
3. `closeOverlay('overlay-NAME')`を呼び出す閉じるボタンを追加
4. `sub.css`の既存`.overlay`ルールに合わせてスタイリング

**Swiperカルーセルを変更する**
- 設定は`main.js`内の`new Swiper(...)`呼び出しにある
- CSSは`dist/css/swiper.css`（ライブラリファイルのため編集しないこと）
- カスタムカルーセルスタイルは`main.css`または`sub.css`に記述
