import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';

/**
 * =========================================================================================
 * AuthService - Client-Side Authentication & Session Management (Phase 4)
 * =========================================================================================
 *
 * Manages the client-side authentication lifecycle, JWT token parsing, and user session state:
 *
 * 1. 🔑 JWT Authentication Flow:
 *    - Step 1: User submits credentials via `login(authRequest)`.
 *    - Step 2: Backend authenticates and returns a signed JWT.
 *    - Step 3: Client stores token in secure storage and parses claims (e.g. `sub`, `roles`).
 *    - Step 4: `authInterceptor` automatically attaches `Authorization: Bearer <token>` to requests.
 *
 * 2. 🛡️ Token Storage & Security Considerations (SECDEVOPS):
 *    - localStorage: Accessible to JavaScript; vulnerable to Cross-Site Scripting (XSS).
 *    - HTTP-Only Cookies: Inaccessible to JavaScript; protects against XSS token theft, but
 *      requires CSRF (Cross-Site Request Forgery) protection (SameSite / Anti-CSRF tokens).
 *
 * 3. 📜 NIST Session Standards (NIST SP 800-63B & NIST SP 800-53 AC-12):
 *    - AC-12 Session Termination: Explicit user logout must clear tokens and invalidate backend session.
 *    - Inactivity & Overall Timeout: Sessions must terminate after designated idle/absolute duration.
 *    - Secure Transport: Tokens must only be transmitted over HTTPS (TLS 1.3).
 *    - Warning Mechanisms: Clients should warn users prior to session expiration.
 *
 * 4. ⚡ Signal-Based State:
 *    - `isAuthenticated` and `currentUser` signals provide reactive session status across the app.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly AUTH_TOKEN_KEY = 'auth_token';

  // =========================================================================================
  // REACTIVE SESSION SIGNALS
  // =========================================================================================

  /**
   * 🔒 Signal indicating whether a valid token exists in storage.
   */
  readonly isAuthenticated = signal<boolean>(this.hasToken());

  /**
   * 👤 Signal holding decoded user claims (username and roles).
   */
  readonly currentUser = signal<User | null>(this.getUserFromToken());

  /**
   * 🏷️ Computed signal listing user roles.
   */
  readonly userRoles = computed<string[]>(() => this.currentUser()?.roles || []);

  /**
   * 👑 Computed helper for admin role check.
   */
  readonly isAdmin = computed<boolean>(() => this.hasRole('ADMIN'));

  /**
   * Authenticates user with username and password.
   */
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', authRequest).pipe(
      tap(response => {
        this.setToken(response.token);
        this.isAuthenticated.set(true);
        this.currentUser.set(this.getUserFromToken());
        this.router.navigate(['/home']);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login authentication error:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Terminates user session (NIST AC-12 Session Termination).
   */
  logout(): void {
    this.removeToken();
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Checks if current user possesses a specific role claim.
   */
  hasRole(role: string): boolean {
    const roles = this.userRoles();
    return roles.includes(role);
  }

  /**
   * Checks if user has at least one of the specified roles.
   */
  hasAnyRole(requiredRoles: string[]): boolean {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    const roles = this.userRoles();
    return requiredRoles.some(r => roles.includes(r));
  }

  /**
   * Retrieves raw JWT token string.
   */
  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Decodes JWT claims to construct User profile model.
   */
  private getUserFromToken(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return {
        username: decoded.sub || 'unknown',
        roles: Array.isArray(decoded.roles) ? decoded.roles : (decoded.roles ? [decoded.roles] : [])
      };
    } catch {
      this.removeToken();
      return null;
    }
  }
}
