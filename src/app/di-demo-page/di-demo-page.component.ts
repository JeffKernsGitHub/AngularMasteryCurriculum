import { Component } from '@angular/core';
import { DiServicesComponent } from '../di-services/di-services.component';

@Component({
  selector: 'app-di-demo-page',
  templateUrl: './di-demo-page.component.html',
  standalone: true,
  imports: [DiServicesComponent],
})
export class DiDemoPageComponent {}