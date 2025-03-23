import { Component } from '@angular/core';
import { AppService } from './../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserRegistrationComponent } from './dialog-user-registration/dialog-user-registration.component';
import { DialogConfirmationComponent } from '../../shared/dialog-confirmation/dialog-confirmation.component';
import { environment } from './../../../environments/environments';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  attachment_id: number;
  is_admin: boolean;
  is_owner: boolean;
  is_manager: boolean;
  is_assistant: boolean;
  delist: boolean;
}
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent {
  college_users: any[] = [];

  constructor(
    private appService: AppService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // this.appService.getCollegeLoginUsers().subscribe({
    //   next: (data) => (this.users = data),
    //   error: (error) => (this.errorMessage = 'Failed to load users'),
    // });

    this.getCollegeUsers();
  }

  getCollegeUsers(): void {
    this.appService.getCollegeUsers().subscribe((users) => {
      // Collect observables for fetching each user's image
      const requests = users.map((user: any) =>
        this.appService.getFiles(user.attachment_id).pipe(
          map((fileResponse: any) => {
            const img_url = fileResponse.file.slice(1);
            const img_source = `${environment.base_url}${img_url}`;
            return { ...user, img_source }; // Attach img_source to user
          }),
          catchError(() => {
            return of({
              ...user,
              img_source: 'assets/images/default_profile.png',
            }); // Default image on error
          })
        )
      );

      // Wait for all requests to complete and set college_users
      forkJoin(requests).subscribe((usersWithImages: any) => {
        this.college_users = usersWithImages;
      });
    });
  }

  getSafeImageUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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

  onDeleteCollegeUser(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      panelClass: 'activatepage',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCollegeUserById(id);
      }
    });
  }

  deleteCollegeUserById(id: number): void {
    this.appService.deleteCollegeUserById(id).subscribe(
      (response) => {
        this.appService.openToaster('College User deleted successfully', true);
        this.getCollegeUsers();
        // Optionally reload the list or perform additional actions
        // this.getColleges(); // Call a method to refresh the college list
      },
      (error) => {
        console.error('Error deleting college:', error);
        this.appService.openToaster('Failed to delete college user', false);
      }
    );
  }
}
