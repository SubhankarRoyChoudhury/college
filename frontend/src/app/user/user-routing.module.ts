import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { FeesStructureListComponent } from './fees-structure-list/fees-structure-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ClassDashboardComponent } from './class-dashboard/class-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: UserIndexComponent,
    children: [
      {
        path: 'dashboard',
        component: ClassDashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'classes-details',
        component: ClassDetailsComponent,
        data: { title: 'Class Details' },
      },
      {
        path: 'student-list',
        component: StudentListComponent,
        data: { title: 'Student List' },
      },
      {
        path: 'fees-structure',
        component: FeesStructureListComponent,
        data: { title: 'Fees Structure List' },
        children: [
          // ✅ Child routes will load inside <router-outlet> inside the tabs
          // { path: '', redirectTo: 'fees', pathMatch: 'full' }, // Default tab
          // {
          //   path: 'fees',
          //   component: FeesComponent, // ✅ This will load inside <router-outlet>
          //   data: { title: 'School Fees Structure' },
          // },
          // {
          //   path: 'student-fees',
          //   component: StudentFeesComponent, // ✅ This will also load inside <router-outlet>
          //   data: { title: 'Student Fees Structure' },
          // },
          // {
          //   path: 'student-fees-collection',
          //   component: StudentFeesCollectionComponent, // ✅ This will also load inside <router-outlet>
          //   data: { title: 'Student Fees Collection' },
          // },
        ],
      },

      //   {
      //     path: 'teacher-list',
      //     component: TeacherListComponent,
      //     data: { title: 'Teacher List' },
      //   },
      //   {
      //     path: 'subject-list',
      //     component: SubjectListComponent,
      //     data: { title: 'Subject List' },
      //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
