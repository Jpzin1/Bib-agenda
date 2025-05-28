// Script para resetar o banco de dados do Supabase
// Reseta todas as salas para disponível, remove reservas e limpa filas de espera

import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://zqonacvptdcbcixbljzh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxb25hY3ZwdGRjYmNpeGJsanpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NTA0MzQsImV4cCI6MjA2NDAyNjQzNH0.c6nL6FuezoFZb1lQpcsn6GRWHmrEARqoxjq-p9_FAIw';
const supabase = createClient(supabaseUrl, supabaseKey);

async function resetDatabase() {
  console.log('Iniciando reset do banco de dados...');
  
  try {
    // 1. Limpar todas as filas de espera
    console.log('Limpando filas de espera...');
    const { error: queueError } = await supabase
      .from('queue')
      .delete()
      .is('id', 'not.null'); // Condição para deletar todos os registros
    
    if (queueError) throw queueError;
    console.log('✓ Filas de espera removidas com sucesso');
    
    // 2. Limpar todas as reservas
    console.log('Limpando reservas...');
    const { error: reservationError } = await supabase
      .from('reservations')
      .delete()
      .is('id', 'not.null'); // Condição para deletar todos os registros
    
    if (reservationError) throw reservationError;
    console.log('✓ Reservas removidas com sucesso');
    
    // 3. Resetar todas as salas para disponível
    console.log('Resetando status das salas...');
    const { error: roomsError } = await supabase
      .from('rooms')
      .update({ status: 'available' })
      .is('id', 'not.null'); // Condição para atualizar todos os registros
    
    if (roomsError) throw roomsError;
    console.log('✓ Status das salas resetado com sucesso');
    
    console.log('Reset do banco de dados concluído com sucesso!');
    return { success: true, message: 'Banco de dados resetado com sucesso!' };
    
  } catch (error) {
    console.error('Erro ao resetar banco de dados:', error);
    return { success: false, message: 'Erro ao resetar banco de dados', error };
  }
}

// Executar o reset
resetDatabase().then(result => {
  if (result.success) {
    console.log(result.message);
  } else {
    console.error(result.message, result.error);
  }
});

export default resetDatabase;
