import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { selectIsLoggedIn, selectUsername } from './reducers';
import { login, logout } from './reducers/users.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store) { }

  login(email: string, password: string) {
    this.store.dispatch(login({ email: email }))
    return of()
  }

  logout() {
    this.store.dispatch(logout())
    return of()
  }

  get username$() {
    return this.store.select(selectUsername)
  }

  get isLoggedIn$() {
    return this.store.select(selectIsLoggedIn)
  }
}
