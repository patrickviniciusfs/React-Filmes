import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import VLibras from '../VLibras';
export default function MainLayout() {
  return (
    <div style={{ 
      backgroundColor: 'var(--bg)', 
      color: 'var(--text)', 
      minHeight: '100vh', 
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <main style={{ padding: '30px', flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

      {/* VLibras vai para todas as paginas */}
      <VLibras />
    </div>
  );
}