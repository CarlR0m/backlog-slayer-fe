import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthStatus } from '../interfaces/AuthStatus.type';
import { User, UserResponse } from '../interfaces/User.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _authError = signal<string | null>(null);
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
  errorMessage = computed<string | null>(() => this._authError());

  login(email: string, password: string):Observable<boolean>{
    this._authError.set(null);
    return this.http.post<UserResponse>(`${this.apiUrl}/login`,{
      email: email,
      password: password,
    }).pipe(
      map(response => this.authSuccess(response)),
      catchError((error:any)=>this.handleError(error))
    );
  }

  register(username: string, email: string, password: string, password_confirmation: string):Observable<boolean>{
    this._authError.set(null);
    return this.http.post<any>(`${this.apiUrl}/register`,{
      username,
      email,
      password,
      password_confirmation
    }).pipe(
      map(() => true),
      catchError((error:any) => error.status === 422 ? throwError(() => error) : this.handleError(error))
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
      catchError((error:any)=>this.handleError(error))
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
    this._authError.set(null);
    localStorage.setItem('token', response.access_token);
    return true;
  }

  private handleError(error: any) {
    if (error.status === 0 || error.status >= 500 || error?.error?.exception) {
      return this.handleServerError(error);
    }
    return this.handleAuthError(error);
  }

  private handleServerError(error: any) {
    this._authError.set('Error de servidor o conexión. Por favor, prueba en otro momento.');
    return of(false);
  }

  private handleAuthError(error: any) {
    this.logout();
    this._authError.set(error?.error?.message);
    return of(false);
  }
}
