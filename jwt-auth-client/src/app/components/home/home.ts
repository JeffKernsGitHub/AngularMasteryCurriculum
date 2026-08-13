import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

/**
 * =========================================================================================
 * HomeComponent - Dashboard & Route Navigation Hub (Phase 4)
 * =========================================================================================
 *
 * Displays public API data, reactive session state, and conditional role-based links.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  readonly apiService = inject(ApiService);
  readonly authService = inject(AuthService);

  readonly publicMessage = signal<string>('Loading public server status...');
  readonly isLoadingPublic = signal<boolean>(true);

  ngOnInit(): void {
    this.apiService.getPublic().subscribe({
      next: (msg) => {
        this.publicMessage.set(msg);
        this.isLoadingPublic.set(false);
      },
      error: () => {
        this.publicMessage.set('Public API service is available locally (Proxy: /api/public)');
        this.isLoadingPublic.set(false);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}