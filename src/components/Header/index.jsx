import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [usuarioLogado, setUsuarioLogado] = useState("");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate()

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("username");
    if (nomeSalvo) {
      const nomeLimpo = nomeSalvo.split("@")[0];
      setUsuarioLogado(nomeLimpo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Remove token, username e limpa a sessão
    navigate("/"); // Redireciona de volta para a tela de login
  };

  const linkStyle = {
    color: 'var(--text)',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'opacity 0.2s ease'
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      borderBottom: theme === 'light' ? '1px solid #e0e0e0' : '1px solid #333',
      backgroundColor: theme === 'light' ? '#fafafa' : '#1e1e1e',
      transition: 'all 0.3s ease'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>React Filmes 🎬</h1>

      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={linkStyle}>Início</Link>
        <Link to="/about" style={linkStyle}>Sobre</Link>
        <Link to="/contact" style={linkStyle}>Contato</Link>
        <Link to="/details" style={linkStyle}>Detalhes</Link>
      </nav>

      <div className={styles.userSection} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {usuarioLogado && (
          <span className={styles.username}>
            {usuarioLogado}
          </span>
        )}
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Sair
        </button>

        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: theme === 'light' ? '#333' : '#f0f0f0',
            color: theme === 'light' ? '#fff' : '#333',
            transition: 'all 0.3s ease',
            fontWeight: 'bold'
          }}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}