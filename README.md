<p align="center">
  <img src="/frontend/src/assets/img/logotipo.png" alt="AgendIn" width="200"/>
</p>

<h1 align="center">AgendIn — Agendador de Horários</h1>

<p align="center">
  Plataforma para organização de atendimentos e horários, tornando o processo de agendamento mais simples, rápido e digital.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
</p>

---

## Sobre

O **AgendIn** foi criado para resolver um problema comum no dia a dia de profissionais e clientes: o controle manual de horários, com baixo rastreamento e pouca flexibilidade para consulta e alterações.

Com o AgendIn, é possível:
- Cadastrar usuários e profissionais
- Autenticar com segurança via JWT
- Agendar serviços com prevenção de conflito de horários
- Consultar e editar informações de usuário e agendamentos
- Gerenciar serviços e vínculos entre profissionais e serviços (perfil ADMIN)

---

## Fluxo de navegação

```
Registro / Login
      ↓
Autenticação JWT
      ↓
Área autenticada
   ├── Dados do usuário (consulta e edição)
   └── Agendamentos (criar, filtrar, cancelar)
         ↑
  Gestão administrativa (ADMIN)
   ├── Profissionais
   ├── Serviços
   └── Vínculos profissional ↔ serviço
```

---

## Stack

### Backend

| Tecnologia | Descrição |
|---|---|
| Java 21 | Linguagem principal |
| Spring Boot | Framework web |
| Spring Security | Autenticação e autorização |
| JWT | Tokens de acesso |
| PostgreSQL | Banco de dados relacional |
| Neon | Hospedagem do banco em nuvem |
| Dotenv | Gerenciamento de variáveis de ambiente |

### Frontend

| Tecnologia | Descrição |
|---|---|
| React | Framework de interface |
| Validação client-side | Verificação de dados antes do envio |

---

## Banco de dados

O schema é composto pelas seguintes tabelas:

| Tabela | Descrição |
|---|---|
| `users` | Usuários da plataforma |
| `professionals` | Profissionais disponíveis para agendamento |
| `services` | Serviços oferecidos |
| `professional_services` | Vínculo entre profissionais e serviços |
| `schedules` | Agendamentos realizados |

O status dos agendamentos é controlado pelo enum `ScheduleStatus`. O sistema possui prevenção de double-booking e atualização automática de status via job agendado.

---

## Autenticação

A autenticação utiliza **Spring Security + JWT**:

**Rotas públicas:**
```
POST /auth/register
POST /auth/login
```

**Rotas autenticadas** — exigem header:
```
Authorization: Bearer <token>
```

**Regras de autorização:**
- Rotas de `professionals`, `services` e `professional-services` → perfil **ADMIN**
- Demais rotas → usuário autenticado

### Exemplo de login

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "password": "sua_senha"
  }'
```

---

## Variáveis de ambiente

Crie um arquivo `.env` dentro de `backend/` com as seguintes variáveis:

```env
DB_URL=jdbc:postgresql://<host>:<porta>/<database>
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
SECRET_KEY=sua_chave_secreta
```

> ⚠️ **Nunca versione o arquivo `.env`.** Certifique-se de que ele está listado no `.gitignore`.

---

## Como executar localmente

### Pré-requisitos

- Java 21+
- Node.js 18+
- PostgreSQL (local ou via Neon)
- Maven (ou use o wrapper `./mvnw` incluso)

### 1) Backend

```bash
cd backend
./mvnw spring-boot:run
```

No Windows (PowerShell):

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

API disponível em: `http://localhost:8080`

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Endpoints da API

### Auth

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/auth/register` | Cadastra usuário | ❌ |
| POST | `/auth/login` | Autentica e retorna JWT | ❌ |

### Usuário

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/users` | Consulta dados do usuário autenticado | ✅ |
| PUT | `/users` | Edita dados do usuário autenticado | ✅ |

### Agendamentos

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/schedules` | Cria agendamento | ✅ |
| GET | `/schedules/user/{userId}` | Lista por usuário | ✅ |
| GET | `/schedules/status/{status}` | Lista por status | ✅ |
| GET | `/schedules/data?start=...&end=...` | Lista por intervalo de data | ✅ |
| PATCH | `/schedules/{id}/cancelar` | Cancela agendamento | ✅ |

### Administrativo (ADMIN)

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| * | `/professionals/**` | Gestão de profissionais | ✅ ADMIN |
| * | `/services/**` | Gestão de serviços | ✅ ADMIN |
| * | `/professional-services/**` | Gestão de vínculos | ✅ ADMIN |

---

## Estrutura do projeto

```
agendador-horarios/
├── backend/
│   ├── src/
│   ├── .env           ← não versionar
│   ├── .env.example   ← versionar (sem valores reais)
│   └── pom.xml
└── frontend/
    ├── src/
    └── package.json
```

> 💡 **Dica:** mantenha um `.env.example` no repositório com as chaves necessárias, mas sem os valores reais, para facilitar o setup de novos colaboradores.

---

## Ferramentas utilizadas no desenvolvimento

- **IntelliJ IDEA** — desenvolvimento do backend
- **Cursor** — desenvolvimento do frontend
- **Figma** — desenvolvimento do UX/UI Design
- **Postman** — testes de API
