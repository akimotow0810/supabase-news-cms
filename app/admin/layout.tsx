import LogoutButton from '@/components/admin/LogoutButton'

// 認証チェックは middleware.ts が担当。このレイアウトは /admin/login を除く全ページに適用される。
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong>管理画面</strong>
        <LogoutButton />
      </header>
      <main style={{ padding: '32px 24px' }}>{children}</main>
    </div>
  )
}
