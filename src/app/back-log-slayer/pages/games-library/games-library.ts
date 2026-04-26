import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameCard } from '../../components/game-card/game-card';
import { GamesService } from '../../../games/services/games.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UserGame } from '../../../games/interfaces/Game.interface';

@Component({
  selector: 'app-games-library',
  imports: [GameCard, RouterLink],
  templateUrl: './games-library.html',
  styleUrl: './games-library.css'
})
export class GamesLibrary implements OnInit {
  private gamesService = inject(GamesService);
  authService = inject(AuthService);

  games = signal<UserGame[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.gamesService.getUserGames().subscribe({
      next: (games) => {
        this.games.set(games);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los juegos.');
        this.loading.set(false);
      }
    });
  }
}
