import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Platform } from '../interfaces/Platform.interface';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.url;

  getPlatforms(): Observable<Platform[]> {
    return this.http
      .get<Platform[]>(`${this.apiUrl}/platforms`)
      .pipe(map((platforms) => platforms.filter((p) => p.is_active)));
  }
}
