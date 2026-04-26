import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendedGame, SurveyResponse, RECOMMENDATION_KEY } from '../../interfaces/survey.interface';
import { RecommendationGrid } from '../../components/recommendation-grid/recommendation-grid';

type PageState = 'ready' | 'error';

@Component({
  selector: 'app-other-games',
  imports: [RecommendationGrid],
  templateUrl: './other-games.html',
  styleUrl: './other-games.css',
  })
export class OtherGames implements OnInit {
  private readonly router = inject(Router);

  readonly pageState = signal<PageState>('error');
  readonly games = signal<RecommendedGame[]>([]);

  ngOnInit(): void {
    this.loadGames();
  }

  private loadGames(): void {
    try {
      const stored = localStorage.getItem(RECOMMENDATION_KEY);

      if (!stored) {
        this.pageState.set('error');
        return;
      }

      const response: SurveyResponse = JSON.parse(stored);
      const secondary = response?.secondaryRecommendations ?? [];

      if (!Array.isArray(secondary) || secondary.length === 0) {
        this.pageState.set('error');
        return;
      }

      this.games.set(secondary);
      this.pageState.set('ready');
    } catch {
      this.pageState.set('error');
    }
  }

  goToGameDetail(): void {
    this.router.navigate(['/back-log-slayer/game-recommendation']);
  }

  goToSurvey(): void {
    localStorage.removeItem(RECOMMENDATION_KEY);
    this.router.navigate(['/back-log-slayer/survey']);
  }
}
