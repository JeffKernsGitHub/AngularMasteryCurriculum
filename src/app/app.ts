import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * =========================================================================================
 * Root Application Shell (App) - Phase 4: Signal Change Detection
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
  readonly title = signal<string>('Angular Mastery: The Signal Strategy (Zoneless CD)');
}
