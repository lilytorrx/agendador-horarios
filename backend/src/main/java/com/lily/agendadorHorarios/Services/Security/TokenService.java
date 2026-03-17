package com.lily.agendadorHorarios.Services.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(UserEntity user) {
        try {
            // Criptografia em HASH utilizando chave privada
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = JWT.create().
                    withIssuer("agendadorHorarios")
                    .withSubject(user.getEmail())
                    .withExpiresAt(this.generateTokenExpirationDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar JWT.");
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            // Validação do token
            return JWT.require(algorithm)
                    .withIssuer("agendadorHorarios")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }

    private Instant generateTokenExpirationDate() {
        // Gera data de expiração após 2 horas de autenticação
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-3"));
    }
}
