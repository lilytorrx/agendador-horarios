package com.lily.agendadorHorarios.Services.Professional;

import com.lily.agendadorHorarios.DTOs.Professional.ProfessionalRequestDTO;
import com.lily.agendadorHorarios.DTOs.Professional.ProfessionalResponseDTO;
import com.lily.agendadorHorarios.DTOs.Service.ServiceResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.Professional.ProfessionalEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.ProfessionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.shuffle;


@Service
@RequiredArgsConstructor
public class ProfessionalService {
    private final ProfessionalRepository professionalRepository;

    public ProfessionalResponseDTO create(ProfessionalRequestDTO dto) {
        ProfessionalEntity professional = new ProfessionalEntity();
        professional.setName(dto.name());
        professional.setImageUrl(dto.imageUrl());
        professional.setProfession(dto.profession());
        ProfessionalEntity saved = professionalRepository.save(professional);
        return toDTO(saved);
    }

    public List<ProfessionalResponseDTO> listarTodos() {
        return professionalRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();

    }

    public List<ProfessionalResponseDTO> getProfessionalsPublic() {
        List<ProfessionalResponseDTO> professionals = professionalRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        shuffle(professionals);

        return professionals.stream()
                .limit(2)
                .toList();
    }

    public ProfessionalResponseDTO buscarPorId(Long id) {
        ProfessionalEntity professional = professionalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Profissional não encontrado."));

        return toDTO(professional);
    }

    public ProfessionalResponseDTO editar(Long id, ProfessionalRequestDTO dto) {
        ProfessionalEntity professional = professionalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Profissional não encontrado!"));

        professional.setName(dto.name());
        professional.setProfession(dto.profession());
        professional.setImageUrl(dto.imageUrl());
        return toDTO(professionalRepository.save(professional));
    }

    public void deletar(Long id) {
        ProfessionalEntity professional = professionalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Profissional não encontrado!"));

        professionalRepository.delete(professional);
    }

    private ProfessionalResponseDTO toDTO(ProfessionalEntity entity) {
        return new ProfessionalResponseDTO(entity.getId(), entity.getName(), entity.getImageUrl(), entity.getProfession());
    }
}
