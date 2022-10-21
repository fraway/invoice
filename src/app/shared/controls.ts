import { inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

export const emailFormControl = (initialValue: string = '') => inject(NonNullableFormBuilder)
  .control(initialValue, {
    validators: [
      Validators.required,
      Validators.email,
    ]
  })

export const passwordFormControl = (
  initialValue: string = ''
) => inject(NonNullableFormBuilder)
  .control(initialValue, {
    validators: [
      Validators.required,
      Validators.minLength(6),
    ]
  })
