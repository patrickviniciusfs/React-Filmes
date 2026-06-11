import { ThemeProvider } from './components/ThemeContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;