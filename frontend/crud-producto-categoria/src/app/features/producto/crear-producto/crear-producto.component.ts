import { Component, inject } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Router } from '@angular/router';
import { Producto } from '../../../core/models/producto.model';
import Swal from 'sweetalert2';
import { MostrarErroresComponent } from "../../../shared/components/mostrar-errores/mostrar-errores.component";
import { FormularioProductoComponent } from "../components/formulario-producto/formulario-producto.component";

@Component({
  selector: 'app-crear-producto',
  imports: [MostrarErroresComponent, FormularioProductoComponent],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
  errores: string[] = []

  private productoService = inject(ProductoService)
  private router = inject(Router)

  constructor() {}

  guardarCambios(producto: Omit<Producto, "id">) {
    this.productoService.crear(producto).subscribe({
      next: (res) => {
        Swal.fire("Exitoso", res.mensaje, 'success')
        this.router.navigate(["admin/productos"])
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
