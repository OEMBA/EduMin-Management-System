import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar.jsx'
import { Header } from '../Header/Header.jsx'
import { SearchProvider } from '../../context/SearchContext.jsx'
import { ThemeProvider } from '../../context/ThemeContext.jsx'
import { NotificationsProvider } from '../../context/NotificationsContext.jsx'

export function AppLayout() {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isSidebarOpen) return

    function onKeyDown(event) {
      if (event.key === 'Escape') setIsSidebarOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  return (
    <ThemeProvider>
      <NotificationsProvider>
        <SearchProvider>
          <div className="appShell">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            {isSidebarOpen ? (
              <button
                className="sidebarBackdrop"
                type="button"
                aria-label="Close navigation"
                onClick={() => setIsSidebarOpen(false)}
              />
            ) : null}
            <div className="appMain">
              <Header onMenuClick={() => setIsSidebarOpen((open) => !open)} isSidebarOpen={isSidebarOpen} />
              <main className="appContent">
                <Outlet />
              </main>
            </div>
          </div>
        </SearchProvider>
      </NotificationsProvider>
    </ThemeProvider>
  )
}

