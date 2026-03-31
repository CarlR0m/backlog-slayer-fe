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
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
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
  router: any;
  onSubmit(){
    if(this.loginForm.invalid){
      this.hasError.set(true);
      return;
    }
    const {email, password} = this.loginForm.value;
    this.authService.login(email!, password!).subscribe(isValid=>{
      if(isValid){
        //Pendiente de implementar la redirección
        // this.router.navigateByUrl('/');
      }else{
        this.hasError.set(true);
      }
    });
  }
  
}
