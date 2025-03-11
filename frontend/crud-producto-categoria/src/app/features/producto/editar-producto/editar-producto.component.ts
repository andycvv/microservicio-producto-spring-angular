import { Component, inject, Input, numberAttribute, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Router } from '@angular/router';
import { Producto } from '../../../core/models/producto.model';
import { ProductoService } from '../../../core/services/producto.service';
import Swal from 'sweetalert2';
import { FormularioProductoComponent } from "../components/formulario-producto/formulario-producto.component";
import { MostrarErroresComponent } from "../../../shared/components/mostrar-errores/mostrar-errores.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { Categoria } from '../../../core/models/categoria.model';

@Component({
  selector: 'app-editar-producto',
  imports: [FormularioProductoComponent, MostrarErroresComponent, LoadingComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {
  errores: string[] = []

  @Input({ transform: numberAttribute })
  id!: number

  modelo?: Producto
  categoriaSeleccionada?: number

  productoService = inject(ProductoService);
  private router = inject(Router)

  ngOnInit(): void {
    this.productoService.obtenerPorId(this.id).subscribe({
      next: (res) => {
        this.modelo = res.data;
        this.categoriaSeleccionada = res.data.categoria?.id
      },
      error: (e) => {
        Swal.fire("Error", e.error.mensaje, 'error')
        this.router.navigate(['/admin/productos'])
      }
    })
  }

  guardarCambios(producto: Omit<Producto, "id">) {
    this.productoService.actualizar(this.id, producto).subscribe({
      next: (res) => {
        Swal.fire("Exitoso", res.mensaje, 'success')
        this.router.navigate(['/admin/productos'])
      },
      error: (e) => {
        if (e.error.data) {
          this.errores = e.error.data
        } else {
          this.errores = []
          this.errores.push(e.error.mensaje)
        }
      }
    })
  }
}
