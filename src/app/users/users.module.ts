import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AuthComponent } from './auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from './reducers';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature(usersFeature)
  ]
})
export class UsersModule { }
