import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { AuthRequest } from '../../models/auth-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" [(ngModel)]="authRequest.username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" [(ngModel)]="authRequest.password">
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  `,
  styleUrl: './login.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  authRequest: AuthRequest = {};

  login() {
    this.authService.login(this.authRequest).subscribe();
  }
}