package com.reactfilmes.api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // Chave secreta estática e segura de 256 bits (Mínimo de 32 caracteres para evitar exceções do JJWT)
    private static final String SECRET_KEY_STRING = "umaChaveSecretaMuitoLongaEExtremamenteSeguraParaOProjetoFilmes2026!";
    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes(StandardCharsets.UTF_8));

    // Tempo de expiração do Token: 24 Horas (em milissegundos)
    private static final long EXPIRATION_TIME = 86400000;

    // Gera o Token JWT contendo o e-mail do Usuário autenticado
    public String gerarToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // Valida se o Token foi assinado com a nossa chave e se não está expirado
    public boolean isTokenValido(String token) {
        try {
            Claims claims = getClaims(token);
            Date expiration = claims.getExpiration();
            return expiration.after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // Extrai o e-mail (Subject) de dentro do Token recebido
    public String getUsernameFromToken(String token) {
        return getClaims(token).getSubject();
    }

    // Método auxiliar para ler as Claims (propriedades internas) do Token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}