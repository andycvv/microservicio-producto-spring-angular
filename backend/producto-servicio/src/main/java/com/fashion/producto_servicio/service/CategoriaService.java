package com.fashion.producto_servicio.service;

import com.fashion.producto_servicio.dto.request.CategoriaRequestDTO;
import com.fashion.producto_servicio.dto.response.CategoriaResponseDTO;
import com.fashion.producto_servicio.exception.RecursoExistenteException;
import com.fashion.producto_servicio.exception.RecursoNoEncontradoException;
import com.fashion.producto_servicio.model.Categoria;
import com.fashion.producto_servicio.repository.CategoriaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoriaService implements ICategoriaService {
    private CategoriaRepository categoriaRepository;

    @Override
    public List<CategoriaResponseDTO> listarCategorias() {
        return categoriaRepository.findAll().stream()
                .map(CategoriaResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public CategoriaResponseDTO obtenerCategoriaPorId(int id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Categoría con ID " + id + " no encontrada."
                ));
        return new CategoriaResponseDTO(categoria.getId(), categoria.getNombre());
    }

    @Override
    public Boolean existeCategoriaPorNombreId(String nombre, int id) {
        Categoria categoria = categoriaRepository.findCategoriaByNombre(nombre);

        if (categoria != null) {
            if (id == 0) {
                return true;
            }
            return !categoria.getId().equals(id);
        }

        return false;
    }

    @Override
    public CategoriaResponseDTO crearCategoria(CategoriaRequestDTO categoriaRequestDTO) {
        if (categoriaRepository.existsCategoriaByNombre(categoriaRequestDTO.getNombre())) {
            throw new RecursoExistenteException("La categoría "
                    + categoriaRequestDTO.getNombre() + " ya existe.");
        }

        Categoria categoria = categoriaRepository.save(
                new Categoria(null,categoriaRequestDTO.getNombre())
        );

        return new CategoriaResponseDTO(categoria.getId(), categoria.getNombre());
    }

    @Override
    public CategoriaResponseDTO actualizarCategoria(Integer id, CategoriaRequestDTO categoriaRequestDTO) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Categoría con ID " + id + " no encontrada."));

        Categoria categoriaDuplicado = categoriaRepository.findCategoriaByNombre(categoriaRequestDTO.getNombre());
        if (categoriaDuplicado != null && !categoriaDuplicado.getId().equals(categoria.getId())) {
            throw new RecursoExistenteException(
                    "El nombre " + categoriaRequestDTO.getNombre() + " ya está en uso."
            );
        }

        categoria.setNombre(categoriaRequestDTO.getNombre());
        categoria = categoriaRepository.save(categoria);
        return new CategoriaResponseDTO(categoria.getId(), categoria.getNombre());
    }

    @Override
    public CategoriaResponseDTO eliminarCategoria(Integer id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Categoría con ID " + id + " no encontrada."));

        categoriaRepository.delete(categoria);
        return new CategoriaResponseDTO(categoria.getId(), categoria.getNombre());
    }

}
