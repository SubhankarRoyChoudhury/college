import { Injectable } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// interface User {
//   id: number;
//   username: string;
//   email: string;
// }

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl = environment.base_url;
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  private httpHeadersencoded = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private apiToasterSharedService: SharedService,
    private http: HttpClient
  ) {}

  access_token: string = '';

  ngOnInit(): void {
    this.get_accesstoken();
  }

  get_accesstoken(): void {
    const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
    this.access_token = token ? token : ''; // Set access_token or default to an empty string
    console.log(this.access_token);
  }

  async openToaster(
    msg: string,
    status: boolean,
    show_cancel_btn: boolean = false
  ): Promise<any> {
    return await this.apiToasterSharedService
      .openCustomToastr(msg, status, show_cancel_btn)
      .then((response) => {
        // Handle the response here
        console.log('Dialog response:', response);
        return response;
      })
      .catch((error) => {
        // Handle errors or cancelations
        console.error('Dialog error:', error);
        return false;
      });
  }

  getColleges(): Observable<any> {
    const access_token = localStorage.getItem('access_token');
    const headers = this.httpHeadersencoded.set(
      'Authorization',
      `Bearer ${access_token}`
    ); // Set Authorization header with Bearer token
    if (access_token) {
      this.access_token = access_token;
    }
    return this.http.get(this.baseUrl + 'college_management/colleges/', {
      headers,
    });
  }

  getCollegeLoginUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'accounts/users/');
  }
}
