import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Phase 4: Authentication & Authorization
 * =========================================================================================
 *
 * Demonstrates protected routes using functional guards (`canActivate: [authGuard]`) and
 * role-based permission metadata (`data: { roles: [...] }`).
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent),
    title: 'Home - JWT Auth Demo'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent),
    title: 'Login - JWT Auth Demo'
  },
  {
    path: 'user',
    loadComponent: () => import('./components/user/user').then(m => m.UserComponent),
    canActivate: [authGuard],
    data: { roles: ['USER', 'ADMIN'] },
    title: 'User Portal - JWT Auth Demo'
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin').then(m => m.AdminComponent),
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] },
    title: 'Admin Portal - JWT Auth Demo'
  },
  { path: '**', redirectTo: 'home' }
];