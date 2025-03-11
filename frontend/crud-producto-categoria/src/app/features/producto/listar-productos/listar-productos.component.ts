import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Producto } from '../../../core/models/producto.model';
import { ProductoService } from '../../../core/services/producto.service';
import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from '../../../shared/components';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-listar-productos',
  imports: [
    MatButtonModule,
    MatTableModule,
    RouterLink,
    SweetAlert2Module,
    LoadingComponent,
    CurrencyPipe
  ],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent {
  productos?: Producto[]
  columnasAMostrar = ["id","nombre","precio","descripcion", "categoria", "acciones"]

  private productoService = inject(ProductoService)

  constructor() {
    this.cargarProductos()
  }

  private cargarProductos() {
    this.productoService.obtenerTodos().subscribe({
      next: res => this.productos = res.data,
      error: () => Swal.fire("Error en el listado", "Error en el servidor", 'error')
    })
  }

  borrar(id: number) {
    this.productoService.eliminar(id).subscribe({
      next: (res) => {
        this.productos = undefined
        Swal.fire("Exitoso", res.mensaje, 'success')
        this.cargarProductos();
      },
      error: e => Swal.fire("Error", e.error.mensaje, 'error')
    })
  }

}

