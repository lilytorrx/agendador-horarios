package com.lily.agendadorHorarios.DTOs.Professional;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProfessionalRequestDTO (@NotBlank @NotNull String name, @NotBlank String profession, @NotNull @NotBlank String imageUrl) {
}
