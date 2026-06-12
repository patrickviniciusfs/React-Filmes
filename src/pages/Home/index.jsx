import { useState } from 'react';
import Card from '../../components/Card';
import FilterByNome from '../../components/FilterByNome';

export default function Home() {
  const [query, setQuery] = useState(''); 

  return (
    <div>
      <FilterByNome onSearch={setQuery} />
      <h2>🎬 Lista de Filmes Populares</h2>
      <Card query={query} />

    </div>
  );
}