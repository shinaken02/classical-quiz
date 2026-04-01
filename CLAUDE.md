# プロジェクト デザインガイドライン

リベシティ公式サイト (https://site.libecity.com/) を参考にしたデザイン仕様書

---

## フォント

```css
/* メインフォント */
font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
  "Hiragino Sans", Meiryo, sans-serif;

/* 代替・補助フォント */
font-family: Lato, "游ゴシック体", "Yu Gothic", "ヒラギノ角ゴシック Pro",
  "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, sans-serif;
```

---

## カラーパレット

### プライマリカラー

| 用途             | カラーコード | 説明               |
| ---------------- | ------------ | ------------------ |
| メインカラー     | `#384860`    | 紺青系（信頼感）   |
| アクセントカラー | `#de1b65`    | 鮮やかなピンク     |

### セカンダリカラー

| 用途       | カラーコード | 説明           |
| ---------- | ------------ | -------------- |
| グリーン   | `#478e21`    | リンク・成功系 |
| オレンジ   | `#ffa30d`    | 注目・警告系   |
| レッド     | `#ff6060`    | 強調・エラー系 |
| パープル   | `#7a329e`    | 装飾・カテゴリ |

### 背景色

| 用途             | カラーコード | 説明           |
| ---------------- | ------------ | -------------- |
| ページ背景       | `#fffcf2`    | 温かみのある白 |
| コンテンツ背景   | `#ffffff`    | 純白           |
| セクション背景   | `#f7f7f7`    | ライトグレー   |
| カード背景       | `#F2F5F8`    | ブルーグレー   |

### テキスト色

| 用途         | カラーコード |
| ------------ | ------------ |
| 本文テキスト | `#333333`    |
| 見出し       | `#384860`    |
| リンク       | `#478e21`    |

---

## デザイントークン

### 角丸 (border-radius)

```css
--radius-sm: 4px;    /* 小さい要素 */
--radius-md: 8px;    /* カード・入力欄 */
--radius-lg: 16px;   /* セクション・モーダル */
--radius-pill: 80px; /* ボタン（ピル型） */
```

### シャドウ (box-shadow)

```css
/* カード・浮遊要素 */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 4px 4px -4px rgba(0, 0, 0, 0.1);
```

### グラデーション

```css
/* テキストマーカー（蛍光ペン風） */
background: linear-gradient(transparent 64%, #ffa30d 0%);

/* ピンクマーカー */
background: linear-gradient(transparent 64%, #de1b65 0%);
```

### トランジション

```css
transition: all 0.25s ease;  /* 標準 */
transition: all 0.4s ease;   /* ゆっくり */
```

### ホバーエフェクト

```css
/* リンク・ボタンのホバー */
opacity: 0.7;  /* ~ 0.8 */
```

---

## レイアウト

### グリッドシステム

```css
/* カードグリッド */
display: grid;
grid-gap: 20px;

/* PC: 3列 / タブレット: 2列 / モバイル: 1列 */
grid-template-columns: repeat(3, 1fr);
```

### レスポンシブブレークポイント

```css
/* モバイル */
@media (max-width: 599px) { }

/* タブレット */
@media (min-width: 600px) and (max-width: 1199px) { }

/* デスクトップ */
@media (min-width: 1200px) { }
```

### 余白（スペーシング）

```css
/* セクション間 */
margin-bottom: 50px;  /* モバイル */
margin-bottom: 100px; /* デスクトップ */

/* 要素内パディング */
padding: 16px;  /* コンパクト */
padding: 32px;  /* ゆったり */

/* コンテンツ下部 */
padding-bottom: 6em;
```

---

## サイト構成

```
├── ヘッダー
│   ├── インフォバー（ニュースティッカー）
│   ├── ロゴ
│   ├── グローバルナビゲーション（多階層対応）
│   └── CTAボタン（ログイン / 参加）
│
├── ヒーローセクション
│   └── スライダー（画像 + テキスト + CTA）
│
├── メインコンテンツ
│   ├── メインカラム
│   │   ├── セクション（カード型レイアウト）
│   │   ├── 記事リスト（3列グリッド）
│   │   └── CTA セクション
│   └── サイドバー
│       ├── プロフィール
│       ├── カテゴリ一覧
│       └── 人気記事
│
└── フッター
    ├── ウィジェットエリア（複数カラム）
    ├── ナビゲーションリンク
    └── コピーライト
```

---

## ボタンスタイル

```css
/* プライマリボタン */
.btn-primary {
  background-color: #de1b65;
  color: #ffffff;
  border-radius: 80px;
  padding: 12px 32px;
  font-weight: bold;
  transition: opacity 0.25s ease;
}
.btn-primary:hover {
  opacity: 0.8;
}

/* セカンダリボタン */
.btn-secondary {
  background-color: #384860;
  color: #ffffff;
  border-radius: 80px;
  padding: 12px 32px;
  font-weight: bold;
  transition: opacity 0.25s ease;
}

/* グリーンボタン（CTA） */
.btn-cta {
  background-color: #478e21;
  color: #ffffff;
  border-radius: 80px;
  padding: 16px 40px;
  font-weight: bold;
}
```

---

## デザイン方針

- **温かみと信頼感**: 温白の背景(`#fffcf2`)と紺青(`#384860`)で落ち着いた印象
- **視認性の高いCTA**: ピンク(`#de1b65`)のピル型ボタンで行動を促す
- **カード型UI**: シャドウと角丸で情報をグルーピングし、視覚的に整理
- **ゆとりのある余白**: セクション間に十分なスペースを確保し、読みやすさを重視
- **レスポンシブ対応**: 3段階のブレークポイントで全デバイスに最適化
- **控えめなアニメーション**: 0.25s〜0.4sのトランジションで自然な操作感
