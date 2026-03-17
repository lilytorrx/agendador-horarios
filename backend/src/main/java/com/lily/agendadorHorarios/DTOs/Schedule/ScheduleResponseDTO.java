package com.lily.agendadorHorarios.DTOs.Schedule;

import com.lily.agendadorHorarios.Infrastructure.Entity.Schedule.ScheduleStatus;

import java.time.LocalDateTime;

public record ScheduleResponseDTO(Long id, String userName, String userEmail, String professionalName, String serviceName, LocalDateTime dateTimeSchedule, ScheduleStatus status) {
}
