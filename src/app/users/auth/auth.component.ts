import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { emailFormControl, passwordFormControl } from '../../shared/controls';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  _auth = inject(AuthService)
  fb = inject(NonNullableFormBuilder);

  isLoggedIn$ = this._auth.isLoggedIn$;

  form = this.fb.group({
    email: emailFormControl(),
    password: passwordFormControl(),
  })

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    const value = this.form.getRawValue();
    console.log(value);
    this._auth.login(value.email, value.password).subscribe();
  }

}
