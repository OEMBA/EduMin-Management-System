import './Sidebar.css'
import graduateLogo from './graduate-hat.png'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'add-students', label: 'Add Students', icon: '👤' },
  { id: 'view-students', label: 'View Students', icon: '👥' },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <img src={graduateLogo} alt="EduMin Logo" />
        </div>
        <div className="logo-text">
          <span className="logo-name">EduMin</span>
          <span className="logo-sub">Management System</span>
        </div>
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
