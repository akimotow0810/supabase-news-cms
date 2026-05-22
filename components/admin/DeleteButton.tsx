'use client'

import { deleteNews } from '@/app/admin/actions'

type Props = {
  id: string
  title: string
}

export default function DeleteButton({ id, title }: Props) {
  async function handleDelete() {
    if (!confirm(`「${title}」を削除しますか？`)) return
    await deleteNews(id)
  }

  return (
    <button
      onClick={handleDelete}
      style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      削除
    </button>
  )
}
