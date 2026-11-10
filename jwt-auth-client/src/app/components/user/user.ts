import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

/**
 * =========================================================================================
 * UserComponent - Protected User Portal (Requires USER or ADMIN role)
 * =========================================================================================
 *
 * Demonstrates modern Angular 22 `httpResource` declarative data loading in a native
 * Zoneless change detection environment.
 */
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  readonly apiService = inject(ApiService);
  readonly authService = inject(AuthService);

  readonly userResource = this.apiService.getUserResource();
}
