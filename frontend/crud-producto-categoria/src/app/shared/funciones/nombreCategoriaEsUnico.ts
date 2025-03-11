import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { CategoriaService } from "../../core/services/categoria.service";
import { catchError, map, Observable, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";

export function nombreCategoriaEsUnico(): AsyncValidatorFn {
  const categoriaService = inject(CategoriaService)
  const route = inject(ActivatedRoute);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.pristine || !control.value) return of(null);

    let id = route.snapshot.paramMap.get('id') ?? "0"

    return categoriaService.obtenerPorNombre(control.value, id).pipe(
      map((res) => (res.data ? { mensaje: "Ya existe una categoría con este nombre" }: null)),
      catchError(() => of({ mensaje: "Error al validar el nombre. Intenta nuevamente" }))
    )
  }
}