import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { UserComponent } from './components/user/user';
import { AdminComponent } from './components/admin/admin';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { 
        path: 'user', 
        component: UserComponent,
        canActivate: [authGuard],
        data: { roles: ['USER', 'ADMIN']}
    },
    { 
        path: 'admin', 
        component: AdminComponent,
        canActivate: [authGuard],
        data: { roles: ['ADMIN']}
    },
];