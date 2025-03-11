import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioCategoriaComponent } from '../components/formulario-categoria/formulario-categoria.component';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/models/categoria.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { MostrarErroresComponent } from "../../../shared/components/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-editar-categoria',
  imports: [FormularioCategoriaComponent, LoadingComponent, MostrarErroresComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {
  
  errores: string[] = []

  @Input({ transform: numberAttribute })
  id!: number
  
  categoriaService = inject(CategoriaService);
  private router = inject(Router)
  modelo?: Categoria

  ngOnInit(): void {
    this.categoriaService.obtenerPorId(this.id).subscribe({
      next: (res) => {
        this.modelo = res.data
      },
      error: (e) => {
        Swal.fire("Error", e.error.mensaje, 'error')
        this.router.navigate(['/admin/categorias'])
      }
    })
  }

  guardarCambios(categoria: Omit<Categoria, "id">) {
    this.categoriaService.actualizar(this.id, categoria).subscribe({
      next: (res) => {
        Swal.fire("Exitoso", res.mensaje, 'success')
        this.router.navigate(['/admin/categorias'])
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
