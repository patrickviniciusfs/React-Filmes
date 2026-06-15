import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import PrivateRoute from './PrivateRoute';

// Importações com os nomes exatos das pastas físicas
import Home from '../pages/Home/index.jsx';         
import About from '../pages/About/index.jsx';       
import ContactUs from '../pages/ContactUS/index.jsx'; 
import Login from '../pages/Login/index.jsx';       
import Logout from '../pages/Logout/index.jsx';     
import Feed from '../pages/Feed/index.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Rotas protegidas */}
        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          
          {/* Rota unificada do Feed */}
          <Route path="feed/:filmeId" element={<Feed />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}