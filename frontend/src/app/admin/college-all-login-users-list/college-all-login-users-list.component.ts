import { Component } from '@angular/core';
import { AppService } from './../../app.service';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: Boolean;
  is_superuser: boolean;
  is_active: boolean;
  last_login: string;
  date_joined: string;
}

@Component({
  selector: 'app-college-all-login-users-list',
  templateUrl: './college-all-login-users-list.component.html',
  styleUrls: ['./college-all-login-users-list.component.scss'],
})
export class CollegeAllLoginUsersListComponent {
  users: User[] = [];

  // errorMessage: string | null = null;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // this.appService.getCollegeLoginUsers().subscribe({
    //   next: (data) => (this.users = data),
    //   error: (error) => (this.errorMessage = 'Failed to load users'),
    // });

    this.getCollegeLoginUsers();
  }

  getCollegeLoginUsers(): void {
    this.appService.getCollegeLoginUsers().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        console.log(result);
        if (result) {
          this.users = result;
        }
      }
    });
  }
}
