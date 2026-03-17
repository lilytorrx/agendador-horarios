package com.lily.agendadorHorarios.Infrastructure.Exceptions;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
