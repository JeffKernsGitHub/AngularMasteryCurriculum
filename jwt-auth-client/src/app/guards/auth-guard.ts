import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

/**
 * =========================================================================================
 * authGuard - Functional Route Guard for Navigation-Level Authorization (Phase 4)
 * =========================================================================================
 *
 * Enforces client-side authorization before navigating to protected routes:
 * 1. Checks if the user has an active, authenticated session (`authService.isAuthenticated()`).
 * 2. Compares user role claims against route-specified roles (`route.data['roles']`).
 * 3. Redirects unauthenticated / unauthorized users to `/login` via `UrlTree`.
 *
 * Core Security Note:
 * Client-side route guards provide responsive UX and navigation boundaries, but MUST be backed
 * by server-side Spring Security / authorization checks on all API endpoints.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Verify authentication
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  // 2. Verify role-based permissions
  const requiredRoles = (route.data?.['roles'] as string[]) || [];
  if (requiredRoles.length > 0 && !authService.hasAnyRole(requiredRoles)) {
    // Redirect to home if logged in but lacking role permissions
    return router.createUrlTree(['/home']);
  }

  return true;
};