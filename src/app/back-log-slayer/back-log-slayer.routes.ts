import { Routes } from '@angular/router';
import { MainLayot } from './layout/main-layot/main-layot';
import { PruebaComponent } from './pages/prueba/prueba';
import { SteamCallBack } from './pages/steam-callback/steam-callback';
import { Survey } from './pages/survey/survey';

const backLogSlayerRoutes: Routes = [
  {
    path: '',
    component: MainLayot,
    children: [
      //Vistas Publicas
      {
        path: 'prueba',
        component: PruebaComponent,
        title: 'Prueba'
      },
      {
        path: 'survey',
        component: Survey,
        title: 'Encuesta'
      },
      //Vistas Privadas
      {
        path: 'steam-sync',
        component: SteamCallBack,
        title: 'Sincronización con Steam'
        //Añadir guard
      },
      {
        path: '**',
        redirectTo: 'prueba'
      },

    ]
  }
];

export default backLogSlayerRoutes;
