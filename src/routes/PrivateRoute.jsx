import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // Se houver um token salvo, o usuário pode seguir; caso contrário, vai para o Login
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;