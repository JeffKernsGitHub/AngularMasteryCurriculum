import { Routes } from '@angular/router';
import { SignalsExampleComponent } from './signals-example/signals-example.component';
import {DiServicesComponent} from './di-services/di-services.component';


export const routes: Routes = [
  { path: 'di-example', component: DiServicesComponent },
  { path: 'signals-example', component: SignalsExampleComponent },
  {
    path: 'di-demo',
    // For standalone, you can directly load the component
    loadComponent: () => import('./di-demo-page/di-demo-page.component').then(m => m.DiDemoPageComponent)
  },
];
