package com.fashion.producto_servicio.dto.response;

import com.fashion.producto_servicio.model.Categoria;
import com.fashion.producto_servicio.model.Producto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Setter
@Getter
@Builder
public class ProductoResponseDTO {
    private Integer id;
    private String nombre;
    private BigDecimal precio;
    private String descripcion;
    private Categoria categoria;
}
