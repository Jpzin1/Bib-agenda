import React from 'react';
import './RoomCard.css';

interface RoomCardProps {
  roomNumber: number;
  capacity: number;
  status: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ roomNumber, capacity, status }) => {
  // Função para obter o texto do status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'occupied':
        return 'Ocupado';
      case 'reserved':
        return 'Reservado';
      case 'unavailable':
        return 'Indisponível';
      default:
        return '';
    }
  };

  return (
    <div className="room-card">
      <div className="room-image">
        <img src="https://via.placeholder.com/400x200" alt={`Sala ${roomNumber}`} />
      </div>
      <div className="room-details">
        <h2 className="room-title">SALA {roomNumber}</h2>
        <p className="room-capacity">Capacidade da sala: {capacity} pessoas (mesa)</p>
        <div className="room-status-container">
          <span>Status: </span>
          <span className={`room-status-text status-${status}`}>
            {getStatusText(status)}
          </span>
        </div>
        <div className="room-actions">
          <button>Reservar</button>
          <button>Entrar na fila</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
