import { Injectable, signal } from '@angular/core';

/**
 * =========================================================================================
 * SignalsExampleService - Reactive State in an Angular Service
 * =========================================================================================
 *
 * Demonstrates managing state inside a service using Angular Signals.
 *
 * Key Concepts:
 * 1. Signals in Services: Provides a clean alternative or complement to RxJS BehaviorSubjects
 *    for synchronous application state.
 * 2. Readonly Exposure: Exposing the message signal as read-only via `.asReadonly()` guarantees
 *    that external components can only mutate state by calling dedicated service methods.
 */
@Injectable({
  providedIn: 'root'
})
export class SignalsExampleService {
  /**
   * 🔒 Private writable message signal.
   */
  private readonly messageSignal = signal<string>('Initial message from service');

  /**
   * 📢 Public read-only message signal for consumers.
   */
  readonly message = this.messageSignal.asReadonly();

  /**
   * Updates the service message signal.
   *
   * @param newMessage The new string message.
   */
  updateMessage(newMessage: string): void {
    this.messageSignal.set(newMessage);
  }
}
