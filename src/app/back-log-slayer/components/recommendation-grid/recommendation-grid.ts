import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RecommendedGame } from '../../interfaces/survey.interface';

@Component({
  selector: 'app-recommendation-grid',
  imports: [],
  templateUrl: './recommendation-grid.html',
  styleUrl: './recommendation-grid.css',
})
export class RecommendationGrid {
  games = input.required<RecommendedGame[]>();

  goDetail = output<void>();
  goSurvey = output<void>();
}
