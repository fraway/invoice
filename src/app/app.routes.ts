import { Component, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { first, map, switchMap, tap, timeout, timer } from 'rxjs';
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

            router.navigate(['/login'], { queryParams: { return_to: state.url } });
        })
    );
}


function onlyGuests(route: RouterStateSnapshot, state: ActivatedRouteSnapshot) {
    const auth = inject(AuthService);
    return timer(200).pipe(switchMap(() => auth.isLoggedIn$.pipe(
        first(),
        map((isLoggedIn) => !isLoggedIn)
    )))
}

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        title: 'Home'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
        canActivate: [onlyGuests]
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
                path: 'clients',
                loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
            },
        ]
    }
];
