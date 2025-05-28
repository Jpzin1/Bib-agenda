import React, { useState, useEffect } from 'react';
import './RoomModal.css';
import { Room } from '../../lib/supabase';
import useReservations from '../../hooks/useReservations';
import useQueue from '../../hooks/useQueue';

interface RoomModalProps {
  room: Room;
  onClose: () => void;
  userId: string;
}

const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, userId }) => {
  const [isReserving, setIsReserving] = useState(false);
  const [isJoiningQueue, setIsJoiningQueue] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [queueSuccess, setQueueSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userHasReservation, setUserHasReservation] = useState(false);
  const [userInQueue, setUserInQueue] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);

  // Usar hooks para reservas e fila
  const { reserve, reservations } = useReservations(userId);
  const { joinQueue, queueEntries } = useQueue(userId);

  // Verificar se o usuário já tem reserva para esta sala
  useEffect(() => {
    if (reservations && reservations.length > 0) {
      const hasReservation = reservations.some(
        reservation => reservation.room_id === room.id && reservation.status === 'active'
      );
      setUserHasReservation(hasReservation);
    }
  }, [reservations, room.id]);

  // Verificar se o usuário já está na fila desta sala
  useEffect(() => {
    if (queueEntries && queueEntries.length > 0) {
      const queueEntry = queueEntries.find(entry => entry.room_id === room.id);
      if (queueEntry) {
        setUserInQueue(true);
        setQueuePosition(queueEntry.position);
      } else {
        setUserInQueue(false);
        setQueuePosition(null);
      }
    }
  }, [queueEntries, room.id]);

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
      return;
    }

    if (userHasReservation) {
      setError('Você já possui uma reserva para esta sala.');
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
        setReservationSuccess(true);
        setUserHasReservation(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError('Não foi possível reservar a sala. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro ao reservar sala:', err);
      setError('Ocorreu um erro ao processar sua reserva.');
    } finally {
      setIsReserving(false);
    }
  };

  // Função para entrar na fila
  const handleEnterQueue = async () => {
    if (room.status === 'reserved' || room.status === 'unavailable') {
      setError('Não é possível entrar na fila para esta sala.');
      return;
    }

    if (userInQueue) {
      setError(`Você já está na fila desta sala na posição ${queuePosition}.`);
      return;
    }

    setIsJoiningQueue(true);
    setError(null);

    try {
      const success = await joinQueue(room.id);
      
      if (success) {
        setQueueSuccess(true);
        setUserInQueue(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError('Não foi possível entrar na fila. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro ao entrar na fila:', err);
      setError('Ocorreu um erro ao processar sua solicitação.');
    } finally {
      setIsJoiningQueue(false);
    }
  };

  return (
    <div className="room-modal-overlay" onClick={onClose}>
      <div className="room-modal" onClick={(e) => e.stopPropagation()}>
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
          
          {reservationSuccess ? (
            <div className="success-message">Sala reservada com sucesso!</div>
          ) : queueSuccess ? (
            <div className="success-message">Você entrou na fila com sucesso!</div>
          ) : userHasReservation ? (
            <div className="info-message">Você já possui uma reserva ativa para esta sala.</div>
          ) : userInQueue ? (
            <div className="info-message">Você já está na fila desta sala na posição {queuePosition}.</div>
          ) : (
            <div className="room-actions">
              <button 
                onClick={handleReserve} 
                disabled={isReserving || room.status !== 'available' || userHasReservation}
                className={userHasReservation ? 'disabled' : ''}
              >
                {isReserving ? 'Reservando...' : userHasReservation ? 'Já Reservada' : 'Reservar'}
              </button>
              <button 
                onClick={handleEnterQueue} 
                disabled={isJoiningQueue || room.status === 'reserved' || room.status === 'unavailable' || userInQueue}
                className={userInQueue ? 'disabled' : ''}
              >
                {isJoiningQueue ? 'Entrando na fila...' : userInQueue ? 'Já na Fila' : 'Entrar na fila'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
