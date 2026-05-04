import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SurveyResponse, RECOMMENDATION_KEY } from '../../interfaces/survey.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './survey.html',
  styleUrls: ['./survey.css'],
})
export class Survey {
  form: FormGroup;
  step: number = 0;

  gameTypeOptionsMap: Record<string, { label: string; value: string }[]> = {
    puzzle: [
      { label: 'Aventura', value: 'adventure' },
      { label: 'Ambientales', value: 'atmospheric' },
      { label: 'Exploración', value: 'exploration' },
      { label: 'Investigación', value: 'investigation' },
      { label: 'Misterio', value: 'mystery' },
      { label: 'No lineales', value: 'nonlinear' },
      { label: 'Filosóficos', value: 'philosophical' },
      { label: 'Habitación de escape', value: 'escape' },
    ],

    cardgame: [
      { label: 'Construcción de barajas', value: 'deckbuilding' },
      { label: 'Estrategia (Inclute Tácticos)', value: 'strategy' },
      { label: 'Combate con cartas', value: 'cardcombat' },
      { label: 'Roguelike', value: 'roguelike' },
      { label: 'Arcade', value: 'arcade' },
      { label: 'JcJ', value: 'pvp' },
    ],

    tabletop: [
      { label: 'Juegos de cartas', value: 'cardgames' },
      { label: 'Rol', value: 'rpg' },
      { label: 'Estrategia', value: 'strategy' },
      { label: 'Clásicos', value: 'classic' },
      { label: 'Bélicos', value: 'war' },
      { label: 'JcJ', value: 'pvp' },
      { label: 'Cooperativos', value: 'cooperative' },
    ],

    fighting: [
      { label: 'Arcade', value: 'arcade' },
      { label: 'JcJ', value: 'pvp' },
      { label: 'Artes marciales', value: 'martialarts' },
      { label: 'Anime', value: 'anime' },
      { label: 'MOBA', value: 'moba' },
      { label: 'MMORPG', value: 'mmorpg' },
    ],

    turnbasedcombat: [
      { label: 'Coleccionista de criaturas', value: 'creaturecollector' },
      { label: 'Basados en clases', value: 'classbased' },
      { label: 'MMORPG', value: 'mmorpg' },
    ],

    simulation: [
      { label: 'Simulador de vida', value: 'life' },
      { label: 'Simulador de automóviles', value: 'cars' },
      { label: 'Construcción de ciudades', value: 'citybuilder' },
      { label: 'Gestión de recursos', value: 'management' },
      { label: 'Simulador agrícola', value: 'farming' },
      { label: 'Simulador de citas', value: 'dating' },
      { label: 'Supervivencia', value: 'survival' },
    ],

    automation: [
      { label: 'Sandbox', value: 'sandbox' },
      { label: 'Agricultura', value: 'farming' },
      { label: 'Fabricación', value: 'crafting' },
      { label: 'Mundo abierto', value: 'openworld' },
      { label: 'Gestión de recursos', value: 'management' },
      { label: 'Construcción de bases', value: 'basebuilding' },
      { label: 'Supervivencia', value: 'survival' },
      { label: 'Casuales', value: 'casual' },
    ],

    fps: [
      { label: 'Disparos de héroe', value: 'hero' },
      { label: 'Zombies', value: 'zombies' },
      { label: 'Sangrientos', value: 'gore' },
      { label: 'Parkour', value: 'parkour' },
      { label: 'MOBA', value: 'moba' },
    ],

    roguelike: [
      { label: 'Plataformas', value: 'platformer' },
      { label: 'Construcción de barajas', value: 'deckbuilding' },
      { label: 'Exploración de mazmorras', value: 'dungeon' },
      { label: 'Acción', value: 'action' },
      { label: 'Disparos', value: 'shooter' },
      { label: 'Metroidvania', value: 'metroidvania' },
      { label: 'Defensa de torres', value: 'towerdefense' },
    ],

    idle: [
      { label: 'Gestión', value: 'management' },
      { label: 'Roguelite', value: 'roguelite' },
      { label: 'Economía', value: 'economy' },
      { label: 'Minería', value: 'mining' },
      { label: 'Relajante', value: 'relaxing' },
      { label: 'Automatización', value: 'automation' },
    ],

    party: [
      { label: 'Lógica', value: 'logic' },
      { label: 'Plataformas', value: 'platformer' },
      { label: 'Basados en equipos', value: 'team' },
      { label: 'Acción', value: 'action' },
      { label: 'Comedia', value: 'comedy' },
      { label: 'Estrategia', value: 'strategy' },
      { label: 'Misterio', value: 'mystery' },
      { label: 'Supervivencia', value: 'survival' },
    ],

    racing: [
      { label: 'Retro', value: 'retro' },
      { label: 'Deportes', value: 'sports' },
      { label: 'Plataformas', value: 'platformer' },
      { label: 'JcJ', value: 'pvp' },
      { label: 'Conducción', value: 'driving' },
      { label: 'Realistas', value: 'realistic' },
    ],

    platformer: [
      { label: 'Metroidvania', value: 'metroidvania' },
      { label: 'Difíciles', value: 'hard' },
      { label: 'Plataformas de puzles', value: 'puzzleplatformer' },
      { label: 'Exploración', value: 'exploration' },
      { label: 'Retro', value: 'retro' },
      { label: 'Acción', value: 'action' },
    ],

    visualnovel: [
      { label: 'Romance', value: 'romance' },
      { label: 'Terror', value: 'horror' },
      { label: 'Aventura', value: 'adventure' },
      { label: 'Exploración', value: 'exploration' },
      { label: 'Ambientales', value: 'atmospheric' },
      { label: 'Finales múltiples', value: 'multipleendings' },
    ],
  };

  steps = [
    {
      question: '¿Quieres que busquemos en tu biblioteca?',
      options: [
        { label: 'Sí', value: '1' },
        { label: 'No', value: '0' },
      ],
      controlName: 'library',
    },
    {
      question: '¿Cuánto tiempo quieres jugar?',
      options: [
        { label: 'Sesión corta', value: '0' },
        { label: 'Sesión media', value: '1' },
        { label: 'Sesión larga', value: '2' },
      ],
      controlName: 'sessionLength',
    },
    {
      question: '¿A qué quieres jugar?',
      options: [
        { label: 'Puzles', value: 'puzzle' },
        { label: 'Cartas', value: 'cardgame' },
        { label: 'Juego de mesa', value: 'tabletop' },
        { label: 'Lucha', value: 'fighting' },
        { label: 'Combate por turnos', value: 'turnbasedcombat' },
        { label: 'Simulación', value: 'simulation' },
        { label: 'Automatización', value: 'automation' },
        { label: 'FPS', value: 'fps' },
        { label: 'Roguelite\nRoguelike', value: 'roguelike' },
        { label: 'Idle/Clicker', value: 'idle' },
        { label: 'Cooperativos/Party', value: 'party' },
        { label: 'Carreras', value: 'racing' },
        { label: 'Plataformas', value: 'platformer' },
        { label: 'Noverla visual', value: 'visualnovel' },
        { label: 'Otros...', value: 'other' }
      ],
      controlName: 'gameType',
    },
    {
      question: '¿Qué tipo de juego quieres?',
      options: [],
      controlName: 'tags',
      dynamic: true,
    },
    {
      question: '¿Solo o acompañado?',
      options: [
        { label: 'Solo', value: 'solo' },
        { label: 'Cooperativo', value: 'coop' },
        { label: 'Multijugador', value: 'multi' },
      ],
      controlName: 'modo',
    },
    {
      question: '¿En qué plataforma quieres jugar?',
      options: [
        { label: 'PC', value: 'pc' },
        { label: 'Switch', value: 'switch' },
        { label: 'Play', value: 'play' },
      ],
      controlName: 'plataforma',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      library: [''],
      sessionLength: [''],
      gameType: [''],
      tags: [[]],
      modo: [''],
      plataforma: [''],
    });
  }

  isTagSelected(value: string): boolean {
    const tags = this.form.get('tags')?.value as string[];
    return tags.includes(value);
  }
  toggleTag(option: { label: string; value: string }) {
    const tagsControl = this.form.get('tags');
    const currentTags = (tagsControl?.value as string[]) || [];

    if (currentTags.includes(option.value)) {
      tagsControl?.setValue(currentTags.filter(t => t !== option.value));
    } else {
      tagsControl?.setValue([...currentTags, option.value]);
    }
  }

  getTagOptions() {
    const selectedGameType = this.form.get('gameType')?.value;
    return this.gameTypeOptionsMap[selectedGameType] || [];
  }

  getTagQuestion() {
    const selected = this.form.get('gameType')?.value;

    const map: any = {
      puzzle: '¿Qué tipo de juego de puzles?',
      simulation: '¿Qué tipo de simulación?',
      fps: '¿Qué tipo de FPS?',
    };

    return map[selected] || '¿Qué tipo de juego quieres?';
  }

  selectOption(controlName: string, option: { label: string; value: string }) {
    if (controlName === 'tags') {
      this.toggleTag(option);
      return;
    }

    this.form.get(controlName)?.setValue(option.value);

    if (controlName === 'gameType') {
      this.form.get('tags')?.setValue([]);
    }

    if (controlName === 'gameType' && option.value === 'other') {
      this.step += 2;
    } else if (this.step < this.steps.length - 1) {
      this.nextStep();
    }
  }

  nextStep() {
    if (this.step < this.steps.length - 1) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 0) {
      const gameType = this.form.get('gameType')?.value;
      if (this.step === 4 && gameType === 'other') {
        this.step = 2;
      } else {
        this.step--;
      }
    }
  }

  getOptionsGridClass(): string {
    const options = this.steps[this.step].dynamic
      ? this.getTagOptions()
      : this.steps[this.step].options;
    const count = options.length;
    if (count <= 2) return 'options-grid options-grid--2';
    if (count <= 3) return 'options-grid options-grid--3';
    if (count > 12) return 'options-grid options-grid--5';
    return 'options-grid options-grid--4';
  }

  confirm() {
    const payload = this.form.value;

    this.http.post<SurveyResponse>(`${environment.api.url}/recommendations/survey`, payload)
      .subscribe({
        next: (response) => {
          console.log('Respuesta API:', response);
          localStorage.setItem(RECOMMENDATION_KEY, JSON.stringify(response));
          this.router.navigate(['/back-log-slayer/game-recommendation']);
        },
        error: (error) => {
          console.error('Error API:', error);
          alert('Error al enviar datos');
        },
      });
  }
}
