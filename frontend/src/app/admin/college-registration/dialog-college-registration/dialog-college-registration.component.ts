import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { AppService } from '../../../app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogConfirmationComponent } from './../../../shared/dialog-confirmation/dialog-confirmation.component';
interface CollegeData {
  title: string;
  btn_title: string;
  collegeId: number;
}

interface CollegeList {
  id: number;
  name: string;
  college_id: string;
  username: string;
  admin_name: string;
  father_name: string;
  mobile: string;
  email: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pin: string;
  is_approved: boolean;
  is_admin: boolean;
}
@Component({
  selector: 'app-dialog-college-registration',
  templateUrl: './dialog-college-registration.component.html',
  styleUrls: ['./dialog-college-registration.component.scss'],
})
export class DialogCollegeRegistrationComponent {
  college: CollegeList[] = [];
  college_id: number = 0;
  collegeRegisForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    college_id: new FormControl(''),
    username: new FormControl(''),
    admin_name: new FormControl(''),
    father_name: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    country: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
    pin: new FormControl(),
    is_approved: new FormControl(false),
    is_admin: new FormControl(false),
    created_by: new FormControl(''),
    created_on: new FormControl(new Date()),
  });
  constructor(
    private AppService: AppService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogCollegeRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CollegeData
  ) {}

  ngOnInit(): void {
    console.log('College Id =======>', this.data.collegeId);
    if (this.data.collegeId) {
      this.college_id = this.data.collegeId;
      this.getCollegeById();
    }
  }

  onSubmit() {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      panelClass: 'activatepage',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.add_and_update_clg();
      }
    });
  }

  add_and_update_clg(): void {
    console.log(this.collegeRegisForm.value);
    console.log(this.collegeRegisForm.valid);

    if (this.collegeRegisForm.valid) {
      const data = {
        name: this.collegeRegisForm.controls.name.value,
        college_id: this.collegeRegisForm.controls.college_id.value,
        username: this.collegeRegisForm.controls.username.value,
        admin_name: this.collegeRegisForm.controls.admin_name.value,
        father_name: this.collegeRegisForm.controls.father_name.value,
        mobile: this.collegeRegisForm.controls.mobile.value,
        email: this.collegeRegisForm.controls.email.value,
        address: this.collegeRegisForm.controls.address.value,
        country: this.collegeRegisForm.controls.country.value,
        state: this.collegeRegisForm.controls.state.value,
        city: this.collegeRegisForm.controls.city.value,
        pin: this.collegeRegisForm.controls.pin.value,
        is_approved: this.collegeRegisForm.controls.is_approved.value,
        is_admin: this.collegeRegisForm.controls.is_admin.value,
      };

      console.log('Data to be sent ======>', data);

      if (!this.collegeRegisForm.get('id')!.value) {
        // Add new college
        this.AppService.addCollege(data).subscribe(
          (response) => {
            if (response) {
              this.AppService.openToaster(
                'College Registration successful',
                true,
                response
              );
              this.dialogRef.close(true);
              setTimeout(() => {
                location.reload();
              }, 1800);
            }
          },
          (error) => {
            console.error('Registration failed:', error);
          }
        );
      } else {
        // Update existing college
        const collegeId = this.collegeRegisForm.get('id')!.value; // Extract the `id` from the form
        this.AppService.updateCollegeById(collegeId, data).subscribe(
          (response) => {
            if (response) {
              this.AppService.openToaster(
                'College updated successfully',
                true,
                response
              );
              this.dialogRef.close(true);
              setTimeout(() => {
                location.reload();
              }, 1500);
            }
          },
          (error) => {
            console.error('Update failed:', error);
            this.AppService.openToaster('Failed to update college', false);
          }
        );
      }
    } else {
      this.AppService.openToaster('Please fill out the form correctly', false);
    }
  }

  getCollegeById(): void {
    this.AppService.getCollegeById(this.college_id).subscribe(
      (data) => {
        console.log(data.response);

        this.college = data.response;
        this.collegeRegisForm.patchValue(data.response);
      },
      (error: HttpErrorResponse) => {
        this.AppService.openToaster('Data Not Found', false);
      }
    );
  }
}
