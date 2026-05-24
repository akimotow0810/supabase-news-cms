-- ============================================================
-- フォト テーブル
-- ============================================================

CREATE TABLE IF NOT EXISTS photos (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT,
  description  TEXT,
  image_url    TEXT        NOT NULL,
  sort_order   INTEGER     DEFAULT 0,
  is_published BOOLEAN     DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- updated_at 自動更新トリガー
CREATE TRIGGER photos_updated_at
  BEFORE UPDATE ON photos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS 有効化
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- 公開中のみ誰でも読める
CREATE POLICY "public can read published photos"
  ON photos FOR SELECT
  USING (is_published = true);

-- 認証済みユーザーはすべて操作可能
CREATE POLICY "authenticated full access"
  ON photos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- Storage バケット（Supabase ダッシュボードで作成してもOK）
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT DO NOTHING;

-- バケットの RLS
CREATE POLICY "public read photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'photos');

CREATE POLICY "authenticated upload photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'photos');

CREATE POLICY "authenticated delete photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'photos');
