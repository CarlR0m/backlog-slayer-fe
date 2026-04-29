import { Component, ChangeDetectionStrategy, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Observable, of, catchError, startWith, map, tap } from 'rxjs';

import { ProfileService, UserProfile } from '../../../games/services/profile.service';
import { GamesService } from '../../../games/services/games.service';

export interface ProfileViewModel {
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private profileService = inject(ProfileService);
  private gamesService = inject(GamesService);

  uploading = signal(false);
  avatarUrl = signal<string | null>(null);

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '65%',
    plugins: { legend: { display: false }, tooltip: { enabled: true } }
  };

  vm$: Observable<ProfileViewModel> = this.profileService.getProfile().pipe(
    tap((profile) => this.avatarUrl.set(profile.avatar)),
    map((profile) => ({
      loading: false,
      error: null,
      profile
    })),
    catchError((error) => {
      console.error('Error loading profile:', error);
      let errorMessage = 'Error al cargar el perfil';
      if (error.status === 401) errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
      else if (error.status === 403) errorMessage = 'No tienes acceso a esta información.';
      else if (error.status === 500) errorMessage = 'Error del servidor. Intenta más tarde.';
      else if (error.status === 0) errorMessage = 'No se puede conectar con el servidor.';
      else if (error.message) errorMessage = error.message;
      return of({ loading: false, error: errorMessage, profile: null as UserProfile | null });
    }),
    startWith({ loading: true, error: null, profile: null as UserProfile | null })
  );

  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.uploading.set(true);
    this.gamesService.uploadAvatar(file).subscribe({
      next: ({ avatar }) => {
        this.avatarUrl.set(avatar);
        this.uploading.set(false);
      },
      error: () => { this.uploading.set(false); }
    });
    input.value = '';
  }

  getChartData(profile: UserProfile | null): ChartData<'doughnut'> {
    if (!profile?.statistics?.labels?.length) return { labels: [], datasets: [] };
    return {
      labels: profile.statistics.labels,
      datasets: profile.statistics.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.backgroundColor,
        hoverOffset: 4
      }))
    };
  }

  formatPlaytime(minutes: number): string {
    if (!minutes || minutes <= 0) return '0h';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    return `${remainingMinutes}m`;
  }
}
