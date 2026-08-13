import { Routes } from '@angular/router';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Phase 4: Signal Change Detection
 * =========================================================================================
 */
export const routes: Routes = [
  { path: '', redirectTo: '/zoneless-demo', pathMatch: 'full' },
  {
    path: 'zoneless-demo',
    loadComponent: () =>
      import('./zoneless-example/zoneless-example.component').then(m => m.ZonelessExampleComponent),
    title: 'Signal Change Detection Demo - Angular Mastery'
  },
  { path: '**', redirectTo: '/zoneless-demo' }
];
