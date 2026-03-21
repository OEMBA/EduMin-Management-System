import { useState } from 'react';
import './Header.css';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Header = ({ searchQuery, onSearchChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <header className="header">
      {/* Search Bar */}
      <div className={`header__search${focused ? ' header__search--focused' : ''}`}>
        <span className="header__search-icon"><SearchIcon /></span>
        <input
          type="text"
          className="header__search-input"
          placeholder="Search students, classes or reports ..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {searchQuery && (
          <button className="header__search-clear" onClick={() => onSearchChange('')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Right – bell + admin */}
      <div className="header__right">
        <button className="header__bell">
          <BellIcon />
          <span className="header__bell-dot" />
        </button>
        <div className="header__admin">
          <div className="header__admin-text">
            <p className="header__admin-name">Admin User</p>
            <p className="header__admin-role">Super Admin</p>
          </div>
          <div className="header__admin-avatar"><UserIcon /></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
