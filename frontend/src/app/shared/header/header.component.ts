import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DialogCollegeRegistrationComponent } from '../../admin/college-registration/dialog-college-registration/dialog-college-registration.component';
import { DialogUserRegistrationComponent } from '../../admin/user-registration/dialog-user-registration/dialog-user-registration.component';
import { AuthService } from '../../auth/auth.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title: string = 'Admin Dashboard';
  showAddUserButton: boolean = false;
  showAddCollegeButton: boolean = false;

  isLoggedIn = false;
  isSuperUser: boolean = false;

  isMenuOpen = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AppService: AppService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !this.authService.isLoggedIn();

    // Retrieve the 'is_superuser' flag from localStorage for admin START
    const isSuperUser = localStorage.getItem('is_superuser');
    this.isSuperUser = isSuperUser === 'true'; // Convert string to boolean
    // Retrieve the 'is_superuser' flag from localStorage for admin END

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // ✅ Get the deepest activated route
        let childRoute = this.route;
        while (childRoute.firstChild) {
          childRoute = childRoute.firstChild;
        }

        // ✅ Read the title from the nested route
        this.title = childRoute.snapshot.data?.['title'] || 'Admin Dashboard';

        // ✅ Determine which button to show
        const currentRoute = childRoute.snapshot.url[0]?.path;

        // Determine which button to show
        this.showAddUserButton = currentRoute === 'user-registration';
        this.showAddCollegeButton = currentRoute === 'college-registration';
      });

    // ✅ Set the title and button state for the initial page load
    let initialRoute = this.route;
    while (initialRoute.firstChild) {
      initialRoute = initialRoute.firstChild;
    }
    this.title = initialRoute.snapshot.data?.['title'] || 'Admin Dashboard';

    const currentRoute = initialRoute.snapshot.url[0]?.path;

    this.showAddUserButton = currentRoute === 'user-registration';
    this.showAddCollegeButton = currentRoute === 'college-registration';
  }

  clickMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Toggle state
    this.AppService.toggle();
  }

  openAddUser() {
    console.log('Add User from here');
    const dialogRef = this.dialog.open(DialogUserRegistrationComponent, {
      maxWidth: '100vw',
      panelClass: 'panelClass_clg_register',
      data: {
        title: 'College User Registration Form',
        btn_title: 'Submit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openAddCollege() {
    console.log('Add College from here');
    const dialogRef = this.dialog.open(DialogCollegeRegistrationComponent, {
      maxWidth: '100vw',
      panelClass: 'panelClass_clg_register',
      data: {
        title: 'College Registration Form',
        btn_title: 'Submit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
