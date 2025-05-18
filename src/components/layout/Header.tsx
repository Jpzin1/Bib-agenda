import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">CEUB</div>
        <button className="menu-button" onClick={toggleSidebar}>
          <span className="menu-icon">≡</span>
        </button>
      </div>
      <div className="header-right">
        <button className="icon-button">
          <span className="notification-icon">🔔</span>
        </button>
        <button className="profile-button">
          <span className="profile-icon">👤</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
