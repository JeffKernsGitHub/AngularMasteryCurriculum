import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  
  isAuthenticated = signal<boolean>(this.hasToken());
  currentUser = signal<User | null>(this.getUserFromToken());

  constructor(private http: HttpClient, private router: Router) { }

  login(authRequest: AuthRequest) {
    return this.http.post<AuthResponse>('/api/auth/login', authRequest).pipe(
      tap(response => {
        this.setToken(response.token);
        this.isAuthenticated.set(true);
        this.currentUser.set(this.getUserFromToken());
        this.router.navigate(['/home']);
      })
    );
  }

  logout() {
    this.removeToken();
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private setToken(token: string) {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  private removeToken() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private getUserFromToken(): User | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return {
        username: decodedToken.sub,
        roles: decodedToken.roles || []
      };
    }
    return null;
  }
}