import {Routes} from '@angular/router'
import { AuthLayout } from './layout/auth-layout/auth-layout'
import { LoginComponent } from './pages/login/login'
import { RegisterComponent } from './pages/register/register'
const authRoutes: Routes = [
  {
    path: '',
    component : AuthLayout,
    children: [
      {
        path:'login',
        component: LoginComponent,
      },
      {
        path:'register',
        component: RegisterComponent,
      },
      {
        path:'**',
        redirectTo: 'login'
      },
    ],
  },
];

export default authRoutes;
