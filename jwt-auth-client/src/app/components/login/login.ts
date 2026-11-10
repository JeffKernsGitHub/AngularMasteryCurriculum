import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

/**
 * =========================================================================================
 * LoginComponent - User Authentication View (Phase 4)
 * =========================================================================================
 *
 * Provides credentials input with Signal-based state and authentication submission.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly authService = inject(AuthService);

  readonly username = signal<string>('');
  readonly password = signal<string>('');

  readonly errorMessage = signal<string | null>(null);
  readonly isSubmitting = signal<boolean>(false);

  login(): void {
    const user = this.username().trim();
    const pass = this.password();

    if (!user || !pass) {
      this.errorMessage.set('Please enter both username and password.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authService.login({ username: user, password: pass }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || 'Authentication failed. Please check your credentials.');
      }
    });
  }

  /**
   * Fills quick test credentials.
   */
  fillPreset(user: string, pass: string): void {
    this.username.set(user);
    this.password.set(pass);
    this.errorMessage.set(null);
  }
}