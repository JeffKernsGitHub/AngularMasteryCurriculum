import { Routes } from '@angular/router';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Phase 2: DI, Services & Signals
 * =========================================================================================
 *
 * Modern Angular routing uses `loadComponent: () => import(...)` for on-demand code splitting.
 * Each route is bundled into a distinct JavaScript chunk loaded only when the user navigates to it.
 */
export const routes: Routes = [
  // 🔄 Default route redirects to DI Scopes Demo
  { path: '', redirectTo: '/di-demo', pathMatch: 'full' },

  // 📦 1. Single DI Component Example
  {
    path: 'di-example',
    loadComponent: () =>
      import('./di-services/di-services.component').then(m => m.DiServicesComponent),
    title: 'DI Services - Angular Mastery'
  },

  // 👥 2. Dependency Injection Scopes Demo (Comparing Singleton vs Component-Scoped Services)
  {
    path: 'di-demo',
    loadComponent: () =>
      import('./di-demo-page/di-demo-page.component').then(m => m.DiDemoPageComponent),
    title: 'DI Scopes Demo - Angular Mastery'
  },

  // ⚡ 3. Angular Signals & Reactivity Example
  {
    path: 'signals-example',
    loadComponent: () =>
      import('./signals-example/signals-example.component').then(m => m.SignalsExampleComponent),
    title: 'Signals Reactivity - Angular Mastery'
  },

  // 🛑 Wildcard Fallback Route
  { path: '**', redirectTo: '/di-demo' }
];
