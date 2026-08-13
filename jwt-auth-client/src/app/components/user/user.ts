import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

/**
 * =========================================================================================
 * UserComponent - Protected User Portal (Requires USER or ADMIN role)
 * =========================================================================================
 */
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  readonly apiService = inject(ApiService);
  readonly authService = inject(AuthService);

  readonly responseMessage = signal<string>('Loading user protected data...');
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.apiService.getUser().subscribe({
      next: (msg) => {
        this.responseMessage.set(msg);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.responseMessage.set(err.message || 'Error fetching user data.');
        this.isLoading.set(false);
      }
    });
  }
}
