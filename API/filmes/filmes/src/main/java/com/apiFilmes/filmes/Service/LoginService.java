package com.apiFilmes.filmes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apiFilmes.filmes.Model.Login;
import com.apiFilmes.filmes.Repository.LoginRepository;


@Service
public class LoginService {

	

	@Autowired
	private LoginRepository loginRepository;

	public List<Login> buscaLogins(){
		return loginRepository.findAll();
		
	}

	public Optional<Login> buscaLogin(Long id) {
		return loginRepository.findById(id);
	}

	public Login  savarLogin(Login login) {
		return loginRepository.save(login);
	}

	public Login  atualizar(Login  login, Long id) {
		Login LoginPresente = loginRepository.findById(id).orElseThrow(() -> new RuntimeException("dados não encontrado com o id" + id));
		
		LoginPresente.setEmail(login.getEmail());
		LoginPresente.setSenha(login.getSenha());


	 return loginRepository.save(LoginPresente);
	}

	public void deletar(Long id) {
		loginRepository.deleteById(id);
	}

	
}
