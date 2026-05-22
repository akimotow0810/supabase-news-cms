'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { NewsInsert, NewsUpdate } from '@/types'

async function uploadThumbnail(file: File): Promise<string> {
  const supabase = await createClient()
  const ext = file.name.split('.').pop()
  const path = `${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from('news-images')
    .upload(path, file)

  if (error) throw new Error('画像のアップロードに失敗しました')

  const { data: { publicUrl } } = supabase.storage
    .from('news-images')
    .getPublicUrl(data.path)

  return publicUrl
}

export async function createNews(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = (formData.get('category') as string) || null
  const is_published = formData.get('is_published') === 'true'
  const imageFile = formData.get('thumbnail') as File | null

  let thumbnail_url: string | null = null
  if (imageFile && imageFile.size > 0) {
    thumbnail_url = await uploadThumbnail(imageFile)
  }

  const data: NewsInsert = {
    title,
    content,
    category,
    thumbnail_url,
    is_published,
    published_at: is_published ? new Date().toISOString() : null,
  }

  const { error } = await supabase.from('news').insert(data)
  if (error) throw new Error('お知らせの作成に失敗しました')

  revalidatePath('/admin')
  redirect('/admin')
}

export async function updateNews(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = (formData.get('category') as string) || null
  const is_published = formData.get('is_published') === 'true'
  const imageFile = formData.get('thumbnail') as File | null
  const existingThumbnailUrl = (formData.get('existing_thumbnail_url') as string) || null

  let thumbnail_url: string | null = existingThumbnailUrl
  if (imageFile && imageFile.size > 0) {
    thumbnail_url = await uploadThumbnail(imageFile)
  }

  // 初回公開時のみ published_at をセット
  const { data: existing } = await supabase
    .from('news')
    .select('is_published, published_at')
    .eq('id', id)
    .single()

  const updates: NewsUpdate = {
    title,
    content,
    category,
    thumbnail_url,
    is_published,
    published_at:
      is_published && !existing?.is_published
        ? new Date().toISOString()
        : existing?.published_at ?? null,
  }

  const { error } = await supabase.from('news').update(updates).eq('id', id)
  if (error) throw new Error('お知らせの更新に失敗しました')

  revalidatePath('/admin')
  redirect('/admin')
}

export async function deleteNews(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('news').delete().eq('id', id)
  if (error) throw new Error('お知らせの削除に失敗しました')
  revalidatePath('/admin')
}
