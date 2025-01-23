import { Component } from '@angular/core';
import { AppService } from './../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCollegeRegistrationComponent } from './dialog-college-registration/dialog-college-registration.component';
import { DialogConfirmationComponent } from './../../shared/dialog-confirmation/dialog-confirmation.component';

interface College {
  id: number;
  college_id: number;
  name: number;
  username: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pin: string;
  email: string;
  mobile: string;
  admin_name: string;
  father_name: string;
  registrationDate: string;
  is_approved: Boolean;
  is_admin: boolean;
  active_from: string;
  active_upto: string;
  created_by: string;
  created_on: string;
}
@Component({
  selector: 'app-college-registration',
  templateUrl: './college-registration.component.html',
  styleUrls: ['./college-registration.component.scss'],
})
export class CollegeRegistrationComponent {
  college_list: College[] = [];

  constructor(private AppService: AppService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // this.AppService.getCollegeLoginUsers().subscribe({
    //   next: (data) => (this.users = data),
    //   error: (error) => (this.errorMessage = 'Failed to load users'),
    // });

    this.getColleges();
  }

  getColleges(): void {
    this.AppService.getColleges().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        console.log(result);
        if (result) {
          this.college_list = result;
        }
      }
    });
  }

  openEditCollege(collegeId: number) {
    const dialogRef = this.dialog.open(DialogCollegeRegistrationComponent, {
      maxWidth: '100vw',
      panelClass: 'panelClass_clg_register',
      data: {
        title: 'College Registration Form',
        btn_title: 'Update',
        collegeId: collegeId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDeleteCollege(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      panelClass: 'activatepage',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete_clg(id);
      }
    });
  }

  delete_clg(id: number): void {
    this.AppService.deleteCollegeById(id).subscribe(
      (response) => {
        this.AppService.openToaster('College deleted successfully', true);
        // Optionally reload the list or perform additional actions
        this.getColleges(); // Call a method to refresh the college list
      },
      (error) => {
        console.error('Error deleting college:', error);
        this.AppService.openToaster('Failed to delete college', false);
      }
    );
  }
}
