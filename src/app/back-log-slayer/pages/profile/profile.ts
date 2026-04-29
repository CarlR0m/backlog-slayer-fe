import { Component, inject, signal, OnInit, computed, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { GamesService } from '../../../games/services/games.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UserProfile } from '../../../games/interfaces/Game.interface';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, BaseChartDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private gamesService = inject(GamesService);
  authService = inject(AuthService);

  profile = signal<UserProfile | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  uploading = signal(false);

  chartData = computed<ChartData<'doughnut'>>(() => {
    const stats = this.profile()?.statistics;
    if (!stats) return { labels: [], datasets: [] };
    return { labels: stats.labels, datasets: stats.datasets };
  });

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  ngOnInit(): void {
    this.gamesService.getUserProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el perfil.');
        this.loading.set(false);
      }
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
        const current = this.profile();
        if (current) {
          this.profile.set({ ...current, user: { ...current.user, avatar } });
        }
        this.uploading.set(false);
      },
      error: () => {
        this.uploading.set(false);
      }
    });

    // Limpiar el input para permitir subir el mismo fichero de nuevo
    input.value = '';
  }

  formatPlaytime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    return `${hours}h ${mins} min`;
  }

  formatTotalPlaytime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}H ${mins} MIN`;
  }
}
