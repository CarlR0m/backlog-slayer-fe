import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendedGame, SurveyResponse, RECOMMENDATION_KEY } from '../../interfaces/survey.interface';
import { RecommendationCard } from '../../components/recommendation-card/recommendation-card';


type PageState = 'ready' | 'error';

@Component({
  selector: 'app-game-recommendation',
  imports: [RecommendationCard],
  templateUrl: './game-recommendation.html',
  styleUrl: './game-recommendation.css',
})
export class GameRecommendation implements OnInit {
  private readonly router = inject(Router);

  readonly pageState = signal<PageState>('error');
  readonly game = signal<RecommendedGame | null>(null);

  ngOnInit(): void {
    this.loadRecommendation();
  }

  private loadRecommendation(): void {
    try {
      const stored = localStorage.getItem(RECOMMENDATION_KEY);

      if (!stored) {
        this.pageState.set('error');
        return;
      }

      const response: SurveyResponse = JSON.parse(stored);

      if (!response?.mainRecommendation) {
        this.pageState.set('error');
        return;
      }

      this.game.set(response.mainRecommendation);
      this.pageState.set('ready');
    } catch {
      this.pageState.set('error');
    }
  }

  goToOtherGames(): void {
    this.router.navigate(['/back-log-slayer/other-games']);
  }

  goToSurvey(): void {
    localStorage.removeItem(RECOMMENDATION_KEY);
    this.router.navigate(['/back-log-slayer/survey']);
  }
}
