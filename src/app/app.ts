import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Import RouterLinkActive

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], // Add RouterLinkActive to imports
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  // No specific logic needed here for the root component
}
