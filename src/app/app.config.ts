import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

/**
 * =========================================================================================
 * Application Configuration (app.config.ts) - Modern Angular 22 (Phase 1: Components)
 * =========================================================================================
 *
 * In modern Angular (standalone application architecture), app.config.ts provides application-wide
 * configuration and dependency injection tokens passed to `bootstrapApplication()` in main.ts.
 *
 * Key Concepts:
 * 1. Native Zoneless Change Detection (`provideZonelessChangeDetection()`):
 *    - Eliminates the runtime overhead and monkey-patching of Zone.js.
 *    - Uses Angular Signals and reactive primitives to trigger localized view updates.
 *
 * 2. Component Input Binding (`withComponentInputBinding()`):
 *    - Enables binding route parameters directly into component `input()` signals.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ⚡ 1. Native Zoneless Change Detection:
    // Enables signal-driven change detection without Zone.js.
    provideZonelessChangeDetection(),

    // 🧭 2. Router Configuration:
    // Sets up client-side routing with component input binding.
    provideRouter(
      routes,
      withComponentInputBinding()
    )
  ]
};

