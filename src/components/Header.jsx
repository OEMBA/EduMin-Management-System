import "../styling/header.css"

function Header({onMenuClick}) {
    return (
        <header className="header-section">
            <div className="menu" onClick={onMenuClick}>
                <i className="fa-solid fa-bars"></i>
            </div>

            <div className="input-section">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search students classes or reports..." className="header-input" />
            </div>

            <div className="notification">
                <i className="fa-solid fa-bell"></i>
            </div>

            <div className="admin-section">
                <div className="info">
                    <h6>Admin User</h6>
                    <p>Super Admin</p>
                </div>

                <div className="profile">
                    <i className="fa-solid fa-user"></i>
                </div>
            </div>
        </header>
    )
}

export default Header
