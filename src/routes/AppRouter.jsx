import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import Login from '../pages/Login';
import Logout from '../pages/Logout'
import Feed from '../components/Feed/Index';
import Post from '../pages/post/Index';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Login />} />
         <Route path="/" element={<Logout/>}/>
           <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/novo" element={<Post />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}