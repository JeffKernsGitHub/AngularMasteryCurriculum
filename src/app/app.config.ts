import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

/**
 * =========================================================================================
 * Application Configuration (app.config.ts) - Modern Angular 22 (Phase 4: Signal CD)
 * =========================================================================================
 *
 * Configures the application for native Zoneless change detection and routing.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ⚡ 1. Native Zoneless Change Detection (No Zone.js!)
    provideZonelessChangeDetection(),

    // 🧭 2. Router with Component Input Binding
    provideRouter(
      routes,
      withComponentInputBinding()
    )
  ]
};
