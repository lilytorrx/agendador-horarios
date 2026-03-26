package com.lily.agendadorHorarios.DTOs.Auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequestDTO(@NotBlank String email, @NotBlank @Size(min=6) String password) {
}
