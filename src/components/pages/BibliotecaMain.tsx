import React from 'react';
import '../../styles/components/biblioteca-main.module.css';

interface BibliotecaMainProps {
  // Props podem ser expandidas conforme necessário
}

const BibliotecaMain: React.FC<BibliotecaMainProps> = () => {
  return (
    <div className="biblioteca-container">
      <div className="biblioteca-content">
        <div className="biblioteca-image">
          {/* Imagem da biblioteca será inserida aqui */}
          <div className="biblioteca-image-placeholder">
            <p>Imagem da Biblioteca</p>
          </div>
        </div>
        
        <div className="biblioteca-actions">
          <div className="action-row">
            <button className="action-button primary">Reservar</button>
            <button className="action-button secondary">Cancelar</button>
          </div>
        </div>
      </div>
      
      <div className="biblioteca-info">
        <div className="info-section">
          <h3>Informações</h3>
          <div className="info-content">
            <p>Horário de funcionamento: 08:00 - 22:00</p>
            <p>Capacidade: 120 lugares</p>
            <p>Salas de estudo: 8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibliotecaMain;
