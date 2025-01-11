import { Component, HostListener, NgZone } from '@angular/core';
// import { AapService } from '../aap.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
import { DialogConfirmationComponent } from '../shared/dialog-confirmation/dialog-confirmation.component';
import { AuthService } from '../auth/auth.service';
// import { AuthService } from '../auth/auth.service';
export interface UserDetails {
  username: string;
  email: string;
  department: string;
  designation: string;
  gender: string;
  full_name: string;
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
export class GlobalNavbarComponent {
  constructor(
    // private AppService: AapService,
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private ngZone: NgZone // private authService: AuthService
  ) {}
  ngOnInit() {
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

  userDetails: UserDetails | null = null;
  clickMenu() {
    // this.AppService.toggle();
  }

  dialodLogoutConfirmation(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      // maxWidth:'100vw',
      panelClass: 'activatepage',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.logout();
    });
  }

  getUserDetails(): void {
    // const username = localStorage.getItem('username');
    // console.log(username);
    // this.authService.getUserDetails(username ?? '').subscribe((data) => {
    //   console.log(data);
    //   if (data.response) {
    //     this.userDetails = data.response as UserDetails; // Store in interface
    //     console.log('>>>>', this.userDetails);
    //   } else {
    //     this.userDetails = null;
    //   }
    // });
  }

  logout(): void {
    // this.AppService.openToaster('Logged out Successfully', true);
    // setTimeout(() => {
    //   this.authService.logout();
    //   this.router.navigate(['/login']);
    // }, 1500);
    //  this.auth
    //   .logout()
    //   .toPromise()
    //   .then((data: any) => {
    //     localStorage.clear();
    //     this.AppService.openToaster('Logged out Successfully', true);
    //     if (environment.production) {
    //       window.location.href =
    //         window.location.protocol + '//' + window.location.host + '/login/';
    //     } else {
    //       window.location.href = 'http://0.0.0.0:81';
    //     }
    //   })
    //   .catch((reject: any) => {
    //     console.log(reject);
    //   });

    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // For Profile Menu
  isProfileMenuVisible = false;

  toggleProfileMenu(event: Event): void {
    event.stopPropagation(); // Prevent click event from propagating to document
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isProfileMenuVisible) {
      this.isProfileMenuVisible = false; // Close the menu
    }
  }
  // For Profile Menu

  closeMenu(): void {
    this.isProfileMenuVisible = false;
  }
}
