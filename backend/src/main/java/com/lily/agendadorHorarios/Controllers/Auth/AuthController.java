package com.lily.agendadorHorarios.Controllers.Auth;

import com.lily.agendadorHorarios.DTOs.Auth.LoginRequestDTO;
import com.lily.agendadorHorarios.DTOs.Auth.RegisterRequestDTO;
import com.lily.agendadorHorarios.DTOs.Auth.ResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.BusinessException;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.ConflictException;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.UnauthorizedException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.UserRepository;
import com.lily.agendadorHorarios.Infrastructure.Utils.CpfValidator;
import com.lily.agendadorHorarios.Services.Security.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body, HttpServletResponse response){
        UserEntity user = this.userRepository.findByEmail(body.email()).orElseThrow(() -> new NotFoundException("Usuário não encontrado."));

        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60 * 8);

            response.addCookie(cookie);

            return ResponseEntity.ok(new ResponseDTO(user.getName(), user.getRole().toString(), "Usuário logado."));
        } else {
            throw new UnauthorizedException("Usuário ou senha inválidos.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody RegisterRequestDTO body, HttpServletResponse response) {
        if (userRepository.findByEmail(body.email()).isPresent()) {
            throw new ConflictException("E-mail já cadastrado.");
        }
        Optional<UserEntity> user = this.userRepository.findByEmail(body.email());
        if(user.isEmpty()) {
            UserEntity newUser = new UserEntity();
            // Criação do novo usuário no register
            newUser.setName(body.name());
            newUser.setEmail(body.email());
            newUser.setCpf(body.cpf());
            newUser.setPassword(passwordEncoder.encode(body.password()));

            if (!CpfValidator.isValid(body.cpf())) throw new BusinessException("CPF inválido.");
            this.userRepository.save(newUser);
            String token = tokenService.generateToken(newUser);

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60 * 8);
            response.addCookie(cookie);

            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), newUser.getRole().toString(), "Usuário cadastrado com sucesso!"));
        } else {
            throw new ConflictException("Usuário já cadastrado!");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }

}
