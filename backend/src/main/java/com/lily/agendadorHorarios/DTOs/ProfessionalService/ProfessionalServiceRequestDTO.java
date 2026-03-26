package com.lily.agendadorHorarios.DTOs.ProfessionalService;

import jakarta.validation.constraints.NotBlank;

public record ProfessionalServiceRequestDTO(@NotBlank Long professionalId, @NotBlank Long serviceId) {
}
