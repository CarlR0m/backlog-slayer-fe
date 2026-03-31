import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthStatus } from '../interfaces/AuthStatus.type';
import { User, UserResponse } from '../interfaces/User.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private apiUrl = environment.api.url;
  private http = inject(HttpClient);
  checkStatus = rxResource({
    stream: () => this.checkAuthStatus()
  });
  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking'){
      return 'checking';
    }
    if(this._user()){
      return 'authenticated';
    }
    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  login(email: string, password: string):Observable<boolean>{
    return this.http.post<UserResponse>(`${this.apiUrl}/login`,{
      email: email,
      password: password,
    }).pipe(
      map(response => this.authSuccess(response)),
      catchError((error:any)=>this.authError(error))
    );
  }
  checkAuthStatus():Observable<boolean>{
    const token = localStorage.getItem('token');
    if(!token) {
      this.logout();
      return of(false);
    }
    return this.http.get<UserResponse>(`${this.apiUrl}/auth/check-status`).pipe(
      map(response => this.authSuccess(response)),
      catchError((error:any)=>this.authError(error))
    );
  }
  logout(){
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('token');
  }
  authSuccess(response:UserResponse){
    this._authStatus.set('authenticated');
    this._user.set(response.user);
    this._token.set(response.access_token);
    localStorage.setItem('token', response.access_token);
    return true;
  }
  authError(error:any){
    this.logout();
    return of(false);
  }
}
