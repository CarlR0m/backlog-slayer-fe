import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ImportSteamGamesService } from '../../service/import-steam-games.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-import-modal',
  imports: [],
  template: `<p>game-import-modal works!</p>`,
  styleUrl: './game-import-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameImportModal {
  private steamService = inject(ImportSteamGamesService);
  private form = inject(FormBuilder);

  loading = signal(false);
  importForm = this.form.group({
    steamId: ['', [Validators.required, Validators.pattern(/^[0-9]+$/),Validators.minLength(17),Validators.maxLength(17)]],
  });
  onSubmit(){
    if(this.importForm.valid) return;
    this.loading.set(true);
    const {steamId} = this.importForm.value;
    this.steamService.importGamesSteam(steamId!).subscribe({
      next: (response) => {
        this.loading.set(false);
        console.log(response);
      },
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      }
    });
  }
}
