import { Routes } from '@angular/router';
import { publicGuard } from './auth/guards/public.guard';

export const routes: Routes = [
  //Rutas a las que usuarios no logueados o registrados tienen acceso
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [publicGuard],
  },
  
  // Rutas a las que usuarios logueados tienen acceso

  //Ruta comodin en caso de que no se encuentre ninguna ruta
  {
    path: '**',
    redirectTo: 'auth',
  }
];
