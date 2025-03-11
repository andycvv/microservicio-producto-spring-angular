package com.fashion.producto_servicio.repository;

import com.fashion.producto_servicio.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    boolean existsByNombre(String nombre);

    Producto findByNombre(String nombre);
}
