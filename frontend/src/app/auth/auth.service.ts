import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.base_url;
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  private httpHeadersencoded = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  access_token: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.get_accesstoken(); // Ensure we load token on service initialization
  }

  ngOnInit(): void {
    this.get_accesstoken();
  }

  // Retrieve the access token from localStorage on initialization
  get_accesstoken(): void {
    const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
    this.access_token = token ? token : ''; // Set access_token or default to an empty string
  }

  // Login method to authenticate user
  login(user: any): Observable<any> {
    const payload = new HttpParams()
      .set('grant_type', 'password')
      .set('username', user.username)
      .set('password', user.password)
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret);

    return this.http.post(this.baseUrl + 'accounts/o/token/', payload, {
      headers: this.httpHeaders,
    });
  }

  // Check if the user has superuser privileges
  isSuperuser(): boolean {
    const isSuperuser = localStorage.getItem('is_superuser');
    return isSuperuser === 'true';
  }

  // Logout the user by clearing session-related data
  logout() {
    // Remove all login-related information from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('is_superuser');
    this.router.navigate(['/login']); // Navigate to login page after logout
  }

  addCollegeUser(collegeUerData: any): Observable<any> {
    return this.http
      .post(
        this.baseUrl + 'accounts/create-college-user/',
        JSON.stringify(collegeUerData),
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

  // Retrieve user details based on the username
  getUserDetails(username: string): Observable<any> {
    const token = localStorage.getItem('access_token'); // Get the token from localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Set the token in the Authorization header
    });

    return this.http
      .get(this.baseUrl + `accounts/usersDetails/?username=${username}`, {
        headers: headers,
      }) // Use the newly created headers
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Request failed:', error);
          return throwError(error);
        })
      );
  }

  // Check if the user is logged in by verifying the presence of an access token
  isLoggedIn(): boolean {
    return !localStorage.getItem('access_token');
  }
}
