package com.lily.agendadorHorarios.DTOs.Auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
        @NotBlank String name,
        @Email @NotBlank String email,
        @Pattern(regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$",
                message = "Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um símbolo.")
        @NotBlank @Size(min=6) String password,
        @NotBlank @Size(min = 14, max = 14) String cpf
) {
}
