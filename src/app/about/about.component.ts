import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * =========================================================================================
 * AboutComponent - Demonstrating Lazy Loading
 * =========================================================================================
 *
 * Standalone page component demonstrating chunk-based lazy loading.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-card">
      <h2>About This Application</h2>
      <p class="description">
        This component was loaded lazily on demand when you clicked the <strong>About</strong> navigation tab!
      </p>
      <div class="info-box">
        <h3>💡 How Lazy Loading Works in Angular 22</h3>
        <p>
          In <code>app.routes.ts</code>, this route is configured with:
        </p>
        <pre><code>loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)</code></pre>
        <p>
          Angular's build system creates a separate JavaScript chunk for this route, reducing the initial
          bundle size of your application.
        </p>
      </div>
      <div class="actions">
        <a routerLink="/" class="btn-back">&larr; Return to Home</a>
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
    .description { color: #475569; font-size: 1rem; margin: 0 0 1.25rem 0; }
    .info-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 1rem 1.25rem;
      margin-bottom: 1.5rem;
      h3 { margin: 0 0 0.5rem 0; color: #1d4ed8; font-size: 1rem; }
      p { margin: 0 0 0.5rem 0; color: #1e3a8a; font-size: 0.9rem; }
      pre {
        background: #1e293b;
        color: #38bdf8;
        padding: 0.75rem;
        border-radius: 6px;
        font-size: 0.85rem;
        overflow-x: auto;
        margin: 0.5rem 0;
      }
    }
    .btn-back {
      display: inline-block;
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      &:hover { text-decoration: underline; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
