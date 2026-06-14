import { useEffect, useState } from "react";
import styles from "./Feed.module.css"; // Correção na importação padrão
import { AiFillLike } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTheme } from "../ThemeContext";
import api from "../../service/api";

export default function Feed() {
  const [comment, setComment] = useState([]);
  const [likedId, setLikedId] = useState(new Set());
  const { likeColor, likeActiveColor, getInitials } = useTheme();

  useEffect(() => {
    api
      .get("/comentario")
      .then((response) => {
        setComment(response.data);
      })
      .catch(() => {
        console.error("Erro de requisição ao buscar comentários do Spring Boot");
      });
  }, []);

  function deleteComent(id) {
    api.delete(`/comentario/${id}`)
      .then(() => {
        setComment(comment.filter((item) => item.id !== id));
      })
      .catch(() => console.error("Erro ao deletar comentário."));
  }

  function like(id) {
    setLikedId((prev) => {
      const proximo = new Set(prev);
      if (proximo.has(id)) {
        proximo.delete(id);
      } else {
        proximo.add(id);
      }
      return proximo;
    });
  }

  return (
    <div className={styles.feedContainer}>
      {comment.map((post) => {
        const liked = likedId.has(post.id);

        return (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.postHeader}>
              {post.avatarUrl ? (
                <img
                  src={post.avatarUrl}
                  alt={post.nome}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {getInitials(post.nome || "User")}
                </div>
              )}
              <div>
                <p className={styles.authorName}>{post.nome || "Anônimo"}</p>
                <p className={styles.postDate}>
                  {new Date(post.dataPostagem).toLocaleDateString("pt-br")}
                </p>
              </div>
            </div>
            
            <p className={styles.postContent}>{post.postagem}</p>

            <div className={styles.postActions}>
              <button
                className={styles.actionBtn}
                style={{ color: liked ? likeActiveColor : likeColor }}
                onClick={() => like(post.id)}
              >
                <AiFillLike /> <span>{liked ? post.like + 1 : post.like}</span>
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteComent(post.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}