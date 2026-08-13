import { Routes } from '@angular/router';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Phase 2: Pipes
 * =========================================================================================
 */
export const routes: Routes = [
  { path: '', redirectTo: '/pipes-demo', pathMatch: 'full' },
  {
    path: 'pipes-demo',
    loadComponent: () =>
      import('./pipes-demo/pipes-demo.component').then(m => m.PipesDemoComponent),
    title: 'Pipes Transformation Demo - Angular Mastery'
  },
  { path: '**', redirectTo: '/pipes-demo' }
];
