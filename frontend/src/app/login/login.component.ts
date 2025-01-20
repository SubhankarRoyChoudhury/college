import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppService } from '../app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public showPasswordOnPress: boolean = false;
  msg: string = '';

  login_form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private AppService: AppService
  ) {}

  ngOnInit() {}

  onLogin() {
    console.log(this.login_form.value);

    if (this.login_form.valid) {
      this.authService.login(this.login_form.getRawValue()).subscribe(
        (data: any) => {
          console.log('Login successful:', data);

          if (data.refresh_token) {
            localStorage.setItem(
              'username',
              this.login_form.controls.username.value ?? ''
            );
            localStorage.setItem('access_token', data.access_token); // Save access token
            localStorage.setItem('is_superuser', data.is_superuser.toString()); // Save is_superuser flag

            this.msg = 'You are authenticated';

            // Redirect based on is_superuser
            if (data.is_superuser) {
              this.router.navigate(['/admin-control']);
              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              this.router.navigate(['/upload']);
              setTimeout(() => {
                location.reload();
              }, 2000);
            }

            this.AppService.openToaster('Login Successfully', true);
          } else {
            this.msg = 'You are not authenticated';
            this.AppService.openToaster(this.msg, false);
          }
        },
        (error: HttpErrorResponse) => {
          this.AppService.openToaster(error.error.error_description, false);
        }
      );
    } else return;
  }
}
