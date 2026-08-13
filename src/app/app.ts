import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * =========================================================================================
 * Root Application Shell (App) - Phase 2: DI & Signals
 * =========================================================================================
 *
 * Standalone root shell component hosting the navigation header and dynamic `<router-outlet />`.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  /** Application title displayed in the header */
  readonly title = signal<string>('Angular Mastery: DI, Services & Signals');
}
