import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { autoLogin, loginFailure, loginSuccess, login, logout } from "./auth.actions";
import { AuthService } from "./auth.service";
import { User } from "./models";

@Injectable()
export class AuthEffect implements OnInitEffects {

    constructor(
        private actions$: Actions,
        private _auth: AuthService
    ) { }

    ngrxOnInitEffects(): Action {
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

                return loginSuccess(users[0]);
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

                return loginSuccess(users[0]);
            }),
            catchError((e: any) => of(loginFailure({ message: e.message })))
        ))
    ))

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ id }) => this._auth.storeUserCredentials(id)),
    ), { dispatch: false })

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        tap(() => this._auth.clearUserCredentials()),
    ), { dispatch: false })
}
