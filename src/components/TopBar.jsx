import { useState } from 'react'
import './TopBar.css'

export default function TopBar({ adminName, adminRole }) {
  const [query, setQuery] = useState('')

  return (
    <header className="topbar">
      <div className="topbar-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search students, classes or reports ..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="topbar-right">
        <button className="notif-btn">
          <span>🔔</span>
          <span className="notif-dot" />
        </button>
        <div className="admin-info">
          <div className="admin-text">
            <span className="admin-name">{adminName}</span>
            <span className="admin-role">{adminRole}</span>
          </div>
          <div className="admin-avatar">
            <span>👤</span>
          </div>
        </div>
      </div>
    </header>
  )
}
