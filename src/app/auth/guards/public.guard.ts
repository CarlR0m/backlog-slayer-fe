import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

// Si YA está logueado no deja que vuelva a login
export const publicGuard: CanMatchFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authenticated = await firstValueFrom(authService.checkAuthStatus());

  if (authenticated) {
    router.navigate(['/back-log-slayer']);
    return false;
  }
  return true;
};
