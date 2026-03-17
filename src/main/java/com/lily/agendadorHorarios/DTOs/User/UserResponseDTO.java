package com.lily.agendadorHorarios.DTOs.User;

import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserRole;

public record UserResponseDTO(
        String id,
        String name,
        String email,
        UserRole role

) {
}
