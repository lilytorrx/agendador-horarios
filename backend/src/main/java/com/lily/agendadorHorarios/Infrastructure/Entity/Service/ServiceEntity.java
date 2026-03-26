package com.lily.agendadorHorarios.Infrastructure.Entity.Service;

import com.lily.agendadorHorarios.Infrastructure.Entity.ProfessionalService.ProfessionalServiceEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "services")
public class ServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer duration;

    private String serviceName;

    private float price;

    private String category;

    @ManyToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<ProfessionalServiceEntity> professionalServices;
}
