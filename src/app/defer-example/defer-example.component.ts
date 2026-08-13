import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { DeferredContentComponent } from './deferred-content/deferred-content.component';

/**
 * =========================================================================================
 * DeferExampleComponent - Modern Deferrable Views in Angular 22 (Phase 4)
 * =========================================================================================
 *
 * Demonstrates Angular's `@defer` control block for lazy-loading template subtrees and components:
 *
 * 1. `@defer (on viewport)`:
 *    - Uses browser `IntersectionObserver` to defer loading until the placeholder enters the viewport.
 *
 * 2. `@defer (on hover(triggerBtn))`:
 *    - Loads dependencies when the user moves their mouse over the designated trigger element.
 *
 * 3. `@defer (on interaction(clickBtn))`:
 *    - Loads dependencies when the user clicks or focuses the designated element.
 *
 * 4. `@defer (when isTriggered())`:
 *    - Programmatic condition: Triggers when a Signal evaluates to `true`.
 *
 * 5. Auxiliary Blocks:
 *    - `@placeholder (minimum 500ms)`: Content displayed before trigger fires.
 *    - `@loading (after 100ms; minimum 800ms)`: Loading state preventing visual layout flashes.
 *    - `@error`: Error fallback if the chunk fails to download over the network.
 */
@Component({
  selector: 'app-defer-example',
  standalone: true,
  imports: [DeferredContentComponent],
  templateUrl: './defer-example.component.html',
  styleUrl: './defer-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeferExampleComponent {
  /**
   * 🔘 Signal for Programmatic `@defer (when ...)` Trigger
   */
  readonly isTriggered = signal<boolean>(false);

  /**
   * 🔄 Toggles the programmatic trigger condition.
   */
  triggerManualLoad(): void {
    this.isTriggered.set(true);
  }
}
