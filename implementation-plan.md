# Plano de Implementação Pixel-Perfect

## Estrutura de Componentes

### 1. Layout Principal
```jsx
<div className="app-container">
  <Header />
  <MainContent>
    <PageTitle title="Olá, Estudante" subtitle="Menu" />
    <div className="content-grid">
      <RoomMap />
      <RoomCard />
    </div>
  </MainContent>
</div>
```

### 2. Componentes Específicos

#### Header
- Logo CEUP à esquerda
- Menu hamburguer
- Ícones de notificação e perfil à direita
- Fundo roxo escuro (#4A0D67)

#### RoomMap
- Grid de salas com numeração
- Indicadores coloridos de status
- Legenda na parte inferior

#### RoomCard
- Imagem da sala
- Título "SALA 1"
- Informações de capacidade
- Status (com cor correspondente)
- Botões de ação

## Paleta de Cores Exata
```css
:root {
  --primary-purple: #4A0D67;
  --primary-pink: #E91E63;
  --background-gray: #F5F5F5;
  --white: #FFFFFF;
  --status-available: #4CAF50;
  --status-occupied: #F44336;
  --status-reserved: #2196F3;
  --status-unavailable: #FF9800;
  --text-dark: #333333;
  --text-light: #757575;
  --border-light: #E0E0E0;
}
```

## Tipografia
```css
body {
  font-family: 'Roboto', 'Segoe UI', sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: 500;
}

h2 {
  font-size: 20px;
  font-weight: 500;
}

.subtitle {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-light);
}

.room-number {
  font-size: 12px;
  font-weight: 400;
}

.status-text {
  font-size: 14px;
  font-weight: 500;
}

.button-text {
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
}
```

## Espaçamentos e Layout
```css
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  height: 56px;
  padding: 0 16px;
}

.main-content {
  padding: 24px;
  background-color: var(--background-gray);
  flex: 1;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

.room-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.room-map {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  border: 1px solid var(--border-light);
}
```

## Assets Necessários
1. Logo CEUP (extrair da imagem ou criar SVG)
2. Ícones:
   - Menu hamburguer
   - Notificação
   - Perfil/usuário
3. Imagem da sala de estudo (usar placeholder similar)

## Interações e Estados
1. Hover nos botões: leve escurecimento
2. Hover nas salas do mapa: destaque visual
3. Status dinâmico das salas (disponível, ocupado, etc.)

## Responsividade
- Layout desktop como mostrado na imagem
- Adaptação para mobile: componentes em coluna única
- Breakpoints: 768px, 1024px

## Próximos Passos
1. Configurar projeto com as cores e tipografia definidas
2. Implementar componentes na ordem: Header, RoomMap, RoomCard
3. Integrar componentes no layout principal
4. Adicionar interatividade básica
5. Testar fidelidade visual comparando com a imagem de referência
