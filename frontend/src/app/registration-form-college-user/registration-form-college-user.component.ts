import {
  Component,
  AfterViewChecked,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

interface COLLEGE {
  id: number;
  college_id: string;
  name: string;
}

@Component({
  selector: 'app-registration-form-college-user',
  templateUrl: './registration-form-college-user.component.html',
  styleUrls: ['./registration-form-college-user.component.scss'],
})
export class RegistrationFormCollegeUserComponent
  implements OnInit, AfterViewChecked
{
  @ViewChild('myTextarea') myTextarea!: ElementRef<HTMLTextAreaElement>;
  public showPasswordOnPress: boolean = false;

  colleges: COLLEGE[] = [];
  collegeOptions: Observable<any[]> = new Observable();

  regis_form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    fatherOrHusband: new FormControl('', [Validators.required]),
    aliasName: new FormControl(''),
    college: new FormControl('', [Validators.required]),
    department: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pin: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private AppService: AppService
  ) {}

  access_token: string = '';
  async ngOnInit(): Promise<void> {
    await this.getColleges();
    this.get_accesstoken();
  }

  get_accesstoken(): void {
    const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
    this.access_token = token ? token : ''; // Set access_token or default to an empty string
    console.log('access_token===>', this.access_token);
  }

  private _filter(value: any): COLLEGE[] {
    // const filterValue = typeof value === 'string' ? value.toLowerCase() : '';

    const filterValue = value;
    return this.colleges.filter((college) =>
      college.name.toLowerCase().includes(filterValue.toString().toLowerCase())
    );
  }

  getCollegeName(clg_id: number | null): string {
    // if (this.colleges.length) {
    //   let name = this.colleges.find((college) => college.id === clg_id)!.name;
    //   return name;
    // } else {
    //   return '';
    // }

    if (clg_id === null || clg_id === undefined) {
      return ''; // Return an empty string if the value is invalid
    }

    const college = this.colleges.find((college) => college.id === clg_id);
    return college ? college.name : ''; // Return the name if found, otherwise an empty string
  }

  onRegister() {
    console.log(this.regis_form.value);

    console.log(this.regis_form.valid);

    if (this.regis_form.valid) {
      const data = {
        first_name: this.regis_form.controls.first_name.value,
        last_name: this.regis_form.controls.last_name.value,
        fatherOrHusband: this.regis_form.controls.fatherOrHusband.value,
        aliasName: '',
        college: this.regis_form.controls.college.value,
        username: this.regis_form.controls.username.value,
        password: this.regis_form.controls.password.value,
        address: this.regis_form.controls.address.value,
        country: this.regis_form.controls.country.value,
        state: this.regis_form.controls.state.value,
        city: this.regis_form.controls.city.value,
        pin: this.regis_form.controls.pin.value,
        email: this.regis_form.controls.email.value,
        mobile: this.regis_form.controls.mobile.value,
        image_url: '',
        attachment_id: 0,
        gender: this.regis_form.controls.gender.value,
        department: '',
        can_approve: 'False',
        is_staff: 'False',
        is_superuser: 'False',
        is_approved: 'False',
        is_admin: 'False',
      };

      this.authService.addCollegeUser(data).subscribe(
        (response) => {
          if (response) {
            this.AppService.openToaster(
              'Registration successful',
              true,
              response
            );
            this.router.navigate(['/login']);
            setTimeout(() => {
              location.reload();
            }, 1800);
          }
          // this.regis_form.value.
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }

  ngAfterViewChecked(): void {
    // Ensure the height is recalculated after every view change for textarea field
    this.adjustTextareaHeight(this.myTextarea.nativeElement);
  }

  adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Reset the height to auto to correctly calculate the scroll height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the scroll height
  }

  async getColleges(): Promise<void> {
    this.AppService.getColleges().subscribe(
      (data) => {
        console.log(data);
        this.colleges = data;

        this.collegeOptions =
          this.regis_form.controls.college.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
      },
      (error: HttpErrorResponse) => {
        this.AppService.openToaster('Data Not Found', false);
      }
    );
  }
}
