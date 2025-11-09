import { Component, inject } from '@angular/core';
import { SingletonService } from './singleton.service';
import { ComponentScopedService } from './component-scoped.service';

@Component({
  selector: 'app-di-services',
  templateUrl: './di-services.component.html',
  styleUrls: ['./di-services.component.scss'],
  providers: [ComponentScopedService]
})
export class DiServicesComponent {
  singletonService = inject(SingletonService);
  componentScopedService = inject(ComponentScopedService);
}
