import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../components/ThemeContext"; // Ajuste o caminho do Context se necessário
import api from "../../service/api";
import apiFilmes from "../../service/apiFilmes";
import PostCard from "../../components/Post/PostCard";
import PostForm from "../../components/Post/PostForm";
import styles from "./Feed.module.css";

export default function Feed() {
  const { filmeId } = useParams();
  const [dadosFilme, setDadosFilme] = useState(null);
  const [comment, setComment] = useState([]);
  const [likedId, setLikedId] = useState(new Set());
  const { likeColor, likeActiveColor, getInitials } = useTheme();

  const carregarDadosDoFeed = () => {
    if (!filmeId || filmeId === "undefined") return;

    apiFilmes.get(`/movie/${filmeId}`)
      .then((response) => setDadosFilme(response.data))
      .catch((err) => console.error("Erro TMDB ao buscar filme:", err));

    api.get(`/comentario/filme/${filmeId}`)
      .then((response) => setComment(response.data))
      .catch((err) => console.error("Erro ao buscar comentários:", err));
  };

  useEffect(() => {
    carregarDadosDoFeed();
  }, [filmeId]);

  const handleEnviarComentario = (data) => {
    const novoComentario = {
      postagem: data.postagem,
      filmeId: filmeId
    };

    api.post("/comentario", novoComentario)
      .then(() => carregarDadosDoFeed())
      .catch((err) => console.error("Erro ao publicar comentário:", err));
  };

  const deleteComent = (id) => {
    api.delete(`/comentario/${id}`)
      .then(() => setComment(comment.filter((item) => item.id !== id)))
      .catch((err) => console.error("Erro ao deletar comentário:", err));
  };

  const like = (id) => {
    setLikedId((prev) => {
      const proximo = new Set(prev);
      if (proximo.has(id)) proximo.delete(id);
      else proximo.add(id);
      return proximo;
    });
  };

  return (
    <div className={styles.containerGeral}>
      
      {/* COLUNA ESQUERDA: Filme (Layout estático da página) */}
      {dadosFilme && (
        <div className={styles.colunaFilme}>
          {dadosFilme.poster_path && (
            <img 
              src={`https://image.tmdb.org/t/p/w300${dadosFilme.poster_path}`} 
              alt={dadosFilme.title} 
              className={styles.poster}
            />
          )}
          <h1 className={styles.tituloFilme}>{dadosFilme.title}</h1>
          <p className={styles.notaFilme}>⭐ {dadosFilme.vote_average?.toFixed(1)} / 10</p>
          <p className={styles.sinopseFilme}>{dadosFilme.overview || "Nenhuma sinopse disponível."}</p>
        </div>
      )}

      {/* COLUNA DIREITA: Seção Dinâmica dos Componentes de Post */}
      <div className={styles.colunaComunidade}>
        
        {/* Componente 1: Formulário de Entrada */}
        <PostForm onEnviar={handleEnviarComentario} />

        <hr className={styles.divisor} />
        <h2 className={styles.tituloSessao}>Comunidade & Avaliações</h2>

        {comment.length === 0 ? (
          <p className={styles.semComentarios}>Seja o primeiro a comentar sobre este filme!</p>
        ) : (
          <div className={styles.listaComentarios}>
            {comment.map((post) => (
              /* Componente 2: Card de Saída mapeado */
              <PostCard
                key={post.id}
                post={post}
                liked={likedId.has(post.id)}
                likeColor={likeColor}
                likeActiveColor={likeActiveColor}
                getInitials={getInitials}
                onLike={like}
                onDelete={deleteComent}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}