package com.fashion.producto_servicio.mapper;

import com.fashion.producto_servicio.dto.response.ProductoResponseDTO;
import com.fashion.producto_servicio.model.Producto;

public class ProductoMapper {

    public static ProductoResponseDTO toResponse(Producto producto) {
        return ProductoResponseDTO.builder()
                .id(producto.getId())
                .nombre(producto.getNombre())
                .precio(producto.getPrecio())
                .descripcion(producto.getDescripcion())
                .categoria(producto.getCategoria())
                .build();
    }

}
