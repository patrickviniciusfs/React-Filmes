import Header from '../Header';
import Footer from '../Footer/index'

export default function MainLayout({ children }) {
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
        {children}
      </main>
      <Footer />
    </div>
  );
}