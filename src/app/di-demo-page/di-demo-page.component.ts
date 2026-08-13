import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DiServicesComponent } from '../di-services/di-services.component';

/**
 * =========================================================================================
 * DiDemoPageComponent - Host Component for DI Scopes Comparison
 * =========================================================================================
 *
 * Renders multiple instances of `DiServicesComponent` side-by-side to visibly prove:
 * 1. Singleton Scope: Mutating `SingletonService` in Instance A immediately reflects in Instance B.
 * 2. Component Scope: Mutating `ComponentScopedService` in Instance A affects ONLY Instance A.
 */
@Component({
  selector: 'app-di-demo-page',
  standalone: true,
  imports: [DiServicesComponent],
  templateUrl: './di-demo-page.component.html',
  styleUrl: './di-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiDemoPageComponent {}