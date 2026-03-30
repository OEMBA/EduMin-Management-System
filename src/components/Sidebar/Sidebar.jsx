import { NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useInstitution } from '../../context/InstitutionContext.jsx'

function linkClass({ isActive }) {
  return `sidebarLink${isActive ? ' isActive' : ''}`
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function AddStudentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M15 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6" />
      <path d="M16 11h6" />
    </svg>
  )
}

function ViewStudentsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M16 21v-1a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v1" />
      <circle cx="8.5" cy="7" r="4" />
      <circle cx="18" cy="8" r="3" />
      <path d="M22 21v-1a4 4 0 0 0-3-3.87" />
    </svg>
  )
}

export function Sidebar({ isOpen = false, onClose }) {
  const { isDarkMode, toggleTheme } = useTheme()
  const { institution } = useInstitution()
  const adminName = institution?.adminName || 'Admin User'
  const adminInitials =
    adminName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((chunk) => chunk[0])
      .join('')
      .toUpperCase() || 'AU'

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

      <div className="sidebarDivider" aria-hidden="true" />

      <nav className="sidebarNav" aria-label="Main navigation">
        <NavLink className={linkClass} to="/dashboard" onClick={onClose}>
          <span className="sidebarLinkIcon">
            <DashboardIcon />
          </span>
          Dashboard
        </NavLink>
        <NavLink className={linkClass} to="/students/add" onClick={onClose}>
          <span className="sidebarLinkIcon">
            <AddStudentIcon />
          </span>
          Add Students
        </NavLink>

        <NavLink className={linkClass} to="/students/view" onClick={onClose}>
          <span className="sidebarLinkIcon">
            <ViewStudentsIcon />
          </span>
          View Students
        </NavLink>
      </nav>

      <div className="sidebarFooter">
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

        <div className="sidebarAdminCard" aria-label="Admin account">
          <div className="sidebarAdminAvatar" aria-hidden="true">
            {adminInitials}
          </div>
          <div className="sidebarAdminMeta">
            <div className="sidebarAdminName">{adminName}</div>
            <div className="sidebarAdminRole">Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

