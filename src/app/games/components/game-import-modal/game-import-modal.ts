import { Component, inject, OnInit, signal } from '@angular/core';
import { GamesService } from '../../service/games.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Platform, PlatformConfig } from '../../interface/Platform.interface';
import { ModalStep } from '../../interface/ModalStep.type';

@Component({
  selector: 'app-game-import-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './game-import-modal.html',
})
export class GameImportModal implements OnInit {
  private gamesService = inject(GamesService);
  private form = inject(FormBuilder);

  platformsList = signal<Platform[]>([]);
  isLoadingPlatforms = signal(true);
  currentStep = signal<ModalStep>('select_platform');
  selectedPlatform = signal<Platform | null>(null);
  errorMessage = signal<string>('');
  //Pediente de borrar
  gamesCount = signal<number>(0);

  importForm = this.form.group({ platformUserId: [''] });

  private platformConfigs: Record<string, PlatformConfig> = {
    steam: {
      step: 'OAuth',
      oAuthAction: () => this.handleSteamRedirect(),
    },
  };

  ngOnInit() {
    this.gamesService.getPlatforms().subscribe({
      next: (response) => {
        this.platformsList.set(response);
        this.isLoadingPlatforms.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar las plataformas. Inténtalo más tarde.');
        this.isLoadingPlatforms.set(false);
      }
    });
  }

  selectPlatform(platform: Platform) {
    this.selectedPlatform.set(platform);
    this.errorMessage.set('');

    const config = this.platformConfigs[platform.name.toLowerCase()];
    if (!config) return;

    this.currentStep.set(config.step);

    if (config.oAuthAction) {
      config.oAuthAction();
    }
  }
  private handleSteamRedirect() {
    this.gamesService.getSteamAuthUrl().subscribe({
      next: (response) => {
        window.location.href = response.url;
      },
      error: () => {
        this.errorMessage.set('No se pudo conectar con Steam. Inténtalo más tarde.');
        this.currentStep.set('error');
      }
    });
  }

  goBack() {
    this.currentStep.set('select_platform');
    this.selectedPlatform.set(null);
    this.importForm.reset();
  }

  resetModal() {
    this.currentStep.set('select_platform');
    this.selectedPlatform.set(null);
    this.errorMessage.set('');
  }
}
