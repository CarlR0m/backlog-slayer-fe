import { Component, ChangeDetectionStrategy, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Observable, of, catchError, startWith, map, tap, forkJoin } from 'rxjs';

import { ProfileService, UserProfile } from '../../../games/services/profile.service';
import { GamesService } from '../../../games/services/games.service';
import { RecommendedGame, SurveyResponse, RECOMMENDATION_KEY } from '../../interfaces/survey.interface';

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
  private router = inject(Router);

  uploading = signal(false);
  navigating = signal(false);
  avatarUrl = signal<string | null>(null);
  recommendedGames = signal<RecommendedGame[]>(this.loadRecommendedGames());

  private loadRecommendedGames(): RecommendedGame[] {
    try {
      const stored = localStorage.getItem(RECOMMENDATION_KEY);
      if (!stored) return [];
      const response: SurveyResponse = JSON.parse(stored);
      const result: RecommendedGame[] = [];
      if (response.mainRecommendation) result.push(response.mainRecommendation);
      return [...result, ...response.secondaryRecommendations].slice(0, 5);
    } catch {
      return [];
    }
  }

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

  /** Navega al detalle del top game con vista de biblioteca (tiene playtime y status reales) */
  navigateToTopGame(topGame: NonNullable<UserProfile['mostPlayedGame']>): void {
    if (this.navigating()) return;
    this.navigating.set(true);

    forkJoin({
      fullGame: this.gamesService.getGame(topGame.id),
      userGames: this.gamesService.getUserGames()
    }).subscribe({
      next: ({ fullGame, userGames }) => {
        const userGame = userGames.find(ug => ug.id === topGame.id) ?? null;
        this.navigating.set(false);
        this.router.navigate(['/back-log-slayer/game-detail'], {
          state: { game: fullGame, userGame, from: 'profile' }
        });
      },
      error: () => { this.navigating.set(false); }
    });
  }

  /** Navega al detalle de una recomendación de encuesta */
  navigateToRecommendedGame(game: RecommendedGame): void {
    if (this.navigating()) return;
    this.navigating.set(true);

    this.gamesService.getGame(game.id).subscribe({
      next: (fullGame) => {
        this.navigating.set(false);
        this.router.navigate(['/back-log-slayer/game-detail'], {
          state: { game: fullGame, from: 'profile' }
        });
      },
      error: () => { this.navigating.set(false); }
    });
  }

  /** Navega al detalle de un juego reciente con vista de catálogo (sin datos de biblioteca) */
  navigateToRecentGame(game: UserProfile['recentGames'][number]): void {
    if (this.navigating()) return;
    this.navigating.set(true);

    this.gamesService.getGame(game.id).subscribe({
      next: (fullGame) => {
        this.navigating.set(false);
        this.router.navigate(['/back-log-slayer/game-detail'], {
          state: { game: fullGame, from: 'profile' }
        });
      },
      error: () => { this.navigating.set(false); }
    });
  }

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

  getChartColor(profile: UserProfile | null, index: number): string {
    const colors = profile?.statistics?.datasets?.[0]?.backgroundColor;
    return Array.isArray(colors) ? (colors[index] ?? '#888') : '#888';
  }

  getChartValue(profile: UserProfile | null, index: number): number {
    return profile?.statistics?.datasets?.[0]?.data?.[index] ?? 0;
  }

  formatPlaytime(minutes: number): string {
    if (!minutes || minutes <= 0) return '0h';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    return `${remainingMinutes}m`;
  }
}
