import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameCard } from '../../components/game-card/game-card';
import { GamesService } from '../../../games/services/games.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UserGame } from '../../../games/interfaces/Game.interface';

const PAGE_SIZE = 18;

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
  currentPage = signal(1);

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.games().length / PAGE_SIZE)));

  readonly pagedGames = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.games().slice(start, start + PAGE_SIZE);
  });

  readonly visiblePages = computed<(number | null)[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | null)[] = [1];
    if (current > 3) pages.push(null);
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push(null);
    pages.push(total);
    return pages;
  });

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

  goToPage(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage(): void {
    if (this.currentPage() > 1) this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) this.goToPage(this.currentPage() + 1);
  }
}
