import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, catchError, startWith, map } from 'rxjs';

import { ProfileService, UserProfile } from '../../../games/services/profile.service';

/**
 * Estado del perfil para la UI
 */
export interface ProfileViewModel {
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private profileService = inject(ProfileService);

  /**
   * ViewModel observable con manejo de estados loading/error
   * Usa async pipe en el template para evitar múltiples suscripciones
   */
  vm$ = this.profileService.getProfile().pipe(
    map((profile) => ({
      loading: false,
      error: null,
      profile
    })),
    catchError((error) => {
      console.error('Error loading profile:', error);
      let errorMessage = 'Error al cargar el perfil';
      
      if (error.status === 401) {
        errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
      } else if (error.status === 403) {
        errorMessage = 'No tienes acceso a esta información.';
      } else if (error.status === 500) {
        errorMessage = 'Error del servidor. Intenta más tarde.';
      } else if (error.status === 0) {
        errorMessage = 'No se puede conectar con el servidor.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return of({
        loading: false,
        error: errorMessage,
        profile: null as UserProfile | null
      });
    }),
    startWith({
      loading: true,
      error: null,
      profile: null as UserProfile | null
    })
  );

  /**
   * Formatea el tiempo de juego de minutos a formato legible
   * @param minutes - Tiempo total en minutos
   */
  formatPlaytime(minutes: number): string {
    if (!minutes || minutes <= 0) {
      return '0h';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return remainingMinutes > 0 
        ? `${hours}h ${remainingMinutes}m` 
        : `${hours}h`;
    }

    return `${remainingMinutes}m`;
  }
}