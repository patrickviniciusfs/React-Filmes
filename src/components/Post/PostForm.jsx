import { useForm } from "react-hook-form";
import styles from "../../pages/Feed/Feed.module.css";

export default function PostForm({ onEnviar }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    onEnviar(data);
    reset();
  };

  return (
    <div className={styles.caixaCriarPost}>
      <h2>Nova publicação</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className={`${styles.campoTexto} ${errors.postagem ? styles.inputError : ""}`}
          placeholder="O que está a pensar sobre este filme?"
          {...register("postagem", { required: "Escreva algo antes de publicar." })}
        />
        {errors.postagem && <span className={styles.erroValidacao}>{errors.postagem.message}</span>}
        <div className={styles.botoesForm}>
          <button type="submit" className={styles.btnPublicar}>Publicar</button>
        </div>
      </form>
    </div>
  );
}