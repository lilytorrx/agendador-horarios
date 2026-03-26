package com.lily.agendadorHorarios.DTOs.Schedule;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ScheduleRequestDTO(@NotBlank @NotNull String userId, @NotNull @NotBlank Long professionalServiceId, @NotNull @NotBlank LocalDateTime dateTimeSchedule) {}
