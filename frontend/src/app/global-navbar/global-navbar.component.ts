import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DialogConfirmationComponent } from '../shared/dialog-confirmation/dialog-confirmation.component';

export interface UserDetails {
  username: string;
  email: string;
  department: string;
  designation: string;
  gender: string;
  first_name: string;
  last_name: string;
  can_approve: boolean;
  address: string;
  phone_no: string;
  is_staff: boolean;
  is_superuser: boolean;
}

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.scss'],
})
export class GlobalNavbarComponent implements OnInit {
  userDetails: UserDetails | null = null;
  isProfileMenuVisible = false;
  isLoggedIn = false;

  constructor(
    private AppService: AppService,
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.isLoggedIn = !this.authService.isLoggedIn(); // Track the login status
    this.getUserDetails();
  }

  toggleNavbar() {
    this.ngZone.runOutsideAngular(() => {
      const navbar = document.getElementById('navbarSupportedContent');
      if (navbar?.classList.contains('show')) {
        navbar.classList.remove('show');
      } else {
        navbar?.classList.add('show');
      }
    });
  }

  dialodLogoutConfirmation(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      panelClass: 'activatepage',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logout();
      }
    });
  }

  getUserDetails(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.authService.getUserDetails(username).subscribe((data) => {
        if (data?.response) {
          this.userDetails = data.response as UserDetails;
        } else {
          this.userDetails = null;
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false; // Update login status
    this.userDetails = null; // Clear user details
    this.router.navigate(['/login']);
    setTimeout(() => {
      location.reload();
    }, 1800);
    this.AppService.openToaster('Logged out Successfully', true);
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation();
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isProfileMenuVisible) {
      this.isProfileMenuVisible = false; // Close menu if clicking outside
    }
  }

  closeMenu(): void {
    this.isProfileMenuVisible = false;
  }
}
