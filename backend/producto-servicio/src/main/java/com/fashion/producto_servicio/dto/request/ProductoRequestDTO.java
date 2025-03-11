package com.fashion.producto_servicio.dto.request;

import com.fashion.producto_servicio.model.Categoria;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
public class ProductoRequestDTO {
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    @NotNull(message = "El precio no puede ser nulo")
    @DecimalMin(value = "0.1", message = "El precio debe ser mayor a 0")
    @DecimalMax(value = "1000.0", message = "El precio debe ser menor a 1001")
    private BigDecimal precio;

    @NotBlank(message = "La descripción no puede estar vacía")
    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    private String descripcion;

    @NotNull(message = "La categoría es obligatoria")
    @Min(value = 1, message = "El ID de la categoría debe ser mayor a 0")
    private Integer categoriaId;
}
