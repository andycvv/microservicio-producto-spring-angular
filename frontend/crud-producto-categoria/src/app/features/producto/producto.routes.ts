import { Routes } from "@angular/router";
import { ListarProductosComponent } from "./listar-productos/listar-productos.component";
import { CrearProductoComponent } from "./crear-producto/crear-producto.component";
import { EditarProductoComponent } from "./editar-producto/editar-producto.component";

export const PRODUCTO_ROUTES: Routes = [
  {
    path: '',
    component: ListarProductosComponent
  },
  {
    path: 'crear',
    component: CrearProductoComponent
  },
  {
    path: 'editar/:id',
    component: EditarProductoComponent
  }
]