import { useState, useEffect } from 'react';
import { QueueEntry, enterQueue, getUserQueueEntries, leaveQueue, supabase } from '../lib/supabase';

export const useQueue = (userId: string) => {
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueueEntries = async () => {
      try {
        setLoading(true);
        const entries = await getUserQueueEntries(userId);
        setQueueEntries(entries);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar entradas na fila:', err);
        setError('Não foi possível carregar suas entradas na fila. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchQueueEntries();

      // Configurar listener para atualizações em tempo real
      const subscription = supabase
        .channel('public:queue')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'queue', filter: `user_id=eq.${userId}` }, 
          (payload: any) => {
            fetchQueueEntries();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [userId]);

  const joinQueue = async (roomId: number) => {
    try {
      const newEntry = await enterQueue(roomId, userId);
      if (newEntry) {
        setQueueEntries(prev => [...prev, newEntry]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Erro ao entrar na fila:', err);
      return false;
    }
  };

  const exitQueue = async (queueId: number) => {
    try {
      const success = await leaveQueue(queueId);
      if (success) {
        setQueueEntries(prev => prev.filter(entry => entry.id !== queueId));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Erro ao sair da fila:', err);
      return false;
    }
  };

  return { queueEntries, loading, error, joinQueue, exitQueue };
};

export default useQueue;
