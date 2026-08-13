import { Routes } from '@angular/router';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Phase 4: Change Detection & OnPush
 * =========================================================================================
 */
export const routes: Routes = [
  { path: '', redirectTo: '/on-push-demo', pathMatch: 'full' },
  {
    path: 'on-push-demo',
    loadComponent: () =>
      import('./on-push-example/on-push-example.component').then(m => m.OnPushExampleComponent),
    title: 'OnPush Change Detection Demo - Angular Mastery'
  },
  { path: '**', redirectTo: '/on-push-demo' }
];
