package com.apiFilmes.filmes.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apiFilmes.filmes.Model.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
    Optional<Login> findByEmail(String email);
}
