import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/models/categoria.model';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-listar-categorias',
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.css'
})
export class ListarCategoriasComponent {
  private categoriaService = inject(CategoriaService)
  categorias?: Categoria[]
  columnasAMostrar = ['id', 'nombre', 'acciones']

  constructor() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerTodos().subscribe({
      next: (res) => {
        this.categorias = res.data
      },
      error: () => {
        Swal.fire("Error al obtener el listado", 'Error en el servidor', 'error')
      }
    })
  }

  borrar(id: number) {
    this.categoriaService.eliminar(id).subscribe({
      next: (res) => {
        this.categorias = undefined
        Swal.fire("Exitoso", res.mensaje, 'success')
        this.cargarCategorias();
      },
      error: (e) => {
        if (e.status === 500) {
          Swal.fire("Error", "Esta categoría está en uso.", 'error')
        } else {
          Swal.fire("Error", e.error.mensaje, 'error')
        }
      }
    })
  }

}
