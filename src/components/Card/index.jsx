import { useEffect, useState } from 'react';
import apiFilmes from '../../service/apiFilmes';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const response = await apiFilmes.get("/movie/popular", {
          params: { page: 1 }
        });
        setFilmes(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao carregar os filmes", error);
        setLoading(false);
      }
    }
    carregarFilmes();
  }, []);

  if (loading) {
    return <h2>Carregando filmes ...</h2>;
  }

  return (
    <div className={styles.galeria}>
      {filmes.map((filme) => (
        <div key={filme.id} className={styles.card}>
          <h3>{filme.title}</h3>
          
          {filme.poster_path ? (
            <Link to={`/details/${filme.id}`}>
            <img 
              src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} 
              alt={filme.title} 
              className={styles.img} />
            </Link>
          ) : (
            <div className={styles.semFoto}>Sem Imagem</div>
          )}
        </div>
      ))}
    </div>
  );
}
