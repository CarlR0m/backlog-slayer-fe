import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getFieldErrorMsg, setServerErrors } from '../../../shared/utils/form-utils';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  form = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  backendError = this.authService.errorMessage;

  registerForm = this.form.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
  }, {
    validators: [this.validateEqualPasswords('password', 'password_confirmation')],
  });
  validateEqualPasswords(password1: string, password2: string) {
    return (registerForm: AbstractControl) => {
      const pass1 = registerForm.get(password1)?.value;
      const pass2 = registerForm.get(password2)?.value;
      return pass1 === pass2 ? null : { passwordsNotEquals: true };
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { username, email, password, password_confirmation } = this.registerForm.value;

    this.authService.register(username!, email!, password!, password_confirmation!).subscribe({
      next: () => {
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {
        setServerErrors(this.registerForm, err.error);
      }
    });
  }

  getError(field: string) {
    return getFieldErrorMsg(this.registerForm, field);
  }
}
