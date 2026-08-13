import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

/**
 * =========================================================================================
 * authInterceptor - Functional HTTP Interceptor for Bearer Token Injection (Phase 4)
 * =========================================================================================
 *
 * Automatically attaches the JWT authorization header to all outgoing HTTP requests:
 * - Reads token from `AuthService.getToken()`.
 * - If present, clones request and adds `Authorization: Bearer <token>`.
 * - Forwards request to next handler in the HTTP pipeline.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  return next(req);
};