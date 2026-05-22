import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateNews } from '@/app/admin/actions'
import NewsForm from '@/components/admin/NewsForm'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !news) notFound()

  return (
    <div>
      <h1>お知らせ編集</h1>
      <NewsForm action={updateNews.bind(null, news.id)} defaultValues={news} />
    </div>
  )
}
