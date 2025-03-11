import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductoService } from "../../core/services/producto.service";

export function nombreProductoEsUnico(): AsyncValidatorFn {
  const productoService = inject(ProductoService)
  const route = inject(ActivatedRoute);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.pristine || !control.value) return of(null);

    let id = route.snapshot.paramMap.get('id') ?? "0"

    return productoService.obtenerPorNombre(control.value, id).pipe(
      map((res) => (res.data ? { mensaje: "Ya existe un producto con este nombre" } : null)),
      catchError(() => of({ mensaje: "Error al validar el nombre. Intenta nuevamente" })),
    )
  }
}