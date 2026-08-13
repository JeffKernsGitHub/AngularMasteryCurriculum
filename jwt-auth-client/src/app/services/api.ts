import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

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
