import { Outlet } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar.jsx'
import { Header } from '../Header/Header.jsx'
import { SearchProvider } from '../../context/SearchContext.jsx'
import { ThemeProvider } from '../../context/ThemeContext.jsx'
import { NotificationsProvider } from '../../context/NotificationsContext.jsx'

export function AppLayout() {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <SearchProvider>
          <div className="appShell">
            <Sidebar />
            <div className="appMain">
              <Header />
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

