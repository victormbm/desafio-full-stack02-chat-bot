const navItems = [
  { id: 'chatbot', label: 'Chatbot', short: 'CH' },
  { id: 'dashboard', label: 'Dashboard', short: 'DB' },
]

function Sidebar({ activePage, isOpen, onNavigate, onClose }) {
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button type="button" className="sidebar-close" aria-label="Fechar menu" onClick={onClose}>
          ×
        </button>

        <div className="brand">
          <span className="brand-mark">A</span>
          <span>Atende</span>
        </div>

        <p className="nav-label">Workspace</p>
        <nav className="nav-list" aria-label="Navegação principal">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              aria-current={activePage === item.id ? 'page' : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon" aria-hidden="true">{item.short}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <span className="user-avatar">VS</span>
            <div className="user-info">
              <strong>Victor Meireles Bandeira de Mello</strong>
              <span>Administrador</span>
            </div>
          </div>
        </div>
      </aside>

      <button
        type="button"
        className={`sidebar-backdrop ${isOpen ? 'visible' : ''}`}
        aria-label="Fechar menu"
        onClick={onClose}
      />
    </>
  )
}

export default Sidebar
