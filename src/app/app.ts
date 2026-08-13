import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { OnPushExampleComponent, UserProfile } from './on-push-example/on-push-example.component';

/**
 * =========================================================================================
 * Root Application Shell (App) - Phase 4: Change Detection & OnPush Strategy
 * =========================================================================================
 *
 * Demonstrates how parent component state mutations affect an `OnPush` child component.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OnPushExampleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly title = signal<string>('Angular Mastery: Zone.js & OnPush Strategy');

  /**
   * 👤 Parent User State Signal
   */
  readonly user = signal<UserProfile>({
    name: 'John Doe',
    role: 'Software Engineer'
  });

  /**
   * 📢 Mutation test log message
   */
  readonly parentLog = signal<string>('Parent initialized with new User object reference.');

  /**
   * ✅ Creates a NEW object reference (Immutability Pattern).
   * Triggers OnPush change detection in child component!
   */
  updateUserNewReference(): void {
    this.user.set({
      name: 'Jane Doe',
      role: 'Principal Architect'
    });
    this.parentLog.set('✅ Updated with a NEW object reference! Child OnPush component updated.');
  }

  /**
   * ⚠️ In-Place Mutation test (Mutates property without changing reference).
   * OnPush child will NOT update its view because the reference did not change.
   */
  mutateUserInPlace(): void {
    const current = this.user();
    current.name = 'Bob (In-Place Mutation)';
    this.parentLog.set('⚠️ Object property mutated in-place! Child OnPush component did NOT re-render because object reference is unchanged.');
  }

  /**
   * 🔄 Resets User object.
   */
  resetUser(): void {
    this.user.set({
      name: 'John Doe',
      role: 'Software Engineer'
    });
    this.parentLog.set('🔄 User state reset with fresh reference.');
  }
}
