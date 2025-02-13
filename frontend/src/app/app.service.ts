import { Injectable } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { environment } from '../environments/environments';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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
    return this.http.get(this.baseUrl + 'college_management/colleges/');
  }

  getCollegeLoginUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'accounts/users/');
  }

  getCollegeUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'accounts/college-user/');
  }

  addCollege(collegeData: any): Observable<any> {
    return this.http
      .post(
        this.baseUrl + 'college_management/colleges/',
        JSON.stringify(collegeData),
        {
          headers: this.httpHeadersencoded,
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Registration failed:', error);
          return throwError(error);
        })
      );
  }

  getCollegeById(clg_id: number): Observable<any> {
    return this.http
      .get(this.baseUrl + 'college_management/colleges/' + clg_id + '/')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Registration failed:', error);
          return throwError(error);
        })
      );
  }

  getCollegeUserById(college_user_id: number): Observable<any> {
    return this.http
      .get(this.baseUrl + 'accounts/college-user/' + college_user_id + '/')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Registration failed:', error);
          return throwError(error);
        })
      );
  }

  updateCollegeUserById(
    college_user_id: number,
    collegeUserData: any
  ): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(
      `${this.baseUrl}accounts/college-user/${college_user_id}/`,
      JSON.stringify(collegeUserData),
      {
        headers: this.httpHeadersencoded,
      }
    );
  }

  updateCollegeById(clg_id: number, collegeData: any): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(
      `${this.baseUrl}college_management/colleges/${clg_id}/`,
      JSON.stringify(collegeData),
      {
        headers: this.httpHeadersencoded,
      }
    );
  }

  deleteCollegeById(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}college_management/colleges/${id}/`,
      {
        headers: this.httpHeadersencoded,
      }
    );
  }

  deleteCollegeUserById(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}accounts/college-user/delist/${id}/`, {
      headers: this.httpHeadersencoded,
    });
  }
}
