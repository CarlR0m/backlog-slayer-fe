import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GamesService } from '../../../games/services/games.service';
import { Game } from '../../../games/interfaces/Game.interface';

@Component({
  selector: 'app-all-games',
  imports: [RouterLink],
  templateUrl: './all-games.html',
  styleUrl: './all-games.css',
})
export class AllGames implements OnInit {
  private readonly gamesService = inject(GamesService);
  private readonly router = inject(Router);

  games = signal<Game[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe({
      next: (games) => {
        this.games.set(games);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los juegos.');
        this.loading.set(false);
      },
    });
  }

  navigateToDetail(game: Game): void {
    this.router.navigate(['/back-log-slayer/game-detail'], {
      state: { game },
    });
  }

  goToSurvey(): void {
    this.router.navigate(['/back-log-slayer/survey']);
  }
}
