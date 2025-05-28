import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import PageTitle from './components/layout/PageTitle';
import RoomMap from './components/rooms/RoomMap';
import RoomCard from './components/rooms/RoomCard';
import { Room } from './lib/supabase';
import useRooms from './hooks/useRooms';

function App() {
  // Usuário simulado - em uma aplicação real, isso viria de um sistema de autenticação
  const userId = "user-1";
  
  const { rooms, loading, error } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Função para alternar a visibilidade da sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Seleciona a primeira sala disponível para exibir no card
  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0]);
    }
  }, [rooms, selectedRoom]);

  // Função para selecionar uma sala específica para exibir no card
  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className={`main-content ${sidebarOpen ? 'sidebar-active' : ''}`}>
        <PageTitle title="Olá, Estudante" subtitle="Menu" />
        
        {loading ? (
          <div className="loading-container">Carregando dados das salas...</div>
        ) : error ? (
          <div className="error-container">{error}</div>
        ) : (
          <div className="content-grid">
            <RoomMap userId={userId} onSelectRoom={handleSelectRoom} />
            {selectedRoom && (
              <RoomCard room={selectedRoom} userId={userId} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
