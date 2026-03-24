import { NavLink } from 'react-router-dom'

function linkClass({ isActive }) {
  return `sidebarLink${isActive ? ' isActive' : ''}`
}

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarBrand">
        <div className="sidebarLogo">
          <img className="sidebarLogoIcon" src="graduate-hat.svg" alt="Graduate hat" />
        </div>
        <div>
          <div className="sidebarName">EduMin</div>
          <div className="sidebarTag">Management System</div>
        </div>
      </div>

      <nav className="sidebarNav" aria-label="Main navigation">
        <NavLink className={linkClass} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={linkClass} to="/students/add">
          Add Students
        </NavLink>

        <NavLink className={linkClass} to="/students/view">
          View Students
        </NavLink>
      </nav>
    </aside>
  )
}

