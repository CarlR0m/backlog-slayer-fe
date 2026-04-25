import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SteamAuthResponse, SteamSyncResponse } from '../interfaces/ImportSteam.interface';

@Injectable({
  providedIn: 'root',
})
export class SteamService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.url;

  /** Obtiene la URL de redirección OAuth de Steam */
  getSteamAuthUrl(): Observable<SteamAuthResponse> {
    return this.http.get<SteamAuthResponse>(`${this.apiUrl}/auth/steam/redirect`);
  }

  /** Sincroniza la librería de Steam del usuario autenticado */
  syncSteamGames(): Observable<SteamSyncResponse> {
    return this.http.post<SteamSyncResponse>(`${this.apiUrl}/steam/sync`, {});
  }
}
