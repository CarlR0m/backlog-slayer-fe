import { Routes } from '@angular/router';
import { MainLayot } from './layout/main-layot/main-layot';
import { PruebaComponent } from './pages/prueba/prueba';
import { SteamCallBack } from './pages/steam-callback/steam-callback';
import { Survey } from './pages/survey/survey';
import { GameRecommendation } from './pages/game-recommendation/game-recommendation';
import { OtherGames } from './pages/other-games/other-games';
import { GamesLibrary } from './pages/games-library/games-library';
import { GameDetail } from './pages/game-detail/game-detail';
import { AllGames } from './pages/all-games/all-games';
import { authGuard } from '../auth/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile';

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
      {
        path: 'game-detail',
        component: GameDetail,
        title: 'Detalle del Juego',
      },
      {
        path: 'all-games',
        component: AllGames,
        title: 'Todos los Juegos',
      },
      //Vistas Privadas
      {
        path: 'steam-sync',
        component: SteamCallBack,
        title: 'Sincronización con Steam',
        canMatch: [authGuard]
      },
      {
        path: 'games-library',
        component: GamesLibrary,
        title: 'Mi Biblioteca',
        canMatch: [authGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Mi Perfil',
        canMatch: [authGuard]
      },
      {
        path: '**',
        redirectTo: 'survey'
      },

    ]
  }
];

export default backLogSlayerRoutes;
