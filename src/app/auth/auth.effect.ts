import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, filter, map, mapTo, of, switchMap, tap } from "rxjs";
import { autoLogin, loginFailure, loginSuccess, login, logout } from "./auth.actions";
import { AuthService } from "./auth.service";
import { User } from "./models";

@Injectable()
export class AuthEffect implements OnInitEffects {

    constructor(
        private actions$: Actions,
        private _auth: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngrxOnInitEffects(): Action {
        // console.log("route on init", this.router.url);
        return this._auth.autoLogin();
    }

    autoLogin$ = createEffect(() => this.actions$.pipe(
        tap(console.log),
        ofType(autoLogin),
        switchMap(({ id }) => this._auth.doAuthenticate(id).pipe(
            map((users: User[]) => {
                if (users.length == 0) {
                    return loginFailure({ message: 'credenziali errate' });
                }
                // console.log("current route: ", this.route.snapshot.url)
                return loginSuccess({
                    user: users[0],
                    redirect: false
                });
            }),
            catchError((e: any) => of(loginFailure({ message: e.message })))
        ))
    ))

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap(({ email, password }) => this._auth.doLogin(email, password).pipe(
            map((users: User[]) => {
                if (users.length == 0) {
                    return loginFailure({ message: 'credenziali errate' });
                }

                return loginSuccess({
                    user: users[0],
                    redirect: true
                });
            }),
            catchError((e: any) => of(loginFailure({ message: e.message })))
        ))
    ))

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ user }) => this._auth.storeUserCredentials(user.id)),
    ), { dispatch: false })

    onLoginRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        filter((a) => a.redirect),
        tap(() => console.log(this.router.url)),
        map(() => {
            const query = this.route.snapshot.queryParamMap;
            if (query.has('return_to')) {
                return query.get('return_to')!;
            }

            return '/';
        }),
        tap((url) => this.router.navigateByUrl(url, { replaceUrl: true })),
        map((url) => ({ type: '[Auth Effects] Redirect on login', url: url }))
    ))

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        tap(() => this._auth.clearUserCredentials()),
    ), { dispatch: false })

    onLogoutRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        tap(() => this.router.navigate(['/'])),
    ), { dispatch: false })

}
