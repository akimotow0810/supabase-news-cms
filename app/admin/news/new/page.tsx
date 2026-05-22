import { createNews } from '@/app/admin/actions'
import NewsForm from '@/components/admin/NewsForm'

export default function NewNewsPage() {
  return (
    <div>
      <h1>お知らせ新規作成</h1>
      <NewsForm action={createNews} />
    </div>
  )
}
