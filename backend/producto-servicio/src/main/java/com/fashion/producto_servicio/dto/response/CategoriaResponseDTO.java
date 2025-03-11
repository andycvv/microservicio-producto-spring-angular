package com.fashion.producto_servicio.dto.response;

import com.fashion.producto_servicio.model.Categoria;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CategoriaResponseDTO {
    private Integer id;
    private String nombre;

    public static CategoriaResponseDTO fromEntity(Categoria categoria) {
        return new CategoriaResponseDTO(categoria.getId(), categoria.getNombre());
    }
}
