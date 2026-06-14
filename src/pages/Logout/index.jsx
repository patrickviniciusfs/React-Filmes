import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // limpar o usuario anteriorr
    localStorage.clear();
    
    // redirecionamento
    navigate("/");
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Saindo da sessão...</h2>
    </div>
  );
}