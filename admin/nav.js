// ============================================================
// 管理画面 共通サイドバー
// 使わないセクションは行ごとコメントアウトするだけでOK
// ============================================================

const NAV_ITEMS = [
  {
    key: 'news',
    label: 'お知らせ',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  },
  {
    key: 'faq',
    label: 'FAQ',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
  {
    key: 'photos',
    label: 'フォト',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  },
  // ---- 以下、案件で不要なものはコメントアウト ----
  // {
  //   key: 'recruit',
  //   label: '採用情報',
  //   icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  // },
  // {
  //   key: 'staff',
  //   label: 'スタッフ紹介',
  //   icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  // },
]

;(function renderNav() {
  const path = window.location.pathname

  const itemsHTML = NAV_ITEMS.map(item => {
    const isActive = path.includes(`/${item.key}/`)
    return `
      <li>
        <a href="../${item.key}/" class="sidebar-nav-item ${isActive ? 'active' : ''}">
          ${item.icon}
          <span>${item.label}</span>
        </a>
      </li>`
  }).join('')

  const el = document.getElementById('sidebar')
  el.className = 'sidebar'
  el.innerHTML = `
    <div class="sidebar-logo">
      <div class="sidebar-logo-mark">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>
      </div>
      管理画面
    </div>
    <ul class="sidebar-nav">
      ${itemsHTML}
    </ul>
    <div class="sidebar-footer">
      <button onclick="logout()" class="sidebar-nav-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>ログアウト</span>
      </button>
    </div>`
})()
