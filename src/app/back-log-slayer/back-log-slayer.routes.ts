import { Routes } from '@angular/router';
import { MainLayot } from './layout/main-layot/main-layot';
import { PruebaComponent } from './pages/prueba/prueba';
import { SteamCallBack } from './pages/steam-callback/steam-callback';
import { Survey } from './pages/survey/survey';
import { GameRecommendation } from './pages/game-recommendation/game-recommendation';
import { OtherGames } from './pages/other-games/other-games';

const backLogSlayerRoutes: Routes = [
  {
    path: '',
    component: MainLayot,
    children: [
      //Vistas Publicas
      {
        path: 'survey',
        component: Survey,
        title: 'Encuesta'
      },
      {
        path: 'game-recommendation',
        component: GameRecommendation,
        title: 'Juego Recomendado',
      },
      {
        path: 'other-games',
        component: OtherGames,
        title: 'Otros Juegos',
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
        redirectTo: 'survey'
      },

    ]
  }
];

export default backLogSlayerRoutes;
