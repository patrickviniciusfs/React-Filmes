package com.reactfilmes.api.repository;

import com.reactfilmes.api.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    // Busca comentários filtrados unicamente pelo filme selecionado no React
    List<Comentario> findByFilmeId(String filmeId);
}