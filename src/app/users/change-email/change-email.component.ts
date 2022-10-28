import { Component, inject, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { BaseComponent } from 'src/app/shared/base.component';
import { emailFormControl } from 'src/app/shared/controls';


@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends BaseComponent implements OnInit {
  fb = inject(NonNullableFormBuilder)

  form = this.fb.group({
    currentEmail: emailFormControl(),
    newEmail: emailFormControl(),
  })

  constructor() {
    super();

    // inject(AuthService).username$.pipe(
    //   first(),
    //   this.unsubscribe()
    // )
    //   .subscribe(username => {
    //     this.form.patchValue({ currentEmail: username })
    //   })
  }

  ngOnInit(): void {
  }

  submit() {

  }
}
