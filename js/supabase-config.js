// ============================================================
// Supabase 設定（プロジェクトごとに変更する2行のみ）
// ============================================================
const SUPABASE_URL      = 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

// ---- ここから下は変更不要 ----
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
