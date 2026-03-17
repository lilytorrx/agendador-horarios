package com.lily.agendadorHorarios.Infrastructure.Entity.Schedule;

import com.lily.agendadorHorarios.Infrastructure.Entity.ProfessionalService.ProfessionalServiceEntity;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@jakarta.persistence.Entity
@Table(name = "schedules")
public class ScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "professional_service_id", nullable = false)
    private ProfessionalServiceEntity professionalService;

    private LocalDateTime dateTimeSchedule;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScheduleStatus status = ScheduleStatus.AGENDADO;

}

