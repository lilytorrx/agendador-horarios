package com.lily.agendadorHorarios.Services.User;

import com.lily.agendadorHorarios.DTOs.User.UserResponseDTO;
import com.lily.agendadorHorarios.DTOs.User.UserUpdateRequestDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO buscarPorId(String id){
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuario não encontrado."));

        return toDTO(userEntity);
    }

    public UserResponseDTO editar(String id, UserUpdateRequestDTO dto) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuário não encontrado."));

        if(dto.name() != null) user.setName(dto.name());
        if(dto.email() != null) user.setEmail(dto.email());
        if(dto.password() != null) user.setPassword(passwordEncoder.encode(dto.password()));

        return toDTO(userRepository.save(user));
    }

    private UserResponseDTO toDTO(UserEntity userEntity){
        return new UserResponseDTO(
                userEntity.getId(),
                userEntity.getName(),
                userEntity.getEmail(),
                userEntity.getRole()
        );
    }
}
