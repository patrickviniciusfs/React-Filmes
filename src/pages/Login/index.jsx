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

      const response = await api.get("/login");
      const usuarios = response.data;


      const loginEncontrado = usuarios.find(
        (log) => log.email === username && log.senha === password
      );

      if (loginEncontrado) {

        localStorage.setItem("username", username);
        navigate("/home"); 
      } else {
  
        setErro("Usuário ou senha incorretos.");
      }
      
    } catch (error) {
      console.error(error);
      setErro("Erro de comunicação com o servidor.");
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
          placeholder="Email"
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