package com.lily.agendadorHorarios.Controllers.Auth;

import com.lily.agendadorHorarios.DTOs.Auth.LoginRequestDTO;
import com.lily.agendadorHorarios.DTOs.Auth.RegisterRequestDTO;
import com.lily.agendadorHorarios.DTOs.Auth.ResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.UserRepository;
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

            return ResponseEntity.ok(new ResponseDTO(user.getName(), user.getRole().toString()));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequestDTO body, HttpServletResponse response) {
        Optional<UserEntity> user = this.userRepository.findByEmail(body.email());
        if(user.isEmpty()) {
            UserEntity newUser = new UserEntity();
            // Criação do novo usuário no register
            newUser.setName(body.name());
            newUser.setEmail(body.email());
            newUser.setCpf(body.cpf());
            newUser.setPassword(passwordEncoder.encode(body.password()));

            this.userRepository.save(newUser);
            String token = tokenService.generateToken(newUser);

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60 * 8);
            response.addCookie(cookie);

            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
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
