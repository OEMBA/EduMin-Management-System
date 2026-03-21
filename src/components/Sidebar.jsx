import './Sidebar.css';

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const AddStudentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const ViewStudentsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const navItems = [
  { id: 'dashboard',      label: 'Dashboard',     Icon: DashboardIcon },
  { id: 'add-students',   label: 'Add Students',  Icon: AddStudentIcon },
  { id: 'view-students',  label: 'View Students', Icon: ViewStudentsIcon },
];

const Sidebar = ({ activePage, onNavigate }) => (
  <aside className="sidebar">
    {/* Logo */}
    <div className="sidebar__logo">
      <div className="sidebar__logo-icon">
        <GraduationCapIcon />
      </div>
      <div className="sidebar__logo-text">
        <p className="sidebar__logo-name">EduMin</p>
        <p className="sidebar__logo-sub">Management System</p>
      </div>
    </div>

    {/* Nav */}
    <nav className="sidebar__nav">
      {navItems.map(({ id, label, Icon }) => {
        const isActive = activePage === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`sidebar__nav-btn${isActive ? ' sidebar__nav-btn--active' : ''}`}
          >
            <span className="sidebar__nav-icon"><Icon /></span>
            <span>{label}</span>
          </button>
        );
      })}
    </nav>

    {/* Footer */}
    <div className="sidebar__footer">EduMin v1.0.0</div>
  </aside>
);

export default Sidebar;
