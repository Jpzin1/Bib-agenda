import { useState, useEffect } from 'react';
import { Reservation, createReservation, getUserReservations, cancelReservation, supabase } from '../lib/supabase';

export const useReservations = (userId: string) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const reservationsData = await getUserReservations(userId);
        setReservations(reservationsData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar reservas:', err);
        setError('Não foi possível carregar suas reservas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchReservations();

      // Configurar listener para atualizações em tempo real
      const subscription = supabase
        .channel('public:reservations')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'reservations', filter: `user_id=eq.${userId}` }, 
          (payload: any) => {
            fetchReservations();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [userId]);

  const reserve = async (roomId: number, startTime: string, endTime: string) => {
    try {
      const newReservation = await createReservation(roomId, userId, startTime, endTime);
      if (newReservation) {
        setReservations(prev => [...prev, newReservation]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Erro ao criar reserva:', err);
      return false;
    }
  };

  const cancelUserReservation = async (reservationId: number, roomId: number) => {
    try {
      const success = await cancelReservation(reservationId, roomId);
      if (success) {
        setReservations(prev => prev.filter(res => res.id !== reservationId));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Erro ao cancelar reserva:', err);
      return false;
    }
  };

  return { reservations, loading, error, reserve, cancelUserReservation };
};

export default useReservations;
