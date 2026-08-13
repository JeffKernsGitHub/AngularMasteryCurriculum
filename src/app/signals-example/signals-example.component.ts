import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalsExampleService } from './services/signals-example.service';

/**
 * =========================================================================================
 * SignalsExampleComponent - Angular Signals & Fine-Grained Reactivity (Phase 2)
 * =========================================================================================
 *
 * Demonstrates the core Angular Signals reactivity primitives:
 *
 * 1. `signal()`: Writable reactive state container (`counter`, `firstName`, `lastName`).
 * 2. `computed()`: Memoized, read-only derived value (`fullName`, `doubleCount`, `isEven`).
 *    Automatically tracks all signal dependencies read in its computation function and
 *    only recalculates when dependencies change.
 * 3. `effect()`: Reactive side-effect that executes automatically whenever any tracked signal changes.
 * 4. `inject()`: Modern DI function to inject `SignalsExampleService`.
 */
@Component({
  selector: 'app-signals-example',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signals-example.component.html',
  styleUrl: './signals-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalsExampleComponent {
  /**
   * 💉 Injected Service Dependency via idiomatic inject()
   */
  readonly signalsExampleService = inject(SignalsExampleService);

  /**
   * 🔢 Writable Signals: Numeric and string reactive state.
   */
  readonly counter = signal<number>(0);
  readonly firstName = signal<string>('John');
  readonly lastName = signal<string>('Doe');

  /**
   * 📊 Computed Signals: Derived memoized state.
   */
  readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  readonly doubleCount = computed(() => this.counter() * 2);
  readonly isEven = computed(() => this.counter() % 2 === 0);

  constructor() {
    /**
     * ⚡ Reactive Effect: Runs automatically whenever `this.counter()` changes.
     * Must be declared inside an injection context (such as constructor).
     */
    effect(() => {
      console.log(`[Effect] Counter value changed to: ${this.counter()}`);
    });
  }

  /**
   * ➕ Increments the counter and updates the service state.
   */
  increment(): void {
    this.counter.update(c => c + 1);
    this.signalsExampleService.updateMessage(`Counter incremented to ${this.counter()}`);
  }

  /**
   * ➖ Decrements the counter and updates the service state.
   */
  decrement(): void {
    this.counter.update(c => c - 1);
    this.signalsExampleService.updateMessage(`Counter decremented to ${this.counter()}`);
  }

  /**
   * 🔄 Resets the counter back to zero.
   */
  reset(): void {
    this.counter.set(0);
    this.signalsExampleService.updateMessage('Counter reset to 0');
  }

  /**
   * ✏️ Updates the first and last name signals.
   */
  updateName(first: string, last: string): void {
    this.firstName.set(first);
    this.lastName.set(last);
  }
}
