import { NavLink } from "react-router-dom"
import "./sidebar.css"

function Sidebar({ isOpen, isClosed }) {
    return (
        <section className={`navbar-section ${isOpen ? "show" : "hide"}`}>
            <div className="logo-section">
                <div className="logo">
                    <img src="graduate-hat.png" alt="Logo" />
                </div>

                <div className="institution-name">
                    <h2>EduMin</h2>
                    <p>Management System</p>
                </div>
            </div>

            <hr />

            <div className="tabs" onClick={isClosed}>
                <NavLink to="/" className="tab">
                    <i className="fa-solid fa-table-columns"></i>
                    Dashboard
                </NavLink>

                <NavLink to="/addstudent" className="tab">
                    <i className="fa-solid fa-user-plus"></i>
                    Add Students
                </NavLink>

                <NavLink to="/viewstudent" className="tab">
                    <i className="fa-solid fa-users"></i>
                    View Students
                </NavLink>
            </div>
        </section>
    )
}

export default Sidebar