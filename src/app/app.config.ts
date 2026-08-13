import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

/**
 * =========================================================================================
 * Application Configuration (app.config.ts) - Modern Angular 22 (Phase 2: DI & Signals)
 * =========================================================================================
 *
 * In modern standalone Angular, app.config.ts configures application-wide root providers
 * passed to `bootstrapApplication()` in main.ts.
 *
 * Key Concepts:
 * 1. Native Zoneless Change Detection (`provideZonelessChangeDetection()`):
 *    - Eliminates the runtime and bundle overhead of Zone.js.
 *    - Relies on Angular Signals and reactive primitives to schedule localized view updates.
 *
 * 2. Router Configuration with Component Input Binding (`withComponentInputBinding()`):
 *    - Automatically binds path parameters, query parameters, and route data into component `input()` signals.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ⚡ 1. Native Zoneless Change Detection:
    // Enables signal-driven reactivity without Zone.js monkey-patching.
    provideZonelessChangeDetection(),

    // 🧭 2. Router Configuration:
    // Sets up client-side routing with component input binding enabled.
    provideRouter(
      routes,
      withComponentInputBinding()
    )
  ]
};
