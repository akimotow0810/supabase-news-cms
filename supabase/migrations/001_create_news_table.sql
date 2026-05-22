-- ============================================================
-- お知らせ (news) テーブル
-- ============================================================

CREATE TABLE IF NOT EXISTS public.news (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  content       TEXT        NOT NULL,
  category      TEXT,
  thumbnail_url TEXT,
  is_published  BOOLEAN     NOT NULL DEFAULT false,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- updated_at 自動更新
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- 公開済み記事は誰でも読める
CREATE POLICY "public_read_published"
  ON public.news FOR SELECT
  USING (is_published = true);

-- 認証済みユーザー（管理者）は全操作可能
CREATE POLICY "admin_full_access"
  ON public.news FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- Storage（サムネイル画像用）
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "public_read_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'news-images');

CREATE POLICY "admin_upload_images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'news-images');

CREATE POLICY "admin_delete_images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'news-images');
