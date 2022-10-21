import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { logout } from '../users/reducers/users.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  store = inject(Store)
  isLoggedIn$ = inject(Store).select((s) => s.users).pipe(
    tap(console.log),
    filter(s => s !== undefined && s != null),
    map((s) => s.isLoggedIn)
  )

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  logout() {
    // TODO: verify this
    this.store.dispatch(logout())
  }
}
