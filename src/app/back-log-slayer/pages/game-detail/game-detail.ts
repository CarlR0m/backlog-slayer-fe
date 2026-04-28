import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../../games/interfaces/Game.interface';

type PageState = 'ready' | 'error';

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

  ngOnInit(): void {
    this.loadGame();
  }

  private loadGame(): void {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { game?: Game } | undefined;

    const gameFromState = state?.game ?? (history.state as { game?: Game })?.game;

    if (!gameFromState) {
      this.pageState.set('error');
      return;
    }

    this.game.set(gameFromState);
    this.pageState.set('ready');
  }

  goBack(): void {
    this.router.navigate(['/back-log-slayer/other-games']);
  }

  goToSurvey(): void {
    this.router.navigate(['/back-log-slayer/survey']);
  }
}
