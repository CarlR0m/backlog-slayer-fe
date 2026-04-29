import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FormBuilder,
   ReactiveFormsModule,
   Validators
  } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = inject(FormBuilder);
  hasError = signal(false);
  authService = inject(AuthService);
  loginForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(8)]],
  });
  router = inject(Router);
  onSubmit(){
    if(this.loginForm.invalid){
      this.hasError.set(true);
      return;
    }

    this.hasError.set(false);

    const {email, password} = this.loginForm.value;
    this.authService.login(email!, password!).subscribe(isValid=>{
      if(isValid){
        this.router.navigateByUrl('/back-log-slayer');
      }
    });
  }

}
