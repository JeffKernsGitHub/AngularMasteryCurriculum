import { Injectable, signal } from '@angular/core';

/**
 * =========================================================================================
 * Component-Scoped Service - Component Injector Scope
 * =========================================================================================
 *
 * Configured with `@Injectable()` (WITHOUT `providedIn: 'root'`).
 *
 * Key Characteristics:
 * 1. Component Scope: When listed in a component's `@Component({ providers: [ComponentScopedService] })`,
 *    Angular creates a FRESH, ISOLATED instance of this service for EVERY instance of that component.
 * 2. Isolated State: State is NOT shared across multiple component instances. Each component has its own
 *    independent counter.
 * 3. Lifecycle Bound: When the host component is destroyed, its scoped service instance is also garbage collected.
 */
@Injectable()
export class ComponentScopedService {
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
   * Increments this isolated component instance's counter by 1.
   */
  increment(): void {
    this.valueSignal.update(current => current + 1);
  }

  /**
   * Resets this isolated counter back to 0.
   */
  reset(): void {
    this.valueSignal.set(0);
  }
}
