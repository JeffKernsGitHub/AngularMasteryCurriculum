import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

/**
 * =========================================================================================
 * Application Configuration (app.config.ts) - Modern Angular 22 (Phase 3: Routing)
 * =========================================================================================
 *
 * Configures the root application providers for Zoneless execution and routing.
 *
 * Key Concepts:
 * 1. Native Zoneless Change Detection (`provideZonelessChangeDetection()`):
 *    - Enables fine-grained, Signal-driven change detection without Zone.js.
 *
 * 2. Component Input Binding (`withComponentInputBinding()`):
 *    - Automatically binds path parameters (e.g. `:id`) and query parameters (e.g. `?search=xyz`)
 *      directly into component `input()` signals.
 *    - Completely eliminates the need to manually subscribe to `ActivatedRoute.params` or `queryParams`!
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ⚡ 1. Native Zoneless Change Detection
    provideZonelessChangeDetection(),

    // 🧭 2. Router Configuration with Component Input Binding
    provideRouter(
      routes,
      withComponentInputBinding()
    )
  ]
};
