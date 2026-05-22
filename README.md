# Supabase × Next.js お知らせCMSテンプレート

お知らせ機能を持つ Web サイトに使い回せるテンプレートです。  
管理画面（ログイン・一覧・投稿・編集・削除）と、公開サイト向けのデータ取得ユーティリティがセットになっています。

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript |
| BaaS | Supabase (Auth / DB / Storage) |

## ディレクトリ構成

```
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # 管理画面レイアウト（認証チェック込み）
│   │   ├── page.tsx            # お知らせ一覧
│   │   ├── actions.ts          # Server Actions（CRUD）
│   │   ├── login/page.tsx      # ログイン画面
│   │   └── news/
│   │       ├── new/page.tsx    # 新規作成
│   │       └── [id]/edit/page.tsx  # 編集
│   └── (public)/news/
│       ├── page.tsx            # 公開一覧ページ（実装例）
│       └── [id]/page.tsx       # 公開詳細ページ（実装例）
├── components/admin/
│   ├── NewsForm.tsx            # 投稿・編集フォーム
│   └── LogoutButton.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # ブラウザ用クライアント
│   │   └── server.ts           # サーバー用クライアント
│   └── news/
│       └── fetch.ts            # ★ 公開サイト向けデータ取得ユーティリティ
├── types/index.ts              # News 型定義
├── middleware.ts               # /admin/* のルート保護
└── supabase/migrations/
    └── 001_create_news_table.sql
```

## セットアップ手順

### 1. Next.js プロジェクトを作成

```bash
npx create-next-app@latest my-project --typescript --app
cd my-project
```

### 2. 依存パッケージをインストール

```bash
npm install @supabase/ssr @supabase/supabase-js
```

### 3. テンプレートファイルをコピー

このテンプレートの各ファイルをプロジェクトにコピーします。

### 4. Supabase でプロジェクトを作成

1. [supabase.com](https://supabase.com) でプロジェクト作成
2. SQL Editor で `supabase/migrations/001_create_news_table.sql` を実行
3. Authentication → Providers → Email でメール認証を有効化
4. Authentication → Users から管理者アカウントを手動作成

### 5. 環境変数を設定

```bash
cp .env.local.example .env.local
```

`.env.local` に Supabase の URL と ANON_KEY を入力します（Supabase ダッシュボードの Settings → API から確認）。

### 6. 動作確認

```bash
npm run dev
```

- 管理画面: `http://localhost:3000/admin/login`
- 公開一覧: `http://localhost:3000/news`（実装例）

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

`lib/news/fetch.ts` の関数を Server Component 内で呼び出すだけです。

```tsx
// app/news/page.tsx（例）
import { getPublishedNews } from '@/lib/news/fetch'

export default async function NewsPage() {
  const newsList = await getPublishedNews({ limit: 10 })
  // あとはデザインに合わせて自由にマークアップ
}
```

### 使えるユーティリティ関数

| 関数 | 説明 |
|------|------|
| `getPublishedNews(options?)` | 公開済み一覧。`limit` や `category` で絞り込み可 |
| `getNewsById(id)` | ID で1件取得（非公開は `null` を返す） |
| `getNewsCategories()` | 公開済み記事のカテゴリ一覧 |

---

## カスタマイズのポイント

- **カテゴリをプルダウンにしたい** → `NewsForm.tsx` の category フィールドを `<select>` に変更
- **本文をリッチテキストにしたい** → `content` カラムに HTML を保存し、詳細ページで `dangerouslySetInnerHTML` で描画
- **複数管理者に対応したい** → Supabase の Role や `admin_users` テーブルを追加して RLS を拡張
- **OGP を設定したい** → 詳細ページに `export const metadata` または `generateMetadata` を追加
