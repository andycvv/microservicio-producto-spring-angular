package com.fashion.producto_servicio.controller;

import com.fashion.producto_servicio.dto.request.CategoriaRequestDTO;
import com.fashion.producto_servicio.dto.response.ApiResponse;
import com.fashion.producto_servicio.dto.response.CategoriaResponseDTO;
import com.fashion.producto_servicio.repository.CategoriaRepository;
import com.fashion.producto_servicio.service.CategoriaService;
import com.fashion.producto_servicio.service.ICategoriaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/categorias")
    public class CategoriaController {

    private ICategoriaService iCategoriaService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoriaResponseDTO>>> listarCategorias() {
        List<CategoriaResponseDTO> categorias = iCategoriaService.listarCategorias();
        if (categorias.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(
                    "No hay categorías registradas", categorias
            ));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(
                    "Lista de categorías obtenida exitosamente", categorias
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> obtenerCategoria(
            @PathVariable int id
    ) {
        CategoriaResponseDTO categoriaResponseDTO = iCategoriaService.obtenerCategoriaPorId(id);
        return ResponseEntity.ok(
                new ApiResponse<>("Categoría encontrada", categoriaResponseDTO)
        );
    }

    @GetMapping("/{nombre}/existe")
        public ResponseEntity<ApiResponse<Boolean>> existeCategoriaPorNombreId(
            @PathVariable String nombre,
            @RequestParam int id
    ) {
        Boolean existeCategoria = iCategoriaService.existeCategoriaPorNombreId(nombre, id);
        String mensaje = "La categoría " + nombre;
        return ResponseEntity.ok(
                new ApiResponse<>(existeCategoria
                        ? mensaje + " existe"
                        : mensaje + " no existe", existeCategoria)
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> crearCategoria(
            @Valid @RequestBody CategoriaRequestDTO categoriaRequestDTO
    ) {
        CategoriaResponseDTO categoriaResponseDTO = iCategoriaService
                .crearCategoria(categoriaRequestDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(categoriaResponseDTO.getId())
                .toUri();

        return ResponseEntity.created(location).body(
                new ApiResponse<>("Categoría creada correctamente", categoriaResponseDTO)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> actualizarCategoria(
            @PathVariable int id,
            @Valid @RequestBody CategoriaRequestDTO categoriaRequestDTO
    ) {
        CategoriaResponseDTO categoriaResponseDTO = iCategoriaService.actualizarCategoria(id, categoriaRequestDTO);
        return ResponseEntity.ok(
                new ApiResponse<>("Categoría actualizada correctamente", categoriaResponseDTO)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarCategorai(
            @PathVariable int id
    ) {
        CategoriaResponseDTO categoriaResponseDTO = iCategoriaService.eliminarCategoria(id);

        return ResponseEntity.ok(
                new ApiResponse<>("Categoría "
                        + categoriaResponseDTO.getNombre() + " eliminada correctamente", null)
        );
    }
}
