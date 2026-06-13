import { useEffect, useState } from "react";
import * as styles from "./Feed.module.css";
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
        console.log("Erro de requisição ao buscar comentários");
      });
  }, []);

  
  async function deleteComent(id) {
    try {
      await api.delete(`/comentario/${id}`);
      setComment(comment.filter((c) => c.id !== id));
    } catch (error) {
      console.log("Erro ao deletar comentário", error);
    }
  }

  function like(id) {
    setLikedId((prop) => {
      const proximo = new Set(prop);
      proximo.has(id) ? proximo.delete(id) : proximo.add(id);
      return proximo; 
    });
  }

  return (
    <div className={styles.feedContainer}>
      {comment.map((post) => {
        const liked = likedId.has(post.id);

        return (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.header}>
              {post.avatarUrl ? (
                <img
                  src={post.avatarUrl}
                  alt={post.nome}
                  className={styles.avatar}
                />
              ) : (
                <img
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${post.nome}`}
                  alt={post.nome}
                  className={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              
              <div className={styles.userInfo}>
                <p className={styles.userName}>{post.nome}</p>
                <p className={styles.postDate}>
                  {new Date(post.dataPostagem).toLocaleDateString("pt-br")}
                </p>
              </div>
            </div>
            
            <p className={styles.content}>{post.postagem}</p>

            <div className={styles.actions}>
              <button
                className={styles.actionBtn}
                style={{ color: liked ? likeActiveColor : likeColor }}
                onClick={() => like(post.id)}
              >
                <AiFillLike /> {liked ? post.like + 1 : post.like}
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