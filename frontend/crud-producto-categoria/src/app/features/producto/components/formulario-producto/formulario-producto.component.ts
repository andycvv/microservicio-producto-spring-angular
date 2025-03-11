import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Producto } from '../../../../core/models/producto.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from '../../../../core/models/categoria.model';
import { CategoriaService } from '../../../../core/services/categoria.service';
import Swal from 'sweetalert2';
import { nombreProductoEsUnico } from '../../../../shared/funciones/nombreProductoEsUnico';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-formulario-producto',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatSelectModule,
    LoadingComponent
],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent {
  categorias?: Categoria[]

  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Producto

  @Input()
  categoriaSeleccionada?: number

  @Output()
  posteoFormulario = new EventEmitter<Producto>();

  private readonly formBuilder = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private router = inject(Router);

  form = this.formBuilder.group({
    nombre: ['', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      asyncValidators: [nombreProductoEsUnico()],
      updateOn: 'blur'
    }],
    precio: [0.0, {
      validators: [Validators.required, Validators.min(0.1), Validators.maxLength(1000)],
    }],
    descripcion: ['', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    }],
    categoriaId: [0, {
      validators: [Validators.min(1)],
    }]
  })

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerTodos().subscribe({
      next: res => {
        if (res.data.length === 0) {
          Swal.fire("Categorías", "No hay categorías registradas, debe registrar alguna para poder guardar productos.", 'question')
          this.router.navigate(['/admin/productos'])
        }
        this.categorias = res.data;

        const categoriaPorDefecto = this.categoriaSeleccionada ?? this.categorias[0]?.id;
        if (categoriaPorDefecto) {
          this.form.controls.categoriaId.setValue(categoriaPorDefecto);
        }

        if (this.modelo) {
          this.form.patchValue(this.modelo);
        }
      },
      error: e => Swal.fire("Error al obtener categorías disponibles", "Error en el servidor", 'error')
    })
  }

  obtenerErrorDeCampo(nombreCampo: string): string {
    let campo = this.form.get(nombreCampo);

    if (!campo?.errors) return ''

    if (campo.hasError('required')) return 'Este campo es obligatorio.';
    if (campo.hasError('minlength')) return `Debe tener al menos ${campo.errors['minlength'].requiredLength} caracteres.`;
    if (campo.hasError('maxlength')) return `Debe tener máximo ${campo.errors['maxlength'].requiredLength} caracteres.`;
    if (campo.hasError('min')) return `El valor debe ser como mínimo ${campo.errors['min'].min}.`;
    if (campo.hasError('max')) return `El valor debe ser como máximo ${campo.errors['max'].max}.`;

    if (campo.hasError('mensaje')) {
      return campo.getError('mensaje');
    }

    return ''
  }

  guardarCambios() {
    const producto = this.form.value as Producto;
    this.posteoFormulario.emit(producto)
  }
}
