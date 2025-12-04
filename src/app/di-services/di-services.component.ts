import { Component, Input } from '@angular/core';
import { SingletonService } from './singleton.service';
import { ComponentScopedService } from './component-scoped.service';

@Component({
  selector: 'app-di-services',
  templateUrl: './di-services.component.html',
  standalone: true,
  styleUrls: ['./di-services.component.css'],
  // By providing the service here, a new instance is created for every
<<<<<<< HEAD
  // instance of this component. This is not a signal.
=======
  // instance of this component.
>>>>>>> origin/2-DI-and-Services
  providers: [ComponentScopedService]
})
export class DiServicesComponent {
  @Input() title = '';

  constructor(
    public singletonService: SingletonService,
    public componentScopedService: ComponentScopedService
  ) {}
}
