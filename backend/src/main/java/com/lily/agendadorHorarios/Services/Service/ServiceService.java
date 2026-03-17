package com.lily.agendadorHorarios.Services.Service;

import com.lily.agendadorHorarios.DTOs.Service.ServiceRequestDTO;
import com.lily.agendadorHorarios.DTOs.Service.ServiceResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.Service.ServiceEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository serviceRepository;

    public ServiceResponseDTO criar(ServiceRequestDTO dto) {
        ServiceEntity service = new ServiceEntity();
        service.setServiceName(dto.serviceName());
        service.setDuration(dto.duration());
        return toDTO(serviceRepository.save(service));
    }

    public List<ServiceResponseDTO> listarTodos(){
        return serviceRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public ServiceResponseDTO buscarPorId(Long id) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Serviço não encontrado!"));
        return toDTO(service);
    }

    public ServiceResponseDTO editar(Long id, ServiceRequestDTO dto) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Serviço não encontrado!"));
        service.setServiceName(dto.serviceName());
        service.setDuration(dto.duration());
        return toDTO(serviceRepository.save(service));
    }

    public void deletar(Long id) {
        ServiceEntity service = serviceRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("Serviço não encontrado!"));
        serviceRepository.deleteById(id);
    }


    public ServiceResponseDTO toDTO(ServiceEntity entity) {
        return new ServiceResponseDTO(entity.getId(), entity.getServiceName(), entity.getDuration());
    }
}
