import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {AsyncPipe} from '@angular/common';

/**
 * This component demonstrates the four triggers for OnPush change detection.
 */
@Component({
  selector: 'app-on-push-example',
  templateUrl: './on-push-example.component.html',
  styleUrls: ['./on-push-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe
  ]
})
export class OnPushExampleComponent {
  /**
   * Trigger 1: @Input() reference change.
   * When the parent component changes the reference of this input, change detection will be triggered.
   */
  @Input() user!: { name: string };

  /**
   * Trigger 2: Event fired from the component.
   * When an event is fired from the component's template, change detection will be triggered.
   */
  internalState = 'Initial State';

  /**
   * Trigger 3: async pipe.
   * The async pipe automatically subscribes to this observable and triggers change detection when a new value is emitted.
   */
  private timerSubject = new BehaviorSubject<number>(0);
  timer$: Observable<number> = this.timerSubject.asObservable();

  /**
   * Trigger 4: Manual change detection.
   * We can manually trigger change detection using ChangeDetectorRef.
   */
  manualState = 'Initial Manual State';

  constructor(private cdr: ChangeDetectorRef) {
    // Start a timer that emits a new value every second.
    // This is used to demonstrate the async pipe trigger.
    let count = 0;
    setInterval(() => {
      this.timerSubject.next(count++);
    }, 1000);
  }

  /**
   * This method is called when the "Update Internal State" button is clicked.
   * It updates the internalState property, and because the event originated from the component's template,
   * change detection is triggered.
   */
  updateInternalState() {
    this.internalState = 'Internal State Updated';
  }

  /**
   * This method is called when the "Update Manual State" button is clicked.
   * It updates the manualState property after a 2-second delay.
   * Because this change happens outside of the normal Angular change detection cycle (in a setTimeout),
   * we need to manually tell Angular to check for changes. We do this by injecting the ChangeDetectorRef
   * and calling markForCheck(). This marks the component and its ancestors as dirty, and change detection
   * will run on the next cycle.
   */
  updateManualState() {
    setTimeout(() => {
      this.manualState = 'Manual State Updated';
      this.cdr.markForCheck();
    }, 2000);
  }
}
