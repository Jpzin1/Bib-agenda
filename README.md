# Documentação do Projeto BibAgenda

## Visão Geral
Este projeto implementa uma interface de sistema de biblioteca baseada no design do Figma "BibAgenda". A aplicação foi desenvolvida utilizando React com TypeScript, seguindo as melhores práticas de desenvolvimento front-end.

## Estrutura do Projeto
O projeto segue uma arquitetura de componentes modular, com separação clara entre layout, páginas e componentes comuns:

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   └── pages/
│       └── BibliotecaMain.tsx
├── styles/
│   ├── global.css
│   └── components/
│       ├── header.module.css
│       ├── sidebar.module.css
│       ├── layout.module.css
│       └── biblioteca-main.module.css
├── App.tsx
└── index.tsx
```

## Funcionalidades Implementadas
- Menu lateral (Sidebar) com navegação entre diferentes seções
- Cabeçalho (Header) com título dinâmico baseado na seção atual
- Tela principal da biblioteca com layout responsivo
- Sistema de navegação entre páginas

## Como Executar o Projeto

### Requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Comandos
1. Instalar dependências:
   ```
   npm install
   ```

2. Iniciar servidor de desenvolvimento:
   ```
   npm start
   ```

3. Criar build de produção:
   ```
   npm run build
   ```

## Próximos Passos
- Implementar as demais páginas (Lista de Espera, Histórico, etc.)
- Adicionar funcionalidades de backend para persistência de dados
- Implementar autenticação de usuários
- Adicionar testes automatizados

## Referências
- Design original: Figma BibAgenda
