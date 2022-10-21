import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AuthComponent } from './auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from './reducers';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    AuthComponent,
    ProfileComponent,
    ChangeEmailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(usersFeature)
  ]
})
export class UsersModule { }
