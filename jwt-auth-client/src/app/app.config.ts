import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';
import { routes } from './app.routes';

/**
 * =========================================================================================
 * Application Configuration (app.config.ts) - Modern Angular 22 (Phase 4: JWT Auth)
 * =========================================================================================
 *
 * Configures the root application providers for:
 * 1. ⚡ Native Zoneless Change Detection (`provideZonelessChangeDetection()`)
 * 2. 🧭 Router with Component Input Binding (`withComponentInputBinding()`)
 * 3. 🔐 Functional HTTP Interceptor (`withInterceptors([authInterceptor])`) for Bearer JWT injection.
 *
 * Security Core Principle:
 * - Client-side guards and UI conditional rendering (@if) enhance UX and prevent navigation.
 * - MANDATORY SERVER-SIDE AUTHORIZATION: The backend API must independently validate JWT signatures,
 *   token expiration, and authorization scopes on every request.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ⚡ 1. Native Zoneless Change Detection
    provideZonelessChangeDetection(),

    // 🧭 2. Router with Component Input Binding
    provideRouter(
      routes,
      withComponentInputBinding()
    ),

    // 🔐 3. HTTP Client with Functional JWT Bearer Interceptor
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
