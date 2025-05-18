import React, { useState } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import PageTitle from './components/layout/PageTitle';
import RoomMap from './components/rooms/RoomMap';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-active' : ''}`}>
        <PageTitle title="Olá, Estudante" subtitle="Menu" />
        <div className="content-grid">
          <RoomMap />
        </div>
      </div>
    </div>
  );
}

export default App;
