package com.fashion.producto_servicio.exception;

public class RecursoExistenteException extends RuntimeException {
    public RecursoExistenteException(String mensaje) {
        super(mensaje);
    }
}
