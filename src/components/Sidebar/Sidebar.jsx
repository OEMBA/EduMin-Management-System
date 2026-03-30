import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useInstitution } from '../../context/InstitutionContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

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

export function Sidebar({ isOpen = false, onClose, onTouchStart, onTouchEnd }) {
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useTheme()
  const { institution } = useInstitution()
  const { logout } = useAuth()
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false)
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

  function closeAccountModal() {
    setIsAccountModalOpen(false)
    setIsConfirmingLogout(false)
  }

  function onLogout() {
    logout()
    setIsAccountModalOpen(false)
    setIsConfirmingLogout(false)
    onClose?.()
    navigate('/auth', { replace: true })
  }

  return (
    <aside className={`sidebar${isOpen ? ' isMobileOpen' : ''}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
          <span className="themeMiniModeText">{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
          <button
            className={`themeMiniToggle${isDarkMode ? ' isDark' : ''}`}
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            aria-pressed={isDarkMode}
          >
            <span className="themeToggleTrack">
              <span className="themeToggleThumb" />
            </span>
          </button>
        </div>

        <div className="sidebarFooterDivider" aria-hidden="true" />

        <button
          className="sidebarAdminCard sidebarAdminTrigger"
          type="button"
          aria-label="Open account details"
          onClick={() => {
            setIsConfirmingLogout(false)
            setIsAccountModalOpen(true)
          }}
        >
          <div className="sidebarAdminAvatar" aria-hidden="true">
            {adminInitials}
          </div>
          <div className="sidebarAdminMeta">
            <div className="sidebarAdminName">{adminName}</div>
            <div className="sidebarAdminRole">Super Admin</div>
          </div>
        </button>
      </div>

      {isAccountModalOpen ? (
        <div
          className="sidebarAccountOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Account details"
          onClick={closeAccountModal}
        >
          <div className="sidebarAccountModal" onClick={(e) => e.stopPropagation()}>
            <div className="sidebarAccountHead">
              <div className="sidebarAccountTitle">Account Details</div>
              <button className="sidebarAccountClose" type="button" onClick={closeAccountModal} aria-label="Close account details">
                ×
              </button>
            </div>

            <div className="sidebarAccountLine">
              <span>Name</span>
              <strong>{institution?.adminName || 'Administrator'}</strong>
            </div>
            <div className="sidebarAccountLine">
              <span>Institution</span>
              <strong>{institution?.institutionName || 'Not set'}</strong>
            </div>
            <div className="sidebarAccountLine">
              <span>Address</span>
              <strong>{institution?.address || 'Not set'}</strong>
            </div>
            <div className="sidebarAccountLine">
              <span>Account Key</span>
              <strong>{institution?.accountKey || 'Not set'}</strong>
            </div>

            <div className="sidebarAccountActions">
              {isConfirmingLogout ? (
                <>
                  <div className="sidebarAccountWarn">Are you sure you want to logout?</div>
                  <div className="sidebarAccountActionButtons">
                    <button className="btnGhost" type="button" onClick={() => setIsConfirmingLogout(false)}>
                      Cancel
                    </button>
                    <button className="btnDanger" type="button" onClick={onLogout}>
                      Confirm Logout
                    </button>
                  </div>
                </>
              ) : (
                <button className="btnDanger" type="button" onClick={() => setIsConfirmingLogout(true)}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  )
}

