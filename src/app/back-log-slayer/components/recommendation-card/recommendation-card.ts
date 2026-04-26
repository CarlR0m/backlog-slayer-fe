import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RecommendedGame } from '../../interfaces/survey.interface';

@Component({
  selector: 'app-recommendation-card',
  imports: [],
  templateUrl: './recommendation-card.html',
  styleUrl: './recommendation-card.css'
})
export class RecommendationCard {
  game = input.required<RecommendedGame>();

  goOtherGames = output<void>();
  goSurvey = output<void>();
}
