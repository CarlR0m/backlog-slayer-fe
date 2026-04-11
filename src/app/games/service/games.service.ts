import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Platform } from '../interface/Platform.interface';
import { SteamAuthResponse, SteamSyncResponse} from '../interface/ImportSteam.interface';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.url;
  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.apiUrl}/platforms`).
    pipe(map((platforms) => platforms.filter((platform) => platform.is_active))
    );
  }
  getSteamAuthUrl(): Observable<SteamAuthResponse> {
    return this.http.get<SteamAuthResponse>(`${this.apiUrl}/auth/steam/redirect`);
  }
  syncSteamGames(): Observable<SteamSyncResponse> {
    return this.http.post<SteamSyncResponse>(`${this.apiUrl}/steam/sync`, {});
  }
}
