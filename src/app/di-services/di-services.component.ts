import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { SingletonService } from './singleton.service';
import { ComponentScopedService } from './component-scoped.service';

/**
 * =========================================================================================
 * DiServicesComponent - Demonstrating Angular Injector Hierarchy & Scopes
 * =========================================================================================
 *
 * This component demonstrates how Angular resolves dependencies across different injector scopes:
 *
 * 1. Component Providers (`providers: [ComponentScopedService]`):
 *    - By declaring `ComponentScopedService` in `providers`, each instance of `DiServicesComponent`
 *      receives its OWN dedicated instance of `ComponentScopedService`.
 *
 * 2. Root Providers (`SingletonService`):
 *    - `SingletonService` is NOT listed in `providers`. When `inject(SingletonService)` is called,
 *      Angular looks at the component injector, does not find it, and traverses up the injector
 *      hierarchy to the Root Injector, receiving the application-wide singleton instance.
 *
 * 3. Modern Idiomatic Dependency Injection (`inject()`):
 *    - Uses `inject()` in property initializers, eliminating constructor boilerplate.
 *
 * 4. Signal Inputs (`input()`):
 *    - `title = input<string>('Component Instance')` provides a strongly typed reactive input signal.
 */
@Component({
  selector: 'app-di-services',
  standalone: true,
  templateUrl: './di-services.component.html',
  styleUrl: './di-services.component.scss',
  providers: [ComponentScopedService], // Creates a new isolated service instance per component
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiServicesComponent {
  /**
   * 🏷️ Signal Input: Custom display title for this component instance.
   */
  readonly title = input<string>('Component Instance');

  /**
   * 🌐 Singleton Service Dependency: Shared application-wide via Root Injector.
   */
  readonly singletonService = inject(SingletonService);

  /**
   * 🔒 Component-Scoped Service Dependency: Isolated instance unique to this component.
   */
  readonly componentScopedService = inject(ComponentScopedService);
}
