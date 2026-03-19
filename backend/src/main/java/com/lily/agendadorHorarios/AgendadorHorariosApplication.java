package com.lily.agendadorHorarios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AgendadorHorariosApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgendadorHorariosApplication.class, args);
	}
}