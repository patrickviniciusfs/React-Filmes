package com.reactfilmes.api.dto;

import jakarta.validation.constraints.NotBlank;


public class ComentarioRequestDTO {

    @NotBlank(message = "O conteúdo do comentário é obrigatório.")
    private String postagem;

    @NotBlank(message = "O id do filme associado é obrigatório.")
    private String filmeId;

	public String getPostagem() {
		return postagem;
	}

	public void setPostagem(String postagem) {
		this.postagem = postagem;
	}

	public String getFilmeId() {
		return filmeId;
	}

	public void setFilmeId(String filmeId) {
		this.filmeId = filmeId;
	}

	
}