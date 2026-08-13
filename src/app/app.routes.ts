import { Routes } from '@angular/router';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Phase 4: Deferrable Views
 * =========================================================================================
 */
export const routes: Routes = [
  { path: '', redirectTo: '/defer-demo', pathMatch: 'full' },
  {
    path: 'defer-demo',
    loadComponent: () =>
      import('./defer-example/defer-example.component').then(m => m.DeferExampleComponent),
    title: 'Deferrable Views Demo - Angular Mastery'
  },
  { path: '**', redirectTo: '/defer-demo' }
];
