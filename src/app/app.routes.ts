import { Routes } from '@angular/router';
import { publicGuard } from './auth/guards/public.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [publicGuard],
  },
  {
    path: 'back-log-slayer',
    loadChildren: () => import('./back-log-slayer/back-log-slayer.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];
