import axios from "axios";


const apiMock = axios.create({
    baseURL: "https://6a2b27f5b687a7d5cbc4e770.mockapi.io/all/coments/:endpoint",
});

apiMock.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default apiMock