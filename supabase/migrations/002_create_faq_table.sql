-- ============================================================
-- FAQ テーブル
-- ============================================================

CREATE TABLE IF NOT EXISTS faq (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  question     TEXT        NOT NULL,
  answer       TEXT        NOT NULL,
  category     TEXT,
  sort_order   INTEGER     DEFAULT 0,
  is_published BOOLEAN     DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- updated_at 自動更新トリガー（001 で関数作成済みの場合は不要）
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER faq_updated_at
  BEFORE UPDATE ON faq
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS 有効化
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- 公開中のみ誰でも読める
CREATE POLICY "public can read published faq"
  ON faq FOR SELECT
  USING (is_published = true);

-- 認証済みユーザーはすべて操作可能
CREATE POLICY "authenticated full access"
  ON faq FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
