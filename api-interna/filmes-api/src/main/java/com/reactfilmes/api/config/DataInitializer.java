package com.reactfilmes.api.config;

import com.reactfilmes.api.model.Comentario;
import com.reactfilmes.api.model.Usuario;
import com.reactfilmes.api.repository.ComentarioRepository;
import com.reactfilmes.api.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner startDatabase(UsuarioRepository usuarioRepo,
                                    ComentarioRepository comentarioRepo,
                                    PasswordEncoder encoder) {
        return args -> {
            // 1. Cria um usuário padrão configurado como 'teste@teste.com'
            if (usuarioRepo.count() == 0) {
                Usuario user = new Usuario();
                user.setEmail("teste@teste.com"); // Alterado para teste
                user.setSenha(encoder.encode("1234")); // Mantivemos a senha 1234 para o teste
                usuarioRepo.save(user);
                System.out.println("🚀 Carga Inicial: Usuário 'teste@teste.com' (senha: 1234) criado com sucesso!");
            }

            // 2. Cria comentários de demonstração com o nome do autor modificado para 'teste'
            if (comentarioRepo.count() == 0) {
                // Comentário para o Filme ID 27205 (Inception / A Origem)
                Comentario c1 = new Comentario();
                c1.setNome("teste"); // Alterado para teste
                c1.setPostagem("Esse filme é simplesmente genial! O final sempre me deixa pensando.");
                c1.setDataPostagem(Instant.now());
                c1.setLikes(5);
                c1.setAvatarUrl("");
                c1.setFilmeId("27205");
                comentarioRepo.save(c1);

                // Comentário para o Filme ID 155 (The Dark Knight)
                Comentario c2 = new Comentario();
                c2.setNome("teste"); // Alterado para teste
                c2.setPostagem("O Coringa do Heath Ledger é a maior atuação da história dos filmes de heróis.");
                c2.setDataPostagem(Instant.now());
                c2.setLikes(12);
                c2.setAvatarUrl("");
                c2.setFilmeId("155");
                comentarioRepo.save(c2);

                System.out.println("📝 Carga Inicial: Comentários de demonstração inseridos no H2!");
            }
        };
    }
}