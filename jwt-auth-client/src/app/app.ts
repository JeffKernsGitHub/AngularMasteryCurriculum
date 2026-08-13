import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth';

/**
 * =========================================================================================
 * Root Application Shell (App) - Phase 4: Authentication & Authorization
 * =========================================================================================
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
  readonly title = signal<string>('Angular Mastery: JWT Authentication & Authorization');
  readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
