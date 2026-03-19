package com.lily.agendadorHorarios.Controllers.Auth;

import com.lily.agendadorHorarios.DTOs.Auth.LoginRequestDTO;
import com.lily.agendadorHorarios.DTOs.Auth.RegisterRequestDTO;
import com.lily.agendadorHorarios.DTOs.Auth.ResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.UserRepository;
import com.lily.agendadorHorarios.Services.Security.TokenService;
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
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        UserEntity user = this.userRepository.findByEmail(body.email()).orElseThrow(() -> new NotFoundException("Usuário não encontrado."));
        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        Optional<UserEntity> user = this.userRepository.findByEmail(body.email());
        if(user.isEmpty()) {
            UserEntity newUser = new UserEntity();
            // Criação do novo usuário no register
            newUser.setName(body.name());
            newUser.setEmail(body.email());
            newUser.setPassword(passwordEncoder.encode(body.password()));

            UserEntity saved = this.userRepository.save(newUser);
            System.out.println("USUÁRIO SALVO: " + saved.getId());
            String token = tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

}
