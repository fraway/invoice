import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from './reducers';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { MaterialModule } from '../material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { UsersEffect } from './effects/auth.effects';


@NgModule({
  declarations: [
    ProfileComponent,
    ChangeEmailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forFeature(usersFeature),
    EffectsModule.forFeature([UsersEffect])
  ]
})
export class UsersModule { }
