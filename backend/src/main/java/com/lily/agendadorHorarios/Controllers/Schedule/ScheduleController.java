package com.lily.agendadorHorarios.Controllers.Schedule;

import com.lily.agendadorHorarios.DTOs.Schedule.ScheduleRequestDTO;
import com.lily.agendadorHorarios.DTOs.Schedule.ScheduleResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.Schedule.ScheduleStatus;
import com.lily.agendadorHorarios.Services.Schedule.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService service;

    @PostMapping
    public ResponseEntity<ScheduleResponseDTO> agendar(@RequestBody ScheduleRequestDTO dto) {
        return ResponseEntity.ok(service.criar(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ScheduleResponseDTO>> buscarPorUsuario(@PathVariable String userId) {
        return ResponseEntity.ok(service.buscarPorUsuario(userId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ScheduleResponseDTO>> buscarPorStatus(@PathVariable ScheduleStatus status) {
        return ResponseEntity.ok(service.buscarPorStatus(status));
    }

    @GetMapping("/data")
    public ResponseEntity<List<ScheduleResponseDTO>> buscarPorData(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end) {
        return ResponseEntity.ok(service.buscarPorData(start, end));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<ScheduleResponseDTO> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(service.cancelar(id));
    }
}
