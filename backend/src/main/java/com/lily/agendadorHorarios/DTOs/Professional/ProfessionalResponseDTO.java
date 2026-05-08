package com.lily.agendadorHorarios.DTOs.Professional;

import java.util.List;

public record ProfessionalResponseDTO(Long id, String name, String imageUrl, String profession, List<String> services) {
}
