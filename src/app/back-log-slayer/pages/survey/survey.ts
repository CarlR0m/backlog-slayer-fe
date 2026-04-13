import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  steps = [
    {
      question: '¿Cuánto tiempo quieres jugar?',
      options: [
        { label: '30min', value: '30' },
        { label: '1h', value: '60' },
        { label: '1h 30min', value: '90' },
        { label: '2h', value: '120' },
        { label: '2h 30min', value: '150' },
        { label: '3h ', value: '180' },
      ],
      controlName: 'tiempo',
    },
    {
      question: '¿Qué energía quieres?',
      options: [
        { label: 'Tranquilo', value: 'calm' },
        { label: 'Acción', value: 'action' },
        { label: 'Estrategia', value: 'strategy' },
        { label: 'Puzles', value: 'puzzle' },
      ],
      controlName: 'energia',
    },
    {
      question: '¿Qué ambientación quieres?',
      options: [
        { label: 'Western', value: 'western' },
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Sci-fi', value: 'sci-fi' },
        { label: 'Realista', value: 'realista' },
      ],
      controlName: 'ambientacion',
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
  ) {
    this.form = this.fb.group({});
    this.steps.forEach((step) => this.form.addControl(step.controlName, this.fb.control('')));
  }

  selectOption(controlName: string, option: { label: string; value: string }) {
    this.form.get(controlName)?.setValue(option.value);
    if (this.step < this.steps.length - 1) {
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
      this.step--;
    }
  }

  confirm() {
    const payload = this.form.value;

    this.http.post('http://127.0.0.1:8000/api/recommendations/survey', payload).subscribe({
      next: (response) => {
        console.log('Respuesta API:', response);
        alert('Recomendación recibida');
      },
      error: (error) => {
        console.error('Error API:', error);
        alert('Error al enviar datos');
      },
    });
  }
}
