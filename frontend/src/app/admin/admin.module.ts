import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CollegeRegistrationComponent } from './college-registration/college-registration.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import { CollegeAllLoginUsersListComponent } from './college-all-login-users-list/college-all-login-users-list.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AdminComponent,
    UserRegistrationComponent,
    CollegeRegistrationComponent,
    CollegeAllLoginUsersListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
    MatIconModule,
  ],
})
export class AdminModule {}
