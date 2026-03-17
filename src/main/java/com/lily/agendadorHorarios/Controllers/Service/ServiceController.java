package com.lily.agendadorHorarios.Controllers.Service;

import com.lily.agendadorHorarios.DTOs.Service.ServiceRequestDTO;
import com.lily.agendadorHorarios.DTOs.Service.ServiceResponseDTO;
import com.lily.agendadorHorarios.Services.Service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {
    private final ServiceService service;

    @PostMapping
    public ResponseEntity<ServiceResponseDTO> criar(@RequestBody ServiceRequestDTO dto) {
        return ResponseEntity.ok(service.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<ServiceResponseDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponseDTO> editar(@PathVariable Long id, @RequestBody ServiceRequestDTO dto) {
        return ResponseEntity.ok(service.editar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
