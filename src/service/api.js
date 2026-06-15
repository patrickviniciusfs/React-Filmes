import axios from "axios";

// Cria a instância do Axios apontando para a porta 8080 do Spring Boot
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Interceptor de Requisição: Injeta o Token JWT em cada chamada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // É CRUCIAL ter o prefixo "Bearer " (com espaço) antes do token JWT
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta (NOVO): Trata erros globais (Looping de Login)
api.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida, apenas a retorna
    return response;
  },
  (error) => {
    // Se a API retornar 403 Forbidden ou 401 Unauthorized
    // significa que o Token é inválido ou expirou.
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      console.warn("🔐 Acesso negado pelo backend. Token JWT inválido ou expirado. Redirecionando para Login.");
      
      // Limpa os dados de sessão para quebrar o looping
      localStorage.removeItem("token");
      localStorage.removeItem("username");

      // Força o redirecionamento para o Login
      window.location.href = "/"; 
    }
    return Promise.reject(error);
  }
);

export default api;