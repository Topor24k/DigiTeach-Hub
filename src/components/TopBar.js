import React from 'react';
import { BsList, BsBell, BsSearch } from 'react-icons/bs';
import './TopBar.css';

const TopBar = ({ onMenuClick }) => {
  return (
    <header className="topbar">
      <button className="topbar__menu" onClick={onMenuClick} aria-label="Open menu">
        <BsList />
      </button>

      {/* Search */}
      <div className="topbar__search">
        <BsSearch className="topbar__search-icon" />
        <input
          className="topbar__search-input"
          type="text"
          placeholder="Search program phases, resources, objectives..."
        />
      </div>

      <div className="topbar__right">
        {/* Notification */}
        <button className="topbar__icon-btn" aria-label="Notifications">
          <BsBell />
          <span className="topbar__badge">0</span>
        </button>

        {/* User */}
        <div className="topbar__user">
          <div className="topbar__user-avatar">UM</div>
          <span className="topbar__user-name">CTE</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
