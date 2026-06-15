import { ThemeProvider } from './components/ThemeContext';
import VLibras from './components/VLibras';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
      <VLibras />
    </ThemeProvider>
  );
}

export default App;