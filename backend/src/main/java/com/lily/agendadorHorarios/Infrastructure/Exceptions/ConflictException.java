package com.lily.agendadorHorarios.Infrastructure.Exceptions;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
