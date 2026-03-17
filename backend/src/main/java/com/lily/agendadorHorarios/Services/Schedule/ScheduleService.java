package com.lily.agendadorHorarios.Services.Schedule;

import com.lily.agendadorHorarios.DTOs.Schedule.ScheduleRequestDTO;
import com.lily.agendadorHorarios.DTOs.Schedule.ScheduleResponseDTO;
import com.lily.agendadorHorarios.Infrastructure.Entity.ProfessionalService.ProfessionalServiceEntity;
import com.lily.agendadorHorarios.Infrastructure.Entity.Schedule.ScheduleEntity;
import com.lily.agendadorHorarios.Infrastructure.Entity.Schedule.ScheduleStatus;
import com.lily.agendadorHorarios.Infrastructure.Entity.User.UserEntity;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.BusinessException;
import com.lily.agendadorHorarios.Infrastructure.Exceptions.NotFoundException;
import com.lily.agendadorHorarios.Infrastructure.Repositories.ProfessionalServiceRepository;
import com.lily.agendadorHorarios.Infrastructure.Repositories.ScheduleRepository;
import com.lily.agendadorHorarios.Infrastructure.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final ProfessionalServiceRepository professionalServiceRepository;

    @Transactional
    public ScheduleResponseDTO criar(ScheduleRequestDTO dto) {
        UserEntity user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado!"));

        ProfessionalServiceEntity professionalService = professionalServiceRepository.findById(dto.professionalServiceId())
                .orElseThrow(() -> new NotFoundException("Profissional não encontrado!"));

        // Verifica conflito de horário
        int duration = professionalService.getService().getDuration();
        LocalDateTime newStart = dto.dateTimeSchedule();
        LocalDateTime newEnd = newStart.plusMinutes(duration);

        List<ScheduleEntity> agendamentosNoPeriodo = scheduleRepository.findByProfessionalServiceProfessionalAndStatusAndDateTimeScheduleBetween(
                professionalService.getProfessional(),
                ScheduleStatus.AGENDADO,
                newStart.minusMinutes(duration),
                newEnd
        );

        if(!agendamentosNoPeriodo.isEmpty()) {
            throw new BusinessException("O profissional já possui um agendamento nesse horário.");
        }

        // Caso esteja vazio, cria o agendamento
        ScheduleEntity schedule = new ScheduleEntity();
        schedule.setUser(user);
        schedule.setProfessionalService(professionalService);
        schedule.setDateTimeSchedule(newStart);
        schedule.setStatus(ScheduleStatus.AGENDADO);

        return toDTO(scheduleRepository.save(schedule));
    }

    public List<ScheduleResponseDTO> buscarPorUsuario(String userId){
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado!"));

            return scheduleRepository.findByUser(user)
                    .stream()
                    .map(this::toDTO)
                    .toList();
    }

    public List<ScheduleResponseDTO> buscarPorStatus(ScheduleStatus status){
        return scheduleRepository.findByStatus(status)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public List<ScheduleResponseDTO> buscarPorData(LocalDateTime start, LocalDateTime end){
        return scheduleRepository.findByDateTimeScheduleBetween(start, end)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional
    public ScheduleResponseDTO cancelar(Long id) {
        ScheduleEntity schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Agendamento não encontrado!"));

        if(schedule.getStatus() != ScheduleStatus.AGENDADO) {
            throw new BusinessException("Apenas agendamentos com status AGENDADO podem ser cancelados.");
        }

        schedule.setStatus(ScheduleStatus.CANCELADO);
        return toDTO(scheduleRepository.save(schedule));
    }

    //Roda a cada uma hora e atualiza p concluído
    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void atualizarStatusConcluido() {
        scheduleRepository.updateStatusToConcluido(LocalDateTime.now());
    }

    private ScheduleResponseDTO toDTO(ScheduleEntity entity) {
        return new ScheduleResponseDTO(
                entity.getId(),
                entity.getUser().getName(),
                entity.getUser().getEmail(),
                entity.getProfessionalService().getProfessional().getName(),
                entity.getProfessionalService().getService().getServiceName(),
                entity.getDateTimeSchedule(),
                entity.getStatus()
        );
    }
}
