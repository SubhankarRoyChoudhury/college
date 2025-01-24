import { Component } from '@angular/core';
import { AppService } from './../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserRegistrationComponent } from './dialog-user-registration/dialog-user-registration.component';

interface CollegeUser {
  id: number;
  college: number;
  college_name: number;
  username: string;
  email: string;
  mobile: string;
  first_name: string;
  last_name: string;
  fatherOrHusband: string;
  aliasName: string;
  is_staff: Boolean;
  is_superuser: boolean;
  is_active: boolean;
  last_login: string;
  date_joined: string;
  gender: string;
  department: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pin: string;
  is_admin: boolean;
  is_owner: boolean;
  is_manager: boolean;
  is_assistant: boolean;
}
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent {
  college_users: CollegeUser[] = [];

  constructor(private appService: AppService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // this.appService.getCollegeLoginUsers().subscribe({
    //   next: (data) => (this.users = data),
    //   error: (error) => (this.errorMessage = 'Failed to load users'),
    // });

    this.getCollegeUsers();
  }

  getCollegeUsers(): void {
    this.appService.getCollegeUsers().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        console.log(result);
        if (result) {
          this.college_users = result;
        }
      }
    });
  }

  openEditCollege(collegeUserId: number) {
    const dialogRef = this.dialog.open(DialogUserRegistrationComponent, {
      maxWidth: '100vw',
      panelClass: 'panelClass_clg_register',
      data: {
        title: 'College User Registration Form',
        btn_title: 'Update',
        collegeUserId: collegeUserId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
