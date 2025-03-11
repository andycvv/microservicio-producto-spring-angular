package com.fashion.producto_servicio.service;

import com.fashion.producto_servicio.dto.request.CategoriaRequestDTO;
import com.fashion.producto_servicio.dto.response.CategoriaResponseDTO;

import java.util.List;

public interface ICategoriaService {

    List<CategoriaResponseDTO> listarCategorias();
    CategoriaResponseDTO obtenerCategoriaPorId(int id);
    Boolean existeCategoriaPorNombreId(String nombre, int id);
    CategoriaResponseDTO crearCategoria(CategoriaRequestDTO categoriaRequestDTO);
    CategoriaResponseDTO actualizarCategoria(Integer id, CategoriaRequestDTO categoriaRequestDTO);
    CategoriaResponseDTO eliminarCategoria(Integer id);

}
