import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * =========================================================================================
 * HomeComponent - Landing Page
 * =========================================================================================
 *
 * Standalone landing page component demonstrating clean routing entry points.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-card">
      <h2>Welcome to Angular 22 Routing!</h2>
      <p class="lead">
        This application demonstrates multi-page single page application (SPA) navigation using
        modern Angular features:
      </p>
      <ul class="features-list">
        <li><strong>On-Demand Lazy Loading:</strong> Components load in separate chunks via <code>loadComponent</code>.</li>
        <li><strong>Component Input Binding:</strong> Path parameters and query parameters bind directly to <code>input()</code> signals.</li>
        <li><strong>Fine-Grained Reactivity:</strong> URL parameter changes reactively filter lists via <code>computed()</code> without manual RxJS subscriptions.</li>
      </ul>
      <div class="actions">
        <a routerLink="/products" class="btn btn-primary">Browse Products Catalog &rarr;</a>
      </div>
    </div>
  `,
  styles: [`
    .page-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    }
    h2 { color: #1e293b; margin: 0 0 0.75rem 0; font-size: 1.5rem; }
    .lead { color: #475569; font-size: 1rem; line-height: 1.5; margin: 0 0 1rem 0; }
    .features-list {
      color: #334155;
      padding-left: 1.25rem;
      margin-bottom: 1.5rem;
      li { margin-bottom: 0.5rem; }
      code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.85rem; }
    }
    .btn-primary {
      display: inline-block;
      padding: 0.6rem 1.2rem;
      background-color: #2563eb;
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      border-radius: 6px;
      transition: background-color 0.2s ease;
      &:hover { background-color: #1d4ed8; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
