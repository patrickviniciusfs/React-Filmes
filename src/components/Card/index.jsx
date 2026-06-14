import { useEffect, useState } from 'react';
import apiFilmes from '../../service/apiFilmes';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ query }) {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semResultado, setSemResultado] = useState(false);

  useEffect(() => {
    async function carregarFilmes() {
      setLoading(true);
      setSemResultado(false);

      try {
        let resultados = [];
        const buscando = query && query.trim() !== '';

        if (buscando) {
          const response = await apiFilmes.get("/search/movie", {
            params: { query: query.trim(), page: 1 }
          });
          
          resultados = response.data.results || [];
        } else {
          const response = await apiFilmes.get("/movie/popular", {
            params: { page: 1 }
          });
          resultados = response.data.results || [];
        }

        setFilmes(resultados);
        setSemResultado(resultados.length === 0);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error.message);
        setSemResultado(true);
      } finally {
        setLoading(false);
      }
    }

    carregarFilmes();
  }, [query]);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Carregando filmes...</h2>;
  if (semResultado) return <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Nenhum filme encontrado para "{query}".</h2>;

  return (
    <div className={styles.galeria}>
      {filmes.map((filme) => (
        <div key={filme.id} className={styles.card}>
          <h3>{filme.title}</h3>
          {filme.poster_path ? (
            <Link to={`/details/${filme.id}`} style={{ width: '100%' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                alt={filme.title}
                className={styles.img}
              />
            </Link>
          ) : (
            <div className={styles.semFoto}>Sem Imagem</div>
          )}
        </div>
      ))}
    </div>
  );
}