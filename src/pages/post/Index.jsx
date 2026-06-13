import Feed from "../../components/Feed"
import api from "../../service/api";
import * as styles from "../post/Post.module.css"

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors} } = useForm();

  const addPost = (data) => {
    api
      .post("/comentario", data)
      .then(() => navigate("/details"))
      .catch(() => console.log("Erro de requisição"))
  };

  return (
    <div className={styles.pageWrapper}>
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
            className={`${styles.textarea} ${errors.text ? styles.inputError : ""}`}
            placeholder="O que você está pensando?"
            {...register("text", { required: "Escreva algo antes de publicar." })}
          />
          {errors.text && (
            <span className={styles.errorMsg}>{errors.text.message}</span>
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
