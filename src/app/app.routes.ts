import { Routes } from '@angular/router';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Phase 3: Forms & User Input
 * =========================================================================================
 */
export const routes: Routes = [
  { path: '', redirectTo: '/forms-demo', pathMatch: 'full' },
  {
    path: 'forms-demo',
    loadComponent: () =>
      import('./form-explanation/forms-explanation.component').then(m => m.FormsExplanationComponent),
    title: 'Forms Comparison Demo - Angular Mastery'
  },
  { path: '**', redirectTo: '/forms-demo' }
];
