package com.lily.agendadorHorarios.Infrastructure.Exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
