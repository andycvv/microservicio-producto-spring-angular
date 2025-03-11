package com.fashion.producto_servicio.controller;

import com.fashion.producto_servicio.dto.request.CategoriaRequestDTO;
import com.fashion.producto_servicio.dto.request.ProductoRequestDTO;
import com.fashion.producto_servicio.dto.response.ApiResponse;
import com.fashion.producto_servicio.dto.response.CategoriaResponseDTO;
import com.fashion.producto_servicio.dto.response.ProductoResponseDTO;
import com.fashion.producto_servicio.service.IProductoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/productos")
public class ProductoController {
    private IProductoService iProductoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductoResponseDTO>>> listarProductos() {
        List<ProductoResponseDTO> productos = iProductoService.listarProductos();
        if (productos.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(
                    "No hay productos registrados", productos
            ));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(
                    "Lista de productos obtenida exitosamente", productos
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> obtenerProducto(
            @PathVariable int id
    ) {
        ProductoResponseDTO productoResponseDTO = iProductoService.obtenerProductoPorId(id);
        return ResponseEntity.ok(
                new ApiResponse<>("Producto encontrado", productoResponseDTO)
        );
    }

    @GetMapping("/{nombre}/existe")
    public ResponseEntity<ApiResponse<Boolean>> existeProductoPorNombre(
            @PathVariable String nombre,
            @RequestParam int id
    ) {
        Boolean existeProducto = iProductoService
                .existeProductoPorNombreId(nombre, id);

        String mensaje = "El producto " + nombre;
        return ResponseEntity.ok(
                new ApiResponse<>(existeProducto
                        ? mensaje + " existe"
                        : mensaje + " no existe", existeProducto)
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> crearProducto(
            @Valid @RequestBody ProductoRequestDTO productoRequestDTO
    ) {
        ProductoResponseDTO productoResponseDTO = iProductoService
                .crearProducto(productoRequestDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(productoResponseDTO.getId())
                .toUri();

        return ResponseEntity.created(location).body(
                new ApiResponse<>("Producto creado correctamente", productoResponseDTO)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> actualizarProducto(
            @PathVariable int id,
            @Valid @RequestBody ProductoRequestDTO productoRequestDTO
    ) {
        ProductoResponseDTO productoResponseDTO = iProductoService.editarProducto(id, productoRequestDTO);
        return ResponseEntity.ok(
                new ApiResponse<>("Producto actualizado correctamente", productoResponseDTO)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarProducto(
            @PathVariable int id
    ) {
        ProductoResponseDTO productoResponseDTO = iProductoService.eliminarProducto(id);

        return ResponseEntity.ok(
                new ApiResponse<>("Producto "
                        + productoResponseDTO.getNombre() + " eliminado correctamente", null)
        );
    }
}

