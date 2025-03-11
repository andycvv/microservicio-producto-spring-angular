import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/models/categoria.model';
import { FormularioCategoriaComponent } from "../components/formulario-categoria/formulario-categoria.component";
import Swal from 'sweetalert2';
import { MostrarErroresComponent } from "../../../shared/components/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-categoria',
  imports: [FormularioCategoriaComponent, MostrarErroresComponent],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {
  errores: string[] = []

  private categoriaService = inject(CategoriaService)
  private router = inject(Router)

  guardarCambios(categoria: Omit<Categoria, "id">) {
    console.log(categoria)
    this.categoriaService.crear(categoria).subscribe({
      next: (res) => {
        Swal.fire("Exitoso", res.mensaje, 'success')
        this.router.navigate(["admin/categorias"])
      },
      error: (e) => {
        if (e.error.data) {
          this.errores = e.error.data
        } else if (e.error.mensaje) {
          this.errores = []
          this.errores.push(e.error.mensaje)
        } else {
          Swal.fire("Error al guardar", "Error en el servidor ", 'error')
        }
      }
    })
  }

}
