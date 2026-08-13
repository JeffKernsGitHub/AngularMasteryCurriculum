import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloJeffy } from './hello-jeffy/hello-jeffy';

/**
 * =========================================================================================
 * Root Application Shell (App / AppComponent) - Modern Angular 22
 * =========================================================================================
 *
 * In modern Angular:
 * 1. Standalone Components:
 *    - Standalone is the standard default for all components in modern Angular.
 *    - Required child components (`HelloJeffy`) and directives (`RouterOutlet`) are
 *      imported directly in the `imports` array.
 *
 * 2. Change Detection:
 *    - Using `ChangeDetectionStrategy.OnPush` pairs cleanly with native Zoneless change detection
 *      and Signal-driven state updates.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HelloJeffy],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  /**
   * Application title signal.
   */
  readonly title = signal<string>('Angular Mastery Curriculum');
}

