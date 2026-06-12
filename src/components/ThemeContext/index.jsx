import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const LIKE_ACTIVE_COLOR = '#e0245e';

function getInitials(name) {
  return name ?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const likeColor = theme == 'dark' ? '#ffff' : '#3333';

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg', '#121212');
      root.style.setProperty('--text', '#ffffff');
    }
    else {
      root.style.setProperty('--bg', '#ffffff');
      root.style.setProperty('--text', '#333333');
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