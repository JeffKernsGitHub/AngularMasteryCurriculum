import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

/**
 * =========================================================================================
 * AdminComponent - Protected Admin Portal (Requires ADMIN role)
 * =========================================================================================
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  readonly apiService = inject(ApiService);
  readonly authService = inject(AuthService);

  readonly responseMessage = signal<string>('Loading administrative data...');
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.apiService.getAdmin().subscribe({
      next: (msg) => {
        this.responseMessage.set(msg);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.responseMessage.set(err.message || 'Error fetching admin data.');
        this.isLoading.set(false);
      }
    });
  }
}
