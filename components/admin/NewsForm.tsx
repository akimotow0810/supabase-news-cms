'use client'

import type { News } from '@/types'

type Props = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Partial<News>
}

export default function NewsForm({ action, defaultValues }: Props) {
  return (
    <form action={action} style={{ maxWidth: 720 }}>
      {defaultValues?.thumbnail_url && (
        <input
          type="hidden"
          name="existing_thumbnail_url"
          value={defaultValues.thumbnail_url}
        />
      )}

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="title" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          タイトル <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultValues?.title}
          required
          style={{ display: 'block', width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="category" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          カテゴリ
        </label>
        <input
          id="category"
          name="category"
          type="text"
          defaultValue={defaultValues?.category ?? ''}
          placeholder="例：お知らせ、イベント、プレスリリース"
          style={{ display: 'block', width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="content" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          本文 <span style={{ color: 'red' }}>*</span>
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={defaultValues?.content}
          required
          rows={12}
          style={{ display: 'block', width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="thumbnail" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          サムネイル画像
        </label>
        {defaultValues?.thumbnail_url && (
          <div style={{ marginBottom: 8 }}>
            <img
              src={defaultValues.thumbnail_url}
              alt="現在のサムネイル"
              style={{ maxWidth: 200, display: 'block', marginBottom: 4 }}
            />
            <small style={{ color: '#6b7280' }}>新しい画像を選択すると上書きされます</small>
          </div>
        )}
        <input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input
            name="is_published"
            type="checkbox"
            value="true"
            defaultChecked={defaultValues?.is_published ?? false}
          />
          公開する
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit">保存する</button>
        <a href="/admin">キャンセル</a>
      </div>
    </form>
  )
}
