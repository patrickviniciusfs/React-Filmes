package com.reactfilmes.api.controller;

import com.reactfilmes.api.dto.ComentarioRequestDTO;
import com.reactfilmes.api.model.Comentario;
import com.reactfilmes.api.repository.ComentarioRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/comentario")
public class ComentarioController {

    private final ComentarioRepository comentarioRepository;

    public ComentarioController(ComentarioRepository comentarioRepository) {
        this.comentarioRepository = comentarioRepository;
    }

    // Busca comentários baseados estritamente no ID do filme clicado no front-end
    @GetMapping("/filme/{filmeId}")
    public ResponseEntity<List<Comentario>> listarPorFilme(@PathVariable String filmeId) {
        return ResponseEntity.ok(comentarioRepository.findByFilmeId(filmeId));
    }

    @PostMapping
    public ResponseEntity<Comentario> criar(@Valid @RequestBody ComentarioRequestDTO dto) {
        // Pega o e-mail do usuário autenticado direto do Token JWT de forma segura
        String emailAutenticado = SecurityContextHolder.getContext().getAuthentication().getName();
        String nomeAutor = emailAutenticado.split("@")[0];

        Comentario comentario = new Comentario();
        comentario.setNome(nomeAutor);
        comentario.setPostagem(dto.getPostagem());
        comentario.setFilmeId(dto.getFilmeId());
        comentario.setDataPostagem(Instant.now());
        comentario.setLikes(0);
        comentario.setAvatarUrl(""); // O front cuidará de renderizar a inicial caso vazio

        return ResponseEntity.ok(comentarioRepository.save(comentario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!comentarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        comentarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}