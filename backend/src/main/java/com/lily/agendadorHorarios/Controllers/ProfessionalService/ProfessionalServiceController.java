package com.lily.agendadorHorarios.Controllers.ProfessionalService;

import com.lily.agendadorHorarios.DTOs.ProfessionalService.ProfessionalServiceRequestDTO;
import com.lily.agendadorHorarios.DTOs.ProfessionalService.ProfessionalServiceResponseDTO;
import com.lily.agendadorHorarios.Services.ProfessionalServiceService.ProfessionalServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professional-services")
@RequiredArgsConstructor
public class ProfessionalServiceController {
    private final ProfessionalServiceService service;

    @PostMapping
    public ResponseEntity<ProfessionalServiceResponseDTO> vincular(@RequestBody ProfessionalServiceRequestDTO dto) {
        return ResponseEntity.ok(service.vincular(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProfessionalServiceResponseDTO>> listarPorProfissional(@PathVariable Long professionalId) {
        return ResponseEntity.ok(service.listarPorProfissional(professionalId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.desvincular(id);
        return ResponseEntity.noContent().build();
    }
}
