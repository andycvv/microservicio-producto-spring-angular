package com.fashion.producto_servicio.service;

import com.fashion.producto_servicio.dto.request.ProductoRequestDTO;
import com.fashion.producto_servicio.dto.response.ProductoResponseDTO;
import com.fashion.producto_servicio.exception.RecursoExistenteException;
import com.fashion.producto_servicio.exception.RecursoNoEncontradoException;
import com.fashion.producto_servicio.mapper.ProductoMapper;
import com.fashion.producto_servicio.model.Categoria;
import com.fashion.producto_servicio.model.Producto;
import com.fashion.producto_servicio.repository.CategoriaRepository;
import com.fashion.producto_servicio.repository.ProductoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductoService implements  IProductoService {

    private CategoriaRepository categoriaRepository;
    private ProductoRepository productoRepository;

    @Override
    public List<ProductoResponseDTO> listarProductos() {
        return productoRepository.findAll().stream()
                .map(ProductoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductoResponseDTO obtenerProductoPorId(Integer id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Producto con ID " + id + " no encontrado."
                ));
        return ProductoMapper.toResponse(producto);
    }

    @Override
    public Boolean existeProductoPorNombreId(String nombre, int id) {
        Producto producto = productoRepository.findByNombre(nombre);

        if (producto != null) {
            if (id == 0) {
                return true;
            }
            return !producto.getId().equals(id);
        }

        return false;
    }

    @Override
    public ProductoResponseDTO crearProducto(ProductoRequestDTO productoRequestDTO) {
        if (productoRepository.existsByNombre((productoRequestDTO.getNombre()))) {
            throw new RecursoExistenteException("El producto " + productoRequestDTO.getNombre() + " ya existe");
        }

        Categoria categoria = categoriaRepository.findById(productoRequestDTO.getCategoriaId())
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Categoría con ID " + productoRequestDTO.getCategoriaId() + " no existe"
                ));

        Producto producto = productoRepository.save(
                Producto.builder()
                        .nombre(productoRequestDTO.getNombre())
                        .precio(productoRequestDTO.getPrecio())
                        .descripcion(productoRequestDTO.getDescripcion())
                        .categoria(categoria)
                        .build()
        );

        return ProductoMapper.toResponse(producto);
    }

    @Override
    public ProductoResponseDTO editarProducto(Integer id, ProductoRequestDTO productoRequestDTO) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Producto con ID " + id + " no encontrado."
                ));

        Producto productoDuplicado = productoRepository.findByNombre(productoRequestDTO.getNombre());
        if (productoDuplicado != null && !productoDuplicado.getId().equals(id)) {
            throw new RecursoExistenteException(
                    "El nombre " + productoRequestDTO.getNombre() + " ya está en uso."
            );
        }

        Categoria categoria = categoriaRepository.findById(productoRequestDTO.getCategoriaId())
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Categoría con ID " + productoRequestDTO.getCategoriaId() + " no existe"
                ));

        producto.setNombre(productoRequestDTO.getNombre());
        producto.setPrecio(productoRequestDTO.getPrecio());
        producto.setDescripcion(productoRequestDTO.getDescripcion());
        producto.setCategoria(categoria);

        Producto productoActualizado = productoRepository.save(producto);
        return ProductoMapper.toResponse(productoActualizado);
    }

    @Override
    public ProductoResponseDTO eliminarProducto(Integer id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Producto con ID " + id + " no encontrado."
                ));

        productoRepository.delete(producto);
        return ProductoMapper.toResponse(producto);
    }
}
