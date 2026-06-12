
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import * as styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const [logins, setLogins] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();



  const busca= async () => {
    setErro("");
    try {
      const response = 
      await api.get("/login");
      setLogins(response.data);
    } catch(error){
      console.error(error.required);
      setErro("Erro ao buscar todos os dados");
    }}

  const autenticar = async (e) => {
    e.preventDefault();
    setErro("");
    try {
    busca();
   const loginEncontrado = logins.find((log)=>log.email===username && log.senha===password);

   if(loginEncontrado){
    const loginId = loginEncontrado.id;
      // const response = 

      await api.post(`/login/${loginId}`, {
        email: username,
        senha : password,
      });
    }
      // const token = response.data.token;
      // localStorage.setItem("token", token);
      
      // // Armazena o username digitado sem alterar o fluxo da resposta da API
      localStorage.setItem("username", username);

      navigate("/home");
    } catch (error) {
      setErro(`${error} usuário ou senha incorretos `);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginBox} onSubmit={autenticar}>
        <h2>Login</h2>
        {erro && <p className={styles.erro}>{erro}</p>}
        <input
          type="text"
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