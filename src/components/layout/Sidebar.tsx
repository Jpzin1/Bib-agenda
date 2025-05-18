import React, { useState } from 'react';
import './Sidebar.css';

// Componentes de ícones SVG
const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#E0E0E0"/>
    <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z" fill="#E0E0E0"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="#E0E0E0"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="#E0E0E0"/>
  </svg>
);

const PencilIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#E0E0E0"/>
  </svg>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay para fechar a sidebar ao clicar fora */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <div className="sidebar-icon">
                <ListIcon />
              </div>
              <span className="sidebar-text">LISTA DE ESPERA</span>
            </li>
            <li className="sidebar-item">
              <div className="sidebar-icon">
                <HistoryIcon />
              </div>
              <span className="sidebar-text">HISTÓRICO</span>
            </li>
            <li className="sidebar-item">
              <div className="sidebar-icon">
                <LockIcon />
              </div>
              <span className="sidebar-text">BLOQUEIOS</span>
            </li>
            <li className="sidebar-item">
              <div className="sidebar-icon">
                <PencilIcon />
              </div>
              <span className="sidebar-text">SUAS RESERVAS</span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
