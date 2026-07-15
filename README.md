# Chatbot de FAQ com Dashboard Analítico

Monorepo com frontend (React + Vite) e backend (Node + Express).

## Estrutura

```
apps/
  frontend/   React + Vite
  backend/    Node + Express (API REST)
```

## Rodando localmente

Instale as dependências na raiz (workspaces):

```
npm install
```

Backend:

```
npm run dev:backend
```

Frontend:

```
npm run dev:frontend
```

Copie `apps/backend/.env.example` para `apps/backend/.env` antes de rodar o backend.

## Docker

```
docker compose up --build
```

- Frontend: http://localhost:8080
- Backend: http://localhost:3001
