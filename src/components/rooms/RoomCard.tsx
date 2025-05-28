import React from 'react';
import './RoomCard.css';
import { Room } from '../../lib/supabase';
import useReservations from '../../hooks/useReservations';
import useQueue from '../../hooks/useQueue';

interface RoomCardProps {
  room: Room;
  userId: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, userId }) => {
  const { reserve } = useReservations(userId);
  const { joinQueue } = useQueue(userId);
  const [isReserving, setIsReserving] = React.useState(false);
  const [isJoiningQueue, setIsJoiningQueue] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

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

  // Função para reservar a sala
  const handleReserve = async () => {
    if (room.status !== 'available') {
      setError('Esta sala não está disponível para reserva.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsReserving(true);
    setError(null);

    try {
      // Criar reserva para 1 hora a partir de agora
      const now = new Date();
      const startTime = now.toISOString();
      const endTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString();

      const success = await reserve(room.id, startTime, endTime);
      
      if (success) {
        setSuccess('Sala reservada com sucesso!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Não foi possível reservar a sala. Tente novamente.');
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      console.error('Erro ao reservar sala:', err);
      setError('Ocorreu um erro ao processar sua reserva.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsReserving(false);
    }
  };

  // Função para entrar na fila
  const handleEnterQueue = async () => {
    if (room.status === 'reserved' || room.status === 'unavailable') {
      setError('Não é possível entrar na fila para esta sala.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsJoiningQueue(true);
    setError(null);

    try {
      const success = await joinQueue(room.id);
      
      if (success) {
        setSuccess('Você entrou na fila com sucesso!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Não foi possível entrar na fila. Tente novamente.');
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      console.error('Erro ao entrar na fila:', err);
      setError('Ocorreu um erro ao processar sua solicitação.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsJoiningQueue(false);
    }
  };

  return (
    <div className="room-card">
      <div className="room-image">
        <img src="https://via.placeholder.com/400x200" alt={`Sala ${room.id}`} />
      </div>
      <div className="room-details">
        <h2 className="room-title">SALA {room.id}</h2>
        <p className="room-capacity">Capacidade da sala: {room.capacity} pessoas (máx)</p>
        <div className="room-status-container">
          <span>Status: </span>
          <span className={`room-status-text ${getStatusClass(room.status)}`}>
            {getStatusText(room.status)}
          </span>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="room-actions">
          <button 
            onClick={handleReserve} 
            disabled={isReserving || room.status !== 'available'}
          >
            {isReserving ? 'Reservando...' : 'Reservar'}
          </button>
          <button 
            onClick={handleEnterQueue} 
            disabled={isJoiningQueue || room.status === 'reserved' || room.status === 'unavailable'}
          >
            {isJoiningQueue ? 'Entrando na fila...' : 'Entrar na fila'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
