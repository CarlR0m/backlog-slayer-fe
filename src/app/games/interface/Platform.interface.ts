import { ValidatorFn } from "@angular/forms";
import { ModalStep } from "./ModalStep.type";
import { Observable } from "rxjs";

export interface Platform {
  id: number;
  name: string;
  is_active: boolean;
}

export interface PlatformConfig {
  step: ModalStep;
  placeholder?: string;
  validators: ValidatorFn[];
  importFn: (id: string) => Observable<any>;
  getError: (errorKey: string) => string;
}
