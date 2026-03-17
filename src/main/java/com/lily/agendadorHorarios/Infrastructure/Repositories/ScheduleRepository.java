package com.lily.agendadorHorarios.Infrastructure.Repositories;

import com.lily.agendadorHorarios.Infrastructure.Entity.Professional.ProfessionalEntity;
import com.lily.agendadorHorarios.Infrastructure.Entity.Schedule.ScheduleEntity;
import com.lily.agendadorHorarios.Infrastructure.Entity.Schedule.ScheduleStatus;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {
    List<ScheduleEntity> findByUser(UserEntity user);

    List<ScheduleEntity> findByProfessionalServiceProfessional(ProfessionalEntity professional);

    List<ScheduleEntity> findByStatus(ScheduleStatus status);

    List<ScheduleEntity> findByDateTimeScheduleBetween(LocalDateTime start, LocalDateTime end);

    List<ScheduleEntity> findByUserAndStatus(UserEntity user, ScheduleStatus status);

    List<ScheduleEntity> findByProfessionalServiceProfessionalAndStatusAndDateTimeScheduleBetween(ProfessionalEntity professional, ScheduleStatus status, LocalDateTime start, LocalDateTime end);

    // Alterar status de agendamento para concluído quando passar uma hora
    @Modifying
    @Query("UPDATE ScheduleEntity s SET s.status = 'CONCLUIDO' WHERE s.dateTimeSchedule < :now AND s.status = 'AGENDADO'")
    void updateStatusToConcluido(LocalDateTime now);
}

