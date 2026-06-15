import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import * as styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const autenticar = async (e) => {
    e.preventDefault();

    setErro("");

    try {
      const response = await api.post("/usuarios/login", {
        email: username,
        senha: password,
      });

      const token = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      navigate("/home");
    } catch (error) {
      setErro("Usuário ou senha incorretos");
      console.error(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginBox} onSubmit={autenticar}>
        <h2>Login</h2>

        {erro && <p className={styles.erro}>{erro}</p>}

        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}