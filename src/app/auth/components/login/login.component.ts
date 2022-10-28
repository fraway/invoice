import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { emailFormControl, passwordFormControl } from '../../../shared/controls';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    this._auth.login(value.email, value.password).subscribe();
  }

}
