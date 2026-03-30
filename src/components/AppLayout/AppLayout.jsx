import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar.jsx'
import { Header } from '../Header/Header.jsx'
import { SearchProvider } from '../../context/SearchContext.jsx'
import { ThemeProvider } from '../../context/ThemeContext.jsx'
import { NotificationsProvider } from '../../context/NotificationsContext.jsx'

export function AppLayout() {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarTouchStartRef = useRef(null)

  function onSidebarTouchStart(event) {
    if (!isSidebarOpen || window.innerWidth > 900) return
    const touch = event.touches?.[0]
    if (!touch) return
    sidebarTouchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  function onSidebarTouchEnd(event) {
    const start = sidebarTouchStartRef.current
    sidebarTouchStartRef.current = null

    if (!start || !isSidebarOpen || window.innerWidth > 900) return
    const touch = event.changedTouches?.[0]
    if (!touch) return

    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    const mostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.2

    if (mostlyHorizontal && deltaX < -50) {
      setIsSidebarOpen(false)
    }
  }

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
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              onTouchStart={onSidebarTouchStart}
              onTouchEnd={onSidebarTouchEnd}
            />
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

