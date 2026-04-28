import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface UserProfile {
  name: string;
  avatar: string;
  tags: string[];
  mostPlayedGame: {
    title: string;
    image: string;
  };
  recommendedGames: {
    title: string;
    image: string;
  }[];
}

/**
 * Simulación de respuesta API (puede no coincidir con el modelo final)
 */
interface ApiProfileResponse {
  username: string;
  avatar_url: string;
  badges: string[];
  top_game: {
    name: string;
    cover: string;
  };
  recommendations: {
    name: string;
    cover: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly API_URL = '/api/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<ApiProfileResponse>(this.API_URL).pipe(
      map((response) => this.mapToUserProfile(response))
    );
  }

  /**
   * Mapper API → dominio
   */
  private mapToUserProfile(api: ApiProfileResponse): UserProfile {
    return {
      name: api.username,
      avatar: api.avatar_url,
      tags: api.badges,
      mostPlayedGame: {
        title: api.top_game.name,
        image: api.top_game.cover
      },
      recommendedGames: api.recommendations.slice(0, 3).map((game) => ({
        title: game.name,
        image: game.cover
      }))
    };
  }
}