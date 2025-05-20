import React from 'react';
import './SideBarModal.css';

interface SidebarModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const SidebarModal: React.FC<SidebarModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sidebar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-modal-header">
          <div className="modal-subtitle">Ceub Biblioteca</div>
          <h2 className="sidebar-modal-title">{title}</h2>
        </div>
        <div className="sidebar-modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarModal;
