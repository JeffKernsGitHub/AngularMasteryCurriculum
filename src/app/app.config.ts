import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * =========================================================================================
 * Application Configuration (app.config.ts) - Modern Angular 22 Architecture
 * =========================================================================================
 *
 * In modern Angular (standalone application architecture), app.config.ts serves as the
 * central root configuration object passed to `bootstrapApplication()` in main.ts.
 *
 * Key Architecture Highlights:
 *
 * 1. Native Zoneless Change Detection (`provideZonelessChangeDetection`):
 *    - Eliminates the runtime overhead of Zone.js monkey-patching browser APIs.
 *    - UI updates are triggered explicitly and efficiently through Angular Signals and
 *      reactive primitives, ensuring localized, high-performance view updates.
 *
 * 2. Component Input Binding (`withComponentInputBinding`):
 *    - Automatically binds route parameters (e.g., `:id`), query parameters (e.g., `?tab=info`),
 *      and static route data directly to component `input()` signals without requiring
 *      manual ActivatedRoute subscriptions.
 *
 * 3. Modern HTTP Client Configuration (`provideHttpClient`):
 *    - Configured with `withFetch()` to use the modern standard Fetch API backend for faster,
 *      streaming-capable network operations.
 *    - Configured with `withInterceptors()` for functional HTTP interceptors (such as auth token
 *      attachment and global error logging).
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ⚡ 1. Native Zoneless Change Detection:
    // Enables signal-driven change detection without Zone.js overhead.
    provideZonelessChangeDetection(),

    // 🧭 2. Router Provider with Component Input Binding:
    // Enables route navigation, lazy loading, and direct param-to-input() signal binding.
    provideRouter(
      routes,
      withComponentInputBinding()
    ),

    // 🌐 3. Modern HTTP Client Provider:
    // Uses the browser Fetch API backend and functional interceptor pipeline.
    provideHttpClient(
      withFetch(),
      withInterceptors([])
    )
  ]
};

