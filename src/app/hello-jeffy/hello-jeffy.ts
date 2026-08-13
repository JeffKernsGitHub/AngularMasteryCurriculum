import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  afterNextRender
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * =========================================================================================
 * HelloJeffy Component - Foundations & Component Basics (Phase 1)
 * =========================================================================================
 *
 * This component demonstrates the fundamental building blocks of modern Angular 22:
 *
 * 1. Component Metadata (`@Component`):
 *    - `selector`: HTML element tag used to instantiate this component (`<app-hello-jeffy>`).
 *    - `standalone: true`: Standalone is the standard default in modern Angular.
 *    - `imports`: Direct dependencies imported without NgModules (e.g. `FormsModule`).
 *    - `styleUrl`: Singular stylesheet URL pointing to SCSS styles.
 *    - `changeDetection: ChangeDetectionStrategy.OnPush`: Optimizes performance by relying on
 *      fine-grained Signal reactivity and input references rather than global change detection sweeps.
 *
 * 2. Signals (The Reactivity Primitive):
 *    - `signal()`: Reactive wrapper around state. Calling `coolname()` reads the value and
 *      registers the caller as a subscriber.
 *    - `.set(val)`: Explicitly overwrites the signal value.
 *    - `.update(fn)`: Derives and sets a new value based on the previous state.
 *
 * 3. Derived State with `computed()`:
 *    - `detailsBtnText`: Memoized derived signal that recalculates only when `showDetails()` changes.
 *    - `itemCount`: Computed count derived from the `items()` signal.
 *
 * 4. Modern Rendering Hooks (`afterNextRender`):
 *    - Browser-only, SSR-safe hook that runs once after Angular renders the DOM.
 *    - Replaces DOM access in `ngAfterViewInit` for safe Server-Side Rendering.
 */
@Component({
  selector: 'app-hello-jeffy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hello-jeffy.html',
  styleUrl: './hello-jeffy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloJeffy {
  /**
   * 🏷️ Reactive State Signal: The name displayed in the greeting.
   */
  readonly coolname = signal<string>('Earl');

  /**
   * 📝 Reactive State Signal: Bound via property binding `[innerText]`.
   */
  readonly paragraphtext = signal<string>(
    'This is the inner text in that paragraph tag. This demonstrates property binding [innerText].'
  );

  /**
   * 👁️ Reactive State Signal: Controls conditional display of details list.
   */
  readonly showDetails = signal<boolean>(false);

  /**
   * 📋 Reactive State Signal: Collection of dessert items iterated with `@for`.
   */
  readonly items = signal<string[]>([
    'Apple Fritters',
    'Oatmeal Cookies',
    'Pumpkin Rolls'
  ]);

  /**
   * 📊 Computed Signal: Derived button label based on `showDetails()`.
   * Automatically memoizes and recalculates when `showDetails` changes.
   */
  readonly detailsBtnText = computed(() =>
    this.showDetails() ? 'Hide Details' : 'Show Details'
  );

  /**
   * 🔢 Computed Signal: Total count of items.
   */
  readonly itemCount = computed(() => this.items().length);

  constructor() {
    /**
     * ⚡ Modern DOM Rendering Hook:
     * Runs once after the next time Angular renders the DOM.
     * Safe for SSR environments because it only executes on the client browser.
     */
    afterNextRender(() => {
      console.log('DOM is fully rendered and safe to interact with in browser context.');
    });
  }

  /**
   * 🔄 Toggles the greeting name between 'Earl' and 'Jeffy' using `.update()`.
   */
  changeName(): void {
    this.coolname.update(name => (name === 'Earl' ? 'Jeffy' : 'Earl'));
  }

  /**
   * 👁️ Toggles the details visibility flag using `.update()`.
   */
  toggleDetails(): void {
    this.showDetails.update(visible => !visible);
  }

  /**
   * ➕ Adds a new dessert item to the reactive items array immutably.
   *
   * @param newItem Text of the item to add.
   */
  addItem(newItem: string): void {
    const trimmed = newItem.trim();
    if (trimmed) {
      this.items.update(list => [...list, trimmed]);
    }
  }
}

