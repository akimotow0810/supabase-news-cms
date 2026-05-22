# Supabase お知らせCMSテンプレート

お知らせ機能を持つ Web サイトに使い回せるテンプレートです。
HTML + JS のみで構成しているため、Vercel・レンタルサーバー・GitHub Pages どこにでも置けます。

## 技術スタック

| 項目 | 内容 |
|------|------|
| フロントエンド | HTML + JavaScript |
| BaaS | Supabase（Auth / DB / Storage） |
| ホスティング | Vercel・レンタルサーバー・GitHub Pages どこでもOK |

## ディレクトリ構成

```
├── admin/
│   ├── login.html       # ログイン画面
│   ├── index.html       # お知らせ一覧
│   ├── new.html         # 新規作成
│   └── edit.html        # 編集（?id=xxx で記事を特定）
├── js/
│   ├── supabase-config.js  # ★ Supabase 接続設定（ここだけ変更）
│   └── auth.js             # ログインチェック・ログアウト共通処理
├── news.html            # 公開サイト向けお知らせ一覧（実装例）
└── supabase/
    └── migrations/
        └── 001_create_news_table.sql
```

## セットアップ手順

### 1. Supabase でプロジェクト作成

1. [supabase.com](https://supabase.com) でプロジェクト作成
2. SQL Editor で `supabase/migrations/001_create_news_table.sql` を実行
3. Authentication → Users から管理者アカウントを手動作成

### 2. 接続情報を設定

`js/supabase-config.js` の2行を書き換える（Supabase ダッシュボードの Settings → API から確認）

```js
const SUPABASE_URL      = 'https://xxxxxxxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### 3. デプロイ

- **Vercel**: リポジトリを連携してデプロイ
- **レンタルサーバー**: FTP でそのままアップロード
- **GitHub Pages**: リポジトリを公開設定にするだけ

---

## テーブル定義

### `news` テーブル

| カラム | 型 | 説明 |
|--------|----|------|
| `id` | UUID | 主キー（自動生成） |
| `title` | TEXT | タイトル（必須） |
| `content` | TEXT | 本文（必須） |
| `category` | TEXT | カテゴリ（任意） |
| `thumbnail_url` | TEXT | サムネイル画像 URL（任意） |
| `is_published` | BOOLEAN | 公開フラグ |
| `published_at` | TIMESTAMPTZ | 初回公開日時 |
| `created_at` | TIMESTAMPTZ | 作成日時（自動） |
| `updated_at` | TIMESTAMPTZ | 更新日時（自動） |

---

## 公開サイトへの組み込み方

`news.html` をコピーして `js/supabase-config.js` を読み込めば動きます。
`renderNews()` 関数の中のHTMLを編集するだけでデザインを変えられます。

```js
function renderNews(newsList) {
  // ここを各プロジェクトのデザインに合わせて変更する
}
```
