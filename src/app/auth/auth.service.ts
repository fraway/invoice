import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createAction, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../auth/models';
import { autoLogin, login, logout } from './auth.actions';
import { selectIsLoggedIn } from './auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store,
    private client: HttpClient
  ) { }

  autoLogin() {
    const storedId = this.getUserCredentials();
    if (storedId == null || storedId.length == 0) {
      return createAction('[Auth Service] No stored credentials')();
    }

    return autoLogin({ id: storedId })
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

  // get username$() {
  //   return this.store.select(selectUsername)
  // }

  get isLoggedIn$(): Observable<boolean> {
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
