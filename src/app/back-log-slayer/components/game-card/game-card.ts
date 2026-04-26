import { Component, input } from '@angular/core';
import { UserGame } from '../../../games/interfaces/Game.interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
  game = input.required<UserGame>();
}
