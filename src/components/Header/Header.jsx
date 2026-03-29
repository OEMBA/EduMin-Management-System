import { useGlobalSearch } from '../../context/SearchContext.jsx'
import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useNotifications } from '../../context/NotificationsContext.jsx'
import { useInstitution } from '../../context/InstitutionContext.jsx'

function formatDateTime(dateValue) {
  const value = new Date(dateValue)
  if (Number.isNaN(value.getTime())) return 'Unknown time'
  return value.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function Header({ onMenuClick, isSidebarOpen = false }) {
  const location = useLocation()
  const { query, setQuery } = useGlobalSearch()
  const isAddStudentsPage = location.pathname === '/students/add'
  const { notifications, unreadCount, markAllRead, syncEventReminders } = useNotifications()
  const { institution } = useInstitution()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const notificationsRef = useRef(null)
  const profileRef = useRef(null)

  const profileTitle = institution.institutionName || 'Institution not set'
  const profileAddress = institution.address || 'Address not provided'
  const adminName = institution.adminName || 'Admin not set'

  useEffect(() => {
    if (!isNotificationsOpen) return

    function onDocumentClick(event) {
      if (!notificationsRef.current?.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', onDocumentClick)
    return () => document.removeEventListener('mousedown', onDocumentClick)
  }, [isNotificationsOpen])

  useEffect(() => {
    if (!isProfileOpen) return

    function onDocumentClick(event) {
      if (!profileRef.current?.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', onDocumentClick)
    return () => document.removeEventListener('mousedown', onDocumentClick)
  }, [isProfileOpen])

  function toggleNotifications() {
    const nextState = !isNotificationsOpen
    setIsNotificationsOpen(nextState)
    if (nextState) setIsProfileOpen(false)

    if (nextState) {
      syncEventReminders()
      markAllRead()
    }
  }

  function toggleProfile() {
    const nextState = !isProfileOpen
    setIsProfileOpen(nextState)
    if (nextState) setIsNotificationsOpen(false)
  }

  return (
    <header className={`header${isAddStudentsPage ? ' headerNoSearch' : ''}`}>
      <div className="headerStart">
        <button
          className="headerMenuBtn"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isSidebarOpen}
          onClick={onMenuClick}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 6h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {!isAddStudentsPage ? (
          <div className="headerSearch">
            <input
              className="headerSearchInput"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students, classes, or reports..."
              aria-label="Search"
            />
          </div>
        ) : null}
      </div>

      <div className="headerRight">
        <div className="headerBellWrap" ref={notificationsRef}>
          <button
            className="headerBellBtn"
            type="button"
            aria-label="Notifications"
            aria-expanded={isNotificationsOpen}
            onClick={toggleNotifications}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M12 3a6 6 0 0 0-6 6v3.58c0 .8-.3 1.56-.86 2.13L4 16h16l-1.14-1.29A3 3 0 0 1 18 12.58V9a6 6 0 0 0-6-6Zm0 18a3 3 0 0 0 2.83-2h-5.66A3 3 0 0 0 12 21Z"
                fill="currentColor"
              />
            </svg>
            {unreadCount > 0 ? <span className="headerBellBadge">{unreadCount > 99 ? '99+' : unreadCount}</span> : null}
          </button>

          {isNotificationsOpen ? (
            <div className="headerNotifDropdown" role="menu" aria-label="Notifications list">
              <div className="headerNotifHeader">
                <div className="headerNotifTitle">Notifications</div>
                <div className="headerNotifCount">{notifications.length}</div>
              </div>

              {notifications.length === 0 ? (
                <div className="headerNotifEmpty">No notifications yet.</div>
              ) : (
                <div className="headerNotifList">
                  {notifications.slice(0, 25).map((item) => (
                    <div className={`headerNotifItem${item.read ? '' : ' isUnread'}`} key={item.id}>
                      <div className="headerNotifItemTitle">{item.title}</div>
                      <div className="headerNotifItemMsg">{item.message}</div>
                      {item.details ? <div className="headerNotifItemDetails">{item.details}</div> : null}
                      <div className="headerNotifItemTime">{formatDateTime(item.createdAt)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="headerProfileWrap" ref={profileRef}>
          <button
            className="headerUser"
            type="button"
            aria-label="Admin account"
            aria-expanded={isProfileOpen}
            onClick={toggleProfile}
          >
            <img className="headerUserAvatar" src="/admin-icon.svg" alt="Admin" />
            <span className="headerUserLabel">{adminName}</span>
          </button>

          {isProfileOpen ? (
            <div className="headerProfileDropdown" role="menu" aria-label="Institution profile">
              <div className="headerProfileLine">
                <span className="headerProfileKey">Institution</span>
                <span className="headerProfileValue">{profileTitle}</span>
              </div>
              <div className="headerProfileLine">
                <span className="headerProfileKey">Address</span>
                <span className="headerProfileValue">{profileAddress}</span>
              </div>
              <div className="headerProfileLine">
                <span className="headerProfileKey">Administrator</span>
                <span className="headerProfileValue">{adminName}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

