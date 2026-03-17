package com.lily.agendadorHorarios.DTOs.User;

public record UserUpdateRequestDTO(
        String name,
        String email,
        String password
) {
}
