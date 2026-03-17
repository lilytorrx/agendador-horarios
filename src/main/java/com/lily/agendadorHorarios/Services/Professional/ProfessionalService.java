package com.lily.agendadorHorarios.Services.Professional;

import com.lily.agendadorHorarios.DTOs.Professional.ProfessionalRequestDTO;
import com.lily.agendadorHorarios.DTOs.Professional.ProfessionalResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.Professional.ProfessionalEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.ProfessionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ProfessionalService {
    private final ProfessionalRepository professionalRepository;

    public ProfessionalResponseDTO create(ProfessionalRequestDTO dto) {
        ProfessionalEntity professional = new ProfessionalEntity();
        professional.setName(dto.name());
        ProfessionalEntity saved = professionalRepository.save(professional);
        return toDTO(saved);
    }

    public List<ProfessionalResponseDTO> listarTodos() {
        return professionalRepository.findAll()
                .stream()
                .map(this::toDTO)
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
        return toDTO(professionalRepository.save(professional));
    }

    public void deletar(Long id) {
        ProfessionalEntity professional = professionalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Profissional não encontrado!"));

        professionalRepository.delete(professional);
    }

    private ProfessionalResponseDTO toDTO(ProfessionalEntity entity) {
        return new ProfessionalResponseDTO(entity.getId(), entity.getName());
    }
}
