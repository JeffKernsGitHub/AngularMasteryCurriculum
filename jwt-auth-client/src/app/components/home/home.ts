import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <h1>Welcome!</h1>
      <p>{{ publicMessage | async }}</p>
      
      @if(authService.isAuthenticated()){
        <p>You are logged in as {{ authService.currentUser()?.username }}</p>
        <div class="navigation-buttons">
          <button routerLink="/user">User Page</button>
          <button routerLink="/admin">Admin Page</button>
          <button (click)="logout()">Logout</button>
        </div>
      } @else() {
        <p>Please <a routerLink="/login">log in</a>.</p>
      }
    </div>
  `,
  styleUrl: './home.scss'
})
export class HomeComponent {
  apiService = inject(ApiService);
  authService = inject(AuthService);

  publicMessage: Observable<string>;

  constructor() {
    this.publicMessage = this.apiService.getPublic();
  }

  logout(){
    this.authService.logout();
  }
}