import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Statistics } from './interfaces/statics.interface';


@Injectable({
  providedIn: 'root',
})
export class StatisticsGraphService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.url;

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.apiUrl}/statistics`);
  }
}
