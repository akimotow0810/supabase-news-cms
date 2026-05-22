// ============================================================
// 管理画面共通：ログインチェック・ログアウト
// 各管理ページの先頭で requireAuth() を呼ぶ
// ============================================================

async function requireAuth() {
  const { data: { session } } = await db.auth.getSession()
  if (!session) {
    window.location.href = '/admin/login.html'
    return null
  }
  return session
}

async function logout() {
  await db.auth.signOut()
  window.location.href = '/admin/login.html'
}
