/**
 * 【実装例】お知らせ一覧ページ
 *
 * このファイルはテンプレートの使い方を示すサンプルです。
 * デザイン・マークアップは各プロジェクトに合わせて自由に変更してください。
 * データ取得のロジック（getPublishedNews）はそのまま流用できます。
 */

import { getPublishedNews } from '@/lib/news/fetch'

export default async function NewsListPage() {
  const newsList = await getPublishedNews()
  // カテゴリ絞り込み例: await getPublishedNews({ category: 'お知らせ' })
  // 件数制限例:          await getPublishedNews({ limit: 5 })

  return (
    <div>
      <h1>お知らせ</h1>
      {newsList.length === 0 ? (
        <p>お知らせはありません</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {newsList.map((news) => (
            <li key={news.id} style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 0' }}>
              <a href={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  {news.published_at && (
                    <time style={{ color: '#6b7280', fontSize: 14 }}>
                      {new Date(news.published_at).toLocaleDateString('ja-JP')}
                    </time>
                  )}
                  {news.category && (
                    <span style={{ fontSize: 12, padding: '2px 8px', background: '#f3f4f6', borderRadius: 4 }}>
                      {news.category}
                    </span>
                  )}
                  <span>{news.title}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
