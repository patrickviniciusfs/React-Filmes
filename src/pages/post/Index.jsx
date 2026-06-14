import Feed from "../../components/Feed"
import api from "../../service/api";
import styles from "./Post.module.css";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const addPost = (data) => {
    // recupera o usuário logado
    const emailLogado = localStorage.getItem("username") || "Anônimo";
    const nomeAutor = emailLogado.split("@")[0];

    
    const novoComentario = {
      nome: nomeAutor,
      postagem: data.postagem,
      dataPostagem: new Date().toISOString(),
      like: 0,
      avatarUrl: ""
    };

    api
      .post("/comentario", novoComentario)
      .then(() => {
        navigate("/feed");
      })
      .catch((err) => {
        console.error("Erro de requisição ao salvar post:", err);
      });
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Exibe o Feed de fundo para dar o efeito de modal sobreposto */}
      <Feed />

      <div 
        className={styles.overlay} 
        onClick={() => navigate(-1)} 
      />

      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Nova publicação</h2>
          <button 
            className={styles.closeBtn}
            onClick={() => navigate(-1)}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(addPost)} className={styles.form}>
          <textarea
            className={`${styles.textarea} ${errors.postagem ? styles.inputError : ""}`}
            placeholder="O que você está pensando?"
            {...register("postagem", { required: "Escreva algo antes de publicar." })}
          />
          {errors.postagem && (
            <span className={styles.errorMsg}>{errors.postagem.message}</span>
          )}

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => navigate(-1)}
            >
              Descartar
            </button>
            <button 
              type="submit" 
              className={styles.submitBtn}
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
}