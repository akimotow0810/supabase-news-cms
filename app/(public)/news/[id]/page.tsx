/**
 * 【実装例】お知らせ詳細ページ
 *
 * デザインは各プロジェクトに合わせて自由に変更してください。
 */

import { notFound } from 'next/navigation'
import { getNewsById, getPublishedNews } from '@/lib/news/fetch'

type Props = {
  params: Promise<{ id: string }>
}

// 静的生成する場合は generateStaticParams を有効化
// export async function generateStaticParams() {
//   const newsList = await getPublishedNews()
//   return newsList.map((news) => ({ id: news.id }))
// }

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params
  const news = await getNewsById(id)

  if (!news) notFound()

  return (
    <article>
      {news.thumbnail_url && (
        <img src={news.thumbnail_url} alt={news.title} style={{ maxWidth: '100%' }} />
      )}
      <header>
        {news.published_at && (
          <time style={{ color: '#6b7280', fontSize: 14 }}>
            {new Date(news.published_at).toLocaleDateString('ja-JP')}
          </time>
        )}
        {news.category && <span> / {news.category}</span>}
        <h1>{news.title}</h1>
      </header>
      {/* 本文を HTML として描画する場合は dangerouslySetInnerHTML を使用 */}
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{news.content}</div>
    </article>
  )
}
