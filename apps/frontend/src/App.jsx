import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatbotPage from './pages/ChatbotPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('chatbot')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function navigateTo(page) {
    setActivePage(page)
    setIsMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        isOpen={isMenuOpen}
        onNavigate={navigateTo}
        onClose={() => setIsMenuOpen(false)}
      />

      <main className="main-content">
        <header className="mobile-header">
          <button
            type="button"
            className="menu-button"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="mobile-brand">
            <span className="brand-mark">A</span>
            <span>Atende</span>
          </div>
          <span className="mobile-spacer" aria-hidden="true" />
        </header>

        <div style={{ display: activePage === 'chatbot' ? 'contents' : 'none' }}>
          <ChatbotPage />
        </div>
        <div style={{ display: activePage === 'dashboard' ? 'contents' : 'none' }}>
          <DashboardPage isActive={activePage === 'dashboard'} />
        </div>
      </main>
    </div>
  )
}

export default App
