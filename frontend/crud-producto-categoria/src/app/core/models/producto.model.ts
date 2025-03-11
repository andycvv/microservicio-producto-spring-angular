import { Categoria } from "./categoria.model";

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria?: Categoria;
  categoriaId?: number;
}