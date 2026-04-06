import { Routes } from '@angular/router';
import { MainLayot } from './layout/main-layot/main-layot';
import { PruebaComponent } from './pages/prueba/prueba';

const backLogSlayerRoutes: Routes = [
  {
    path: '',
    component: MainLayot,
    children: [
      //Vistas Publicas
      {
        path: 'prueba',
        component: PruebaComponent,
      },
      //Vistas Privadas
      //...
      {
        path: '**',
        redirectTo: 'prueba'
      },
    ]
  }
];

export default backLogSlayerRoutes;
