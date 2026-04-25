import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalStep } from './ModalStep.type';

/**
 * @interface PlatformConfig
 * @description Configuración para cada plataforma en el modal de importación.
 * @property {ModalStep} step - Paso inicial del modal de importación.
 * @property {string} [placeholder] - Texto para el campo de entrada
 * @property {ValidatorFn[]} [validators] - Validadores de formularios.
 * @property {(id: string) => Observable<any>} [importFn] - Función de importación
 * @property {(errorKey: string) => string} [getError] - Función que mapea errores
 * @property {() => void} [oAuthAction] - Ejecuta la acción OAuth
 */
export interface PlatformConfig {
  step: ModalStep;
  placeholder?: string;
  validators?: ValidatorFn[];
  importFn?: (id: string) => Observable<any>;
  getError?: (errorKey: string) => string;
  oAuthAction?: () => void;
}
