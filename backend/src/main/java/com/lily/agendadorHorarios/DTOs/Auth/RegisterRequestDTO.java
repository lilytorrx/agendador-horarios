package com.lily.agendadorHorarios.DTOs.Auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
        @NotBlank String name,
        @Email @NotBlank String email,
        @NotBlank @Size(min=6) String password,
        @NotBlank @Size(min = 11, max = 11) String cpf
) {
}
