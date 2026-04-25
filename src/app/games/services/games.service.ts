import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Game, UserGame, Tag, GameSummary } from '../interfaces/Game.interface';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.url;

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/game/${id}`);
  }

  getUserGames(): Observable<UserGame[]> {
    return this.http.get<UserGame[]>(`${this.apiUrl}/user/games`);
  }

  getUserTags(userId: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/${userId}/user-tags`);
  }

  getGameSummary(userId: number): Observable<GameSummary> {
    return this.http.get<GameSummary>(`${this.apiUrl}/${userId}/game-summary`);
  }
}
