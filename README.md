# 🎬 React-Filmes — Comunidade & Catálogo de Cinema

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge\&logo=react\&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge\&logo=vite\&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge\&logo=javascript\&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge\&logo=react-router\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge\&logo=github\&logoColor=white)

---

# 📌 Sobre o Projeto

O **React-Filmes** é uma aplicação web desenvolvida utilizando **React**, **Vite** e **JavaScript**, oferecendo uma plataforma de catálogo cinematográfico integrada a recursos de comunidade e autenticação.

A aplicação consome duas fontes de dados simultâneas: a API internacional do TMDB para renderizar informações de filmes em tempo real e uma API REST própria (desenvolvida em Spring Boot) para gerenciar a autenticação e o sistema de fórum/comentários de cada obra.

Para facilitar a execução do ambiente acadêmico, a API foi disponibilizada em formato `.jar`, permitindo iniciar o back-end sem a necessidade de compilar o código-fonte.

O projeto foi desenvolvido seguindo princípios modernos de componentização e reutilização de código, proporcionando escalabilidade, manutenção e boa experiência ao usuário.

---

# 🎯 Objetivos do Projeto

* Aplicar conceitos modernos do React e Hooks;
* Consumir APIs REST externas e internas;
* Implementar autenticação baseada em JWT;
* Utilizar Context API para gerenciamento de estado;
* Trabalhar com CSS Modules;
* Criar interfaces acessíveis e responsivas;
* Utilizar Git e GitHub em ambiente colaborativo.

---

# ⚙️ Tecnologias Utilizadas

<table align="center">
<tr>

<td align="center">
<h4>💻 Front-End</h4>
<img src="https://skillicons.dev/icons?i=react,vite,js,html,css" /><br><br>
<strong>React, Vite e JavaScript ES6+</strong>
</td>

<td width="40"></td>

<td align="center">
<h4>🔌 APIs & Back-End</h4>
<img src="https://skillicons.dev/icons?i=java,spring,postman" /><br><br>
<strong>Spring Boot, TMDB API e REST API</strong>
</td>

<td width="40"></td>

<td align="center">
<h4>🧰 Ferramentas</h4>
<img src="https://skillicons.dev/icons?i=vscode,eclipse,idea" /><br><br>
<strong>VS Code, Eclipse e IntelliJ IDEA</strong>
</td>

</tr>
</table>

---

# 🧱 Estrutura do Projeto

```txt
src
├── assets
├── components
│   ├── Card
│   ├── FilterByNome
│   ├── Footer
│   ├── Header
│   ├── MainLayout
│   ├── Post
│   ├── ThemeContext
│   └── VLibras
│
├── pages
│   ├── About
│   ├── ContactUS
│   ├── Feed
│   ├── Home
│   ├── Login
│   └── Logout
│
├── routes
│   ├── AppRouter.jsx
│   └── PrivateRoute.jsx
│
├── service
│   ├── api.js
│   └── apiFilmes.js
│
├── styles
│   └── globalStyles.css
│
├── App.jsx
└── main.jsx
```

---

# 🚀 Funcionalidades Implementadas

## 🔐 Autenticação

* Login integrado ao back-end;
* Rotas privadas protegidas;
* Persistência de autenticação;
* Logout seguro.

## 🎬 Catálogo de Filmes

* Listagem dinâmica de filmes populares;
* Integração em tempo real com TMDB;
* Exibição de pôsteres, sinopses e avaliações;
* Navegação dinâmica por filmes.

## 💬 Comunidade

* Sistema de comentários;
* Criação e remoção de postagens;
* Integração com API REST.

## 🎨 Interface

* Tema global utilizando Context API;
* CSS Modules;
* Interface responsiva;
* Componentização reutilizável.

## ♿ Acessibilidade

* Integração com VLibras;
* Recursos de acessibilidade digital.

---

# 🔐 Autenticação e Acesso

O sistema utiliza autenticação baseada em **JWT (JSON Web Token)**.

> ⚠️ **No primeiro acesso é necessário autenticar manualmente pelo Swagger da API para obtenção do token JWT.**

---

# 🔑 Credenciais de Teste

Para acessar funcionalidades protegidas da aplicação é necessário realizar autenticação inicial pelo Swagger da API.

> ⚠️ No primeiro acesso, autentique-se manualmente pelo Swagger para geração do token JWT.

```txt
E-mail: teste@teste.com
Senha: 1234
```

Após autenticar no Swagger, o token será utilizado pelo front-end para acessar as rotas protegidas.

---

# 📡 APIs Consumidas

## 🌎 API Externa — TMDB

| Método | Endpoint         | Descrição               |
| ------ | ---------------- | ----------------------- |
| GET    | `/movie/popular` | Lista filmes populares  |
| GET    | `/movie/{id}`    | Busca detalhes do filme |

---

## ⚙️ API Interna — Spring Boot

| Método | Endpoint                      | Descrição               |
| ------ | ----------------------------- | ----------------------- |
| POST   | `/login`                      | Autenticação do usuário |
| GET    | `/comentario/filme/{filmeId}` | Lista comentários       |
| POST   | `/comentario`                 | Cria comentário         |
| DELETE | `/comentario/{id}`            | Remove comentário       |

---

# ⚙️ Como Executar o Projeto

## 📥 Clonar o repositório

```bash
git clone https://github.com/patrickviniciusfs/React-Filmes.git
```

## 📂 Entrar na pasta

```bash
cd React-Filmes
```

## 📥 Instalar dependências

```bash
npm install
```

## 🔑 Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_TMDB_API_KEY=SUA_CHAVE_DA_TMDB
```

---

## ☕ Executar a API Back-End

A API foi disponibilizada em formato `.jar`.

Execute o comando:

```bash
java -jar api-0.0.1-SNAPSHOT.jar
```

Após iniciar a API, acesse o Swagger:

```txt
http://localhost:8080/swagger-ui/index.html
```

Realize a autenticação utilizando:

```txt
E-mail: teste@teste.com
Senha: 1234
```

Somente após a autenticação inicial será possível utilizar as funcionalidades protegidas do sistema.

---

## ▶️ Executar o Front-End

```bash
npm run dev
```

A aplicação será executada normalmente em:

```txt
http://localhost:5173
```

---

# 📦 Principais Dependências

```json
{
  "dependencies": {
    "axios": "^1.7.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.51.5",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.23.1"
  }
}
```

---

# 📚 Conceitos Aplicados

* React Hooks
* Context API
* React Router DOM
* Axios
* APIs REST
* JWT Authentication
* CSS Modules
* Componentização
* Rotas Privadas
* Responsividade
* Acessibilidade Digital
* Clean Code

---

# 👥 Equipe do Projeto

<table align="center">
<tr>

<td align="center">
<a href="https://github.com/kevinsgoncalves">
<img src="https://avatars.githubusercontent.com/kevinsgoncalves" width="100px;" alt="Kevin"/><br>
<sub><b>Kevin Gonçalves</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/patrickviniciusfs">
<img src="https://avatars.githubusercontent.com/patrickviniciusfs" width="100px;" alt="Patrick"/><br>
<sub><b>Patrick Vinícius</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/th1agOx">
<img src="https://avatars.githubusercontent.com/th1agOx" width="100px;" alt="Thiago"/><br>
<sub><b>Thiago Rocha</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/raylaferreira-coder">
<img src="https://avatars.githubusercontent.com/raylaferreira-coder" width="100px;" alt="Rayla"/><br>
<sub><b>Rayla Ferreira</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/SimoneBromer">
<img src="https://avatars.githubusercontent.com/SimoneBromer" width="100px;" alt="Simone"/><br>
<sub><b>Simone Bromer</b></sub>
</a>
</td>

</tr>
</table>

---

# 📌 Status do Projeto

✅ Concluído e Refatorado: Componentização isolada aplicando conceitos de Clean Code.

🚀 Integrado: Consumindo dados reais via Axios de microsserviços locais e externos.

🔐 Autenticação JWT integrada ao ecossistema Spring Boot.

♿ Acessível: Widget nativo de VLibras configurado no App Root.

☕ API distribuída em formato `.jar` para facilitar a execução do ambiente.

🎬 Plataforma de catálogo cinematográfico com recursos de comunidade e autenticação.