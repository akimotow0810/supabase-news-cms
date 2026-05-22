import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteButton from '@/components/admin/DeleteButton'
import type { News } from '@/types'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: newsList, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>お知らせ管理</h1>
        <Link href="/admin/news/new">＋ 新規作成</Link>
      </div>

      {!newsList || newsList.length === 0 ? (
        <p style={{ color: '#6b7280' }}>お知らせはまだありません</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>タイトル</th>
              <th style={{ padding: '8px 12px' }}>カテゴリ</th>
              <th style={{ padding: '8px 12px' }}>公開状態</th>
              <th style={{ padding: '8px 12px' }}>公開日</th>
              <th style={{ padding: '8px 12px' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news: News) => (
              <tr key={news.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '10px 12px' }}>{news.title}</td>
                <td style={{ padding: '10px 12px', color: '#6b7280' }}>
                  {news.category ?? '–'}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      background: news.is_published ? '#d1fae5' : '#f3f4f6',
                      color: news.is_published ? '#065f46' : '#374151',
                    }}
                  >
                    {news.is_published ? '公開中' : '非公開'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px', color: '#6b7280', fontSize: 14 }}>
                  {news.published_at
                    ? new Date(news.published_at).toLocaleDateString('ja-JP')
                    : '–'}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <Link href={`/admin/news/${news.id}/edit`} style={{ marginRight: 12 }}>
                    編集
                  </Link>
                  <DeleteButton id={news.id} title={news.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
