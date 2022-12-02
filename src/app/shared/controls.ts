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

export const nameFormControl = (initialValue = '') => inject(NonNullableFormBuilder)
  .control(initialValue, {
    validators: [
      Validators.required,
      Validators.minLength(2)
    ]
  })

export const addressFormControl = (initialValue = '') => inject(NonNullableFormBuilder)
  .control(initialValue, {
    validators: [
      Validators.required,
      Validators.minLength(2)
    ]
  })

export const aliasFormControl = (initialValue = '') => inject(NonNullableFormBuilder)
  .control(initialValue, {
    validators: [
      Validators.required,
      Validators.minLength(5)
    ]
  })

export const vatCodeFormControl = (initialValue = '') => inject(NonNullableFormBuilder)
  .control(initialValue, {
    validators: [
      Validators.required,
      Validators.minLength(13) // IT12345678910
    ]
  })