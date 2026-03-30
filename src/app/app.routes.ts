import { Routes } from '@angular/router';

export const routes: Routes = [
  //Rutas a las que usuarios no logueados o registrados tienen acceso
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  // ...

  // Rutas a las que usuarios logueados tienen acceso

  //Ruta comodin en caso de que no se encuentre ninguna ruta
  {
    path: '**',
    redirectTo: 'auth',
  }
];
