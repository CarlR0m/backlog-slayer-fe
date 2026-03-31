import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthBanner } from '../../components/auth-banner/auth-banner';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthBanner],
  templateUrl: './auth-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout {}
