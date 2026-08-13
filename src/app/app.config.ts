import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

/**
 * =========================================================================================
 * Application Configuration (app.config.ts) - Modern Angular 22 (Phase 3: Forms)
 * =========================================================================================
 *
 * Configures root application providers for Zoneless change detection and routing.
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
