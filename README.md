#  Chatbot de FAQ com Dashboard Analítico
> Chatbot de FAQ com dashboard analítico para automatizar respostas e transformar as interações em dados úteis.

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-5FA04E?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

## Sobre o projeto
  O **desafio02-fullstack** é uma aplicação full stack dividida em dois módulos:

- **Chatbot:** encontra respostas em uma base de FAQs, sugere perguntas por categoria e registra consultas respondidas ou não respondidas.
- **Dashboard:** exibe total de consultas, taxa de resolução, perguntas frequentes, perguntas sem resposta, distribuição por categoria e evolução das interações.

O projeto também conta com layout responsivo, estados de carregamento e erro, API REST, testes automatizados e execução completa com Docker.

## Telas

### Chatbot

![Tela do Chatbot](docs/screenshots/chatbot.png)

### Dashboard analítico

![Dashboard analítico](docs/screenshots/dashboard.png)



## Arquitetura

```mermaid
flowchart LR
    U["Usuário"] --> F["React + Vite"]
    F -->|"/api/faq"| A["API Node.js + Express"]
    F -->|"/api/analytics"| A
    A --> B["Base de FAQs"]
    A --> H["Histórico em memória"]
    H --> D["Métricas do dashboard"]
```

As interações ficam armazenadas **em memória**. Portanto, o histórico é reiniciado quando o backend é encerrado ou reiniciado.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 19, Vite 8, JavaScript, CSS e Fetch API |
| Backend | Node.js 24, Express 4, CORS e dotenv |
| Testes | Node Test Runner e `node:assert` |
| Infraestrutura | Docker, Docker Compose, Nginx e health checks |
| Organização | Monorepo com npm workspaces |

## Como rodar com Docker

Esta é a forma recomendada para avaliar a aplicação completa. Antes de começar, confirme que o **Docker Desktop está instalado e em execução**.

> **Recomendação para Windows:** faça o clone em um caminho curto e sem sincronização do OneDrive. Pastas com espaços e caracteres acentuados podem causar problemas de resolução de caminho em alguns ambientes Docker. O exemplo abaixo utiliza `C:\Dev`.

### 1. Prepare uma pasta de trabalho

Abra o **Prompt de Comando (CMD)** e execute:

```cmd
if not exist C:\Dev mkdir C:\Dev
cd /d C:\Dev
```

### 2. Clone o projeto

```cmd
git clone https://github.com/victormbm/desafio-full-stack02-chat-bot.git desafio02-fullstack
```

O repositório será criado em:

```text
C:\Dev\desafio02-fullstack
```

### 3. Entre na pasta e confira os arquivos

```cmd
cd /d C:\Dev\desafio02-fullstack
dir
```

Entre os itens listados, devem aparecer:

```text
apps
docker-compose.yml
.env.example
package.json
README.md
```

### 4. Crie o arquivo de ambiente

Se estiver usando o CMD:

```cmd
copy .env.example .env
```

Se estiver usando o PowerShell:

```powershell
Copy-Item .env.example .env
```

#### Seed opcional do backend

Por padrão, o backend inicia sem interações registradas:

```env
SEED_DEV_DATA=false
```

Para iniciar com interações distribuídas pelos últimos sete dias, altere o arquivo `.env`:

```env
SEED_DEV_DATA=true
```

Se os containers já estiverem em execução, recrie-os para aplicar a alteração:

```bash
docker compose down
docker compose up --build
```

O seed preenche o histórico em memória utilizado pelo analytics, permitindo verificar os indicadores e gráficos do dashboard desde a inicialização.

### 5. Construa e inicie os containers

```cmd
docker compose up --build
```

Na primeira execução, o Docker precisará baixar as imagens e instalar as dependências. Aguarde até o backend ficar saudável e o frontend ser iniciado.

### 6. Acesse a aplicação

- Aplicação: [http://localhost:8080](http://localhost:8080)
- API: [http://localhost:3001](http://localhost:3001)
- Health check: [http://localhost:3001/health](http://localhost:3001/health)

O health check deve retornar:

```json
{"status":"ok"}
```

### 7. Encerre os containers

No terminal em que o Docker está rodando, pressione `Ctrl + C`. Em seguida, remova os containers e a rede criada pelo projeto:

```cmd
docker compose down
```

## Como rodar localmente

### Pré-requisitos

- Node.js 24 recomendado
- npm

### 1. Instale as dependências

Na raiz do projeto:

```bash
npm ci
```

### 2. Inicie o backend

Em um terminal:

```bash
npm run dev:backend
```

O backend ficará disponível em [http://localhost:3001](http://localhost:3001).

### 3. Inicie o frontend

Em outro terminal:

```bash
npm run dev:frontend
```

O frontend ficará disponível em [http://localhost:5173](http://localhost:5173). Durante o desenvolvimento, o Vite encaminha as chamadas de `/api` para o backend na porta `3001`.

## Testes automatizados

Os testes do backend cobrem o mecanismo de busca das FAQs e os cálculos do analytics.

### Rodar todos os testes localmente

```bash
npm test -w apps/backend
```

### Rodar somente os testes de analytics

```bash
npm test -w apps/backend -- test/analytics.service.test.js
```

### Rodar os testes dentro do Docker

```bash
docker compose build backend
docker compose run --rm --no-deps backend npm test --prefix apps/backend
```

Atualmente, a suíte possui **16 testes**:

- 8 testes do serviço de analytics;
- 8 testes de correspondência das FAQs.

Os testes não dependem do seed: `npm test` valida diretamente as regras dos serviços de FAQ e analytics.

## Qualidade e build

```bash
# Verificar o frontend
npm run lint -w apps/frontend

# Gerar o build de produção
npm run build:frontend
```

## Endpoints da API

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/health` | Verifica a saúde do backend |
| `GET` | `/api/faq` | Lista todas as FAQs |
| `GET` | `/api/faq/suggestions` | Lista categorias e perguntas sugeridas |
| `POST` | `/api/faq/ask` | Busca uma resposta e registra a interação |
| `GET` | `/api/analytics/summary` | Retorna os indicadores do dashboard |
| `GET` | `/api/analytics/interactions` | Lista o histórico de interações |

Exemplo de consulta:

```bash
curl -X POST http://localhost:3001/api/faq/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Como acompanho meu pedido?"}'
```

## Estrutura do projeto

```text
desafio02-fullstack/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── data/
│   │   │   ├── dev/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   └── test/
│   └── frontend/
│       └── src/
│           ├── components/
│           ├── pages/
│           └── services/
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

## Como o chatbot encontra respostas

As perguntas são normalizadas para ignorar diferenças de maiúsculas, acentos e pontuação. O serviço também reconhece variações de alguns termos — como `trocar`, `troco` e `troca` — e exige uma pontuação mínima para reduzir falsos positivos. Quando nenhuma FAQ corresponde à pergunta, a interação é registrada como não respondida e aparece no dashboard.
