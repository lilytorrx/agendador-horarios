package com.lily.agendadorHorarios.Controllers.User;

import com.lily.agendadorHorarios.DTOs.User.UserResponseDTO;
import com.lily.agendadorHorarios.DTOs.User.UserUpdateRequestDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import com.lily.agendadorHorarios.Services.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @GetMapping
    public ResponseEntity<UserResponseDTO> buscarDados(@AuthenticationPrincipal UserDetails user){
        UserEntity userEntity = (UserEntity) user;
        return ResponseEntity.ok(service.buscarPorId(userEntity.getId()));
    }

    @PutMapping
    public ResponseEntity<UserResponseDTO> editar(@AuthenticationPrincipal UserDetails user, @RequestBody UserUpdateRequestDTO dto) {
        UserEntity userEntity = (UserEntity) user;
        return ResponseEntity.ok(service.editar(userEntity.getId(), dto));
    }
}
