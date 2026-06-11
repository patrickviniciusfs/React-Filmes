import styles from "./About.module.css";
import tmdbLogo from "../../assets/tmdb-logo.png";

export default function About() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Sobre o React Filmes</h1>

      <p className={styles.text}>
        O React Filmes é uma aplicação desenvolvida para explorar informações
        sobre filmes, permitindo que o usuário navegue por títulos populares e
        acesse detalhes de cada produção.
      </p>

      <p className={styles.text}>
        Este projeto foi criado como atividade prática de Desenvolvimento de Aplicações Multiplataforma, pelos alunos Kevin, Patrick, Rayla, Simone e Thiago Rocha, utilizando
        React, rotas, componentes e consumo de API.
      </p>

      <div className={styles.logoContainer}>
        <img
          src={tmdbLogo}
          alt="TMDB Logo"
          className={styles.logo}
        />

        <p className={styles.logoText}>
          Dados fornecidos pela API TMDB (The Movie Database).
          Não usado para fins comerciais, apenas para aprendizado e prática de desenvolvimento.
        </p>
      </div>

      <section className={styles.previewBox}>
        <h2>Tecnologias utilizadas</h2>
        <ul>
          <li>React</li>
          <li>React Router DOM</li>
          <li>JavaScript</li>
          <li>CSS Modules</li>
          <li>API TMDB</li>
        </ul>
      </section>
    </main>
  );
}

