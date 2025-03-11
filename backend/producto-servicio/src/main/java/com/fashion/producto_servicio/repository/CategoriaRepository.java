package com.fashion.producto_servicio.repository;

import com.fashion.producto_servicio.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    Boolean existsCategoriaByNombre(String nombre);

    Boolean existsCategoriaById(Integer id);

    Categoria findCategoriaByNombre(String nombre);
}
