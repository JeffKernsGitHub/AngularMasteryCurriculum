import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * =========================================================================================
 * Root Application Shell (App) - Phase 3: Forms
 * =========================================================================================
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly title = signal<string>('Angular Mastery: Forms & User Input');
}
