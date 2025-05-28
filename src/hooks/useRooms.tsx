import { useState, useEffect } from 'react';
import { Room, getRooms, updateRoomStatus, supabase } from '../lib/supabase';

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const roomsData = await getRooms();
        setRooms(roomsData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar salas:', err);
        setError('Não foi possível carregar as salas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();

    // Configurar listener para atualizações em tempo real (opcional)
    const subscription = supabase
      .channel('public:rooms')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, (payload: any) => {
        // Atualizar a lista de salas quando houver mudanças
        fetchRooms();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateRoom = async (roomId: number, status: Room['status']) => {
    try {
      const success = await updateRoomStatus(roomId, status);
      if (success) {
        // Atualiza o estado local para refletir a mudança imediatamente
        setRooms(prevRooms => 
          prevRooms.map(room => 
            room.id === roomId ? { ...room, status } : room
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error(`Erro ao atualizar sala ${roomId}:`, err);
      return false;
    }
  };

  return { rooms, loading, error, updateRoom };
};

export default useRooms;
