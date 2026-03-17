package com.lily.agendadorHorarios.DTOs.Schedule;

import java.time.LocalDateTime;

public record ScheduleRequestDTO(String userId,Long professionalServiceId, LocalDateTime dateTimeSchedule) {}
