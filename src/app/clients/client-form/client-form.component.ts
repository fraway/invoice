import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { addressFormControl, aliasFormControl, nameFormControl, vatCodeFormControl } from 'src/app/shared/controls';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  posting = false;

  form = inject(FormBuilder).group({
    name: nameFormControl(),
    address: addressFormControl(),
    vatCode: vatCodeFormControl(),
    alias: aliasFormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  submit() {

  }
}
