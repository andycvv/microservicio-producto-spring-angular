import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../../../core/models/categoria.model';
import { nombreCategoriaEsUnico } from '../../../../shared/funciones/nombreCategoriaEsUnico';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-formulario-categoria',
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './formulario-categoria.component.html',
  styleUrl: './formulario-categoria.component.css'
})
export class FormularioCategoriaComponent implements OnInit {
  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Categoria

  @Output()
  posteoFormulario = new EventEmitter<Categoria>();

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    nombre: ['', { 
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      asyncValidators: [nombreCategoriaEsUnico()],
      updateOn: 'blur'
    }]
  })

  obtenerErrorDeCampo(nombreCampo: string): string {
    let campo = this.form.get(nombreCampo);

    if (!campo?.errors) return ''

    if (campo.hasError('required')) return 'Este campo es obligatorio.';
    if (campo.hasError('minlength')) return `Debe tener al menos ${campo.errors['minlength'].requiredLength} caracteres.`;
    if (campo.hasError('maxlength')) return `Debe tener máximo ${campo.errors['maxlength'].requiredLength} caracteres.`;

    if (campo.hasError('mensaje')) {
      return campo.getError('mensaje');
    }

    return ''
  }

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo)
    }
  }

  guardarCambios() {
    const categoria = this.form.value as Categoria;
    this.posteoFormulario.emit(categoria)
  }
}
