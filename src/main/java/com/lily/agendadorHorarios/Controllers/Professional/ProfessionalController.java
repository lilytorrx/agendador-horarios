package com.lily.agendadorHorarios.Controllers.Professional;

import com.lily.agendadorHorarios.DTOs.Professional.ProfessionalRequestDTO;
import com.lily.agendadorHorarios.DTOs.Professional.ProfessionalResponseDTO;
import com.lily.agendadorHorarios.Services.Professional.ProfessionalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professionals")
@RequiredArgsConstructor
public class ProfessionalController {

    private final ProfessionalService service;

    @PostMapping
    public ResponseEntity<ProfessionalResponseDTO> criar(@RequestBody ProfessionalRequestDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProfessionalResponseDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessionalResponseDTO> buscarPorId(@PathVariable Long id, @RequestBody ProfessionalRequestDTO dto) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessionalResponseDTO> editar(@PathVariable Long id, @RequestBody ProfessionalRequestDTO dto) {
        return ResponseEntity.ok(service.editar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
