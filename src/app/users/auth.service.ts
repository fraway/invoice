import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models';
import { selectIsLoggedIn, selectUsername } from './reducers';
import { autologin, login, logout } from './reducers/users.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store,
    private client: HttpClient
  ) {

    const storedId = this.getUserCredentials();
    if (storedId == null || storedId.length == 0) {
      return;
    }

    setTimeout(() => {

      this.store.dispatch(autologin({ id: storedId }))
    }, 2000);
  }

  doLogin(username: string, password: string) {
    const url = `${environment.resources.users}?username=${username}&password=${password}`
    return this.client.get<User[]>(url)
  }

  doAuthenticate(id: string) {
    const url = `${environment.resources.users}?id=${id}`
    return this.client.get<User[]>(url)
  }

  login(username: string, password: string) {
    this.store.dispatch(login({ email: username, password: password }))
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

  storeUserCredentials(id: string) {
    localStorage.setItem('id', id)
  }

  clearUserCredentials() {
    localStorage.clear()
  }

  getUserCredentials() {
    return localStorage.getItem('id')
  }
}
