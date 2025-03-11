package com.fashion.producto_servicio.controller;

import com.fashion.producto_servicio.dto.response.ApiResponse;
import com.fashion.producto_servicio.exception.RecursoExistenteException;
import com.fashion.producto_servicio.exception.RecursoNoEncontradoException;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(RecursoExistenteException.class)
    public ResponseEntity<ApiResponse<Void>> recursoExistente(RecursoExistenteException ex) {
        return ResponseEntity.badRequest().body(new ApiResponse<>(ex.getMessage(), null));
    }

    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<ApiResponse<Void>> recursoNoEncontrado(RecursoNoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(ex.getMessage(), null));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<List<String>>> manejarValidaciones(MethodArgumentNotValidException ex) {
        List<String> errores = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        return ResponseEntity.badRequest().body(new ApiResponse<>("Error de validación", errores));
    }

}
