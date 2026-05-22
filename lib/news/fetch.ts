/**
 * 公開サイト向けお知らせ取得ユーティリティ
 *
 * 使い方:
 *   import { getPublishedNews, getNewsById } from '@/lib/news/fetch'
 *
 * Server Component 内で await して使う。
 * デザインは各プロジェクトの page.tsx 側で自由に実装する。
 */

import { createClient } from '@/lib/supabase/server'
import type { News } from '@/types'

/** 公開済みお知らせ一覧を取得 */
export async function getPublishedNews(options?: {
  limit?: number
  category?: string
}): Promise<News[]> {
  const supabase = await createClient()

  let query = supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (options?.category) query = query.eq('category', options.category)
  if (options?.limit) query = query.limit(options.limit)

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

/** IDでお知らせ1件を取得（非公開は返さない） */
export async function getNewsById(id: string): Promise<News | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error) return null
  return data
}

/** 公開済みお知らせのカテゴリ一覧を取得 */
export async function getNewsCategories(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select('category')
    .eq('is_published', true)
    .not('category', 'is', null)

  if (error) return []

  const unique = [...new Set(data.map((item) => item.category).filter(Boolean))]
  return unique as string[]
}
