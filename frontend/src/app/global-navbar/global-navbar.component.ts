import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DialogConfirmationComponent } from '../shared/dialog-confirmation/dialog-confirmation.component';
import { environment } from './../../environments/environments';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

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
  isSuperUser: boolean = false;

  img_url: any;
  img_source: any;

  constructor(
    private AppService: AppService,
    public authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.isLoggedIn = !this.authService.isLoggedIn(); // Track the login status
    this.getUserDetails();

    // Retrieve the 'is_superuser' flag from localStorage for admin START
    const isSuperUser = localStorage.getItem('is_superuser');
    this.isSuperUser = isSuperUser === 'true'; // Convert string to boolean
    // Retrieve the 'is_superuser' flag from localStorage for admin END
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
          console.log(this.userDetails, data.response.attachment_id);
          this.getImageUrl(data.response.attachment_id);
        } else {
          this.userDetails = null;
        }
      });
    }
  }

  getImageUrl(id: any) {
    this.AppService.getFiles(id).subscribe((e) => {
      console.log(e);
      this.img_url = e.file.slice(1);
      // ✅ Construct full image URL
      let base_url = environment.base_url;
      // const hostname = base_url.replace(/\/api\/$/, '');
      this.img_source = base_url + this.img_url;
      console.log('Updated img_source:', this.img_source);
    });
  }
  getSafeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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
