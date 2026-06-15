package com.reactfilmes.api.security;

import com.reactfilmes.api.security.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Captura o cabeçalho HTTP enviado pelo Axios do React
        String header = request.getHeader("Authorization");

        // Verifica se o cabeçalho existe e se começa estritamente com "Bearer " (com o espaço em branco)
        if (header != null && header.startsWith("Bearer ")) {
            // Recorta a string pulando os 7 caracteres iniciais para obter apenas o token JWT puro
            String token = header.substring(7);

            try {
                // Valida a assinatura e a expiração do token através do componente utilitário
                if (jwtUtil.isTokenValido(token)) {
                    String username = jwtUtil.getUsernameFromToken(token);

                    // Cria o objeto de autenticação aceito pelo Spring Security
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            username, null, Collections.emptyList()
                    );

                    // Injeta o usuário autenticado no contexto de segurança da requisição atual
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                // Em caso de token corrompido ou inválido, limpa o contexto para retornar 403 de forma segura
                SecurityContextHolder.clearContext();
            }
        }

        // Continua o fluxo normal da requisição na esteira de filtros do Spring
        filterChain.doFilter(request, response);
    }
}