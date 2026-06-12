import { useState } from 'react';
import styles from './FilterByNome.module.css';

export default function FilterByNome({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    const valor = e.target.value;
    setQuery(valor);
    if (valor.trim() === '') {
      onSearch(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query.trim());
    }
  }

  function handleLimpar() {
    setQuery('');
    onSearch(null);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Buscar filme por nome..."
          value={query}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.btnBuscar}>Buscar</button>
        {query && (
          <button type="button" onClick={handleLimpar} className={styles.btnLimpar}>✕</button>
        )}
      </form>
    </div>
  );
}