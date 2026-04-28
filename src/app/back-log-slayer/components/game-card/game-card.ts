import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserGame } from '../../../games/interfaces/Game.interface';
import { GamesService } from '../../../games/services/games.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
  private readonly router = inject(Router);
  private readonly gamesService = inject(GamesService);

  game = input.required<UserGame>();

  /** Indica que se está cargando el detalle del juego */
  loading = signal(false);

  navigateToDetail(): void {
    if (this.loading()) return;

    this.loading.set(true);
    this.gamesService.getGame(this.game().id).subscribe({
      next: (fullGame) => {
        this.loading.set(false);
        this.router.navigate(['/back-log-slayer/game-detail'], {
          state: { game: fullGame, userGame: this.game() },
        });
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
