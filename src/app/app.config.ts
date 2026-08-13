import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

/**
 * =========================================================================================
 * Application Configuration (app.config.ts) - Modern Angular 22 (Phase 2: Pipes)
 * =========================================================================================
 *
 * Configures the root application providers for Zoneless execution and routing.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ⚡ 1. Native Zoneless Change Detection
    provideZonelessChangeDetection(),

    // 🧭 2. Router with Component Input Binding
    provideRouter(
      routes,
      withComponentInputBinding()
    )
  ]
};
