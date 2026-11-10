import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

/**
 * =========================================================================================
 * AdminComponent - Protected Admin Portal (Requires ADMIN role)
 * =========================================================================================
 *
 * Demonstrates modern Angular 22 `httpResource` declarative data loading in a native
 * Zoneless change detection environment.
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  readonly apiService = inject(ApiService);
  readonly authService = inject(AuthService);

  readonly adminResource = this.apiService.getAdminResource();
}
