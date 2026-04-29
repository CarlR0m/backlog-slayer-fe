import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Game, UserGame } from '../../../games/interfaces/Game.interface';

type PageState = 'ready' | 'error';

const STATUS_LABELS: Record<string, string> = {
  backlog: 'Pendiente',
  playing: 'Jugando',
  completed: 'Completado',
  dropped: 'Abandonado',
};

@Component({
  selector: 'app-game-detail',
  imports: [],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
})
export class GameDetail implements OnInit {
  private readonly router = inject(Router);

  readonly pageState = signal<PageState>('error');
  readonly game = signal<Game | null>(null);
  readonly userGame = signal<UserGame | null>(null);
  readonly from = signal<string>('');

  readonly isLibraryGame = computed(() => this.userGame() !== null);

  readonly playtimeHours = computed(() =>
    Math.floor((this.userGame()?.pivot.playtime_forever ?? 0) / 60)
  );

  readonly playtimeMinutes = computed(() =>
    (this.userGame()?.pivot.playtime_forever ?? 0) % 60
  );

  readonly statusLabel = computed(() =>
    STATUS_LABELS[this.userGame()?.pivot.status ?? ''] ?? ''
  );

  ngOnInit(): void {
    this.loadGame();
  }

  private loadGame(): void {
    const historyState = history.state as { game?: Game; userGame?: UserGame; from?: string };

    const gameFromState = historyState?.game;
    const userGameFromState = historyState?.userGame;

    if (!gameFromState) {
      this.pageState.set('error');
      return;
    }

    this.game.set(gameFromState);
    if (userGameFromState) {
      this.userGame.set(userGameFromState);
    }
    if (historyState?.from) {
      this.from.set(historyState.from);
    }
    this.pageState.set('ready');
  }

  goBack(): void {
    if (this.from() === 'profile') {
      this.router.navigate(['/back-log-slayer/profile']);
    } else if (this.isLibraryGame()) {
      this.router.navigate(['/back-log-slayer/games-library']);
    } else {
      this.router.navigate(['/back-log-slayer/all-games']);
    }
  }

  goToSurvey(): void {
    this.router.navigate(['/back-log-slayer/survey']);
  }
}
