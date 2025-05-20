import React from 'react';
import './RoomCard.css';

interface RoomCardProps {
  roomNumber: number;
  capacity: number;
  status: string;
  onReserve?: () => void;
  onEnterQueue?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  roomNumber, 
  capacity, 
  status,
  onReserve,
  onEnterQueue
}) => {
  // Função para obter o texto do status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'occupied':
        return 'Ocupado';
      case 'reserved':
        return 'Sua Reserva';
      case 'unavailable':
        return 'Indisponível';
      default:
        return '';
    }
  };

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

  return (
    <div className="room-card">
      <div className="room-image">
        <img src="https://via.placeholder.com/400x200" alt={`Sala ${roomNumber}`} />
      </div>
      <div className="room-details">
        <h2 className="room-title">SALA {roomNumber}</h2>
        <p className="room-capacity">Capacidade da sala: {capacity} pessoas (máx)</p>
        <div className="room-status-container">
          <span>Status: </span>
          <span className={`room-status-text ${getStatusClass(status)}`}>
            {getStatusText(status)}
          </span>
        </div>
        <div className="room-actions">
          <button onClick={onReserve}>Reservar</button>
          <button onClick={onEnterQueue}>Entrar na fila</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
