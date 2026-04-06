import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '../interface/Platform.interface';

@Injectable({
  providedIn: 'root',
})
export class ImportSteamGamesService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.url;

  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.apiUrl}/platforms`);
  }
  importGamesSteam(steamId: string) {
    return this.http.post(`${this.apiUrl}/steam/sync`, {
      steam_id: steamId
    });
  }

}

