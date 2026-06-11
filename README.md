# TaskManager — Front-end

Front-end do **TaskManager**, uma aplicação web para gerenciamento de tarefas com autenticação de usuários, controle de permissões por perfil e integração com uma API REST.

> **Backend:** [taskmanager-api](https://github.com/sergiomansoo/taskmanager) — desenvolvido em Java com Spring Boot.  
> **Deploy:** [https://taskmanager-xlm1.onrender.com](https://taskmanager-xlm1.onrender.com)


## Tecnologias Utilizadas

- React
- Vite
- React Router DOM
- Axios

---

## Acesso para Teste

```
ADMIN
Email: admin@taskmanager.com
Senha: admin123
```

```
USER
Email: user@taskmanager.com
Senha: user123
```
---

## Funcionalidades

### Autenticação

- Login de usuários
- Cadastro de novos usuários
- Armazenamento do token JWT no `localStorage`
- Controle de rotas protegidas com base na autenticação
- Logout com remoção do token

### Tarefas

- Listagem de tarefas
- Criação de novas tarefas
- Edição de status e prioridade
- Conclusão de tarefas
- Exclusão de tarefas
- Filtros rápidos por:
  - Dia atual
  - Semana atual
  - Mês atual
  - Todas as tarefas
- Exibição dos dados principais:
  - Título, descrição, status, prioridade, data de entrega e ID do usuário responsável

### Usuários

- Listagem de usuários
- Criação de usuários
- Visualização do perfil do usuário logado

### Permissões

A aplicação utiliza o perfil do usuário autenticado para controlar ações da interface.

Usuários com role `ADMIN` têm acesso a funcionalidades administrativas, como busca de tarefas por ID de usuário e páginas de gerenciamento de usuários.
![alt text](/src/assets/admin-image.png)

Usuários com role `USER` têm acesso apenas a visualização e criação de suas próprias tarefas.
![alt text](/src/assets/user-image.png)

---

## Integração com o Backend

A comunicação com a API é feita via Axios. A configuração principal fica em `src/api/api.jsx`:

```js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://taskmanager-xlm1.onrender.com',
})

export default api
```

Todas as requisições protegidas enviam o token JWT no header `Authorization`:

```js
const token = localStorage.getItem('token')

await api.get('/tarefa', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
```

---

## Principais Endpoints Consumidos

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/login` | Realiza login e retorna um token JWT |
| `POST` | `/auth/register` | Registra um novo usuário |

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/tarefa` | Lista as tarefas do usuário autenticado |
| `POST` | `/tarefa` | Cria uma nova tarefa |
| `POST` | `/tarefa/:id` | Cria uma tarefa para um usuário específico (ADMIN) |
| `PUT` | `/tarefa/:id` | Atualiza os dados de uma tarefa |
| `PATCH` | `/tarefa/:id/concluir` | Marca uma tarefa como concluída |
| `DELETE` | `/tarefa/:id` | Exclui uma tarefa pelo ID |

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/usuario/me` | Retorna os dados do usuário autenticado |
| `GET` | `/usuario` | Lista todos os usuários (ADMIN) |
| `POST` | `/usuario` | Cria um novo usuário |

---

## Estrutura do Projeto

```
src/
  api/
    api.jsx              # Configuração do Axios
  assets/
    hero.png
  components/
    NavBar.jsx           # Barra de navegação global
    NavBar.css
    TaskCard.jsx         # Card individual de tarefa
    TaskFilters.jsx      # Filtros rápidos de data
  pages/
    HomePage.jsx         # Página inicial (não autenticado)
    LoginPage.jsx        # Página de login
    RegisterPage.jsx     # Página de cadastro
    TaskCreatePage.jsx   # Criação de tarefa pelo próprio usuário
    TaskListPage.jsx     # Listagem e gerenciamento de tarefas
    UserCreatePage.jsx   # Criação de usuário (ADMIN)
    UserListPage.jsx     # Listagem de usuários (ADMIN)
    MePage.jsx           # Perfil do usuário logado
  styles/
    global.css
  App.jsx                # Rotas e controle de autenticação
  main.jsx
```

---

## Componentes Principais

### `App.jsx`

- Define as rotas da aplicação
- Controla o estado de autenticação
- Redireciona usuários autenticados ou não autenticados
- Exibe a navbar quando necessário

### `TaskListPage.jsx`

Página principal de tarefas. Responsável por:

- Buscar tarefas no backend
- Buscar dados do usuário logado para controle de permissões
- Aplicar filtros de data
- Filtrar tarefas por usuário (disponível para ADMIN)
- Atualizar a lista após concluir, editar ou excluir uma tarefa
- Renderizar os componentes `TaskFilters` e `TaskCard`

### `TaskCard.jsx`

Exibe uma tarefa individual com:

- Título, descrição, status, prioridade, data de entrega e ID do usuário
- Botão de concluir (desabilitado se já concluída)
- Seleção inline de status e prioridade para edição
- Botão de excluir

### `TaskFilters.jsx`

Componente de filtros rápidos que recebe as funções de filtro por props:

- Dia atual
- Semana atual
- Mês atual
- Todas as tarefas

### `NavBar.jsx`

Barra de navegação com links para:

- Tarefas
- Criar tarefa
- Usuários
- Criar usuário
- Meu perfil
- Logout

---

## Fluxo de Autenticação

1. O usuário acessa a aplicação.
2. Caso não esteja autenticado, visualiza a página inicial.
3. Ao fazer login, o backend retorna um token JWT.
4. O token é salvo no `localStorage`.
5. O estado `isAuthenticated` é atualizado no `App.jsx`.
6. O usuário é redirecionado para `/tarefas`.
7. As rotas protegidas passam a ficar disponíveis.

---

## Fluxo de Tarefas

1. Ao acessar `/tarefas`, a aplicação busca as tarefas com `GET /tarefa`.
2. O token salvo no `localStorage` é enviado no header da requisição.
3. As tarefas são armazenadas no estado da página.
4. A lista completa é mantida separadamente para permitir filtros sem perder os dados originais.
5. O usuário pode filtrar por dia, semana, mês ou visualizar todas.
6. Ao concluir, editar ou excluir uma tarefa, a interface é atualizada sem recarregar a página.

---

## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm
- Backend do TaskManager em execução ([instruções aqui](https://github.com/sergiomansoo/taskmanager))

### 1. Clonar o repositório

```bash
git clone https://github.com/sergiomansoo/taskmanager.git
```

### 2. Acessar a pasta do front-end

```bash
cd taskmanager-front
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Rodar em ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação será iniciada em:

```
http://localhost:5173
```

---

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Executa uma prévia local da build de produção |
| `npm run lint` | Executa o ESLint no projeto |

---

## Autor

**Sérgio Manso**  
[LinkedIn](https://linkedin.com/in/sergiomansoo)