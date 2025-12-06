import { Routes } from '@angular/router';
import { ZonelessExampleComponent } from './zoneless-example/zoneless-example.component';

export const routes: Routes = [
  { path: '', redirectTo: 'zoneless-example', pathMatch: 'full' },
  { path: 'zoneless-example', component: ZonelessExampleComponent },
];
