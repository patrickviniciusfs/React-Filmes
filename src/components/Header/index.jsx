import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [usuarioLogado, setUsuarioLogado] = useState("");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("username");
    if (nomeSalvo) {
      const nomeLimpo = nomeSalvo.split("@")[0];
      setUsuarioLogado(nomeLimpo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Redireciona para Login
  };

  return (
    <header className={`${styles.header} ${theme === 'light' ? styles.headerLight : styles.headerDark}`}>
      <h1 className={styles.logo}>React Filmes 🎬</h1>

      <nav className={styles.nav}>
        <Link to="/home" className={styles.link}>Início</Link>
        <Link to="/feed" className={styles.link}>Feed</Link>
        <Link to="/about" className={styles.link}>Sobre</Link>
        <Link to="/contact" className={styles.link}>Contato</Link>
      </nav>

      <div className={styles.userSection}>
        {usuarioLogado && (
          <span className={styles.username}>
            Olá, {usuarioLogado}
          </span>
        )}
        
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Sair
        </button>

        <button
          onClick={toggleTheme}
          className={`${styles.themeBtn} ${theme === 'light' ? styles.themeBtnLight : styles.themeBtnDark}`}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}