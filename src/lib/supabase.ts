import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zqonacvptdcbcixbljzh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxb25hY3ZwdGRjYmNpeGJsanpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NTA0MzQsImV4cCI6MjA2NDAyNjQzNH0.c6nL6FuezoFZb1lQpcsn6GRWHmrEARqoxjq-p9_FAIw';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tipos para as tabelas do Supabase
export interface Room {
  id: number;
  status: 'available' | 'occupied' | 'reserved' | 'unavailable';
  capacity: number;
  created_at?: string;
}

export interface Reservation {
  id: number;
  room_id: number;
  user_id: string;
  start_time: string;
  end_time: string;
  status: 'active' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface QueueEntry {
  id: number;
  room_id: number;
  user_id: string;
  position: number;
  created_at?: string;
}

// Funções para interagir com as salas
export const getRooms = async (): Promise<Room[]> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Erro ao buscar salas:', error);
    return [];
  }
  
  return data || [];
};

export const getRoomById = async (id: number): Promise<Room | null> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Erro ao buscar sala ${id}:`, error);
    return null;
  }
  
  return data;
};

export const updateRoomStatus = async (id: number, status: Room['status']): Promise<boolean> => {
  const { error } = await supabase
    .from('rooms')
    .update({ status })
    .eq('id', id);
  
  if (error) {
    console.error(`Erro ao atualizar status da sala ${id}:`, error);
    return false;
  }
  
  return true;
};

// Funções para interagir com as reservas
export const createReservation = async (
  roomId: number, 
  userId: string,
  startTime: string,
  endTime: string
): Promise<Reservation | null> => {
  // Primeiro atualiza o status da sala
  const roomUpdate = await updateRoomStatus(roomId, 'reserved');
  
  if (!roomUpdate) {
    return null;
  }
  
  // Cria a reserva
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      room_id: roomId,
      user_id: userId,
      start_time: startTime,
      end_time: endTime,
      status: 'active'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Erro ao criar reserva:', error);
    // Reverte o status da sala em caso de erro
    await updateRoomStatus(roomId, 'available');
    return null;
  }
  
  return data;
};

export const getUserReservations = async (userId: string): Promise<Reservation[]> => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('start_time');
  
  if (error) {
    console.error('Erro ao buscar reservas do usuário:', error);
    return [];
  }
  
  return data || [];
};

export const cancelReservation = async (reservationId: number, roomId: number): Promise<boolean> => {
  // Atualiza o status da reserva
  const { error } = await supabase
    .from('reservations')
    .update({ status: 'cancelled' })
    .eq('id', reservationId);
  
  if (error) {
    console.error('Erro ao cancelar reserva:', error);
    return false;
  }
  
  // Atualiza o status da sala
  const roomUpdate = await updateRoomStatus(roomId, 'available');
  
  return roomUpdate;
};

// Funções para interagir com a fila
export const enterQueue = async (roomId: number, userId: string): Promise<QueueEntry | null> => {
  // Verifica a posição atual na fila
  const { data: queueData } = await supabase
    .from('queue')
    .select('*')
    .eq('room_id', roomId)
    .order('position', { ascending: false })
    .limit(1);
  
  const position = queueData && queueData.length > 0 ? queueData[0].position + 1 : 1;
  
  // Adiciona o usuário à fila
  const { data, error } = await supabase
    .from('queue')
    .insert({
      room_id: roomId,
      user_id: userId,
      position
    })
    .select()
    .single();
  
  if (error) {
    console.error('Erro ao entrar na fila:', error);
    return null;
  }
  
  return data;
};

export const getUserQueueEntries = async (userId: string): Promise<QueueEntry[]> => {
  const { data, error } = await supabase
    .from('queue')
    .select('*')
    .eq('user_id', userId)
    .order('position');
  
  if (error) {
    console.error('Erro ao buscar entradas na fila do usuário:', error);
    return [];
  }
  
  return data || [];
};

export const leaveQueue = async (queueId: number): Promise<boolean> => {
  const { error } = await supabase
    .from('queue')
    .delete()
    .eq('id', queueId);
  
  if (error) {
    console.error('Erro ao sair da fila:', error);
    return false;
  }
  
  return true;
};
