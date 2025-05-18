# Estrutura do Projeto BibAgenda

## Visão Geral da Arquitetura
Este documento define a estrutura de componentes e organização de arquivos para o projeto BibAgenda em React com TypeScript, baseado no design do Figma.

## Estrutura de Diretórios

```
biblioteca-react/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/
│           └── library-bg.jpg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── StatusIndicator.tsx
│   │   └── pages/
│   │       ├── BibliotecaMain.tsx
│   │       ├── ListaEspera.tsx
│   │       ├── Historico.tsx
│   │       ├── Bloqueios.tsx
│   │       ├── SuasReservas.tsx
│   │       └── AlocacaoSala.tsx
│   ├── hooks/
│   │   └── useLibraryData.ts
│   ├── context/
│   │   └── LibraryContext.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components/
│   │       ├── header.module.css
│   │       ├── sidebar.module.css
│   │       └── ...
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## Componentes Principais

### Layout
- **Header.tsx**: Barra superior com logo e navegação principal
- **Sidebar.tsx**: Menu lateral com navegação entre as diferentes seções
- **Footer.tsx**: Rodapé com informações adicionais
- **Layout.tsx**: Componente que integra Header, Sidebar e conteúdo principal

### Páginas
- **BibliotecaMain.tsx**: Tela principal da biblioteca
- **ListaEspera.tsx**: Gerenciamento da lista de espera
- **Historico.tsx**: Visualização do histórico de atividades
- **Bloqueios.tsx**: Gerenciamento de bloqueios
- **SuasReservas.tsx**: Visualização e gerenciamento de reservas do usuário
- **AlocacaoSala.tsx**: Interface para alocação de salas de estudo

### Componentes Comuns
- **Button.tsx**: Botão personalizado com variantes (primário, secundário)
- **Card.tsx**: Componente de card para exibição de informações
- **Modal.tsx**: Janela modal para ações específicas
- **StatusIndicator.tsx**: Indicador visual de status (cores diferentes)

## Estilização
Utilizaremos CSS Modules para estilização dos componentes, mantendo o escopo local e evitando conflitos de nomes de classes. As variáveis de cores e outros valores reutilizáveis serão definidos em `variables.css`.

## Gerenciamento de Estado
- **LibraryContext.tsx**: Contexto React para compartilhar dados entre componentes
- **useLibraryData.ts**: Hook personalizado para acesso e manipulação dos dados da biblioteca

## Tipos
- **types/index.ts**: Definições de tipos TypeScript para o projeto

## Serviços
- **api.ts**: Funções para comunicação com APIs externas (simuladas inicialmente)

## Próximos Passos
Com esta estrutura definida, podemos iniciar a implementação dos componentes principais, começando pela tela da biblioteca conforme solicitado pelo usuário.
