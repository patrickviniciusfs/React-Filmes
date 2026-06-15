import { useSearchParams } from "react-router-dom";
import styles from "./ContactUs.module.css";
export default function ContactUs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nomeParam = searchParams.get("nome") || "";
  const mensagemParam = searchParams.get("mensagem") || "";

  const handleChange = (chave, valor) => {
    setSearchParams(
      (prev) => {
        if (valor) {
          prev.set(chave, valor);
        } else {
          prev.delete(chave);
        }
        return prev;
      },
      { replace: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mensagem enviada com sucesso por ${nomeParam}!`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fale Conosco</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Seu Nome:</label>
          <input
            id="nome"
            type="text"
            className={styles.input}
            placeholder="Digite seu nome"
            value={nomeParam}
            onChange={(e) => handleChange("nome", e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="mensagem">Mensagem ou Sugestão de Filme:</label>
          <textarea
            id="mensagem"
            className={styles.textarea}
            placeholder="Como podemos te ajudar?"
            value={mensagemParam}
            onChange={(e) => handleChange("mensagem", e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Enviar Mensagem
        </button>
      </form>

      {(nomeParam || mensagemParam.trim().length > 0) && (
        <div className={styles.previewBox}>
          <h3 style={{ margin: "0 0 10px 0", color: "var(--text)" }}>Visualização do Envio:</h3>
          {nomeParam && <p style={{ color: "var(--text)" }}><strong>Remetente:</strong> {nomeParam}</p>}
          {mensagemParam && <p style={{ color: "var(--text)" }}><strong>Conteúdo:</strong> {mensagemParam}</p>}
        </div>
      )}
    </div>
  );
}