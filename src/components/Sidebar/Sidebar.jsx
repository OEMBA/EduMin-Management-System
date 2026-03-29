import { NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'

function linkClass({ isActive }) {
  return `sidebarLink${isActive ? ' isActive' : ''}`
}

export function Sidebar({ isOpen = false, onClose }) {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <aside className={`sidebar${isOpen ? ' isMobileOpen' : ''}`}>
      <div className="sidebarBrand">
        <div className="sidebarLogo">
          <img className="sidebarLogoIcon" src="/graduate-hat.svg" alt="Graduate hat" />
        </div>
        <div>
          <div className="sidebarName">EduMin</div>
          <div className="sidebarTag">Management System</div>
        </div>
        <button className="sidebarCloseBtn" type="button" onClick={onClose} aria-label="Close navigation menu">
          ×
        </button>
      </div>

      <nav className="sidebarNav" aria-label="Main navigation">
        <NavLink className={linkClass} to="/dashboard" onClick={onClose}>
          Dashboard
        </NavLink>
        <NavLink className={linkClass} to="/students/add" onClick={onClose}>
          Add Students
        </NavLink>

        <NavLink className={linkClass} to="/students/view" onClick={onClose}>
          View Students
        </NavLink>
      </nav>

      <div className="sidebarThemeWrap">
        <div className="sidebarThemeLabel">Theme</div>
        <button
          className={`themeToggle${isDarkMode ? ' isDark' : ''}`}
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          aria-pressed={isDarkMode}
        >
          <span className="themeToggleText">{isDarkMode ? 'Dark' : 'Light'}</span>
          <span className="themeToggleTrack">
            <span className="themeToggleThumb" />
          </span>
        </button>
      </div>
    </aside>
  )
}

