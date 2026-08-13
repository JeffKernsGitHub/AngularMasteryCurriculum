import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  input,
  signal,
  inject
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { interval, map, Observable } from 'rxjs';

export interface UserProfile {
  name: string;
  role: string;
}

/**
 * =========================================================================================
 * OnPushExampleComponent - The 4 Triggers of OnPush Change Detection (Phase 4)
 * =========================================================================================
 *
 * When `changeDetection: ChangeDetectionStrategy.OnPush` is enabled, Angular optimizes rendering
 * by skipping change detection for this component and its entire child subtree UNLESS one of
 * the following 4 specific triggers occurs:
 *
 * -----------------------------------------------------------------------------------------
 * 1. 🔄 TRIGGER 1: Input Reference Change (input() / @Input())
 *    - Angular performs a SHALLOW EQUALITY CHECK (`oldValue !== newValue`).
 *    - If the parent passes a new object reference, change detection runs.
 *    - If the parent mutates an existing object in-place, OnPush will NOT detect the change!
 *
 * 2. ⚡ TRIGGER 2: Local Component Event Handler
 *    - When a DOM event (e.g. `(click)`, `(submit)`) fires from this component's template,
 *      Angular automatically marks the component view as dirty.
 *
 * 3. 📡 TRIGGER 3: Observable / Async Pipe Emission
 *    - The `AsyncPipe` (`timer$ | async`) automatically subscribes to an Observable/Promise
 *      and calls `markForCheck()` internally whenever a new value is emitted.
 *
 * 4. 🛠️ TRIGGER 4: Explicit Manual Change Detection (ChangeDetectorRef.markForCheck())
 *    - When data changes asynchronously outside normal Angular template events (e.g. in
 *      a third-party callback or `setTimeout`), calling `cdr.markForCheck()` explicitly
 *      flags the component and its ancestors as dirty for the next check cycle.
 * -----------------------------------------------------------------------------------------
 */
@Component({
  selector: 'app-on-push-example',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './on-push-example.component.html',
  styleUrl: './on-push-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushExampleComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  /**
   * 🔄 TRIGGER 1: Input signal passed from parent.
   * OnPush requires a NEW object reference to detect updates.
   */
  readonly user = input<UserProfile>({
    name: 'John Doe',
    role: 'Software Engineer'
  });

  /**
   * ⚡ TRIGGER 2: Internal state modified via template event handler.
   */
  readonly internalCounter = signal<number>(0);
  internalMessage = 'Initial Local State';

  /**
   * 📡 TRIGGER 3: RxJS Observable stream rendered with AsyncPipe.
   */
  readonly timer$: Observable<number> = interval(1000).pipe(map(val => val + 1));

  /**
   * 🛠️ TRIGGER 4: Manual state variable updated asynchronously outside template event.
   */
  manualState = 'Initial Manual State';
  isPendingManualCheck = signal<boolean>(false);

  /**
   * Handles Trigger 2: Local event handler.
   */
  onUpdateInternalState(): void {
    this.internalCounter.update(c => c + 1);
    this.internalMessage = `Updated via local template event (#${this.internalCounter()})`;
  }

  /**
   * Handles Trigger 4: Manual markForCheck() invocation.
   */
  onUpdateManualState(): void {
    this.isPendingManualCheck.set(true);
    this.manualState = 'Updating in 1.5s via setTimeout...';

    setTimeout(() => {
      this.manualState = `Manual State Updated at ${new Date().toLocaleTimeString()}`;
      this.isPendingManualCheck.set(false);

      // Explicitly mark this OnPush component view as dirty
      this.cdr.markForCheck();
    }, 1500);
  }
}
