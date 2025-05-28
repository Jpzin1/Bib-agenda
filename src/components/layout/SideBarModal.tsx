import React from 'react';
import './SideBarModal.css';

interface SideBarModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const SideBarModal: React.FC<SideBarModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="sidebar-modal-overlay" onClick={onClose}>
      <div className="sidebar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-modal-header">
          <h2 className="sidebar-modal-title">{title}</h2>
          <button className="sidebar-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="sidebar-modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideBarModal;
