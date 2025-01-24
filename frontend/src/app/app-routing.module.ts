import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationFormCollegeUserComponent } from './registration-form-college-user/registration-form-college-user.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    // component: AppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration-college-user',
        component: RegistrationFormCollegeUserComponent,
      },
      // {
      //   path: 'admin-control',
      //   component: AdminComponent,
      // },
      {
        path: 'admin-control',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
