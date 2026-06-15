package com.reactfilmes.api.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "tb_comentarios")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String postagem;

    private Instant dataPostagem;

    private int likes;

    private String avatarUrl;

    private String filmeId; // Amarra o comentário ao ID retornado do TMDB no front
    
    
    public Comentario() {}

	public Comentario(Long id, String nome, String postagem, Instant dataPostagem, int likes, String avatarUrl,
			String filmeId) {
		super();
		this.id = id;
		this.nome = nome;
		this.postagem = postagem;
		this.dataPostagem = dataPostagem;
		this.likes = likes;
		this.avatarUrl = avatarUrl;
		this.filmeId = filmeId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getPostagem() {
		return postagem;
	}

	public void setPostagem(String postagem) {
		this.postagem = postagem;
	}

	public Instant getDataPostagem() {
		return dataPostagem;
	}

	public void setDataPostagem(Instant dataPostagem) {
		this.dataPostagem = dataPostagem;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getFilmeId() {
		return filmeId;
	}

	public void setFilmeId(String filmeId) {
		this.filmeId = filmeId;
	}
    
    
    
    
    
    
}