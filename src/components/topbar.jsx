import React from 'react';
import "./topbar.css"; // Ensure you create this CSS file too

// eslint-disable-next-line no-empty-pattern
const Topbar = ({ }) => {
  return (
    <header className="topbar">
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input 
          type="text" 
          placeholder="Search students, classes or reports ..." 
        />
      </div>

      <div className="user-profile">
        <div className="user-info">
          <span className="user-name">Admin User</span>
          <span className="user-role">Super Admin</span>
        </div>
        <div className="user-avatar">
          <i className="fa-solid fa-user-tie"></i>
        </div>
      </div>
    </header>
  );
};

// THIS IS THE LINE YOU ARE MISSING:
export default Topbar;