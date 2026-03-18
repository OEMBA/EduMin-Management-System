import { NavLink, Route, Routes } from "react-router-dom"
import "../styling/sidebar.css"

function Sidebar() {
    return (
        <section className="navbar-section">
            <div className="logo-section">
                <div className="logo">
                    <img src="vite.svg" alt="Logo" />
                </div>

                <div className="institution-name">
                    <h2>EduMin</h2>
                    <p>Management System</p>
                </div>
            </div>

            <hr />

            <div className="tabs">
                <NavLink to="/" className="tab">
                    <i class="fa-solid fa-table-columns"></i>
                    Dashboard
                </NavLink>

                <NavLink to="/addstudent" className="tab">
                    <i class="fa-solid fa-user-plus"></i>
                    Add Students
                </NavLink>

                <NavLink to="/viewstudent" className="tab">
                    <i class="fa-solid fa-users"></i>
                    View Students
                </NavLink>
            </div>
        </section>
    )
}

export default Sidebar
