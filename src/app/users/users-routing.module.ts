import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeEmailComponent } from './change-email/change-email.component';

const routes: Routes = [
  {
    path: 'profile',
    redirectTo: 'change-email'
  },
  {
    path: 'change-email',
    component: ChangeEmailComponent,
    title: 'Cambia e-mail'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
