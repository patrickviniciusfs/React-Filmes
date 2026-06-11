import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact_Us from '../pages/Contact_US';
import Details from '../pages/Details';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact_Us/>}/>
          <Route path="/details" element={<Details/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}