import { Routes } from '@angular/router';
import { AdminLayoutComponent, ClienteLayoutComponent } from './shared/layouts';

export const routes: Routes = [
  {
    path: 'cliente',
    component: ClienteLayoutComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'categorias', 
        loadChildren: () => import ("./features/categoria/categoria.routes").then(m => m.CATEGORIA_ROUTES) 
      },
      {
        path: 'productos',
        loadChildren: () => import("./features/producto/producto.routes").then(m => m.PRODUCTO_ROUTES)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'admin/productos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'admin/productos',
    pathMatch: 'full'
  }
];
