export type News = {
  id: string
  title: string
  content: string
  category: string | null
  thumbnail_url: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export type NewsInsert = Omit<News, 'id' | 'created_at' | 'updated_at'>
export type NewsUpdate = Partial<NewsInsert>
