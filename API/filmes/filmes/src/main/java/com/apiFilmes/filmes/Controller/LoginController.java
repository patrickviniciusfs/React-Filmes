package com.apiFilmes.filmes.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apiFilmes.filmes.Model.Login;
import com.apiFilmes.filmes.Service.LoginService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@Operation(summary="Listar logins")
	@GetMapping
	public ResponseEntity<List<Login>> listarLogins(){
		return ResponseEntity.ok(loginService.buscaLogins());
		 
	}
	
	@Operation(summary="Buscar login por id")
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Login>> listarLogin(@PathVariable Long id){
		return ResponseEntity.ok(loginService.buscaLogin(id));
		 
	}
	@Operation(summary="Criar login")
	
	@PostMapping
	public ResponseEntity<Login> salvarLogin(@Valid @RequestBody Login login){
		return ResponseEntity.status(HttpStatus.CREATED).body(loginService.savarLogin(login));
		
	}
	
	@Operation(summary="Atualizar dados de login")
	
	@PutMapping("/{id}")
	public ResponseEntity<Login> atualizarLogin(@Valid @RequestBody Login login, @PathVariable Long id){
		return ResponseEntity.ok( loginService.atualizar(login, id));
	}
	
	@Operation(summary="Deletar login")
	
	@DeleteMapping
	public void deletar(@PathVariable Long id){
	 loginService.deletar(id);
	}


}
