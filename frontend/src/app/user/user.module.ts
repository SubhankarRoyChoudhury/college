import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { UserIndexComponent } from './user-index/user-index.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { FeesStructureListComponent } from './fees-structure-list/fees-structure-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ClassDashboardComponent } from './class-dashboard/class-dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    UserComponent,
    UserIndexComponent,
    SidebarComponent,
    ClassDetailsComponent,
    FeesStructureListComponent,
    StudentListComponent,
    ClassDashboardComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    SharedModule,
    MatAutocompleteModule,
    SharedModule,
    MatRadioModule,
    MatSidenavModule,
    SharedModule,

    MatExpansionModule,
  ],
})
export class UserModule {}
