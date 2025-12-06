import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();
  const requiredRoles = route.data['roles'] as string[];

  if (authService.isAuthenticated() && currentUser) {
    if (requiredRoles.some(role => currentUser.roles.includes(role))) {
      return true;
    }
  }
  
  router.navigate(['/login']);
  return false;
};