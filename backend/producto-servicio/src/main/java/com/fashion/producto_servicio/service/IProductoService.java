package com.fashion.producto_servicio.service;

import com.fashion.producto_servicio.dto.request.ProductoRequestDTO;
import com.fashion.producto_servicio.dto.response.ProductoResponseDTO;

import java.util.List;

public interface IProductoService {
    List<ProductoResponseDTO> listarProductos();
    ProductoResponseDTO obtenerProductoPorId(Integer id);
    Boolean existeProductoPorNombreId(String nombre, int id);
    ProductoResponseDTO crearProducto(ProductoRequestDTO productoRequestDTO);
    ProductoResponseDTO editarProducto(Integer id, ProductoRequestDTO productoRequestDTO);
    ProductoResponseDTO eliminarProducto(Integer id);
}
