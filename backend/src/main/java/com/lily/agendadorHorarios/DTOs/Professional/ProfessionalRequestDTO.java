package com.lily.agendadorHorarios.DTOs.Professional;

import jakarta.validation.constraints.NotBlank;

public record ProfessionalRequestDTO (@NotBlank String name){
}
