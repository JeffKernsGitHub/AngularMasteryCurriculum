import { Routes } from '@angular/router';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { DataManipulatorComponent } from './data-manipulator/data-manipulator.component';

export const routes: Routes = [
  { path: '', redirectTo: '/data-loader', pathMatch: 'full' }, // Default route
  { path: 'data-loader', component: DataLoaderComponent },
  { path: 'data-manipulator', component: DataManipulatorComponent }
];
