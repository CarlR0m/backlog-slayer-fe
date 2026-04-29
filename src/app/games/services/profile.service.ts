import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';

/**
 * Interfaz de dominio UserProfile - adaptada al contrato de API
 */

export interface UserProfile {
  name: string;
  steamId: string | null;
  tags: string[];
  mostPlayedGame: {
    id: number;
    title: string;
    image: string;
    playtime: number;
  } | null;
  recentGames: {
    id: number;
    title: string;
    image: string;
  }[];
  totalPlaytime: number;
  statistics: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
    }[];
  };
}

/**
 * Respuesta real del endpoint GET /api/user/profile
 */

interface ApiProfileResponse {
  user: {
    id: number;
    username: string;
    steam_id: string | null;
  };
  tags: {
    id: number;
    name: string;
  }[];
  topGame: {
    id: number;
    title: string;
    img: string;
    playtime: number;
  } | null;
  recentGames: {
    id: number;
    title: string;
    img: string;
  }[];
  totalPlaytime: number;
  statistics: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly API_URL = `${environment.api.url}/user/profile`;
  private readonly authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    // Debug: verificar token antes de hacer la petición
    const token = this.authService.token();
    console.log('[ProfileService] Token actual:', token ? 'presente' : 'ausente');
    console.log('[ProfileService] URL:', this.API_URL);

    return this.http.get<ApiProfileResponse>(this.API_URL).pipe(
      map((response) => this.mapToUserProfile(response)),
      catchError((error: HttpErrorResponse) => {
        console.error('[ProfileService] Error HTTP:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          error: error.error
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Mapper API → dominio
   * Adapta la respuesta del backend al modelo de dominio
   */
  private mapToUserProfile(api: ApiProfileResponse): UserProfile {
    return {
      name: api.user.username,
      steamId: api.user.steam_id,
      tags: api.tags.map(tag => tag.name),
      mostPlayedGame: api.topGame ? {
        id: api.topGame.id,
        title: api.topGame.title,
        image: api.topGame.img,
        playtime: api.topGame.playtime
      } : null,
      recentGames: api.recentGames.map(game => ({
        id: game.id,
        title: game.title,
        image: game.img
      })),
      totalPlaytime: api.totalPlaytime,
      statistics: api.statistics
    };
  }
}