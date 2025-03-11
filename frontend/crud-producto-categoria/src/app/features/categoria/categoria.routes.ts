import { Routes } from "@angular/router";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { CrearCategoriaComponent } from "./crear-categoria/crear-categoria.component";
import { EditarCategoriaComponent } from "./editar-categoria/editar-categoria.component";

export const CATEGORIA_ROUTES: Routes = [
  {
    path: '',
    component: ListarCategoriasComponent
  },
  {
    path: 'crear',
    component: CrearCategoriaComponent
  },
  {
    path: 'editar/:id',
    component: EditarCategoriaComponent
  }
]