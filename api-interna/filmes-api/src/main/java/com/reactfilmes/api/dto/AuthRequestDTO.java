package com.reactfilmes.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;



public class AuthRequestDTO {

    @NotBlank(message = "O e-mail não pode estar vazio.")
    @Email(message = "Forneça um formato de e-mail válido.")
    private String email;

    @NotBlank(message = "A senha não pode estar vazia.")
    @Size(min = 4, message = "A senha precisa ter no mínimo 4 caracteres.")
    private String senha;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	
}