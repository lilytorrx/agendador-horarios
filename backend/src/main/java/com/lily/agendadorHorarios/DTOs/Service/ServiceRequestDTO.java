package com.lily.agendadorHorarios.DTOs.Service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ServiceRequestDTO(@NotBlank @NotNull String serviceName, @NotNull @NotBlank Integer duration) {
}
