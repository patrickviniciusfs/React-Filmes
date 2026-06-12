package com.apiFilmes.filmes.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apiFilmes.filmes.Model.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario,Long> {

}
