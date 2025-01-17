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

  regis_form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    fatherOrHusband: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pin: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9 +]*'),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private AppService: AppService
  ) {}

  ngOnInit(): void {}

  onRegister() {
    console.log(this.regis_form.value);
  }

  ngAfterViewChecked(): void {
    // Ensure the height is recalculated after every view change for textarea field
    this.adjustTextareaHeight(this.myTextarea.nativeElement);
  }

  adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Reset the height to auto to correctly calculate the scroll height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the scroll height
  }
}
