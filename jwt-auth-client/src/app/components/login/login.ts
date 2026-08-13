import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AuthRequest } from '../../models/auth-request';

/**
 * =========================================================================================
 * LoginComponent - User Authentication View (Phase 4)
 * =========================================================================================
 *
 * Provides credentials input and authentication submission.
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

  readonly authRequest: AuthRequest = {
    username: '',
    password: ''
  };

  readonly errorMessage = signal<string | null>(null);
  readonly isSubmitting = signal<boolean>(false);

  login(): void {
    if (!this.authRequest.username || !this.authRequest.password) {
      this.errorMessage.set('Please enter both username and password.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.authRequest).subscribe({
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
    this.authRequest.username = user;
    this.authRequest.password = pass;
    this.errorMessage.set(null);
  }
}