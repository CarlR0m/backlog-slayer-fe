import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

// Si NO está logueado, lo manda a la pantalla de Login y no le deja pasar.
export const authGuard: CanMatchFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authenticated = await firstValueFrom(authService.checkAuthStatus());

  if (!authenticated) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
