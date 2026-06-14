import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import styles from "./Login.module.css"; 

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const autenticar = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      // Busca a lista de logins diretamente da sua API Spring Boot
      const response = await api.get("/login");
      const listaLogins = response.data;

      // Valida se o usuário e senha existem no banco de dados
      const loginEncontrado = listaLogins.find(
        (log) => log.email === username && log.senha === password
      );

      if (loginEncontrado) {
        // Envia a confirmação ou cria a sessão no backend
        await api.post(`/login/${loginEncontrado.id}`, {
          email: username,
          senha: password,
        });

        // Salva as informações necessárias de sessão
        localStorage.setItem("username", username);
        // Se a sua API Spring Boot retornar um token JWT, você pode descomentar a linha abaixo:
        // localStorage.setItem("token", response.data.token);

        navigate("/home");
      } else {
        setErro("Usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor. Tente novamente.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginBox} onSubmit={autenticar}>
        <h2>Login</h2>
        {erro && <p className={styles.erro}>{erro}</p>}
        <input
          type="email"
          id="username"
          placeholder="E-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}