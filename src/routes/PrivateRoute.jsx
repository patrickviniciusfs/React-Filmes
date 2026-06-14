import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // alterar quando usarmos o token
  const usuarioLogado = localStorage.getItem("username");
  
  return usuarioLogado ? children : <Navigate to="/" />;
};

export default PrivateRoute;