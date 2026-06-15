import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import styles from "./Login.module.css"; // Certifique-se de que o "L" bate com o nome físico do arquivo no disco

export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setErro("");

    api.post("/auth/login", { email: username, senha: password })
      .then((response) => {
        localStorage.setItem("username", response.data.email);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((err) => {
        setErro(err.response?.data || "Usuário ou senha inválidos.");
      });
  }

  return (
    // Ajustado para usar .loginContainer
    <div className={styles.loginContainer}> 
      {/* Ajustado para usar .loginBox para o formulário herdar o estilo de card */}
      <form onSubmit={handleLogin} className={styles.loginBox}>
        <h2>Login</h2>
        {erro && <p className={styles.erro}>{erro}</p>}
        <input 
          type="email" 
          placeholder="E-mail" 
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}