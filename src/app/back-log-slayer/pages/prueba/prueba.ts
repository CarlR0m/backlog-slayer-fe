import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameImportModal } from '../../../games/components/game-import-modal/game-import-modal';

@Component({
  selector: 'app-prueba',
  imports: [GameImportModal],
  templateUrl: './prueba.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PruebaComponent { }
