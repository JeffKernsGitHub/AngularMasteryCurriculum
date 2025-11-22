import { Routes } from '@angular/router';
import { PipesDemoComponent } from './pipes-demo/pipes-demo.component';

export const routes: Routes = [
    { path: 'pipes-demo', component: PipesDemoComponent },
    { path: '', redirectTo: '/pipes-demo', pathMatch: 'full' }
];
