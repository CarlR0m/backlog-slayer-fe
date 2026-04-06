import {inject, Injectable, ɵɵconditionalBranchCreate} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImportSteamGamesService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.url;

  importGamesSteam(steamId: string){
    return this.http.post(`${this.apiUrl}/steam/sync`, {
      steam_id: steamId
    });
  }
}

