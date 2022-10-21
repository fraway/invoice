import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
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
}
