import { Component, inject, OnInit, signal } from '@angular/core';
import { ImportSteamGamesService } from '../../service/import-games.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Platform, PlatformConfig } from '../../interface/Platform.interface';
import { ModalStep } from '../../interface/ModalStep.type';
import { getApiErrorMsg } from '../../../shared/utils/form-utils';

@Component({
  selector: 'app-game-import-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './game-import-modal.html',
})
export class GameImportModal implements OnInit {
  private steamService = inject(ImportSteamGamesService);
  private form = inject(FormBuilder);

  // Mapa de configuración por plataforma
  private platformConfigs: Record<string, PlatformConfig> = {
    steam: {
      step: 'input_id',
      placeholder: 'Introduce tu Steam ID (17 dígitos)',
      validators: [
        Validators.required,
        Validators.minLength(17),
        Validators.maxLength(17),
        Validators.pattern('^[0-9]*$'),
      ],
      importFn: (id) => this.steamService.importGamesSteam(id),
      getError: (key) => {
        switch (key) {
          case 'required':
            return 'El Steam ID es obligatorio.';
          case 'minlength':
          case 'maxlength':
            return 'Debe tener exactamente 17 dígitos.';
          case 'pattern':
            return 'Solo puede contener números.';
          default:
            return 'Steam ID inválido.';
        }
      },
    },
  };

  platformsList = signal<Platform[]>([]);
  isLoadingPlatforms = signal(true);
  currentStep = signal<ModalStep>('select_platform');
  selectedPlatform = signal<Platform | null>(null);
  errorMessage = signal<string>('');
  gamesCount = signal<number>(0);

  importForm = this.form.group({ platformUserId: ['', Validators.required] });

  ngOnInit() {
    this.steamService.getPlatforms().subscribe({
      next: (response) => {
        this.platformsList.set(response.filter(p => p.is_active === true));
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
    this.importForm.reset();

    const config = this.platformConfigs[platform.name.toLowerCase()];

    if (!config) return;

    const control = this.importForm.get('platformUserId');
    control?.setValidators(config.validators);
    control?.updateValueAndValidity();
    this.currentStep.set(config.step);
  }

  onSubmit() {
    if (this.importForm.invalid || !this.selectedPlatform()) return;

    const config = this.platformConfigs[this.selectedPlatform()!.name.toLowerCase()];
    if (!config) return;

    this.currentStep.set('loading');
    const userId = this.importForm.value.platformUserId!;

    config.importFn(userId).subscribe({
      next: (response: any) => {
        const count: number = response?.games_count ?? 0;
        this.gamesCount.set(count);

        if (count === 0) {
          this.errorMessage.set(
            'No se encontraron juegos. Asegúrate de que tu perfil y los detalles de tus juegos son públicos.'
          );
          this.currentStep.set('error');
        } else {
          this.currentStep.set('success');
        }
      },
      error: (error) => {
        this.errorMessage.set(getApiErrorMsg(error));
        this.currentStep.set('error');
      }
    });
  }

  getFieldError(): string {
    const control = this.importForm.get('platformUserId');
    if (!control?.errors || !control.touched) return '';

    const config = this.platformConfigs[this.selectedPlatform()?.name.toLowerCase() ?? ''];
    const firstError = Object.keys(control.errors)[0];
    return config?.getError(firstError) ?? 'Campo inválido.';
  }

  getPlaceholder(): string {
    const config = this.platformConfigs[this.selectedPlatform()?.name.toLowerCase() ?? ''];
    return config?.placeholder ?? 'Introduce tu ID';
  }

  goBack() {
    this.currentStep.set('select_platform');
    this.selectedPlatform.set(null);
    this.importForm.reset();
  }

  resetModal() {
    this.currentStep.set('select_platform');
    this.selectedPlatform.set(null);
    this.gamesCount.set(0);
    this.errorMessage.set('');
    this.importForm.reset();
  }
}
