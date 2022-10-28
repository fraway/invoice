import { Component, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { first, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/components/login/login.component';

function denyGuests(route: RouterStateSnapshot, state: ActivatedRouteSnapshot) {
    const router = inject(Router);
    return inject(AuthService).isLoggedIn$.pipe(
        first(),
        tap((can) => {
            if (can) {
                return;
            }

            router.navigate(['/login']);
        })
    );
}

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'app',
        canActivate: [denyGuests],
        children: [
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
            },
            {
                path: 'customers',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
            },
            {
                path: 'invoices',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
            }
        ]
    }
];
