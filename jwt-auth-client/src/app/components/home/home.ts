import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

/**
 * =========================================================================================
 * HomeComponent - Dashboard & Route Navigation Hub (Phase 4)
 * =========================================================================================
 *
 * Displays public API data, reactive session state, and conditional role-based links.
 * Leverages modern Angular 22 `httpResource` declarative data loading.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly apiService = inject(ApiService);
  readonly authService = inject(AuthService);

  readonly publicResource = this.apiService.getPublicResource();

  logout(): void {
    this.authService.logout();
  }
}