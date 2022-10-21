import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../auth.service";
import { User } from "../models";
import { autologin, login, loginFailure, loginSuccess, logout } from "../reducers/users.actions";

@Injectable()
export class AuthEffect {

  constructor(
    private actions$: Actions,
    private _auth: AuthService
  ) { }

  autologin$ = createEffect(() => this.actions$.pipe(
    tap(console.log),
    ofType(autologin),
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
