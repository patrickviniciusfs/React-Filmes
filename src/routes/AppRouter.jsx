import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Feed from "../components/Feed/Index";
import Post from "../pages/post/Index";
import PrivateRoute from "./PrivateRoute"; // precisamos revisar aqui.

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de Autenticação */}
        <Route path="/" element={<Login />} />

        {/* essa parte abaix vai exibir o mainLayout com header e footer */}
        <Route 
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/novo" element={<Post />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}