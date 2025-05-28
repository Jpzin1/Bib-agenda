import React, { useState } from 'react';
import './RoomMap.css';
import RoomModal from './RoomModal';
import useRooms from '../../hooks/useRooms';
import { Room } from '../../lib/supabase';

interface RoomMapProps {
  userId: string;
  onSelectRoom?: (room: Room) => void;
}

const RoomMap: React.FC<RoomMapProps> = ({ userId, onSelectRoom }) => {
  // Estado para controlar o modal
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Usar o hook para buscar as salas do Supabase
  const { rooms, loading, error } = useRooms();

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
    
    // Se a função onSelectRoom foi passada, chama ela com a sala selecionada
    if (onSelectRoom) {
      onSelectRoom(room);
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div className="loading">Carregando salas...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
          userId={userId}
        />
      )}
    </div>
  );
};

export default RoomMap;
