import { Routes } from '@angular/router';

/**
 * =========================================================================================
 * Application Routing Table (app.routes.ts) - Phase 3: Routing & Multi-Page Navigation
 * =========================================================================================
 *
 * Demonstrates modern Angular routing architecture:
 * 1. Lazy Loading (`loadComponent`): On-demand chunk loading for every route.
 * 2. Route Titles (`title`): Native document title updates without custom title services.
 * 3. Route Parameters (`:id`): Dynamic path variables bound to component `input()` signals.
 * 4. Fallback Routing (`**`): Graceful wildcard redirection.
 */
export const routes: Routes = [
  // 🏠 Home Landing Page Route
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
    title: 'Home - Angular Routing'
  },

  // 🛍️ Product Catalog Route (with query parameter filtering)
  {
    path: 'products',
    loadComponent: () =>
      import('./product-list/product-list.component').then(m => m.ProductListComponent),
    title: 'Products - Angular Routing'
  },

  // 🔍 Product Detail Route (with :id path parameter)
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    title: 'Product Details - Angular Routing'
  },

  // ℹ️ About Information Route
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then(m => m.AboutComponent),
    title: 'About - Angular Routing'
  },

  // 🛑 Wildcard Fallback: Redirect unrecognized URLs to home
  {
    path: '**',
    redirectTo: ''
  }
];
