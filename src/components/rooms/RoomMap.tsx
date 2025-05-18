import React, { useState } from 'react';
import './RoomMap.css';
import RoomModal from './RoomModal';

interface RoomMapProps {
  // Props podem ser expandidas conforme necessário
}

interface Room {
  id: number;
  status: string;
  capacity: number;
}

const RoomMap: React.FC<RoomMapProps> = () => {
  // Estado para controlar o modal
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Dados simulados das salas
  const rooms: Room[] = [
    { id: 1, status: 'available', capacity: 4 },
    { id: 2, status: 'occupied', capacity: 4 },
    { id: 3, status: 'reserved', capacity: 6 },
    { id: 4, status: 'available', capacity: 4 },
    { id: 5, status: 'unavailable', capacity: 8 },
    { id: 6, status: 'available', capacity: 4 },
    { id: 7, status: 'available', capacity: 4 },
    { id: 8, status: 'occupied', capacity: 6 },
    { id: 9, status: 'available', capacity: 4 },
    { id: 10, status: 'available', capacity: 4 },
    { id: 11, status: 'occupied', capacity: 4 },
    { id: 12, status: 'available', capacity: 6 },
    { id: 13, status: 'occupied', capacity: 4 },
    { id: 14, status: 'available', capacity: 4 },
    { id: 15, status: 'available', capacity: 8 },
    { id: 16, status: 'available', capacity: 4 },
    { id: 17, status: 'occupied', capacity: 4 },
    { id: 18, status: 'available', capacity: 6 },
    { id: 19, status: 'available', capacity: 4 },
    { id: 20, status: 'available', capacity: 4 },
    { id: 21, status: 'occupied', capacity: 4 },
    { id: 22, status: 'available', capacity: 6 },
  ];

  // Função para obter a classe CSS baseada no status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'occupied':
        return 'status-occupied';
      case 'reserved':
        return 'status-reserved';
      case 'unavailable':
        return 'status-unavailable';
      default:
        return '';
    }
  };

  // Função para abrir o modal ao clicar em uma sala
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="room-map-container">
      <div className="room-map">
        {rooms.map((room) => (
          <div 
            key={room.id} 
            className="room-cell"
            onClick={() => handleRoomClick(room)}
          >
            <div className={`room-status ${getStatusClass(room.status)}`}></div>
            <div className="room-number">{room.id}</div>
            <div className="room-corner"></div>
          </div>
        ))}
      </div>
      <div className="room-legend">
        <div className="legend-item">
          <div className="legend-color status-available"></div>
          <span>Disponível</span>
        </div>
        <div className="legend-item">
          <div className="legend-color status-occupied"></div>
          <span>Ocupado</span>
        </div>
        <div className="legend-item">
          <div className="legend-color status-reserved"></div>
          <span>Sua Reserva</span>
        </div>
        <div className="legend-item">
          <div className="legend-color status-unavailable"></div>
          <span>Indisponível</span>
        </div>
      </div>

      {/* Modal da sala */}
      {showModal && selectedRoom && (
        <RoomModal 
          room={selectedRoom} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default RoomMap;
