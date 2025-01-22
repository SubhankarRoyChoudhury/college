import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CollegeRegistrationComponent } from './college-registration/college-registration.component';
import { CollegeAllLoginUsersListComponent } from './college-all-login-users-list/college-all-login-users-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'college-registration',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'college-registration',
        component: CollegeRegistrationComponent,
        data: { title: 'College Registration' },
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent,
        data: { title: 'College User Registration' },
      },
      {
        path: 'user-login-list',
        component: CollegeAllLoginUsersListComponent,
        data: { title: 'College User LogIn List' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
