import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  AfterViewChecked,
  OnInit,
} from '@angular/core';

import { AppService } from '../../../app.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogConfirmationComponent } from './../../../shared/dialog-confirmation/dialog-confirmation.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';

interface CollegeUserData {
  title: string;
  btn_title: string;
  collegeUserId: number;
}

interface CollegeUser {
  id: number;
  college: number;
  college_id: string;
  college_name: number;
  username: string;
  email: string;
  mobile: string;
  first_name: string;
  last_name: string;
  fatherOrHusband: string;
  aliasName: string;
  last_login: string;
  date_joined: string;
  gender: string;
  department: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pin: string;
  is_staff: Boolean;
  is_superuser: boolean;
  is_active: boolean;
  is_admin: boolean;
  is_owner: boolean;
  is_manager: boolean;
  is_assistant: boolean;
}

interface COLLEGE {
  id: number;
  college_id: string;
  name: string;
  username: string;
}
@Component({
  selector: 'app-dialog-user-registration',
  templateUrl: './dialog-user-registration.component.html',
  styleUrls: ['./dialog-user-registration.component.scss'],
})
export class DialogUserRegistrationComponent
  implements OnInit, AfterViewChecked
{
  college_user: CollegeUser[] = [];
  college_user_id: number = 0;

  @ViewChild('myTextarea') myTextarea!: ElementRef<HTMLTextAreaElement>;
  public showPasswordOnPress: boolean = false;

  colleges: COLLEGE[] = [];
  collegeOptions: Observable<any[]> = new Observable();
  selectedCollegeId: string | null = null;

  collegeUserRegisForm = new FormGroup({
    id: new FormControl(),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    fatherOrHusband: new FormControl(''),
    aliasName: new FormControl(''),
    college: new FormControl(''),
    department: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    pin: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    is_staff: new FormControl(false),
    is_superuser: new FormControl(false),
    is_active: new FormControl(false),
    is_admin: new FormControl(false),
    is_owner: new FormControl(false),
    is_manager: new FormControl(false),
    is_assistant: new FormControl(false),
    created_by: new FormControl(''),
    created_on: new FormControl(new Date()),
  });

  constructor(
    private authService: AuthService,
    private AppService: AppService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogUserRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CollegeUserData
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getColleges();
    console.log('College Id =======>', this.data.collegeUserId);
    if (this.data.collegeUserId) {
      this.college_user_id = this.data.collegeUserId;
      this.getCollegeUserById();
    }
  }

  getCollegeUserById(): void {
    console.log(this.college_user_id);

    this.AppService.getCollegeUserById(this.college_user_id).subscribe(
      (data) => {
        console.log(data.response);

        this.college_user = data.response;
        console.log('College User ====>', this.college_user);
        this.collegeUserRegisForm.patchValue(data.response);
        // this.selectedCollegeId = data.response?.college || null;

        // Extract the username and split into parts
        const username = data.response?.username || '';
        const usernameParts = username.split('_'); // Split by underscore

        // Set the username field to the portion before the underscore
        this.collegeUserRegisForm.patchValue({
          ...data.response,
          username: usernameParts[0] || username, // Set the first part to the form
        });

        // Set selectedCollegeId to the portion after the underscore
        this.selectedCollegeId = usernameParts[1] || ''; // Set the second part

        // this.collegeRegisForm.patchValue(data.response);
      },
      (error: HttpErrorResponse) => {
        this.AppService.openToaster('Data Not Found', false);
      }
    );
  }

  async getColleges(): Promise<void> {
    this.AppService.getColleges().subscribe(
      (data) => {
        console.log(data);
        this.colleges = data;

        this.collegeOptions =
          this.collegeUserRegisForm.controls.college.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
      },
      (error: HttpErrorResponse) => {
        this.AppService.openToaster('Data Not Found', false);
      }
    );
  }
  private _filter(value: any): COLLEGE[] {
    // const filterValue = typeof value === 'string' ? value.toLowerCase() : '';

    const filterValue = value;
    return this.colleges.filter((college) =>
      college.name.toLowerCase().includes(filterValue.toString().toLowerCase())
    );
  }

  getCollegeName(clg_id: number | null): string {
    if (clg_id === null || !this.colleges || this.colleges.length === 0) {
      return ''; // Return empty string if the id is null or no colleges are available
    }
    const college = this.colleges.find((college) => college.id === clg_id);
    return college ? college.name : '';
  }

  onCollegeSelected(college: COLLEGE): void {
    this.selectedCollegeId = college.college_id; // Update the matSuffix with the college_id
    // this.regis_form.controls.username.setValue(college.username || ''); // Optionally set username
  }

  clearCollege(): void {
    this.collegeUserRegisForm.controls.college.setValue(null);
    this.selectedCollegeId = null;
  }

  ngAfterViewChecked(): void {
    // Ensure the height is recalculated after every view change for textarea field
    this.adjustTextareaHeight(this.myTextarea.nativeElement);
  }

  adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Reset the height to auto to correctly calculate the scroll height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the scroll height
  }

  onSubmit() {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      panelClass: 'activatepage',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.add_and_update_clg();
        this.addCollegeUser();
      }
    });
  }

  addCollegeUser(): void {
    if (this.collegeUserRegisForm.valid) {
      const usernameWithCollegeId =
        this.collegeUserRegisForm.controls.username.value +
        (this.selectedCollegeId ? `_${this.selectedCollegeId}` : '');

      // Prepare the data object for submission
      const data: any = {
        first_name: this.collegeUserRegisForm.controls.first_name.value,
        last_name: this.collegeUserRegisForm.controls.last_name.value,
        fatherOrHusband:
          this.collegeUserRegisForm.controls.fatherOrHusband.value,
        aliasName: '',
        college: this.collegeUserRegisForm.controls.college.value,
        username: usernameWithCollegeId,
        address: this.collegeUserRegisForm.controls.address.value,
        country: this.collegeUserRegisForm.controls.country.value,
        state: this.collegeUserRegisForm.controls.state.value,
        city: this.collegeUserRegisForm.controls.city.value,
        pin: this.collegeUserRegisForm.controls.pin.value,
        email: this.collegeUserRegisForm.controls.email.value,
        mobile: this.collegeUserRegisForm.controls.mobile.value,
        image_url: '',
        attachment_id: 0,
        gender: this.collegeUserRegisForm.controls.gender.value,
        department: this.collegeUserRegisForm.controls.department.value,
        is_admin: this.collegeUserRegisForm.controls.is_admin.value,
        is_superuser: this.collegeUserRegisForm.controls.is_superuser.value,
        is_active: this.collegeUserRegisForm.controls.is_active.value,
        is_staff: this.collegeUserRegisForm.controls.is_staff.value,
        is_owner: this.collegeUserRegisForm.controls.is_owner.value,
        is_manager: this.collegeUserRegisForm.controls.is_manager.value,
        is_assistant: this.collegeUserRegisForm.controls.is_assistant.value,
        // can_approve: 'False',
        // is_approved: 'False',
      };

      // Add the password field only if we are creating a new user (not updating)
      if (!this.college_user_id) {
        data.password = this.collegeUserRegisForm.controls.password.value;
      }

      console.log('Data sent to API:', data);

      if (this.college_user_id) {
        // If there is a college_user_id, we are updating the user
        this.AppService.updateCollegeUserById(
          this.college_user_id,
          data
        ).subscribe(
          (response) => {
            console.log('Update successful:', response);
            this.AppService.openToaster('Update successful', true, response);
            this.dialogRef.close(true);
            setTimeout(() => location.reload(), 1500);
          },
          (error) => {
            // Log the full error object to understand the structure
            console.error('Update failed:', error);

            let errorMessage = 'An unexpected error occurred.';

            if (error?.error) {
              // Handle known structured error response
              if (error?.error?.message) {
                errorMessage = error?.error?.message;
              } else if (error?.error?.detail) {
                errorMessage = error?.error?.detail;
              } else {
                // Handle other unknown error structures
                errorMessage =
                  'Unknown error details received from the backend.';
              }
            } else if (error?.message) {
              // For simpler error structures
              errorMessage = error?.message;
            }

            this.AppService.openToaster(errorMessage, false);
          }
        );
      } else {
        // Handle registration flow (create a new user)
        this.authService.addCollegeUser(data).subscribe(
          (response) => {
            console.log('Registration successful:', response);
            this.AppService.openToaster(
              'Registration successful',
              true,
              response
            );
            this.dialogRef.close(true);
            setTimeout(() => location.reload(), 1500);
          },
          (error) => {
            console.error('Registration failed:', error);
            const errorMessage =
              error?.error?.error || 'An unexpected error occurred.';
            this.AppService.openToaster(errorMessage, false);
          }
        );
      }
    } else {
      console.error('Form is invalid:', this.collegeUserRegisForm.errors);
    }
  }
}
