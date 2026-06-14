import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const LIKE_ACTIVE_COLOR = '#e0245e';

// Extrai as duas primeiras iniciais de forma segura
function getInitials(name) {
  if (!name) return "";
  return name.trim().split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Ajustado de 4 dígitos para 6 dígitos para evitar transparência indesejada
  const likeColor = theme === 'dark' ? '#ffffff' : '#333333';

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg', '#121212');
      root.style.setProperty('--text', '#ffffff');
      root.style.setProperty('--bg-card', '#1e1e1e');
    } else {
      root.style.setProperty('--bg', '#ffffff');
      root.style.setProperty('--text', '#333333');
      root.style.setProperty('--bg-card', '#fafafa');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(p => p === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, likeColor, likeActiveColor: LIKE_ACTIVE_COLOR, getInitials }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);