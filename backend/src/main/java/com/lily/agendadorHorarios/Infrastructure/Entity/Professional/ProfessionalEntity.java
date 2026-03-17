package com.lily.agendadorHorarios.Infrastructure.Entity.Professional;

import com.lily.agendadorHorarios.Infrastructure.Entity.ProfessionalService.ProfessionalServiceEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "professionals")
public class ProfessionalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "professional", cascade = CascadeType.ALL)
    private List<ProfessionalServiceEntity> professionalServices;
}
