import { Routes } from '@angular/router';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Modern Angular 22 Routing
 * =========================================================================================
 *
 * In modern Angular:
 * 1. Lazy Loading (`loadComponent`):
 *    - Standalone components are dynamically imported on-demand when the user visits the route.
 *    - This splits the application into small JavaScript chunks, dramatically reducing the
 *      initial page load time and memory footprint.
 *
 * 2. Redirects & Path Matching:
 *    - The default empty path `''` uses `pathMatch: 'full'` to safely redirect the user
 *      to the default feature view (`/data-loader`).
 *
 * 3. Route Parameter Binding:
 *    - Combined with `withComponentInputBinding()` in `app.config.ts`, route parameters
 *      (e.g., `:id`) and query parameters (e.g., `?tab=details`) can be directly read as
 *      `input()` signals inside target components.
 */
export const routes: Routes = [
  // 🔄 Default Route: Redirect root URL to '/data-loader'
  {
    path: '',
    redirectTo: '/data-loader',
    pathMatch: 'full'
  },

  // 📥 Data Loader Feature: Demonstrates RxJS pipelines, forkJoin, iif, and async pipes
  {
    path: 'data-loader',
    loadComponent: () =>
      import('./data-loader/data-loader.component').then(m => m.DataLoaderComponent),
    title: 'Data Loader - Angular Mastery'
  },

  // 🛠️ Data Manipulator Feature: Demonstrates CRUD operations, Angular Signals, and computed state
  {
    path: 'data-manipulator',
    loadComponent: () =>
      import('./data-manipulator/data-manipulator.component').then(m => m.DataManipulatorComponent),
    title: 'Data Manipulator - Angular Mastery'
  },

  // 🔀 Wildcard Fallback: Gracefully redirect any unmatched URLs to the default route
  {
    path: '**',
    redirectTo: '/data-loader'
  }
];

