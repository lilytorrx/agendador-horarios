package com.lily.agendadorHorarios.Services.ProfessionalServiceService;

import com.lily.agendadorHorarios.DTOs.ProfessionalService.ProfessionalServiceRequestDTO;
import com.lily.agendadorHorarios.DTOs.ProfessionalService.ProfessionalServiceResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.Professional.ProfessionalEntity;
import com.lily.agendadorHorarios.Infrastructure.Entity.ProfessionalService.ProfessionalServiceEntity;
import com.lily.agendadorHorarios.Infrastructure.Entity.Service.ServiceEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.ProfessionalRepository;
import com.lily.agendadorHorarios.Infrastructure.Repositories.ProfessionalServiceRepository;
import com.lily.agendadorHorarios.Infrastructure.Repositories.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessionalServiceService {
    private final ProfessionalServiceRepository professionalServiceRepository;
    private final ProfessionalRepository professionalRepository;
    private final ServiceRepository serviceRepository;

    public ProfessionalServiceResponseDTO vincular(ProfessionalServiceRequestDTO dto) {
        ProfessionalEntity professional = professionalRepository.findById(dto.professionalId())
                .orElseThrow(() -> new NotFoundException("Profissional não encontrado!"));

        ServiceEntity service = serviceRepository.findById(dto.serviceId())
                .orElseThrow(() -> new NotFoundException("Serviço não encontrado!"));

        ProfessionalServiceEntity entity = new ProfessionalServiceEntity();

        entity.setProfessional(professional);
        entity.setService(service);

        return toDTO(professionalServiceRepository.save(entity));
    }

    public List<ProfessionalServiceResponseDTO> listarPorProfissional(Long professionalId) {
        ProfessionalEntity professional = professionalRepository.findById(professionalId)
                .orElseThrow(() -> new NotFoundException("Profissional não encontrado!"));

        return professionalServiceRepository.findByProfessional(professional)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public void desvincular(Long id) {
        professionalServiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vínculo não encontrado!"));

        professionalServiceRepository.deleteById(id);
    }

    private ProfessionalServiceResponseDTO toDTO(ProfessionalServiceEntity dto) {
        return new ProfessionalServiceResponseDTO(
            dto.getId(),
            dto.getProfessional().getName(),
            dto.getService().getServiceName(),
            dto.getService().getDuration()
        );
    }
}
