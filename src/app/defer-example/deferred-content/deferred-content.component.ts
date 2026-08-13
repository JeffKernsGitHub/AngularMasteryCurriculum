import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';

/**
 * =========================================================================================
 * DeferredContentComponent - Dynamic Deferred Component
 * =========================================================================================
 *
 * This component is deferred inside `@defer` blocks.
 *
 * Key Concepts:
 * 1. Automatic Chunk Splitting: Angular's compiler automatically splits this component into
 *    a separate JavaScript bundle loaded ONLY when the `@defer` trigger condition is satisfied.
 * 2. Signals & OnPush: Manages state reactively using `signal()` in Zoneless mode.
 */
@Component({
  selector: 'app-deferred-content',
  standalone: true,
  imports: [],
  templateUrl: './deferred-content.component.html',
  styleUrl: './deferred-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeferredContentComponent implements OnInit {
  /**
   * 📦 Dynamic Mock Data Signal.
   */
  readonly mockData = signal<string[]>([]);

  /**
   * ⏳ Asynchronous Loading State Signal.
   */
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    // Simulates an asynchronous data fetch after chunk is loaded
    setTimeout(() => {
      this.mockData.set([
        '⚡ Lazy Bundle Loaded: Chunk retrieved dynamically on-demand',
        '📦 Data Item 1: Reactive state initialized via signal()',
        '🔒 Data Item 2: OnPush Zoneless change detection verified',
        '🚀 Data Item 3: Fast initial page load achieved'
      ]);
      this.isLoading.set(false);
    }, 800);
  }
}
