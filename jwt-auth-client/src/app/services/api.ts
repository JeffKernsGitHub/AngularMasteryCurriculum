import { Injectable, inject, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * =========================================================================================
 * ApiService - Role-Protected HTTP Data Endpoints (Phase 4)
 * =========================================================================================
 *
 * Demonstrates HTTP requests to endpoints protected by server-side authorization:
 * - `/api/public`: Unauthenticated access.
 * - `/api/user`: Requires valid JWT with USER or ADMIN role.
 * - `/api/admin`: Requires valid JWT with ADMIN role.
 *
 * Supports both modern Angular 22 `httpResource` Signal primitives and RxJS Observable flows.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);

  // =========================================================================================
  // ⚡ Modern Angular 22 Signal-Based HTTP Resources
  // =========================================================================================

  /**
   * Creates a reactive HTTP resource for the unauthenticated public endpoint.
   */
  getPublicResource() {
    return httpResource.text(() => '/api/public', {
      defaultValue: 'Loading public server status...',
      injector: this.injector
    });
  }

  /**
   * Creates a reactive HTTP resource for the user-protected endpoint (requires USER or ADMIN role).
   */
  getUserResource() {
    return httpResource.text(() => '/api/user', {
      defaultValue: 'Loading user protected data...',
      injector: this.injector
    });
  }

  /**
   * Creates a reactive HTTP resource for the admin-only protected endpoint (requires ADMIN role).
   */
  getAdminResource() {
    return httpResource.text(() => '/api/admin', {
      defaultValue: 'Loading administrative data...',
      injector: this.injector
    });
  }

  // =========================================================================================
  // 🔄 RxJS Observable Endpoints
  // =========================================================================================

  /**
   * Fetches public endpoint accessible to all visitors.
   */
  getPublic(): Observable<string> {
    return this.http.get('/api/public', { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches protected user endpoint.
   */
  getUser(): Observable<string> {
    return this.http.get('/api/user', { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches protected admin-only endpoint.
   */
  getAdmin(): Observable<string> {
    return this.http.get('/api/admin', { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 401) {
      errorMessage = '401 Unauthorized: Session expired or invalid token.';
    } else if (error.status === 403) {
      errorMessage = '403 Forbidden: You do not have the required role permissions for this resource.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error (${error.status}): ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
