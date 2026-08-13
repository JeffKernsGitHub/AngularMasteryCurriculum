import { Injectable, signal } from '@angular/core';

/**
 * =========================================================================================
 * Singleton Service - Root Injector Scope
 * =========================================================================================
 *
 * Configured with `@Injectable({ providedIn: 'root' })`.
 *
 * Key Characteristics:
 * 1. Root Singleton: Angular's root injector instantiates this service exactly ONCE for the entire application.
 * 2. Shared State: All components, directives, or other services that inject this class share the
 *    exact same instance and reactive state.
 * 3. Reactive State with Signals: Encapsulates state within a private writable Signal and exposes
 *    it as a read-only Signal (`asReadonly()`), enforcing strict unidirectional data flow.
 */
@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  /**
   * 🔒 Private writable state signal.
   */
  private readonly valueSignal = signal<number>(0);

  /**
   * 📢 Public read-only signal exposed to consumers.
   */
  readonly value = this.valueSignal.asReadonly();

  /**
   * Reads the current numeric value synchronously.
   */
  getValue(): number {
    return this.valueSignal();
  }

  /**
   * Increments the shared singleton counter by 1.
   */
  increment(): void {
    this.valueSignal.update(current => current + 1);
  }

  /**
   * Resets the shared counter back to 0.
   */
  reset(): void {
    this.valueSignal.set(0);
  }
}
