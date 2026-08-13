import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * =========================================================================================
 * Root Application Shell (AppComponent) - Modern Angular 22
 * =========================================================================================
 *
 * In modern Angular:
 * 1. Standalone Components (`standalone: true`):
 *    - Standalone is the standard default for components in modern Angular.
 *    - Components directly declare their dependencies in the `imports` array (no NgModules).
 *
 * 2. Router Directives:
 *    - `RouterOutlet`: Acts as the dynamic placeholder where routed views are swapped.
 *    - `RouterLink`: Client-side anchor directive preventing full page refreshes.
 *    - `RouterLinkActive`: Applies CSS classes dynamically when the destination route is active.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  /**
   * Title of the application shell.
   */
  readonly appTitle = 'Angular Mastery Curriculum';
}

